import { useContext } from 'react'
import React from 'react'
import { FiUser } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { LoginPromptContext } from '../../layouts/RootLayout'

const LoginButton = ({
    type = 'desktop',
}) => {
    const { isLoginPromptOpen, setIsLoginPromptOpen } = useContext(LoginPromptContext)

    return (
        <button className={twMerge('flex justify-start rounded-full border-[1px] border-yellow-ochre items-center gap-2 py-2 px-5 hover:bg-yellow-ochre group transition', type === 'mobile' && 'justify-center w-full text-center py-3')} onClick={() => { setIsLoginPromptOpen(true) }}>
            <span className="font-medium text-sm text-yellow-ochre group-hover:text-white transition">Log in</span>
            <FiUser className="flex justify-start items-center h-5 w-5 stroke-yellow-ochre group-hover:stroke-white transition" />
        </button>
    )
}

export default LoginButton