import LogoLink from '../components/general/LogoLink'
import SocialLoginButton from '../components/general/SocialLoginButton'
import { IoMdClose } from 'react-icons/io'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
    const { session } = useOutletContext()

    useEffect(() => {
        if (session) {
            navigate('/')
        }
    }, [session])

    const navigate = useNavigate()

    return (
        <div className="fixed w-full h-full inset-0 bg-gray-lightest bg-opacity-50 z-20 flex justify-center items-center">
            <div
                className="bg-black-2 py-10 px-6 desktop:px-16 rounded-xl min-w-[320px] w-3/5 max-w-md flex flex-col justify-start items-center relative">
                <LogoLink className="text-4xl" to="/" type="simple" />
                <p className="mt-4 text-md font-normal leading-snug text-gray-200">
                    Log in or
                    <span className="uppercase font-bold"> Create an account</span>
                </p>
                <div className="mt-10 w-full flex flex-col justify-start items-center gap-3">
                    <SocialLoginButton imageUrl="/images/github-logo.svg" label="Continue with GitHub" provider="github" />
                    <SocialLoginButton imageUrl="/images/google-logo.svg" label="Continue with Google" className="bg-white text-black bg-opacity-90" provider="google" />
                </div>
                <div className="h-[1.5px] bg-gray-300 w-full mt-8"></div>
                <p className="text-sm text-center mt-10 text-gray-200 leading-normal">Account creation signifies agreement to
                    our
                    <span className="underline font-semibold cursor-pointer"> Terms and
                        Conditions.</span>
                </p>
                <button className="absolute top-6 right-6" onClick={() => navigate('/')}>
                    <IoMdClose className="flex justify-center items-center h-6 w-6 fill-yellow-ochre" />
                </button>
            </div>
        </div>
    )
}

export default Login