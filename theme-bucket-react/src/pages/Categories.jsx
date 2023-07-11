import { useOutletContext } from "react-router-dom"
import CategoryCard from "../components/home/CategoryCard"
import CategoriesCard from "../components/categories/CategoriesCard"

const Categories = () => {
    const { categories } = useOutletContext()

    return (
        <>
            <div
                className="desktop:col-start-2 desktop:col-end-6 bg-white shadow-sm shadow-gray-400 rounded-l-md py-12 px-10 desktop:px-20">
                <div>
                    <h1 className="text-3xl font-normal leading-snug text-gray-700 text-center">
                        Browse our&nbsp;
                        <span className="uppercase font-bold">Latest Categories</span>
                    </h1>
                    <div className="grid grid-cols-1 desktop:grid-cols-2 mt-10 gap-8">
                        {categories.map((category, index) => {
                            if (index < 3) {
                                return <CategoryCard key={index} to={`/categories/${category.id}/products`} imageUrl={category.image_url} name={category.name} />
                            }
                        })}

                    </div>
                </div>

                <div className="mt-16">
                    <div className="flex flex-col desktop:flex-row justify-between items-center gap-6">
                        <h1 className="text-3xl font-normal leading-snug text-gray-700 text-center">
                            Browse our&nbsp;
                            <span className="uppercase font-bold">Other Categories</span>
                        </h1>
                        <div className="flex justify-start items-center gap-4">
                            <p className="text-gray-700 font-medium text-lg">Total Other Categories Available: </p>
                            <p className="text-white bg-gray-700 inline-block py-2 px-4 font-bold text-lg">{categories.length - 3}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 desktop:grid-cols-3 mt-10 gap-8">
                        {categories?.map((category, index) => {
                            if (index >= 3) {
                                return <CategoriesCard key={index} name={category.name} description={category.description} image={category.image_url} to={`/categories/${category.id}/products`} />
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories