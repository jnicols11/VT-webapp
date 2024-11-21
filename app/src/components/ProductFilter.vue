<template>
    <div class="mb-6">
        <label class="block mb-2 font-semibold">Filter by:</label>
        <div class="flex space-x-4">
        <select v-model="selectedSize" class="border rounded px-4 py-2">
            <option value="">Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>

        <select v-model="selectedColor" class="border rounded px-4 py-2">
            <option value="">Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
        </select>

        <select v-model="selectedType" class="border rounded px-4 py-2">
            <option value="">Type</option>
            <option value="shirt">Shirt</option>
            <option value="pants">Pants</option>
        </select>

        <button @click="applyFilters" class="bg-blue-500 text-white px-4 py-2 rounded">Apply Filters</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const selectedSize = ref('')
const selectedColor = ref('')
const selectedType = ref('')

function applyFilters() {
const filters = []
if (selectedSize.value) filters.push(selectedSize.value)
if (selectedColor.value) filters.push(selectedColor.value)
if (selectedType.value) filters.push(selectedType.value)

axios.post('http://localhost:8080/api/products/filter', filters)
    .then(response => {
    console.log('Filtered products:', response.data)
    })
    .catch(error => {
    console.error('Error fetching filtered products:', error)
    })
}
</script>