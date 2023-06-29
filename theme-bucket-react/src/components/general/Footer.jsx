import LogoLink from './LogoLink'
import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import { BsFacebook, BsLinkedin } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import FooterLinksContainer from './FooterLinksContainer'

const Footer = () => {
    return (
        // Responsive Footer
        <footer className="py-12 bg-black-2">
            <div className="mx-10 desktop:mx-28 mb-10 flex flex-col desktop:flex-row justify-between items-center gap-1">
                <LogoLink to="/" type="simple" className="text-4xl" />
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
            <div className="mx-10 desktop:mx-28 grid grid-cols-2 desktop:grid-cols-4 gap-16">
                <FooterLinksContainer
                    containerLabel="Browse Categories"
                    linksArray={[
                        {
                            label: "Themes & Templates",
                            to: "#"
                        },
                        {
                            label: "Categories",
                            to: "#"
                        }]}
                />
                <FooterLinksContainer
                    containerLabel="How To Buy?"
                    linksArray={[
                        {
                            label: "Explore ThemeBucket",
                            to: "#"
                        },
                        {
                            label: "Log in",
                            to: "#"
                        },
                        {
                            label: "Create an Account",
                            to: "#"
                        }]}
                />
                <FooterLinksContainer
                    containerLabel="How to Sell?"
                    linksArray={[
                        {
                            label: "Seller's Guide",
                            to: "#"
                        },
                        {
                            label: "Upload Instructions",
                            to: "#"
                        }]}
                />
                <FooterLinksContainer
                    containerLabel="Social"
                    linksArray={[
                        {
                            label: "Email",
                            to: "#"
                        },
                        {
                            label: "GitHub",
                            to: "#"
                        },
                        {
                            label: "Twitter",
                            to: "#"
                        },
                        {
                            label: "Facebook",
                            to: "#"
                        },
                        {
                            label: "LinkedIn",
                            to: "#"
                        },
                        {
                            label: "Instagram",
                            to: "#"
                        }]}
                />
            </div>
            <div className="text-center font-medium mt-10">
                <span className="text-white text-xl block">&#169; 2023 ThemeBucket</span>
                <span className="block font-normal text-lg text-gray-300">All rights reserved. Made in India</span>
            </div>
        </footer >
    )
}

export default Footer