<template>
    <div>
      <h1 class="text-3xl font-bold mb-8">Women's Clothing</h1>
      <ProductList :category="'women'" />
    </div>
  </template>
  
  <script setup lang="ts">
  import ProductList from '@/components/ProductList.vue';
  </script>