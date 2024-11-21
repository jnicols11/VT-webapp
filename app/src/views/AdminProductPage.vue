<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Product Management</h1>

    <!-- Product List -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">All Products</h2>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-300 p-2">Product ID</th>
            <th class="border border-gray-300 p-2">Name</th>
            <th class="border border-gray-300 p-2">Price</th>
            <th class="border border-gray-300 p-2">Quantity</th>
            <th class="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.productId" class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">{{ product.productId }}</td>
            <td class="border border-gray-300 p-2">{{ product.name }}</td>
            <td class="border border-gray-300 p-2">${{ product.price }}</td>
            <td class="border border-gray-300 p-2">{{ product.quantity }}</td>
            <td class="border border-gray-300 p-2">
              <button
                class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                @click="editProduct(product)"
              >
                Edit
              </button>
              <button
                class="bg-red-500 text-white px-2 py-1 rounded"
                @click="deleteProduct(product.productId)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Product Form -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">
        {{ isEditing ? 'Edit Product' : 'Add New Product' }}
      </h2>
      <form @submit.prevent="submitProductForm" class="space-y-4">
        <div>
          <label for="name" class="block font-medium">Name</label>
          <input
            id="name"
            v-model="currentProduct.name"
            type="text"
            class="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label for="price" class="block font-medium">Price</label>
          <input
            id="price"
            v-model.number="currentProduct.price"
            type="number"
            class="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label for="quantity" class="block font-medium">Quantity</label>
          <input
            id="quantity"
            v-model.number="currentProduct.quantity"
            type="number"
            class="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label for="images" class="block font-medium">Product Images</label>
          <input
            id="images"
            type="file"
            class="w-full border rounded p-2"
            multiple
            @change="handleImageUpload"
          />
        </div>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
          {{ isEditing ? 'Update Product' : 'Add Product' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'

interface Product {
  productId: number
  name: string
  price: number
  quantity: number
  images: File[]
}

export default defineComponent({
  setup() {
    const products = ref<Product[]>([])
    const isEditing = ref(false)
    const currentProduct = ref<Product>({
      productId: 0,
      name: '',
      price: 0,
      quantity: 0,
      images: []
    })

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/')
        products.value = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    const editProduct = (product: Product) => {
      isEditing.value = true
      currentProduct.value = { ...product, images: [] } // Reset images for editing
    }

    const deleteProduct = async (productId: number | null) => {
      if (productId === null) {
        console.error('Product ID is null. Cannot delete the product.')
        return
      }
      try {
        await axios.delete(`http://localhost:8080/api/products/${productId}`)
        fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }

    const handleImageUpload = (event: Event) => {
      const files = (event.target as HTMLInputElement).files
      if (files) {
        currentProduct.value.images = Array.from(files)
      }
    }

    const submitProductForm = async () => {
      const formData = new FormData()
      formData.append(
        'product',
        JSON.stringify({
          productId: currentProduct.value.productId,
          name: currentProduct.value.name,
          price: currentProduct.value.price,
          quantity: currentProduct.value.quantity
        })
      )

      currentProduct.value.images.forEach((image) => formData.append('images', image))

      try {
        if (isEditing.value) {
          await axios.put(
            `http://localhost:8080/api/products/${currentProduct.value.productId}`,
            formData
          )
        } else {
          await axios.post('http://localhost:8080/api/products/', formData)
        }
        resetForm()
        fetchProducts()
      } catch (error) {
        console.error('Error submitting product form:', error)
      }
    }

    const resetForm = () => {
      isEditing.value = false
      currentProduct.value = {
        productId: 0,
        name: '',
        price: 0,
        quantity: 0,
        images: []
      }
    }

    fetchProducts()

    return {
      products,
      isEditing,
      currentProduct,
      fetchProducts,
      editProduct,
      deleteProduct,
      handleImageUpload,
      submitProductForm
    }
  }
})
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
