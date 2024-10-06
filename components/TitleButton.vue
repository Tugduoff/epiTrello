<template>
  <div>
    <div
      @click="router.push(menuRoute)"
      class="flex flex-row justify-center items-center px-2 cursor-pointer gap-1.5 hover:bg-slate-200 rounded-sm h-7">
      <Icon icon="simple-icons:trello" alt="" class="w-[1.1rem] h-[1.1rem] text-slate-600" />
      <h1 class="text-lg font-black font-mono text-slate-600 tracking-tighter text-center justify-center mt-0.5">
        Trello</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const router = useRouter();
const localePath = useLocalePath();

const menuRoute = localePath({ name: 'index' })
</script>

<style>

</style>
