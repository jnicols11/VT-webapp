<template>
  <nav class="bg-stone-100 p-4">
    <div class="md:flex justify-between items-center">
      <div class="text-center md:text-left">
        <RouterLink class="font-bold text-xl" to="/">VibedThreads</RouterLink>
      </div>

      <div class="md:hidden">
        <button @click="toggleMenu" class="text-xl font-bold">☰</button>
      </div>

      <div :class="{ hidden: !isMenuOpen, 'md:flex': true }" class="w-full md:w-auto">
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

        <button v-if="!isAuthenticated" @click="register" class="font-bold">Register</button>
        <button v-if="!isAuthenticated" @click="login" class="font-bold">Login</button>
        <router-link to="/orders" v-if="isAuthenticated" class="font-bold">Orders</router-link>
        <router-link to="/cart" class="relative">
          <span class="font-bold">Cart</span>
          <span
            v-if="cartStore.totalQuantity > 0"
            class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1"
          >
            {{ cartStore.totalQuantity }}
          </span>
        </router-link>
        <button v-if="isAuthenticated" @click="logoutUser" class="font-bold">Logout</button>
      </div>
    </div>

    <div :class="{ block: isMenuOpen, hidden: !isMenuOpen }" class="md:hidden mt-4 space-y-4">
      <input
        class="rounded-full h-8 px-2 font-semibold hover:bg-stone-200 w-full"
        type="text"
        placeholder="Search"
      />
      <button v-if="!isAuthenticated" @click="register" class="block font-bold">Register</button>
      <button v-if="!isAuthenticated" @click="login" class="block font-bold">Login</button>
      <button v-if="isAuthenticated" @click="logoutUser" class="block font-bold">Logout</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/CartStore'
import { useAuth0 } from '@auth0/auth0-vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

const isMenuOpen = ref(false)
const cartStore = useCartStore()

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

const login = () => loginWithRedirect()

const register = () =>
  loginWithRedirect({
    authorizationParams: { screen_hint: 'signup' }
  })

const logoutUser = () => logout({ logoutParams: { returnTo: window.location.origin } })
</script>
