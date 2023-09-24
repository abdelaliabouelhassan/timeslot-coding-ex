<template>
  <div class="flex flex-col items-center">
    <div class="text-[14px] leading-[160%]">
      {{ dayName }}
    </div>
    <Spacer class="h-[4px]" />
    <button
      class="flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full border text-[16px] leading-[160%] outline-none focus:outline-none"
      :class="{
        'border-black bg-black text-white': props.isSelected,
        'border-gray bg-white text-black ': !props.isSelected,
        'opacity-40': isZeroAppointmentsAvailable && !props.isSelected,
      }"
    >
      {{ dayNumber }}
    </button>
    <Spacer class="h-[5px]" />
    <div
      class="flex h-[6px] w-[6px] items-center justify-center rounded-full"
      :class="dotBackgroundColor"
    />
  </div>
</template>
<script setup lang="ts">
import { format } from 'date-fns'
import type { CalendarDayAvailability } from '@/utils/weekCalendar'

const props = defineProps<{
  availabilityState: CalendarDayAvailability
  date: Date
  isSelected: boolean
}>()

const AVAILABILITY_DOT_CLASSES = new Map<CalendarDayAvailability, string>([
  ['LAST_APPOINTMENT_AVAILABLE', 'bg-primary'],
  ['AVAILABLE_APPOINTMENTS', 'bg-green'],
  ['ZERO_APPOINTMENTS_AVAILABLE', 'bg-white'],
])

const dotBackgroundColor = computed(() => {
  return AVAILABILITY_DOT_CLASSES.get(props.availabilityState)
})

const isZeroAppointmentsAvailable = computed(() => {
  return props.availabilityState === 'ZERO_APPOINTMENTS_AVAILABLE'
})

const dayNumber = computed(() => format(props.date, 'd'))
const dayName = computed(() => {
  return format(props.date, 'EEE')
})
</script>
