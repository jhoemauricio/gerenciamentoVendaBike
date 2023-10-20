// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',

  ],
  supabase: {

    redirectOptions: {
      login: '/',
      // callback: '/confirm',
      // exclude: ['/cadastrar','/','/dashboard/cadastrarBike','/dashboard/editarBike']
      exclude: ['/','/cadastrar']
    }
  },



})
