import {configureStore} from '@reduxjs/toolkit'
import userSliceReducer from './userSlice'
import productSliceReducer from './productSlice'

const reducer = {
    user : userSliceReducer,
    product : productSliceReducer
}

const store = configureStore({
    reducer,
})
export default store

