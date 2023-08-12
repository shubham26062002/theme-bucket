import React from 'react'

const ProductDetailsBox = ({
    name,
}) => {
    return (
        <>

            <span
                className="px-6 text-xs py-2 mx-1 inline-block rounded-l-full rounded-r-full border-[1px] border-neutral-400">{name}</span>
        </>
    )
}

export default ProductDetailsBox