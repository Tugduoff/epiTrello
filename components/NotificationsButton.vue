<template>
  <div>
    <Icon icon="mdi:bell-outline" alt=""
      class="w-8 h-8 p-1.5 rotate-45 rounded-[50%] hover:bg-[--hover-bg-color] cursor-pointer mt-[-0.1rem]"
      @click.stop="openNotificationsMenu"
      :style="{ color: titleColor, '--hover-bg-color': isLightColor(props.color) ? '#e2e8f0' : getLighterColor(props.color) }" />
    <div
      ref="notificationsMenu"
      class="bg-slate-100 text-black rounded-lg shadow-lg w-[25rem] mt-[7px] border border-gray-100 p-3 absolute right-0 h-2/4"
      v-if="showNotificationsMenu">
      <div class="flex flex-row justify-between items-center border-b-[1px] border-solid border-slate-200 pb-5 pt-3 px-2">
        <h1 class="text-lg font-bold text-slate-800">Notifications</h1>
        <div class="flex flex-row justify-between items-center gap-1">
          <p class="text-xs text-slate-600 mr-1">Only show unread</p>
          <div @click="switchNotifsUnread = !switchNotifsUnread"
            class="flex flex-row justify-between items-center gap-1 w-8 h-4 rounded-lg p-0.5 cursor-pointer relative"
            :class="switchNotifsUnread ? 'bg-green-700' : 'bg-slate-700'">
            <Icon icon="material-symbols:check" alt="" class="w-6 h-6 text-white" />
            <Icon icon="charm:cross" alt="" class="w-6 h-6 text-white" />
            <span class="bg-slate-100 w-2.5 h-2.5 rounded-[50%] absolute duration-300 ml-[2px]"
              :class="switchNotifsUnread ? '!ml-[1rem]' : ''"
            />
          </div>
          <Icon icon="charm:menu-kebab" alt="" class="w-6 h-6 text-slate-600 p-1 rounded-[0.25rem] hover:bg-slate-200 cursor-pointer" />
        </div>
      </div>
      <div class="flex flex-col justify-center items-center h-[70%]">
        <img src="@/assets/img/sleepPanda.png" alt="" class="w-40 h-40 rounded-[50%]" />
        <p v-if="switchNotifsUnread">No unread notifications</p>
        <p v-else>No notifications</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Icon } from '@iconify/vue'

const showNotificationsMenu = ref(false)
const switchNotifsUnread = ref(true)
const notificationsMenu = ref<HTMLElement | null>(null)

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

function getEvenLighterColor(color: string, percent: number = 10): string {
  return getLighterColor(color, 15);
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

const openNotificationsMenu = () => {
  showNotificationsMenu.value = !showNotificationsMenu.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (showNotificationsMenu.value && notificationsMenu.value && !notificationsMenu.value.contains(event.target as Node)) {
    showNotificationsMenu.value = false
    console.log('clicked outside of Notifications menu')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>

</style>
