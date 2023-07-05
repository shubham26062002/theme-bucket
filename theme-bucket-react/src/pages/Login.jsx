import { SessionProvider } from '../hooks/useSession'
import LoginCard from '../components/login/LoginCard'

const Login = () => {
    return (
        <SessionProvider>
            <div className="fixed w-full h-full inset-0 bg-gray-lightest bg-opacity-50 z-20 flex justify-center items-center">
                <LoginCard />
            </div>
        </SessionProvider>
    )
}

export default Login