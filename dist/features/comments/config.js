import { useData } from 'vitepress';
import { computed } from 'vue';
import { normalizeSiteLocale } from '../../shared/i18n';
const GISCUS_LANGUAGE_BY_LOCALE = {
    'pt-BR': 'pt-BR',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW'
};
function deriveGiscusLang(locale) {
    const normalized = normalizeSiteLocale(locale);
    if (GISCUS_LANGUAGE_BY_LOCALE[normalized]) {
        return GISCUS_LANGUAGE_BY_LOCALE[normalized];
    }
    const [language] = normalized.split('-');
    return language?.toLowerCase() || 'en';
}
export function useCommentsConfig() {
    const { site, theme } = useData();
    return computed(() => {
        const locale = normalizeSiteLocale(site.value.lang);
        return {
            enabled: theme.value.comments?.enabled === true,
            giscusLang: theme.value.comments?.giscusLang?.trim() || deriveGiscusLang(locale),
            repo: theme.value.comments?.repo?.trim() || '',
            repoId: theme.value.comments?.repoId?.trim() || '',
            category: theme.value.comments?.category?.trim() || '',
            categoryId: theme.value.comments?.categoryId?.trim() || '',
            mapping: theme.value.comments?.mapping?.trim() || 'specific',
            strict: theme.value.comments?.strict?.trim() || '1',
            reactionsEnabled: theme.value.comments?.reactionsEnabled?.trim() || '1',
            emitMetadata: theme.value.comments?.emitMetadata?.trim() || '0',
            inputPosition: theme.value.comments?.inputPosition || 'bottom',
            loading: theme.value.comments?.loading || 'lazy'
        };
    });
}
