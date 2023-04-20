import { apiSlice } from '../lib/api/apiSlice'

export const smsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrivesms: builder.mutation({
            query: () => ({
                url: '/messages',
                method: 'GET',
            })
        }),
        retriveaccount: builder.mutation({
            query: () => ({
                url: '/messages/account',
                method: 'GET',
            })
        }),
        sendsms: builder.mutation({
            query: credentials => ({
                url: '/messages',
                method: 'POST',
                body: credentials,
            })
        }),
    })
})

export const {
    useRetrivesmsMutation,
    useSendsmsMutation,
    useRetriveaccountMutation,
} = smsApiSlice