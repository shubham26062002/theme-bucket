import CategoriesLinks from '../components/categories/CategoriesLinks'
import { Outlet, useOutletContext } from 'react-router-dom'
import {supabase} from '../libs/supabase-client'
import {useLoaderData} from 'react-router-dom'

const CategoriesLayout = () => {
  const {session, categories}= useOutletContext()
  return (
    <>
      <main className="bg-gray-lightest grid grid-cols-1 desktop:grid-cols-5 gap-2 py-2">
        <div className="hidden desktop:block bg-white shadow-sm shadow-gray-400 rounded-r-md p-6">
          <div className="min-h-screen h-fit sticky inset-0 top-6">
            <h1 className="text-xl uppercase font-bold text-gray-700">Categories</h1>
            <div className="h-0.5 my-4 bg-gray-200"></div>
            <div className="flex flex-col justify-center items-start mx-6 gap-2">
              {
                categories.map((category, index) =>
                  <CategoriesLinks key={index} label={category.name} to={`/categories/${category.id}/products`} />
                )
              }
            </div>
          </div>
        </div>
        {categories.length !== 0 ? <Outlet context={{ categories }} /> : <p>Loading</p>}
      </main>
    </>
  )
}

export default CategoriesLayout