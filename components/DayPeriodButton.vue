<template>
  <button
    class="flex h-[36px] w-fit items-center justify-center rounded-full border px-[20px] py-[10px] outline-none focus:outline-none"
    :class="
      isSelected ? 'border-primary text-primary' : 'border-gray text-black'
    "
  >
    <span class="whitespace-nowrap text-[15px] leading-[16px]">{{ text }}</span>
  </button>
</template>
<script setup lang="ts">
defineProps<{
  isSelected: boolean
  text: string
}>()
</script>
