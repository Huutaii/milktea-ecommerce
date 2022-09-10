import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

import { firestore } from '../firebase.config';
import { useStateValue } from "../context/StateProvider";
import { EmptyCart } from '../components';

import { FaFileInvoiceDollar, FaBarcode } from "react-icons/fa";
import { MdOutlineCoffeeMaker, MdOutlineDeliveryDining, MdCancelScheduleSend } from "react-icons/md";
import { BsFillCheckCircleFill, BsBagCheckFill } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";

import img from "../img/order.jpg"
const Orders = () => {
    useEffect(() => {
		window.scrollTo(0,0);
	}, [])
    
    const [{ user }, dispatch] = useStateValue();
    const [items, setItems] = useState([])
    
    const cancelOrder = async (dat) => {
		let text = 'Are you sure to delete this order ?'
		if (window.confirm(text) === true) {
			setItems((prev) =>
				prev.filter((item) => {
					return item.orderId !== dat.orderId
				})
			)
			await deleteDoc(doc(firestore, 'orders', dat.orderId))
		}
	}

	useEffect(() => {
		onSnapshot(collection(firestore, "orders"), (snapshot) =>
            setItems(snapshot.docs.map((doc) => doc.data()).filter((n) => n.idUser === user.uid))
        )
	}, [])

    const time = (date) => {
        const d = new Date(parseInt(date))
        return `${d.getDate()} ${d.toLocaleString("en-US", {month: "long"})} ${d.toLocaleString("en-US", {year: "numeric"})}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
    
    return (
        <div>
            <div className="flex items-center gap-5 py-7 px-10 border-y border-gray-200">
                <img src={img} className="w-28 aspect-square rounded-full object-cover border border-gray-200" />
                <div>
                    <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Orders</h1>
                    <p className="text-sm font-medium text-gray-500">
                    We will monitor and inform you of the progress of your order
                    </p>
                </div>
            </div>
            {items.length > 0 ? (
                <div className="">
                    {items.map((item, index) => (
                        <div key={index} className="pt-6 border-b border-gray-300 last:border-b-0">
                            {/* Order Details PC */}
                            <div className="px-10 hidden md:grid grid-cols-2 gap-4">
                                <p>Order ID: <span className="font-medium">{item.orderId}</span></p>
                                <p>Customer: <span className="font-medium">{item.nameUser}</span></p>
                                <p>Phone: <span className="font-medium">{item.phone}</span></p>
                                <p>Email: <span className="font-medium">{item.email}</span></p>
                                <p>Address: <span className="font-medium">{item.address}</span></p>
                                <p>Delivery Pricing: <span className="font-medium">{new Intl.NumberFormat().format(item.shipPrice)} VND</span></p>
                                <p>Estimated Pricing: <span className="font-medium">{new Intl.NumberFormat().format(item.totalPrice)} VND</span></p>
                                <p>Note: <span className="font-medium">{item.note}</span></p>
                            </div>
                            {/* Order Details Tablet, Mobile */}
                            <div className="mx-10 md:hidden mb-3">
                                <div className="p-4 bg-white rounded-lg shadow">
                                    <div className="flex justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <FaBarcode />
                                                <p className="text-lg font-semibold text-gray-700">{item.orderId}</p>
                                            </div>
                                            <div className="text-gray-600 capitalize ">{time(item.orderId)}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {item.status === 5 && (
                                                <button 
                                                    className="p-2 rounded-md transition ease-in-out duration-300 bg-headingColor text-amber-500 hover:text-headingColor hover:bg-amber-500"
                                                    onClick={() => cancelOrder(item)}
                                                >
                                                    <BsBagCheckFill className="w-6 h-6 fill-current" />
                                                </button>
                                            )}
                                            <button 
                                                className={`p-2 rounded-md transition ease-in-out duration-300 bg-headingColor text-amber-500 ${item.status > 2 ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:text-headingColor hover:bg-amber-500"}`}
                                                disabled={item.status > 2 ? true : false}
                                                onClick={() => cancelOrder(item)}
                                            >
                                                <MdCancelScheduleSend className="w-6 h-6 fill-current" />
                                            </button>                                            
                                        </div>
                                    </div>
                                    <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                                        <p className="text-gray-600">Customer</p>
                                        <p className="font-semibold text-end">{item.nameUser}</p>
                                    </div>
                                    <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                                        <p className="text-gray-600">Phone</p>
                                        <p className="font-semibold text-end">{item.phone}</p>
                                    </div>
                                    <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                                        <p className="text-gray-600">Email</p>
                                        <p className="font-semibold text-end">{item.email}</p>
                                    </div>
                                    <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                                        <p className="text-gray-600">Address</p>
                                        <p className="font-semibold text-end">{item.address}</p>
                                    </div>
                                    <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                                        <p className="text-gray-600">Delivery Pricing (VND)</p>
                                        <p className="font-semibold text-end">{new Intl.NumberFormat().format(item.shipPrice)}</p>
                                    </div>
                                    <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                                        <p className="text-gray-600">Estimated Pricing (VND)</p>
                                        <p className="font-semibold text-end">{new Intl.NumberFormat().format(item.totalPrice)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-evenly my-4">
                                <div className={`flex flex-col gap-2 items-center ${item.status === 1 ? "animate-pulse" : ""} ${item.status > 1 ? "opacity-100" : "opacity-30"}`}>
                                    <FaFileInvoiceDollar className="h-10 w-10"/>
                                    <span>Payment</span>
                                    {item.status > 1 && <BsFillCheckCircleFill className="text-green-600"/>}
                                </div>
                                <div className={`flex flex-col gap-2 items-center ${item.status === 2 ? "animate-pulse" : ""} ${item.status > 2 ? "opacity-100" : "opacity-30"}`}>
                                    <MdOutlineCoffeeMaker className="h-10 w-10"/>
                                    <span>Preparing</span>
                                    {item.status > 2 && <BsFillCheckCircleFill className="text-green-600"/>}
                                </div>
                                <div className={`flex flex-col gap-2 items-center ${item.status === 3 ? "animate-pulse" : ""} ${item.status > 3 ? "opacity-100" : "opacity-30"}`}>
                                    <MdOutlineDeliveryDining className="h-10 w-10"/>
                                    <span>On the way</span>
                                    {item.status > 3 && <BsFillCheckCircleFill className="text-green-600"/>}
                                </div>
                                <div className={`flex flex-col gap-2 items-center ${item.status === 4 ? "animate-pulse" : ""} ${item.status > 4 ? "opacity-100" : "opacity-30"}`}>
                                    <IoFastFoodOutline className="h-10 w-10"/>
                                    <span>Delivered</span>
                                    {item.status > 4 && <BsFillCheckCircleFill className="text-green-600"/>}
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
                                    {item.products && item.products.map((product, index) => (
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
                            <div className="mx-10 my-4 md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {item.products && item.products.map((product, index) => (
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

                            <div className="hidden md:flex justify-end w-full px-10">
                                {item.status === 5 && (
                                    <button
                                        className="mr-2 text-sm leading-4 items-center transition ease-in-out duration-300 font-semibold text-center justify-center rounded-md bg-headingColor text-amber-500 cursor-pointer hover:text-headingColor hover:bg-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-full sm:w-auto"
                                        onClick={() => cancelOrder(item)}
                                    >
                                            Completed
                                    </button>
                                )}
                                <button
                                    className={`text-sm leading-4 items-center transition ease-in-out duration-300 font-semibold text-center justify-center rounded-md bg-headingColor text-amber-500 ${item.status > 2 ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:text-headingColor hover:bg-amber-500"} px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-full sm:w-auto`}
                                    disabled={item.status > 2 ? true : false}
                                    onClick={() => cancelOrder(item)}
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : ( <EmptyCart /> )}
        </div>
    )
}

export default Orders