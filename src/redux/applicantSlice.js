import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    applicants: [],
    count: null
}

const applicantSlice = createSlice({
    name:'applicants',
    initialState,
    reducers: {
        setApplicantsAction: (state, action) => {
            return {
                ...state,
                applicants: action.payload,
                count: action.payload?.length
            }
        },
        deleteAppplicantAction: (state, action) => {
            const { id } = action.payload;
            state.clients.splice(id, 1);
        },
    },
})

export const { 
    setApplicantsAction,
    deleteAppplicantAction,
} = applicantSlice.actions

export default applicantSlice.reducer
