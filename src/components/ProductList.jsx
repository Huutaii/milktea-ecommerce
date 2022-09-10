import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { FaEye, FaShoppingCart, FaHeart } from 'react-icons/fa'

const ProductList = ({ data }) => {
    const [{ cartItems, modalShow }, dispatch] = useStateValue()

    let navigate = useNavigate()

    const showModal = (data) => {
        dispatch({
            type: actionType.SET_MODAL_ITEM,
            dataModal: data,
        })
        dispatch({
            type: actionType.SET_MODAL_SHOW,
            modalShow: !modalShow,
        })
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data &&
                data
                    .map((item) => (
                        <div key={item.id}>
                            <div className="group relative">
                                <img src={item.imageURL} className="border w-full aspect-square object-cover" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease">
                                    <div
                                        className="bg-white p-4 rounded-full cursor-pointer translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 hover:rotate-[360deg] transition-all duration-300 ease"
                                        onClick={() => navigate("/product/" + item.id, {state: item})}>
                                        <FaEye className="text-lg " />
                                    </div>
                                    <div
                                        className="bg-white p-4 rounded-full cursor-pointer translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 hover:rotate-[360deg] transition-all duration-300 ease"
                                        onClick={() => showModal(item)}>
                                        <FaShoppingCart className="text-lg " />
                                    </div>
                                    <div className="bg-white p-4 rounded-full cursor-pointer translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 hover:rotate-[360deg] transition-all duration-300 ease">
                                        <FaHeart className="text-lg " />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center lg:text-left py-4">
                                <p className="text-base md:text-xl font-bold text-headingColor mb-1">{item.title}</p>
                                <p className="text-sm md:text-base text-headingColor">{new Intl.NumberFormat().format(item.price)} VND</p>
                            </div>
                        </div>
                    ))}
        </div>
    )
}

export default ProductList
