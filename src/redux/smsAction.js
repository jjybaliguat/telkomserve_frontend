import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messages: [],
    credit_balance: 0
}

const smsSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        addMessages: (state, action) => {
            state.messages.push(action.payload)
        },
        setCreditBalance: (state, action) => {
            state.credit_balance = action.payload
        }
    }

})

export const {
    setMessages,
    addMessages,
    setCreditBalance
} = smsSlice.actions

export default smsSlice.reducer