import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood } from 'react-icons/md'
import { setDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { categories } from '../../utils/data'
import { Loading } from '../../components'
import { firestore, storage } from '../../firebase.config'
import { IoClose } from "react-icons/io5";

const CreateModal = ({ closeModal }) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState(null)
    const [imageAsset, setImageAsset] = useState(null)
    const [fields, setFields] = useState(false)
    const [alertStatus, setAlertStatus] = useState('danger')
    const [msg, setMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [sizes, setSizes] = useState([])

    async function saveItem(data) {
        await setDoc(doc(firestore, 'products', `${data.id}`), data, { merge: true })
    }

    function uploadImage(e) {
        setIsLoading(true)
        const imgFile = e.target.files[0]
        const storageRef = ref(storage, `Images/${imgFile.name}`)
        uploadBytes(storageRef, imgFile)
            .then((snapshot) => {
                getDownloadURL(storageRef).then((url) => {
                    setIsLoading(false)
                    setImageAsset(url)
                    setFields(true)
                    setMsg('Image Uploaded Successfully')
                    setAlertStatus('success')
                    setTimeout(() => {
                        setFields(false)
                    }, 4000)
                })
            })
            .catch((error) => {
                setFields(true)
                setAlertStatus('danger')
                setMsg('Something Wrong - Try Again')
                setTimeout(() => {
                    setFields(false)
                    setIsLoading(false)
                }, 4000)
            })
    }

    function deleteImage() {
        setIsLoading(true)
        const deleteRef = ref(storage, imageAsset)
        deleteObject(deleteRef).then(() => {
            setImageAsset(null)
            setIsLoading(false)
            setFields(true)
            setMsg('Image Deleted Successfully')
            setAlertStatus('success')
            setTimeout(() => {
                setFields(false)
            }, 4000)
        })
    }

    function saveDetail() {
        setIsLoading(true)
        try {
            if (!title || !imageAsset || !category || !price) {
                setFields(true)
                setAlertStatus('danger')
                setMsg(`Required fields can't be empty`)
                setIsLoading(false)
                setTimeout(() => {
                    setFields(false)
                }, 4000)
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    price: Number(price),
                    size: sizes,
                    reviews: [],
                }
                saveItem(data)
                setFields(true)
                setAlertStatus('success')
                setMsg('Data Uploaded Successfully')
                setIsLoading(false)
                setTitle('')
                setPrice('')
                setSizes([])
                setImageAsset(null)
                setTimeout(() => {
                    setFields(false)
                }, 4000)
            }
        } catch (error) {
            setFields(true)
            setAlertStatus('danger')
            setMsg('Something Wrong - Try Again')
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000)
        }
    }

    function handleSize(e) {
        console.log()
        if (e.target.checked) {
            setSizes((prev) => [...prev, e.target.value])
        } else {
            setSizes((prev) => [...prev.filter((size) => size !== e.target.value)])
        }
    }

  return (
    <div className="fixed bg-black bg-opacity-70 inset-0 z-50 p-4 md:p-5">

        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut"}}
        exit={{ opacity: 0, y: -50 }}
        className="relative h-full mx-auto w-full"
        >
            <div className="w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg">
                <button 
                    className="fixed z-10 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow text-gray-600 transition duration-200 focus:outline-none focus:text-gray-800 focus:shadow-md hover:text-gray-800 hover:shadow-md -top-3.5 md:-top-4 -right-3.5 md:-right-4"
                    onClick={() => closeModal(false)}
                >
                    <IoClose />
                </button>
                <div className="overflow-y-auto h-full w-full md:w-[650px] rounded-lg max-h-[calc(100vh_-_120px)]">
                    <div className="rounded-lg bg-white">
                        <div className='p-4 flex flex-col items-center justify-center gap-4'>
                            {fields && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={`w-full p-2 rounded-lg text-center font-semibold ${
                                        alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'
                                    }`}>
                                    {msg}
                                </motion.p>
                            )}
                            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-3'>
                                <MdFastfood className='text-xl text-gray-700' />
                                <input
                                    type='text'
                                    required
                                    value={title}
                                    placeholder='Give me a title...'
                                    className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400'
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='w-full'>
                                <select
                                    name='categories'
                                    id='categories'
                                    className='w-full outline-none text-base border-b-2 bg-gray-200 p-2 rounded-md cursor-pointer'
                                    onChange={(e) => setCategory(e.target.value)}>
                                    <option
                                        className='bg-white capitalize text-headingColor text-base border-none outline-none'
                                        value={null}>
                                        Select Category
                                    </option>
                                    {categories.map((category) => (
                                        <>
                                            {category.product.map((product) => (
                                                <option
                                                    key={product.id}
                                                    value={product.urlParamName}
                                                    className='bg-white capitalize text-headingColor text-base border-none outline-none'>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </>
                                    ))}
                                </select>
                            </div>
                            <div className='w-full h-300 flex items-center justify-center flex-col border-2 border-dotted border-gray-300 cursor-pointer rounded-lg'>
                                {isLoading ? (
                                    <Loading />
                                ) : (
                                    <>
                                        {!imageAsset ? (
                                            <>
                                                <label htmlFor='uploadingImg' className='w-full h-full flex'>
                                                    <div className='w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2'>
                                                        <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                                                        <p className='text-gray-500'>Click here to upload</p>
                                                        <input
                                                            type='file'
                                                            name='uploadingImg'
                                                            id='uploadingImg'
                                                            accept='image/*'
                                                            className='w-0 h-0'
                                                            onChange={uploadImage}
                                                        />
                                                    </div>
                                                </label>
                                            </>
                                        ) : (
                                            <>
                                                <div className='relative w-full h-full'>
                                                    <img
                                                        src={imageAsset}
                                                        alt='uploaded image'
                                                        className='w-full h-full object-contain'
                                                    />
                                                    <button
                                                        className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                                                        onClick={deleteImage}>
                                                        <MdDelete className='text-white' />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-3'>
                                <MdAttachMoney className='text-xl text-gray-700' />
                                <input
                                    type='text'
                                    required
                                    value={price}
                                    placeholder='Price'
                                    className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='flex w-full'>
                                <p className='text-lg font-semibold text-center mr-5'>Sizes: </p>
                                <div className='flex justify-around gap-3'>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <input
                                            checked={sizes.includes('M') ? true : false}
                                            onChange={(e) => handleSize(e)}
                                            type='checkbox'
                                            id='medium'
                                            value='M'
                                        />
                                        <label htmlFor='medium'>Medium</label>
                                    </div>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <input
                                            checked={sizes.includes('L') ? true : false}
                                            onChange={(e) => handleSize(e)}
                                            type='checkbox'
                                            id='large'
                                            value='L'
                                        />
                                        <label htmlFor='large'>Large</label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full items-center'>
                                <button
                                    className='ml-0 md:ml-auto w-full md:w-auto outline-none bg-headingColor text-amber-400 hover:bg-amber-500 hover:text-headingColor px-12 py-2 rounded-lg text-lg  font-semibold'
                                    onClick={saveDetail}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default CreateModal