import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '..'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  myModule: {
    addPlugin: true
  },
  cookieConsent: {
    // where the configuration lives
    controlButton: false,
    barPosition: 'bottom-left',
    /* necessary, optional \ performance, functional, marketing */
    necessary: [
        {
            name: 'Website',
            description: 'Essential for the website to work properly',
            cookies: [
                'cookie_control_consent',
                'cookie_control_enabled_cookies',
            ],
        },
    ],
    optional: [
        {
            name: 'random stuff',
            description: 'Analytics for the website',
            cookies: [
              '_ga', 
              '_gat', 
              '_gid', 
              'ga-<token>'
            ],
        }, 
    ],
    colors: {
        checkboxActiveBackground: '#071bdc',
        checkboxInactiveBackground: '#8f99fb',
    },    
  }
})