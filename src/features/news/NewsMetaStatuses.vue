<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { resolveNewsStatuses } from './utils'

const props = defineProps<{
  status?: string
  statuses?: string[] | string
}>()

const { frontmatter } = useData()

const resolvedStatuses = computed(() =>
  resolveNewsStatuses(props.statuses, props.status, frontmatter.value.statuses, frontmatter.value.status)
)

function statusClass(status: string) {
  return status.trim().toLowerCase() === 'оновлюється' ? 'news-meta-badge-updating' : ''
}
</script>

<template>
  <template v-for="status in resolvedStatuses" :key="status">
    <span class="news-meta-badge" :class="statusClass(status)">
      {{ status }}
    </span>
  </template>
</template>

<style scoped>
.news-meta-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.12rem 0.55rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1.35;
}

.news-meta-badge-updating {
  border-color: color-mix(in srgb, #e0b24a 55%, var(--vp-c-divider));
  background: color-mix(in srgb, #f6d77a 20%, transparent);
  color: color-mix(in srgb, #ffa600 70%, var(--vp-c-text-1));
}
</style>
