<template>
  <div>
    {{cookies}}
    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
  const cookies = useCookieConsent()
</script>
