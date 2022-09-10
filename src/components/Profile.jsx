import React, { useState } from 'react'
import { updateProfile, updatePassword  } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

import { useStateValue } from '../context/StateProvider';
import { auth, storage } from '../firebase.config';
import { actionType } from '../context/reducer';
import Input from './Input';

import { MdModeEditOutline } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import img from "../img/shield.webp"
import ToastNotification from './ToastNotification';

const Profile = () => {
    const [{ user }, dispatch] = useStateValue();

    const [name, setName] = useState(user.displayName)
    const [hidepassword, setHidePassword] = useState(true)
    const [password, setPassword] = useState("")
    const [noEdit, setNoEdit] = useState(true)
    const [isSubmitInfo, setisSubmitInfo] = useState(false)
    const [isSubmitPass, setisSubmitPass] = useState(false)

    const uploadAva = (e) => {
        const deleteRef = ref(storage, user.photoURL)
        deleteObject(deleteRef).then(() => {
            console.log("Avatar Deleted Successfully")
        })
        const avaFile = e.target.files[0]
        const storageRef = ref(storage, `AvatarUsers/${Date.now()}`)
        uploadBytes(storageRef, avaFile)
        .then((snapshot) => {
            getDownloadURL(storageRef).then((url) => {
                updateProfile(auth.currentUser, {
                    photoURL: url
                })
                dispatch({
                    type: actionType.SET_USER,
                    user: {...user, photoURL: url},
                });
                localStorage.setItem("user", JSON.stringify({...user, photoURL: url}));
            })
        })
        .catch((error) => {
            alert(error)
        })
    }

    // Toast Message success
    const [showToast, setShowToast] = useState(false);
    const handleToastNotification = () => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false)
        }, 2500);
    }

    // Change Information
    const handleInformation = async () => {
        try {
            setisSubmitInfo(true);
            if(name) {
                let text = 'Do you want to change your information ?';
                if (window.confirm(text) === true) {
                    await updateProfile(auth.currentUser, {
                        displayName: name,
                    })
                    dispatch({
                        type: actionType.SET_USER,
                        user: {...user, displayName: name,},
                    });
                    localStorage.setItem("user", JSON.stringify({...user, displayName: name,}));
                }
            }
        } catch (err) {
            alert(err);
        }
    }

    // Change Password
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            setisSubmitPass(true)
            if(password) {
                let text = 'Do you want to change your password ?';
                if (window.confirm(text) === true) {
                    await updatePassword(auth.currentUser, password);
                    handleToastNotification();
                }
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className='h-full'>
            {showToast && <ToastNotification message="Password is update successfully !!" type="Success"/>}
            <div className="flex items-center gap-5 py-7 px-10 border-y border-gray-200">
                <img src={img} className="w-28 aspect-square rounded-full object-cover border border-gray-200" />
                <div>
                    <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Personal Information</h1>
                    <p className="text-sm font-medium text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div> 
            <div className="py-5 px-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                <div className="w-auto h-fit py-5 px-5 flex flex-col items-center bg-white rounded-md shadow-md">
                    <div className="py-3 flex flex-col items-center">
                        <div className="relative">
                            <img src={user.photoURL} className="w-24 aspect-square rounded-full object-cover border border-gray-200" />                            
                            <label htmlFor='uploadingAva' className="absolute bottom-2 right-2 p-1 bg-amber-500 rounded-full cursor-pointer">
                                    <MdModeEditOutline />
                                    <input
                                        type='file'
                                        name='uploadingAva'
                                        id='uploadingAva'
                                        accept='image/*'
                                        className='hidden'
                                        onChange={uploadAva}
                                    />
                            </label>
                        </div>
                        <h1 className="text-lg font-semibold leading-relaxed text-gray-800">{user.displayName}</h1>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-3 text-gray-500">
                            <IoMail/>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500">
                            <FaPhoneAlt/>
                            <p>{user.phoneNumber ? user.phoneNumber : "None"}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 h-auto flex flex-col gap-4">
                    <div className=" py-5 px-8 bg-white rounded-md shadow-md">
                        <h4 className="text-2xl md:text-lg font-bold pb-7 md:pb-10 lg:pb-6 -mt-1">Change your information here</h4>
                        <div className="space-y-3">
                            <div>
                                <Input label="Name and Surname" type="text" value={name} setValue={setName} disabled={noEdit} style={name.trim().length === 0 && isSubmitInfo ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                                    {name.trim().length === 0 && isSubmitInfo &&
                                        <p className="my-2 text-xs text-red-500">You have to fill in your name</p>
                                    }    
                                </Input>
                            </div>
                            <div>
                                <Input label="Email" type="text" value={user.email} disabled={true}/>
                            </div>
                            <div className="flex justify-end space-x-2">
                                {noEdit ? <button onClick={() => setNoEdit(false)} className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 hover:shadow-cart w-full sm:w-auto">Edit</button> 
                                    :
                                        <>
                                            <button onClick={() => {setNoEdit(true); setisSubmitInfo(false); setName(user.displayName)}} className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 hover:shadow-cart w-full sm:w-auto">Cancel</button>
                                            <button onClick={handleInformation} className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 hover:shadow-cart w-full sm:w-auto">Change</button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="py-5 px-8 bg-white rounded-md shadow-md">
                        <h4 className="text-2xl md:text-lg font-bold pb-7 md:pb-10 lg:pb-6 -mt-1">Change your password</h4>
                        <form onSubmit={handleChangePassword} className="space-y-3">
                            <div className="relative">
                                <Input label="Password" type={hidepassword ? "password" : "text"} value={password} setValue={setPassword} style={password.trim().length === 0 && isSubmitPass ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                                    {password.trim().length === 0 && isSubmitPass &&
                                        <p className="my-2 text-xs text-red-500">You have to fill in your password</p>
                                    }
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
                                </Input>
                            </div>
                            <div className="flex justify-end">
                                <button data-variant="flat" className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 hover:shadow-cart w-full sm:w-auto">Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile