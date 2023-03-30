import type { CookieOptions } from './types'
import { useNuxtApp } from '#imports'

export const useCookieConsent = () => {
    return useNuxtApp().$cookies as CookieOptions
}