import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { setDoc, doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '../../firebase.config.js'
import Loading from '../Loading'

import { IoCaretUpOutline, IoCaretDownOutline } from "react-icons/io5";
import { IoIosReturnLeft } from "react-icons/io";
import { FaBarcode } from "react-icons/fa";

const OrderDetail = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})

    const { orderId } = useParams();

    useEffect(() => {
        onSnapshot(doc(firestore, "orders", orderId), (doc) => {
            setData(doc.data())
        });
        setIsLoading(false)
    }, [])
    
    const updateStatus = (action) => {
        const newStatus = action === "up" ? data.status + 1 : action === "down" ? data.status - 1 : data.status;
        setDoc(doc(firestore, 'orders', orderId), { status: newStatus }, { merge: true })
    }

    const time = (date) => {
        const d = new Date(parseInt(date))
        return `${d.getDate()} ${d.toLocaleString("en-US", {month: "long"})} ${d.toLocaleString("en-US", {year: "numeric"})}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }

    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className="py-7 px-10 space-y-3">
                <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Order Details</h1>
                <NavLink to="/manage/admin/orders" className="flex items-center gap-3 w-fit cursor-pointer group">
                    <IoIosReturnLeft className="text-xl"/>
                    <p className="group-hover:underline">Return</p>
                </NavLink>
            </div>
            {/* Order Details PC */}
            <div className="pb-7 px-10 hidden md:grid grid-cols-2 gap-4">
                <p>Order ID: <span className="font-medium">{data.orderId}</span></p>
                <p>Customer: <span className="font-medium">{data.nameUser}</span></p>
                <p>Phone: <span className="font-medium">{data.phone}</span></p>
                <p>Email: <span className="font-medium">{data.email}</span></p>
                <p>Address: <span className="font-medium">{data.address}</span></p>
                <p>Date/Time: <span className="font-medium">{time(data.orderId)}</span></p>
                <p>Delivery Pricing: <span className="font-medium">{new Intl.NumberFormat().format(data.shipPrice)} VND</span></p>
                <p>Estimated Pricing: <span className="font-medium">{new Intl.NumberFormat().format(data.totalPrice)} VND</span></p>
                <p>Note: <span className="font-medium">{data.note}</span></p>
                <div className="flex items-center gap-2">
                    <p>Status: <span className={`font-medium px-2 py-1 rounded-md ${data.status === 2
                                        ? 'bg-sky-200 text-sky-800'
                                        : data.status === 3
                                        ? 'bg-yellow-200 text-yellow-800'
                                        : data.status === 4
                                        ? 'bg-green-200 text-green-800'
                                        : 'Done'
                                }`}>
                                    {data.status === 2
                                    ? 'Preparing'
                                    : data.status === 3
                                    ? 'On the way'
                                    : data.status === 4
                                    ? 'Delivered'
                                    : 'Done'}
                                </span>
                    </p>
                    <div>
                        <IoCaretUpOutline className="cursor-pointer" onClick={() => updateStatus("up")}/>
                        <IoCaretDownOutline className="cursor-pointer" onClick={() => updateStatus("down")}/>
                    </div>
                </div>
            </div>
            {/* Order Details Tablet, Mobile */}
            <div className="mx-10 md:hidden mb-3">
                <div className="p-4 bg-white rounded-lg shadow">
                    <div className="flex justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <FaBarcode />
                                <p className="text-lg font-semibold text-gray-700">{data.orderId}</p>
                            </div>
                            <div className="text-gray-600 capitalize ">{time(data.orderId)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 font-semibold rounded-md ${data.status === 2
                                    ? 'bg-sky-200 text-sky-800'
                                    : data.status === 3
                                    ? 'bg-yellow-200 text-yellow-800'
                                    : data.status === 4
                                    ? 'bg-green-200 text-green-800'
                                    : 'Done'
                                } `}
                            >
                                {data.status === 2
                                    ? 'Preparing'
                                    : data.status === 3
                                    ? 'On the way'
                                    : data.status === 4
                                    ? 'Delivered'
                                    : 'Done'
                                }
                            </span>
                            <div>
                                <IoCaretUpOutline className="cursor-pointer" onClick={() => updateStatus("up")}/>
                                <IoCaretDownOutline className="cursor-pointer" onClick={() => updateStatus("down")}/>
                            </div>
                        </div>
                    </div>
                    <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                        <p className="text-gray-600">Customer</p>
                        <p className="font-semibold text-end">{data.nameUser}</p>
                    </div>
                    <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                        <p className="text-gray-600">Phone</p>
                        <p className="font-semibold text-end">{data.phone}</p>
                    </div>
                    <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                        <p className="text-gray-600">Email</p>
                        <p className="font-semibold text-end">{data.email}</p>
                    </div>
                    <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                        <p className="text-gray-600">Address</p>
                        <p className="font-semibold text-end">{data.address}</p>
                    </div>
                    <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                        <p className="text-gray-600">Delivery Pricing (VND)</p>
                        <p className="font-semibold text-end">{new Intl.NumberFormat().format(data.shipPrice)}</p>
                    </div>
                    <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                        <p className="text-gray-600">Estimated Pricing (VND)</p>
                        <p className="font-semibold text-end">{new Intl.NumberFormat().format(data.totalPrice)}</p>
                    </div>
                </div>
            </div>

            {/* Product order List PC */}
            <table className="w-full hidden md:table">
                <thead>
                    <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                        <td className="pl-10">Product Name</td>
                        <td className="py-4">Category</td>
                        <td className="py-4 px-4 text-center">Unit Price (VND)</td>
                        <td className="py-4 px-4 text-center">Quantity</td>
                        <td className="py-4 px-4 text-center">Total  (VND)</td>
                    </tr>
                </thead>
                <tbody>
                    {data.products && data.products.map((product, index) => (
                        <tr key={product.id} className="hover:bg-gray-100 transition-colors group">
                            <td className="flex gap-x-4 items-center py-4 pl-10 pr-5">
                                <img
                                    src={product.imageURL}
                                    className="w-20 aspect-square rounded-lg object-cover border border-gray-200"
                                />
                                <p className="text-lg font-semibold text-gray-700">{product.title}</p>
                            </td>
                            <td className="font-medium capitalize">{product.category}</td>
                            <td className="font-medium text-center">{new Intl.NumberFormat().format(product.price)}</td>
                            <td className="font-medium text-center">{product.qty}</td>
                            <td className="font-medium text-center">{new Intl.NumberFormat().format(product.qty * product.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Product order List Tablet, mobile */}
            <div className="mx-10 md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.products && data.products.map((product, index) => (
                    <div className="p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src={product.imageURL}
                                className="w-28 aspect-square rounded-lg object-cover border border-gray-200"
                            />
                            <div>
                                <p className="text-lg font-semibold text-gray-700">{product.title}</p>
                                <div className="text-gray-400 capitalize">{product.category}</div>
                                <div className="text-gray-400 capitalize">Unit Price: {new Intl.NumberFormat().format(product.price)} VND</div>
                            </div>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 border-b border-gray-200">
                            <p className="text-gray-600">Quantity</p>
                            <p className="font-semibold text-end">{product.qty}</p>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                            <p className="text-gray-600">Total (VND)</p>
                            <p className="font-semibold text-end">{new Intl.NumberFormat().format(product.qty * product.price)}</p>
                        </div>                            
                    </div>
                ))}
            </div>

        </div>
    )
}

export default OrderDetail