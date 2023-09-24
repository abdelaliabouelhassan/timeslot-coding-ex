<template>
  <div
    class="relative flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-[8px] border border-gray py-[12px]"
    :class="timeSlotClasses"
  >
    <div
      class="flex h-full w-full items-center justify-center text-center text-[15px] leading-[24px]"
      role="button"
    >
      {{ props.timeStartEnd }}
    </div>
    <NuxtLink
      class="hidden h-full transition-all duration-150 ease-linear"
      :class="continueButtonClasses"
      to="/"
      @click.stop=""
    >
      <Button title="Continue" class="rounded-l-none" />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  isSelected: boolean
  timeStartEnd: string
}>()

const timeSlotClasses = computed(() => {
  return {
    'bg-black text-white': props.isSelected,
    'bg-white text-black': !props.isSelected,
  }
})

const continueButtonClasses = computed(() => {
  return {
    'visible w-full opacity-100': props.isSelected,
    'invisible w-0 opacity-75': !props.isSelected,
  }
})
</script>
