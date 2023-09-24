<template>
  <div class="flex justify-between space-x-[10px]">
    <WeekCalendarDay
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
defineProps<{
  weekCalendarDays: WeekCalendarDay[]
}>()
</script>
