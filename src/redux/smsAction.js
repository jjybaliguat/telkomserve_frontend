import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messages: []
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
        }
    }

})

export const {
    setMessages,
    addMessages
} = smsSlice.actions

export default smsSlice.reducer