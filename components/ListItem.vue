<template>
  <div>
    <div class="flex flex-row justify-between items-center" v-if="!editMode">
      <div class="text-lg font-semibold px-2">{{ list }}</div>
      <Icon icon="mdi:pencil" alt="" class="w-6 h-6 text-slate-800 p-1 rounded-[0.25rem] hover:bg-slate-300 cursor-pointer" @click.prevent="editMode = true"/>
    </div>
    <div class="flex flex-row justify-between items-center gap-2" v-else>
      <input type="text" class="text-lg font-semibold w-11/12 px-2" v-model="list" @change="handleInput($event as InputEvent)" maxlength="15" />
      <Icon icon="material-symbols:check" alt="" class="w-6 h-6 text-slate-800 p-1 rounded-[0.25rem] hover:bg-slate-300 cursor-pointer" @click.prevent="editMode = false"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const editMode = ref(false)

const props = defineProps<{
  list: string
}>()

const emit = defineEmits()

const list = ref(props.list)

const handleInput = (event: InputEvent) => {
  console.log('Input event on ListItem:', list.value)
  list.value = (event.target as HTMLInputElement).value;
  emit('updateName', list.value)
  console.log('Emitted updateName:', list.value)
  editMode.value = false
}
</script>

<style>

</style>
