import { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoLink from './LogoLink'
import Searchbar from './Searchbar'
import CartLink from './CartLink'
import WishlistLink from './WishlistLink'
import LoginButton from './LoginButton'
import NavbarLink from './NavabarLink'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import { BsFacebook, BsLinkedin } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'

const Navbar = ({
    session,
    categories,
    order,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => false)

    const sidebarStyles = {
        opacity: isSidebarOpen ? 1 : 0.85,
        transform: isSidebarOpen ? 'scale(1) translateX(0)' : 'scale(0.85) translateX(110%)'
    }

    return (
        <div>
            {/* Desktop Navbar */}
            <header className="hidden desktop:block">
                <div className="py-4 mx-28 flex justify-between items-center">
                    <LogoLink to="/" />
                    <Searchbar categories={categories} />
                    <div className="flex items-center justify-start gap-5">
                        <CartLink to="/cart" order={order} />
                        <WishlistLink to="/wishlist" />

                        {
                            session
                                ?
                                <Link className="flex justify-center items-center rounded-full overflow-hidden" to={`profile/${session?.user.id}`}>
                                    <img className="h-8 w-8 aspect-square object-cover" src={session?.user.user_metadata.avatar_url}
                                        alt="User Name" />
                                </Link>
                                :
                                <LoginButton />
                        }

                    </div>
                </div>
                <nav className="mt-3 px-28 bg-black-2">
                    <div>
                        <NavbarLink to="/" label="Home" />
                        <NavbarLink to="/categories" label="Categories" />
                    </div>
                </nav>
            </header>
            {/* Mobile Navbar */}
            <header className="desktop:hidden ">
                <div className="py-4 mx-6 flex justify-between items-center">
                    <LogoLink className="text-4xl" to="/" />
                    <div className="flex items-center justify-start gap-5">
                        <CartLink to="/cart" order={order} />
                        <WishlistLink to="/wishlist" />
                        <button
                            className="flex justify-start items-center p-1.5 rounded-sm bg-yellow-ochre bg-opacity-80 hover:bg-opacity-100 transition"
                            id="open-sidebar" onClick={() => setIsSidebarOpen(true)}>
                            <GiHamburgerMenu className="flex justify-start items-center h-5 w-5 stroke-brown" />
                        </button>
                    </div>
                </div>
                <Searchbar type="mobile" categories={categories} />
                <div className="h-3 bg-black-2"></div>
            </header>
            {/* Mobile Sidebar */}
            <aside
                className="py-16 desktop:hidden fixed top-0 right-0 bottom-0 h-screen w-4/5 min-w-[256px] max-w-[380px] bg-black-2 z-10 bg-opacity-95 transition-all duration-700 ease-in-out" style={sidebarStyles}>
                <div className=" h-full w-full flex flex-col justify-around items-center">
                    <LogoLink type="simple" className="text-4xl" to="/" />
                    <div>
                        <div className="flex flex-col justify-center items-center gap-1.5">
                            <NavbarLink type="mobile" to="/" label="Home" />
                            <NavbarLink type="mobile" to="/categories" label="Categories" />
                        </div>
                        <div className="mt-4">

                            {session
                                ?
                                <Link className="flex justify-center items-center rounded-full w-fit mx-auto gap-3 group opacity-80 hover:opacity-100 transition overflow-hidden"
                                    to={`profile/${session?.user.id}`}>
                                    <img className="h-8 w-8 aspect-square object-cover rounded-full"
                                        src={session?.user.user_metadata.avatar_url} alt="User Name" />
                                </Link>
                                :
                                <LoginButton type="mobile" />
                            }


                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-3">
                        <Link to="#" className="flex justify-center items-center group">
                            <MdEmail className="flex justify-center items-center h-6 w-6 fill-gray-400 group-hover:fill-gray-100 transition" />
                        </Link>
                        <Link to="#" className="flex justify-center items-center group">
                            <FaGithub className="flex justify-center items-center h-5 w-5 fill-gray-400 group-hover:fill-gray-100 transition" />
                        </Link>
                        <Link to="#" className="flex justify-center items-center group">
                            <FaTwitter className="flex justify-center items-center h-5 w-5 fill-gray-400 group-hover:fill-gray-100 transition" />
                        </Link>
                        <Link to="#" className="flex justify-center items-center group">
                            <BsFacebook className="flex justify-center items-center h-5 w-5 fill-gray-400 group-hover:fill-gray-100 transition" />
                        </Link>
                        <Link to="#" className="flex justify-center items-center group">
                            <BsLinkedin className="flex justify-center items-center h-5 w-5 fill-gray-400 group-hover:fill-gray-100 transition" />
                        </Link>
                        <Link to="#" className="flex justify-center items-center group">
                            <FaInstagram className="flex justify-center items-center h-5 w-5 fill-gray-400 group-hover:fill-gray-100 transition" />
                        </Link>
                    </div>
                </div>
                <button className="absolute top-6 right-6" onClick={() => setIsSidebarOpen(false)}>
                    <IoMdClose className="flex justify-center items-center h-6 w-6 fill-yellow-ochre" />
                </button>
            </aside>
        </div >
    )
}

export default Navbar