<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">My Orders</h1>

    <div v-if="loading" class="text-center">
      <p>Loading orders...</p>
    </div>
    <div v-else-if="orders.length === 0" class="text-center">
      <p>You have no orders yet.</p>
    </div>
    <div v-else>
      <div
        v-for="order in orders"
        :key="order.id"
        class="mb-6 bg-gray-100 rounded-lg shadow-md p-4"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="font-medium text-lg">Order #{{ order.id }}</h2>
            <p class="text-gray-600">Placed on: {{ formatDate(order.createdAt) }}</p>
            <p class="text-gray-600">Status: {{ order.status }}</p>
          </div>
          <div>
            <p class="font-semibold text-lg">Total: ${{ order.total.toFixed(2) }}</p>
            <button
              @click="toggleDetails(order.id)"
              class="mt-2 bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700"
            >
              {{ expandedOrder === order.id ? 'Hide Details' : 'View Details' }}
            </button>
          </div>
        </div>

        <!-- Order Details -->
        <div v-if="expandedOrder === order.id" class="mt-4">
          <h3 class="font-medium text-md mb-2">Items:</h3>
          <div v-for="item in order.items" :key="item.productId" class="flex justify-between mb-2">
            <div>
              <p>{{ item.productName }}</p>
              <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
            </div>
            <p>${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
          <p class="text-right font-medium mt-4">
            Subtotal: ${{ order.subtotal.toFixed(2) }} | Shipping: ${{
              order.shipping.toFixed(2)
            }}
            | Tax: ${{ order.tax.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/AuthStore'

interface OrderItem {
  productId: number
  productName: string
  price: number
  quantity: number
}

interface Order {
  id: number
  createdAt: string
  status: string
  total: number
  subtotal: number
  tax: number
  shipping: number
  items: OrderItem[]
}

export default defineComponent({
  name: 'OrdersPage',
  setup() {
    const authStore = useAuthStore()
    const orders = ref<Order[]>([])
    const loading = ref(true)
    const expandedOrder = ref<number | null>(null)

    const fetchOrders = async () => {
      try {
        const token = authStore.getToken()
        const response = await axios.get(
          'http://localhost:8080/api/orders/' + authStore.getUser()?.id,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        orders.value = response.data
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString()
    }

    const toggleDetails = (orderId: number) => {
      expandedOrder.value = expandedOrder.value === orderId ? null : orderId
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      orders,
      loading,
      expandedOrder,
      toggleDetails,
      formatDate
    }
  }
})
</script>
