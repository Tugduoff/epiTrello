<template>
  <div>
    <div
      @click="redirect"
      class="flex flex-row justify-center items-center px-2 cursor-pointer gap-1.5 hover:bg-[--hover-bg-color] rounded-sm h-7"
      :style="{ '--hover-bg-color': isLightColor(props.color) ? '#e2e8f0' : getLighterColor(props.color) }">
      <Icon icon="simple-icons:trello" alt="" class="w-[1.1rem] h-[1.1rem]"
        :style="{ color: titleColor }" />
      <h1 class="text-lg font-black font-mono tracking-tighter text-center justify-center mt-0.5"
        :style="{ color: titleColor }">
        Trello</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter();
const route = useRoute();

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

function computeFromContrast(color: string) {
  // Ensure the color starts with '#' and is in the correct format
  if (!/^#([0-9A-Fa-f]{6})$/.test(color)) {
    throw new Error('Invalid color format. Use #RRGGBB format.')
  }

  // console.log('Computing contrast for color', color)

  // Extract RGB values
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#1e293b' : '#ffffff'
}

function getLighterColor(color: string, percent: number = 10): string {
  // Remove the hash if present
  color = color.replace(/^#/, '');

  // Parse the color into its RGB components
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  // Lighten each component
  r = Math.min(255, Math.round(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.round(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.round(b + (255 - b) * (percent / 100)));

  // Convert back to hexadecimal and return the color
  const lighterColor = `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return lighterColor;
}

const props = defineProps<{
  color: string,
}>()

const titleColor = ref(isLightColor(props.color) ? '#334155' : computeFromContrast(props.color))

watch(() => props.color, (newColor) => {
  console.log('Color changed to', newColor)
  titleColor.value = isLightColor(newColor) ? '#334155' : computeFromContrast(newColor)
})

function redirect() {
  if (route.params.userId) {
    router.push(`/user/${route.params.userId}`);
  } else {
    router.push('/');
  }
}
</script>

<style>

</style>
