import { Link } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'
import { FiEdit, FiShoppingBag } from 'react-icons/fi'

const ProductCardHorizontal = ({
    to,
    imageUrl,
    name,
    type = 'product',
    publisherName,
    avgRating,
    ratingsCount,
    price,
}) => {
    return (
        <Link className="group" to={to}>
            <div
                className="grid mobile:grid-cols-1 desktop:grid-cols-2 shadow-product-shadow shadow-gray-300 rounded-lg overflow-hidden group-hover:shadow-md group-hover:-translate-y-1 transition">
                <img className="block aspect-video" src={imageUrl}
                    alt={name} />
                <div className="p-4 self-center">
                    <h1
                        className="font-semibold text-neutral-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-relaxed desktop:text-lg">
                        {name}</h1>

                    {type === 'product' &&
                        <p
                            className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full desktop:text-sm">
                            by {publisherName}</p>
                    }

                    <div className="mt-3 flex justify-between items-center">
                        <div className="flex justify-start items-center gap-1.5">
                            <span
                                className="text-sm desktop:text-base font-semibold text-neutral-700 leading-none">{avgRating}</span>
                            <BsStarFill className="flex justify-center items-center w-4 h-4 desktop:w-5 desktop:h-5 text-yellow-ochre" />
                            {/* <svg className="flex justify-center items-center w-4 h-4 desktop:w-5 desktop:h-5 fill-yellow-ochre stroke-yellow-ochre"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                className="feather feather-star">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                </polygon>
                            </svg> */}
                            <span
                                className="text-xs desktop:text-sm font-light text-neutral-500 leading-none">({ratingsCount})</span>
                        </div>
                        <p className="font-bold text-lg desktop:text-xl text-neutral-700">Rs. {price}
                        </p>
                    </div>
                    <button
                        className="mt-8 inline-flex w-full justify-center items-center gap-2 py-2 rounded-md border-[1px] border-gray-300 hover:bg-gray-50 hover:border-gray-500 transition">

                        {type === 'product' ? (
                            <FiShoppingBag className="flex justify-center items-center h-5 w-5 text-brown" />
                        ) : (
                            <FiEdit className="flex justify-center items-center h-5 w-5 text-brown" />
                        )}

                        {/* <svg className="flex justify-start items-center h-5 w-5 stroke-brown"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg> */}
                        <span
                            className="font-bold uppercase text-xs tracking-widest text-neutral-700">{type === 'product' ? 'Add To Cart' : 'Edit'}</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ProductCardHorizontal