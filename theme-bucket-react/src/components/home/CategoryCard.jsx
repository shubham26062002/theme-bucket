import { Link } from 'react-router-dom'

const IMAGE_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.co/storage/v1/object/public/categories_images'

const CategoryCard = ({
    to,
    imageUrl,
    name,
}) => {
    return (
        <Link to={to}>
            <div className="relative rounded-md overflow-hidden group">
                <img className="block aspect-video group-hover:scale-110 transition object-cover"
                    src={`${IMAGE_URL_PREFIX}/${imageUrl}`} alt={name} />
                <div
                    className="flex justify-center items-center absolute w-full h-full inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition">
                    <h1 className="font-semibold text-2xl text-gray-200">{name}</h1>
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard