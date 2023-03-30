import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addComponent, addImports, createResolver, resolvePath } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import { ModuleOptions } from './runtime/types'
import { create } from 'domain'

/* Module options TypeScript interface definition
export interface ModuleOptions {
  addPlugin: boolean
}
*/ 


export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "cookieConsent",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    globalName: undefined,
    css: true,
    cssPolyfill: true,
    domain: '',
    locales: undefined,
    controlButton: true,
    blockIframe: { initialState: true },
    barPosition: 'bottom-full',
    dashInDescription: true,
    colors: {
      barTextColor: '#fff',
      modalOverlay: '#000',
      barBackground: '#000',
      barButtonColor: '#000',
      modalTextColor: '#000',
      modalBackground: '#fff',
      modalOverlayOpacity: 0.8,
      modalButtonColor: '#fff',
      modalUnsavedColor: '#fff',
      barButtonHoverColor: '#fff',
      barButtonBackground: '#fff',
      modalButtonHoverColor: '#fff',
      modalButtonBackground: '#000',
      controlButtonIconColor: '#000',
      controlButtonBackground: '#fff',
      barButtonHoverBackground: '#333',
      checkboxActiveBackground: '#000',
      checkboxInactiveBackground: '#000',
      modalButtonHoverBackground: '#333',
      checkboxDisabledBackground: '#ddd',
      controlButtonIconHoverColor: '#fff',
      controlButtonHoverBackground: '#000',
      checkboxActiveCircleBackground: '#fff',
      checkboxInactiveCircleBackground: '#fff',
      checkboxDisabledCircleBackground: '#fff',      
    },
    text: undefined,
    necessary: undefined,
    optional: undefined,
  },

  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))

    const componentsDir = resolver.resolve(runtimeDir, 'components')
    addComponent({
      name: 'CookieConsent',
      filePath: resolve(componentsDir, 'CookieConsent.vue'),
    })

    addImports({
      name: 'useCookieConsent',
      as: 'useCookieConsent',
      from: resolver.resolve(runtimeDir, 'composables'),
    })

    if (options.css)
      nuxt.options.css.push(resolve(runtimeDir, 'styles.css'))

    if (!options.locales) options.locales = ['en']

     // ensure the cookie config has the defaults
    if (options.necessary) {
      options.necessary.forEach((value, index, array) => {
        array[index] = {
          initialState: true,
          async: false,
          ...value,
        }
      })
    }

    if (options.optional) {
      options.optional.forEach((value, index, array) => {
        array[index] = {
          initialState: true,
          async: false,
          ...value,
        } 
      })      
    }
    
    // expose the options to nuxt
    nuxt.options.runtimeConfig.public.cookieconsent = defu(
      nuxt.options.runtimeConfig.public.cookieconsent,
      options
    )
      
  },
})
