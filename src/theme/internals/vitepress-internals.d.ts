declare module 'vitepress/dist/client/theme-default/composables/sidebar' {
  import type { Ref } from 'vue'

  export function useCloseSidebarOnEscape(
    isOpen: Ref<boolean>,
    close: () => void
  ): void
}

declare module 'vitepress/dist/client/theme-default/composables/outline' {
  export type OutlineHeader = {
    level: number
    title: string
    link: string
    children: OutlineHeader[]
  }

  export function getHeaders(range: unknown): OutlineHeader[]
}

declare module 'vitepress/dist/client/theme-default/components/VPBackdrop.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'vitepress/dist/client/theme-default/components/VPContent.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'vitepress/dist/client/theme-default/components/VPFooter.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'vitepress/dist/client/theme-default/components/VPNav.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'vitepress/dist/client/theme-default/components/VPSkipLink.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
