const GlobalSettings = {
    development: {
        siteEnvironment: 'Dev',
        telephone: '123',
    },
    staging: {
        siteEnvironment: 'Test',
        telephone: '456',
    },
    production: {
        siteEnvironment: '',
        telephone: '789',
    },
}

export { GlobalSettings }

// another potential option: 
// https://dykraf.com/blog/how-to-use-environment-variables-in-nuxtjs-web-applications