import { useState, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import LoginPrompt from '../components/general/LoginPrompt'
import { LoginPromptProvider } from '../hooks/useLoginPrompt'

export const LoginPromptContext = createContext()

const RootLayout = () => {
    return (
        <div>
            <LoginPromptProvider>
                <LoginPrompt />
                <Navbar />
            </LoginPromptProvider>
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout