import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

const IMAGE_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.co/storage/v1/object/public/categories_images'

const CategoriesCard = ({
    name,
    image,
    description,
    to,
}) => {
    return (
        <>
            <Link className="rounded-md overflow-hidden group shadow-sm shadow-gray-100 border-[1px] border-gray-200"
                to={to}>
                <div className="overflow-hidden">
                    <img className="block aspect-video group-hover:scale-110 transition"
                        src={`${IMAGE_URL_PREFIX}/${image}`} alt={name} />
                </div>
                <div className=" p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-2xl text-neutral-700">{name}</h1>
                        <div
                            className="flex justify-center items-center p-2 rounded-full border-[1px] border-neutral-200 group-hover:bg-gray-lightest transition">
                            <FiChevronRight className="flex justify-center items-center h-5 w-5 stroke-neutral-700" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">{description}</p>
                </div>
            </Link>
        </>
    )
}

export default CategoriesCard