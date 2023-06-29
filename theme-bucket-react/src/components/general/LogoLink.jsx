import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const LogoLink = ({
    to,
    type = 'colorful',
    className,
}) => {
    return (
        <Link className="group" to={to}>
            <h1 className={twMerge('font-space-grotesk text-[42px] font-bold tracking-tighter leading-tight text-brown group-hover:text-yellow-ochre transition', type === 'simple' && 'text-yellow-ochre', className)}
                id="header-logo">
                Theme<span
                    className={twMerge('text-yellow-ochre font-space-grotesk group-hover:text-brown transition', type === 'simple' && 'group-hover:text-yellow-ochre')}>Bucket</span>.
            </h1>
        </Link>
    )
}

export default LogoLink