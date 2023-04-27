import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../redux/authSlice'
import clientReducer from '../redux/clientSlice'
import invoiceReducer from '../redux/invoiceAction'
import applicantReducer from '../redux/applicantSlice'
import employeeReducer from '../redux/employeesAction'
import quicklinkReducer from '../redux/landing/quicklinksAction'
import jobOrderReducer from '../redux/jobOrderAction'
import smsReducer from '../redux/smsAction'
import storage from "redux-persist/lib/storage"
import { persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const reducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    clients: clientReducer,
    applicants: applicantReducer,
    invoice: invoiceReducer,
    employees: employeeReducer,
    fiber: quicklinkReducer,
    joborders: jobOrderReducer,
    messages: smsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            // serializableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              },
            immutableCheck: false
        }).concat(apiSlice.middleware),
    devTools: true
})