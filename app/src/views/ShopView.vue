<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Filter Menu -->
      <div class="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Filters</h2>

        <!-- Categories -->
        <div class="mb-6">
          <h3 class="font-medium mb-2">Categories</h3>
          <div v-for="category in categories" :key="category.id" class="flex items-center mb-2">
            <input
              type="checkbox"
              :value="category.id"
              v-model="filters.selectedCategories"
              class="mr-2"
            />
            <label>{{ category.name }}</label>
          </div>
        </div>

        <!-- Price Range -->
        <div class="mb-6">
          <h3 class="font-medium mb-2">Price Range</h3>
          <div class="flex items-center gap-2">
            <input
              v-model="filters.minPrice"
              type="number"
              placeholder="Min"
              class="w-full border rounded-lg p-2"
            />
            <input
              v-model="filters.maxPrice"
              type="number"
              placeholder="Max"
              class="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <!-- Tags -->
        <div>
          <h3 class="font-medium mb-2">Tags</h3>
          <div v-for="tag in tags" :key="tag.id" class="flex items-center mb-2">
            <input type="checkbox" :value="tag.id" v-model="filters.selectedTags" class="mr-2" />
            <label>{{ tag.name }}</label>
          </div>
        </div>

        <button
          @click="applyFilters"
          class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      <!-- Product Grid -->
      <div class="w-full">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white p-4 rounded-lg shadow hover:shadow-lg"
          >
            <img
              src="../assets/item1.jpg"
              alt="Product"
              class="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 class="font-medium text-lg">{{ product.name }}</h3>
            <p class="text-gray-500 text-sm mb-2">{{ product.category }}</p>
            <p class="font-semibold">${{ product.price.toFixed(2) }}</p>
            <button
              @click="addToCart(product)"
              class="mt-2 w-full bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useCartStore } from '@/stores/CartStore'

export default defineComponent({
  setup() {
    const cartStore = useCartStore()

    // Mock Data
    const products = ref([
      { id: 1, name: 'T-Shirt', category: 'Men', price: 19.99, tags: [1], image: '/path/to/img' },
      { id: 2, name: 'Dress', category: 'Women', price: 49.99, tags: [2], image: '/path/to/img' }
      // Add more products as needed
    ])
    const categories = ref([
      { id: 1, name: 'Men' },
      { id: 2, name: 'Women' }
    ])
    const tags = ref([
      { id: 1, name: 'Casual' },
      { id: 2, name: 'Formal' }
    ])

    // Filters
    const filters = ref({
      selectedCategories: [] as string[],
      selectedTags: [] as number[],
      minPrice: 0,
      maxPrice: 1000
    })

    // Filtered Products
    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        const matchesCategory =
          filters.value.selectedCategories.length === 0 ||
          filters.value.selectedCategories.includes(product.category)
        const matchesTags =
          filters.value.selectedTags.length === 0 ||
          product.tags.some((tag) => filters.value.selectedTags.includes(tag))
        const matchesPrice =
          product.price >= filters.value.minPrice && product.price <= filters.value.maxPrice

        return matchesCategory && matchesTags && matchesPrice
      })
    })

    const applyFilters = () => {
      console.log('Filters Applied', filters.value)
    }

    const addToCart = (product: any) => {
      cartStore.addToCart(product)
      alert(`${product.name} added to cart!`)
    }

    return {
      products,
      categories,
      tags,
      filters,
      filteredProducts,
      applyFilters,
      addToCart
    }
  }
})
</script>
