import { useLoaderData, useOutletContext } from 'react-router-dom'
import ProductCardHorizontal from '../components/general/ProductCardHorizontal'
import { Link } from 'react-router-dom'

const IMAGE_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.co/storage/v1/object/public/product_images'
const SRC_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.in/storage/v1/object/public/product_src'

export const loader = async () => {
    try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
            console.log('ERROR_AT_PURCHASES', 'SESSION_ERROR', sessionError)
            throw new Error('ERROR_AT_PURCHASES', 'SESSION_ERROR', sessionError)
        }
        const { data: purchasedProductsData, error: purchasedProductsError } = await supabase.from('purchased_products')
            .select(`*,
        product:products(*,
        ratings(count),
        product_images(*),
        profiles(full_name))`).eq('user_id', sessionData.session?.user.id)

        if (purchasedProductsError) {
            console.log('ERROR_AT_PURCHASES', 'PURCHASED_PRODUCTS_ERROR', purchasedProductsError)
            throw new Error('ERROR_AT_PURCHASES', 'PURCHASED_PRODUCTS_ERROR', purchasedProductsError)
        }
        return purchasedProductsData
    } catch (error) {
        console.log('ERROR_AT_PURCHASES', 'ERROR', error)
        throw new Error('ERROR_AT_PURCHASES', 'ERROR', error)
    }
}

const Purchases = () => {
    const purchased_products = useLoaderData()

    return (
        <div>
            <div className="flex flex-col desktop:flex-row justify-between items-center gap-6">
                <h1 className="text-2xl font-normal leading-snug text-gray-700 text-center">
                    Your&nbsp; Purchased &nbsp;
                    <span className="uppercase font-bold">Products</span>
                </h1>
                <div className="flex justify-start items-center gap-4">
                    <p className="text-gray-700 font-medium">Total Products Purchased: </p>
                    <p className="text-white bg-gray-700 inline-block py-2 px-4 font-bold">{purchased_products.length}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 mt-10 desktop:px-24 gap-8">
                {purchased_products.length > 0 ? (
                    <>

                        {purchased_products.map((purchased_product, index) => (
                            <ProductCardHorizontal key={index} to={`/categories/${purchased_product.product.category_id}/products/${purchased_product.product.id}`} imageUrl={`${IMAGE_URL_PREFIX}/${purchased_product.product.product_images[0].image_url}`} name={purchased_product.product.name} type="purchased" publisherName={purchased_product.product.profiles.full_name} avgRating={purchased_product.product.avg_rating} ratingsCount={purchased_product.product.ratings.length} price={purchased_product.product.price} createdAt={purchased_product.created_at} srcUrl={`${SRC_URL_PREFIX}/${purchased_product.product.src_url}`} />
                        ))}
                    </>
                ) : (
                    <div className="shadow-product-shadow shadow-gray-300 rounded-lg py-8 text-center">
                        <p className="text-gray-700 font-medium">You haven't bought any products yet.</p>
                        <Link to="/categories" className="mr-4 inline-block mt-10 py-2 px-6 bg-yellow-ochre bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100">Start Browsing</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Purchases