import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        navigate('/')
                    })
            })
    }

    return (
        <div>
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white rounded-lg py-2 font-semibold hover:bg-red-600 flex gap-2 items-center justify-center"
            ><FaGoogle></FaGoogle>Login with Google</button>
        </div>
    );
};

export default SocialLogin;