import { Outlet, Navigate, useParams } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import ProfileLink from '../components/profile/ProfileLink'
import LogOutButton from '../components/profile/LogOutButton'
import { FiUser, FiCreditCard } from 'react-icons/fi'
import { BiDollar } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiShutDownLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'

const ProfileLayout = () => {
    const { id } = useParams()

    const { session } = useSession()

    if (!session) {
        console.log('redirect because no session')
        return <Navigate to="/login" />
    }

    if (id !== session?.user.id) {
        console.log('redirect because not same user')
        return <Navigate to="/" />
    }

    const [profile, setProfile] = useState(() => null)

    useEffect(() => {
        const getProfile = async () => {
            if (session) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', session?.user.id)
                setProfile(data[0])
            }
        }
        getProfile()
    }, [session?.user.id])

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
                    {session && profile ?
                        <Outlet context={{ session, profile }} />
                        :
                        <p>Loading...</p>
                    }
                </div>
            </div>
        </main>
    )
}

export default ProfileLayout