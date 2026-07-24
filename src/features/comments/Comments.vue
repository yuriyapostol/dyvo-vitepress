<script setup lang="ts">
import Giscus from '@giscus/vue'
import { computed } from 'vue'
import { useData } from 'vitepress'
import lightThemeCss from './giscus-light-theme.css?raw'
import darkThemeCss from './giscus-dark-theme.css?raw'
import { useCommentsConfig } from './config'

const { frontmatter, page, isDark } = useData()
const commentsConfig = useCommentsConfig()
const lightThemeUrl = `data:text/css;charset=utf-8,${encodeURIComponent(lightThemeCss)}`
const darkThemeUrl = `data:text/css;charset=utf-8,${encodeURIComponent(darkThemeCss)}`

const fallbackId = computed(() => {
  const relativePath = page.value?.relativePath

  if (!relativePath) {
    return ''
  }

  return relativePath
    .replace(/(^|\/)index\.md$/i, '$1')
    .replace(/\.md$/i, '')
    .replace(/\/+/g, ':')
    .replace(/:+/g, ':')
    .replace(/^:+/, '')
    .toLowerCase()
})

const pageId = computed(() => {
  const frontmatterId = frontmatter.value?.id

  if (typeof frontmatterId === 'string') {
    const normalized = frontmatterId.trim()
    if (normalized) {
      return normalized
    }
  }

  return fallbackId.value
})

const commentsEnabled = computed(() => (
  commentsConfig.value.enabled &&
  frontmatter.value?.comments !== false &&
  commentsConfig.value.repo &&
  commentsConfig.value.repoId &&
  commentsConfig.value.category &&
  commentsConfig.value.categoryId
))

const giscusTheme = computed(() => {
  if (isDark.value) {
    return darkThemeUrl
  }

  return lightThemeUrl
})
</script>

<template>
  <div v-if="commentsEnabled && pageId" class="comments">
    <ClientOnly>
      <Giscus
        :key="`${pageId}:${giscusTheme}`"
        :repo="commentsConfig.repo"
        :repo-id="commentsConfig.repoId"
        :category="commentsConfig.category"
        :category-id="commentsConfig.categoryId"
        :mapping="commentsConfig.mapping"
        :strict="commentsConfig.strict"
        :term="pageId"
        :reactions-enabled="commentsConfig.reactionsEnabled"
        :emit-metadata="commentsConfig.emitMetadata"
        :input-position="commentsConfig.inputPosition"
        :lang="commentsConfig.giscusLang"
        :loading="commentsConfig.loading"
        crossorigin="anonymous"
        :theme="giscusTheme"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.comments {
  margin-top: 48px;
}
</style>
