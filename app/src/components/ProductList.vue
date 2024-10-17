<template>
    <div class="min-h-screen py-10 px-4">
        <!-- Loading Skeleton -->
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="border rounded-lg shadow p-4 animate-pulse">
                <div class="h-48 bg-gray-200 mb-4"></div>
                <div class="h-4 bg-gray-200 mb-2"></div>
                <div class="h-4 bg-gray-200 w-1/2"></div>
            </div>
        </div>

        <!-- Error Message -->
        <div v-if="hasError" class="text-center mt-20">
            <!-- <img src="/path/to/error-image.png" alt="Error" class="mx-auto h-40 mb-6"/> -->
            <h2 class="text-2xl font-bold text-red-600">Oops! Something went wrong.</h2>
            <p class="text-gray-500 mt-2">We couldn't load the products. Please try again later.</p>
            <button @click="retryFetch" class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-full">
                Retry
            </button>
        </div>

        <!-- No Products Available -->
        <div v-if="!isLoading && !hasError && products.length === 0" class="text-center mt-20">
            <!-- <img src="/path/to/empty-state-image.png" alt="No Products" class="mx-auto h-40 mb-6"/> -->
            <h2 class="text-2xl font-bold">No Products Available</h2>
            <p class="text-gray-500 mt-2">It seems there are no products to display right now. Please check back later.</p>
        </div>

        <!-- Product List -->
        <div v-if="!isLoading && !hasError && products.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
                v-for="product in products"
                :key="product.productId"
                class="border rounded-lg shadow-lg hover:shadow-xl transition p-4"
            >
                <RouterLink :to="`/product/${product.productId}`">
                <img
                    :src="product.imageUrl"
                    alt="Product Image"
                    class="w-full h-48 object-cover rounded-md transition-transform transform hover:scale-105"
                />
                <h2 class="text-lg font-semibold mt-4">{{ product.name }}</h2>
                <p class="mt-2 text-gray-700">${{ product.price.toFixed(2) }}</p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Define the product interface
interface Product {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
}

// State variables
const products = ref<Product[]>([])
const isLoading = ref(true)
const hasError = ref(false)

async function fetchProducts() {
try {
    isLoading.value = true
    hasError.value = false
    const response = await axios.get('http://localhost:8080/api/products/category/Mens') // Update with dynamic route
    products.value = response.data
} catch (error) {
    hasError.value = true
} finally {
    isLoading.value = false
}
}

function retryFetch() {
    fetchProducts()
}

// Fetch products on component mount
onMounted(fetchProducts)
</script>

<style scoped>
/* Custom styles for hover effects, if needed */
</style>