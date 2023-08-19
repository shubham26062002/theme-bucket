import React from 'react'
import { BsStarFill } from 'react-icons/bs'
import { FiShoppingBag } from 'react-icons/fi'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AiOutlineDownload } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { supabase } from '../../libs/supabase-client'

const ProductCardVertical = ({
    to,
    imageUrl,
    name,
    publisherName,
    avgRating,
    ratingsCount,
    price,
    cardType = "product",
    srcUrl,
    productId,
}) => {
    const download = async () => {
        window.location.assign(srcUrl)
    }

    const navigate = useNavigate()

    const location = useLocation()

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
            console.log('ERROR_AT_PRODUCT_CARD_VERTICAL_ADD_TO_CART', error)
            toast.error('Something went wrong!')
        }
    }

    return (
        <div
            className="rounded-lg overflow-hidden shadow-sm shadow-gray-300 hover:shadow-md hover:-translate-y-1 transition">
            <Link to={to}>
                <img className="block aspect-video" src={imageUrl} alt={name} />
            </Link>
            <div className="p-4">
                <Link to={to}>
                    <h1
                        className="font-semibold text-neutral-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-relaxed">
                        {name}</h1>
                    <p
                        className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        by {publisherName}</p>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="flex justify-start items-center gap-1.5">
                            <span className="text-sm font-semibold text-neutral-700 leading-none">{avgRating ? avgRating : 0}</span>
                            <BsStarFill className="flex justify-center items-center w-4 h-4 desktop:w-5 desktop:h-5 text-yellow-ochre" />
                            <span className="text-xs font-light text-neutral-500 leading-none">({ratingsCount})</span>
                        </div>
                        <p className="font-bold text-lg text-neutral-700">Rs. {price}</p>
                    </div>
                </Link>
                {cardType === 'purchased' ? (
                    <button
                        className="mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition" onClick={download}>
                        <AiOutlineDownload className="flex justify-center items-center h-5 w-5 text-brown" />
                        <span className="font-bold uppercase text-xs tracking-widest text-neutral-700">Download</span>
                    </button>
                ) : (
                    <button
                        className="mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition" onClick={addToCart}>
                        <FiShoppingBag className="flex justify-center items-center h-5 w-5 text-brown" />
                        <span className="font-bold uppercase text-xs tracking-widest text-neutral-700">Add to
                            Cart</span>
                    </button>
                )}

            </div>
        </div >
    )
}

export default ProductCardVertical