import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/CartStore'

describe('Cart Store', () => {
  let cartStore: ReturnType<typeof useCartStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    cartStore = useCartStore()
  })

  it('should have default state', () => {
    expect(cartStore.cartItems).toEqual([])
    expect(cartStore.totalQuantity).toBe(0)
    expect(cartStore.totalPrice).toBe(0)
  })

  it('should add a product to the cart', () => {
    const product = { id: '1', name: 'Test Product', price: 10, description: 'A test product' }

    cartStore.addToCart(product)

    expect(cartStore.cartItems.length).toBe(1)
    expect(cartStore.cartItems[0].quantity).toBe(1)
    expect(cartStore.totalQuantity).toBe(1)
    expect(cartStore.totalPrice).toBe(10)
  })

  it('should increase quantity if product is already in the cart', () => {
    const product = { id: '1', name: 'Test Product', price: 10, description: 'A test product' }

    cartStore.addToCart(product)
    cartStore.addToCart(product)

    expect(cartStore.cartItems.length).toBe(1)
    expect(cartStore.cartItems[0].quantity).toBe(2)
    expect(cartStore.totalQuantity).toBe(2)
    expect(cartStore.totalPrice).toBe(20)
  })

  it('should remove a product from the cart', () => {
    const product = { id: '1', name: 'Test Product', price: 10, description: 'A test product' }

    cartStore.addToCart(product)
    cartStore.removeFromCart('1')

    expect(cartStore.cartItems.length).toBe(0)
    expect(cartStore.totalQuantity).toBe(0)
    expect(cartStore.totalPrice).toBe(0)
  })

  it('should update quantity of a cart item', () => {
    const product = { id: '1', name: 'Test Product', price: 10, description: 'A test product' }

    cartStore.addToCart(product)
    cartStore.updateQuantity('1', 5)

    expect(cartStore.cartItems[0].quantity).toBe(5)
    expect(cartStore.totalQuantity).toBe(5)
    expect(cartStore.totalPrice).toBe(50)
  })

  it('should remove item when quantity is set to zero', () => {
    const product = { id: '1', name: 'Test Product', price: 10, description: 'A test product' }

    cartStore.addToCart(product)
    cartStore.updateQuantity('1', 0)

    expect(cartStore.cartItems.length).toBe(0)
    expect(cartStore.totalQuantity).toBe(0)
    expect(cartStore.totalPrice).toBe(0)
  })

  it('should not update quantity for non-existing product', () => {
    cartStore.updateQuantity('99', 5)

    expect(cartStore.cartItems.length).toBe(0)
  })
})
