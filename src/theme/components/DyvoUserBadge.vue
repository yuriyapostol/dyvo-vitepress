<script setup lang="ts">
import { computed } from 'vue'
import DyvoBadge from './DyvoBadge.vue'

const props = withDefaults(defineProps<{
  name: string
  github?: string
  href?: string
  avatarSrc?: string
  avatarAlt?: string
  text?: string
  color?: 'info' | 'tip' | 'warning' | 'danger' | 'success'
  variant?: 'soft' | 'accent' | 'solid' | 'outline' | 'plain'
  size?: 'small' | 'medium' | 'large'
  clickable?: boolean
  disabled?: boolean
}>(), {
  github: undefined,
  href: undefined,
  avatarSrc: undefined,
  avatarAlt: undefined,
  text: undefined,
  color: 'info',
  variant: 'soft',
  size: 'large',
  clickable: false,
  disabled: false
})

const resolvedHref = computed(() => {
  if (typeof props.href === 'string' && props.href.trim()) {
    return props.href.trim()
  }

  if (typeof props.github === 'string' && props.github.trim()) {
    return `https://github.com/${props.github.trim()}`
  }

  return undefined
})

const resolvedAvatarSrc = computed(() => {
  if (typeof props.avatarSrc === 'string' && props.avatarSrc.trim()) {
    return props.avatarSrc.trim()
  }

  if (typeof props.github === 'string' && props.github.trim()) {
    return `https://github.com/${props.github.trim()}.png?size=80`
  }

  return undefined
})

const resolvedAvatarAlt = computed(() => {
  if (typeof props.avatarAlt === 'string' && props.avatarAlt.trim()) {
    return props.avatarAlt.trim()
  }

  if (typeof props.github === 'string' && props.github.trim()) {
    return `@${props.github.trim()}`
  }

  return props.name
})

const resolvedText = computed(() => {
  if (typeof props.text === 'string' && props.text.trim()) {
    return props.text.trim()
  }

  return props.name
})
</script>

<template>
  <DyvoBadge
    class="dyvo-user-badge"
    :text="resolvedText"
    :color="color"
    :variant="variant"
    :size="size"
    :image="resolvedAvatarSrc"
    :image-alt="resolvedAvatarAlt"
    :href="resolvedHref"
    :clickable="clickable"
    :disabled="disabled"
  />
</template>

<style scoped>
.dyvo-user-badge :deep(.dyvo-badge-image img) {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
