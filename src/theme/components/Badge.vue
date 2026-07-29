<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import DyvoBadge from './DyvoBadge.vue'

defineOptions({
  inheritAttrs: false
})

type BadgeType = 'info' | 'tip' | 'warning' | 'danger'

const attrs = useAttrs()

const props = withDefaults(defineProps<{
  text?: string
  type?: BadgeType
}>(), {
  text: '',
  type: 'tip'
})

const forwardedAttrs = computed(() => attrs)
</script>

<template>
  <DyvoBadge
    v-bind="forwardedAttrs"
    :text="text"
    :color="type"
    variant="soft"
    size="small"
  >
    <slot>{{ text }}</slot>
  </DyvoBadge>
</template>
