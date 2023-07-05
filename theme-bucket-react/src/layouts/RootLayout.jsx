import { Outlet } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import { SessionProvider } from '../hooks/useSession'

const RootLayout = () => {
    return (
        <div>
            <SessionProvider>
                <Navbar />
                <Outlet />
            </SessionProvider>
            <Footer />
        </div>
    )
}

export default RootLayout