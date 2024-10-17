<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Featured Products</h1>
    <ProductList :category="'featured'" />
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/ProductList.vue'
</script>