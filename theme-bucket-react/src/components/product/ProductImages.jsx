import React from 'react'
import ProductScrenshots from './ProductScrenshots'

const ProductImages = ({
    topimage,
    
}) => {
    return (
        <>
            <div class="flex-1">
                <div class="rounded-md overflow-hidden">
                          <img class="w-full aspect-video object-cover" src={topimage}
                        alt="Blog Website" />
                </div>
                <div class="mt-3 flex justify-center items-center gap-3">
                    <ProductScrenshots screenshots="/images/blog-website.jpg"/>
                    <ProductScrenshots screenshots="/images/blog-website.jpg"/>
                    <ProductScrenshots screenshots="/images/blog-website.jpg"/>
                    <ProductScrenshots screenshots="/images/ecommerce-website.jpg"/>
                    
                    </div>
                    
            </div>
        </>
    )
}

export default ProductImages