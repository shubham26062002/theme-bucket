import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesLinks = ({
    label,
    to,
}) => {
    return (
        <Link className="font-medium py-2 border-[1px] border-gray-300 text-sm text-gray-500 hover:text-gray-700 rounded hover:border-gray-500 transition hover:bg-gray-lightest px-4 inline-block w-full"
            to={to}>{label}</Link>
    )
}

export default CategoriesLinks