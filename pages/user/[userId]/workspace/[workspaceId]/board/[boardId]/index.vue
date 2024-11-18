<template>
  <div>
    <NuxtLayout name="user-layout">
      <div class="w-full overflow-x-scroll no-scrollbar">
        <div class="p-4 flex flex-row gap-4 h-[51rem] overflow-y-scroll" :style="`width: ${lists.length * 20 + 5}rem`">
          <div v-for="(list, i) in lists" :key="i" class="flex flex-col rounded-md w-[20rem]">
            <ListItem :list="list.name" @updateName="(newName: string) => handleNameUpdate(list.id, newName)" class="bg-slate-300 p-2 rounded-md" />
            <div class="flex flex-col gap-2 mt-2 bg-slate-200 p-2 rounded-md">
              <div class="bg-blue-500 p-1 rounded-md pl-3 hover:bg-blue-600 cursor-pointer" v-for="(card, j) in cards[list.id]" :key="j">
                <p class="text-white">{{ card.title }}</p>
                <p class="text-white overflow-hidden">{{ card.description }}</p>
              </div>
              <button class="bg-slate-200 hover:bg-slate-300 rounded-md cursor-pointer w-full h-[2rem]" @click.prevent="createCardForList(list.id)">
                Add new card
              </button>
            </div>
            <div class="py-2 bg-transparent">
            </div>
          </div>
          <button class="bg-slate-300 hover:bg-slate-400 rounded-md cursor-pointer w-[3rem] h-[3rem]" @click="createList()">
            +
          </button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const handleNameUpdate = async (listId: number, newName: string) => {
  // Update the name of the list
  console.log('Received name update:', listId, newName)
  try {
    const res = await axios.put(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}`, {
      name: newName
    });
    console.log(res.data)
    const listToUpdate = lists.value.find((list) => list.id === listId);
    if (listToUpdate) {
      listToUpdate.name = newName;
    }
  } catch (error) {
    console.error(error)
  }
}

// Get workspaceId, boardId, and userId from route params
const workspaceId = route.params.workspaceId as string
const boardId = route.params.boardId as string
const userId = route.params.userId as string

const lists = ref<Array<{ name: string, id: number }>>([])
const cards = ref<{
  [listId: number] :
Array<{
  title: string,
  description: string,
  id: number
}>}>({})

const createList = async () => {
  const newList = 'New List ' + lists.value.length
  try {
    const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/create`, {
      name: newList
    });
    const newId = res.data.list.id
    lists.value.push({ name: newList, id: newId })
    console.log(res.data)
    cards.value[newId] = []
  } catch (error) {
    console.error(error)
  }
}

const createCardForList = async (listId: number) => {
  const newCard = 'New Card ' + cards.value[listId].length
  try {
    const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/create`, {
      title: newCard,
      description: ''
    });
    cards.value[listId].push({ title: newCard, description: '', id: res.data.card.id })
    console.log(res.data)
  } catch (error) {
    console.error(error)
  }
}

const getCardsFromList = async (listId: number) => {
  try {
    const res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/cards`);
    cards.value[listId] = res.data.cards
  } catch (error) {
    console.error(error)
  }
}

onMounted(async() => {
  try {
    const res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/lists`);
    lists.value = res.data.lists
    for (const list of lists.value) {
      await getCardsFromList(list.id)
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<style>
</style>
