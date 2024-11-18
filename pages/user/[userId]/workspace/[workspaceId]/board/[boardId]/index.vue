<template>
  <div>
    <NuxtLayout name="user-layout">
      <div class="w-full overflow-x-scroll no-scrollbar overscroll-none">
        <div class="bg-slate-100 p-4 flex flex-row gap-4" :style="`width: ${lists.length * 20 + 5}rem`">
          <div v-for="(list, i) in lists" :key="i" class="flex flex-col bg-slate-200 rounded-md p-2 w-[20rem]">
            <ListItem :list="list.name" @updateName="(newName: string) => handleNameUpdate(list.id, newName)" />
          </div>
          <button class="bg-slate-200 hover:bg-slate-300 rounded-md cursor-pointer w-[3rem] h-[3rem]" @click="createList()">
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

const createList = async () => {
  const newList = 'New Column' + lists.value.length
  try {
    const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/create`, {
      name: newList
    });
    const newId = res.data.list.id
    lists.value.push({ name: newList, id: newId })
    console.log(res.data)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async() => {
  // Fetch all lists from the board
  try {
    const res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/lists`);
    lists.value = res.data.lists
  } catch (error) {
    console.error(error)
  }
})
</script>

<style>
</style>
