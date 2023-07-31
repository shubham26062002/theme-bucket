import { Outlet, redirect, useLoaderData } from 'react-router-dom'

export const loader = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
        console.log('ERROR_AT_PROFILE_LAYOUT', 'SESSION_ERROR', error)
        throw new Error('ERROR_AT_PROFILE_LAYOUT', 'SESSION_ERROR', error)
    }

    if (!data.session) {
        throw redirect('/login')
    }

    return data.session
}

const AuthRequiredLayout = () => {
    const session = useLoaderData()

    return (
        <>
            <Outlet context={{ session }} />
        </>
    )
}

export default AuthRequiredLayout