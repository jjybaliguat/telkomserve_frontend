import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    employees: [],
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployeeAction: (state, action) => {
            state.employees = action.payload
        },
        addEmployeeAction: (state, action) => {
            state.employees.push(action.payload)
        },
        deleteEmployeeAction: (state, action) =>  {
            const {id} = action.payload
            state.employees = state.employees.filter(employee => employee._id != id)
        },
        updateEmployeeAction: (state, action) =>  {
            return {
                ...state,
                employees: state.employees.map((employee) => (employee._id === action.payload._id? action.payload : employee))
            }
        },
    }
})

export const {
    setEmployeeAction,
    addEmployeeAction,
    deleteEmployeeAction,
    updateEmployeeAction
} = employeeSlice.actions

export default employeeSlice.reducer