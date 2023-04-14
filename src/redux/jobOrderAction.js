import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    jobOrders: [],
}

const jobOrderSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setJobOrder: (state, action) => {
            state.jobOrders = action.payload
        },
        addJobOrderAction: (state, action) => {
            state.jobOrders.push(action.payload)
        },
        deleteJobOrderAction: (state, action) => {
            const id = action.payload;
            state.jobOrders = state.jobOrders.filter(jobOrder => jobOrder._id !== id)
        },
        updateJobOrderAction: (state, action) => {
            return {
                ...state,
                jobOrders: state.jobOrders.map((jobOrder) => (jobOrder._id === action.payload._id ? action.payload : jobOrder))
            }
        },
    }

})

export const {
    setJobOrder,
    addJobOrderAction,
    deleteJobOrderAction,
    updateJobOrderAction
} = jobOrderSlice.actions

export default jobOrderSlice.reducer