import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { login, authProcessStatus, errorMessage, loggedInStatus } from '../../../store/slices/authSlice';

import { validateEmail, validatePassword } from '../../../utils/inputValidators';

function Index() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const authProcess = useSelector(authProcessStatus);
    const authError = useSelector(errorMessage)
    const isLoggedIn = useSelector(loggedInStatus)
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
      console.log(`is logged in ${isLoggedIn}`);
    

    }, [])




    const handleChange = (e) => {

        if (e.target.name === "email") {
            setEmail(e.target.value);
            return;
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
            return;
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email).isValid) {
            toast.warn(validateEmail(email).message);
            return;
        }
        if (!validatePassword(password).isValid) {
            toast.warn(validatePassword(password).message);
            return;
        }

        dispatch(
            login({ email, password })
        )
            .unwrap()
            .then(() => {
                toast.success("logged in");
                navigate("/", { replace: true });
            })
            .catch(() => {
                toast.error(authError);
            });


    }

    return (
        isLoggedIn?<Navigate to="/" replace = {true} />:
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden px-4">
                <div className="w-full p-6 m-auto  rounded-md shadow-xl shadow-primary/40  ring-2 ring-primary lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-base-content underline uppercase decoration-wavy">
                        Login
                    </h1>
                    <form className="mt-6" onSubmit={handleLogin}>

                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold  text-neutral-content"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered input-primary w-full mt-1"

                                id='email'
                                name='email'
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-neutral-content"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Your Password Of Atleast 6 Chars"
                                className="input input-bordered input-primary w-full mt-1"
                                id='password'
                                name='password'
                                value={password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mt-6">
                            <button
                                type='submit'
                                disabled={authProcess === "loading"}
                                className="w-full px-4 py-2 tracking-wide text-white transition-transform duration-200 transform bg-primary rounded-md hover:bg-primary-focus focus:outline-none active:scale-95"
                                onClick={handleLogin}
                            >
                                {
                                    authProcess === "loading" ?
                                        <AiOutlineLoading3Quarters className='animate-spin text-xl mx-auto' />
                                        :
                                        "Login"
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-neutral-content">

                        Dont Have Account? {" "}
                        <Link
                            to="/signup"
                            replace
                            className="font-medium text-secondary hover:underline"
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
    );
}


export default Index