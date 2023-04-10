import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    clients: [],
    singleClient: [],
    count: null
}

const clientSlice = createSlice({
    name:'clients',
    initialState,
    reducers: {
        setClientsAction: (state, action) => {
            state.clients = action.payload
            state.count = action.payload?.length
        },
        addClientAction: (state, action) => {
            state.clients.push(action.payload)
            state.count++
        },
        updateClientAction: (state, action) => {
            return {
                ...state,
                clients: state.clients.map((client) => (client._id === action.payload._id ? action.payload : client))
            }
        },
        setSingleClient: (state, action) => {
            state.singleClient = action.payload
        },
        deleteClientAction: (state, action) => {
            const { id } = action.payload;
            state.clients = state.clients.filter(client => client._id !== id)
            state.count--
        },
    },
})

export const { 
    setClientsAction,
    addClientAction,
    deleteClientAction,
    setSingleClient,
    updateClientAction
} = clientSlice.actions

export default clientSlice.reducer
