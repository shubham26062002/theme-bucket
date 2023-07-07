import { useNavigate } from 'react-router-dom'
import { twMerge } from "tailwind-merge"

const LogOutButton = ({
    label,
    icon: Icon,
    type = 'desktop',
}) => {
    const navigate = useNavigate()

    const onClick = async () => {
        const { error } = await supabase.auth.signOut()
        window.location.reload()
    }

    return (
        <button className={twMerge('mt-auto w-full py-4 bg-yellow-ochre bg-opacity-90 text-opacity-90 hover:text-opacity-100 rounded-full hover:bg-opacity-100 hover:text-white px-6 text-sm font-medium text-white flex items-center gap-4', type === 'mobile' && 'py-2 px-0 inline-block')}
            onClick={onClick}>
            <Icon className={twMerge('flex justify-center items-center w-5 h-5 text-white', type === 'mobile' && 'mx-auto')} size={24} />
            {type === 'desktop' && <span>{label}</span>}
        </button>
    )
}

export default LogOutButton