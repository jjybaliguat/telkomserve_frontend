import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    invoices: [],
    pagelimit: 10,
    filter: null
}

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoiceAction: (state, action) => {
            state.invoices = action.payload
        },
        addInvoiceAction: (state, action) => {
            state.invoices.push(action.payload)
        },
        deleteInvoiceAction: (state, action) => {
            const id = action.payload;
            state.invoices = state.invoices.filter((invoice)=>invoice._id !== id)
        },
        updateInvoiceAction: (state, action) => {
            return {
                ...state,
                invoices: state.invoices.map((invoice) => (invoice._id === action.payload._id ? action.payload : invoice))
            }
        },
        setPageLimit: (state, action) => {
            state.pagelimit = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
    }

})

export const {
    setInvoiceAction,
    addInvoiceAction,
    deleteInvoiceAction,
    setPageLimit,
    updateInvoiceAction,
    setSort,
    setFilter,
} = invoiceSlice.actions

export default invoiceSlice.reducer