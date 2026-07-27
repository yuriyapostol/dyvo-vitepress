<script setup lang="ts">
import { computed, normalizeClass, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false
})

type DyvoBadgeColor =
  | 'info'
  | 'tip'
  | 'warning'
  | 'danger'
  | 'success'

type DyvoBadgeVariant = 'soft' | 'accent' | 'solid' | 'outline' | 'plain'

type DyvoBadgeSize = 'small' | 'medium' | 'large'

type DyvoBadgeState = 'interactive' | 'disabled'

const badgeColors = ['info', 'tip', 'warning', 'danger', 'success'] as const
const badgeVariants = ['soft', 'accent', 'solid', 'outline', 'plain'] as const
const badgeSizes = ['small', 'medium', 'large'] as const
const badgeStates = ['interactive', 'disabled'] as const

const attrs = useAttrs()

const props = withDefaults(defineProps<{
  text?: string
  color?: DyvoBadgeColor
  variant?: DyvoBadgeVariant
  size?: DyvoBadgeSize
  image?: string
  imageSrc?: string
  imageAlt?: string
  href?: string
  clickable?: boolean
  disabled?: boolean
}>(), {
  text: '',
  color: 'tip',
  variant: 'soft',
  size: 'medium',
  image: '',
  imageSrc: '',
  imageAlt: '',
  href: undefined,
  clickable: false,
  disabled: false
})

const classTokens = computed(() => {
  const raw = normalizeClass(attrs.class)
  return raw
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
})

const classColor = computed(() => (
  classTokens.value.find((token): token is DyvoBadgeColor => (
    (badgeColors as readonly string[]).includes(token)
  ))
))

const classVariant = computed(() => (
  classTokens.value.find((token): token is DyvoBadgeVariant => (
    (badgeVariants as readonly string[]).includes(token)
  ))
))

const classSize = computed(() => (
  classTokens.value.find((token): token is DyvoBadgeSize => (
    (badgeSizes as readonly string[]).includes(token)
  ))
))

const classStates = computed(() => (
  classTokens.value.filter((token): token is DyvoBadgeState => (
    (badgeStates as readonly string[]).includes(token)
  ))
))

const resolvedColor = computed(() => classColor.value ?? props.color)
const resolvedVariant = computed(() => classVariant.value ?? props.variant)
const resolvedSize = computed(() => classSize.value ?? props.size)
const resolvedDisabled = computed(() => (
  classStates.value.includes('disabled') || props.disabled
))
const forcedInteractive = computed(() => classStates.value.includes('interactive'))

const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const tagName = computed(() => {
  if (props.href && !resolvedDisabled.value) {
    return 'a'
  }

  return 'span'
})

const isInteractive = computed(() => (
  (Boolean(props.href) || props.clickable || forcedInteractive.value) && !resolvedDisabled.value
))

const resolvedImageSrc = computed(() => {
  if (typeof props.imageSrc === 'string' && props.imageSrc.trim()) {
    return props.imageSrc.trim()
  }

  if (typeof props.image === 'string' && props.image.trim()) {
    return props.image.trim()
  }

  return ''
})
</script>

<template>
  <component
    :is="tagName"
    v-bind="forwardedAttrs"
    class="dyvo-badge"
    :class="[
      resolvedColor,
      resolvedVariant,
      resolvedSize,
      {
        interactive: isInteractive,
        disabled: resolvedDisabled
      }
    ]"
    :href="tagName === 'a' ? href : undefined"
    :aria-disabled="resolvedDisabled || undefined"
  >
    <span v-if="resolvedImageSrc || $slots.image" class="dyvo-badge-image" aria-hidden="true">
      <slot name="image">
        <img :src="resolvedImageSrc" :alt="imageAlt" />
      </slot>
    </span>
    <span class="dyvo-badge-label">
      <slot>{{ text }}</slot>
    </span>
  </component>
</template>

<style>
.dyvo-badge {
  --dyvo-badge-padding-x: var(--dyvo-badge-medium-padding-x, 12px);
  --dyvo-badge-padding-y: var(--dyvo-badge-medium-padding-y, 0);
  --dyvo-badge-gap: var(--dyvo-badge-medium-gap, 6px);
  --dyvo-badge-line-height: var(--dyvo-badge-medium-line-height, var(--dyvo-text-medium-line-height, 24px));
  --dyvo-badge-image-size: var(--dyvo-badge-line-height);
  --dyvo-badge-link-color: var(--dyvo-badge-link-default-color, var(--dyvo-badge-text-color, var(--vp-c-text-1)));
  display: inline-flex;
  align-items: center;
  gap: var(--dyvo-badge-gap);
  border: var(--dyvo-badge-border-width, 1px) solid transparent;
  border-radius: var(--dyvo-badge-radius, 9999px);
  padding: var(--dyvo-badge-padding-y) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-font-size, var(--dyvo-text-small-font-size, calc(var(--dyvo-text-medium-font-size, 16px) - 2px)));
  font-weight: var(--dyvo-badge-font-weight, 400);
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  overflow: hidden;
  color: var(--dyvo-badge-text-color, var(--vp-c-text-1));
  background-color: var(--dyvo-badge-bg-color, transparent);
  border-color: var(--dyvo-badge-border-color, transparent);
}

a.dyvo-badge {
  color: var(--dyvo-badge-link-color);
}

a.dyvo-badge:hover {
  color: var(
    --dyvo-badge-link-hover-color,
    color-mix(in srgb, var(--dyvo-badge-link-color) 75%, var(--vp-c-bg) 25%)
  );
}

.dyvo-badge.small {
  --dyvo-badge-padding-x: var(--dyvo-badge-small-padding-x, 10px);
  --dyvo-badge-padding-y: var(--dyvo-badge-small-padding-y, 0);
  --dyvo-badge-gap: var(--dyvo-badge-small-gap, 5px);
  --dyvo-badge-line-height: var(--dyvo-badge-small-line-height, var(--dyvo-text-small-line-height, calc(var(--dyvo-text-medium-line-height, 24px) - 4px)));
  padding: var(--dyvo-badge-padding-y) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-small-font-size, var(--dyvo-text-xsmall-font-size, calc(var(--dyvo-text-medium-font-size, 16px) - 4px)));
  font-weight: var(--dyvo-badge-small-font-weight, 500);
}

.dyvo-badge.medium {
  --dyvo-badge-padding-x: var(--dyvo-badge-medium-padding-x, 12px);
  --dyvo-badge-padding-y: var(--dyvo-badge-medium-padding-y, 0);
  --dyvo-badge-gap: var(--dyvo-badge-medium-gap, 6px);
  --dyvo-badge-line-height: var(--dyvo-badge-medium-line-height, var(--dyvo-text-medium-line-height, 24px));
  padding: var(--dyvo-badge-padding-y) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-medium-font-size, var(--dyvo-text-small-font-size, calc(var(--dyvo-text-medium-font-size, 16px) - 2px)));
  font-weight: var(--dyvo-badge-medium-font-weight, 400);
}

.dyvo-badge.large {
  --dyvo-badge-padding-x: var(--dyvo-badge-large-padding-x, 14px);
  --dyvo-badge-padding-y: var(--dyvo-badge-large-padding-y, 0);
  --dyvo-badge-gap: var(--dyvo-badge-large-gap, 8px);
  --dyvo-badge-line-height: var(--dyvo-badge-large-line-height, var(--dyvo-text-large-line-height, calc(var(--dyvo-text-medium-line-height, 24px) + 4px)));
  padding: var(--dyvo-badge-padding-y) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-large-font-size, var(--dyvo-text-medium-font-size, 16px));
  font-weight: var(--dyvo-badge-large-font-weight, 400);
}

.dyvo-badge.interactive {
  cursor: pointer;
  transition:
    opacity var(--dyvo-badge-transition-duration, 0.15s) ease,
    box-shadow var(--dyvo-badge-transition-duration, 0.15s) ease;
}

.dyvo-badge.interactive:hover {
  opacity: var(--dyvo-badge-hover-opacity, 0.92);
}

.dyvo-badge.interactive:focus-visible {
  outline: var(--dyvo-badge-focus-outline-width, 2px) solid var(--dyvo-badge-focus-outline-color, var(--vp-c-brand-1));
  outline-offset: var(--dyvo-badge-focus-outline-offset, 2px);
}

.dyvo-badge.disabled {
  cursor: not-allowed;
  opacity: var(--dyvo-badge-disabled-opacity, 0.55);
}

.dyvo-badge-image {
  display: inline-flex;
  flex: 0 0 auto;
  align-self: stretch;
  height: var(--dyvo-badge-image-size);
  align-items: center;
  justify-content: center;
  margin-block: calc(-1 * var(--dyvo-badge-padding-y));
  margin-inline-start: calc(-1 * var(--dyvo-badge-padding-x));
}

.dyvo-badge-image img {
  display: block;
  width: auto;
  height: 100%;
  aspect-ratio: 1 / 1;
  max-width: none;
  object-fit: cover;
  border-radius: 50%;
}

.dyvo-badge-label {
  display: inline-flex;
  align-items: center;
}

.dyvo-badge.soft {
  --dyvo-badge-text-color: var(--dyvo-badge-soft-text-color, var(--vp-c-text-1));
  --dyvo-badge-bg-color: var(--dyvo-badge-soft-bg-color, transparent);
  --dyvo-badge-border-color: var(--dyvo-badge-soft-border-color, transparent);
}

.dyvo-badge.accent {
  --dyvo-badge-text-color: var(--dyvo-badge-accent-text-color, var(--dyvo-badge-soft-text-color, var(--vp-c-text-1)));
  --dyvo-badge-bg-color: var(--dyvo-badge-accent-bg-color, var(--dyvo-badge-soft-bg-color, transparent));
  --dyvo-badge-border-color: var(--dyvo-badge-accent-border-color, var(--dyvo-badge-outline-border-color, var(--dyvo-badge-accent-text-color, transparent)));
}

.dyvo-badge.solid {
  --dyvo-badge-text-color: var(--dyvo-badge-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-bg-color: var(--dyvo-badge-solid-bg-color, var(--vp-c-text-1));
  --dyvo-badge-border-color: var(--dyvo-badge-solid-border-color, var(--dyvo-badge-solid-bg-color, transparent));
}

.dyvo-badge.outline {
  --dyvo-badge-text-color: var(--dyvo-badge-outline-text-color, var(--vp-c-text-1));
  --dyvo-badge-bg-color: var(--dyvo-badge-outline-bg-color, transparent);
  --dyvo-badge-border-color: var(--dyvo-badge-outline-border-color, var(--dyvo-badge-outline-text-color, transparent));
}

.dyvo-badge.plain {
  border-width: 0;
  border-radius: 0;
  padding: 0;
  --dyvo-badge-text-color: var(--dyvo-badge-plain-text-color, var(--vp-c-text-1));
  --dyvo-badge-bg-color: var(--dyvo-badge-plain-bg-color, transparent);
  --dyvo-badge-border-color: var(--dyvo-badge-plain-border-color, transparent);
}

.dyvo-badge.plain .dyvo-badge-image {
  margin-block: 0;
  margin-inline-start: 0;
}

.dyvo-badge.info {
  --dyvo-badge-current-text-color: var(--dyvo-badge-info-text-color, var(--vp-c-text-1));
  --dyvo-badge-current-bg-color: var(--dyvo-badge-info-bg-color, var(--vp-c-text-soft, var(--vp-c-default-soft)));
  --dyvo-badge-soft-text-color: var(--dyvo-badge-info-soft-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-info-soft-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-info-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-info-accent-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-info-accent-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-info-accent-border-color, var(--dyvo-badge-info-border-color, var(--dyvo-badge-accent-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-info-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-info-solid-bg-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-info-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-info-outline-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-info-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-info-outline-border-color, var(--dyvo-badge-info-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-info-plain-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-info-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-info-plain-border-color, transparent);
}

.dyvo-badge.tip {
  --dyvo-badge-current-text-color: var(--dyvo-badge-tip-text-color, var(--vp-c-tip-1));
  --dyvo-badge-current-bg-color: var(--dyvo-badge-tip-bg-color, var(--vp-c-tip-soft));
  --dyvo-badge-soft-text-color: var(--dyvo-badge-tip-soft-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-tip-soft-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-tip-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-tip-accent-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-tip-accent-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-tip-accent-border-color, var(--dyvo-badge-tip-border-color, var(--dyvo-badge-accent-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-tip-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-tip-solid-bg-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-tip-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-tip-outline-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-tip-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-tip-outline-border-color, var(--dyvo-badge-tip-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-tip-plain-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-tip-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-tip-plain-border-color, transparent);
}

.dyvo-badge.warning {
  --dyvo-badge-current-text-color: var(--dyvo-badge-warning-text-color, var(--vp-c-warning-1));
  --dyvo-badge-current-bg-color: var(--dyvo-badge-warning-bg-color, var(--vp-c-warning-soft));
  --dyvo-badge-soft-text-color: var(--dyvo-badge-warning-soft-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-warning-soft-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-warning-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-warning-accent-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-warning-accent-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-warning-accent-border-color, var(--dyvo-badge-warning-border-color, var(--dyvo-badge-accent-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-warning-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-warning-solid-bg-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-warning-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-warning-outline-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-warning-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-warning-outline-border-color, var(--dyvo-badge-warning-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-warning-plain-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-warning-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-warning-plain-border-color, transparent);
}

.dyvo-badge.danger {
  --dyvo-badge-current-text-color: var(--dyvo-badge-danger-text-color, var(--vp-c-danger-1));
  --dyvo-badge-current-bg-color: var(--dyvo-badge-danger-bg-color, var(--vp-c-danger-soft));
  --dyvo-badge-soft-text-color: var(--dyvo-badge-danger-soft-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-danger-soft-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-danger-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-danger-accent-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-danger-accent-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-danger-accent-border-color, var(--dyvo-badge-danger-border-color, var(--dyvo-badge-accent-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-danger-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-danger-solid-bg-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-danger-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-danger-outline-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-danger-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-danger-outline-border-color, var(--dyvo-badge-danger-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-danger-plain-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-danger-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-danger-plain-border-color, transparent);
}

.dyvo-badge.success {
  --dyvo-badge-current-text-color: var(--dyvo-badge-success-text-color, var(--vp-c-success-1));
  --dyvo-badge-current-bg-color: var(--dyvo-badge-success-bg-color, var(--vp-c-success-soft));
  --dyvo-badge-soft-text-color: var(--dyvo-badge-success-soft-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-success-soft-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-success-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-success-accent-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-success-accent-bg-color, var(--dyvo-badge-current-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-success-accent-border-color, var(--dyvo-badge-success-border-color, var(--dyvo-badge-accent-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-success-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-success-solid-bg-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-success-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-success-outline-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-success-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-success-outline-border-color, var(--dyvo-badge-success-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-success-plain-text-color, var(--dyvo-badge-current-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-success-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-success-plain-border-color, transparent);
}
</style>
