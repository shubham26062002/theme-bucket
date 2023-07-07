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
        const handleSession = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (data.session) {
                setSession(data.session)
            }
        }
        handleSession()
    }, [supabase])

    return (
        <SessionContext.Provider value={{ session }}>
            {children}
        </SessionContext.Provider>
    )
}