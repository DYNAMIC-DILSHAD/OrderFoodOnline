import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { ImagetoBase64 } from '../utility/imagetoBase64'
import { toast } from 'react-hot-toast';

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    description: ""

  });

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)
    setData((preve) => {
      return {
        ...preve,
        image: data
      }
    })
  }

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }

    })
    // console.log(data);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);

    const {name,image,category,price} = data;

    if(name && image && price && category) {

      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
  
      const result = await fetchData.json();
      // console.log(result);
      toast(result.message)
  
      setData(() => {
        return {
          name: "",
          image: "",
          price: "",
          category: "",
          description: ""
  
        }
      })
  
    }else {
      toast("Enter the required field")
    }


  }




  return (
    <div className='p-4 '>
      <form className='m-auto w-full max-w-md flex flex-col shadow p-3 bg-white' onSubmit={handleSubmit}>

        <label htmlFor='name'> Name </label>

        <input type={'text'} id='name' className='my-1 p-1 cursor-pointer bg-slate-200' name='name' value={data.name} onChange={handleInput} />

        <label htmlFor='category' > Cateogory</label>
        <select className='my-1 p-1 cursor-pointer bg-slate-200' id='category' name='category' value={data.category} onChange={handleInput}>
          <option value={'others'}>Select Category</option>
          <option value={'fruits'}>Fruits</option>
          <option value={'vegetables'}>Vegetables</option>
          <option value={'rice'}>Rice</option>
          <option value={'pizza'}>Pizza</option>
          <option value={'dosa'}>Dosa</option>
          <option value={'ice cream'}>Ice Cream</option>
          <option value={'cake'}>cake</option>
          <option value={'burger'}>burger</option>
          <option value={'sandwich'}>sandwich</option>
          <option value={'paneer'}>Paneer</option>
          
          

        </select>

        <label htmlFor='image'>Image
          <div className='h-40 w-full my-1 rounded bg-slate-200 flex justify-center items-center cursor-pointer'>

            {
              data.image ? <img src={data.image} className='h-full' alt='' /> :
                <span className='text-5xl'> <BsCloudUpload /></span>

            }

            <input type={'file'} accept='image/*' id='image' onChange={uploadImage} className='hidden' />
          </div>
        </label>

        <label htmlFor='price'>Price</label>
        <input type={'text'} className='my-1 p-1 cursor-pointer bg-slate-200' name='price' value={data.price} onChange={handleInput} />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} className='my-1 p-1 cursor-pointer bg-slate-200 resize-none' id='description' name='description' value={data.description} onChange={handleInput}></textarea>

        <button className='bg-red-500 hover:bg-red-600 my-2 p-1 cursor-pointer rounded text-white font-md drop-shadow'>save</button>



      </form>


    </div>
  )
}

export default NewProduct