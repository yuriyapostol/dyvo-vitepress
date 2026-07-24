import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { toOpenGraphLocale } from '../shared/i18n.js';
function stripFrontmatter(source) {
    return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}
function cleanupText(source) {
    return source
        .replace(/!\[[^\]]*]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[*_~]/g, '')
        .replace(/<\/?[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function extractFirstHeading(source) {
    const content = stripFrontmatter(source);
    const match = content.match(/^#\s+(.+)$/m);
    return match ? cleanupText(match[1]) : '';
}
function extractFirstParagraph(source) {
    const content = stripFrontmatter(source);
    const lines = content.split(/\r?\n/);
    const paragraph = [];
    let inFence = false;
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('```')) {
            inFence = !inFence;
            continue;
        }
        if (inFence) {
            continue;
        }
        if (!trimmed) {
            if (paragraph.length) {
                const text = cleanupText(paragraph.join(' '));
                if (text) {
                    return text;
                }
                paragraph.length = 0;
            }
            continue;
        }
        if (trimmed.startsWith('#') ||
            trimmed.startsWith(':::') ||
            trimmed.startsWith('>') ||
            trimmed.startsWith('- ') ||
            trimmed.startsWith('* ') ||
            trimmed.startsWith('|') ||
            trimmed.startsWith('<')) {
            if (paragraph.length) {
                const text = cleanupText(paragraph.join(' '));
                if (text) {
                    return text;
                }
                paragraph.length = 0;
            }
            continue;
        }
        if (/^\d+\.\s/.test(trimmed)) {
            if (paragraph.length) {
                const text = cleanupText(paragraph.join(' '));
                if (text) {
                    return text;
                }
                paragraph.length = 0;
            }
            continue;
        }
        paragraph.push(trimmed);
    }
    return cleanupText(paragraph.join(' '));
}
function extractFallbackMetadata(filePath, srcDir) {
    try {
        const source = readFileSync(join(srcDir, filePath), 'utf8');
        return {
            title: extractFirstHeading(source),
            description: extractFirstParagraph(source)
        };
    }
    catch {
        return {
            title: '',
            description: ''
        };
    }
}
function derivePageId(filePath) {
    return filePath
        .replace(/(^|\/)index\.md$/i, '$1')
        .replace(/\.md$/i, '')
        .replace(/\/+/g, '/')
        .replace(/^\/+/, '')
        .toLowerCase();
}
function resolveKeywords(value) {
    if (typeof value === 'string') {
        return value
            .split(',')
            .map((keyword) => keyword.trim())
            .filter(Boolean)
            .join(', ');
    }
    if (Array.isArray(value)) {
        return [...new Set(value
                .filter((keyword) => typeof keyword === 'string')
                .map((keyword) => keyword.trim())
                .filter(Boolean))].join(', ');
    }
    return '';
}
function isPromiseLike(value) {
    return typeof value === 'object' && value !== null && 'then' in value;
}
export function createConfig(config) {
    const { seo, transformHead, transformPageData, ...rest } = config;
    return {
        ...rest,
        transformPageData(pageData, ctx) {
            const frontmatter = pageData.frontmatter ?? {};
            const rawId = typeof frontmatter.id === 'string' ? frontmatter.id.trim() : '';
            const fallback = extractFallbackMetadata(pageData.filePath, ctx.siteConfig.srcDir);
            const title = typeof frontmatter.title === 'string' && frontmatter.title.trim()
                ? frontmatter.title.trim()
                : pageData.title || fallback.title;
            const description = typeof frontmatter.description === 'string' && frontmatter.description.trim()
                ? frontmatter.description.trim()
                : fallback.description;
            const baseData = transformPageData?.(pageData, ctx) ?? {};
            pageData.frontmatter = {
                ...frontmatter,
                id: rawId || derivePageId(pageData.filePath)
            };
            return {
                ...baseData,
                ...(title ? { title } : {}),
                ...(description ? { description } : {})
            };
        },
        transformHead(context) {
            const baseHeadResult = transformHead?.(context);
            if (!seo) {
                return baseHeadResult;
            }
            const { pageData } = context;
            const frontmatter = pageData.frontmatter ?? {};
            const head = [];
            const title = pageData.title;
            const description = pageData.description;
            const keywords = resolveKeywords(frontmatter.keywords) || resolveKeywords(frontmatter.tags);
            const robots = typeof frontmatter.robots === 'string' && frontmatter.robots.trim()
                ? frontmatter.robots.trim()
                : 'index,follow';
            const ogType = typeof frontmatter.ogType === 'string' && frontmatter.ogType.trim()
                ? frontmatter.ogType.trim()
                : 'website';
            const canonicalPath = typeof frontmatter.canonical === 'string' && frontmatter.canonical.trim()
                ? frontmatter.canonical.trim()
                : `/${pageData.filePath.replace(/(^|\/)index\.md$/i, '$1').replace(/\.md$/i, '.html')}`;
            const canonicalUrl = new URL(canonicalPath, seo.siteUrl).toString();
            const imagePath = typeof frontmatter.image === 'string' && frontmatter.image.trim()
                ? frontmatter.image.trim()
                : seo.defaultOgImage;
            const imageUrl = new URL(imagePath, seo.siteUrl).toString();
            head.push(['link', { rel: 'canonical', href: canonicalUrl }]);
            head.push(['meta', { name: 'robots', content: robots }]);
            head.push(['meta', { property: 'og:site_name', content: seo.siteName }]);
            head.push(['meta', { property: 'og:locale', content: toOpenGraphLocale(seo.siteLocale) }]);
            head.push(['meta', { property: 'og:type', content: ogType }]);
            head.push(['meta', { property: 'og:url', content: canonicalUrl }]);
            head.push(['meta', { property: 'og:image', content: imageUrl }]);
            head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }]);
            head.push(['meta', { name: 'twitter:url', content: canonicalUrl }]);
            head.push(['meta', { name: 'twitter:image', content: imageUrl }]);
            if (title) {
                head.push(['meta', { property: 'og:title', content: title }]);
                head.push(['meta', { name: 'twitter:title', content: title }]);
            }
            if (description) {
                head.push(['meta', { property: 'og:description', content: description }]);
                head.push(['meta', { name: 'twitter:description', content: description }]);
            }
            if (keywords) {
                head.push(['meta', { name: 'keywords', content: keywords }]);
            }
            if (baseHeadResult === undefined) {
                return head;
            }
            if (isPromiseLike(baseHeadResult)) {
                return Promise.resolve(baseHeadResult).then((baseHead) => {
                    const normalizedBaseHead = Array.isArray(baseHead) ? baseHead : [];
                    return [...normalizedBaseHead, ...head];
                });
            }
            const normalizedBaseHead = Array.isArray(baseHeadResult) ? baseHeadResult : [];
            return [...normalizedBaseHead, ...head];
        }
    };
}
