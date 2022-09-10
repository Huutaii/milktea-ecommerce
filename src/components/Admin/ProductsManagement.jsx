import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, doc, deleteDoc, } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

import { firestore, storage } from '../../firebase.config';
import Pagination from '../Pagination';
import Search from '../Search';
import { categories } from '../../utils/data';

import { FaSort } from "react-icons/fa";
import { HiPlus, HiSortAscending, HiSortDescending } from "react-icons/hi";
import { RiEditFill } from "react-icons/ri";
import { BsTrash2Fill } from "react-icons/bs";

import ItemModifyModal from './ItemModifyModal';
import CreateModal from './CreateModal';

const ProductsManagement = () => {
    const [items, setItems] = useState([])
    const [itemsSort, setItemsSort] = useState([])
    const [categorySort, setCategorySort] = useState(0)
    const [timeSort, setTimeSort] = useState(0)
    const [priceSort, setPriceSort] = useState(0)
    const [ratingSort, setRatingSort] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
		onSnapshot(collection(firestore, "products"), (snapshot) => {
            setItems(snapshot.docs.map((doc) => doc.data()));
            setItemsSort(snapshot.docs.map((doc) => doc.data()));
        })
    }, []);

    const time = (date) => {
        const d = new Date(parseInt(date))
        return `${d.getDate()} ${d.toLocaleString("en-US", {month: "long"})} ${d.toLocaleString("en-US", {year: "numeric"})}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }

    //Open modal to edit product
    const openModal = (data) => {
        setModalEdit(true)
        setData(data)
        onSnapshot(doc(firestore, 'products', data.id), (doc) => {
            setItemsSort((prev) =>
                prev.map((item) => {
                    if (doc.data().id === item.id) {
                        return doc.data()
                    } else {
                        return item
                    }
                })
            )
        })
    }

    //Delete product
    const deleteItem = async (dat) => {
        let text = 'Are you sure to delete this item ?'
        if (window.confirm(text) === true) {
            setItemsSort((prev) =>
                prev.filter((item) => {
                    return item.id !== dat.id
                })
            )
            await deleteDoc(doc(firestore, 'products', dat.id))
            const deleteRef = ref(storage, dat.imageURL)
            deleteObject(deleteRef)
        }
    }

    //Search name product
    useEffect(() => {
        setItemsSort(items.filter((n) => categorySort === "all" ? n : n.category === categorySort).filter((val) => {
                if (searchInput === '') {
                    return val
                } else if (
                    val.title.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                    return val
                }
        }))
    }, [searchInput]);

    // Filter category
    useEffect(() => {
        setItemsSort(categorySort === "all" ? items : items.filter((n) => n.category === categorySort))
    }, [categorySort]);
    
    //Sort time, price, rating
    useEffect(() => {
        setItemsSort((prev) => {
            return timeSort === 1 ? [...prev.sort((a, b) => parseInt(a.id) - parseInt(b.id))]
                    : timeSort === 2 ? [...prev.sort((a, b) => parseInt(b.id) - parseInt(a.id))]
                    : [...prev]
        })
    }, [timeSort])

    useEffect(() => {
        setItemsSort((prev) => {
            return priceSort === 1 ? [...prev.sort((a, b) => parseInt(a.price) - parseInt(b.price))]
                    : priceSort === 2 ? [...prev.sort((a, b) => parseInt(b.price) - parseInt(a.price))]
                    : [...prev]
        })
    }, [priceSort])

    useEffect(() => {
        setItemsSort((prev) => {
            return ratingSort === 1 ? [...prev.sort((a, b) => parseInt(a && a.reviews && a.reviews.length ? (a.reviews.reduce(function(sum, value) {
                            return sum + value.rating;
                        }, 0) / a.reviews.length).toFixed(1) : 0) - parseInt(b && b.reviews && b.reviews.length ? (b.reviews.reduce(function(sum, value) {
                            return sum + value.rating;
                        }, 0) / b.reviews.length).toFixed(1) : 0))]
                    : ratingSort === 2 ? [...prev.sort((a, b) => parseInt(b && b.reviews && b.reviews.length ? (b.reviews.reduce(function(sum, value) {
                        return sum + value.rating;
                    }, 0) / b.reviews.length).toFixed(1) : 0) - parseInt(a && a.reviews && a.reviews.length ? (a.reviews.reduce(function(sum, value) {
                        return sum + value.rating;
                    }, 0) / a.reviews.length).toFixed(1) : 0))]
                    : [...prev]
        })
    }, [ratingSort])

    // Data pagination
    const [currentItems, setCurrentItems] = useState([]);

    return (
        <div>
            <div className="block sm:flex items-center justify-between py-7 px-10 gap-5 space-y-4">
                <div>
                    <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Products</h1>
                    <p className="text-sm font-medium text-gray-500">
                        Let's grow to your business! Create your product and upload here
                    </p>
                </div>
                <button
                    className="w-full sm:w-fit shrink-0 inline-flex justify-center gap-x-2 items-center py-2.5 px-6 text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                    onClick={() => setModalCreate(true)}
                >
                    <HiPlus className="w-6 h-6 fill-current" />
                    <span className="font-semibold tracking-wide">Create Item</span>
                </button>
            </div>
            <div className='flex flex-col-reverse lg:flex-row justify-between px-10 py-3 border-y border-gray-200'>
                <div className='lg:hidden flex items-center my-2'>
                    <div className='bg-headingColor w-28 flex justify-center items-center py-2 rounded-l-md text-white text-sm'>Sort by</div>
                    <select
                        className='border-headingColor border px-2 py-[7px] rounded-r-md text-sm w-full cursor-pointer'
                        onChange={(e) => { switch (e.target.value) {
                            case "Latest":
                                setTimeSort(2);
                                setPriceSort(0);
                                setRatingSort(0);
                                break;
                            case "Newest":
                                setTimeSort(1);
                                setPriceSort(0);
                                setRatingSort(0);
                                break;
                            case "HighPrice":
                                setTimeSort(0);
                                setPriceSort(2);
                                setRatingSort(0);
                                break;
                            case "LowPrice":
                                setTimeSort(0);
                                setPriceSort(1);
                                setRatingSort(0);
                                break;
                            case "HighRating":
                                setTimeSort(0);
                                setPriceSort(0);
                                setRatingSort(2);
                                break;
                            case "LowRating":
                                setTimeSort(0);
                                setPriceSort(0);
                                setRatingSort(1);
                                break;
                        }}}
                    >
                        <option value='Latest'>Latest</option>
                        <option value='Newest'>Newest</option>
                        <option value='HighPrice'>High Price → Low Price</option>
                        <option value='LowPrice'>Low Price → High Price</option>
                        <option value='HighRating'>High Rating → Low Rating</option>
                        <option value='LowRating'>Low Rating → High Rating</option>
                    </select>
                </div>                
                <div className='flex items-center'>

                    <div className='py-2 bg-headingColor w-28 h-fit flex justify-center items-center rounded-l-md text-white text-sm'>Filter</div>
                    <select
                        className='border-headingColor border px-2 py-[7px] rounded-r-md text-sm w-full h-fit cursor-pointer'
                        onChange={(e) => setCategorySort(e.target.value)}
                    >
                        <option value="all">All</option>
                        {categories.map((category) => (
                            <>
                                {category.product.map((product) => (
                                    <option key={product.id} value={product.urlParamName}>{product.name}</option>
                                ))}
                            </>
                        ))}
                    </select>
                </div>
                <Search onSubmit={setSearchInput}/>
            </div>
            <table className="w-full hidden lg:table">
                <thead>
                    <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                        <td className="pl-10">Product Name</td>
                        <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <p>Unit Price (VND)</p>
                                <div className="cursor-pointer" onClick={() => {priceSort === 2 ? setPriceSort(0) : setPriceSort(priceSort + 1); setTimeSort(0); setRatingSort(0)}}>
                                    {priceSort === 0 ? <FaSort /> : priceSort === 1 ? <HiSortAscending /> : <HiSortDescending />}
                                </div>
                            </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <p>Date/Time</p>
                                <div className="cursor-pointer" onClick={() => {timeSort === 2 ? setTimeSort(0) : setTimeSort(timeSort + 1); setPriceSort(0); setRatingSort(0)}}>
                                    {timeSort === 0 ? <FaSort /> : timeSort === 1 ? <HiSortAscending /> : <HiSortDescending />}
                                </div>
                            </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <p>Rating</p>
                                <div className="cursor-pointer" onClick={() => {ratingSort === 2 ? setRatingSort(0) : setRatingSort(ratingSort + 1); setTimeSort(0); setPriceSort(0)}}>
                                    {ratingSort === 0 ? <FaSort /> : ratingSort === 1 ? <HiSortAscending /> : <HiSortDescending />}
                                </div>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((item) => (
                        <tr className="hover:bg-gray-100 transition-colors group">
                            <td className="flex gap-x-4 items-center py-4 pl-10">
                                <img
                                    src={item.imageURL}
                                    className="w-28 aspect-square rounded-lg object-cover border border-gray-200"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">{item.title}</p>
                                    <div className="font-medium text-gray-400 capitalize ">{item.category}</div>
                                </div>
                            </td>
                            <td className="font-medium text-center">{new Intl.NumberFormat().format(item.price)}</td>
                            <td className="font-medium text-center">{time(item.id)}</td>
                            <td className="text-center">
                                <span className="font-medium">
                                    {item && item.reviews && item.reviews.length ? (item.reviews.reduce(function(sum, value) {
                                            return sum + value.rating;
                                        }, 0) / item.reviews.length).toFixed(1) : 0
                                    }
                                </span>
                                <span className="text-gray-400">/5</span>
                            </td>
                            <td>
                                <div className="invisible group-hover:visible w-20 flex items-center text-gray-500 gap-x-2">
                                    <button className="p-2 hover:rounded-md hover:bg-gray-200" onClick={() => openModal(item)}>
                                        <RiEditFill className="w-6 h-6 fill-current" />
                                    </button>
                                    <button className="p-2 hover:rounded-md hover:bg-gray-200" onClick={() => deleteItem(item)}>
                                        <BsTrash2Fill className="w-6 h-6 fill-current" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mx-10 my-6 lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentItems && currentItems.map((item) => (

                    <div className="p-4 bg-white rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <img
                                    src={item.imageURL}
                                    className="w-12 aspect-square rounded-lg object-cover border border-gray-200"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">{item.title}</p>
                                    <div className="font-medium text-gray-400 capitalize">{item.category}</div>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <button className="p-2 hover:rounded-md hover:bg-gray-200" onClick={() => openModal(item)}>
                                    <RiEditFill className="w-6 h-6 fill-current" />
                                </button>
                                <button className="p-2 hover:rounded-md hover:bg-gray-200" onClick={() => deleteItem(item)}>
                                    <BsTrash2Fill className="w-6 h-6 fill-current" />
                                </button>
                            </div>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">Create at</p>
                            <p className="font-semibold text-end">{time(item.id)}</p>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 rounded-lg">
                            <p className="text-gray-600">Unit Price (VND)</p>
                            <p className="font-semibold text-end">{new Intl.NumberFormat().format(item.price)}</p>
                        </div>
                        <div className="py-2 px-4 flex justify-between gap-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">Rating</p>
                            <p className="font-semibold text-end">
                                {item && item.reviews && item.reviews.length ? (item.reviews.reduce(function(sum, value) {
                                        return sum + value.rating;
                                    }, 0) / item.reviews.length).toFixed(1) : 0
                                }
                                <span className="text-gray-400">/5</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination 
                items={itemsSort}
                itemsPerpage={6} 
                parentCallback={setCurrentItems}
            />
            {modalCreate && <CreateModal closeModal={setModalCreate}/>}
            {modalEdit && <ItemModifyModal closeModal={setModalEdit} data={data} />}
        </div>
    )
}

export default ProductsManagement