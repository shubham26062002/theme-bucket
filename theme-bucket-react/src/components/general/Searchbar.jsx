import { twMerge } from 'tailwind-merge'
import { BiSearch } from 'react-icons/bi'

const Searchbar = ({
    type = 'desktop',
    placeholder = 'I\'m looking for...',
    id,
}) => {
    return (
        <div className={twMerge(type === 'mobile' && 'pt-4 pb-8 mx-6')}>
            <div className={twMerge('flex justify-start rounded-full items-center border-[1px] border-brown focus-within:ring-2 ring-yellow-ochre', type === 'mobile' && 'inline-flex w-full')}
                id="searchbar">
                <select className="text-sm font-semibold py-2 px-4 focus:outline-none rounded-l-full text-brown">
                    <option disabled selected hidden>Filter by</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <input className={twMerge('py-[8.4px] px-4 focus:outline-none text-sm min-w-[320px]', type === 'mobile' && 'inline-block w-full min-w-0')} placeholder={placeholder}
                    id={id} />
                <button className="flex justify-start items-center p-3 rounded-r-full bg-yellow-ochre">
                    <BiSearch className="flex justify-start items-center h-4 w-4 fill-white" />
                </button>
            </div>
        </div>
    )
}

export default Searchbar