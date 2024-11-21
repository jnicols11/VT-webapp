<template>
  <div class="min-h-screen py-10 px-4">
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center text-2xl">Loading product...</div>

    <!-- Error state -->
    <div v-if="hasError" class="text-center mt-10">
      <h2 class="text-2xl font-bold text-red-600">Product not found</h2>
      <p class="mt-2 text-gray-500">
        We couldn't find the product you're looking for. Please try again later.
      </p>
    </div>

    <div v-if="!isLoading && !hasError && product" class="md:flex md:space-x-8">
      <div class="md:w-1/2">
        <img
          src="../assets/item1.jpg"
          alt="Product Image"
          class="w-full h-auto object-cover rounded-lg"
        />
      </div>

      <div class="md:w-1/2 mt-6 md:mt-0">
        <h1 class="text-3xl font-bold">{{ product?.name }}</h1>
        <p class="text-gray-500 mt-4">{{ product?.description }}</p>
        <p class="text-2xl font-semibold mt-6">${{ product?.price.toFixed(2) }}</p>

        <div class="mt-6">
          <label for="size" class="block text-sm font-medium text-gray-700">Size</label>
          <select
            v-model="selectedSize"
            id="size"
            class="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm"
          >
            <option disabled value="">Select a size</option>
            <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>

        <button
          @click="addToCart"
          class="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          :disabled="!selectedSize"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '@/stores/CartStore'

interface Product {
  productId: number
  name: string
  description: string
  price: number
  imageUrl: string
}

const product = ref<Product | null>(null)
const isLoading = ref(true)
const hasError = ref(false)
const selectedSize = ref('')
const sizes = ['S', 'M', 'L', 'XL']

const route = useRoute()
const productId = route.params.productId

const cartStore = useCartStore()

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/${productId}`)
    product.value = response.data
  } catch (error) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})

function addToCart() {
  if (!selectedSize.value) return
  cartStore.addToCart({
    id: productId.toString(),
    name: product.value!.name,
    price: product.value!.price,
    description: product.value!.description
  })
}
</script>
