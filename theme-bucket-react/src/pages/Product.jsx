import { useParams } from 'react-router'

const Product = () => {
    const { categoryId, productId } = useParams()

    return (
        <div>
            CategoryId: {categoryId}
            ProductId: {productId}
            Product
        </div>
    )
}

export default Product