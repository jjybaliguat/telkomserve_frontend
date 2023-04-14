import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedIndex: 0,
    selectedAreaIndex: -1,
    appllicantDetails: {},
    activeStep: 0,
}

const quicklinksActionSlice = createSlice({
    name: 'fiber',
    initialState,
    reducers: {
        setSelectedindex: (state, action) => {
            state.selectedIndex = action.payload
        },
        setApplicantDetails: (state, action) => {
            return {
                ...state,
                appllicantDetails: {...state.appllicantDetails, ...action.payload}
            }
        },
        setAcceptTerm : (state, action) => {
            state.appllicantDetails.acceptTerm = action.payload
        },
        setActiveStep : (state, action) => {
            state.activeStep = action.payload
        },
        setSelectedAreaIndex : (state, action) => {
            state.selectedAreaIndex = action.payload
        },
        resetApplicantDetails : (state, action) => {
            state.appllicantDetails = {}
            state.selectedAreaIndex = -1
        },
    }

})

export const {
    setSelectedindex,
    setApplicantDetails,
    resetApplicantDetails,
    setAcceptTerm,
    setActiveStep,
    setSelectedAreaIndex
} = quicklinksActionSlice.actions

export default quicklinksActionSlice.reducer