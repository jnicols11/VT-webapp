<template>
    <div>
        <h1 class="text-3xl font-bold mb-8">Search Results</h1>
        <div v-if="products.length">
        <ProductList :products="products" />
        </div>
        <div v-else>
        <p>No products found for "{{ searchQuery }}"</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProductList from '@/components/ProductList.vue'

const products = ref([])
const route = useRoute()
const searchQuery = route.query.q

onMounted(async () => {
    const response = await axios.get(`http://localhost:8080/api/products/search?query=${searchQuery}`)
    products.value = response.data
})
</script>