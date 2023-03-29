<template>
    <footer>
        <div class="footer-content">

            <div></div>
            <div>&copy;{{ appStore.copyrightText }}</div>
            <div class="contact-details">hmu: 123</div>
            <div></div>

        </div>
    </footer>
</template>

<script setup lang="ts">
import { useAppStore } from '~~/store/app'
    const { public: config } = useRuntimeConfig() 
    const appStore = useAppStore()
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