import { useForm } from 'react-hook-form';
import bgImg from '../../assets/others/authentication.png';
import signup from '../../assets/others/authentication2.png';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset()
                                    toast.success('User Created Successfully')
                                    navigate('/')
                                }
                            })
                    })
                    .catch((err) => console.log(err))
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div className="min-h-screen flex gap-6 flex-col md:flex-row-reverse items-center justify-center" style={{ backgroundImage: bgImg }}>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div>
                <img className="md:max-w-lg" src={signup} alt="loginImage" />
            </div>
            <div className="bg-white p-8 rounded shadow-md w-11/12 md:w-96">
                <h2 className="text-xl font-semibold mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Name</label>
                        <input type="text" {...register("name", { required: true })} name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" placeholder="Enter your name" />
                        {errors.name && <span className='text-red-500'>Name is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input type="email" {...register("email", { required: true })} name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" placeholder="Enter your email" />
                        {errors.email && <span className='text-red-500'>Email is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Photo URL</label>
                        <input type="text" {...register("photoURL", { required: true })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" placeholder="Enter your Photo URL" />
                        {errors.photoURL && <span className='text-red-500'>Photo is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*()_+])/
                        })} name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" placeholder="Enter your password" />
                        {errors.password?.type === 'required' && <span className='text-red-500'>Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className='text-red-500'>Password must be at least 6</span>}
                        {errors.password?.type === 'pattern' && <span className='text-red-500'>Password must have one upper case and special character</span>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
                    >Sign Up</button>                    
                    <p className="text-center text-gray-600 text-sm my-4">
                        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                    </p>
                    <SocialLogin></SocialLogin>
                </form>
            </div>
        </div>
    );
};

export default SignUp;