import React, {useRef } from 'react'
import HomeCard from '../componenets/HomeCard'
// import { useSelector } from 'react-redux'
import CardFeatures from '../componenets/CardFeatures'
import { GrPrevious, GrNext } from 'react-icons/gr'

// import FilterProduct from '../componenets/FilterProduct'
import { useSelector } from 'react-redux'
import AllProduct from '../componenets/AllProduct'

const Home = () => {

  const productData = useSelector((state) => (state.product.productList))
  // console.log(productData)
  const homeProductList = productData.slice(2, 6)

  const homeProductListVegetables = productData.filter((item) => {
    return item.category === 'vegetables'
  }, [])

  // console.log(homeProductListVegetables)

  const loading = new Array(4).fill(null);
  const loadingArray = new Array(10).fill(null);

  const slideProductRef = useRef()

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  }

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  }

  // its important line which is below because here we find tha all category types with the help of spread operators

  // const categoryList = [... new Set(productData.map(items => items.category))]
  // console.log(categoryList)
  // const finalCategoryList = categoryList.slice(0,9);


  // const [dataFilter, setDataFilter] = useState([])

  // useEffect(() => {
  //   setDataFilter(productData)
  // }, [productData])

  // // console.log(data);

  // const handleFilterData = (category) => {
  //   const filter = productData.filter(items => items.category.toLowerCase() === category.toLowerCase())
  //   setDataFilter(() => {
  //     return [
  //       ...filter
  //     ]
  //   })
  // }


  return (
    <div className='p-2 md:p-4 bg-slate-100'>

      <div className='md:flex gap-4 py-2'>

        <div className='md:w-1/2'>

          <div className='w-36 flex gap-3 bg-slate-300 px-2  rounded-full items-center'>
            <h1 className='text-sm font-medium test-slate-900'>Bike Delivery</h1>
            <img className='h-7' src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' alt='' />
          </div>

          <h1 className='text-4xl md:text-7xl font-bold py-3'>The Fastest Delivery in <span className='text-red-400'>Your Home</span></h1>
          <p className='py-3 text-base'> Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication,.</p>
          <button className='bg-red-500 py-2 px-4 rounded font-bold text-slate-200'> Order Now</button>

        </div>


        <div className='md:w-1/2 flex flex-wrap gap-5 justify-center'>

          {
            homeProductList[0] ? homeProductList.map((item) => {
              return (
                <HomeCard key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  category={item.category}

                />

              )
            })
              :
              loading.map((e, i) => {
                return (
                  <HomeCard key={i} loading={'loading...'} />
                )
              })
          }

        </div>

      </div>

      <div className=' '>

        <div className='flex w-full items-center'>
          <h1 className='font-bold text-slate-800 text-2xl mb-4 '> Fresh Vegetables</h1>
          <div className='flex gap-3 ml-auto'>
            <button className='text-xl bg-slate-300 hover:bg-slate-400 p-1 rounded scroll-smooth transition-all' onClick={prevProduct}><GrPrevious /></button>
            <button className='text-xl bg-slate-300 hover:bg-slate-400 p-1 rounded scroll-smooth transition-all' onClick={nextProduct}><GrNext /></button>
          </div>
        </div>

        <div className='flex gap-5 mt-1 overflow-scroll scrollbar-none' ref={slideProductRef}>
          {
            homeProductListVegetables[0] ? homeProductListVegetables.map((items) => {
              return (
                <CardFeatures key={items._id}
                  id={items._id}
                  name={items.name}
                  price={items.price}
                  category={items.category}
                  image={items.image}

                />
              )
            })

              :
              loadingArray.map((e, i) => {
                return (
                  <CardFeatures key={i} loadingArray={'loading...'} />
                )
              })

          }
        </div>
      </div>
      
      <AllProduct heading={"Your Product"} />

      {/* <div className='my-5' >
        <h1 className='font-bold text-slate-800 text-2xl mb-4 '> Your Product</h1>


        <div className='flex justify-center gap-4 overflow-scroll scrollbar-none '>
          {
            categoryList[0] && categoryList.map((catry, i) => {
              return (
                <FilterProduct key={i} category={catry} onClick={() => handleFilterData(catry)} />
              )
            })
          }
        </div>

        <div className='my-4 flex gap-4 justify-center flex-wrap'>
          {
            dataFilter.map((items) => {
              return (
                <CardFeatures key={items._id}
                  id={items._id}
                  name={items.name}
                  category={items.category}
                  price={items.price}
                  image={items.image}
                />
              )
            })
          }
        </div>
      </div> */}

    </div>
  )
}

export default Home