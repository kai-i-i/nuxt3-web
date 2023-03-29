import { defineNuxtConfig } from 'nuxt/config'

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
        }
    },
})
