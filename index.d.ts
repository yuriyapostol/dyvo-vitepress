export type ThemeConfig = any
export type Sidebar = any
export type SidebarItem = any

export declare const theme: import('vitepress').Theme
export declare function defineThemeConfig<T = ThemeConfig>(config: T): T
export declare function toOpenGraphLocale(locale: string): string

export declare const Badge: any
export declare const Comments: any
export declare function useCommentsConfig(): any

export declare const NewsArchiveLinks: any
export declare const NewsList: any
export declare const NewsMeta: any
export declare const NewsMetaAuthors: any
export declare const NewsMetaPublishedAt: any
export declare const NewsMetaStatuses: any
export declare function formatNewsLabel(...args: any[]): any
export declare function useNewsConfig(): any
