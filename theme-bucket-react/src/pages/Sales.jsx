import { Link } from 'react-router-dom'
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import FormButton from '../components/general/FormButton'
import ProductCardHorizontal from '../components/general/ProductCardHorizontal'
import { AiOutlinePlus } from 'react-icons/ai'

const IMAGE_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.co/storage/v1/object/public/product_images'

export const loader = async () => {
    try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
            console.log('ERROR_AT_SALES', 'SESSION_ERROR', sessionError)
            throw new Error('ERROR_AT_SALES', 'SESSION_ERROR', sessionError)
        }

        const { data: productsData, error: productsError } = await supabase.from('products')
            .select(`*, 
            ratings (
                *
            ), product_images (
                *
            )`).eq('publisher_id', sessionData.session?.user.id)

        if (productsError) {
            console.log('ERROR_AT_SALES', 'PRODUCTS_ERROR', productsError)
            throw new Error('ERROR_AT_SALES', 'PRODUCTS_ERROR', productsError)
        }

        const calculateGrandTotal = async () => {
            let grandTotal = 0;

            for (const product of productsData) {
                const { data: purchasedProductsData, error: purchasedProductsError } = await supabase
                    .from('purchased_products')
                    .select('*')
                    .eq('product_id', product.id)

                if (purchasedProductsError) {
                    console.log('ERROR_AT_SALES', 'PURCHASED_PRODUCTS_ERROR', purchasedProductsError)
                    throw new Error('ERROR_AT_SALES', 'PURCHASED_PRODUCTS_ERROR', purchasedProductsError)
                }

                grandTotal += purchasedProductsData.length * product.price
            }

            return grandTotal
        }

        const grandTotal = await calculateGrandTotal()

        return [productsData, grandTotal]
    } catch (error) {
        console.log('ERROR_AT_SALES', 'ERROR', error)
        throw new Error('ERROR_AT_SALES', 'ERROR', error)
    }
}

const Sales = () => {
    const { profile } = useOutletContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (profile.role === 'BUYER') {
            navigate(`/profile/${profile.id}/become-a-seller`)
        }
    }, [])

    const [products, grandTotal] = useLoaderData()

    return (
        <div>
            <div className="flex flex-col desktop:flex-row justify-between items-center gap-6">
                <h1 className="text-2xl font-normal leading-snug text-gray-700 text-center">
                    Your&nbsp;
                    <span className="uppercase font-bold">Products</span>
                </h1>
                <div className="flex justify-start items-center gap-4">
                    <p className="text-gray-700 font-medium">Total Products Available: </p>
                    <p className="text-white bg-gray-700 inline-block py-2 px-4 font-bold">{products.length}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 mt-10 desktop:px-24 gap-8">
                {products.length > 0 ? (
                    <>
                        <div className="flex justify-between items-center w-full gap-2">
                            <Link to={`/profile/${profile.id}/add-product`}
                                className="inline-block py-2 px-6 bg-gray-700 bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100" onClick={() => { }}>
                                <AiOutlinePlus className="text-white inline-flex justify-center items-center h-5 w-5 mr-2" />
                                <span>Add More</span>
                            </Link>
                            <div className="flex justify-start items-center gap-4">
                                <p className="text-gray-700 font-medium">Total Earnings: </p>
                                <p className="text-white bg-gray-700 inline-block py-2 px-4 font-bold">Rs. {grandTotal}</p>
                            </div>
                        </div>

                        {products.map((product, index) => (
                            <ProductCardHorizontal key={index} to="#" imageUrl={`${IMAGE_URL_PREFIX}/${product.product_images[0].image_url}`} name={product.name} type="seller" avgRating={product.avg_rating} ratingsCount={product.ratings.length} price={product.price} />
                        ))}
                    </>
                ) : (
                    <div className="shadow-product-shadow shadow-gray-300 rounded-lg py-8 text-center">
                        <p className="text-gray-700 font-medium">You haven't added any products yet.</p>
                        <FormButton label="Add" type="button" onClick={() => navigate(`/profile/${profile.id}/add-product`)} />
                    </div>
                )}

            </div>
        </div>
    )
}

export default Sales