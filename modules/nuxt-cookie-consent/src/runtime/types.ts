import { ref } from 'vue'

export interface IframeOptions {
    initialState: boolean
} 

export interface ColorOptions {
    barTextColor: string
    modalOverlay: string
    barBackground: string
    barButtonColor: string
    modalTextColor: string
    modalBackground: string
    modalOverlayOpacity: number
    modalButtonColor: string
    modalUnsavedColor: string
    barButtonHoverColor: string
    barButtonBackground: string
    modalButtonHoverColor: string
    modalButtonBackground: string
    controlButtonIconColor: string
    controlButtonBackground: string
    barButtonHoverBackground: string
    checkboxActiveBackground: string
    checkboxInactiveBackground: string
    modalButtonHoverBackground: string
    checkboxDisabledBackground: string
    controlButtonIconHoverColor: string
    controlButtonHoverBackground: string
    checkboxActiveCircleBackground: string
    checkboxInactiveCircleBackground: string
    checkboxDisabledCircleBackground: string
}

export interface LocaleValues {
    barTitle: string
    barDescription: string
    acceptAll: string
    declineAll: string
    manageCookies: string
    unsaved: string
    close: string
    save: string
    necessary: string
    optional: string
    functional: string
    blockedIframe: string
    here: string
}

export interface LocaleOption {
    [key: string]: Partial<LocaleValues>
}

export interface TextOptions {
    locale: LocaleOption
}

export interface CookieGroupDescriptor {
    identifier: string
    name: string
    description: string
    src: string
    initialState: boolean
    async: boolean
    cookies: string[]
    accepted: (cookieGroupDescriptor: any) => void
    declined: (cookieGroupDescriptor: any) => void
}

export interface ModuleOptions {
    globalName: string | undefined
    css: boolean
    cssPolyfill: boolean
    domain: string
    locales: string[] | undefined
    controlButton: boolean
    blockIframe: boolean | Partial<IframeOptions>
    barPosition: string
    dashInDescription: boolean
    colors: boolean | Partial<ColorOptions>
    text: TextOptions | undefined 
    necessary: Partial<CookieGroupDescriptor>[] | undefined
    optional: Partial<CookieGroupDescriptor>[] | undefined
}

// available at runtime 
export interface CookieOptions extends ModuleOptions {
    modal: boolean
    consent: boolean
    enabled: Partial<CookieGroupDescriptor>[]
    enabledList: string[]
    slugify(arg0: string): string
    get(arg0: string): string
    set(arg0: object): void
    remove(name: any): void
    setConsent(isInit?: boolean): void
} 