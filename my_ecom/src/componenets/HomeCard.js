import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({ image, name, price, category, loading ,id}) => {
  return (

    <div className='bg-white shadow-md rounded p-2 min-w-[150px]'>

      {
        name ? <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: '0', behavior: 'smooth' })}>
           <div className='w-40 min-h-[150px]' >
              <img src={image} alt='' className='h-full w-full ' />
            </div>

            <h1 className='text-center text-slate-600 font-semibold capitalize text-lg'>{name}</h1>
            <p className='text-slate-500 font-medium text-center'>{category}</p>
           <p className='text-center font-bold'><span className='text-red-500'>₹</span><span>{price}</span></p>
          </Link>

        </>
        :
        <div className='flex justify-center items-center h-full'>
  <p>{loading}</p>
        </div>
      }

    </div >
  )
}

export default HomeCard
