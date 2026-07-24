import { useData } from 'vitepress'
import { computed } from 'vue'
import {
  buildWeekdayLabels,
  deriveWeekFirstDay,
  normalizeSiteLocale
} from '../../shared/i18n'

export type NewsThemeLabels = {
  emptyState: string
  referenceDayLink: string
  currentDayLink: string
  nextDayLink: string
  previousDayLink: string
  referenceMonthLink: string
  currentMonthLink: string
  nextMonthLink: string
  previousMonthLink: string
  referenceYearLink: string
  currentYearLink: string
  nextYearLink: string
  previousYearLink: string
}

export type NewsThemeConfig = {
  contentTimeZone?: string
  weekFirstDay?: number
  news?: {
    enabled?: boolean
    basePath?: string
    labels?: Partial<NewsThemeLabels>
  }
}

const defaultNewsLabels: NewsThemeLabels = {
  emptyState: 'No news yet.',
  referenceDayLink: 'All news for {label}',
  currentDayLink: 'News for {label}',
  nextDayLink: 'News for {label}',
  previousDayLink: 'News for {label}',
  referenceMonthLink: 'All news in {label}',
  currentMonthLink: 'News in {label}',
  nextMonthLink: 'News in {label}',
  previousMonthLink: 'News in {label}',
  referenceYearLink: 'All news in {label}',
  currentYearLink: 'News in {label}',
  nextYearLink: 'News in {label}',
  previousYearLink: 'News in {label}'
}

function normalizeWeekFirstDay(value: number | undefined) {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 6
    ? value
    : null
}

export function formatNewsLabel(template: string, label: string | null | undefined) {
  return template.replaceAll('{label}', label ?? '')
}

export function useNewsConfig() {
  const { site, theme } = useData<NewsThemeConfig>()

  return computed(() => {
    const locale = normalizeSiteLocale(site.value.lang)
    const configuredWeekFirstDay = normalizeWeekFirstDay(theme.value.weekFirstDay)
    const weekFirstDay = configuredWeekFirstDay ?? deriveWeekFirstDay(locale)

    return {
      enabled: theme.value.news?.enabled === true,
      locale,
      basePath: theme.value.news?.basePath?.trim() || '/news/',
      contentTimeZone: theme.value.contentTimeZone ?? 'UTC',
      weekFirstDay,
      weekdayLabels: buildWeekdayLabels(locale, weekFirstDay),
      labels: {
        ...defaultNewsLabels,
        ...(theme.value.news?.labels ?? {})
      }
    }
  })
}
