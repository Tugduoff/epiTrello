<template>
  <div @click.prevent="emit('openCardModal')" class="px-3 py-1">
    <div class="flex flex-row justify-between items-center">
      <div class="text-lg font-semibold text-white">{{ card.title }}</div>
      <div class="text-sm text-white">{{ card.due_date }}</div>
    </div>
    <div class="flex flex-row gap-2 flex-wrap justify-start my-2">
      <p class="text-sm text-slate-800" v-if="card.labels.length === 0">No labels selected</p>
      <div class="text-white py-1 px-2 rounded-md font-semibold"
        v-for="label in card.labels"
        :key="label.id"
        :style="{ backgroundColor: label.color }">
        {{ label.name }}
      </div>
    </div>
    <div class="flex justify-between w-full">
      <div class="text-sm text-gray-300 mb-2">
        <span v-if="card.assignees.length > 0">
          Assigned to {{ card.assignees.length }}
          {{ card.assignees.length === 1 ? 'person' : 'people' }}
        </span>
        <span v-else>No assignees</span>
      </div>
      <p class="text-sm text-gray-200 mb-2" v-if="card.priority">
        {{ card.priority === 1 ? 'High' : card.priority === 2 ? 'Medium' : 'Low' }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

type CardItem = {
  title: string,
  description: string,
  id: number,
  priority?: number,
  due_date?: string,
  list: {
    name: string,
    id: number
  },
  labels: Array<{
    id: number,
    name: string,
    color: string
  }>,
  assignees: Array<{
    id: number,
    name: string,
    email: string
  }>
}

const props = defineProps<{
  card: CardItem
}>()

const emit = defineEmits()

const card = ref(props.card)
</script>

<style>

</style>
