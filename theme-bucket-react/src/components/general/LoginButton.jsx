import { Link } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'

const LoginButton = ({
    type = 'desktop',
}) => {
    return (
        <Link className={twMerge('flex justify-start rounded-full border-[1px] border-yellow-ochre items-center gap-2 py-2 px-5 hover:bg-yellow-ochre group transition', type === 'mobile' && 'justify-center w-full text-center py-3')} to="/login">
            <span className="font-medium text-sm text-yellow-ochre group-hover:text-white transition">Log in</span>
            <FiUser className="flex justify-start items-center h-5 w-5 stroke-yellow-ochre group-hover:stroke-white transition" />
        </Link>
    )
}

export default LoginButton