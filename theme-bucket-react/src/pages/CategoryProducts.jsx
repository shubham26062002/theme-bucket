import { useParams } from 'react-router-dom'

const CategoryProducts = () => {
    const { id } = useParams()

    return (
        <div>
            <p>
                CategoryId: {id}
            </p>
            CategoryProducts
        </div>
    )
}

export default CategoryProducts