<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useNewsConfig } from './config'
import { formatNewsPublishedDate, normalizeBoolean, resolveNewsPublishedAt } from './utils'

const props = defineProps<{
  publishedAt?: string
  showYear?: boolean | string
}>()

const { frontmatter } = useData()
const newsConfig = useNewsConfig()
const resolvedPublishedAt = computed(() =>
  resolveNewsPublishedAt(props.publishedAt, frontmatter.value.publishedAt)
)

const showYear = computed(() => normalizeBoolean(props.showYear, false))

const formattedPublishedAt = computed(() => {
  if (!resolvedPublishedAt.value) {
    return ''
  }

  return formatNewsPublishedDate(
    resolvedPublishedAt.value,
    newsConfig.value.locale,
    newsConfig.value.contentTimeZone,
    showYear.value
  )
})
</script>

<template>
  <time v-if="resolvedPublishedAt" class="news-meta-date" :datetime="resolvedPublishedAt">
    {{ formattedPublishedAt }}
  </time>
</template>

<style scoped>
.news-meta-date {
  color: var(--vp-c-text-2);
  white-space: nowrap;
}
</style>
