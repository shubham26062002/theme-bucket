import { useState, useContext, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import LoginPrompt from '../components/general/LoginPrompt'

export const LoginPromptContext = createContext()

const RootLayout = () => {
    const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(() => false)

    return (
        <div>
            <LoginPromptContext.Provider value={{ isLoginPromptOpen, setIsLoginPromptOpen }}>
                <LoginPrompt />
                <Navbar />
            </LoginPromptContext.Provider>
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout