// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],  
  pwa: {
    devOptions: {
      enabled: true
    },
    manifest: {
      name: "Planeswalker List",
      short_name: "Planeswalker List",
      theme_color: "#ffffff",
      
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },
  app: {
    baseURL: '/gh-planeswalker-list/',
    head: {
      title: 'Planeswalker List',
      meta: [
        { name: 'description', content: 'List of MtG Planeswalker cards I still need to collect' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      htmlAttrs: {
        lang: 'en'
      },      
    }
  },
  imports: {
    autoImport: true,
  },
});
