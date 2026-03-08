import { createSlice } from '@reduxjs/toolkit'
import { getOrders, saveOrder } from '@/lib/storage'

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        list: getOrders(), // Initialize from localStorage
        loading: false,
        error: null
    },
    reducers: {
        addOrder: (state, action) => {
            const newOrders = saveOrder(action.payload)
            state.list = newOrders
        },
        clearOrders: (state) => {
            state.list = []
            localStorage.removeItem('iclone_orders')
        },
        setOrders: (state, action) => {
            state.list = action.payload
        }
    }
})

export const { addOrder, clearOrders, setOrders } = ordersSlice.actions

export default ordersSlice.reducer
