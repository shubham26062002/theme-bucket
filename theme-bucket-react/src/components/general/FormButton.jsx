import React from 'react'
import { twMerge } from 'tailwind-merge'

const FormButton = ({
    label,
    onClick,
    type = 'button',
    disabled = false,
}) => {
    return (
        <button
            className={twMerge('mr-4 inline-block mt-10 py-2 px-6 bg-yellow-ochre bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100', disabled && 'opacity-50 cursor-not-allowed')} onClick={onClick} type={type} disabled={disabled}>{label}</button>
    )
}

export default FormButton