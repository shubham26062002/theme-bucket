import { useParams } from 'react-router'
import ProductDetails from '../components/product/ProductDetails'
import ProductImages from '../components/product/ProductImages'
import { supabase } from '../libs/supabase-client'
import { useEffect, useState } from 'react'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { BsStar } from 'react-icons/bs'
import { CgBrowser } from 'react-icons/cg'
import { Link } from 'react-router-dom'

const Product = () => {
    const { categoryId, productId } = useParams()
    const [product, setProduct] = useState(() => null)

    useEffect(() => {
        const getProduct = async () => {
            const { data, error } = await supabase
                .from('products')
                .select(`*,profiles(*),ratings(*),categories(*),product_images(*)`)
                .eq("id", productId)
            setProduct(data[0])
        }
        getProduct()
    }, [])

    console.log(product)

    if (!product) {
        return null
    }

    return (
        <>

            <main className="bg-gray-lightest p-2">
                <div className="bg-white shadow-sm shadow-gray-400 rounded-md h-full py-12 px-6 desktop:px-28">
                    <div className="grid grid-cols-1 desktop:grid-cols-3 desktop:gap-8">
                        <div className="flex flex-col desktop:flex-row gap-6 desktop:col-start-1 desktop:col-end-3">
                            <ProductImages imagesData={product.product_images} />
                            <div className="mt-14 mb-3 desktop:mt-3">
                                <button>
                                    <FiHeart className="flex justify-center items-center stroke-2 stroke-rose-500 fill-rose-500 h-7 w-7" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-700 leading-normal">
                                {product.name}</h1>
                            <p className="text-gray-500">
                                by {product.profiles?.full_name}</p>
                            <div className="mt-4 flex justify-start items-center gap-1.5">
                                <span className="font-semibold text-neutral-700 leading-none">{product.avg_rating || 0}</span>
                                <BsStar className="flex justify-center items-center w-5 h-5 stroke-1 text-neutral-700" />
                                <span className="font-light text-neutral-500 leading-none">({product.ratings.length})</span>
                            </div>
                            <p className="mt-6 font-bold text-2xl text-neutral-700">Rs. {product.price}
                            </p>
                            <div className="space-y-3 pt-6 max-w-sm">
                                <button
                                    className="inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">
                                    <FiShoppingBag className="flex justify-start items-center h-5 w-5 stroke-brown" />
                                    <span className="font-bold uppercase tracking-widest text-xs text-neutral-700">Add to
                                        Cart</span>
                                </button>

                                {product.live_preview_url && (
                                    <Link to={product.live_preview_url} target="_blank"
                                        className="inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">
                                        <CgBrowser className="flex justify-start items-center h-5 w-5 stroke-brown" />
                                        <span className="font-bold uppercase tracking-widest text-xs text-neutral-700">Live
                                            Preview</span>
                                    </Link>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="mt-14 grid grid-cols-1 desktop:grid-cols-3 gap-14">
                        <div className="desktop:col-start-1 desktop:col-end-3">
                            <p className="text-lg font-bold text-black-2">
                                Description</p>
                            <div className="h-[2px] bg-gray-500 mt-2"></div>
                            <div className="py-6 space-y-5">
                                <p className="text-neutral-600 text-sm leading-relaxed">{product.description}</p>
                            </div>
                        </div>
                        <ProductDetails toolstack={product.tools_stack} compatiblebrowsers={product.compatible_browsers} category={product.categories?.name} publishedat={product.created_at} responsive={product.is_responsive} />
                    </div>

                </div>
            </main>




        </>
    )
}

export default Product