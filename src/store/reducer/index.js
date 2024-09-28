import { createSlice } from '@reduxjs/toolkit'

export const customerSlice = createSlice({
    name:'customerID',
    initialState: {
        value: null
    },

    reducers:{
        setCustomerID: (state, action) =>{
            state.value = action.payload
        },
    }

})

export const { setCustomerID} = customerSlice.actions

export default customerSlice.reducer