import { useContext, useRef, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';

import runn from '../assets/runn.json'


const Login = () => {
    const { signIn, setUser, signInGoogle } = useContext(AuthContext)

    const location = useLocation()
    // console.log(path)

    const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [inputEmail, setInputEmail] = useState('')
    const emailRef = useRef()

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')

        // console.log(email, password)

        try {
            const res = await signIn(email, password)
            setUser(res.user)
            // console.log(res.user)
            Swal.fire({
                title: "Login successfully",
                icon: "success",
            });
            navigate(location?.state ? location.state : '/')
            // previous page state a thake 

        }
        catch (error) {
            const message = error.message
            const code = error.code

            toast.error(`Incorrect Password`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                theme: "dark",

            });
        }
        form.reset()
    }

    const handleGoogle = async () => {
        try {
            const registerUser = await signInGoogle()
            setSuccess(true)
            Swal.fire({
                title: "Campaign updated successfully!",
                icon: "success",
            });
            // console.log(registerUser.user)
            navigate(location?.state ? location.state : '/')
        }
        catch (error) {
            const message = error.message
            const code = error.code

            toast.error(`Error Message: ${message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                theme: "dark",

            });
        }
    }

    const handleForgetPass = async () => {

    }


    return (
        <div className="flex justify-center items-center mt-16 font-poppins">
            <div className="w-[90%] md:w-[60%] lg:w-[35%] mx-auto bg-[#E7E8D1] px-6 md:px-10 py-3">
                
                <h2 className="font-semibold text-2xl md:text-3xl text-black text-center pt-3">Login</h2>
                    
                
                <p className="text-center text-black py-2">
                    Continue with{" "}
                    <button
                        onClick={handleGoogle}
                        className="text-blue-600 underline"
                    >
                        Google
                    </button>
                </p>

                <form onSubmit={handleLogin} className="mx-auto space-y-5 pt-2 lg:pt-4">
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label block mb-2">
                            <span className="label-text text-lg text-black">Email</span>
                        </label>
                        <input
                            ref={emailRef}
                            name="email"
                            type="email"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="input input-bordered w-full h-12 text-base"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label block mb-2">
                            <span className="label-text text-lg text-black">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="w-full input input-bordered h-12 text-base"
                                required
                            />
                            <span
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <label onClick={handleForgetPass} className="label mt-2">
                            <Link
                                to={"/auth/forgetpassword"}
                                state={{ inputEmail }}
                                className="underline label-text-alt link link-hover text-blue-800"
                            >
                                Forgot password?
                            </Link>
                        </label>
                    </div>

                    {/* Login Button */}
                    <div className="form-control mt-6 text-center">
                        <button className="w-3/4 md:w-2/3 lg:w-1/2 px-10 py-2 rounded-lg bg-[#4B5563] hover:bg-gray-700 text-white text-lg ">
                            Login
                        </button>
                    </div>
                </form>

                {/* Success Message */}
                {success && (
                    <p className="m-3 text-center text-green-600">
                        User Login successful
                    </p>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <p className="m-3 text-center text-red-900">{errorMessage}</p>
                )}

                {/* Register Link */}
                <div className="m-5 text-center">
                    <h2>
                        Don't have an account? Please{" "}
                        <Link className="text-red-700 font-medium" to="/auth/register">
                            Register
                        </Link>
                    </h2>
                </div>
            </div>
        </div>


    );
};

export default Login;