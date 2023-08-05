import React from 'react'
import { BsStarFill } from 'react-icons/bs'
import { FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const ProductCardVertical = ({
    to,
    imageUrl,
    name,
    publisherName,
    avgRating,
    ratingsCount,
    price,
}) => {
    return (
        <Link className="group" to={to}>
            <div
                className="rounded-lg overflow-hidden shadow-sm shadow-gray-300 group-hover:shadow-md group-hover:-translate-y-1 transition">
                <img className="block aspect-video" src={imageUrl} alt={name} />
                <div className="p-4">
                    <h1
                        className="font-semibold text-neutral-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-relaxed">
                        {name}</h1>
                    <p
                        className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        by {publisherName}</p>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="flex justify-start items-center gap-1.5">
                            <span className="text-sm font-semibold text-neutral-700 leading-none">{avgRating}</span>
                            <BsStarFill className="flex justify-center items-center w-4 h-4 desktop:w-5 desktop:h-5 text-yellow-ochre" />
                            <span className="text-xs font-light text-neutral-500 leading-none">({ratingsCount})</span>
                        </div>
                        <p className="font-bold text-lg text-neutral-700">Rs. {price}</p>
                    </div>
                    <button
                        className="mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">
                        <FiShoppingBag className="flex justify-center items-center h-5 w-5 text-brown" />
                        <span className="font-bold uppercase text-xs tracking-widest text-neutral-700">Add to
                            Cart</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ProductCardVertical