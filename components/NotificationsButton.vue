<template>
  <div>
    <Icon icon="iconoir:bell" alt=""
      class="w-8 h-8 p-1.5 text-slate-900 rotate-45 rounded-[50%] hover:bg-slate-200 cursor-pointer mt-[-0.1rem]"
      @click.stop="openNotificationsMenu" />
    <div
      ref="notificationsMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[25rem] mt-[7px] border border-gray-100 p-3 absolute right-0 h-2/4"
      v-if="showNotificationsMenu">
      <div class="flex flex-row justify-between items-center border-b-[1px] border-solid border-slate-200 pb-5 pt-3 px-2">
        <h1 class="text-lg font-bold text-slate-800">Notifications</h1>
        <div class="flex flex-row justify-between items-center gap-1">
          <p class="text-xs text-slate-600 mr-1">Only show unread</p>
          <div @click="switchNotifsUnread = !switchNotifsUnread"
            class="flex flex-row justify-between items-center gap-1 w-8 h-4 rounded-lg p-0.5 cursor-pointer"
            :class="switchNotifsUnread ? 'bg-green-700' : 'bg-slate-700'">
            <Icon icon="material-symbols:check" alt="" class="w-6 h-6 text-white" />
            <Icon icon="charm:cross" alt="" class="w-6 h-6 text-white" />
            <span class="bg-white w-3 h-3 rounded-[50%] absolute duration-300"
              :class="switchNotifsUnread ? 'ml-[1rem]' : ''"
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

const showNotificationsMenu = ref(false)
const switchNotifsUnread = ref(true)
const notificationsMenu = ref<HTMLElement | null>(null)

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
