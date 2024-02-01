<template>
  <div class="flex items-center justify-between">
    <button
      @click="Back"
      class="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full border border-gray outline-none focus:outline-none"
      :class="!canGoBack && 'pointer-events-none opacity-25'"
    >
      <img src="~/assets/images/arrow-left-black.svg" alt="arrow" />
    </button>
    <h3 class="text-[18px] font-bold leading-[120%]">
      {{ selectedDateFormatted }}
    </h3>
    <button
      @click="Next"
      class="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full border border-gray outline-none focus:outline-none"
      :class="!canGoNext && 'pointer-events-none opacity-25'"
    >
      <img src="~/assets/images/arrow-right-black.svg" alt="arrow" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
const emit = defineEmits(['back','next'])
const props = defineProps<{
  canGoNext: boolean
  canGoBack: boolean
  selectedDate: Date
}>()

const selectedDateFormatted = computed(() => {
  return format(props.selectedDate, 'EEE, d LLLL')
})

const Back = () => {
  emit('back')
}
const Next = () => {
  emit('next')
}

</script>
