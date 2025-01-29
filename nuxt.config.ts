/* eslint-disable-next-line */
// @ts-nocheck
import eslintPluginVue from 'eslint-plugin-vue';
import eslintVueAccessibility from 'eslint-plugin-vuejs-accessibility';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxtjs/html-validator', '@nuxt/image'],

  app: {
    head: {
      htmlAttrs: {
        lang: process.env?.DEFAULT_LOCALE || 'en-US',
      },
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1.0',
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          type: 'image/x-icon',
          href: '/assets/favicon/apple-touch-icon.png',
        },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicon/favicon-16x16.png' },
        { rel: 'mask-icon', href: '/assets/favicon/safari-pinned-tab.svg', color: '#ffffff' },
        { rel: 'icon', type: 'image/x-icon', href: '/assets/favicon/favicon.ico' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/assets/favicon/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  htmlValidator: {
    usePrettier: false,
    logLevel: 'verbose',
    failOnError: false,
    options: {
      rules: {
        'multiple-labeled-controls': 'off',
        'no-redundant-for': 'off',
      },
    },
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      siteHostname: process.env.SITE_HOSTNAME || '',
    },
  },
});
