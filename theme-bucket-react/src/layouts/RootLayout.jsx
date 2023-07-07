import { Outlet } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout