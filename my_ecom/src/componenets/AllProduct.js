import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import CardFeatures from './CardFeatures'
import { useSelector } from 'react-redux'

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => (state.product.productList))
    // console.log(productData)

    const categoryList = [...new Set(productData.map(items => items.category))]
    // console.log(categoryList)
    const [filterby,setFilterby] = useState('')
    const [dataFilter, setDataFilter] = useState([])
    useEffect(() => {
        setDataFilter(productData)
    }, [productData])

    // console.log(data);

    const handleFilterData = (category) => {
        setFilterby(category)
        const filter = productData.filter(items => items.category.toLowerCase() === category.toLowerCase())
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }

    return (
        <div className='my-5' >
            <h1 className='font-bold text-slate-800 text-2xl mb-4 '>{heading}</h1>


            <div className='flex justify-center  gap-3 overflow-scroll scrollbar-none '>
                {
                    categoryList[0] && categoryList.map((catry, i) => {
                        return (
                            <FilterProduct
                                key={i}
                                isActive = {catry.toLowerCase() === filterby.toLowerCase()}
                                category={catry}
                                onClick={() => handleFilterData(catry)}
                            />
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
        </div>

    )
}

export default AllProduct