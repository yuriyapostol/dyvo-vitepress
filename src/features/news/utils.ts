export type NewsAuthor = {
  name: string
  github?: string
}

export function normalizeBoolean(value: boolean | string | undefined, fallback: boolean) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()

    if (normalized === 'true') {
      return true
    }

    if (normalized === 'false') {
      return false
    }
  }

  return fallback
}

export function normalizeNewsStatuses(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value
      .filter((status): status is string => typeof status === 'string')
      .map((status) => status.trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((status) => status.trim())
      .filter(Boolean)
  }

  return []
}

export function resolveNewsPublishedAt(explicitValue: string | undefined, frontmatterValue: unknown) {
  if (typeof explicitValue === 'string' && explicitValue.trim()) {
    return explicitValue.trim()
  }

  if (typeof frontmatterValue === 'string' && frontmatterValue.trim()) {
    return frontmatterValue.trim()
  }

  return ''
}

export function resolveNewsStatuses(
  explicitStatuses: string[] | string | undefined,
  explicitStatus: string | undefined,
  frontmatterStatuses: unknown,
  frontmatterStatus: unknown
) {
  const hasExplicitStatuses = explicitStatuses !== undefined || explicitStatus !== undefined
  const explicitValues = [
    ...normalizeNewsStatuses(explicitStatuses),
    ...normalizeNewsStatuses(explicitStatus)
  ]

  if (hasExplicitStatuses) {
    return explicitValues
  }

  return [
    ...normalizeNewsStatuses(
      Array.isArray(frontmatterStatuses) || typeof frontmatterStatuses === 'string'
        ? frontmatterStatuses
        : undefined
    ),
    ...normalizeNewsStatuses(typeof frontmatterStatus === 'string' ? frontmatterStatus : undefined)
  ]
}

export function normalizeNewsAuthors(
  value: Array<string | { name?: string; github?: string }> | string | undefined
) {
  if (Array.isArray(value)) {
    return value
      .map((author): NewsAuthor | null => {
        if (typeof author === 'string') {
          const name = author.trim()

          return name ? { name } : null
        }

        if (!author || typeof author !== 'object') {
          return null
        }

        const name = typeof author.name === 'string' ? author.name.trim() : ''
        const github = typeof author.github === 'string' ? author.github.trim() : ''

        if (!name) {
          return null
        }

        return github ? { name, github } : { name }
      })
      .filter((author): author is NewsAuthor => author !== null)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((author) => author.trim())
      .filter(Boolean)
      .map((name) => ({ name }))
  }

  return []
}

export function formatNewsPublishedDate(
  value: string,
  locale: string,
  timeZone: string,
  showYear = false
) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (!match) {
    return value
  }

  const [, year, month, day] = match
  const date = new Date(value)
  const hasValidDate = !Number.isNaN(date.getTime())
  const fallbackDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  const formatterDate = hasValidDate ? date : fallbackDate
  const datePart = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    ...(showYear ? { year: 'numeric' as const } : {}),
    timeZone
  }).format(formatterDate)
  const timeParts = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone
  }).formatToParts(formatterDate)
  const hour = timeParts.find((part) => part.type === 'hour')?.value ?? '00'
  const minute = timeParts.find((part) => part.type === 'minute')?.value ?? '00'

  return `${datePart}, ${hour}:${minute}`
}
