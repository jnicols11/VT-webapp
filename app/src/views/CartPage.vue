<template>
  <div class="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-12">
    <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
    <div v-if="cartItems.length === 0" class="text-gray-500">Your cart is empty.</div>
    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between mb-4 border-b pb-2"
      >
        <div>
          <h3 class="text-lg font-medium">{{ item.name }}</h3>
          <p class="text-sm text-gray-500">{{ item.description }}</p>
          <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
        </div>
        <div class="text-right">
          <p class="text-lg font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</p>
          <button @click="removeFromCart(item.id)" class="text-red-500 text-sm hover:underline">
            Remove
          </button>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Tax (10%):</span>
          <span class="font-medium">${{ tax.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Shipping:</span>
          <span class="font-medium">${{ shipping.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mt-4 border-t pt-4">
          <span class="font-bold text-lg">Total:</span>
          <span class="font-bold text-lg">${{ total.toFixed(2) }}</span>
        </div>
        <button
          @click="proceedToCheckout"
          class="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useCartStore } from '@/stores/CartStore'
import router from '@/router'

export default defineComponent({
  setup() {
    const cartStore = useCartStore()

    const cartItems = computed(() => cartStore.cartItems)

    const subtotal = computed(() =>
      cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const tax = computed(() => subtotal.value * 0.1) // Assuming 10% tax rate
    const shipping = computed(() => (subtotal.value > 0 ? 5.99 : 0)) // Flat shipping fee
    const total = computed(() => subtotal.value + tax.value + shipping.value)

    const removeFromCart = (productId: string) => {
      cartStore.removeFromCart(productId)
    }

    const proceedToCheckout = () => {
      if (cartItems.value.length === 0) {
        alert('Your cart is empty!')
        return
      }
      alert(`Proceeding to checkout. Total: $${total.value.toFixed(2)}`)
      // Navigate to checkout page
      router.push('/checkout')
    }

    return {
      cartItems,
      subtotal,
      tax,
      shipping,
      total,
      removeFromCart,
      proceedToCheckout
    }
  }
})
</script>
