<template>
  <div class="md:w-full bg-stone-100 md:p-4 md:mt-12 flex justify-evenly items-center">
    <div class="w-1/3 text-center">
      <RouterLink class="font-bold text-xl" to="/">VibedThreads</RouterLink>
    </div>
    <div class="w-1/3 text-center">
      <RouterLink to="/men" class="px-4 font-bold font-semibold">Men</RouterLink>
      <RouterLink to="/women" class="px-4 font-bold font-semibold">Women</RouterLink>
      <RouterLink to="/kids" class="px-4 font-bold font-semibold">Kids</RouterLink>
    </div>
    <div class="w-1/3 text-center">
      <div>
        <input
          class="rounded-full h-8 px-2 font-semibold hover:bg-stone-200 w-1/4"
          type="text"
          placeholder="Search"
        />
        <RouterLink to="/" class="px-4 font-bold font-semibold">Register</RouterLink>
        <RouterLink to="/" class="px-4 font-bold font-semibold">Login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
