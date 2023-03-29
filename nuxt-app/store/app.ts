import { defineStore } from 'pinia'
import { defineNuxtPlugin } from '#app'
import { apps } from 'open'

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()
    const appStore = useAppStore();
    appStore.$state.siteProperties.copyrightText = `2023 ${runtimeConfig.public.companyname}`
})

interface SiteProperties {
    cookieConsent: boolean,
    copyrightText: string
}

interface AppStoreState {
    siteProperties: SiteProperties
}

export const useAppStore = defineStore('app-store', {
    state: ():AppStoreState => {
        return {
            siteProperties: {
                cookieConsent: false,
                copyrightText: '',
            },
        }
    }, 
    actions: {
        updateCookieConsent(this: AppStoreState, value: boolean) {
            this.siteProperties.cookieConsent = value
        },
    },
    getters: {
        cookieConsent: (state: AppStoreState) => state.siteProperties.cookieConsent,
        copyrightText: (state: AppStoreState) => state.siteProperties.copyrightText
    },

})