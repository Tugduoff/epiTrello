import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  typescript: {
      typeCheck: true
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
      googleAuthUri: process.env.GOOGLE_AUTH_URI,
    },
    private: {
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
      googleTokenUri: process.env.GOOGLE_TOKEN_URI,
    },
  },
  compatibilityDate: '2024-09-19',
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-GB', file: 'en.json' },
      // { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'assets/langs/',
    strategy: 'no_prefix'
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
