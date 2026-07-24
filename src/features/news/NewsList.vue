<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import NewsMeta from './NewsMeta.vue'
import { useNewsConfig } from './config'
import { normalizeBoolean, normalizeNewsStatuses } from './utils'

type NewsEntry = {
  id: string
  title: string
  url: string
  filePath: string
  publishedAt: string
  importance: number
  tags: string[]
  statuses: string[]
}

type PageDataLike = {
  title?: string
  frontmatter?: {
    id?: string
    title?: string
    publishedAt?: string
    importance?: number | string
    tags?: string[] | string
    status?: string
    statuses?: string[] | string
  }
  filePath?: string
}

const pages = import.meta.glob('/news/**/*.md', {
  eager: true,
  import: '__pageData'
}) as Record<string, PageDataLike>

const props = defineProps<{
  limit?: number | string
  fromDate?: string
  toDate?: string
  minImportance?: number | string
  sortBy?: string
  tags?: string[] | string
  exclude?: string[] | string
  excludeCurrent?: boolean | string
}>()

const newsConfig = useNewsConfig()
const { page, frontmatter } = useData()
const route = useRoute()
const currentBrowserPath = ref<string | null>(null)

function withBasePath(path: string) {
  const basePath = newsConfig.value.basePath.replace(/\/+$/, '')
  const normalizedPath = (path.startsWith('/') ? path : `/${path}`)
    .replace(/^\/news(?=\/)/, '')

  return `${basePath}${normalizedPath}`.replace(/\/+/g, '/')
}

onMounted(() => {
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href
  currentBrowserPath.value = canonical ?? window.location.pathname
})

const currentId = computed(() => {
  const frontmatterId = normalizeId(frontmatter.value?.id)

  if (frontmatterId) {
    return frontmatterId
  }

  const relativePath = page.value?.relativePath

  if (typeof relativePath !== 'string' || !relativePath.trim()) {
    return null
  }

  return relativePath
    .replace(/(^|\/)index\.md$/i, '$1')
    .replace(/\.md$/i, '')
    .replace(/^\/+/, '')
    .toLowerCase()
})

function normalizeImportance(value: number | string | undefined) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value.trim())) {
    return Number(value.trim())
  }

  return 0
}

function normalizeTags(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value
      .filter((tag): tag is string => typeof tag === 'string')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
  }

  return []
}

function normalizeStringList(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function normalizeDateTimeValue(value: string | undefined) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  const timestamp = Date.parse(trimmed)

  if (Number.isNaN(timestamp)) {
    return trimmed
  }

  return new Date(timestamp).toISOString()
}

function normalizeId(value: string | undefined) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed ? trimmed : null
}

function normalizeNewsIdentifier(value: string | undefined) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  let normalized = trimmed

  if (/^[a-z]+:\/\//i.test(normalized)) {
    try {
      normalized = new URL(normalized).pathname
    } catch {
      return trimmed
    }
  }

  normalized = normalized.replace(/[?#].*$/, '')
  normalized = normalized.replace(/\\/g, '/')
  normalized = normalized.replace(/^\/+/, '/')

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`
  }

  normalized = normalized
    .replace(/\/index\.md$/i, '/')
    .replace(/\.md$/i, '')
    .replace(/\/index\.html$/i, '/')
    .replace(/\.html$/i, '')

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, '')
  }

  return normalized || '/'
}

function compareValues(a: number | string, b: number | string, locale: string) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }

  return String(a).localeCompare(String(b), locale)
}

function sortItems(items: NewsEntry[], sortBy: string, locale: string) {
  const clauses = sortBy
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  if (!clauses.length) {
    return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  }

  return [...items].sort((a, b) => {
    for (const clause of clauses) {
      const direction = clause.startsWith('-') ? -1 : 1
      const field = clause.replace(/^[-+]/, '')

      if (field !== 'publishedAt' && field !== 'importance' && field !== 'title') {
        continue
      }

      const result = compareValues(a[field], b[field], locale)

      if (result !== 0) {
        return result * direction
      }
    }

    return 0
  })
}

const allItems = computed(() => {
  return Object.values(pages)
    .map((page): NewsEntry | null => {
      const publishedAt = page.frontmatter?.publishedAt
      const filePath = page.filePath

      if (
        typeof publishedAt !== 'string' ||
        !publishedAt.trim() ||
        typeof filePath !== 'string' ||
        !filePath.trim()
      ) {
        return null
      }

      const title =
        typeof page.frontmatter?.title === 'string' && page.frontmatter.title.trim()
          ? page.frontmatter.title.trim()
          : typeof page.title === 'string' && page.title.trim()
            ? page.title.trim()
            : filePath

      return {
        id: normalizeId(page.frontmatter?.id) ?? filePath,
        title,
        url: withBasePath(`/${filePath
          .replace(/(^|\/)index\.md$/i, '$1')
          .replace(/\.md$/i, '.html')}`),
        filePath,
        publishedAt: publishedAt.trim(),
        importance: normalizeImportance(page.frontmatter?.importance),
        tags: normalizeTags(page.frontmatter?.tags),
        statuses: [
          ...normalizeNewsStatuses(page.frontmatter?.statuses),
          ...normalizeNewsStatuses(page.frontmatter?.status)
        ]
      }
    })
    .filter((item): item is NewsEntry => item !== null)
})

function normalizeLimit(value: number | string | undefined) {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value
  }

  if (typeof value === 'string' && /^\d+$/.test(value.trim())) {
    const parsed = Number(value.trim())

    if (parsed > 0) {
      return parsed
    }
  }

  return null
}

function isDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function matchesFromDate(item: NewsEntry, fromDate: string) {
  if (isDateOnly(fromDate)) {
    return item.publishedAt.slice(0, 10) >= fromDate
  }

  const fromTime = Date.parse(fromDate)
  const itemTime = Date.parse(item.publishedAt)

  return Number.isNaN(fromTime) || Number.isNaN(itemTime) || itemTime >= fromTime
}

function matchesToDate(item: NewsEntry, toDate: string) {
  if (isDateOnly(toDate)) {
    return item.publishedAt.slice(0, 10) <= toDate
  }

  const toTime = Date.parse(toDate)
  const itemTime = Date.parse(item.publishedAt)

  return Number.isNaN(toTime) || Number.isNaN(itemTime) || itemTime <= toTime
}

const items = computed(() => {
  const limit = normalizeLimit(props.limit)
  const minImportance = normalizeImportance(props.minImportance)
  const sortBy = props.sortBy ?? '-publishedAt'
  const locale = newsConfig.value.locale
  const requestedTags = normalizeTags(props.tags)
  const excludeCurrent = normalizeBoolean(props.excludeCurrent, false)
  const resolvedExcludeValues = [
    ...(excludeCurrent && currentId.value ? [currentId.value] : []),
    ...normalizeStringList(props.exclude)
  ]
  const excludedItems = new Set(
    resolvedExcludeValues
      .map((item) => normalizeNewsIdentifier(item))
      .filter((item): item is string => item !== null)
  )
  const excludedIds = new Set(
    resolvedExcludeValues
      .map((item) => normalizeId(item))
      .filter((item): item is string => item !== null)
  )
  const currentIdentifiers = new Set(
    [currentBrowserPath.value, route.path, page.value.relativePath, page.value.filePath]
      .filter((item): item is string => item !== null && item !== undefined)
      .map((item) => normalizeNewsIdentifier(item))
      .filter((item): item is string => item !== null)
  )
  const currentPublishedAt =
    normalizeDateTimeValue(
      typeof frontmatter.value.publishedAt === 'string' ? frontmatter.value.publishedAt : undefined
    )
  const currentTitle =
    typeof frontmatter.value.title === 'string' && frontmatter.value.title.trim()
      ? frontmatter.value.title.trim()
      : typeof page.value.title === 'string' && page.value.title.trim()
        ? page.value.title.trim()
        : null

  let filtered = allItems.value.filter((item) => {
    const itemIdentifiers = [
      normalizeNewsIdentifier(item.filePath),
      normalizeNewsIdentifier(item.url)
    ].filter((item): item is string => item !== null)

    if (excludedIds.has(item.id)) {
      return false
    }

    if (excludeCurrent && itemIdentifiers.some((identifier) => currentIdentifiers.has(identifier))) {
      return false
    }

    if (
      excludeCurrent &&
      currentPublishedAt &&
      normalizeDateTimeValue(item.publishedAt) === currentPublishedAt &&
      (!currentTitle || item.title === currentTitle)
    ) {
      return false
    }

    if (itemIdentifiers.some((identifier) => excludedItems.has(identifier))) {
      return false
    }

    if (props.fromDate && !matchesFromDate(item, props.fromDate)) {
      return false
    }

    if (props.toDate && !matchesToDate(item, props.toDate)) {
      return false
    }

    if (item.importance < minImportance) {
      return false
    }

    if (requestedTags.length && !requestedTags.some((tag) => item.tags.includes(tag))) {
      return false
    }

    return true
  })

  filtered = sortItems(filtered, sortBy, locale)

  if (limit !== null) {
    filtered = filtered.slice(0, limit)
  }

  return filtered
})

const latestYear = computed(() => {
  const years = items.value
    .map((item) => Number(item.publishedAt.slice(0, 4)))
    .filter((year) => Number.isFinite(year))

  return years.length ? Math.max(...years) : null
})

function shouldShowYear(value: string) {
  return Number(value.slice(0, 4)) !== latestYear.value
}
</script>

<template>
  <ul v-if="newsConfig.enabled && items.length" class="news-list">
    <li v-for="item in items" :key="item.url" class="news-list-item">
      <NewsMeta
        :published-at="item.publishedAt"
        :statuses="item.statuses"
        :show-year="shouldShowYear(item.publishedAt)"
        inline="true"
      />
      <a :href="item.url" class="news-link">{{ item.title }}</a>
    </li>
  </ul>
  <p v-else-if="newsConfig.enabled">{{ newsConfig.labels.emptyState }}</p>
</template>

<style scoped>
.news-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.news-list-item {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  column-gap: 0.75rem;
  align-items: baseline;
  padding: 0.25rem 0;
}

.news-link {
  min-width: 0;
}

@media (max-width: 640px) {
  .news-list-item {
    grid-template-columns: 1fr;
    row-gap: 0.15rem;
  }

  .news-link {
    order: 1;
  }

}
</style>
