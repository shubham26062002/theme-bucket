import { useParams } from 'react-router-dom'
import ProductTopCard from '../components/products/ProductTopCard'
import ProductCard from '../components/products/ProductCard'
import { useEffect, useState } from 'react'
import {supabase } from '../libs/supabase-client'

const CategoryProducts = () => {
    const { id } = useParams()
    const [products, setproducts] = useState(() => [])

    useEffect(() => {
        const getProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select(`*,profiles(full_name),ratings(count)`)
                .eq('category_id',id)
                .order('avg_rating',{ascending: false, nullsFirst: false})
            setproducts(data)
        }
        getProducts()
    }, [id])

    return (
        <>
            <div
                class="desktop:col-start-2 desktop:col-end-6 bg-white shadow-sm shadow-gray-400 rounded-l-md py-12 px-10 desktop:px-20">
                <div>
                    <h1 class="text-3xl font-normal leading-snug text-gray-700 text-center">
                        The Favorites of
                        <span class="uppercase font-bold">Millions!</span>
                    </h1>
                    <div class="grid grid-cols-1 desktop:grid-cols-3 mt-10 gap-8">

                    {products.map((product, index) => {
                            if (index < 3) {
                                return <ProductTopCard key={index} to={`/categories/${id}/products/${product.id}`} image={product.image_url} name={product.name} publisher={product.profiles.full_name} averageratings={product.avg_rating} price={product.price}  ratingscount={product.ratings[0].count} />
                            }
                        })}
                        
                    </div>
                </div>

                <div class="mt-16">
                    <div class="flex flex-col desktop:flex-row justify-between items-center gap-6">
                        <h1 class="text-3xl font-normal leading-snug text-gray-700 text-center">
                            All
                            <span class="uppercase font-bold">Collections</span>
                        </h1>
                        <div class="flex justify-start items-center gap-4">
                            <p class="text-gray-700 font-medium text-lg">Total Products Available: </p>
                            <p class="text-white bg-gray-700 inline-block py-2 px-4 font-bold text-lg">{products.length}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 mt-10 desktop:px-24 gap-8">
                    {products.map((product, index) => {
                            if (index >= 3) {
                                return <ProductCard key={index} to={`/categories/${id}/products/${product.id}`} image={product.image_url} name={product.name} publisher={product.profiles.full_name} averageratings={product.avg_rating} price={product.price}  ratingscount={product.ratings[0].count} />
                            }
                        })}
                       
                            
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryProducts