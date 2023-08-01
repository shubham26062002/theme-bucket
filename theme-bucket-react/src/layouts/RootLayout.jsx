import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'

export const loader = async () => {
    const { data, error } = await supabase
                  .from('categories')
                  .select()
                  .order('created_at', { ascending: false })
  
    if (error) {
        console.log('ERROR_AT_ROOT_LAYOUT', error)
        throw new Error('ERROR_AT_ROOT_LAYOUT', error)
    }
    return data
  }
const RootLayout = () => {
    const { session } = useOutletContext()
    const categories= useLoaderData()
    return (
        <div>
            <Navbar session={session} categories={categories} />
            <Outlet context={{ session,categories }} />
            <Footer />
        </div>
    )
}

export default RootLayout