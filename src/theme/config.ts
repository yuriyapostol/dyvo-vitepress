import type { DefaultTheme } from 'vitepress'
import type { CommentsThemeConfig } from '../features/comments/config'
import type { NewsThemeConfig } from '../features/news/config'

export type SidebarItem = Omit<DefaultTheme.SidebarItem, 'items'> & {
  activeMatch?: string
  items?: SidebarItem[]
}

export type Sidebar =
  | SidebarItem[]
  | Record<string, SidebarItem[] | { items: SidebarItem[]; base: string }>

export type ThemeConfig = Omit<DefaultTheme.Config, 'sidebar'> & {
  sidebar?: Sidebar
  branding?: {
    logoLight?: string
    logoDark?: string
    siteTitle?: string | false
  }
} & CommentsThemeConfig & NewsThemeConfig

export function defineThemeConfig<T extends ThemeConfig>(config: T): T {
  return config
}
