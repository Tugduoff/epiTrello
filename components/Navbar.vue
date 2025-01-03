<template>
  <nav class="p-2 border-solid border-b-[1px] z-[100000]"
    :style="{ backgroundColor: props.color, borderColor: isLightColor(props.color) ? '#eee' : props.color }">
    <div class="flex justify-between text-center flex-row w-full">
      <div class="flex flex-row justify-start text-center gap-1">
        <div class="flex flex-row justify-start items-center">
          <DropdownHomeMenu class="h-7" :color="props.color" />
          <TitleButton class="h-7" :color="props.color" />
        </div>
        <NavigationMenu class="h-7" :color="props.color" />
        <CreateButton class="h-7" :color="props.color" />
      </div>
      <div class="flex flex-row justify-end text-center gap-1.5">
        <SearchBar class="h-7" :color="props.color" />
        <NotificationsButton class="h-7" :color="props.color" />
        <HelpButton class="h-7" :color="props.color" />
        <AccountMenu class="h-7" :color="props.color" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  color: string,
}>()

function isLightColor(color: string): boolean {
  // Remove the hash if present
  color = color.replace(/^#/, '');

  // Parse the color into its RGB components
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate the YIQ value (perceived brightness)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check if the color is light or white
  return yiq > 200; // Threshold for "light" can be adjusted
}

watch(() => props.color, (newColor) => {
  console.log('Color changed to', newColor)
  color.value = newColor
})

const color = ref(props.color)
</script>

<style scoped>
</style>
