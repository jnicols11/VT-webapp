<template>
  <form @submit.prevent="submitOrder">
    <div class="mb-4">
      <label for="shippingAddress" class="block font-medium">Shipping Address</label>
      <textarea id="shippingAddress" v-model="shippingAddress" class="input" required></textarea>
    </div>
    <button type="submit" class="btn-primary w-full">Complete Order</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCartStore } from '@/stores/CartStore'

export default defineComponent({
  setup() {
    const cartStore = useCartStore()
    const shippingAddress = ref('')

    const submitOrder = async () => {
      try {
        await cartStore.checkoutAsAuthenticated({ shippingAddress: shippingAddress.value })
        alert('Order completed successfully!')
      } catch (error) {
        alert('Error completing order')
      }
    }

    return {
      shippingAddress,
      submitOrder
    }
  }
})
</script>
