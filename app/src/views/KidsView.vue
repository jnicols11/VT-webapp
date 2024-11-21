<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 ml-4">Kid's Clothing</h1>
    <ProductList :category="'Kids'" />
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/ProductList.vue'
</script>
