import { apiSlice } from '../lib/api/apiSlice'

export const joborderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createjoborder: builder.mutation({
            query: credentials => ({
                url: '/job-order/',
                method: 'POST',
                body: {...credentials}
            })
        }),
        getalljoborder: builder.mutation({
            query: () => ({
                url: '/job-order/',
                method: 'GET',
            })
        }),
        getjoborderscount: builder.mutation({
            query: () => ({
                url: '/job-order/joborder/count',
                method: 'GET',
            })
        }),
        getjoborder: builder.mutation({
            query: (id) => ({
                url: `/job-order/${id}`,
                method: 'GET',
            })
        }),
        updatejoborder: builder.mutation({
            query(data){
                const {id, ...body} = data
                return {
                    url: `/job-order/${id}`,
                    method: 'PATCH',
                    body: body
                }
            }
        }),
        deletejoborder: builder.mutation({
            query: (id) => ({
                url: `/job-order/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useCreatejoborderMutation,
    useGetalljoborderMutation,
    useGetjoborderMutation,
    useGetjoborderscountMutation,
    useUpdatejoborderMutation,
    useDeletejoborderMutation
} = joborderApiSlice