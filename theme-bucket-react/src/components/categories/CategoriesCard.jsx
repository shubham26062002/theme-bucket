import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesCard = ({
    name,
    image,
    description,
}) => {
  return (
    <>
           <Link class="rounded-md overflow-hidden group shadow-sm shadow-gray-100 border-[1px] border-gray-200"
                            to="#">
                            <div class="overflow-hidden">
                                <img class="block aspect-video group-hover:scale-110 transition"
                                    src={image} alt={name} />
                            </div>
                            <div class=" p-4">
                                <div class="flex justify-between items-center">
                                    <h1 class="font-bold text-2xl text-neutral-700">{name}</h1>
                                    <div
                                        class="flex justify-center items-center p-2 rounded-full border-[1px] border-neutral-200 group-hover:bg-gray-lightest transition">
                                        <svg className="flex justify-center items-center h-5 w-5 stroke-neutral-700"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="feather feather-chevron-right">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-400 mt-4">{description}</p>
                            </div>
                        </Link>
    </>
  )
}

export default CategoriesCard