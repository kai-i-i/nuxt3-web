import { defineNuxtConfig } from 'nuxt/config'
import { GlobalSettings } from './environmentsettings.js'
const appEnv = process.env.ENV || 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    css: [
        '@/assets/css/main.css',
        'awesome-notifications/dist/style.css', 
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css'
    ],
    modules: [
        '@pinia/nuxt', 
        'nuxt-cookie-consent',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode'
    ],
    plugins: ['~~/store/app'],
    runtimeConfig: {
        public: {
            sitename: 'random nuxt3 website',
            companyname: 'Random Inc.',
            telephone: GlobalSettings[appEnv as keyof typeof GlobalSettings].telephone,
            siteEnvironment: GlobalSettings[appEnv as keyof typeof GlobalSettings].siteEnvironment,
            gtm_id: GlobalSettings[appEnv as keyof typeof GlobalSettings].googleTagManagerKey,
            gtm_enabled: GlobalSettings[appEnv as keyof typeof GlobalSettings].googleTagManagerEnabled,
            gtm_debug: GlobalSettings[appEnv as keyof typeof GlobalSettings].googleTagManagerDebug,            
        }
    },
    cookieConsent: { 
        controlButton: true,
        barPosition: 'bottom-left',
        necessary: [
            {
                name: 'Website',
                description: 'Essential for the website to work',
                cookies: [
                    'cookie_control_consent',
                    'cookie_control_enabled_cookies'
                ],
            },
        ],
        optional: [
            {
                name: 'Marketing',
                description: 'Used for Google Analytics',
                cookies: ['random_ga_id', '_ga', '_ga_<container-id>'],
            }, 
        ],
        colors: {
            checkboxActiveBackground: '#071bdc',
            checkboxInactiveBackground: '#8f99fb',
        },
    }, 
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    }, 
    colorMode: {
        classSuffix: ''
    },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config',
        exposeConfig: false,
        exposeLevel: 2,
        config: {},
        injectPosition: 0,
        viewer: true,
    }

})

