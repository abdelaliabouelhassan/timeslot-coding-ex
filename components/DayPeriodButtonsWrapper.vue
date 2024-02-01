<template>
  <div class="flex w-full items-center justify-center space-x-[8px]">
    <DayPeriodButton @click="selectPeriod('All')" :is-selected="selectedPeriod == 'All'" text="All" />
    <DayPeriodButton @click="selectPeriod('Morning')" :is-selected="selectedPeriod == 'Morning'" text="Morning" />
    <DayPeriodButton @click="selectPeriod('Afternoon')" :is-selected="selectedPeriod == 'Afternoon'" text="Afternoon" />
  </div>
</template>
<script setup lang="ts">
 const selectedPeriod = ref('All')
 const emit = defineEmits(['selectedPeriod'])

 const selectPeriod = (period: String) => {
  selectedPeriod.value = period
  emit('selectedPeriod',period)
 }
</script>
