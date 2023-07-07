import React, { useState } from 'react'
import loginSignupImage from '../assest/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link,useNavigate } from 'react-router-dom'
import {ImagetoBase64} from '../utility/imagetoBase64'
import {toast} from 'react-hot-toast'


const Signup = () => {
    const navigate = useNavigate();
    const [showHidePassword, setShowHidePassword] = useState(false);
    const [showHideConfirmPassword, setShowHideConfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : "",
        image : ""
    });
    // console.log(data)
    // console.log(process.env.REACT_APP_SERVER_DOMAIN )

    const handleOnChange = (e) =>{

        const{name,value} = e.target;
        setData((preve)=>{
           return {
            ...preve,
            [name] : value
            
           }
        })
    };
    const handleUploadProfileImage = async (e) => {
        // console.log(e.target.files[0])
        const data = await ImagetoBase64(e.target.files[0]);
        // console.log(data);

        setData((preve)=>{
            return {
                ...preve,
                image : data
            }
        })
    }


    const handleShowHidePassword = () => {
        setShowHidePassword(preve => !preve);
    }

    const handleShowHideConfirmPassword = () => {
        setShowHideConfirmPassword(preve => !preve);
    }
    const submitForm = async (e)=>{
        e.preventDefault()

        const{firstName,email,password,confirmPassword} = data;

        if(firstName && email && password && confirmPassword) {

            if(password === confirmPassword){
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
                    method : "POST",
                    headers : {
                        "content-type": "application/json"
                    },
                    body:JSON.stringify(data)
                })

                const datares = await fetchData.json()
                // console.log(datares)
                // alert(datares.message)
                toast(datares.message)
                if(datares.alert) {
                    navigate('/login')
                }
                
            } else {
                alert('password and Confirm Password are not same')
                // toast(datares.message)
            }
            
        } else {
            alert('Enter the required fields')
        }
    }

    return (
        <div className='p-3 rounded md:p-4'>
            <div className='flex flex-col w-full max-w-md p-4 m-auto bg-white'>
                {/* <h1 className='text-2xl text-center'>Signup</h1> */}
                <div className='relative w-20 h-20 m-auto overflow-hidden rounded-full shadow-md drop-shadow-md'>
                    <img src={data.image ? data.image : loginSignupImage} alt='' className='w-full h-full' />

                    <label htmlFor='profileImage'>
                        <div className='absolute bottom-0 w-full text-sm text-center h-1/3 bg-slate-400 bg-opacity-60'>
                            <p className='p-1 text-white cursor-pointer '>Upload</p>
                        </div>
                        <input type={'file'} id='profileImage' accept ='image/*'   className='hidden' onChange={handleUploadProfileImage} />


                    </label>
                </div>

                <form className='flex flex-col w-full py-3' onSubmit={submitForm}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type={'text'} id='firstName' name='firstName' 
                    className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300' 
                    value={data.firstName}
                    onChange={handleOnChange}/>

                    <label htmlFor='lastName'>Last Name</label>
                    <input type={'text'} id='lastName' name='lastName'
                     className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300'
                    value={data.lastName}
                    onChange={handleOnChange} />

                    <label htmlFor='email'>E-mail</label>
                    <input type={'email'} id='email' name='email' 
                    className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300'
                    value={data.email}
                    onChange={handleOnChange} />

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300 ' >

                        <input type={showHidePassword ? 'text' : 'password'} id='password' name='password' 
                        className='w-full outline-none bg-slate-200 ' 
                        value={data.password}
                        onChange={handleOnChange}/>
                        <span onClick={handleShowHidePassword} className='flex text-xl cursor-pointer'>{showHidePassword ? < BiHide /> : <BiShow />}</span>
                    </div>


                    <label htmlFor='confirmPassword'> Cnfirm Password</label>
                    <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300 ' >

                        <input type={showHideConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' 
                        className='w-full outline-none bg-slate-200 '
                        value={data.confirmPassword}
                        onChange={handleOnChange} />
                        <span onClick={handleShowHideConfirmPassword} className='flex text-xl cursor-pointer'>{showHideConfirmPassword ? < BiHide /> : <BiShow />}</span>
                    </div>

                    <button className='bg-red-600 rounded-full w-full max-w-[150px] m-auto hover:bg-red-700 text-white text-xl mt-4 font-medium py-1'>Signup</button>

                </form>

                <p className='mt-2 text-sm text-left'>Already have account ? {" "}
                <Link to={'/login'} className='underline text-sky-500'> Login</Link> </p>

            </div>
        </div>
    )
}

export default Signup