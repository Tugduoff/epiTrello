<template>
  <nav class="p-2 border-solid border-b-[1px] border-gray-200">
    <div class="flex justify-between text-center flex-row w-full">
      <div class="flex flex-row justify-start text-center gap-1">
        <div class="flex flex-row justify-start items-center">
          <DropdownHomeMenu class="h-7"/>
          <AdminTitleButton class="h-7"/>
          <AdminNavigationMenu class="h-7"/>
        </div>
        <AdminCreateButton class="h-7"/>
        <!-- <NavigationMenu class="h-7"/> -->
        <!-- <CreateButton class="h-7"/> -->
      </div>
      <div class="flex flex-row justify-end text-center gap-1.5">
        <SearchBar class="h-7"/>
        <NotificationsButton class="h-7"/>
        <HelpButton class="h-7"/>
        <AccountMenu class="h-7"/>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>


<!-- DropDown Menu - Redirect Button - Navigation Menu - DropDown Menu -->
 <!-- Add responsive !!! -->