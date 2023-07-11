import { useParams } from 'react-router-dom'
import ProductTopCard from '../components/products/ProductTopCard'
import ProductCard from '../components/products/ProductCard'

const CategoryProducts = () => {
    const { id } = useParams()

    return (
        <>
            <div
                class="desktop:col-start-2 desktop:col-end-6 bg-white shadow-sm shadow-gray-400 rounded-l-md py-12 px-10 desktop:px-20">
                <div>
                    <h1 class="text-3xl font-normal leading-snug text-gray-700 text-center">
                        The Favorites of
                        <span class="uppercase font-bold">Millions!</span>
                    </h1>
                    <div class="grid grid-cols-1 desktop:grid-cols-3 mt-10 gap-8">

                        <ProductTopCard name="  Tienda - eCommerce Joomla 4 Template
                                    with Page Builder" publisher="JoomShaper" image="/images/ecommerce-website.jpg" averageratings="4.5"
                            price="6000" ratingscount="100" />
                             <ProductTopCard name="  Tienda - eCommerce Joomla 4 Template
                                    with Page Builder" publisher="JoomShaper" image="/images/ecommerce-website.jpg" averageratings="4.5"
                            price="6000" ratingscount="100" />
                             <ProductTopCard name="  Tienda - eCommerce Joomla 4 Template
                                    with Page Builder" publisher="JoomShaper" image="/images/ecommerce-website.jpg" averageratings="4.5"
                            price="6000" ratingscount="100" />
                    </div>
                </div>

                <div class="mt-16">
                    <div class="flex flex-col desktop:flex-row justify-between items-center gap-6">
                        <h1 class="text-3xl font-normal leading-snug text-gray-700 text-center">
                            All
                            <span class="uppercase font-bold">Collections</span>
                        </h1>
                        <div class="flex justify-start items-center gap-4">
                            <p class="text-gray-700 font-medium text-lg">Total Products Available: </p>
                            <p class="text-white bg-gray-700 inline-block py-2 px-4 font-bold text-lg">9</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 mt-10 desktop:px-24 gap-8">
                        <ProductCard name="  Tienda - eCommerce Joomla 4 Template
                                    with Page Builder" publisher="JoomShaper" image="/images/ecommerce-website.jpg" averagerating="4.5"
                            price="6000" ratingscount="100" />
                                <ProductCard name="  Tienda - eCommerce Joomla 4 Template
                                    with Page Builder" publisher="JoomShaper" image="/images/ecommerce-website.jpg" averagerating="4.5"
                            price="6000" ratingscount="100" />
                                <ProductCard name="  Tienda - eCommerce Joomla 4 Template
                                    with Page Builder" publisher="JoomShaper" image="/images/ecommerce-website.jpg" averagerating="4.5"
                            price="6000" ratingscount="100" />
                            
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryProducts