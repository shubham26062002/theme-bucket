import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoriesLinks = ({
    label,
    to,
}) => {
    return (
        <NavLink className={({isActive})=>isActive?"categoriessidebarlink text-gray-700 border-gray-500 bg-gray-lightest":"categoriessidebarlink border-gray-300 text-gray-500 transition"}
            to={to}>{label}</NavLink>
    )
}

export default CategoriesLinks