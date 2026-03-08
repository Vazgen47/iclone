import { createSlice } from '@reduxjs/toolkit'

// Helper functions for localStorage
const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('iclone_cart')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Error parsing cart localStorage:', error)
        return { total: 0, cartItems: {} }
      }
    }
  }
  return { total: 0, cartItems: {} }
}

const saveToLocalStorage = (cart) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('iclone_cart', JSON.stringify(cart))
      console.log('💾 Saved cart to localStorage:', cart.total, 'items')
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadFromLocalStorage(), // Initialize from localStorage
    reducers: {
        addToCart: (state, action) => {
            const { productId } = action.payload
            if (state.cartItems[productId]) {
                state.cartItems[productId]++
            } else {
                state.cartItems[productId] = 1
            }
            state.total += 1
            saveToLocalStorage(state)
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload
            if (state.cartItems[productId]) {
                state.cartItems[productId]--
                if (state.cartItems[productId] === 0) {
                    delete state.cartItems[productId]
                }
            }
            state.total -= 1
            saveToLocalStorage(state)
        },
        deleteItemFromCart: (state, action) => {
            const { productId } = action.payload
            state.total -= state.cartItems[productId] ? state.cartItems[productId] : 0
            delete state.cartItems[productId]
            saveToLocalStorage(state)
        },
        clearCart: (state) => {
            state.cartItems = {}
            state.total = 0
            saveToLocalStorage(state)
        },
    }
})

export const { addToCart, removeFromCart, clearCart, deleteItemFromCart } = cartSlice.actions

export default cartSlice.reducer
