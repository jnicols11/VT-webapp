<template>
    <div>
      <h1 class="text-3xl font-bold mb-8">Men's Clothing</h1>
      <ProductList :category="'Mens'" />
    </div>
  </template>
  
  <script setup lang="ts">
  import ProductList from '@/components/ProductList.vue';
  </script>