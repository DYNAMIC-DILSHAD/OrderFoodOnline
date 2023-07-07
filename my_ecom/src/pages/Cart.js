import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../componenets/CartProduct'
import emptyCart from '../assest/emptyCart.gif'
import { toast } from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

  const productCartitem = useSelector(state => state.product.cartItem)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const totalQty = productCartitem.reduce((accum, curr) => accum + parseInt(curr.qty), 0)
  const totalPrice = productCartitem.reduce((accum, curr) => accum + parseInt(curr.total), 0)

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
      const result = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`, {

        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(productCartitem)

      })

      if (result.statusCode === 500) return;
      const data = await result.json()
      // console.log(data)
      toast("Redirect to payment Gateway...!")
      stripePromise.redirectToCheckout({ sessionId: data })
      
    } else {
      toast("You are not login")

      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }

  }

  return (
    <>
      <div className='p-2 md:4 bg-slate-100 '>
        <h2 className='text-lg font-medium md:2xl text-slate-600'>Your Cart Items</h2>
        {productCartitem[0] ?
          <div className='gap-5 my-4 md:flex'>
            {/* left side :- display cart items*/}
            <div className='w-full max-w-3xl '>
              {
                productCartitem.map((item, i) => {
                  return (
                    <CartProduct key={item._id + i}
                      id={item._id}
                      image={item.image}
                      price={item.price}
                      name={item.name}
                      category={item.category}
                      qty={item.qty}
                      total={item.total}

                    />
                  )
                })
              }
            </div>

            {/* right side :- total cart items */}
            <div className='w-full max-w-md my-3 ml-auto'>
              <h1 className='p-2 text-lg text-center text-white bg-blue-500 rounded ' >Summary</h1>

              <div className='flex w-full py-2 text-lg border-b'>
                <p>TotalQty</p>
                <p className='w-32 ml-auto font-bold'>{totalQty}</p>
              </div>

              <div className='flex w-full py-2 text-lg border-b'>
                <p>TotalPrice</p>
                <p className='w-32 ml-auto font-bold'><span className='text-red-500'>₹</span>{totalPrice}</p>
              </div>

              <button className='w-full p-2 text-lg text-white bg-red-500 rounded' onClick={handlePayment}>Payment</button>
            </div>

          </div>
          :
          <>
            <div className='flex flex-col items-center justify-center w-full '>
              <img className='w-full max-w-sm rounded' src={emptyCart} alt='' />
              <p className='text-3xl font-bold text-slate-500'>Empty</p>
            </div>
          </>
        }

      </div>
    </>
  )
}

export default Cart