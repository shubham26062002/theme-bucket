import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const NavabarLink = ({
    type = 'desktop',
    to,
    label,
}) => {
    return (
        <NavLink className={twMerge('py-3 px-6 inline-block uppercase text-white text-sm tracking-widest hover:bg-yellow-ochre hover:text-brown transition font-semibold', type === 'mobile' && 'w-full text-center')}
            to={to}>{label}</NavLink>
    )
}

export default NavabarLink