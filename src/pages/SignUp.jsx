import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { Input } from '../components'
import { auth, storage } from '../firebase.config';

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdCloudUpload, MdAddPhotoAlternate } from 'react-icons/md'

import img from '../img/signin.jpg'

const SignUp = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [hidepassword, setHidePassword] = useState(true)
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [photoURL, setPhotoURL] = useState("")

    // Upload Avatar User
    const uploadAvatar = (e) => {
        const imgFile = e.target.files[0]
        const storageRef = ref(storage, `AvatarUsers/${Date.now()}`)
        uploadBytes(storageRef, imgFile)
        .then((snapshot) => {
            getDownloadURL(storageRef).then((url) => {
                setPhotoURL(url)
            })
        })
        .catch((error) => {
            alert(error)
        })
    }

    // Sign up
    const handledSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser, {
                displayName: displayName, photoURL: photoURL
            })
            navigate("/signin")
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="fixed inset-0 z-[999] w-full h-screen flex">
            <div className="relative w-0 md:w-1/2 h-full">
                <img src={img} className="absolute top-0 left-0 w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-1/2 h-full flex justify-center items-center bg-white">
                <div className="w-3/4 lg:w-1/2">
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-10 border-b-4 border-b-orange-600 inline-block uppercase">Sign up</h2>
                    <form onSubmit={handledSignUp} className="space-y-3">
                        <div>
                            <h3 className="text-gray-600 font-semibold text-sm leading-none mb-3">Avatar</h3>
                            <div className="flex flex-col justify-center items-center gap-3">
                                {photoURL ? 
                                    <img src={photoURL} className="w-32 aspect-square rounded-full object-cover border border-gray-200" />
                                    :
                                    <div className="flex flex-col justify-center items-center w-32 aspect-square rounded-lg border-2 border-dashed">
                                        <MdCloudUpload className='text-gray-500 text-2xl hover:text-gray-700' />
                                        <p className='text-sm text-gray-500 text-center'>No file chosen, yet !</p>
                                    </div>
                                }

                                <label htmlFor='uploadingAva' className="h-fit px-4 py-2 flex items-center gap-2 bg-amber-500 rounded-lg cursor-pointer">
                                        <MdAddPhotoAlternate className="text-xl text-white"/>
                                        <p className="text-white text-sm font-semibold">Choose a Photo</p>
                                        <input
                                            type='file'
                                            name='uploadingAva'
                                            id='uploadingAva'
                                            accept='image/*'
                                            className='hidden'
                                            onChange={uploadAvatar}
                                        />
                                </label>
                            </div>
                        </div>
                        <div>
                            <Input label="Name" type="text" value={displayName} setValue={setDisplayName}/>
                        </div>
                        <div>
                            <Input label="Email" type="text" value={email} setValue={setEmail}/>
                        </div>
                        <div className="relative">
                            <Input label="Password" type={hidepassword ? "password" : "text"} value={password} setValue={setPassword}/>
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
                            <p className="text-sm">Already have an account ? <span className="cursor-pointer hover:border-b hover:border-black" onClick={() => navigate('/signin')}>Sign in</span></p>
                        </div>
                        <button data-variant="flat" className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 hover:shadow-cart w-full">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp