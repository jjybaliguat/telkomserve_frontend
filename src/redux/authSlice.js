import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    logged_in: false,
    applicants: [],
    sort: null,
    pagelimit: 25,
}

const authSlice = createSlice({
    name:'auth',

    initialState,
    reducers: {
        setUserAction: (state, action) => {
            const {token, user} = action.payload
            state.token = token
            state.user = user
        },
        logOut: (state, action) => {
            state.user = null
            state.token =  null
            state.logged_in = false
            state.applicants = []
            state.sort = null
            state.pagelimit = 25
        },
        setLoggedIn: (state, action) => {
            const {logged_in} = action.payload
            state.logged_in = logged_in
        },
        updateUserAction: (state, action) => {
            const {user} = action.payload
            state.user = user
        },
        setClientsAction: (state, action) => {
            state.clients = action.payload
        },
        setApplicantsAction: (state, action) => {
            state.applicants = action.payload
        },
        setSort: (state, action) => {
            state.sort = action.payload
        },
        setPageLimit: (state, action) => {
            state.pagelimit = action.payload
        },
    },
})

export const { 
    setUserAction, 
    logOut,
    setLoggedIn,
    isLoggedIn, 
    setClientsAction,
    updateUserAction,
    setApplicantsAction,
    setSort,
    setPageLimit,
} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const getLoginStatus = (state) => state.auth.logged_in
export const selectCurrentToken = (state) => state.auth.token
export const getFetchedClients = (state) => state.auth.clients
export const getFetchedApplicants = (state) => state.auth.applicants
export const getSortName = (state) => state.auth.sort
export const getPageLimit = (state) => state.auth.pagelimit
