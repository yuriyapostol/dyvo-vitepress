import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './components/Layout.vue'
import DyvoBadge from './components/DyvoBadge.vue'
import DyvoUserBadge from './components/DyvoUserBadge.vue'
import { defineComponent, h } from 'vue'
import './styles/base.css'

const ThemeLayout = defineComponent({
  name: 'DyvoThemeLayout',
  setup(_, { slots }) {
    return () => h(Layout, null, slots)
  }
})

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DyvoBadge', DyvoBadge)
    app.component('DyvoUserBadge', DyvoUserBadge)
  },
  Layout: ThemeLayout
}

export default theme
