<template>
    <div class="mainLayout">
        <TheHeader/>
        CookieConsent: {{ appStore.cookieConsent }}
        <section class="main-container">
            <slot />
        </section>
        <TheFooter/>
        <CookieConsent @cookies-accepted="cookiesAccepted"/>
    </div>
</template>

<script setup lang="ts">
    import { useAppStore } from '~~/store/app'
    const appStore = useAppStore()

    onMounted(() => {
        appStore.updateCookieConsent(true)
    })

    function cookiesAccepted(group) {
        console.log('cookies accepted', group)
        const $gtm = useGTM()
        const gtmCookieGroupName = 'Marketing'
        if (group.name === gtmCookieGroupName) $gtm.enable()
    }

</script>

<style scoped>
    .mainLayout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>