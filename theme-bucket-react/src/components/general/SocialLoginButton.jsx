import React from 'react'
import { twMerge } from 'tailwind-merge'

const SocialLoginButton = ({
    imageUrl,
    label,
    className
}) => {
    return (
        <button
            className={twMerge('text-sm block w-full py-4 font-semibold text-white bg-black rounded-md relative bg-opacity-70 hover:bg-opacity-100', className)}>
            <img className="absolute h-5 top-[50%] -translate-y-[50%] left-4 aspect-square"
                src={imageUrl} />
            <span>{label}</span>
        </button>
    )
}

export default SocialLoginButton