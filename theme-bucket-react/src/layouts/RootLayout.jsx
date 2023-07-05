import { Outlet } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import LoginPrompt from '../components/general/LoginPrompt'
import { LoginPromptProvider } from '../hooks/useLoginPrompt'
import { SessionProvider } from '../hooks/useSession'

const RootLayout = () => {
    return (
        <div>
            <SessionProvider>
                <LoginPromptProvider>
                    <LoginPrompt />
                    <Navbar />
                </LoginPromptProvider>
                <Outlet />
                <Footer />
            </SessionProvider>
        </div>
    )
}

export default RootLayout