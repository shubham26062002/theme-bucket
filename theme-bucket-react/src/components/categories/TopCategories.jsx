import React from 'react'
import { Link } from 'react-router-dom'

const TopCategories = ({
    name,
    image
}) => {
    return (
        <>
            <Link to="#">
                <div class="relative rounded-md overflow-hidden group">
                    <img class="block aspect-video group-hover:scale-110 transition"
                        src={image} alt={name} />
                    <div
                        class="flex justify-center items-center absolute w-full h-full inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition">
                        <h1 class="font-semibold text-2xl text-gray-200">{name}</h1>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default TopCategories