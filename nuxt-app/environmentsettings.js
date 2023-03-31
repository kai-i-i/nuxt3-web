const GlobalSettings = {
    development: {
        siteEnvironment: 'Dev',
        telephone: '123',
        googleTagManagerKey: 'GTM-MTM6H6Q',
        googleTagManagerEnabled: true,
        googleTagManagerDebug: true,
    },
    staging: {
        siteEnvironment: 'Staging',
        telephone: '456',
        googleTagManagerKey: 'GTM-MTM6H6Q',
        googleTagManagerEnabled: true,
        googleTagManagerDebug: true,
    },
    production: {
        siteEnvironment: '',
        telephone: '789',
        googleTagManagerKey: 'GTM-MTM6H6Q',
        googleTagManagerEnabled: true,
        googleTagManagerDebug: false,
    },
}

export { GlobalSettings }

// another potential option: 
// https://dykraf.com/blog/how-to-use-environment-variables-in-nuxtjs-web-applications