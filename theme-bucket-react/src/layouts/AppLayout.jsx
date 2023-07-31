import { Outlet, useLoaderData } from 'react-router-dom'
import { supabase } from '../libs/supabase-client'
import ToasterContext from '../hooks/ToasterContext'

export const loader = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
        console.log('ERROR_AT_APP_LAYOUT', error)
        throw new Error('ERROR_AT_APP_LAYOUT', error)
    }

    return data.session
}

const AppLayout = () => {
    const session = useLoaderData()

    return (
        <>
            <ToasterContext />
            <Outlet context={{ session }} />
        </>
    )
}

export default AppLayout