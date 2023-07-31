import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({
    name,
    image,
    publisher,
    ratingscount,
    averagerating,
    price,
}) => {
    return (
        <>
            <Link class="group" href="#">
                <div
                    class="grid mobile:grid-cols-1 desktop:grid-cols-2 shadow-product-shadow shadow-gray-300 rounded-lg overflow-hidden group-hover:shadow-md group-hover:-translate-y-1 transition">
                    <img class="block aspect-video" src={image}
                        alt="Blog Website" />
                    <div class="p-4 self-center">
                        <h1
                            class="font-semibold text-neutral-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-relaxed desktop:text-lg">
                            {name}</h1>
                        <p
                            class="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full desktop:text-sm">
                            by {publisher}</p>
                        <div class="mt-3 flex justify-between items-center">
                            <div class="flex justify-start items-center gap-1.5">
                                <span
                                    class="text-sm desktop:text-base font-semibold text-neutral-700 leading-none">{averagerating}</span>
                                <svg className="flex justify-center items-center w-4 h-4 desktop:w-5 desktop:h-5 fill-yellow-ochre stroke-yellow-ochre"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                                    <polygon
                                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                    </polygon>
                                </svg>
                                <span
                                    class="text-xs desktop:text-sm font-light text-neutral-500 leading-none">({ratingscount})</span>
                            </div>
                            <p class="font-bold text-lg desktop:text-xl text-neutral-700">Rs. {price}
                            </p>
                        </div>
                        <button
                            class="mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">
                            <svg className="flex justify-start items-center h-5 w-5 stroke-brown"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-shopping-bag">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <span class="font-bold uppercase text-xs tracking-widest text-neutral-700">Add to
                                Cart</span>
                        </button>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductCard