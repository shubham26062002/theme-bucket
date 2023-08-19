import { redirect, useLoaderData, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { supabase } from '../libs/supabase-client'
import ProductCardHorizontal from '../components/general/ProductCardHorizontal'

export const loader = async () => {
    try {
        const { data: sessionData } = await supabase.auth.getSession()

        if (!sessionData.session) {
            return redirect('/login')
        }

        const { data: orderData, error: orderError } = await supabase
            .from('orders').select('*, order_items(*, products(*, product_images(*)))').eq('user_id', sessionData.session.user.id).eq('is_completed', false).single()

        if (orderError) {
            const { data: createdOrderData } = await supabase.from('orders').insert({
                is_completed: false,
                is_paid: false,
                user_id: sessionData.session.user.id,
            }).select('*, order_items(*, products(*, product_images(*)))').single()

            return createdOrderData
        }

        return orderData
    } catch (error) {
        console.log('ERROR_AT_CART_LOADER', error)
        throw new Error('ERROR_AT_CART_LOADER', error)
    }
}

const IMAGE_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.co/storage/v1/object/public/product_images'

const Cart = () => {
    const order = useLoaderData()

    console.log('order', order)

    return (
        <main>
            <div className="py-16">
                <h1 className="mx-8 mb-14 text-4xl font-normal leading-snug text-center text-gray-700">
                    Your&nbsp;<span className="uppercase font-bold">Cart ({order.order_items.length} Items)</span>
                </h1>
                <div className="mx-10 desktop:mx-28 grid grid-cols-1 desktop:grid-cols-3 gap-16">
                    <div
                        className="row-start-2 row-end-3 desktop:row-start-1 desktop:row-end-3 desktop:col-start-1 desktop:col-end-3 flex flex-col gap-y-6">

                        {order.order_items.length > 0 ? (

                            order.order_items.map((orderItem, index) => (
                                <ProductCardHorizontal key={index} to={`/categories/${orderItem.products.category_id}/products/${orderItem.products.id}`} imageUrl={`${IMAGE_URL_PREFIX}/${orderItem.products.product_images[0].image_url}`} name={orderItem.products.name} cardType="cart" price={orderItem.products.price} addedAt={orderItem.created_at} orderItemId={orderItem.id} />
                            ))

                        ) : (
                            <div className="flex flex-col justify-center items-center py-12 shadow-product-shadow rounded-lg">
                                <p className="text-neutral-700 font-medium">No more items to show</p>
                                <Link to="/categories" className="inline-block mt-6 py-2 px-6 bg-yellow-ochre bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100">Start Exploring</Link>
                            </div>
                        )}

                    </div>
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-gray-700 font-bold text-lg">Cart Total</h1>
                            <div className="h-1 bg-gray-700 my-2"></div>
                            <div className="my-2 flex justify-between items-center">
                                <p className="text-gray-700 font-medium">Total Items</p>
                                <p className="text-gray-700 font-medium">{order.order_items.length}</p>
                            </div>
                            <div className="h-px bg-gray-700 my-2"></div>
                            <div className="my-2 flex justify-between items-center">
                                <p className="text-gray-700 font-medium">Total Amount</p>
                                <p className="text-gray-700 font-medium">Rs. {order.total_amount || 0}</p>
                            </div>
                            <div className="h-px bg-gray-700 my-2"></div>
                        </div>

                        {order.order_items.length > 0 && (
                            <button
                                className="py-2 w-full bg-yellow-ochre bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100">Proceed
                                to Checkout</button>
                        )}

                    </div>
                </div>
            </div>
        </main >
    )
}

export default Cart