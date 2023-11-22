import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from '../../assets/others/authentication.png';
import login from '../../assets/others/authentication1.png';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha'
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {

    const [disabled, setDisabled] = useState(true)
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.form?.pathname || '/'

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Successfully Login');
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.log(err.message);
                toast.error(err.message);
            })
    }

    const handleCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <div className="min-h-screen flex gap-6 flex-col md:flex-row items-center justify-center" style={{ backgroundImage: bgImg }}>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div>
                <img className="md:max-w-lg" src={login} alt="loginImage" />
            </div>
            <div className="bg-white p-8 rounded shadow-md w-11/12 md:w-96">
                <h2 className="text-xl font-semibold mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input type="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" placeholder="Enter your email" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input type="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" placeholder="Enter your password" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">
                            <LoadCanvasTemplate />
                        </label>
                        <input onBlur={handleCaptcha} type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" placeholder="type the captcha" required />
                    </div>
                    <button disabled={disabled} type="submit" className="disabled:bg-gray-500 w-full bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
                    >Log In</button>
                    <SocialLogin></SocialLogin>
                    <p className="text-center text-gray-600 text-sm mt-4">
                        Don not have an account? <Link to="/signup" className="text-blue-500"> Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;