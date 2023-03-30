import { defineNuxtConfig } from 'nuxt/config'
import { GlobalSettings } from './environmentsettings'
const appEnv = process.env.ENV || 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    css: [
        '@/assets/css/main.css'
    ],
    modules: ['@pinia/nuxt', 'nuxt-cookie-consent'],
    plugins: ['~~/store/app'],
    runtimeConfig: {
        public: {
            sitename: 'random nuxt3 website',
            companyname: 'Random Inc.',
            telephone: GlobalSettings[appEnv as keyof typeof GlobalSettings].telephone,
            siteEnvironment: GlobalSettings[appEnv as keyof typeof GlobalSettings].siteEnvironment,
        }
    },
    cookieConsent: { 
        controlButton: false,
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
                cookies: ['random_ga_id'],
            }, 
        ],
        colors: {
            checkboxActiveBackground: '#071bdc',
            checkboxInactiveBackground: '#8f99fb',
        },
    },    
})

