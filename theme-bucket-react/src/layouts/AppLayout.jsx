import { Outlet, useLoaderData } from 'react-router-dom'
import { supabase } from '../libs/supabase-client'
import ToasterContext from '../hooks/ToasterContext'

export const loader = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
        console.log('ERROR_AT_APP_LAYOUT', error)
        throw new Error('ERROR_AT_APP_LAYOUT', error)
    }

    if (!sessionData.session) {
        return [null, null, null]
    }

    const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', sessionData.session.user.id)
        .eq('is_completed', false).single()

    const { data: wishlistData, error: wishlistError } = await supabase
        .from('liked_products')
        .select('*')
        .eq('user_id', sessionData.session.user.id)

    return [sessionData.session, orderData, wishlistData]
}

const AppLayout = () => {
    const [session, order, wishlist] = useLoaderData()

    return (
        <>
            <ToasterContext />
            <Outlet context={{ session, order, wishlist }} />
        </>
    )
}

export default AppLayout