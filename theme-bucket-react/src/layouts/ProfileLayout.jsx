import { Outlet, useNavigate, useParams, useOutletContext, useLoaderData } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import ProfileLink from '../components/profile/ProfileLink'
import LogOutButton from '../components/profile/LogOutButton'
import { FiUser, FiCreditCard } from 'react-icons/fi'
import { BiDollar } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiShutDownLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { supabase } from '../libs/supabase-client'

export const loader = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
        console.log('ERROR_AT_PROFILE_LAYOUT', 'SESSION_ERROR', sessionError)
        throw new Error('ERROR_AT_PROFILE_LAYOUT', 'SESSION_ERROR', sessionError)
    }

    const { data: profileData, error: profileError } = await supabase.from('profiles').select().eq('id', sessionData.session?.user.id)

    if (profileError) {
        console.log('ERROR_AT_PROFILE_LAYOUT', 'PROFILE_ERROR', profileError)
        throw new Error('ERROR_AT_PROFILE_LAYOUT', 'PROFILE_ERROR', profileError)
    }

    return profileData[0]
}

const ProfileLayout = () => {
    const { session } = useOutletContext()

    const { id } = useParams()

    const navigate = useNavigate()

    const profile = useLoaderData()

    useEffect(() => {
        if (id !== profile.id) {
            navigate('/')
        }
    })

    return (
        <main className="p-2">
            <div className="grid grid-cols-12 desktop:grid-cols-5 gap-2">
                <div className="hidden desktop:flex flex-col gap-2 min-h-screen h-fit sticky inset-0 top-2">
                    <div
                        className="rounded-md border-[1px] border-gray-400 shadow-md shadow-gray-300 py-4 px-6 flex items-center gap-6">
                        <img className="aspect-square w-14 object-cover rounded-full" src={session?.user.user_metadata.avatar_url}
                            alt={session?.user.user_metadata.full_name} />
                        <div>
                            <p className="text-gray-500 font-medium text-sm">Welcome!</p>
                            <h1 className="text-lg text-gray-700 font-semibold">{session?.user.user_metadata.full_name}</h1>
                        </div>
                    </div>
                    <div
                        className="flex-1 h-full rounded-md border-[1px] overflow-y-auto border-gray-400 shadow-sm shadow-gray-200 overflow-hidden">
                        <div className="flex flex-col h-full gap-3 p-3">
                            <ProfileLink to={`/profile/${session?.user.id}`} icon={FiUser} label="My Profile" />
                            <ProfileLink to={`/profile/${session?.user.id}/purchases`} icon={FiCreditCard} label="My Purchases" />
                            <ProfileLink to={`/profile/${session?.user.id}/wishlist`} icon={AiOutlineHeart} label="My Wishlist" />

                            {
                                profile?.role === 'SELLER'
                                    ?
                                    <ProfileLink to={`/profile/${session?.user.id}/sales`} icon={BiDollar} label="My Sales" />
                                    :
                                    <ProfileLink to={`/profile/${session?.user.id}/become-a-seller`} icon={BiDollar} label="Become a Seller" />
                            }

                            <LogOutButton label="Log out" icon={RiShutDownLine} />
                        </div>
                    </div>
                </div>
                <div
                    className="flex desktop:hidden flex-col gap-2 min-h-screen h-fit sticky inset-0 top-2 col-start-1 col-end-3">
                    <div className="rounded-md border-[1px] border-gray-400 shadow-md shadow-gray-300 p-3">
                        <img className="mx-auto aspect-square w-14 object-cover rounded-full" src={session?.user.user_metadata.avatar_url}
                            alt={session?.user.user_metadata.full_name} />
                    </div>

                    <div
                        className="flex-1 h-full rounded-md border-[1px] overflow-y-auto border-gray-400 shadow-sm shadow-gray-200 overflow-hidden">
                        <div className="flex flex-col h-full gap-3 p-1.5">
                            <ProfileLink to={`/profile/${session?.user.id}`} icon={FiUser} label="My Profile" type="mobile" />
                            <ProfileLink to={`/profile/${session?.user.id}/purchases`} icon={FiCreditCard} label="My Purchases" type="mobile" />
                            <ProfileLink to={`/profile/${session?.user.id}/wishlist`} icon={AiOutlineHeart} label="My Wishlist" type="mobile" />

                            {
                                profile?.role === 'SELLER'
                                    ?
                                    <ProfileLink to={`/profile/${session?.user.id}/sales`} icon={BiDollar} label="My Sales" type="mobile" />
                                    :
                                    <ProfileLink to={`/profile/${session?.user.id}/become-a-seller`} icon={BiDollar} label="Become a Seller" type="mobile" />
                            }

                            <LogOutButton label="Log out" icon={RiShutDownLine} type="mobile" />
                        </div>
                    </div>
                </div>
                <div
                    className="col-start-3 col-end-13 desktop:col-start-2 desktop:col-end-6 rounded-md border-[1px] border-gray-400 shadow-sm shadow-gray-200 py-12 px-10 desktop:px-20">
                    <Outlet context={{ session, profile }} />
                </div>
            </div>
        </main>
    )
}

export default ProfileLayout