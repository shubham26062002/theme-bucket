import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../libs/supabase-client'

const CategoriesContext = createContext()

export const useCategories = () => {
    return useContext(CategoriesContext)
}

export const CategoriesProvider = ({
    children,
}) => {
    const [categories, setCategories] = useState(() => [])

    useEffect(() => {
        const getCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select()
                .order('created_at', { ascending: false })
            setCategories(data)
        }
        getCategories()
    }, [])

    return (
        <CategoriesContext.Provider value={{ categories }}>
            {children}
        </CategoriesContext.Provider>
    )
}