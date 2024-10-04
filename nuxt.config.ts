import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  compatibilityDate: '2024-09-19',
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-GB', file: 'en.json' },
      // { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'assets/langs/',
    strategy: 'prefix'
  },
  css: ['~/assets/css/tailwind.css'],
  // css: [
  //   'bootstrap/dist/css/bootstrap.min.css'
  // ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
