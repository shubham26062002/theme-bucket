import React from 'react'

const ProductScrenshots = ({
    screenshots,
}) => {
    return (
        <>

            <img class="rounded-sm w-[16%] aspect-video object-cover ring-2 ring-gray-600"
                src={screenshots} alt="Blog Website" />


        </>
    )
}

export default ProductScrenshots