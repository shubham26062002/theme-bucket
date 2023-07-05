import React from 'react'
import { twMerge } from 'tailwind-merge'
import { supabase } from '../../libs/supabase-client'

const SocialLoginButton = ({
    imageUrl,
    label,
    className,
    provider,
}) => {
    const onClick = async (provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
        })

        if (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <button
            className={twMerge('text-sm block w-full py-4 font-semibold text-white bg-black rounded-md relative bg-opacity-70 hover:bg-opacity-100', className)} onClick={() => onClick(provider)}>
            <img className="absolute h-5 top-[50%] -translate-y-[50%] left-4 aspect-square"
                src={imageUrl} />
            <span>{label}</span>
        </button>
    )
}

export default SocialLoginButton