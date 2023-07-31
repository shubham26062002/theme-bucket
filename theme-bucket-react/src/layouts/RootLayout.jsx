import { Outlet, useOutletContext } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'

const RootLayout = () => {
    const { session } = useOutletContext()

    return (
        <div>
            <Navbar session={session} />
            <Outlet context={{ session }} />
            <Footer />
        </div>
    )
}

export default RootLayout