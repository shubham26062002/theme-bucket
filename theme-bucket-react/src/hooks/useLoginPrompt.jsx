import { useState, createContext, useContext } from 'react'

export const LoginPromptContext = createContext()

export const useLoginPrompt = () => {
    return useContext(LoginPromptContext)
}

export const LoginPromptProvider = ({
    children,
}) => {
    const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(() => false)

    return (
        <LoginPromptContext.Provider value={[isLoginPromptOpen, setIsLoginPromptOpen]}>
            {children}
        </LoginPromptContext.Provider>
    )
}