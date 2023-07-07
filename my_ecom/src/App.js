// import logo from './logo.svg';
// import './App.css';
import React, { useEffect } from 'react';
import  Header  from './componenets/Header';
import { Outlet } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import { useDispatch} from 'react-redux';
import { setDataProduct } from './redux/productSlice';

function App() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    // IIFE
    (async ()=>{

      const productData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/productData`)
      const resData = await productData.json()
      dispatch(setDataProduct(resData))

    })();
    // eslint-disable-next-line
  },[])
  
  return (
    <>
      <Toaster />
      <div className=''>
      <Header/>

        <main className='pt-16 bg-slate-100 h-screen'>
          <Outlet />
        </main>

      </div>
    </>
  );
}

export default App;
