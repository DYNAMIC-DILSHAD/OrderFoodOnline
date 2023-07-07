import React, { useState } from 'react'
// import slogan from '../assest/slogan.jpg'
import wholeFood from '../assest/wholeFood.png'
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsCartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user)
  // console.log(userData);
  const dispatch = useDispatch()


  const logoutUser = () => {
    dispatch(logoutRedux())
    toast('Logout Sucessfully')
  }


  const handleShowMenu = () => {
    setShowMenu(preve => !preve)
  }

  const cartItemNumber = useSelector((state => state.product.cartItem))


  // console.log(process.env.REACT_APP_ADMIN_LOGIN);
  return (

    <header className='fixed z-50 w-full h-16 px-2 shadow-md md:px-4 bg-white'>
      {/* Desktop */}

      <div className='flex items-center justify-between h-full  '>
        <Link to={""} >
          <div className='h-14 w-full '>
            <img src={wholeFood} className='h-full  ' alt="" />
          </div>
        </Link>

        <div className='flex items-center gap-4 md:gap-7'>

          <nav className='gap-4 text-base md:gap-6 md:text-lg hidden md:flex'>
            <Link to={""} >Home</Link>
            <Link to={"menu/648d94cbf7ffd9582a2d3f70"} >Menu</Link>
            <Link to={"about"} >About</Link>
            <Link to={"contact"} >Contact</Link>
          </nav>

          {/* logo for item numers */}
          <Link to={'cart'} >
            <div className='text-2xl text-slate-600 relative' >
              <BsCartFill />

              <div className='absolute bg-red-500 -top-1 -right-1 rounded-full h-4 w-4 text-white text-sm text-center' >
                {cartItemNumber.length}</div>
            </div>
          </Link>

          <div className='text-slate-600' onClick={handleShowMenu}>
            <div className='text-3xl  cursor-pointer h-8 w-8 drop-shadow-md rounded-full overflow-hidden'>

              {userData.image ? <img src={userData.image} alt='' className='w-full h-full' /> : <HiOutlineUserCircle />}

            </div>



            {
              showMenu && (<div className='absolute right-2 py-2 px-2 bg-white shadow drop-shadow-md cursor-pointer flex flex-col min-w-[100px] text-center'>
                {
                  userData.email === process.env.REACT_APP_ADMIN_LOGIN && (<Link to={'newProduct'} className='whitespace-nowrap'>New Product</Link>)
                }

                <nav className=' text-base  md:text-lg md:hidden  flex flex-col'>
                  <Link to={""} className='px-2 py-1'>Home</Link>
                  <Link to={"menu/648d94cbf7ffd9582a2d3f70"} className='px-2 py-1'>Menu</Link>
                  <Link to={"about"} className='px-2 py-1'>About</Link>
                  <Link to={"contact"} className='px-2 py-1'>Contact</Link>
                </nav>

                {
                  userData.email ? <p className='cursor-pointer hover:bg-red-600 text-center bg-red-500 text-white' onClick={logoutUser}>Logout ({userData.firstName})</p> : <Link to={'login'} className='whitespace-nowrap '>Login</Link>
                }

              </div>

              )
            }
          </div>

        </div>

      </div>


      {/* Mobile */}
    </header>




  )
}
export default Header;
