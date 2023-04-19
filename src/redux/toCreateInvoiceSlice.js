import { apiSlice } from '../lib/api/apiSlice'

export const toCreteInvoiceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchall: builder.mutation({
            query: credentials => ({
                url: '/to-create-invoice/',
                method: 'GET',
            })
        }),
        deleteone: builder.mutation({
            query: (id) => ({
                url: `/to-create-invoice/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useFetchallMutation,
    useDeleteoneMutation
} = toCreteInvoiceApiSlice