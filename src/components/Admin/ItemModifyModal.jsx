import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdAttachMoney, MdOutlineModeEdit, MdFastfood, MdFoodBank } from 'react-icons/md'
import { categories } from '../../utils/data'
import { Loading } from '../../components'

import { setDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { firestore, storage } from '../../firebase.config'

const ItemModifyModal = ({ closeModal, data }) => {
    const [title, setTitle] = useState('')
    const [calories, setCalories] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState(null)
    const [imageAsset, setImageAsset] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    function cancelModal() {
        if (imageAsset) {
            const deleteRef = ref(storage, imageAsset)
            deleteObject(deleteRef).then(() => {
                setImageAsset(null)
            })
        }
        closeModal(false)
        setTitle('')
        setCalories('')
        setPrice('')
        setCategory(null)
        setIsLoading(false)
    }

    function changeImg(e) {
        setIsLoading(true)
        const imgFile = e.target.files[0]
        const storageRef = ref(storage, `Images/${Date.now()}-${imgFile.name}`)
        uploadBytes(storageRef, imgFile)
            .then((snapshot) => {
                getDownloadURL(storageRef).then((url) => {
                    setIsLoading(false)
                    setImageAsset(url)
                })
            })
            .catch((error) => {})
    }

    async function saveData() {
        if (title !== '') {
            setDoc(doc(firestore, 'products', data.id), { title: title }, { merge: true })
        }
        if (calories !== '') {
            setDoc(doc(firestore, 'products', data.id), { calories: calories }, { merge: true })
        }
        if (category !== null) {
            setDoc(doc(firestore, 'products', data.id), { category: category }, { merge: true })
        }
        if (price !== '') {
            setDoc(doc(firestore, 'products', data.id), { price: Number(price) }, { merge: true })
        }
        if (imageAsset != null) {
            setDoc(doc(firestore, 'products', data.id), { imageURL: imageAsset }, { merge: true })
            const deleteRef = ref(storage, data.imageURL)
            deleteObject(deleteRef)
        }
        closeModal(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className='fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center'
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <div className='modal w-[90%] lg:w-[65%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 bg-white'>
                <div className='w-full py-2 border-b border-gray-300 flex items-center gap-3'>
                    <MdFastfood className='text-xl text-gray-700' />
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={data.title}
                        className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400'
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
                <div className='w-full h-225 md:h-300 2xl:h-420 flex items-center justify-center flex-col border-2 border-dotted border-gray-300 cursor-pointer rounded-lg'>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <div className='relative w-full h-full'>
                            <img
                                src={imageAsset || data.imageURL}
                                alt='uploaded image'
                                className='w-full h-full object-contain'
                            />
                            <label className='flex absolute bottom-3 right-3 p-3 rounded-full bg-blue-500 text-xl cursor-pointer hover:shadow-md duration-500 transition-all ease-in-out'>
                                <input
                                    type='file'
                                    name='uploadingImg'
                                    id='uploadingImg'
                                    accept='image/*'
                                    className='w-0 h-0'
                                    onChange={changeImg}
                                />
                                <MdOutlineModeEdit className='text-white' />
                            </label>
                        </div>
                    )}
                </div>
                <div className='w-full py-2 border-b border-gray-300 flex items-center gap-3'>
                    <MdAttachMoney className='text-xl text-gray-700' />
                    <input
                        type='text'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={data.price}
                        className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400'
                    />
                </div>
                <div className='flex w-full items-center justify-end md:flex-row flex-col gap-4'>
                    <button
                        className='w-full md:w-auto outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
                        onClick={saveData}>
                        Save
                    </button>
                    <button
                        className='w-full md:w-auto outline-none bg-red-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
                        onClick={cancelModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ItemModifyModal
