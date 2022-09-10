import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'

import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import ProductsManagement from '../components/Admin/ProductsManagement';
import OrdersManagement from '../components/Admin/OrdersManagement';
import OrderDetail from '../components/Admin/OrderDetail';
import { Orders, Profile } from '../components';

import { MdShoppingBasket } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FaCocktail, FaPhoneAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { GiGlassShot } from "react-icons/gi";
import { IoReceipt, IoMenu } from "react-icons/io5";
import Logo from "../img/logo.png";

const Management = () => {
    const [{ user, cartShow }, dispatch] = useStateValue();

    const showCart = () => {
		dispatch({
			type: actionType.SET_CART_SHOW,
			cartShow: !cartShow,
		});
	};

    return (
        <div className="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
            
            <button className="fixed lg:hidden bottom-5 left-5 p-3 bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 rounded-md"
                onClick={() => dispatch({
                    type: actionType.SET_SIDEBAR_SHOW,
                    sidebarShow: true,
                })} 
            >
                <IoMenu className="text-lg text-white"/>
            </button>

            <aside className="hidden lg:block py-6 px-10 w-64 border-r border-gray-200">
                <Link to="/" className="cursor-pointer">
                    <img src={Logo} className="w-28" />
                </Link>
                <ul className="flex flex-col gap-y-4 py-5 border-b border-gray-200">
                    <li className="flex gap-x-4 items-center py-2">
                        <img src={user.photoURL} className="w-12 aspect-square rounded-full object-cover border border-gray-200" />
                        <p className="text-lg">{user.displayName}</p>
                    </li>
                    <li className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-emerald-600 group cursor-pointer" onClick={showCart}>
                        <span
                            className="absolute w-1.5 h-8 bg-emerald-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                        />
                        <MdShoppingBasket className="text-2xl"/>
                        <span className="text-lg">Cart</span>
                    </li>
                </ul>
                
                <ul className="flex flex-col gap-y-4 py-5 border-b border-gray-200">
                    <Link to="/">
                        <li className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-emerald-600 group cursor-pointer">
                            <span
                                className="absolute w-1.5 h-8 bg-emerald-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                            />
                            <AiFillHome className="text-2xl"/>
                            <span className="text-lg">Home</span>
                        </li>
                    </Link>
                    <Link to="/menu">
                        <li className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-emerald-600 group cursor-pointer">
                            <span
                                className="absolute w-1.5 h-8 bg-emerald-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                            />
                            <FaCocktail className="text-2xl"/>
                            <span className="text-lg">Menu</span>
                        </li>
                    </Link>
                    <Link to="/contact">
                        <li className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-emerald-600 group cursor-pointer">
                            <span
                                className="absolute w-1.5 h-8 bg-emerald-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                            />
                            <FaPhoneAlt className="text-2xl"/>
                            <span className="text-lg">Contact</span>
                        </li>
                    </Link>
                </ul>

                {user && user.email === 'admin@gmail.com' && (
                    <ul className="flex flex-col gap-y-4 py-5 border-b border-gray-200">
                        <Link to="admin/products">
                            <li className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-emerald-600 group cursor-pointer">
                                <span
                                    className="absolute w-1.5 h-8 bg-emerald-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                                />
                                <GiGlassShot className="text-2xl"/>
                                <span className="text-lg">Products</span>
                            </li>
                        </Link>
                        <Link to="admin/orders">
                            <li className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-emerald-600 group cursor-pointer">
                                <span
                                    className="absolute w-1.5 h-8 bg-emerald-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                                />
                                <IoReceipt className="text-2xl"/>
                                <span className="text-lg">Orders</span>
                            </li>
                        </Link>
                    </ul>
                )}

                <ul className="flex flex-col gap-y-4 pt-5">
                    <Link to="user/profile">
                        <li className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-emerald-600 group cursor-pointer">
                            <span
                                className="absolute w-1.5 h-8 bg-emerald-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                            />
                            <CgProfile className="text-2xl"/>
                            <span className="text-lg">Profile</span>
                        </li>
                    </Link>
                    <Link to="user/orders">
                        <li className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-emerald-600 group cursor-pointer">
                            <span
                                className="absolute w-1.5 h-8 bg-emerald-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                            />
                            <RiShoppingBag2Fill className="text-2xl"/>
                            <span className="text-lg">My Order</span>
                        </li>
                    </Link>
                </ul>
            </aside>

            <main className="flex-1 pb-8">
                <Routes>
                    <Route path="user/profile" element={<Profile />} />
                    <Route path="user/orders" element={<Orders />} />
                    <Route path="admin/products" element={<ProductsManagement />} />
                    <Route path="admin/orders" element={<OrdersManagement />} />
                    <Route path="admin/orders/:orderId" element={<OrderDetail />} />
                </Routes>
            </main>
        </div>
    )
}

export default Management