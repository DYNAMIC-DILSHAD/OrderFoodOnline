import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'


const initialState = {
    productList: [],
    cartItem: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,

    reducers: {
        setDataProduct: (state, action) => {

            state.productList = [...action.payload]
        },

        addCartItems: (state, action) => {
            // some(()={})   if the elemnet present in array then return 'true;  otherwise 'false'
            const flag = state.cartItem.some((item) => item._id === action.payload._id)
            const total = action.payload.price

            if (flag) toast('Alrady item added')
            else {
                toast('Item added successfully')
                state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total: total }]
            }

        },

        deletecartItem: (state, action) => {

            // here we are finding the index number of those product that we want to delete
            const index = state.cartItem.findIndex((item) => item._id === action.payload)
            // splice(start,deleteCount,item1,item2.....)
            //splice(start,deleteCount)
            state.cartItem.splice(index, 1)
            toast('One Item Removed')

        },
        increaseQuantity: (state, action) => {
            // here we are finding the index number of those product that we want to increase
            const index = state.cartItem.findIndex((item) => item._id === action.payload)
            let qty = state.cartItem[index].qty
            state.cartItem[index].qty = ++qty

            // for one item total price
            let total = state.cartItem[index].total - 0
            let allTotal = total + (state.cartItem[index].price - 0)

            state.cartItem[index].total = allTotal.toString()
        },

        decreaseQuantity: (state, action) => {
            // here we are finding the index number of those product that we want to increase
            const index = state.cartItem.findIndex((item) => item._id === action.payload)
            let qty = state.cartItem[index].qty
            if (qty > 1) {
                state.cartItem[index].qty = --qty

                //for one item total price after decreasing quantit
                let total = state.cartItem[index].total - 0
                let allTotal = total - (state.cartItem[index].price - 0)

                state.cartItem[index].total = allTotal.toString()
            }

        }
    }

})
export const { setDataProduct, addCartItems, deletecartItem, increaseQuantity, decreaseQuantity } = productSlice.actions

export default productSlice.reducer