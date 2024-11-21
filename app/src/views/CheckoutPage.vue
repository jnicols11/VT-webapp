<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Checkout</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Column: User Info -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Billing & Shipping Info</h2>
        <form @submit.prevent="proceedToPayment" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-medium mb-1">First Name</label>
              <input
                v-model="form.firstName"
                type="text"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label class="block font-medium mb-1">Last Name</label>
              <input
                v-model="form.lastName"
                type="text"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
          </div>
          <label class="block font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full border rounded-lg p-2" required />

          <label class="block font-medium mb-1">Address</label>
          <input v-model="form.address" type="text" class="w-full border rounded-lg p-2" required />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block font-medium mb-1">City</label>
              <input
                v-model="form.city"
                type="text"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label class="block font-medium mb-1">State</label>
              <input
                v-model="form.state"
                type="text"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label class="block font-medium mb-1">Zip Code</label>
              <input
                v-model="form.zipCode"
                type="text"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      <!-- Right Column: Order Summary -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
        <div class="bg-gray-100 p-4 rounded-lg">
          <div v-for="item in cartItems" :key="item.id" class="flex justify-between mb-4">
            <div>
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
            <p class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Tax (10%):</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping:</span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between mt-4 border-t pt-4 font-bold text-lg">
            <span>Total:</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stripe Payment Form -->
    <div v-if="showPaymentForm" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Payment</h2>
      <div id="stripe-card-element" class="border p-4 rounded-lg bg-gray-50"></div>
      <button
        @click="submitPayment"
        class="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        Pay ${{ total.toFixed(2) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useCartStore } from '@/stores/CartStore'
import type { Stripe } from '@stripe/stripe-js'
import type { StripeCardElement } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'

export default defineComponent({
  setup() {
    const cartStore = useCartStore()
    const stripe = ref<Stripe | null>(null)
    const cardElement = ref<StripeCardElement | null>(null)
    const showPaymentForm = ref(false)

    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    })

    const cartItems = computed(() => cartStore.cartItems)
    const subtotal = computed(() =>
      cartItems.value.reduce(
        (sum: number, item: { price: number; quantity: number }) =>
          sum + item.price * item.quantity,
        0
      )
    )
    const tax = computed(() => subtotal.value * 0.1) // Assuming 10% tax rate
    const shipping = computed(() => (subtotal.value > 0 ? 5.99 : 0)) // Flat shipping fee
    const total = computed(() => subtotal.value + tax.value + shipping.value)

    const proceedToPayment = async () => {
      if (!stripe.value) {
        stripe.value = await loadStripe(
          'pk_test_51QNQU9GWO6KtYpeVOISSwcUEnjvbASraNoMHYlLkmko1t4BFa3yXu5RkVsWU9xepiok1J1VwuKAjUDqWHfbQ6SBS00pnXLbKAQ'
        )
        const elements = stripe.value!.elements()
        cardElement.value = elements.create('card')
        cardElement.value.mount('#stripe-card-element')
      }
      showPaymentForm.value = true
    }

    const submitPayment = async () => {
      if (!stripe.value || !cardElement.value) return

      const { token, error } = await stripe.value.createToken(cardElement.value, {
        name: `${form.value.firstName} ${form.value.lastName}`,
        address_line1: form.value.address,
        address_city: form.value.city,
        address_state: form.value.state,
        address_zip: form.value.zipCode
      })

      if (error) {
        alert(error.message)
        return
      }

      // Send token to your backend
      console.log('Stripe Token:', token)
      alert('Payment successful!')
    }

    return {
      form,
      cartItems,
      subtotal,
      tax,
      shipping,
      total,
      proceedToPayment,
      submitPayment,
      showPaymentForm
    }
  }
})
</script>
