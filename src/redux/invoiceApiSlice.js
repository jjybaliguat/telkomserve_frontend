import { apiSlice } from '../lib/api/apiSlice'

export const invoiceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createinvoice: builder.mutation({
            query: credentials => ({
                url: '/invoice/',
                method: 'POST',
                body: {...credentials}
            })
        }),
        getallinvoice: builder.mutation({
            query: () => ({
                url: '/invoice/',
                method: 'GET',
            })
        }),
        gettotalcount: builder.mutation({
            query: () => ({
                url: '/invoice/invoices/count',
                method: 'GET',
            })
        }),
        getinvoice: builder.mutation({
            query: (id) => ({
                url: `/invoice/${id}`,
                method: 'GET',
            })
        }),
        updateinvoice: builder.mutation({
            query(data){
                const {id, ...body} = data
                return {
                    url: `/invoice/${id}`,
                    method: 'PATCH',
                    body: body
                }
            }
        }),
        deleteinvoice: builder.mutation({
            query: (id) => ({
                url: `/invoice/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useCreateinvoiceMutation,
    useGetallinvoiceMutation,
    useGettotalcountMutation,
    useGetinvoiceMutation,
    useUpdateinvoiceMutation,
    useDeleteinvoiceMutation,
} = invoiceApiSlice