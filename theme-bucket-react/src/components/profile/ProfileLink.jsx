import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const ProfileLink = ({
    to,
    icon: Icon,
    label,
    type = 'desktop'
}) => {
    return (
        <NavLink className={twMerge('w-full py-4 bg-gray-lightest rounded-md border-[1px] border-gray-400 hover:bg-black-2 hover:bg-opacity-90 hover:text-white px-6 text-sm font-medium text-gray-500 flex items-center gap-4 truncate', type === 'mobile' && 'py-2 px-0 inline-block')}
            to={to}>
            <Icon className={twMerge('flex justify-center items-center w-5 h-5', type === 'mobile' && 'mx-auto')} size={24} />
            {type === 'desktop' && <span>{label}</span>}
        </NavLink>
    )
}

export default ProfileLink