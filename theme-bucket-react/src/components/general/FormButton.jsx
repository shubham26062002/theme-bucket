import React from 'react'

const FormButton = ({
    label,
    onClick,
    type = 'button',
}) => {
    return (
        <button
            className="mr-4 inline-block mt-10 py-2 px-6 bg-yellow-ochre bg-opacity-90 text-white rounded-md font-semibold hover:bg-opacity-100 transition text-opacity-90 hover:text-opacity-100" onClick={onClick}>{label}</button>
    )
}

export default FormButton