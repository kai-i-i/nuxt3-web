import { ref } from 'vue'
import { defineNuxtPlugin, useNuxtApp } from '#app'
import type { CookieOptions } from './types'
import { useRuntimeConfig } from '#imports'

// global cookie object
// for exposure across the application
let cookies: CookieOptions

// from https://gitlab.com/broj42/nuxt-cookie-control/-/blob/master/lib/plugin.js
// methods: get, set, isEnabled, setBlockedIframes, slugify, remove, acceptNecessary, getName, setConsent

const methods = {
  get: (cookie) => {
    // change process.browser to process.client
    if (process.client) {
      // change let to const 
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      const name = `${cookie}=`
      
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
    }
    return '';
  },
  
  set: ({name, value='', expires='', path='/', domain}) => {
    const domainName = domain ? domain : cookies.domain ? `.${cookies.domain}` : domain
    if (process.client) {
      document.cookie = `${name}=${value};expires=${expires};path=${path}${
        domainName !== undefined ? `;domain=${domainName}` : ';'
      }`
    } else if (process.server) {
      // addition of useNuxtApp
      const context = useNuxtApp()
      context.res.setHeader('Set-Cookie', [
        `${name}=${value}; Expires=${expires}; Path=${path}${
          domainName !== undefined ? `; Domain=${domainName}` : ';'
        }`,
      ])
    }
  },
  
  isEnabled: (identifier: never) => {
    return (
      cookies.enabledList.includes(identifier) || 
      cookies.enabledList.includes(cookies.slugify(identifier))
    )
  },
  
  setBlockedIframes: (content) => {
    // addition of useNuxtApp      
    const context = useNuxtApp()
    const type = (typeof content).toLowerCase()

    let c = type !== 'string' ? JSON.stringify(content) : content
    c = c.replace(/&lt;/g, '<')
    c = c.replace(/&gt;/g, '>')

    if (context.app.$cookies.enabled.filter((c) => {return c.name === 'functional'}).length === 0) {
      c = c.replace(/<iframe/g, `<div class='cookieControl__BlockedIframe '`)
      c = c.replace(
        /<\/iframe/g, 
        `<p>${
          context.app.$cookies.text.blockedIframe !== undefined 
          ? context.app.$cookies.text.blockedIframe : ''
        } <a href='#' onclick='event.preventDefault(); $${
          cookies.globalName
        }.$cookies.modal = true'>${
          context.app.$cookies.text.here !== undefined 
          ? context.app.$cookies.text.here
          : ''
        }</a></p></div`)
    }
    return type !== 'string' ? JSON.parse(c) : c
  },
  
  slugify: (str: string) => {
    str = str.replace(/^\s+|\s+$/g, '')
    str = str.toLowerCase()
    const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;"
    const to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------"
    
    for (let i = 0, l = from.length; i < l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') 
    return str
  },
  
  remove: (name) => {
    if (process.client) {
      const domain = window.location.hostname
      
      cookies.set({name, expires: 'Thu, 01 Jan 1970 00:00:00 GMT', domain })

      for (let j = domain.split('.'); j.length;) {
        const o = j.join('.')
        
        cookies.set({
          name, 
          expires: 'Thu, 01 Jan 1970 00:00:00 GMT', 
          domain: `.${o}`,
        })
        
        j.shift()
      }
    }
  },
  
  acceptNecessary: () => {
    let expires = new Date()
    expires.setFullYear(expires.getFullYear()+1)
    expires = expires.toUTCString()
    
    const value = cookies.necessary.map((c) => c.identifier || cookies.slugify(getName(c.name)))
    
    cookies.set({name: 'cookie_control_enabled_cookies', value, expires})
    cookies.set({name: 'cookie_control_consent', value: true, expires})
    cookies.consent = true

    if (process.client) {
      setHead()
      callAcceptedFunctions()
    }
  },
  
  getName: (name) => {
    return typeof name === 'string' ? name : name[Object.keys(name)[0]]
  },
  
  setConsent: (isInit=false) => {
    cookies.consent = cookies.get('cookie_control_consent') === 'true' ? true : false
    cookies.enabled = []
    cookies.enabledList = []

    if (cookies.consent === true) {
      const enabledFromCookie = cookies.get('cookie_control_enabled_cookies')

      cookies.enabled.push(
        ...cookies.optional.filter((c) => {
        const cookieName = typeof c.name === 'string' ? c.name : c.name[Object.keys(c.name)[0]]
        
        return enabledFromCookie.includes(c.identifier || cookies.slugify(cookieName))
        })
      )

      cookies.enabledList = cookies.enabled.length > 0 ? cookies.enabled.map((c) => {
        const cookieName = typeof c.name === 'string' ? c.name : c.name[Object.keys(c.name)[0]]
        return c.identifier || cookies.slugify(cookieName)
      }) 
      : []
    }
    
    if (cookies.necessary) 
      cookies.enabled.push(
        ...cookies.necessary.filter((c) => {
          return c.src || c.accepted
        })
      )
    
    if (process.client && !isInit) {
      setHead()
      clearCookies()
      callAcceptedFunctions()
    }
  },
}    

const clearCookies = () => {
  const disabled = cookies.optional.filter((c) => {
    const cookieName = typeof c.name === 'string' ? c.name : c.name[Object.keys(c.name)[0]]
    return !cookies.enabledList.includes(c.identifier || cookies.slugify(cookieName))
  })
  
  if (disabled.length > 0) {
    disabled.forEach((c) => {
      if (c.declined) c.declined(c);
      if (c.cookies && c.cookies.length > 0) {
        c.cookies.forEach((i) => {
          cookies.remove(i)
        })
      }

// if(c.src){
//   for(let s of [...document.head.querySelectorAll(`script[src="${c.src}"]`)]){
//     s.parentNode.removeChild(s)
//   }
// }

    })
  }
}
    
const setHead = () => {
  if (cookies.enabled.length > 0) {
    const head = document.getElementsByTagName('head')[0]
    cookies.enabled.forEach((c) => {
      if (c.src) {
        const script = document.createElement('script')
        script.src = c.src
        head.appendChild(script)
        script.addEventListener('load', () => {
          if (c.accepted) c.accepted(c)
        })
      }
    })
  }
}

const callAcceptedFunctions = () => {
  if (cookies.enabled.length > 0) {
    cookies.enabled.forEach((c) => {
      if (c.accepted) c.accepted(c)
    })
  }
}

// returned value is available as 
// this.$cookies in any component
export default defineNuxtPlugin((nuxtApp) => {
  const publicConfig = useRuntimeConfig().public

  cookies = ref({
    modal: false,
    consent: false,
    enabled: [],
    enabledList: [],
    optional: [],
    globalName: '',
    necessary: [],
    ...methods,
    ...publicConfig.cookieconsent,
  }).value

  cookies.setConsent(true)
  nuxtApp.hook('app:mounted', () => {
    cookies.setConsent()
  })
  
  return {
    provide: {
      cookies,
    },
  }
}) 


 