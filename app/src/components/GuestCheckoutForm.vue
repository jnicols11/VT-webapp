<template>
  <form @submit.prevent="submitOrder">
    <div class="mb-4">
      <label for="email" class="block font-medium">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        class="input"
        placeholder="Enter your email"
        required
      />
    </div>
    <div class="mb-4">
      <label for="shippingAddress" class="block font-medium">Shipping Address</label>
      <textarea
        id="shippingAddress"
        v-model="shippingAddress"
        class="input"
        placeholder="Enter your shipping address"
        required
      ></textarea>
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
    const email = ref('')
    const shippingAddress = ref('')

    const submitOrder = async () => {
      try {
        await cartStore.checkoutAsGuest({
          email: email.value,
          shippingAddress: shippingAddress.value
        })
        alert('Order completed successfully!')
      } catch (error) {
        alert('Error completing order')
      }
    }

    return {
      email,
      shippingAddress,
      submitOrder
    }
  }
})
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn-primary {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
