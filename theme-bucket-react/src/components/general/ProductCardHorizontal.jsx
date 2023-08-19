import { Link, useNavigate } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'
import { AiOutlineDownload } from 'react-icons/ai'
import { FiEdit, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const ProductCardHorizontal = ({
    to,
    imageUrl,
    name,
    cardType = 'product',
    publisherName,
    avgRating,
    ratingsCount,
    price,
    createdAt,
    srcUrl,
    linkToEditPage,
    addedAt,
    orderItemId,
    productId,
}) => {
    const download = async () => {
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

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const remove = async () => {
        setIsLoading(true)

        try {
            await supabase
                .from('order_items')
                .delete()
                .eq('id', orderItemId)

            toast.success('Item Removed from cart successfully.')

            navigate('/cart')
        } catch (error) {
            console.log('ERROR_AT_PRODUCT_CARD_HORIZONTAL', 'REMOVE', error)
            toast.error('Something went wrong. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className="grid mobile:grid-cols-1 desktop:grid-cols-2 shadow-product-shadow shadow-gray-300 rounded-lg overflow-hidden group-hover:shadow-md group-hover:-translate-y-1 transition">
            <Link className="group" to={to}>
                <img className="block aspect-video" src={imageUrl}
                    alt={name} />
            </Link>
            <div className="p-4 self-center">
                <h1
                    className="font-semibold text-neutral-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-relaxed desktop:text-lg">
                    {name}</h1>

                {(((cardType === 'product') || (cardType === 'purchased')) && (
                    <p
                        className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full desktop:text-sm">
                        by {publisherName}</p>
                ))}


                <div className="mt-3 flex justify-between items-center">

                    {cardType !== 'cart' && (
                        <div className="flex justify-start items-center gap-1.5">
                            <span
                                className="text-sm desktop:text-base font-semibold text-neutral-700 leading-none">{avgRating ? avgRating : 0}</span>
                            <BsStarFill className="flex justify-center items-center w-4 h-4 desktop:w-5 desktop:h-5 text-yellow-ochre" />
                            <span
                                className="text-xs desktop:text-sm font-light text-neutral-500 leading-none">({ratingsCount})</span>
                        </div>
                    )}

                    <p className="font-bold text-lg desktop:text-xl text-neutral-700">Rs. {price}
                    </p>
                </div>


                {cardType === 'product' ? (
                    <button type="button" className="mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition" onClick={addToCart}>
                        <FiShoppingBag className="flex justify-center items-center h-5 w-5 text-brown" />
                        <span
                            className="font-bold uppercase text-xs tracking-widest text-neutral-700">Add To Cart</span>
                    </button>
                ) : cardType === 'purchased' ? (
                    <button type="button" className="mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition" onClick={download}>
                        <AiOutlineDownload className="flex justify-center items-center h-5 w-5 text-brown" />
                        <span
                            className="font-bold uppercase text-xs tracking-widest text-neutral-700">Download</span>
                    </button>
                ) : cardType === 'cart' ? (
                    <button type="button" className={twMerge('mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition', isLoading && 'opacity-50 cursor-not-allowed')} disabled={isLoading} onClick={remove}>
                        <MdOutlineRemoveShoppingCart className="flex justify-center items-center h-5 w-5 text-brown" />
                        <span
                            className="font-bold uppercase text-xs tracking-widest text-neutral-700">Remove</span>
                    </button>
                ) : (
                    <Link className="mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition" to={linkToEditPage}>
                        <FiEdit className="flex justify-center items-center h-5 w-5 text-brown" />
                        <span
                            className="font-bold uppercase text-xs tracking-widest text-neutral-700">Edit</span>
                    </Link>
                )}

                {cardType === 'purchased' && (
                    <p className="mt-2 text-xs text-gray-500">Purchased on {new Date(createdAt).getDate()}-{new Date(createdAt).getMonth() + 1}-{new Date(createdAt).getFullYear()},</p>
                )}

                {cardType === 'cart' && (
                    <p className="mt-2 text-xs text-gray-500">Added on {new Date(addedAt).getDate()}-{new Date(addedAt).getMonth() + 1}-{new Date(addedAt).getFullYear()},</p>
                )}
            </div>
        </div >

    )
}

export default ProductCardHorizontal