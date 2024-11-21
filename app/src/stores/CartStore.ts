import { defineStore } from 'pinia'

export interface Product {
  id: string
  name: string
  price: number
  description: string
}

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[]
  }),
  getters: {
    totalQuantity: (state): number =>
      state.cartItems.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state): number =>
      state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
  },
  actions: {
    addToCart(product: Product): void {
      const existingItem = this.cartItems.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId: string): void {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId)
    },
    updateQuantity(productId: string, quantity: number): void {
      if (quantity <= 0) {
        this.removeFromCart(productId) // Remove if quantity is zero or less
        return
      }
      const item = this.cartItems.find((item) => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    async checkoutAsGuest(data: { email: string; shippingAddress: string }) {
      // Call API for guest checkout
      return await fetch('/api/orders/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, items: this.cartItems })
      })
    },
    async checkoutAsAuthenticated(data: { shippingAddress: string }) {
      // Call API for authenticated checkout
      return await fetch('/api/orders/authenticated', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...data, items: this.cartItems })
      })
    }
  }
})
