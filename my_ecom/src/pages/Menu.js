import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../componenets/AllProduct'
import { addCartItems } from '../redux/productSlice'

const Menu = () => {

    const { filterby } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productData = useSelector(state => state.product.productList)
    const productDisplay = productData.filter(item => item._id === filterby)[0]


    const handleAddCartPoduct = () => {
        dispatch(addCartItems(productDisplay))

    }

    const handleBuy = () => {
        dispatch(addCartItems(productDisplay))
        navigate('/cart')
    }


    return (
        <div className='p-3 md:p-4 bg-slate-100'>

            <div className='w-full max-w-3xl md:min-h-[335px] bg-white m-auto md:flex rounded drop-shadow'>

                {/* for image part */}
                {productDisplay.image &&
                    <>
                        <div className='max-w-[300px] p-5 w-full overflow-hidden '>
                            <img src={productDisplay.image} alt='' className="hover:scale-105 transition-all h-full " />
                        </div>

                        {/* for text part */}
                        <div className='flex flex-col gap-1 md:p-5 p-2 '>

                            <h1 className=' text-slate-600 font-semibold capitalize text-lg md:text-4xl'>{productDisplay.name}</h1>
                            <p className='text-slate-500 font-medium md:2xl'>{productDisplay.category}</p>
                            <p className=' font-bold md:text-2xl'><span className='text-red-500'>₹</span><span>{productDisplay.price}</span></p>

                            <div className='flex gap-3'>
                                <button onClick={handleBuy} className='bg-yellow-400  hover:bg-yellow-5 00 text-center  rounded  min-w-[100px]'>Buy Item </button>
                                <button className='bg-yellow-400  hover:bg-yellow-5 00 text-center  rounded  min-w-[100px]' onClick={handleAddCartPoduct}>Add Cart</button>
                            </div>

                            <div className=''>
                                <p className='text-slate-600 font-medium'>Description :-</p>
                                <p>{productDisplay.description}</p>
                            </div>

                        </div>
                    </>
                }
            </div>
            <AllProduct heading={"Your Product"} />


        </div>
    )
}

export default Menu
