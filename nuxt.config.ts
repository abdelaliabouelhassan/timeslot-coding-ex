export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  postcss: require('./postcss.config.js'),
  ssr: false,
  modules: ['@pinia/nuxt'],
})
