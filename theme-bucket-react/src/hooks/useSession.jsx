import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../libs/supabase-client'

const SessionContext = createContext()

export const useSession = () => {
    return useContext(SessionContext)
}

export const SessionProvider = ({
    children,
}) => {
    const [session, setSession] = useState(() => null)

    useEffect(() => {
        supabase.auth.getSession()
            .then((response) => {
                if (response.data.session) {
                    setSession(response.data.session)
                }
            })
    }, [])

    return (
        <SessionContext.Provider value={{ session }}>
            {children}
        </SessionContext.Provider>
    )
}