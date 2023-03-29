<template>
    <footer>
        <div class="footer-content">
 
            <span v-if="config.siteEnvironment">
            {{ config.siteEnvironment }}
            </span>

            <div></div>
            <div>&copy;{{ appStore.copyrightText }}</div>
            <div></div>

        </div>
    </footer>
</template>

<script setup lang="ts">
    import { useAppStore } from '~~/store/app'
    const appStore = useAppStore()
    const { public: config } = useRuntimeConfig() 
    console.log(config.siteEnvironment)
</script>

<style scoped>
footer {
    margin-top: auto;
    background-color: var(--clr-footer-background);
    color: var(--clr-footer-text);
}

.footer-content {
    margin: 1em 0;
    display: flex;
    justify-content: space-between;
}
</style>