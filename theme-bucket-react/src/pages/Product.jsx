import { useParams, useLoaderData, useNavigate, useLocation } from 'react-router-dom'
import ProductDetails from '../components/product/ProductDetails'
import ProductImages from '../components/product/ProductImages'
import { supabase } from '../libs/supabase-client'
import { useEffect, useState } from 'react'
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi'
import { AiOutlineDownload } from 'react-icons/ai'
import { BsStar } from 'react-icons/bs'
import { CgBrowser } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormTextarea from '../components/general/FormTextarea'
import FormButton from '../components/general/FormButton'

export const loader = async () => {
    try {
        const { data: sessionData } = await supabase.auth.getSession()

        if (!sessionData.session) {
            return [null, null, null, null, null]
        }

        const { data: purchasedProductsData, error: purchasedProductsError } = await supabase.from('purchased_products').select('*').eq('user_id', sessionData.session.user.id)

        const { data: likedProductsData, error: likedProductsError } = await supabase.from('liked_products').select('*').eq('user_id', sessionData.session.user.id)

        return [sessionData.session, purchasedProductsData, likedProductsData]
    } catch (error) {
        console.log('ERROR_AT_PRODUCT_LOADER', error)
        throw new Error('ERROR_AT_PRODUCT_LOADER', error)
    }
}

const schema = z.object({
    rating: z.number().int().min(0).max(5),
    comment: z.string(),
})

const Product = () => {
    const SRC_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.in/storage/v1/object/public/product_src'
    const { categoryId, productId } = useParams()
    const [product, setProduct] = useState(() => null)

    const [session, purchasedProducts, likedProducts] = useLoaderData()

    useEffect(() => {
        const getProduct = async () => {
            const { data, error } = await supabase
                .from('products')
                .select(`*,profiles(*),ratings(*),categories(*),product_images(*),comments(*, profiles(*))`)
                .eq("id", productId)
            setProduct(data[0])
        }
        getProduct()
    }, [])

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const location = useLocation()

    const likeProduct = async () => {
        setIsLoading(true)

        try {
            const { data: sessionData } = await supabase.auth.getSession()

            if (!sessionData.session) {
                navigate('/login')
            } else {

                const { error: likedProductError } = await supabase.from('liked_products').insert({
                    user_id: sessionData.session.user.id,
                    product_id: product.id,
                })

                if (likedProductError) {
                    await supabase
                        .from('liked_products')
                        .delete()
                        .eq('user_id', sessionData.session.user.id)
                        .eq('product_id', product.id)

                    toast.success('Product is removed from your wishlist.')
                    navigate(location.pathname)
                } else {
                    toast.success('Product is added to your wishlist.')
                    navigate(location.pathname)
                }
            }
        } catch (error) {
            toast.error('Something went wrong.')
        } finally {
            setIsLoading(false)
        }
    }

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            rating: 0,
            comment: '',
        },
    })

    const [isRatingLoading, setIsRatingLoading] = useState(false)

    const onSubmit = async (values) => {
        setIsRatingLoading(true)

        try {
            if(values.comment.length){
            const { data: commentsData, error: commentsError } = await supabase
                .from('comments').insert({
                    user_id: session.user.id,
                    product_id: product.id,
                    message: values.comment,
                })

            if (commentsError) {
                toast.error('Something went wrong. Please try again.')
            } else {
                const { error: createdRatingsError } = await supabase
                    .from('ratings').insert({
                        user_id: session.user.id,
                        product_id: product.id,
                        rating: values.rating,
                    })

                if (createdRatingsError) {
                    const { data: updatedRatingsData, error: updatedRatingsError } = await supabase
                        .from('ratings').update({
                            rating: values.rating,
                        }).eq('user_id', session.user.id).eq('product_id', product.id)

                    if (updatedRatingsError) {
                        toast.error('Something went wrong. Please try again.')
                    } else {
                        toast.success('Your review is successfully saved.')
                        window.location.reload()
                    }
                } else {
                    toast.success('Your review is successfully saved.')
                    window.location.reload()
                }
            }}
            else
            {
                const { error: createdRatingsError } = await supabase
                .from('ratings').insert({
                    user_id: session.user.id,
                    product_id: product.id,
                    rating: values.rating,
                })

            if (createdRatingsError) {
                const { data: updatedRatingsData, error: updatedRatingsError } = await supabase
                    .from('ratings').update({
                        rating: values.rating,
                    }).eq('user_id', session.user.id).eq('product_id', product.id)

                if (updatedRatingsError) {
                    toast.error('Something went wrong. Please try again.')
                } else {
                    toast.success('Your review is successfully saved.')
                    window.location.reload()
                }
            } else {
                toast.success('Your review is successfully saved.')
                window.location.reload()
            }
            }
        } catch (error) {
            toast.error('Something went wrong.')
        } finally {
            setIsRatingLoading(false)
        }
    }


    if (!product) {
        return null
    }
    const download = async () => {
        const srcUrl= `${SRC_URL_PREFIX}/${product.src_url}`
        window.location.assign(srcUrl)
    }
    const addToCart = async () => {
        try {
            const { data: sessionData } = await supabase.auth.getSession()

            if (!sessionData.session) {
                navigate('/login')
            }

            const { data: orderData, error: orderError } = await supabase.from('orders').select('*').eq('user_id', sessionData.session.user.id).eq('is_completed', false).single()

            if (orderError) {
                const { data: createdOrderData } = await supabase.from('orders').insert({
                    is_completed: false,
                    is_paid: false,
                    user_id: sessionData.session.user.id,
                }).select('*').single()

                const { error: createdOrderItemError } = await supabase.from('order_items').insert({
                    order_id: createdOrderData.id,
                    product_id: productId,
                })

                if (createdOrderItemError) {
                    toast.error('Product is already in cart or you have already purchased it!')
                } else {
                    toast.success('Product added to cart successfully!')
                    navigate(location.pathname)
                }
            } else {
                const { error: createdOrderItemError } = await supabase.from('order_items').insert({
                    order_id: orderData.id,
                    product_id: productId,
                })

                if (createdOrderItemError) {
                    toast.error('Product is already in cart or you have already purchased it!')
                } else {
                    toast.success('Product added to cart successfully!')
                    navigate(location.pathname)
                }
            }
        } catch (error) {
            console.log('ERROR_AT_PRODUCT_CARD_HORIZONTAL_ADD_TO_CART', error)
            toast.error('Something went wrong!')
        }
    }
    const ispurchased = purchasedProducts.find((purchasedProduct) => purchasedProduct.product_id === product.id)
    return (
        <>

            <main className="bg-gray-lightest p-2">
                <div className="bg-white shadow-sm shadow-gray-400 rounded-md h-full py-12 px-6 desktop:px-28">
                    <div className="grid grid-cols-1 desktop:grid-cols-3 desktop:gap-8">
                        <div className="flex flex-col desktop:flex-row gap-6 desktop:col-start-1 desktop:col-end-3">
                            <ProductImages imagesData={product.product_images} />
                            <div className="mt-14 mb-3 desktop:mt-3">
                                <button className={twMerge(isLoading && 'cursor-not-allowed')} disabled={isLoading} onClick={likeProduct}>
                                    {!likedProducts && (
                                        <FiHeart className="flex justify-center items-center stroke-2 stroke-rose-500 fill-white h-7 w-7" />
                                    )}

                                    {likedProducts && (
                                        likedProducts.find((likedProduct) => likedProduct.product_id === product.id) ? (
                                            <FiHeart className="flex justify-center items-center stroke-2 stroke-rose-500 fill-rose-500 h-7 w-7" />
                                        ) : (
                                            <FiHeart className="flex justify-center items-center stroke-2 stroke-rose-500 fill-white h-7 w-7" />
                                        )
                                    )}

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
                                {!ispurchased?<button onClick={addToCart}
                                    className="inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">
                                    <FiShoppingBag className="flex justify-start items-center h-5 w-5 stroke-brown" />
                                    <span className="font-bold uppercase tracking-widest text-xs text-neutral-700">Add to
                                        Cart</span>
                                </button>
                                :
                                <button onClick={download}
                                    className="inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">
                                    <AiOutlineDownload className="flex justify-center items-center h-5 w-5 text-brown" />
                                    <span className="font-bold uppercase tracking-widest text-xs text-neutral-700">Download</span>
                                </button>}


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
                            <p className="text-lg font-bold text-black-2">
                                Reviews</p>
                            <div className="h-[2px] bg-gray-500 mt-2"></div>
                            <div className="mt-6">

                                {session && (
                                    <div className="flex flex-col gap-2">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex gap-2">

                                                <FiStar className={twMerge('flex justify-center items-center stroke-2 stroke-yellow-ochre fill-transparent h-7 w-7', watch('rating') >= 1 && 'fill-yellow-ochre')} onClick={() => watch('rating') === 0 ? setValue('rating', 1) : setValue('rating', 0)} />
                                                <FiStar className={twMerge('flex justify-center items-center stroke-2 stroke-yellow-ochre fill-transparent h-7 w-7', watch('rating') >= 2 && 'fill-yellow-ochre')} onClick={() => setValue('rating', 2)} />
                                                <FiStar className={twMerge('flex justify-center items-center stroke-2 stroke-yellow-ochre fill-transparent h-7 w-7', watch('rating') >= 3 && 'fill-yellow-ochre')} onClick={() => setValue('rating', 3)} />
                                                <FiStar className={twMerge('flex justify-center items-center stroke-2 stroke-yellow-ochre fill-transparent h-7 w-7', watch('rating') >= 4 && 'fill-yellow-ochre')} onClick={() => setValue('rating', 4)} />
                                                <FiStar className={twMerge('flex justify-center items-center stroke-2 stroke-yellow-ochre fill-transparent h-7 w-7', watch('rating') >= 5 && 'fill-yellow-ochre')} onClick={() => setValue('rating', 5)} />

                                            </div>
                                            <div className="mt-6">
                                                <FormTextarea id="comment" label="Add Review" placeholder="Write your comment here..." register={register} errors={errors} disabled={isRatingLoading} />
                                            </div>
                                            <div>
                                                <FormButton label="Add" type="submit" disabled={isRatingLoading} />
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {product.comments.length > 0 && (
                                    <div className='p-6 rounded-md bg-white shadow-lg shadow-neutral-200 border border-neutral-200 my-6'>
                                        {product.comments.map((comment, index) => (
                                            <>
                                                <div key={index} className="flex flex-col gap-2 mt-6">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex gap-2">

                                                            {product.ratings.find((rating) => rating.user_id === comment.user_id) && (

                                                                <div className="flex gap-1.5">
                                                                    <BsStar className="flex justify-center items-center w-5 h-5 stroke-1 text-neutral-700" />
                                                                    <span className="font-semibold text-neutral-700 leading-none">{product.ratings.find((rating) => rating.user_id === comment.user_id).rating}</span>
                                                                </div>

                                                            )}

                                                        </div>
                                                        <div className="flex gap-2">
                                                            <span className="text-sm text-neutral-500">Review by {comment.profiles?.full_name} on</span>
                                                            {/* <span className="text-sm text-neutral-500">{comment.created_at}</span> */}
                                                            <span className="text-sm text-neutral-500">{new Date(comment.created_at).getDate()}-{new Date(comment.created_at).getMonth() + 1}-{new Date(comment.created_at).getFullYear()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2 mt-6">
                                                        <p className="text-sm text-neutral-600">{comment.message}</p>
                                                    </div>
                                                </div >

                                                {index !== product.comments.length - 1 && (
                                                    <div className="h-[1px] bg-neutral-200 mt-6"></div>
                                                )}
                                            </>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                        <ProductDetails toolstack={product.tools_stack} compatiblebrowsers={product.compatible_browsers} category={product.categories?.name} publishedat={product.created_at} responsive={product.is_responsive} />
                    </div>
                </div>
            </main >




        </>
    )
}

export default Product