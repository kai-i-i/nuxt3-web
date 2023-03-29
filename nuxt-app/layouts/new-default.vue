<template>
    <div class="mainLayout">
        <TheHeader/>
        CookieConsent: {{ appStore.cookieConsent }}
        <section class="main-container">
            <slot />
        </section>
        <TheFooter/>
    </div>
</template>

<script setup lang="ts">
    import { useAppStore } from '~~/store/app'
    const appStore = useAppStore()

    onMounted(() => {
        appStore.updateCookieConsent(true)
    })

</script>

<style scoped>
    .mainLayout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>