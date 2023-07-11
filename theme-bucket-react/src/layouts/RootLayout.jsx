import { Outlet } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import ToasterContext from '../hooks/ToasterContext'
import { CategoriesProvider } from '../hooks/useCategories'

const RootLayout = () => {
    return (
        <div>
            <CategoriesProvider>
                <ToasterContext />
                <Navbar />
                <Outlet />
                <Footer />
            </CategoriesProvider>
        </div>
    )
}

export default RootLayout