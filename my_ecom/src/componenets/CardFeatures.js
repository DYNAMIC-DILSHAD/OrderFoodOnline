import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCartItems } from '../redux/productSlice'

const CardFeatures = ({ name, image, price, category, loadingArray,id }) => {

    const dispatch = useDispatch()

    const handleAddCartPoduct  = (e)=>{
        dispatch(addCartItems({
            _id : id,
            name : name,
            image : image,
            price : price,
            category : category
        }))
        // alert('hi its a cartItem')
    }
    return (
        <div className='w-full  min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg px-4 py-5 flex flex-col cursor-pointer'>
            {
                name ? <>
                    <Link to={`/menu/${id}`} onClick= {()=> window.scrollTo({top:'0',behavior:'smooth'})}>
                        <div className='flex flex-col items-center justify-center h-28'>
                            <img src={image} alt='' className='h-full' />
                        </div>

                        <h3 className='mt-4 overflow-hidden text-lg font-semibold capitalize text-slate-600 whitespace-nowrap'>{name}</h3>
                        <p className='font-medium text-slate-500 '>{category}</p>
                        <p className='font-bold '><span className='text-red-500'>₹</span><span>{price}</span></p>
                    </Link>

                    <div className='mt-1 text-center bg-yellow-500 rounded hover:bg-yellow-600'>
                        <button className='' onClick={handleAddCartPoduct}>Add Cart</button>
                    </div>
                </>
                    :
                    <div className='min-h-[200px] flex justify-center items-center'>
                        <p>{loadingArray}</p>
                    </div>
            }

        </div>
    )
}
export default CardFeatures