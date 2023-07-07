import React from 'react'
import { useState } from 'react';
import loginSignupImage from '../assest/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice';


const Login = () => {
    const [showHidePassword, setShowHidePassword] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    // console.log(data)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnChange = (e) => {

        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value

            }
        })
    };


    const handleShowHidePassword = () => {
        setShowHidePassword(preve => !preve);
    }


    const submitForm = async (e) => {
        e.preventDefault()

        const { email, password } = data;

        if (email && password) {
            const result = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const resData = await result.json();
           

            if (resData.alert) {

                toast(resData.message)
                setTimeout(() => {
                    navigate('/')
                }, 1000)
                dispatch(loginRedux(resData))
                // localStorage.setItem('user',JSON.stringify(resData.data))

            } else {
                toast(resData.message)
                
            }

        } else {
            alert('please fill the required fields')
        }
    }

    return (
        <div className='p-3 md:p-4 rounded'>
            <div className='w-full max-w-md bg-white m-auto flex flex-col  p-4'>
                {/* <h1 className='text-center text-2xl'>Signup</h1> */}
                <div className='w-20 overflow-hidden m-auto shadow-md drop-shadow-md rounded-full'>
                    <img src={loginSignupImage} alt='' className='w-full ' />
                </div>

                <form className='py-3 w-full flex flex-col' onSubmit={submitForm}>

                    <label htmlFor='email'>E-mail</label>
                    
                    <input type={'email'} id='email' name='email'
                        className='w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.email}
                        onChange={handleOnChange} />
                    

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 rounded ' >

                        <input type={showHidePassword ? 'text' : 'password'} id='password' name='password'
                            className='w-full  bg-slate-200 outline-none '
                            value={data.password}
                            onChange={handleOnChange} />
                        <span onClick={handleShowHidePassword} className='flex text-xl cursor-pointer'>{showHidePassword ? < BiHide /> : <BiShow />}</span>
                    </div>

                    <button className='bg-red-600 rounded-full w-full max-w-[150px] m-auto hover:bg-red-700 text-white text-xl mt-4 font-medium py-1'>Submit</button>

                </form>

                <p className='text-left text-sm mt-2'>don't have account ?{" "}
                    <Link to={'/signup'} className='underline text-sky-500'> Signup</Link> </p>

            </div>
        </div>
    )
}

export default Login