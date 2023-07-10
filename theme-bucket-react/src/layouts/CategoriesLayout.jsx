import React, { useEffect, useState } from 'react'
import { supabase } from '../libs/supabase-client'
import CategoriesLinks from '../components/categories/CategoriesLinks'
import { Outlet } from 'react-router-dom'

const CategoriesLayout = () => {
    const [categories, setcategories] = useState([])
    useEffect(() => {
        const getcategory = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select()
            setcategories(data)
        }
        getcategory()
    }, [])

  return (
    <>
        <main class="bg-gray-lightest grid grid-cols-1 desktop:grid-cols-5 gap-2 py-2">
      <div class="hidden desktop:block bg-white shadow-sm shadow-gray-400 rounded-r-md p-6">
            <div class="min-h-screen h-fit sticky inset-0 top-6">
                <h1 class="text-xl uppercase font-bold text-gray-700">Categories</h1>
                <div class="h-0.5 my-4 bg-gray-200"></div>
                <div class="flex flex-col justify-center items-start mx-6 gap-2">
                  {   <CategoriesLinks name={categories?.map((category)=>{
                        return  category.name
                    })} />}
                </div>
            </div>
        </div>
      {  categories?<Outlet context={{categories}}/>: <p>Loading</p>}
        </main>
    </>
  )
}

export default CategoriesLayout