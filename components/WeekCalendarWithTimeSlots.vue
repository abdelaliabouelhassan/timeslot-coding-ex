<template>
  <section class="w-[480px] rounded-[16px] bg-white px-[24px]">
   
    <Spacer class="h-[16px]" />
    <div class="rounded-[20px] px-[20px] py-[24px]">
      <WeekPicker
        :can-go-next="isNextButtonDisabled"
        :can-go-back="isBackButtonDisabled"
        :selected-date="selectedDate"
        @back="Back"
        @next="Next"
      />
      <Spacer class="h-[24px]" />
      <WeekCalendar @selecteDay="selectDay" :week-calendar-days="calendarDays" />
    </div>
    <Spacer class="h-[24px]" />
    <DayPeriodButtonsWrapper @selectedPeriod="selectePeriod" class="flex" />
    <Spacer class="h-[16px]" />
    <div class="block">
      <div class="flex w-full flex-col space-y-[8px] overflow-auto">
        <p class="text-center text-[14px] leading-[160%] text-dark-gray">
          Available timeslots
        </p>
        <TimeSlot v-for="(time,index,key) in filteredTimes" :key="key" :time-start-end="formateTime(time)" @click="SelectTime(time,index)" :is-selected="selectedTimeIndex == index" />
      
      </div>
      <Spacer class="h-[24px]" />
     
     
    </div>
  </section>
</template>
<script setup lang="ts">
import { createDateWithZurichTimezone } from '@/utils/newDate'
import type { WeekCalendarDay } from '@/utils/weekCalendar'
import {NUMBER_OF_DAYS_DISPLAYED_IN_WEEK_CALENDAR} from '@/config/weekCalendar'
import {DATE_FORMAT_WITH_DASHES} from '@/config/date'
import spacetime from 'spacetime'
const selectedDate = ref<Date>(createDateWithZurichTimezone())
import {RESPONSE_FROM_API} from '@/data/responses'
const days = ref([]);
const Times = ref([])
const selectionType = ref('All')
const selectedTimeIndex = ref(null)
const calendarDays = computed<WeekCalendarDay[]>(() => {
    days.value = []
    Times.value = []
    for (let i = 0; i < NUMBER_OF_DAYS_DISPLAYED_IN_WEEK_CALENDAR; i++) {
      const currentDate = spacetime(selectedDate.value).add(i, 'days').format(DATE_FORMAT_WITH_DASHES);
      const  availabilityData  = RESPONSE_FROM_API[currentDate] || [];
      const availabilityState = determineAvailabilityState(availabilityData);
      days.value.push({
        availabilityState: availabilityState,
        date: new Date(spacetime(selectedDate.value).add(i, 'days').format(DATE_FORMAT_WITH_DASHES)),
        isSelected: false,
        key: i,
      });
    }
    return days.value;
})


const determineAvailabilityState = (availabilityData) => {

  if (availabilityData.length === 0) {
      return 'ZERO_APPOINTMENTS_AVAILABLE';
    }

    const hasAvailableSlot = availabilityData.some(slot => slot.available);
    if(hasAvailableSlot){
      return availabilityData.length == 1 ? 'LAST_APPOINTMENT_AVAILABLE' : 'AVAILABLE_APPOINTMENTS'
    }
  
    return 'ZERO_APPOINTMENTS_AVAILABLE'
}


const isBackButtonDisabled = computed(() => {
       const currentDate = selectedDate.value;

        for (const date in RESPONSE_FROM_API) {
          const dateObj = new Date(date);

          if (dateObj < currentDate) {
            const timeSlots = RESPONSE_FROM_API[date];

            if (timeSlots && timeSlots.some(slot => slot.available)) {
            
              return true;
            }
          }
        }

        return false;

})

const isNextButtonDisabled = computed(() => {
        
        const currentDate = selectedDate.value;

        for (const date in RESPONSE_FROM_API) {
          const dateObj = new Date(date);

          if (dateObj > currentDate) {
            const timeSlots = RESPONSE_FROM_API[date];

            if (timeSlots && timeSlots.some(slot => slot.available)) {
              return true;
            }
          }
        }

       return false;
  })

const   hasAvailableTimeSlots = (date:Date) => {
  const currentDate = spacetime(date).format(DATE_FORMAT_WITH_DASHES);
  const availabilityData = RESPONSE_FROM_API[currentDate] || [];
  return availabilityData.some(slot => slot.available);
}

const Next = () => {
  selectedDate.value = spacetime(selectedDate.value).add(NUMBER_OF_DAYS_DISPLAYED_IN_WEEK_CALENDAR,'days').toNativeDate()
}

const Back = () => {
  selectedDate.value = spacetime(selectedDate.value).subtract(NUMBER_OF_DAYS_DISPLAYED_IN_WEEK_CALENDAR,'days').toNativeDate()
}

const selectDay = (key: number) => {
  days.value.forEach((day) => {
    day.isSelected = day.key === key;
  });

  // Get the selected day
  const selectedDay = days.value.find((day) => day.key === key);
 
  if (selectedDay) {
    const currentDate = spacetime(selectedDay.date).format(DATE_FORMAT_WITH_DASHES);
     
    const availabilityData = RESPONSE_FROM_API[currentDate] || [];
   
    // Filter available times
    const availableTimes = availabilityData
      .filter((slot) => slot.available)
      .map((slot) => slot);
    // Update the Times ref with available times
    Times.value = availableTimes;
  } else {
    Times.value = [];
  }

};

const filteredTimes = computed(() => {
  const selectedTimes = Times.value;
  const selectedtype = selectionType.value;

  if (selectedtype === 'All') {
    return selectedTimes;
  }

  const filtered = selectedTimes.filter((time) => {
    const startTime = new Date(time.start);

    if (selectedtype === 'Morning') {
      return startTime.getHours() < 12;
    } else if (selectedtype === 'Afternoon') {
      return startTime.getHours() >= 12;
    }

    return false;
  });

  return filtered;
});


const formateTime = (time: any) => {
   const startTime = new Date(time.start);
  const endTime = new Date(time.end);

  const options = { hour: 'numeric', minute: 'numeric', hour12: true };

  const formattedStartTime = startTime.toLocaleTimeString('en-US', options);
  const formattedEndTime = endTime.toLocaleTimeString('en-US', options);

  return `${formattedStartTime} - ${formattedEndTime}`;

}

const SelectTime = (time: any,index: Number) => {
  selectedTimeIndex.value = index
  console.log(time)
}

const selectePeriod = (period: String) => {
  selectionType.value = period
}

</script>
