<template>
  <nav class="bg-stone-100 p-4">
    <div class="md:flex justify-between items-center">
      <div class="text-center md:text-left">
        <RouterLink class="font-bold text-xl" to="/">VibedThreads</RouterLink>
      </div>

      <div class="md:hidden">
        <button @click="toggleMenu" class="text-xl font-bold">
          ☰
        </button>
      </div>

      <div :class="{'hidden': !isMenuOpen, 'md:flex': true}" class="w-full md:w-auto">
        <div class="text-center md:text-left space-y-4 md:space-y-0 md:space-x-6">
          <RouterLink to="/men" class="block md:inline-block font-bold">Men</RouterLink>
          <RouterLink to="/women" class="block md:inline-block font-bold">Women</RouterLink>
          <RouterLink to="/kids" class="block md:inline-block font-bold">Kids</RouterLink>
        </div>
      </div>

      <div class="hidden md:flex items-center space-x-4">
        <input
          class="rounded-full h-8 px-2 font-semibold hover:bg-stone-200"
          type="text"
          placeholder="Search"
        />
        <RouterLink to="/register" class="font-bold">Register</RouterLink>
        <RouterLink to="/login" class="font-bold">Login</RouterLink>
      </div>
    </div>

    <div :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="md:hidden mt-4 space-y-4">
      <input
        class="rounded-full h-8 px-2 font-semibold hover:bg-stone-200 w-full"
        type="text"
        placeholder="Search"
      />
      <RouterLink to="/register" class="block font-bold">Register</RouterLink>
      <RouterLink to="/login" class="block font-bold">Login</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>