import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'

const CartLink = ({
    to,
    order,
}) => {
    return (
        <Link className="flex justify-start items-center relative" to={to}>
            <FiShoppingBag className="flex justify-start items-center h-6 w-6 stroke-brown" />
            <div
                className="bg-yellow-ochre text-white absolute text-[10px] font-medium py-1 leading-none w-[18px] top-0 right-0 translate-x-[40%] translate-y-[-40%] text-center rounded-full">
                {(order && order.order_items.length) | 0}
            </div>
        </Link>
    )
}

export default CartLink