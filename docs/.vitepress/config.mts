import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/dyvo-vitepress/',
  title: 'dyvo-vitepress',
  description: 'Reusable VitePress theme, features, and utilities',
  lang: 'en-US',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/getting-started' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Installation', link: '/installation' },
          { text: 'Configuration', link: '/configuration' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Badges', link: '/components/badges' },
          { text: 'Theme', link: '/components/theme' },
          { text: 'Comments', link: '/components/comments' },
          { text: 'News', link: '/components/news' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Specification', link: '/specification' }
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
          { text: 'Guide', link: '/getting-started' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/getting-started' },
              { text: 'Installation', link: '/installation' },
              { text: 'Configuration', link: '/configuration' }
            ]
          },
          {
            text: 'Components',
            items: [
              { text: 'Badges', link: '/components/badges' },
              { text: 'Theme', link: '/components/theme' },
              { text: 'Comments', link: '/components/comments' },
              { text: 'News', link: '/components/news' }
            ]
          },
          {
            text: 'Development',
            items: [
              { text: 'Specification', link: '/specification' }
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
          { text: 'Посібник', link: '/uk/getting-started' }
        ],
        sidebar: [
          {
            text: 'Посібник',
            items: [
              { text: 'Початок роботи', link: '/uk/getting-started' },
              { text: 'Встановлення', link: '/uk/installation' },
              { text: 'Конфігурація', link: '/uk/configuration' }
            ]
          },
          {
            text: 'Компоненти',
            items: [
              { text: 'Бейджі', link: '/uk/components/badges' },
              { text: 'Тема', link: '/uk/components/theme' },
              { text: 'Коментарі', link: '/uk/components/comments' },
              { text: 'Новини', link: '/uk/components/news' }
            ]
          },
          {
            text: 'Розробка',
            items: [
              { text: 'Специфікація', link: '/uk/specification' }
            ]
          }
        ]
      }
    }
  }
})
