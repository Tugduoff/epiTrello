<template>
  <div>
    <div class="flex absolute gap-8 justify-center w-screen h-screen bg-[#1a181850] items-center" v-if="isCardModalOpen" @click.prevent="isCardModalOpen = false">
      <div v-if="isCardModalOpen" class="flex flex-row justify-center items-center" @click.prevent="isCardModalOpen = false">
        <div class="w-96 h-auto bg-white rounded-lg shadow-lg p-6 space-y-4" @click.stop>
          <div class="flex flex-row justify-between items-center gap-4 pb-2">
            <!-- Card Title Input -->
            <input
              type="text"
              class="text-slate-800 w-full px-3 py-2 text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              v-model="openedCard.title"
              placeholder="Card Title"
              :disabled="!isOwner"
            />
            <button
              @click="isCardModalOpen = false"
              class="text-xl text-gray-500 hover:bg-slate-300 px-2 rounded-md">
              &times;
            </button>
          </div>
          <!-- Card Description Input -->
          <textarea
            class="text-slate-800 w-full h-40 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            v-model="openedCard.description"
            placeholder="Card Description"
            :disabled="!isOwner"
          ></textarea>
          <!-- Priority and Due Date Inputs -->
          <div class="flex flex-col gap-4">
            <div class="flex flex-row gap-2 items-center">
              <!-- Priority Input -->
              <label for="priority" class="w-1/4 text-sm font-medium text-gray-600">Priority:</label>
              <select
                id="priority"
                v-model="openedCard.priority"
                class="w-3/4 px-3 py-2 text-slate-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                v-if="isOwner"
              >
                <option value="" disabled>Select priority</option>
                <option :value="1">High</option>
                <option :value="2">Medium</option>
                <option :value="3">Low</option>
              </select>
              <p class="text-sm text-slate-800" v-else>{{ openedCard.priority == undefined ? 'Not Set' : priorities[openedCard.priority] }}</p>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <!-- Start Date Input -->
              <label for="start_date" class="w-1/4 text-sm font-medium text-gray-600">Start Date:</label>
              <input
                type="date"
                id="start_date"
                v-model="openedCard.start_date"
                class="w-3/4 px-3 py-2 text-slate-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                v-if="isOwner"
              />
              <p class="text-sm text-slate-800" v-else>{{ openedCard.start_date == null ? 'Not Set' : openedCard.due_date }}</p>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <!-- Due Date Input -->
              <label for="due_date" class="w-1/4 text-sm font-medium text-gray-600">Due Date:</label>
              <input
                type="date"
                id="due_date"
                v-model="openedCard.due_date"
                class="w-3/4 px-3 py-2 text-slate-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                v-if="isOwner"
              />
              <p class="text-sm text-slate-800" v-else>{{ openedCard.due_date == null ? 'Not Set' : openedCard.due_date }}</p>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <!-- List Input -->
              <label for="list" class="w-1/4 text-sm font-medium text-gray-600">List:</label>
              <select
                id="list"
                v-model="openedCard.list.id"
                class="w-3/4 px-3 py-2 text-slate-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                v-if="isOwner"
              >
                <option value="" disabled>Select list</option>
                <option v-for="list in listsOrdered" :key="list.id" :value="list.id">{{ list.column }} {{ list.name }}</option>
              </select>
              <p class="text-sm text-slate-800" v-else>{{ openedCard.list.name }}</p>
            </div>
            <div class="flex flex-row gap-2 items-center" v-if="isOwner">
              <!-- Labels Input -->
              <label for="list" class="w-1/4 text-sm font-medium text-gray-600">Labels:</label>
              <div class="relative w-3/4">
                <!-- Dropdown trigger -->
                <div
                  class="cursor-pointer px-3 py-2 text-slate-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 flex flex-row justify-between items-center"
                  :class="{ 'bg-gray-200 hover:cursor-not-allowed': boardLabels.length === 0 }"
                  @click.prevent="toggleDropdown"
                >
                  Select a label
                  <Icon icon="mdi:chevron-down" class="inline-block w-4 h-4 mr-[-0.7rem]" />
                </div>
  
                <!-- Dropdown menu -->
                <div
                  v-if="isDropdownOpen && boardLabels.length > 0"
                  class="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                >
                  <div
                    v-for="label in boardLabels"
                    :key="label.id"
                    @click="addLabel(label.id, openedCard.id)"
                    class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <Icon icon="material-symbols:circle" class="w-4 h-4" :style="{ color: label.color }" />
                    <span>{{ label.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Labels -->
          <div class="flex flex-row gap-2 flex-wrap justify-start">
            <p class="text-sm text-slate-800" v-if="openedCard.labels.length === 0">No labels selected</p>
            <div class="text-white py-1 px-2 rounded-md font-semibold"
              v-for="label in openedCard.labels"
              :key="label.id"
              :style="{ backgroundColor: label.color }">
              {{ label.name }}
            </div>
          </div>
          <!-- Save and Delete Buttons -->
          <div class="w-full flex flex-row gap-2" v-if="isOwner">
            <button
              @click="deleteCard(openedCard.id)"
              class="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600"
            >Delete</button>
            <button
              @click="handleCardUpdate(openedCard.id, openedCard)"
              class="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
            >Save</button>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center gap-8 w-1/3 min-w-[350px]" @click.prevent="isCardModalOpen = false">
        <!-- Color -->
        <div class="flex flex-row justify-center items-center w-full min-w-[350px]" @click.stop>
          <div class="w-96 h-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h1 class="text-2xl text-slate-800">Card Color</h1>
            <div class="flex flex-row gap-2 items-center">
              <label for="newAssignees" class="w-1/4 text-sm font-medium text-gray-600">Color:</label>
              <input
                type="color"
                id="color"
                v-model="openedCard.color"
                class="w-3/4 text-slate-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                v-if="isOwner"/>
              <p class="text-sm text-slate-800" v-else>{{ openedCard.color }}</p>
            </div>
          </div>
        </div>

        <!-- Assignees -->
        <div class="flex flex-row justify-center items-center w-full min-w-[350px]" @click.stop>
          <div class="w-96 h-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h1 class="text-2xl text-slate-800">Assignees</h1>
            <div class="flex flex-row gap-2 items-center" v-if="isOwner">
              <label for="newAssignees" class="w-1/4 text-sm font-medium text-gray-600">Assign To:</label>
              <select
                id="newAssignees"
                v-model="newAssignee"
                @change="assignCard(newAssignee, openedCard.id)"
                class="w-3/4 px-3 py-2 text-slate-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option :value="0" disabled>Select member</option>
                <option v-for="user in cardPotentialAssignees" :value="user.id">{{ user.email }}</option>
              </select>
            </div>
            <div v-for="assignee in openedCard.assignees" class="text-slate-800 border-gray-300 rounded-md px-3 py-2 border flex justify-between">
              <p>{{ assignee.email }}</p>
              <button @click="unassignCard(assignee.id, openedCard.id)" class="text-red-500 hover:bg-red-100 rounded-md px-2" v-if="isOwner">Remove</button>
            </div>
            <p v-if="openedCard.assignees.length === 0" class="text-slate-800">No assignees</p>
          </div>
        </div>
      </div>
    </div>

    <NuxtLayout name="user-layout">
      <div class="h-16 w-full flex justify-between items-center px-6 bg-slate-200 rounded-lg shadow-md mb-4">
        <p class="text-2xl font-semibold text-slate-800 w-1/3">Board</p>

        <ListItem :list="boardName" @updateName="(newName: string) => updateBoardName(newName)" class="bg-slate-300 p-2 rounded-md w-1/3" v-if="boardName && isOwner"/>
        <p v-else-if="boardName" class="text-lg font-semibold px-2">{{ boardName }}</p>

        <div class="flex gap-4 w-1/3 flex-row justify-end">
          <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/boards`" class="text-white py-1.5 bg-slate-900 rounded-xl px-6 hover:bg-slate-200 hover:text-black hover:border-slate-900 border-slate-200 border-2 transition duration-300">Back</NuxtLink>
          <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/`" class="text-white py-1.5 bg-slate-900 rounded-xl px-6 hover:bg-slate-200 hover:text-black hover:border-slate-900 border-slate-200 border-2 transition duration-300">Workspace</NuxtLink>
          <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/board/${boardId}/settings`" class="p-2 hover:bg-slate-300 rounded-full transition duration-200" v-if="isOwner">
            <Icon icon="uil:setting" class="w-6 h-6 text-slate-800" />
          </NuxtLink>
        </div>
      </div>
      <div class="w-full overflow-x-scroll rounded-lg" :style="{ backgroundColor: boardColor }">
        <div class="p-4 flex flex-row gap-4 height-adjusted overflow-y-scroll" :style="{ width: `${lists.length * 22 + 5}rem`, backgroundColor: boardColor }">
          <div v-for="(list, i) in listsOrdered" :key="list.id" class="flex flex-col rounded-md w-[20rem]">
            <div class="flex flex-row">
              <ListItem :list="list.name" @updateName="(newName: string) => handleNameUpdate(list.id, newName)" class="bg-slate-300 p-2 rounded-md w-full" v-if="isOwner"/>
              <div class="bg-slate-300 p-2 rounded-md w-full flex flex-row justify-between items-center" v-else>
                <p class="text-lg font-semibold px-2">{{ list.name }}</p>
              </div>
              <button class="bg-red-500 hover:bg-red-600 rounded-md cursor-pointer w-[3rem] h-[3rem] p-3" @click.prevent="deleteList(list.id)" v-if="isOwner">
                <Icon icon="bi:trash" class="w-6 h-5 text-white" />
              </button>
            </div>
            <div class="flex flex-col gap-2 mt-2 bg-slate-200 p-2 rounded-md">
              <draggable v-model="cards[list.id]" group="people" @start="drag=true" @end="drag=false; updateLists()" item-key="id" v-if="isOwner">
                <template #item="{element}">
                  <div class="rounded-md hover:bg-blue-600 cursor-pointer mb-2" :style="{ backgroundColor: element.color }">
                    <CardItem :card="element" @updateCard="(newCard: CardItem) => handleCardUpdate(element.id, newCard)" @openCardModal="openCardModal(element, { name: list.name, id: list.id })" />
                  </div>
                </template>
              </draggable>
              <div class="p-1 rounded-md pl-3 hover:bg-blue-600 cursor-pointer" v-for="(card) in cards[list.id]" :key="card.id + '-' + forceUpdate" :style="{ backgroundColor: card.color }" v-else>
                <CardItem :card="card" @updateCard="(newCard: CardItem) => handleCardUpdate(card.id, newCard)" @openCardModal="openCardModal(card, { name: list.name, id: list.id })" />
              </div>
              <button class="bg-slate-300 hover:bg-slate-400 rounded-md cursor-pointer w-full h-[2rem]" @click.prevent="createCardForList(list.id)" v-if="isOwner">
                Add new card
              </button>
              <div class="flex flex-row justify-between items-center">
                <button class="rounded-md cursor-pointer w-1/4 h-[2rem]" :disabled="list.column == 0"
                  :class="list.column == 0 ? 'bg-gray-500 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'" @click.prevent="switchCol(list.id, list.column, -1, false)" v-if="isOwner">
                  <
                </button>
                <button class="rounded-md cursor-pointer w-1/4 h-[2rem]" :disabled="list.column == lists.length - 1"
                  :class="list.column == listsOrdered.length - 1 ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'" @click.prevent="switchCol(list.id, list.column, 1, false)" v-if="isOwner">
                  >
                </button>
              </div>
            </div>
            <div class="py-2 bg-transparent">
            </div>
          </div>
          <button class="bg-slate-300 hover:bg-slate-400 rounded-md cursor-pointer w-[3rem] h-[3rem]" @click="createList()" v-if="isOwner">
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
import { Icon } from '@iconify/vue'
import Cookies from 'js-cookie'
import draggable from 'vuedraggable'

type CardItem = {
  title: string,
  description: string,
  id: number,
  priority?: number,
  start_date?: string,
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
    email: string;
  }>,
  color: string;
}

const drag = ref(false)
const priorities = ['Not Set', 'High', 'Medium', 'Low']
const userEmail = Cookies.get('user')
const realUser = ref(0)
const isOwner = ref(false)
const boardLabels = ref<Array<{ id: number, name: string, color: string }>>([])
const boardMembers = ref<Array<{ id: number, name: string, email: string }>>([])
const selectedLabel = ref<number>(0)
const isDropdownOpen = ref(false)
const newAssignee = ref<number>(0)
const cardPotentialAssignees = computed(() => {
  if (!openedCard.value) {
    return []
  }
  return boardMembers.value.filter((member) => !openedCard.value.assignees.find((assignee) => assignee.id === member.id))
})

const route = useRoute()
const forceUpdate = ref(0)
const isCardModalOpen = ref(false)
const openedCard = ref<CardItem>({ title: '', description: '', priority: 0, id: 0, list: { name: '', id: 0 }, labels: [], assignees: [], color: '#3b82f6' })
const boardName = ref('')
const boardColor = ref('#eee')

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

async function assignCard(userId: number, cardId: number) {
  console.log('Assigning card:', cardId, 'to user:', userId)
  newAssignee.value = 0
  const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${openedCard.value.list.id}/card/${cardId}/assignee/create`, {
    assignee_id: userId
  });
  if (res.data.status !== 201) {
    console.error('Failed to assign card:', res)
    return
  }
  const member = boardMembers.value.find((member) => member.id === userId)
  if (!member) {
    console.error('Member not found:', userId)
    return
  }
  openedCard.value.assignees.push({
    id: userId,
    name: member.name,
    email: member.email
  })
}

async function unassignCard(userId: number, cardId: number) {
  console.log('Unassigning card:', cardId, 'from user:', userId)
  const res = await axios.delete(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${openedCard.value.list.id}/card/${cardId}/assignee/${userId}`);
  if (res.data.status !== 204) {
    console.error('Failed to unassign card:', res)
    return
  }
  const assigneeIndex = openedCard.value.assignees.findIndex((assignee) => assignee.id === userId)
  if (assigneeIndex !== -1) {
    openedCard.value.assignees.splice(assigneeIndex, 1)
  }
  console.log('Unassigned card:', cardId, 'from user:', userId)
}

const addLabel = async (labelId: number, cardId: number) => {
  toggleDropdown()
  const listId = openedCard.value.list.id
  try {
    const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/${cardId}/label/create`, {
      label_id: labelId
    });
    if (res.data.status !== 201) {
      console.error('Failed to add label:', res)
      selectedLabel.value = -1
      return
    }
    const boardLabel = boardLabels.value.find((label) => label.id === labelId)
    if (!boardLabel) {
      console.error('Label not found:', labelId)
      return
    }
    console.log(res.data)
    openedCard.value.labels.push({
      id: labelId,
      name: boardLabel.name,
      color: boardLabel.color
    })
    console.log('Added label:', labelId, 'to card:', cardId)
    console.log(openedCard.value)
  } catch (error) {
    console.error(error)
  }
}

const updateBoardName = async (newName: string) => {
  console.log('Received board name update:', newName)
  try {
    const res = await axios.put(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}`, {
      name: newName
    });
    console.log(res.data)
    boardName.value = newName
  } catch (error) {
    console.error(error)
  }
}

// Switch the col of the list
const switchCol = async (listId: number, col: number, dir: number, end: boolean) => {
  const newCol = col + dir

  if (newCol < 0 || newCol >= lists.value.length) {
    console.error('Invalid col:', newCol)
    return
  }
  console.log('Switching col of list:', listId, newCol)
  try {
    const res = await axios.put(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}`, {
      name: lists.value.find((list) => list.id === listId)?.name,
      col: newCol
    });
    console.log(res.data)
    const nextList = lists.value.find((list) => list.column === newCol);
    const listToUpdate = lists.value.find((list) => list.id === listId);
    if (listToUpdate) {
      listToUpdate.column = newCol;
    }

    if (nextList && !end) {
      forceUpdate.value++
      switchCol(nextList.id, newCol, -dir, true)
    }

    forceUpdate.value++
  } catch (error) {
    console.error(error)
  }
}

// Delete the card
const deleteCard = async (cardId: number) => {
  console.log('Deleted card:', cardId)
  isCardModalOpen.value = false
  try {
    const listId = lists.value.find((list) => cards.value[list.id].find((card) => card.id === cardId))?.id
    if (!listId) {
      console.error('List not found for card:', cardId)
      return
    }
    const res = await axios.delete(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/${cardId}`);
    console.log(res.data)
    const cardIndex = cards.value[listId].findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      cards.value[listId].splice(cardIndex, 1)
    }
    forceUpdate.value++
  } catch (error) {
    console.error(error)
  }
}

const openCardModal = (card: CardItem, list: { name: string, id: number }) => {
  console.log('Opened card modal:', card.id)
  isCardModalOpen.value = true
  openedCard.value.title = card.title
  openedCard.value.description = card.description
  openedCard.value.id = card.id
  openedCard.value.priority = card.priority
  openedCard.value.start_date = card.start_date
  openedCard.value.due_date = card.due_date
  openedCard.value.labels = card.labels
  openedCard.value.list = list
  openedCard.value.assignees = card.assignees
  openedCard.value.color = card.color
}

const handleCardUpdate = async (cardId: number, newCard: CardItem) => {
  isCardModalOpen.value = false
  console.log('Received card update:', cardId, newCard)
  try {
    let res : any = 0;
    const listId = lists.value.find((list) => cards.value[list.id].find((card) => card.id === cardId))?.id
    if (!listId) {
      console.error('List not found for card:', cardId)
      return
    }
    const cardToUpdate = cards.value[listId].find((card) => card.id === cardId);
    if (!cardToUpdate) {
      console.error('Card not found:', cardId)
      return
    }
    cardToUpdate.title = newCard.title;
    cardToUpdate.description = newCard.description;
    if (newCard.priority !== undefined)
      cardToUpdate.priority = newCard.priority;
    if (newCard.start_date !== undefined)
      cardToUpdate.start_date = newCard.start_date;
    if (newCard.due_date !== undefined)
      cardToUpdate.due_date = newCard.due_date;
    if (newCard.color !== undefined)
      cardToUpdate.color = newCard.color;
    // Check if the list has changed to switch the card to the new list
    res = await axios.put(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/${cardId}`, {
      title: newCard.title,
      description: newCard.description,
      priority: newCard.priority,
      start_date: newCard.start_date,
      due_date: newCard.due_date,
      list_id: newCard.list.id,
      color: newCard.color
    });
    if (cardToUpdate.list.id !== newCard.list.id) {
      cardToUpdate.list = newCard.list;
      cards.value[newCard.list.id].push(cardToUpdate);
      cards.value[listId] = cards.value[listId].filter((card) => card.id !== cardId);
    }
    forceUpdate.value++
    console.log('Updated card:', newCard)
  } catch (error) {
    console.error(error)
  }
}

async function updateLists() {
  // Iterate on every list and every card and update each card.
  for (const list of lists.value) {
    for (const card of cards.value[list.id]) {
      // We need to put the card to the correct column
      const res = await axios.put(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${list.id}/card/${card.id}`, {
        title: card.title,
        description: card.description,
        priority: card.priority,
        start_date: card.start_date,
        due_date: card.due_date,
        list_id: list.id,
        color: card.color
      });
    }
  }
  forceUpdate.value++
}

const handleNameUpdate = async (listId: number, newName: string) => {
  // Update the name of the list
  console.log('Received name update:', listId, newName)
  try {
    const res = await axios.put(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}`, {
      name: newName,
      col: lists.value.find((list) => list.id === listId)?.column
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

const lists = ref<Array<{ name: string, id: number, column: number }>>([])
// Computed value of lists according to col
const listsOrdered = computed(() => {
  return lists.value.sort((a, b) => a.column - b.column);
});

const cards = ref<{
  [listId: number] :
Array<CardItem>}>({})

const deleteList = async (listId: number) => {
  try {
    const listCol = lists.value.find((list) => list.id === listId)?.column

    if (listCol === undefined) {
      console.error('List not found:', listId)
      return
    }
    console.log(cards.value)
    const cardIds = cards.value[listId].map(card => card.id);
    for (const cardId of cardIds) {
      console.log('Deleting card:', cardId)
      await deleteCard(cardId)
    }
    const res = await axios.delete(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}`);
    console.log(res.data)
    for (const list of lists.value) {
      if (list.column > listCol) {
        await switchCol(list.id, list.column, -1, true)
      }
    }
    const listIndex = lists.value.findIndex((list) => list.id === listId);
    if (listIndex !== -1) {
      lists.value.splice(listIndex, 1)
    }
    forceUpdate.value++
    console.log('Deleted list:', listId)
  } catch (error) {
    console.error(error)
  }
}

const createList = async () => {
  const newList = 'New List'
  try {
    const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/create`, {
      name: newList,
      col: lists.value.length
    });
    console.log('New created list: ', res.data)
    const newId = res.data.list.id
    lists.value.push({ name: newList, id: newId, column: lists.value.length })
    console.log('New created list: ', res.data)
    cards.value[newId] = []
  } catch (error) {
    console.error(error)
  }
}

const createCardForList = async (listId: number) => {
  const newCard = 'New Card'
  try {
    const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/create`, {
      title: newCard,
      description: ''
    });
    const listName = lists.value.find((list) => list.id === listId)?.name
    if (!listName) {
      console.error('List not found:', listId)
      return
    }
    cards.value[listId].push({ title: newCard, description: '', id: res.data.card.id, list: { name: listName, id: listId }, labels: [], assignees: [], color: '#3b82f6' })
    console.log(res.data)
  } catch (error) {
    console.error(error)
  }
}

const getCardsFromList = async (listId: number) => {
  try {
    const res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/cards`);
    if (res.data.status !== 200) {
      console.error('Failed to fetch cards:', res)
      return
    }
    cards.value[listId] = []
    for (const card of res.data.cards) {
      const res2 = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/${card.id}/labels`);
      if (res2.data.status === 200) {
        card.labels = []
        for (const labelAssociation of res2.data.labels) {
          console.log('Fetching label:', labelAssociation)
          const labelId = labelAssociation.label_id
          const res3 = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/${card.id}/label/${labelId}`);
          if (res3.data.status === 200) {
            card.labels.push({
              id: labelId,
              name: res3.data.label.name,
              color: res3.data.label.color
            })
            console.log('Label fetched:', res3.data)
          }
        }
      }
      const res4 = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/${card.id}/assignees`);
      if (res4.data.status === 200) {
        card.assignees = []
        for (const assigneeAssociation of res4.data.assignees) {
          console.log('Fetching assignee:', assigneeAssociation)
          const assigneeId = assigneeAssociation.assignee_id
          const res5 = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/list/${listId}/card/${card.id}/assignee/${assigneeId}`);
          if (res5.data.status === 200) {
            card.assignees.push({
              id: assigneeId,
              name: res5.data.user.name,
              email: res5.data.user.email,
            })
            console.log('Assignees fetched:', card.assignees)
          }
        }
      }
      card.list = { name: lists.value.find((list) => list.id === listId)?.name || '', id: listId }
      cards.value[listId].push(card)
    }
    console.log('Cards fetched:', cards.value)
  } catch (error) {
    console.error(error)
  }
}

const fetchRealUser = async () => {
  try {
    const response = await axios.get(`/api/user/mail?email=${userEmail}`)
    console.log(response.data)

    if (response.status === 200) {
      realUser.value = response.data.user.id
      console.log('Real user fetched:', realUser.value)
    } else {
      console.error('Failed to fetch user', response)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async() => {
  await fetchRealUser()
  let res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}`);
  console.log('Workspace fetched:', res.data)
  if (realUser.value === res.data.workspace.owner_id) {
    isOwner.value = true
  }
  res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}`);
  console.log('Board fetched:', res.data)
  boardName.value = res.data.board.name
  boardColor.value = res.data.board.color
  res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/labels`);
  console.log('Labels fetched:', res.data)
  boardLabels.value = res.data.labels
  res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/members`);
  console.log('Members fetched:', res.data)
  boardMembers.value = []
  for (const memberAssociation of res.data.members) {
    const memberId = memberAssociation.user_id
    const res2 = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/member/${memberId}`);
    if (res2.data.status === 200) {
      boardMembers.value.push({
        id: memberId,
        name: res2.data.user.name,
        email: res2.data.user.email
      })
      console.log('Member fetched:', res2.data)
    }
  }
  // Get the owner of the board as well
  const res2 = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/owner`);
  if (res2.data.status === 200) {
    boardMembers.value.push({
      id: res2.data.owner.id,
      name: res2.data.owner.name,
      email: res2.data.owner.email
    })
    console.log('Owner fetched:', res2.data)
  }
  try {
    const res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/lists`);
    lists.value = res.data.lists
    console.log('Lists fetched:', lists.value)
    for (const list of lists.value) {
      await getCardsFromList(list.id)
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped>
.height-adjusted {
  height: calc(100vh - 14rem);
}
</style>
