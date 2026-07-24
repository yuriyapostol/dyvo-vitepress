import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'dyvo-vitepress',
  description: 'Reusable VitePress theme, features, and utilities',
  lang: 'en-US',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Architecture', link: '/architecture' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'Specification', link: '/specification' }
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'Installation', link: '/usage/installation' },
          { text: 'Configuration', link: '/usage/configuration' },
          { text: 'Theme', link: '/usage/theme' },
          { text: 'Comments', link: '/usage/comments' },
          { text: 'News', link: '/usage/news' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Local Development', link: '/development/local-development' },
          { text: 'Upstream Strategy', link: '/development/upstream-strategy' }
        ]
      }
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/getting-started' },
          { text: 'Architecture', link: '/architecture' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/getting-started' },
              { text: 'Architecture', link: '/architecture' },
              { text: 'Specification', link: '/specification' }
            ]
          },
          {
            text: 'Usage',
            items: [
              { text: 'Installation', link: '/usage/installation' },
              { text: 'Configuration', link: '/usage/configuration' },
              { text: 'Theme', link: '/usage/theme' },
              { text: 'Comments', link: '/usage/comments' },
              { text: 'News', link: '/usage/news' }
            ]
          },
          {
            text: 'Development',
            items: [
              { text: 'Local Development', link: '/development/local-development' },
              { text: 'Upstream Strategy', link: '/development/upstream-strategy' }
            ]
          }
        ]
      }
    },
    uk: {
      label: 'Українська',
      lang: 'uk-UA',
      link: '/uk/',
      themeConfig: {
        nav: [
          { text: 'Посібник', link: '/uk/getting-started' },
          { text: 'Архітектура', link: '/uk/architecture' }
        ],
        sidebar: [
          {
            text: 'Посібник',
            items: [
              { text: 'Початок роботи', link: '/uk/getting-started' },
              { text: 'Архітектура', link: '/uk/architecture' },
              { text: 'Специфікація', link: '/uk/specification' }
            ]
          },
          {
            text: 'Використання',
            items: [
              { text: 'Встановлення', link: '/uk/usage/installation' },
              { text: 'Конфігурація', link: '/uk/usage/configuration' },
              { text: 'Тема', link: '/uk/usage/theme' },
              { text: 'Коментарі', link: '/uk/usage/comments' },
              { text: 'Новини', link: '/uk/usage/news' }
            ]
          },
          {
            text: 'Розробка',
            items: [
              { text: 'Локальна розробка', link: '/uk/development/local-development' },
              { text: 'Стратегія щодо upstream', link: '/uk/development/upstream-strategy' }
            ]
          }
        ]
      }
    }
  }
})
