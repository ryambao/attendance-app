export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'attendance-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/firebase',
  ],

  // Firebase settings
  firebase: {
    config: {
      apiKey: "AIzaSyBZUxUszIsEFTYfzp7JKMBvdJ4QblHQZOs",
      authDomain: "attendance-app-16be5.firebaseapp.com",
      databaseURL: "https://attendance-app-16be5-default-rtdb.firebaseio.com",
      projectId: "attendance-app-16be5",
      storageBucket: "attendance-app-16be5.appspot.com",
      messagingSenderId: "749233251129",
      appId: "1:749233251129:web:60c90c0d2f164f80b53ee8",
      measurementId: "G-JSST0HS0M0",
    },
    services: {
      auth: true,
      database: true,
      storage: true,
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
