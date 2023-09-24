<template>
  <button
    type="button"
    class="flex h-[48px] w-full items-center justify-center rounded-[8px] bg-primary text-white transition-all duration-200 focus:outline-none disabled:opacity-60"
  >
    <span v-if="!props.isLoaderShown">
      {{ props.title }}
    </span>
    <img
      v-else
      src="@/assets/images/spinner.svg"
      class="h-[16px] scale-150 transform sm:h-[18px]"
      alt="spinner"
    />
  </button>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    isLoaderShown?: boolean
  }>(),
  {
    isLoaderShown: false,
  }
)
</script>
