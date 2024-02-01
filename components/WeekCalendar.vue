<template>
  <div class="flex justify-between space-x-[10px]">
    <WeekCalendarDay
      @click="SelectDay(key)"
      v-for="{ date, key, availabilityState, isSelected } in weekCalendarDays"
      :key="key"
      :date="date"
      :availability-state="availabilityState"
      :is-selected="isSelected"
    />
  </div>
</template>

<script setup lang="ts">
import type { WeekCalendarDay } from '@/utils/weekCalendar'
const emit = defineEmits(['selecteDay'])
defineProps<{
  weekCalendarDays: WeekCalendarDay[]
}>()


const SelectDay = (key) => {
  emit('selecteDay',key)
}
</script>
