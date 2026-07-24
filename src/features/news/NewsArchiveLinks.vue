<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { formatNewsLabel, useNewsConfig } from './config'
import { normalizeBoolean } from './utils'

type NewsEntry = {
  publishedAt: string
}

type PageDataLike = {
  frontmatter?: {
    publishedAt?: string
  }
  filePath?: string
}

type DateParts = {
  year: string
  month: string
  day: string
}

type CalendarMonth = {
  key: string
  year: string
  month: string
  label: string
  link?: string
  weeks: Array<
    Array<{
      key: string
      day: string
      link?: string
      isCurrentMonth: boolean
      hasNews: boolean
      isInRange: boolean
    }>
  >
}

const props = defineProps<{
  fromDate?: string
  toDate?: string
  showCurrentDayLink?: boolean | string
  showReferenceDayLink?: boolean | string
  showCurrentMonthLink?: boolean | string
  showReferenceMonthLink?: boolean | string
  showPreviousMonthLink?: boolean | string
  showNextMonthLink?: boolean | string
  showCurrentYearLink?: boolean | string
  showReferenceYearLink?: boolean | string
  showPreviousYearLink?: boolean | string
  showNextYearLink?: boolean | string
  showPreviousDayLink?: boolean | string
  showNextDayLink?: boolean | string
  showCalendar?: boolean | string
  hideCalendarMonthLinks?: boolean | string
}>()

const newsConfig = useNewsConfig()

const pages = import.meta.glob('/news/**/*.md', {
  eager: true,
  import: '__pageData'
}) as Record<string, PageDataLike>

function withBasePath(path: string) {
  const basePath = newsConfig.value.basePath.replace(/\/+$/, '')
  const normalizedPath = (path.startsWith('/') ? path : `/${path}`)
    .replace(/^\/news(?=\/)/, '')

  return `${basePath}${normalizedPath}`.replace(/\/+/g, '/')
}

function isDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function matchesFromDate(publishedAt: string, fromDate: string) {
  if (isDateOnly(fromDate)) {
    return publishedAt.slice(0, 10) >= fromDate
  }

  const fromTime = Date.parse(fromDate)
  const itemTime = Date.parse(publishedAt)

  return Number.isNaN(fromTime) || Number.isNaN(itemTime) || itemTime >= fromTime
}

function matchesToDate(publishedAt: string, toDate: string) {
  if (isDateOnly(toDate)) {
    return publishedAt.slice(0, 10) <= toDate
  }

  const toTime = Date.parse(toDate)
  const itemTime = Date.parse(publishedAt)

  return Number.isNaN(toTime) || Number.isNaN(itemTime) || itemTime <= toTime
}

function getDatePartsInTimeZone(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: newsConfig.value.contentTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date)

  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  if (!year || !month || !day) {
    return null
  }

  return { year, month, day }
}

function formatMonthLabel(year: string, month: string) {
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
  const monthLabel = new Intl.DateTimeFormat(newsConfig.value.locale, {
    month: 'long',
    timeZone: 'UTC'
  })
    .formatToParts(date)
    .find((part) => part.type === 'month')
    ?.value

  if (!monthLabel) {
    return month
  }

  return monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)
}

function formatMonthLinkLabel(year: string, month: string) {
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
  const monthLabel = new Intl.DateTimeFormat(newsConfig.value.locale, {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  })
    .formatToParts(date)
    .find((part) => part.type === 'month')
    ?.value

  return monthLabel ?? month
}

function formatDayLinkLabel(year: string, month: string, day: string) {
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  const formatted = new Intl.DateTimeFormat(newsConfig.value.locale, {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  }).format(date)

  return formatted
}

function buildDayLink(parts: DateParts | null) {
  if (!parts) {
    return undefined
  }

  return withBasePath(`/${parts.year}/${parts.month}/${parts.day}/`)
}

function buildMonthLink(parts: Pick<DateParts, 'year' | 'month'> | null) {
  if (!parts) {
    return undefined
  }

  return withBasePath(`/${parts.year}/${parts.month}/`)
}

function buildYearLink(year: string | null) {
  return year ? withBasePath(`/${year}/`) : undefined
}

function isSameDayParts(a: DateParts | null, b: DateParts | null) {
  return !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day
}

function isSameMonthParts(
  a: Pick<DateParts, 'year' | 'month'> | null,
  b: Pick<DateParts, 'year' | 'month'> | null
) {
  return !!a && !!b && a.year === b.year && a.month === b.month
}

function parseDateOnly(value: string) {
  if (!isDateOnly(value)) {
    return null
  }

  const [year, month, day] = value.split('-')

  if (!year || !month || !day) {
    return null
  }

  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
}

function getMonthBounds(year: string, month: string) {
  const lastDay = new Date(Date.UTC(Number(year), Number(month), 0)).getUTCDate()

  return {
    from: `${year}-${month}-01`,
    to: `${year}-${month}-${String(lastDay).padStart(2, '0')}`
  }
}

function getYearBounds(year: string) {
  return {
    from: `${year}-01-01`,
    to: `${year}-12-31`
  }
}

function formatDateKey(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function isDateKeyInRange(dateKey: string) {
  if (props.fromDate && dateKey < props.fromDate.slice(0, 10)) {
    return false
  }

  if (props.toDate && dateKey > props.toDate.slice(0, 10)) {
    return false
  }

  return true
}

function buildMonthWeeks(year: string, month: string, newsDays: Set<string>) {
  const firstDay = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
  const daysInMonth = new Date(Date.UTC(Number(year), Number(month), 0)).getUTCDate()
  const firstWeekday = (firstDay.getUTCDay() - newsConfig.value.weekFirstDay + 7) % 7
  const cells: CalendarMonth['weeks'][number] = []

  for (let index = 0; index < firstWeekday; index += 1) {
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1 - (firstWeekday - index)))
    cells.push({
      key: formatDateKey(date),
      day: '',
      link: undefined,
      isCurrentMonth: false,
      hasNews: false,
      isInRange: false
    })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, day))
    const dateKey = formatDateKey(date)
    const hasNews = newsDays.has(dateKey)
    const isInRange = isDateKeyInRange(dateKey)

    cells.push({
      key: dateKey,
      day: String(day),
      link: hasNews && isInRange ? withBasePath(`/${year}/${month}/${String(day).padStart(2, '0')}/`) : undefined,
      isCurrentMonth: true,
      hasNews,
      isInRange
    })
  }

  const trailing = (7 - (cells.length % 7)) % 7

  for (let index = 1; index <= trailing; index += 1) {
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, daysInMonth + index))
    cells.push({
      key: formatDateKey(date),
      day: '',
      link: undefined,
      isCurrentMonth: false,
      hasNews: false,
      isInRange: false
    })
  }

  const weeks: CalendarMonth['weeks'] = []

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7))
  }

  return weeks
}

const currentDate = ref<DateParts | null>(null)

onMounted(() => {
  currentDate.value = getDatePartsInTimeZone(new Date())
})

const newsItems = computed(() => {
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

      return { publishedAt: publishedAt.trim() }
    })
    .filter((item): item is NewsEntry => item !== null)
})

const filteredNewsItems = computed(() => {
  return newsItems.value.filter((item) => {
    if (props.fromDate && !matchesFromDate(item.publishedAt, props.fromDate)) {
      return false
    }

    if (props.toDate && !matchesToDate(item.publishedAt, props.toDate)) {
      return false
    }

    return true
  })
})

const showCurrentDayLink = computed(() => normalizeBoolean(props.showCurrentDayLink, false))
const showReferenceDayLink = computed(() => normalizeBoolean(props.showReferenceDayLink, false))
const showCurrentMonthLink = computed(() => normalizeBoolean(props.showCurrentMonthLink, false))
const showReferenceMonthLink = computed(() => normalizeBoolean(props.showReferenceMonthLink, false))
const showPreviousMonthLink = computed(() => normalizeBoolean(props.showPreviousMonthLink, false))
const showNextMonthLink = computed(() => normalizeBoolean(props.showNextMonthLink, false))
const showCurrentYearLink = computed(() => normalizeBoolean(props.showCurrentYearLink, false))
const showReferenceYearLink = computed(() => normalizeBoolean(props.showReferenceYearLink, false))
const showPreviousYearLink = computed(() => normalizeBoolean(props.showPreviousYearLink, false))
const showNextYearLink = computed(() => normalizeBoolean(props.showNextYearLink, false))
const showPreviousDayLink = computed(() => normalizeBoolean(props.showPreviousDayLink, false))
const showNextDayLink = computed(() => normalizeBoolean(props.showNextDayLink, false))
const showCalendar = computed(() => normalizeBoolean(props.showCalendar, false))
const showMonthLinks = computed(() => !normalizeBoolean(props.hideCalendarMonthLinks, false))

const referenceDate = computed(() => {
  if (props.fromDate) {
    return parseDateOnly(props.fromDate.slice(0, 10))
  }

  if (currentDate.value) {
    return parseDateOnly(
      `${currentDate.value.year}-${currentDate.value.month}-${currentDate.value.day}`
    )
  }

  return null
})

const referenceDayParts = computed(() => {
  if (!referenceDate.value) {
    return null
  }

  return getDatePartsInTimeZone(referenceDate.value)
})

const isDayArchivePage = computed(() => {
  return !!(
    props.fromDate &&
    props.toDate &&
    isDateOnly(props.fromDate.slice(0, 10)) &&
    props.fromDate.slice(0, 10) === props.toDate.slice(0, 10)
  )
})

const isMonthArchivePage = computed(() => {
  const referenceMonth = referenceMonthParts.value

  if (!props.fromDate || !props.toDate || !referenceMonth) {
    return false
  }

  const bounds = getMonthBounds(referenceMonth.year, referenceMonth.month)

  return props.fromDate.slice(0, 10) === bounds.from && props.toDate.slice(0, 10) === bounds.to
})

const isYearArchivePage = computed(() => {
  const referenceMonth = referenceMonthParts.value

  if (!props.fromDate || !props.toDate || !referenceMonth) {
    return false
  }

  const bounds = getYearBounds(referenceMonth.year)

  return props.fromDate.slice(0, 10) === bounds.from && props.toDate.slice(0, 10) === bounds.to
})

const hasNewsToday = computed(() => {
  const current = currentDate.value

  if (!current) {
    return false
  }

  return filteredNewsItems.value.some((item) => {
    const parts = getDatePartsInTimeZone(item.publishedAt)

    return (
      parts &&
      parts.year === current.year &&
      parts.month === current.month &&
      parts.day === current.day
    )
  })
})

const hasNewsThisMonth = computed(() => {
  const current = currentDate.value

  if (!current) {
    return false
  }

  return filteredNewsItems.value.some((item) => {
    const parts = getDatePartsInTimeZone(item.publishedAt)

    return (
      parts &&
      parts.year === current.year &&
      parts.month === current.month
    )
  })
})

const todayLink = computed(() => {
  return buildDayLink(currentDate.value)
})

const monthLink = computed(() => {
  return buildMonthLink(currentDate.value)
})

const todayLabel = computed(() => {
  if (!currentDate.value) {
    return null
  }

  return formatDayLinkLabel(currentDate.value.year, currentDate.value.month, currentDate.value.day)
})

const monthLabel = computed(() => {
  if (!currentDate.value) {
    return null
  }

  return formatMonthLinkLabel(currentDate.value.year, currentDate.value.month)
})

const referenceMonthParts = computed(() => {
  if (!referenceDate.value) {
    return null
  }

  return getDatePartsInTimeZone(referenceDate.value)
})

const hasNewsReferenceMonth = computed(() => {
  const referenceMonth = referenceMonthParts.value

  if (!referenceMonth) {
    return false
  }

  return newsItems.value.some((item) => {
    const parts = getDatePartsInTimeZone(item.publishedAt)

    return (
      parts &&
      parts.year === referenceMonth.year &&
      parts.month === referenceMonth.month
    )
  })
})

const referenceMonthLink = computed(() => {
  return buildMonthLink(referenceMonthParts.value)
})

const referenceMonthLabel = computed(() => {
  const referenceMonth = referenceMonthParts.value

  if (!referenceMonth) {
    return null
  }

  return formatMonthLinkLabel(referenceMonth.year, referenceMonth.month)
})

const previousDayParts = computed(() => {
  if (!referenceDate.value) {
    return null
  }

  const date = new Date(referenceDate.value)
  date.setUTCDate(date.getUTCDate() - 1)

  return getDatePartsInTimeZone(date)
})

const nextDayParts = computed(() => {
  if (!referenceDate.value) {
    return null
  }

  const date = new Date(referenceDate.value)
  date.setUTCDate(date.getUTCDate() + 1)

  return getDatePartsInTimeZone(date)
})

function hasNewsForDay(parts: DateParts | null) {
  if (!parts) {
    return false
  }

  return newsItems.value.some((item) => {
    const itemParts = getDatePartsInTimeZone(item.publishedAt)

    return (
      itemParts &&
      itemParts.year === parts.year &&
      itemParts.month === parts.month &&
      itemParts.day === parts.day
    )
  })
}

const hasNewsPreviousDay = computed(() => hasNewsForDay(previousDayParts.value))
const hasNewsNextDay = computed(() => hasNewsForDay(nextDayParts.value))

const previousDayLink = computed(() => {
  return buildDayLink(previousDayParts.value)
})

const nextDayLink = computed(() => {
  return buildDayLink(nextDayParts.value)
})

const previousDayLabel = computed(() => {
  if (!previousDayParts.value) {
    return null
  }

  return formatDayLinkLabel(
    previousDayParts.value.year,
    previousDayParts.value.month,
    previousDayParts.value.day
  )
})

const nextDayLabel = computed(() => {
  if (!nextDayParts.value) {
    return null
  }

  return formatDayLinkLabel(nextDayParts.value.year, nextDayParts.value.month, nextDayParts.value.day)
})

function shiftMonth(parts: Pick<DateParts, 'year' | 'month'> | null, delta: number) {
  if (!parts) {
    return null
  }

  const date = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1 + delta, 1))

  return getDatePartsInTimeZone(date)
}

function hasNewsForMonth(parts: Pick<DateParts, 'year' | 'month'> | null) {
  if (!parts) {
    return false
  }

  return newsItems.value.some((item) => {
    const itemParts = getDatePartsInTimeZone(item.publishedAt)

    return itemParts && itemParts.year === parts.year && itemParts.month === parts.month
  })
}

function hasNewsForYear(year: string | null) {
  if (!year) {
    return false
  }

  return newsItems.value.some((item) => item.publishedAt.slice(0, 4) === year)
}

const referenceDayLink = computed(() => buildDayLink(referenceDayParts.value))

const referenceDayLabel = computed(() => {
  if (!referenceDayParts.value) {
    return null
  }

  return formatDayLinkLabel(
    referenceDayParts.value.year,
    referenceDayParts.value.month,
    referenceDayParts.value.day
  )
})

const previousMonthParts = computed(() => shiftMonth(referenceMonthParts.value, -1))
const nextMonthParts = computed(() => shiftMonth(referenceMonthParts.value, 1))

const hasNewsPreviousMonth = computed(() => hasNewsForMonth(previousMonthParts.value))
const hasNewsNextMonth = computed(() => hasNewsForMonth(nextMonthParts.value))

const previousMonthLink = computed(() => buildMonthLink(previousMonthParts.value))
const nextMonthLink = computed(() => buildMonthLink(nextMonthParts.value))

const previousMonthLabel = computed(() => {
  if (!previousMonthParts.value) {
    return null
  }

  return formatMonthLinkLabel(previousMonthParts.value.year, previousMonthParts.value.month)
})

const nextMonthLabel = computed(() => {
  if (!nextMonthParts.value) {
    return null
  }

  return formatMonthLinkLabel(nextMonthParts.value.year, nextMonthParts.value.month)
})

const currentYearLabel = computed(() => currentDate.value?.year ?? null)
const currentYearLink = computed(() => buildYearLink(currentYearLabel.value))

const referenceYearLabel = computed(() => referenceMonthParts.value?.year ?? null)
const referenceYearLink = computed(() => buildYearLink(referenceYearLabel.value))

const previousYearLabel = computed(() => {
  if (!referenceYearLabel.value) {
    return null
  }

  return String(Number(referenceYearLabel.value) - 1)
})

const nextYearLabel = computed(() => {
  if (!referenceYearLabel.value) {
    return null
  }

  return String(Number(referenceYearLabel.value) + 1)
})

const previousYearLink = computed(() => buildYearLink(previousYearLabel.value))
const nextYearLink = computed(() => buildYearLink(nextYearLabel.value))

const hasNewsCurrentYear = computed(() => hasNewsForYear(currentYearLabel.value))
const hasNewsReferenceYear = computed(() => hasNewsForYear(referenceYearLabel.value))
const hasNewsPreviousYear = computed(() => hasNewsForYear(previousYearLabel.value))
const hasNewsNextYear = computed(() => hasNewsForYear(nextYearLabel.value))

const isReferenceDayCurrentDay = computed(() => {
  return !!(
    currentDate.value &&
    referenceDayParts.value &&
    currentDate.value.year === referenceDayParts.value.year &&
    currentDate.value.month === referenceDayParts.value.month &&
    currentDate.value.day === referenceDayParts.value.day
  )
})

const isReferenceMonthCurrentMonth = computed(() => {
  return !!(
    currentDate.value &&
    referenceMonthParts.value &&
    currentDate.value.year === referenceMonthParts.value.year &&
    currentDate.value.month === referenceMonthParts.value.month
  )
})

const isReferenceYearCurrentYear = computed(() => {
  return !!(
    currentYearLabel.value &&
    referenceYearLabel.value &&
    currentYearLabel.value === referenceYearLabel.value
  )
})

const canShowReferenceDayLink = computed(() => {
  if (!showReferenceDayLink.value || !referenceDayLink.value || !referenceDayLabel.value) {
    return false
  }

  return !isDayArchivePage.value
})

const canShowTodayLink = computed(() => {
  if (!(showCurrentDayLink.value && hasNewsToday.value && todayLink.value && todayLabel.value)) {
    return false
  }

  if (isDayArchivePage.value && isReferenceDayCurrentDay.value) {
    return false
  }

  if (canShowReferenceDayLink.value && isReferenceDayCurrentDay.value) {
    return false
  }

  return true
})

const canShowReferenceMonthLink = computed(() => {
  if (
    !showReferenceMonthLink.value ||
    !hasNewsReferenceMonth.value ||
    !referenceMonthLink.value ||
    !referenceMonthLabel.value
  ) {
    return false
  }

  return !isMonthArchivePage.value
})

const canShowCurrentMonthLink = computed(() => {
  if (!(showCurrentMonthLink.value && hasNewsThisMonth.value && monthLink.value && monthLabel.value)) {
    return false
  }

  if (isMonthArchivePage.value && isReferenceMonthCurrentMonth.value) {
    return false
  }

  if (canShowReferenceMonthLink.value && isReferenceMonthCurrentMonth.value) {
    return false
  }

  return true
})

const canShowReferenceYearLink = computed(() => {
  if (
    !showReferenceYearLink.value ||
    !hasNewsReferenceYear.value ||
    !referenceYearLink.value ||
    !referenceYearLabel.value
  ) {
    return false
  }

  return !isYearArchivePage.value
})

const canShowCurrentYearLink = computed(() => {
  if (
    !(showCurrentYearLink.value && hasNewsCurrentYear.value && currentYearLink.value && currentYearLabel.value)
  ) {
    return false
  }

  if (isYearArchivePage.value && isReferenceYearCurrentYear.value) {
    return false
  }

  if (canShowReferenceYearLink.value && isReferenceYearCurrentYear.value) {
    return false
  }

  return true
})

const canShowNextDayLink = computed(() => {
  if (!(showNextDayLink.value && hasNewsNextDay.value && nextDayLink.value && nextDayLabel.value)) {
    return false
  }

  if (canShowReferenceDayLink.value && isSameDayParts(nextDayParts.value, referenceDayParts.value)) {
    return false
  }

  if (canShowTodayLink.value && isSameDayParts(nextDayParts.value, currentDate.value)) {
    return false
  }

  return true
})

const canShowPreviousDayLink = computed(() => {
  if (
    !(showPreviousDayLink.value && hasNewsPreviousDay.value && previousDayLink.value && previousDayLabel.value)
  ) {
    return false
  }

  if (canShowReferenceDayLink.value && isSameDayParts(previousDayParts.value, referenceDayParts.value)) {
    return false
  }

  if (canShowTodayLink.value && isSameDayParts(previousDayParts.value, currentDate.value)) {
    return false
  }

  return true
})

const canShowNextMonthLink = computed(() => {
  if (!(showNextMonthLink.value && hasNewsNextMonth.value && nextMonthLink.value && nextMonthLabel.value)) {
    return false
  }

  if (canShowReferenceMonthLink.value && isSameMonthParts(nextMonthParts.value, referenceMonthParts.value)) {
    return false
  }

  if (canShowCurrentMonthLink.value && isSameMonthParts(nextMonthParts.value, currentDate.value)) {
    return false
  }

  return true
})

const canShowPreviousMonthLink = computed(() => {
  if (
    !(showPreviousMonthLink.value &&
      hasNewsPreviousMonth.value &&
      previousMonthLink.value &&
      previousMonthLabel.value)
  ) {
    return false
  }

  if (
    canShowReferenceMonthLink.value &&
    isSameMonthParts(previousMonthParts.value, referenceMonthParts.value)
  ) {
    return false
  }

  if (canShowCurrentMonthLink.value && isSameMonthParts(previousMonthParts.value, currentDate.value)) {
    return false
  }

  return true
})

const canShowNextYearLink = computed(() => {
  if (!(showNextYearLink.value && hasNewsNextYear.value && nextYearLink.value && nextYearLabel.value)) {
    return false
  }

  if (canShowReferenceYearLink.value && nextYearLabel.value === referenceYearLabel.value) {
    return false
  }

  if (canShowCurrentYearLink.value && nextYearLabel.value === currentYearLabel.value) {
    return false
  }

  return true
})

const canShowPreviousYearLink = computed(() => {
  if (
    !(showPreviousYearLink.value &&
      hasNewsPreviousYear.value &&
      previousYearLink.value &&
      previousYearLabel.value)
  ) {
    return false
  }

  if (canShowReferenceYearLink.value && previousYearLabel.value === referenceYearLabel.value) {
    return false
  }

  if (canShowCurrentYearLink.value && previousYearLabel.value === currentYearLabel.value) {
    return false
  }

  return true
})

const hasVisiblePeriodLinks = computed(() => {
  return (
    canShowReferenceDayLink.value ||
    canShowTodayLink.value ||
    canShowNextDayLink.value ||
    canShowPreviousDayLink.value ||
    canShowReferenceMonthLink.value ||
    canShowCurrentMonthLink.value ||
    canShowNextMonthLink.value ||
    canShowPreviousMonthLink.value ||
    canShowReferenceYearLink.value ||
    canShowCurrentYearLink.value ||
    canShowNextYearLink.value ||
    canShowPreviousYearLink.value
  )
})

const calendarMonths = computed<CalendarMonth[]>(() => {
  const months = new Map<string, CalendarMonth>()
  const monthNewsDays = new Map<string, Set<string>>()

  filteredNewsItems.value.forEach((item) => {
    const parts = getDatePartsInTimeZone(item.publishedAt)

    if (!parts) {
      return
    }

    const monthKey = `${parts.year}-${parts.month}`
    const dayKey = `${parts.year}-${parts.month}-${parts.day}`
    const newsDays = monthNewsDays.get(monthKey) ?? new Set<string>()
    newsDays.add(dayKey)
    monthNewsDays.set(monthKey, newsDays)
  })

  const monthKeys = new Set<string>()

  if (props.fromDate && props.toDate) {
    const from = props.fromDate.slice(0, 7)
    const to = props.toDate.slice(0, 7)
    let cursor = new Date(`${from}-01T00:00:00Z`)
    const end = new Date(`${to}-01T00:00:00Z`)

    while (cursor <= end) {
      monthKeys.add(`${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, '0')}`)
      cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1))
    }
  } else {
    monthNewsDays.forEach((_, monthKey) => monthKeys.add(monthKey))
  }

  ;[...monthKeys].forEach((monthKey) => {
    const [year, month] = monthKey.split('-')

    if (!year || !month) {
      return
    }

    months.set(monthKey, {
      key: monthKey,
      year,
      month,
      label: formatMonthLabel(year, month),
      link: (monthNewsDays.get(monthKey)?.size ?? 0) > 0
        ? withBasePath(`/${year}/${month}/`)
        : undefined,
      weeks: buildMonthWeeks(year, month, monthNewsDays.get(monthKey) ?? new Set<string>())
    })
  })

  return [...months.values()].sort((a, b) => a.key.localeCompare(b.key))
})

const weekdayLabels = computed(() => newsConfig.value.weekdayLabels)
</script>

<template>
  <div v-if="showCalendar && calendarMonths.length" class="archive-calendar">
    <section v-for="month in calendarMonths" :key="month.key" class="archive-month">
      <h3 class="archive-month-title">
        <a v-if="showMonthLinks && month.link" :href="month.link">{{ month.label }}</a>
        <span v-else>{{ month.label }}</span>
      </h3>
      <div class="archive-grid">
        <div
          v-for="label in weekdayLabels"
          :key="label"
          class="archive-weekday"
        >
          {{ label }}
        </div>
        <template v-for="week in month.weeks" :key="week[0]?.key">
          <component
            :is="day.link ? 'a' : 'span'"
            v-for="day in week"
            :key="day.key"
            class="archive-day"
            :class="{
              'is-outside': !day.isCurrentMonth,
              'is-muted': !day.hasNews || !day.isInRange
            }"
            :href="day.link ?? undefined"
          >
            {{ day.day }}
          </component>
        </template>
      </div>
    </section>
  </div>

  <ul v-if="hasVisiblePeriodLinks">
    <li v-if="canShowReferenceDayLink">
      <a :href="referenceDayLink">{{ formatNewsLabel(newsConfig.labels.referenceDayLink, referenceDayLabel) }}</a>
    </li>
    <li v-if="canShowTodayLink">
      <a :href="todayLink">{{ formatNewsLabel(newsConfig.labels.currentDayLink, todayLabel) }}</a>
    </li>
    <li v-if="canShowNextDayLink">
      <a :href="nextDayLink">{{ formatNewsLabel(newsConfig.labels.nextDayLink, nextDayLabel) }}</a>
    </li>
    <li v-if="canShowPreviousDayLink">
      <a :href="previousDayLink">{{ formatNewsLabel(newsConfig.labels.previousDayLink, previousDayLabel) }}</a>
    </li>
    <li v-if="canShowReferenceMonthLink">
      <a :href="referenceMonthLink">{{ formatNewsLabel(newsConfig.labels.referenceMonthLink, referenceMonthLabel) }}</a>
    </li>
    <li v-if="canShowCurrentMonthLink">
      <a :href="monthLink">{{ formatNewsLabel(newsConfig.labels.currentMonthLink, monthLabel) }}</a>
    </li>
    <li v-if="canShowNextMonthLink">
      <a :href="nextMonthLink">{{ formatNewsLabel(newsConfig.labels.nextMonthLink, nextMonthLabel) }}</a>
    </li>
    <li v-if="canShowPreviousMonthLink">
      <a :href="previousMonthLink">{{ formatNewsLabel(newsConfig.labels.previousMonthLink, previousMonthLabel) }}</a>
    </li>
    <li v-if="canShowReferenceYearLink">
      <a :href="referenceYearLink">{{ formatNewsLabel(newsConfig.labels.referenceYearLink, referenceYearLabel) }}</a>
    </li>
    <li v-if="canShowCurrentYearLink">
      <a :href="currentYearLink">{{ formatNewsLabel(newsConfig.labels.currentYearLink, currentYearLabel) }}</a>
    </li>
    <li v-if="canShowNextYearLink">
      <a :href="nextYearLink">{{ formatNewsLabel(newsConfig.labels.nextYearLink, nextYearLabel) }}</a>
    </li>
    <li v-if="canShowPreviousYearLink">
      <a :href="previousYearLink">{{ formatNewsLabel(newsConfig.labels.previousYearLink, previousYearLabel) }}</a>
    </li>
  </ul>
</template>

<style scoped>
.archive-calendar {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 1.4rem;
  align-items: start;
}

.archive-month {
  flex: 0 0 11.75rem;
}

.archive-month-title {
  margin: 0 0 0.55rem;
  font-size: 1rem;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(7, max-content);
  column-gap: 0.35rem;
  row-gap: 0;
  align-items: center;
  justify-content: center;
}

.archive-weekday {
  color: color-mix(in srgb, var(--vp-c-text-3) 70%, transparent);
  font-size: 0.8rem;
  text-align: center;
  width: 1.5rem;
  margin-bottom: 0.15rem;
}

.archive-day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  min-height: 2.2rem;
  border-radius: 0.45rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

a.archive-day {
  color: var(--vp-c-brand-1);
}

a.archive-day:hover {
  background: var(--vp-c-bg-soft);
}

.archive-day.is-muted {
  color: var(--vp-c-text-3);
}

.archive-day.is-outside {
  color: transparent;
  user-select: none;
}
</style>
