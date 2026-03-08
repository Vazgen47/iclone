import { createSlice } from '@reduxjs/toolkit'
import { getAddresses, saveAddress } from '@/lib/storage'

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        list: getAddresses(), // Initialize from localStorage
    },
    reducers: {
        addAddress: (state, action) => {
            const newAddress = saveAddress(action.payload)
            state.list = newAddress
        },
    }
})

export const { addAddress } = addressSlice.actions

export default addressSlice.reducer