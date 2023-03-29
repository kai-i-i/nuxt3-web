const appEnv = process.env.ENV || 'development'
import { defineNuxtConfig } from 'nuxt/config'
import { GlobalSettings } from './environmentsettings'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    css: [
        '@/assets/css/main.css'
    ],
    modules: ['@pinia/nuxt'],
    plugins: ['~~/store/app'],
    runtimeConfig: {
        public: {
            sitename: 'random nuxt3 website',
            companyname: 'Random Inc.',
            telephone: GlobalSettings[appEnv as keyof typeof GlobalSettings].telephone,
            siteEnvironment: GlobalSettings[appEnv as keyof typeof GlobalSettings].siteEnvironment,
        }
    },
})

