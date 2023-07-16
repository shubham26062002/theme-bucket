import React from 'react'
import ProductImages from './ProductImages'
import ProductDetails from './ProductDetails'

const ProductTop = ({
    name,
    publisher,
    price,
    averagerating,
    ratingcount,
    description,
    
}) => {
  return (
    <>
        <main class="bg-gray-lightest p-2">
        <div class="bg-white shadow-sm shadow-gray-400 rounded-md h-full py-12 px-6 desktop:px-28">
            <div class="grid grid-cols-1 desktop:grid-cols-3 desktop:gap-8">
                <div class="flex flex-col desktop:flex-row gap-6 desktop:col-start-1 desktop:col-end-3">
                        <ProductImages topimage="/images/blog-website.jpg"/>
                    <div class="mt-14 mb-3 desktop:mt-3">
                        <button>
                    
                            <svg className="flex justify-center items-center stroke-2 stroke-rose-500 fill-rose-500 h-7 w-7"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-heart">
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-neutral-700 leading-normal">
                        {name}</h1>
                    <p class="text-gray-500">
                        by {publisher}</p>
                    <div class="mt-4 flex justify-start items-center gap-1.5">
                        <span class="font-semibold text-neutral-700 leading-none">{averagerating}</span>
                        <svg className="flex justify-center items-center w-5 h-5 fill-yellow-ochre stroke-yellow-ochre"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-star">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                            </polygon>
                        </svg>
                        <span class="font-light text-neutral-500 leading-none">({ratingcount})</span>
                    </div>
                    <p class="mt-6 font-bold text-2xl text-neutral-700">Rs. {price}
                    </p>
                    <div class="space-y-3 pt-6 max-w-sm">
                        <button
                            class="inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">
                            <svg className="flex justify-start items-center h-5 w-5 stroke-brown"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-shopping-bag">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <span class="font-bold uppercase tracking-widest text-xs text-neutral-700">Add to
                                Cart</span>
                        </button>
                        <a href="#"
                            class="inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">
                            <svg className="flex justify-start items-center h-5 w-5 stroke-brown"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-layout">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <span class="font-bold uppercase tracking-widest text-xs text-neutral-700">Live
                                Preview</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt-14 grid grid-cols-1 desktop:grid-cols-3 gap-14">
                <div class="desktop:col-start-1 desktop:col-end-3">
                    <p class="text-lg font-bold text-black-2">
                        Description</p>
                    <div class="h-[2px] bg-gray-500 mt-2"></div>
                    <div class="py-6 space-y-5">
                        <p class="text-neutral-600 text-sm leading-relaxed">{description}</p>
                    </div>
                </div>
                <ProductDetails publishedat="30 February 2090" responsive="Hulk"/>
                </div>
         
                </div>
                </main>
    </>
  )
}

export default ProductTop