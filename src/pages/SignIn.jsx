import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { Input, ToastNotification } from '../components'
import { auth } from '../firebase.config';
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import img from '../img/signin.jpg'

const SignIn = () => {
    let navigate = useNavigate();

    const [{ user, temporaryParam }, dispatch] = useStateValue();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hidepassword, setHidePassword] = useState(true)

    // Sign in Emaill and Password
    const handledSignIn = async (e) => {
        e.preventDefault();
        try {
            const {
				user: { refreshToken, providerData },
			} = await signInWithEmailAndPassword(auth, email, password);
			dispatch({
				type: actionType.SET_USER,
				user: providerData[0],
			});
			localStorage.setItem("user", JSON.stringify(providerData[0]));
            navigate(temporaryParam ? temporaryParam : "/")
        } catch (err) {
            alert(err)
        }
    }

    // Get Password when User forgot
    const forgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            handleToastNotification();
        } catch (err) {
            alert(err)
        }
    }

    // Toast Message success
    const [showToast, setShowToast] = useState(false);
    const handleToastNotification = () => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false)
        }, 2500);
    }

    return (
        <div className="fixed inset-0 z-[999] w-full h-screen flex">
            {showToast && <ToastNotification message="Password reset Email sent successfully !!" type="Success"/>}
            <div className="relative w-0 md:w-1/2 h-full">
                <img src={img} className="absolute top-0 left-0 w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-1/2 h-full flex justify-center items-center bg-white">
                <div className="w-3/4 lg:w-1/2">
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-10 border-b-4 border-b-orange-600 inline-block uppercase">Sign in</h2>
                    <form onSubmit={handledSignIn} className="space-y-3">
                        <div>
                            <Input label="Email" type="text" placeholder="Ex: admin@gmail.com" value={email} setValue={setEmail} />
                        </div>
                        <div className="relative">
                            <Input label="Password" type={hidepassword ? "password" : "text"} placeholder="Ex: admin123" value={password} setValue={setPassword} />
                            {hidepassword ? 
                                <FaRegEyeSlash
                                    className="absolute bottom-[15px] right-[15px]"
                                    onClick={() => setHidePassword(false)}                                        
                                />
                                :
                                <FaRegEye
                                    className="absolute bottom-[15px] right-[15px]"
                                    onClick={() => setHidePassword(true)}
                                />
                            }                            
                        </div>
                        <div>
                            <span className="text-sm cursor-pointer hover:border-b hover:border-black" onClick={forgotPassword}>Forgot password ?</span>
                        </div>
                        <p className="text-sm">Dont' have an account ? <span className="cursor-pointer hover:border-b hover:border-black" onClick={() => navigate('/signup')}>Sign up</span></p>
                        <button data-variant="flat" className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 hover:shadow-cart w-full">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn