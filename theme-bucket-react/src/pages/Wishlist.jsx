import ProductCardVertical from "../components/general/ProductCardVertical"
import { useLoaderData } from "react-router-dom"
import { Link } from "react-router-dom"

const IMAGE_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.co/storage/v1/object/public/product_images'

export const loader = async () => {
    try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
            console.log('ERROR_AT_WISHLIST', 'SESSION_ERROR', sessionError)
            throw new Error('ERROR_AT_WISHLIST', 'SESSION_ERROR', sessionError)
        }
        const { data: likedProductsData, error: likedProductsError } = await supabase.from('liked_products')
            .select(`*,
        product:products(*,
        ratings(count),
        product_images(*),
        profiles(full_name))`).eq('user_id', sessionData.session?.user.id)

        if (likedProductsError) {
            console.log('ERROR_AT_WISHLIST', 'LIKED_PRODUCTS_ERROR', likedProductsError)
            throw new Error('ERROR_AT_WISHLIST', 'LIKED_PRODUCTS_ERROR', likedProductsError)
        }
        return likedProductsData
    } catch (error) {
        console.log('ERROR_AT_WISHLIST', 'ERROR', error)
        throw new Error('ERROR_AT_WISHLIST', 'ERROR', error)
    }
}

const Wishlist = () => {
    const liked_products = useLoaderData()
    console.log(liked_products)
    return (
        <div>
        <div className="flex flex-col desktop:flex-row justify-between items-center gap-6">
            <h1 className="text-2xl font-normal leading-snug text-gray-700 text-center">
              Your&nbsp;Favourite&nbsp;<span className="uppercase font-bold">Products</span>
            </h1>
            <div className="flex justify-start items-center gap-4">
                <p className="text-gray-700 font-medium">Total Favourite Products: </p>
                <p className="text-white bg-gray-700 inline-block py-2 px-4 font-bold">{liked_products.length}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 desktop:grid-cols-3 mt-10 gap-8">
            {liked_products.length > 0 ? (
                <>

                    {liked_products.map((liked_product, index) => (
                        <ProductCardVertical key={index} to={`/categories/${liked_product.product.category_id}/products/${liked_product.product.id}`} imageUrl={`${IMAGE_URL_PREFIX}/${liked_product.product.product_images[0].image_url}`} name={liked_product.product.name}  publisherName={liked_product.product.profiles.full_name} avgRating={liked_product.product.avg_rating} ratingsCount={liked_product.product.ratings.length} price={liked_product.product.price}/>
                    ))}
                </>
            ) : (
                <div className="shadow-product-shadow shadow-gray-300 rounded-lg py-8 text-center">
                    <p className="text-gray-700 font-medium">You haven't liked any products yet.</p>
                    <Link to="/categories" className="mr-4 inline-block mt-10 py-2 px-6 bg-yellow-ochre bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100">Start Exploring</Link>
                </div>
            )}
        </div>
    </div>
    )
}

export default Wishlist