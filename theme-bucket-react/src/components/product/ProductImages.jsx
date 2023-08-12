import ProductScrenshots from './ProductScrenshots'
import { useState } from 'react'

const IMAGE_URL_PREFIX = 'https://tscfkijpiauszqdkuody.supabase.co/storage/v1/object/public/product_images'

const ProductImages = ({
    imagesData,
}) => {
    const [mainImage, setMainImage] = useState(() => imagesData[0].image_url)

    return (
        <>
            <div className="flex-1">
                <div className="rounded-md overflow-hidden">
                    <img className="w-full aspect-video object-cover" src={`${IMAGE_URL_PREFIX}/${mainImage}`}
                        alt="" />
                </div>
                <div className="mt-3 flex justify-center items-center gap-3">

                    {imagesData.map((image, index) => {
                        if (index < 4) {
                            return (
                                <ProductScrenshots key={index} src={`${IMAGE_URL_PREFIX}/${image.image_url}`} onClick={() => setMainImage(image.image_url)} />
                            )
                        }
                    })}

                </div>
            </div>
        </>
    )
}

export default ProductImages