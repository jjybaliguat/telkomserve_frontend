import { apiSlice } from '../lib/api/apiSlice'
import { logOut } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/admin/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/admin/logout',
                method: 'GET',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(logOut())
                    setTimeout(() =>  {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (error) {
                    
                }
            }
        }),
        loginstatus: builder.mutation({
            query: () => ({
                url: '/admin/loggedin',
                method: 'GET',
            })
        }),
        getadmin: builder.mutation({
            query: () => ({
                url: '/admin/getadmin',
                method: 'GET',
            })
        }),
        registeradmin: builder.mutation({
            query: credentials => ({
                url: '/admin/create',
                method: 'POST',
                body: {...credentials}
            })
        }),
        updateadmin: builder.mutation({
            query: credentials => ({
                url: '/admin/updateadmin',
                method: 'PATCH',
                body: {...credentials}
            })
        }),
        deleteadminccount: builder.mutation({
            query: () => ({
                url: '/admin/:id',
                method: 'DELETE',
            })
        }),
        getallclients: builder.mutation({
            query: () => ({
                url: '/client/getclients',
                method: 'GET',
            }),
        }),
        getallapplicants: builder.mutation({
            query: () => ({
                url: '/client/getapplicants',
                method: 'GET',
            })
        }),
        getsingleclients: builder.mutation({
            query: (id) => ({
                url: `/client/getclients/${id}`,
                method: 'GET',
            }),
        }),
        // updateclientPhoto: builder.mutation({
        //     query(data){
        //         const {id, ...photo} = data
        //         return {
        //             url: `/client/updatePhoto/${id}`,
        //             method: 'PATCH',
        //             body: photo
        //         }
        //     }
        // }),
        updateclient: builder.mutation({
            query(data){
                const {id, ...body} = data
                return {
                    url: `/client/${id}`,
                    method: 'PATCH',
                    body: body
                }
            }
        }),
        deleteclient: builder.mutation({
            query: (id) => ({
                url: `/client/${id}`,
                method: 'DELETE',
            })
        }),
        registerclient: builder.mutation({
            query: credentials => ({
                url: '/client/register',
                method: 'POST',
                body: {...credentials}
            })
        }),
    })
})

export const {
    useLoginMutation,
    useLoginstatusMutation,
    useLogoutMutation,
    useRegisteradminMutation,
    useUpdateadminMutation,
    useDeleteadminccountMutation,
    useGetallclientsMutation,
    useGetallapplicantsMutation,
    useGetsingleclientsMutation,
    useDeleteclientMutation,
    useRegisterclientMutation,
    useUpdateclientMutation,
    useGetadminMutation,
    useUpdateclientPhotoMutation
} = authApiSlice