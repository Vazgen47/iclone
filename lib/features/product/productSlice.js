import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Helper functions for localStorage
const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('iclone_products')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
        return []
      }
    }
  }
  return []
}

const saveToLocalStorage = (products) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('iclone_products', JSON.stringify(products))
      console.log('💾 Saved to localStorage:', products.length, 'products')
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
}

// Async thunk для загрузки продуктов с API
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetch('/api/products')
    const data = await response.json()
    return data
  }
)

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: loadFromLocalStorage(), // Initialize from localStorage
        loading: false,
        error: null
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
            saveToLocalStorage(state.list)
        },
        clearProduct: (state) => {
            state.list = []
            saveToLocalStorage(state.list)
        },
        addProduct: (state, action) => {
            state.list.push(action.payload)
            saveToLocalStorage(state.list)
        },
        updateProduct: (state, action) => {
            const index = state.list.findIndex(p => p.id === action.payload.id)
            if (index !== -1) {
                state.list[index] = action.payload
                saveToLocalStorage(state.list)
            }
        },
        deleteProduct: (state, action) => {
            state.list = state.list.filter(p => p.id !== action.payload)
            saveToLocalStorage(state.list)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
                saveToLocalStorage(state.list) // Also save when fetched from API
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { setProduct, clearProduct, addProduct, updateProduct, deleteProduct } = productSlice.actions

export default productSlice.reducer