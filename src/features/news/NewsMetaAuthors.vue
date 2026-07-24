<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DyvoUserBadge from '../../theme/components/DyvoUserBadge.vue'
import { normalizeBoolean, normalizeNewsAuthors, type NewsAuthor } from './utils'

const props = defineProps<{
  authors?: Array<string | { name?: string; github?: string }> | string
  showLabel?: boolean | string
}>()

const { frontmatter } = useData()

const resolvedAuthors = computed<NewsAuthor[]>(() => {
  if (props.authors !== undefined) {
    return normalizeNewsAuthors(props.authors)
  }

  return normalizeNewsAuthors(
    Array.isArray(frontmatter.value.authors) || typeof frontmatter.value.authors === 'string'
      ? frontmatter.value.authors
      : undefined
  )
})

const authorLabel = computed(() => (resolvedAuthors.value.length > 1 ? 'Автори:' : 'Автор:'))
const showLabel = computed(() => normalizeBoolean(props.showLabel, true))

</script>

<template>
  <div v-if="resolvedAuthors.length" class="news-meta-authors">
    <p v-if="showLabel" class="news-meta-authors-label">{{ authorLabel }}</p>
    <div class="news-meta-authors-list">
      <template v-for="(author, index) in resolvedAuthors" :key="`${author.name}-${author.github ?? index}`">
        <DyvoUserBadge
          :name="author.name"
          :github="author.github"
          size="medium"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.news-meta-authors {
  margin: 1.5rem 0 0;
}

.news-meta-authors-label {
  margin: 0 0 0.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.news-meta-authors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
}
</style>
