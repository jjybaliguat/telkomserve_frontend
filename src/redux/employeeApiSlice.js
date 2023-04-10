import { apiSlice } from '../lib/api/apiSlice'

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createemployee: builder.mutation({
            query: credentials => ({
                url: '/admin/create',
                method: 'POST',
                body: {...credentials}
            })
        }),
        getallemployee: builder.mutation({
            query: () => ({
                url: '/admin/getalladmin',
                method: 'GET',
            })
        }),
        getemployee: builder.mutation({
            query: (id) => ({
                url: `/admin/getadmin/${id}`,
                method: 'GET',
            })
        }),
        updateemployee: builder.mutation({
            query(data){
                const {id, ...body} = data
                return {
                    url: `/admin/updateadmin/${id}`,
                    method: 'PATCH',
                    body: body
                }
            }
        }),
        deleteemployee: builder.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useCreateemployeeMutation,
    useDeleteemployeeMutation,
    useGetallemployeeMutation,
    useGetemployeeMutation,
    useUpdateemployeeMutation,
} = employeeApiSlice