const ProductScrenshots = ({
    src,
    onClick,
}) => {
    return (
        <>
            <img className="rounded-sm w-[16%] aspect-video object-cover ring-2 ring-gray-600 cursor-pointer"
                src={src} alt="" onClick={onClick} />
        </>
    )
}

export default ProductScrenshots