<template>
  <div class="flex w-full items-center justify-center space-x-[8px]">
    <DayPeriodButton :is-selected="true" text="All" />
    <DayPeriodButton :is-selected="false" text="Morning" />
    <DayPeriodButton :is-selected="false" text="Afternoon" />
  </div>
</template>
<script setup lang="ts"></script>
