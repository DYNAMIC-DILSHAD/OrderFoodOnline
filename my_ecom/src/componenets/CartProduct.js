import React from 'react'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { decreaseQuantity, deletecartItem, increaseQuantity } from '../redux/productSlice'

const CartProduct = ({ id, name, image, price, category, qty, total }) => {
  const dispatch = useDispatch()
  

  return (
    <div className='p-1 bg-slate-200 flex rounded  border border-slate-300 '>

      <div className='p-2 rounded overflow-hidden flex '>
        <img src={image} alt='' className=' h-28 w-36 object-cover bg-white' />

      </div>
      <div className='flex flex-col p-2  w-full '>

        <div className='flex justify-between'>
          <h3 className='text-slate-600 font-semibold capitalize text-lg md:text-2xl '>{name}</h3>
          <span className='text-slate-700 hover:text-red-500' onClick={() => dispatch(deletecartItem(id))}> <AiFillDelete /></span>
        </div>

        <p className='text-slate-500 font-mediuml'>{category}</p>
        <p className=' font-bold text-base'><span className='text-red-500'>₹</span><span>{price}</span></p>

        <div className='flex gap-3 justify-between '>

          <div className='flex gap-3 '>
            <button onClick = {() => dispatch(decreaseQuantity(id))}  className='bg-slate-300  hover:bg-slate-400   rounded  mt-2'><BiMinus /></button>
            <p className='font-semibold'>{qty}</p>
            <button onClick={() => dispatch(increaseQuantity(id))} className='bg-slate-300  hover:bg-slate-400   rounded  mt-2'><BiPlus /></button>
          </div>

          <div className='flex text-slate-700 gap-1'>
            <p>Total:</p>
            <p><span className ='text-red-500'>₹</span>{total}</p>
          </div>

        </div>

      </div>



      <div className=''>

      </div>

    </div>
  )
}

export default CartProduct