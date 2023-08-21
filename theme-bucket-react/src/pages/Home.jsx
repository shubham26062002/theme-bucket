import ToolsStackInstance from '../components/home/ToolsStackInstance'
import CategoryCard from '../components/home/CategoryCard'
import { Link, useOutletContext } from 'react-router-dom'

const Home = () => {
    const toolsStackData = [
        {
            name: 'React',
            imageUrl: '/images/react-logo.svg'
        },
        {
            name: 'TailwindCSS',
            imageUrl: '/images/tailwindcss-logo.svg'
        },
        {
            name: 'Supabase',
            imageUrl: '/images/supabase-logo.svg'
        },
        {
            name: 'NodeJS',
            imageUrl: '/images/node-js-logo.png'
        },
    ]

    const { session, categories } = useOutletContext()

    return (
        <main>
            <div className="py-10 px-8 desktop:px-64 bg-gray-lightest grid grid-cols-1 desktop:grid-cols-4 gap-y-8">
                {toolsStackData.map((toolStackInstanceData, index) =>
                    <ToolsStackInstance key={index} imageUrl={toolStackInstanceData.imageUrl} name={toolStackInstanceData.name} />
                )}
            </div>
            <div className="py-16">
                <h1 className="mx-8 mb-14 text-4xl font-normal leading-snug text-center text-gray-700">
                    Trending <span className="uppercase font-bold">Categories</span>
                </h1>
                <div className="mx-10 desktop:mx-28 grid grid-cols-1 desktop:grid-cols-3 gap-16">
                    {
                        categories.map((category, index) => {
                            if (index < 3) {
                                return (
                                    <CategoryCard key={index} to={`/categories/${category.id}/products`} imageUrl={category.image_url} name={category.name} />
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="bg-gray-100 py-12">
                <div className="mx-10 desktop:mx-28 grid grid-cols-1 desktop:grid-cols-2 gap-6 desktop:gap-16">
                    <div className="self-center">
                        <h1 className="text-4xl font-normal leading-snug text-gray-700">
                            Take Your Website to
                            <span className="uppercase font-bold">New Heights</span> with us
                        </h1>
                        <p className="mt-6 text-gray-500 leading-normal">
                            ThemeBucket offers a diverse range of theme templates that are
                            designed to empower your online presence. Unlock limitless
                            possibilities and watch your business thrive!"
                        </p>
                        <div className="mt-8">
                            <Link to="categories"
                                className="inline-block px-8 py-3 bg-brown bg-opacity-90 hover:bg-opacity-100 transition text-white rounded-md">Get
                                Started</Link>
                        </div>
                    </div>
                    <div className="mobile:row-start-1 mobile:row-end-2 desktop:col-start-2 desktop:col-end-2">
                        <img className="h-96 aspect-video object-contain" src="/images/landing-image.jpg" />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home