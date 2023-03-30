import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig().public
    const { $cookies } = useNuxtApp()
    const gtmCookieGroupMName = 'marketing'
    nuxtApp.vueApp.use(createGtm({
        id: runtimeConfig.gtm_id,
        defer: false,
        compatibility: false,
        // nonce: '2726c7f26c',
        enabled: runtimeConfig.gtm_enabled && $cookies.isEnabled(gtmCookieGroupMName),
        debug: runtimeConfig.gtm_debug, 
        loadScript: true,
        vueRouter: useRouter(),
        trackOnNextTick: false,
    }))
})