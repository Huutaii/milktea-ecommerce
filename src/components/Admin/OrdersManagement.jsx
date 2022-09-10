import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase.config.js';

import { TbListDetails } from "react-icons/tb";
import { FaSort, FaBarcode, FaSortDown } from "react-icons/fa";
import { HiSortAscending, HiSortDescending, HiChevronRight } from "react-icons/hi";
import img from "../../img/OrderManage.png";

const OrdersManagement = () => {
    let navigate = useNavigate();
    const [items, setItems] = useState([])
    const [currentItems, setcurrentItems] = useState([])
    const [timeSort, setTimeSort] = useState(0)
    const [priceSort, setPriceSort] = useState(0)
    const [isDropdown, setisDropdown] = useState(false)

    useEffect(() => {
        onSnapshot(collection(firestore, "orders"), (snapshot) => {
            setItems(snapshot.docs.map((doc) => doc.data()))
            setcurrentItems(snapshot.docs.map((doc) => doc.data()))
        })
    }, [])
    
    const time = (date) => {
        const d = new Date(parseInt(date))
        return `${d.getDate()} ${d.toLocaleString("en-US", {month: "long"})} ${d.toLocaleString("en-US", {year: "numeric"})}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }

    useEffect(() => {
        setcurrentItems((prev) => {
            return timeSort === 1 ? [...prev.sort((a, b) => parseInt(a.orderId) - parseInt(b.orderId))]
                    : timeSort === 2 ? [...prev.sort((a, b) => parseInt(b.orderId) - parseInt(a.orderId))]
                    : [...prev]
        })
    }, [timeSort])

    useEffect(() => {
        setcurrentItems((prev) => {
            return priceSort === 1 ? [...prev.sort((a, b) => parseInt(a.totalPrice + a.shipPrice) - parseInt(b.totalPrice + b.shipPrice))]
                    : priceSort === 2 ? [...prev.sort((a, b) => parseInt(b.totalPrice + b.shipPrice) - parseInt(a.totalPrice + a.shipPrice))]
                    : [...prev]
        })
    }, [priceSort])

    document.addEventListener('mousedown', (e) => {
		if (isDropdown && !e.target.closest('.status-modal')) {
			setisDropdown(false)
		}
	})

    return (
        <div>
            <div className="flex items-center gap-5 py-7 px-10 border-y border-gray-200">
                <img src={img} className="w-28 aspect-square rounded-full object-cover border border-gray-200" />
                <div>
                    <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Orders Management</h1>
                    <p className="text-sm font-medium text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>

            {/* Sort Tablet and Mobile */}
            <div className='lg:hidden flex flex-col sm:flex-row justify-between px-10 py-3'>
                <div className='flex items-center my-2'>
                    <div className='bg-headingColor w-28 flex justify-center items-center py-2 rounded-l-md text-white text-sm'>Filter</div>
                    <select
                        className='border-headingColor border px-2 py-[7px] rounded-r-md text-sm w-full cursor-pointer'
                        onChange={(e) => {
                            setTimeSort(0);
                            setPriceSort(0);
                            if(Number(e.target.value) === 1) {
                                setcurrentItems(items)
                            } else {
                                setcurrentItems(items.filter((n) => n.status === Number(e.target.value)))
                            }
                        }}
                    >
                        <option value={1}>All</option>
                        <option value={2}>Preparing</option>
                        <option value={3}>On the way</option>
                        <option value={4}>Delivered</option>
                    </select>
                </div>                
                <div className='flex items-center my-2'>
                    <div className='bg-headingColor w-28 flex justify-center items-center py-2 rounded-l-md text-white text-sm'>Sort by</div>
                    <select
                        className='border-headingColor border px-2 py-[7px] rounded-r-md text-sm w-full cursor-pointer'
                        onChange={(e) => { switch (e.target.value) {
                            case "Newest":
                                setTimeSort(1);
                                setPriceSort(0);
                                break;
                            case "Latest":
                                setTimeSort(2);
                                setPriceSort(0);
                                break;
                            case "HighPrice":
                                setTimeSort(0);
                                setPriceSort(2);
                                break;
                            case "LowPrice":
                                setTimeSort(0);
                                setPriceSort(1);
                                break;
                        }}}
                    >
                        <option value='Newest'>Newest</option>
                        <option value='Latest'>Latest</option>
                        <option value='HighPrice'>High Price → Low Price</option>
                        <option value='LowPrice'>Low Price → High Price</option>
                    </select>
                </div>                
            </div>
            <table className="w-full hidden lg:table">
                <thead>
                    <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                        <td className="py-4 pl-10">Order ID</td>
                        <td className="py-4">Customer</td>
                        <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <p>Date/Time</p>
                                <div className="cursor-pointer" onClick={() => {timeSort === 2 ? setTimeSort(0) : setTimeSort(timeSort + 1); setPriceSort(0)}}>
                                    {timeSort === 0 ? <FaSort /> : timeSort === 1 ? <HiSortAscending /> : <HiSortDescending />}
                                </div>
                            </div>
                        </td>
                        <td className="status-modal py-4 px-4 text-center cursor-pointer" onClick={() => setisDropdown(!isDropdown)}>
                            <div className=" relative flex items-center justify-center gap-2">
                                <p>Status</p>
                                <FaSortDown />
                                {isDropdown && 
                                    <div className="absolute top-7 z-10 w-36 h-auto bg-white rounded shadow border">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                            <li 
                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                onClick={() => {setTimeSort(0); setPriceSort(0); setcurrentItems(items)}}
                                            >
                                                All
                                            </li>
                                            <li 
                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                onClick={() => {setTimeSort(0); setPriceSort(0); setcurrentItems(items.filter((n) => n.status === 2))}}
                                            >
                                                Preparing
                                            </li>
                                            <li 
                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                onClick={() => {setTimeSort(0); setPriceSort(0); setcurrentItems(items.filter((n) => n.status === 3))}}
                                            >
                                                On the way
                                            </li>
                                            <li 
                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                onClick={() => {setTimeSort(0); setPriceSort(0); setcurrentItems(items.filter((n) => n.status === 4))}}
                                            >
                                                Delivered
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <p>Pricing (VND)</p>
                                <div className="cursor-pointer" onClick={() => {priceSort === 2 ? setPriceSort(0) : setPriceSort(priceSort + 1); setTimeSort(0)}}>
                                    {priceSort === 0 ? <FaSort /> : priceSort === 1 ? <HiSortAscending /> : <HiSortDescending />}
                                </div>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.orderId} className="hover:bg-gray-100 transition-colors group">
                            <td className="pl-10 font-medium text-gray-500">{item.orderId}</td>
                            <td className="flex gap-x-4 items-center py-4">
                                <img
                                    src={item.photoUser}
                                    className="w-12 aspect-square rounded-full object-cover border border-gray-200"
                                />
                                    <p className="font-semibold">{item.nameUser}</p>
                            </td>
                            <td className="font-medium text-center text-gray-500">{time(item.orderId)}</td>
                            <td className="font-medium text-center">
                                <span className={`px-2 py-1 rounded-md ${item.status === 2
                                        ? 'bg-sky-200 text-sky-800'
                                        : item.status === 3
                                        ? 'bg-yellow-200 text-yellow-800'
                                        : item.status === 4
                                        ? 'bg-green-200 text-green-800'
                                        : 'Done'
                                    } `}
                                >
                                    {item.status === 2
                                        ? 'Preparing'
                                        : item.status === 3
                                        ? 'On the way'
                                        : item.status === 4
                                        ? 'Delivered'
                                        : 'Done'
                                    }
                                </span>
                            </td>
                            <td className="font-medium text-center">{new Intl.NumberFormat().format(item.totalPrice + item.shipPrice)}</td>
                            <td>
                                <button className="invisible group-hover:visible p-2 hover:rounded-md hover:bg-gray-100" onClick={() => navigate(item.orderId, {state: item})}>
                                    <TbListDetails className="w-6 h-6 fill-current text-gray-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>         
            </table>
            <div className="mx-10 lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentItems.map((item) => (
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
                                <span className={`px-2 py-1 font-semibold rounded-md ${item.status === 2
                                        ? 'bg-sky-200 text-sky-800'
                                        : item.status === 3
                                        ? 'bg-yellow-200 text-yellow-800'
                                        : item.status === 4
                                        ? 'bg-green-200 text-green-800'
                                        : 'Done'
                                    } `}
                                >
                                    {item.status === 2
                                        ? 'Preparing'
                                        : item.status === 3
                                        ? 'On the way'
                                        : item.status === 4
                                        ? 'Delivered'
                                        : 'Done'
                                    }
                                </span>
                                <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => navigate(item.orderId, {state: item})}>
                                    <HiChevronRight className="text-2xl" />
                                </button>
                            </div>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">Customer</p>
                            <p className="font-semibold text-end">{item.nameUser}</p>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                            <p className="text-gray-600">Address</p>
                            <p className="font-semibold text-end">{item.address}</p>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">Phone</p>
                            <p className="font-semibold text-end">{item.phone}</p>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                            <p className="text-gray-600">Pricing (VND)</p>
                            <p className="font-semibold text-end">{new Intl.NumberFormat().format(item.totalPrice + item.shipPrice)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrdersManagement