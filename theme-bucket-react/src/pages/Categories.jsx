import { useOutletContext } from "react-router-dom"
import TopCategories from "../components/categories/TopCategories"
import CategoriesCard from "../components/categories/CategoriesCard"

const Categories = () => {
    const { categories } = useOutletContext()
    const topcategories = categories.slice(0, 3)
    return (
        <>
            <div
                class="desktop:col-start-2 desktop:col-end-6 bg-white shadow-sm shadow-gray-400 rounded-l-md py-12 px-10 desktop:px-20">
                <div>
                    <h1 class="text-3xl font-normal leading-snug text-gray-700 text-center">
                        Browse our&nbsp;
                        <span class="uppercase font-bold">Latest Categories</span>
                    </h1>
                    <div class="grid grid-cols-1 desktop:grid-cols-2 mt-10 gap-8">
                        {topcategories?.map((category) => {

                            return <TopCategories name={category.name} image={category.image_url} />
                        })}

                    </div>
                </div>

                <div class="mt-16">
                    <div class="flex flex-col desktop:flex-row justify-between items-center gap-6">
                        <h1 class="text-3xl font-normal leading-snug text-gray-700 text-center">
                            Browse our&nbsp;
                            <span class="uppercase font-bold">Other Categories</span>
                        </h1>
                        <div class="flex justify-start items-center gap-4">
                            <p class="text-gray-700 font-medium text-lg">Total Categories Available: </p>
                            <p class="text-white bg-gray-700 inline-block py-2 px-4 font-bold text-lg">{categories.length}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 desktop:grid-cols-3 mt-10 gap-8">

                        {categories?.map((category) => {

                            return <CategoriesCard name={category.name} description={category.description} image={category.image_url} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories