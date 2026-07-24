const DEFAULT_SITE_LOCALE = 'en-US'

export function normalizeSiteLocale(locale: string | undefined) {
  if (typeof locale !== 'string' || !locale.trim()) {
    return DEFAULT_SITE_LOCALE
  }

  try {
    return Intl.getCanonicalLocales(locale)[0] ?? DEFAULT_SITE_LOCALE
  } catch {
    return locale.trim() || DEFAULT_SITE_LOCALE
  }
}

export function toOpenGraphLocale(locale: string) {
  const normalized = normalizeSiteLocale(locale)
  const [language, scriptOrRegion, maybeRegion] = normalized.split('-')

  if (!language) {
    return DEFAULT_SITE_LOCALE.replace('-', '_')
  }

  const region = maybeRegion ?? scriptOrRegion

  if (!region) {
    return language.toLowerCase()
  }

  return `${language.toLowerCase()}_${region.toUpperCase()}`
}

function toJavaScriptWeekday(day: number) {
  if (day === 7) {
    return 0
  }

  if (day >= 0 && day <= 6) {
    return day
  }

  return 1
}

export function deriveWeekFirstDay(locale: string) {
  const normalized = normalizeSiteLocale(locale)

  try {
    const intlLocale = new Intl.Locale(normalized)
    const weekInfo = (intlLocale as Intl.Locale & {
      weekInfo?: {
        firstDay?: number
      }
    }).weekInfo
    const firstDay = weekInfo?.firstDay

    if (typeof firstDay === 'number') {
      return toJavaScriptWeekday(firstDay)
    }
  } catch {
    // Ignore unsupported locale features and use fallback logic below.
  }

  const region = normalized.split('-')[1]?.toUpperCase()

  if (region === 'US') {
    return 0
  }

  return 1
}

export function buildWeekdayLabels(locale: string, weekFirstDay: number) {
  const formatter = new Intl.DateTimeFormat(normalizeSiteLocale(locale), {
    weekday: 'short',
    timeZone: 'UTC'
  })
  const sunday = new Date(Date.UTC(2023, 0, 1))

  return Array.from({ length: 7 }, (_, index) => {
    const day = (weekFirstDay + index) % 7
    const date = new Date(sunday)
    date.setUTCDate(sunday.getUTCDate() + day)

    return formatter.format(date)
  })
}
