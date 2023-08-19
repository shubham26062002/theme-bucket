import { useParams, useLoaderData } from 'react-router-dom'
import ProductTopCard from '../components/products/ProductTopCard'
import ProductCard from '../components/products/ProductCard'
import { useEffect, useState } from 'react'
import { supabase } from '../libs/supabase-client'
import ProductCardVertical from '../components/general/ProductCardVertical'
import ProductCardHorizontal from '../components/general/ProductCardHorizontal'

const IMAGE_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.co/storage/v1/object/public/product_images'
const SRC_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.in/storage/v1/object/public/product_src'

export const loader = async () => {
    try {
        const { data, error } = await supabase.auth.getSession()

        if (data.session) {
            const { data: purchasedProductsData, error: purchasedProductsError } = await supabase.from('purchased_products').select('*').eq('user_id', data.session.user.id)

            if (purchasedProductsData) {
                return purchasedProductsData
            }
        }

        return null
    } catch (error) {
        console.log('ERROR_AT_CATEGORY_PRODUCTS_PAGE_LOADER', error)
        throw new Error('ERROR_AT_CATEGORY_PRODUCTS_PAGE_LOADER', error)
    }
}

const CategoryProducts = () => {
    const { id } = useParams()

    const [products, setproducts] = useState(() => [])

    const purchasedProducts = useLoaderData() || []

    useEffect(() => {
        const getProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select(`*,profiles(*),ratings(*),product_images(*)`)
                .eq('category_id', id)
                .order('avg_rating', { ascending: false, nullsFirst: false })
            setproducts(data)
        }
        getProducts()
    }, [id])

    return (
        <>
            <div
                className="desktop:col-start-2 desktop:col-end-6 bg-white shadow-sm shadow-gray-400 rounded-l-md py-12 px-10 desktop:px-20">
                <div>
                    <h1 className="text-3xl font-normal leading-snug text-gray-700 text-center">
                        The Favorites of&nbsp;
                        <span className="uppercase font-bold">Millions!</span>
                    </h1>
                    <div className="grid grid-cols-1 desktop:grid-cols-3 mt-10 gap-8">

                        {products.map((product, index) => {
                            if (index < 3) {
                                for (let purchasedProduct of purchasedProducts) {
                                    if (purchasedProduct.product_id === product.id) {
                                        return (
                                            <ProductCardVertical key={index} to={`/categories/${id}/products/${product.id}`} imageUrl={`${IMAGE_URL_PREFIX}/${product.product_images[0].image_url}`} name={product.name} publisherName={product.profiles.full_name} avgRating={product.avg_rating} ratingsCount={product.ratings.length} price={product.price} cardType="purchased" srcUrl={`${SRC_URL_PREFIX}/${product.src_url}`} />
                                        )
                                    }
                                }
                                return (
                                    <ProductCardVertical key={index} to={`/categories/${id}/products/${product.id}`} imageUrl={`${IMAGE_URL_PREFIX}/${product.product_images[0].image_url}`} name={product.name} publisherName={product.profiles.full_name} avgRating={product.avg_rating} ratingsCount={product.ratings.length} price={product.price} productId={product.id} />
                                )
                            }
                        })}

                    </div>
                </div>

                {products.length >= 3 && (
                    <div className="mt-16">
                        <div className="flex flex-col desktop:flex-row justify-between items-center gap-6">
                            <h1 className="text-3xl font-normal leading-snug text-gray-700 text-center">
                                All&nbsp;
                                <span className="uppercase font-bold">Collections</span>
                            </h1>
                            <div className="flex justify-start items-center gap-4">
                                <p className="text-gray-700 font-medium text-lg">Total Products Available: </p>
                                <p className="text-white bg-gray-700 inline-block py-2 px-4 font-bold text-lg">{products.length}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 mt-10 desktop:px-24 gap-8">
                            {products.map((product, index) => {
                                if (index >= 3) {
                                    for (let purchasedProduct of purchasedProducts) {
                                        if (purchasedProduct.product_id === product.id) {
                                            return (
                                                <ProductCardHorizontal key={index} to={`/categories/${id}/products/${product.id}`} imageUrl={`${IMAGE_URL_PREFIX}/${product.product_images[0].image_url}`} name={product.name} publisherName={product.profiles.full_name} avgRating={product.avg_rating} ratingsCount={product.ratings.length} price={product.price} cardType="purchased" srcUrl={`${SRC_URL_PREFIX}/${product.src_url}`} />
                                            )
                                        }
                                    }
                                    return (
                                        <ProductCardHorizontal key={index} to={`/categories/${id}/products/${product.id}`} imageUrl={`${IMAGE_URL_PREFIX}/${product.product_images[0].image_url}`} name={product.name} publisherName={product.profiles.full_name} avgRating={product.avg_rating} ratingsCount={product.ratings.length} price={product.price} productId={product.id} />
                                    )
                                }
                            })}
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default CategoryProducts