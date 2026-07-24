<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useData } from 'vitepress'
import NewsMetaPublishedAt from './NewsMetaPublishedAt.vue'
import NewsMetaStatuses from './NewsMetaStatuses.vue'
import { normalizeBoolean, resolveNewsPublishedAt, resolveNewsStatuses } from './utils'

const props = defineProps<{
  publishedAt?: string
  status?: string
  statuses?: string[] | string
  showYear?: boolean | string
  inline?: boolean | string
}>()

const { frontmatter } = useData()
const slots = useSlots()

const inline = computed(() => normalizeBoolean(props.inline, false))

const hasPublishedAt = computed(() =>
  Boolean(resolveNewsPublishedAt(props.publishedAt, frontmatter.value.publishedAt))
)

const hasStatuses = computed(
  () =>
    resolveNewsStatuses(
      props.statuses,
      props.status,
      frontmatter.value.statuses,
      frontmatter.value.status
    ).length > 0
)

const hasContent = computed(() => {
  if (slots.default) {
    return true
  }

  return hasPublishedAt.value || hasStatuses.value
})
</script>

<template>
  <component
    :is="inline ? 'span' : 'div'"
    v-if="hasContent"
    class="news-meta"
    :class="{ 'news-meta-inline': inline }"
  >
    <slot>
      <NewsMetaPublishedAt :published-at="publishedAt" :show-year="showYear" />
      <NewsMetaStatuses :status="status" :statuses="statuses" />
    </slot>
  </component>
</template>

<style scoped>
.news-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  margin: 0 0 0.75rem;
}

.news-meta-inline {
  margin: 0;
}
</style>
