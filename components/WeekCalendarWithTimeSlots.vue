<template>
  <section class="px-[16px]">
    <Spacer class="h-[16px]" />
    <div class="rounded-[20px] bg-white px-[20px] py-[24px]">
      <WeekPicker
        :can-go-next="true"
        :can-go-back="false"
        :selected-date="selectedDate"
      />
      <Spacer class="h-[24px]" />
      <WeekCalendar :week-calendar-days="calendarDays" />
    </div>
    <Spacer class="h-[24px]" />
    <DayPeriodButtonsWrapper class="flex" />
    <Spacer class="h-[16px]" />
    <div class="block">
      <div class="flex w-full flex-col space-y-[8px] overflow-auto">
        <p class="text-center text-[14px] leading-[160%] text-dark-gray">
          Available timeslots
        </p>
        <TimeSlot time-start-end="10:00 - 10:30" :is-selected="false" />
        <TimeSlot time-start-end="10:30 - 11:00" :is-selected="true" />
        <TimeSlot time-start-end="12:00 - 12:30" :is-selected="false" />
        <TimeSlot time-start-end="13:00 - 13:30" :is-selected="false" />
        <TimeSlot time-start-end="16:30 - 17:00" :is-selected="false" />
      </div>
      <Spacer class="h-[104px]" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { createDateWithZurichTimezone } from '@/utils/newDate'
import type { WeekCalendarDay } from '@/utils/weekCalendar'

const selectedDate = ref<Date>(createDateWithZurichTimezone())

const calendarDays = computed<WeekCalendarDay[]>(() => {
  return [
    {
      availabilityState: 'AVAILABLE_APPOINTMENTS',
      date: new Date('2023-09-25'),
      isSelected: true,
      key: 1,
    },
    {
      availabilityState: 'LAST_APPOINTMENT_AVAILABLE',
      date: new Date('2023-09-26'),
      isSelected: false,
      key: 2,
    },
    {
      availabilityState: 'LAST_APPOINTMENT_AVAILABLE',
      date: new Date('2023-09-27'),
      isSelected: false,
      key: 3,
    },
    {
      availabilityState: 'ZERO_APPOINTMENTS_AVAILABLE',
      date: new Date('2023-09-28'),
      isSelected: false,
      key: 4,
    },
    {
      availabilityState: 'AVAILABLE_APPOINTMENTS',
      date: new Date('2023-09-29'),
      isSelected: false,
      key: 5,
    },
  ]
})
</script>
