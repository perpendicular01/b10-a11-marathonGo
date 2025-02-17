import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Registration = () => {
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { createUser, updateProfileUser, signInGoogle, setUser } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,}$/;

        setErr('');
        setSuccess(false);

        if (password.length < 6) {
            setErr('Password must be at least 6 characters');
            return;
        }

        if (!passwordRegex.test(password)) {
            setErr('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            return;
        }

        try {
            const registerUser = await createUser(email, password);
            const profile = { displayName: name, photoURL: photo };
            setSuccess(true);
            await updateProfileUser(profile);
            setUser(registerUser.user);
            navigate('/');
            Swal.fire({
                title: "Registration done",
                icon: "success",
            });
        } catch (error) {
            const message = error.message;
            toast.error(`Error Message: ${message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                theme: "dark",
            });
        }
        e.target.reset();
    };

    const handleGoogle = async () => {
        try {
            const registerUser = await signInGoogle();
            setSuccess(true);
            navigate('/');
            Swal.fire({
                title: "Registration done",
                icon: "success",
            });
        } catch (error) {
            const message = error.message;
            toast.error(`Error Message: ${message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                theme: "dark",
            });
        }
    };

    return (
        <div className="flex justify-center items-center mt-12 font-poppins">
            <div className="w-[90%] md:w-[60%] lg:w-[35%] mx-auto bg-[#E7E8D1] px-6 md:px-10 py-3">
                <h2 className="font-semibold text-2xl md:text-3xl text-black text-center pt-3">Register</h2>
                <p className="text-center text-black py-2">
                    Continue with{" "}
                    <button
                        onClick={handleGoogle}
                        className="text-blue-600 underline"
                    >
                        Google
                    </button>
                </p>

                <form onSubmit={handleRegister} className="mx-auto space-y-5 pt-2 lg:pt-4">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label block mb-2">
                            <span className="label-text text-lg text-black">Your Name</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full h-12 text-base"
                            required
                        />
                    </div>

                    {/* Photo URL Field */}
                    <div className="form-control">
                        <label className="label block mb-2">
                            <span className="label-text text-lg text-black">Your Photo</span>
                        </label>
                        <input
                            name="photo"
                            type="text"
                            placeholder="Photo URL"
                            className="input input-bordered w-full h-12 text-base"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label block mb-2">
                            <span className="label-text text-lg text-black">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
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
                    </div>

                    {/* Register Button */}
                    <div className="form-control mt-6 text-center">
                        <button className="w-3/4 md:w-2/3 lg:w-1/2 px-10 py-2 rounded-lg bg-[#4B5563] text-white text-lg hover:bg-gray-700">
                            Register
                        </button>
                    </div>
                </form>

                {/* Error Message */}
                {err && (
                    <p className="m-3 text-center text-red-900">{err}</p>
                )}

                {/* Success Message */}
                {success && (
                    <p className="m-3 text-center text-green-600">
                        Registration successful
                    </p>
                )}

                {/* Login Link */}
                <div className="m-5 text-center">
                    <h2>
                        Already have an account? Please{" "}
                        <Link className="text-red-700 font-medium" to="/auth/login">
                            Login
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Registration;