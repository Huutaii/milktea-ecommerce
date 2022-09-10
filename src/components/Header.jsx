import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

import { AiFillHome } from "react-icons/ai";
import { MdShoppingBasket, MdAdminPanelSettings, MdLogout } from "react-icons/md";
import { FaUser, FaCocktail, FaPhoneAlt } from "react-icons/fa";
import { GiGlassShot } from "react-icons/gi";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiArrowLeft } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BsChevronRight } from "react-icons/bs";
import { IoLogOut, IoReceipt , IoMenu, IoReturnDownBack } from "react-icons/io5";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import Logo from "../img/logo.png";

const Header = () => {
	let navigate = useNavigate();
	let location = useLocation();

	const [{ user, cartShow, cartItems, sidebarShow }, dispatch] = useStateValue();
	const [isMenuDisplay, setMenuDisplay] = useState(false)
	const [isAdminOption, setAdminOption] = useState(false)

	const logIn = () => {
		navigate('/signin')
		dispatch({
			type: actionType.SET_TEMPORARY_PARAM,
			temporaryParam: location.pathname,
			});
	}
  
	const logOut = () => {
		signOut(auth)
		setMenuDisplay(false);
		localStorage.clear();
		dispatch({
			type: actionType.SET_USER,
			user: null,
		});
	};

	const showCart = () => {
		dispatch({
			type: actionType.SET_CART_SHOW,
			cartShow: !cartShow,
		});
	};

	//Animation when scroll header
	const headerRef = useRef(null);
	useEffect(() => {
		const fixedHeader = () => {
			if((location.pathname.split("/")[1] === "") || (location.pathname.split("/")[1] === "menu") || (location.pathname.split("/")[1] === "contact")) {
				if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
					headerRef.current.classList.remove('h-32');
					headerRef.current.classList.add('bg-headingColor', 'h-24');
				} else {
					headerRef.current.classList.remove('bg-headingColor', 'h-24');
					headerRef.current.classList.add('h-32');
				}
			}
		}
		window.addEventListener('scroll', fixedHeader);
		return () => {
			window.removeEventListener('scroll', fixedHeader);
		};
	}, []);

	document.addEventListener('mousedown', (e) => {
		if (isMenuDisplay && !e.target.closest('.icon')) {
			setMenuDisplay(false)
		}
	})

	return (
		<>
		{((location.pathname.split("/")[1] === "") || (location.pathname.split("/")[1] === "menu") || (location.pathname.split("/")[1] === "contact")) && 
			<header ref={headerRef} className="fixed z-50 w-screen h-32 px-6 md:px-10 xl:px-20 transition-all ease duration-500">
			{/* PC & Tablet */}
					<div className="hidden md:flex w-full h-full items-center justify-between">
						<div className="flex items-center gap-8">
							<NavLink to="/" className="cursor-pointer">
								<img className="w-32 object-cover" src={Logo} alt="logo" />
							</NavLink>
							<NavLink
								to="/"
								style={({ isActive }) => ({
									color: isActive ? 'orange' : '',
								})}
								className="text-lg text-white hover:text-amber-500 cursor-pointer duration-100 transition-all ease-out"
							>
								Home
							</NavLink>
							<NavLink
								to="/menu"
								style={({ isActive }) => ({
									color: isActive ? 'orange' : '',
								})}
								className="text-lg text-white hover:text-amber-500 cursor-pointer duration-100 transition-all ease-out"
							>
								Menu
							</NavLink>
							<NavLink
								to="/contact"
								style={({ isActive }) => ({
									color: isActive ? 'orange' : '',
								})}
								className="text-lg text-white hover:text-amber-500 cursor-pointer duration-100 transition-all ease-out"
							>
								Contact Us
							</NavLink>
						</div>
						<div className="flex gap-8 items-center">

							<div 
								className="relative flex items-center justify-center"
								onClick={showCart}
							>
								<MdShoppingBasket className="text-white text-2xl cursor-pointer" />
								{cartItems && cartItems.length > 0 && (
									<div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
										<span className="text-xs text-white font-semibold">{cartItems.length}</span>
									</div>
								)}
							</div>

							<div className="icon relative">
								{user ? (
									<motion.img
										whileTap={{ scale: 0.8 }}
										className="w-10 min-w-[40] h-10 min-h-[40] drop-shadow-xl cursor-pointer rounded-full"
										onClick={() => setMenuDisplay(!isMenuDisplay)}
										src={user.photoURL}
										alt="avatar"
									/>
									) : ( <FaUser className="text-white text-xl cursor-pointer" onClick={logIn} /> )
								}
								{isMenuDisplay && (
									<motion.div
										initial={{ opacity: 0, scale: 0.6 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.6 }}
										className="p-2 w-[300px] bg-gray-50 shadow rounded-lg flex gap-2 absolute top-12 right-0 overflow-hidden"
									>
										<div className={`flex flex-col gap-2 w-[300px] ${isAdminOption ? "ml-[-295px]" : ""} transition-all ease duration-300`}>
											<div className="flex items-center gap-2 mx-2 px-4 py-3 bg-white shadow-md rounded-lg">
												<img
													src={user.photoURL}
													className="w-12 aspect-square rounded-full object-cover border border-gray-200"
												/>
												<div>
													<p className="font-semibold text-gray-700">{user.displayName}</p>
													<NavLink to="manage/user/profile" onClick={() => setMenuDisplay(false)}>
														<span className="text-sm text-blue-600 cursor-pointer hover:border-b hover:border-blue-600">See profiles</span>
													</NavLink>												
												</div>
											</div>
											<div>
												{user && user.email === 'admin@gmail.com' && (
													<div 
														className="p-2 flex items-center justify-between rounded-lg hover:bg-gray-200 cursor-pointer transition ease-in duration-300"
														onClick={() => setAdminOption(true)}
													>
														<div className="flex items-center gap-3">
															<div className="p-2 rounded-full bg-gray-300">
																<MdAdminPanelSettings className="w-6 h-6 fill-current" />
															</div>
															<p className="text-sm">Admin</p>
														</div>
														<BsChevronRight/>
													</div>												
												)}
												<NavLink to="manage/user/orders" onClick={() => setMenuDisplay(false)} className="p-2 flex items-center gap-3 rounded-lg hover:bg-gray-200 transition ease-in duration-300">
													<div className="p-2 rounded-full bg-gray-300">
														<RiShoppingBag2Fill className="w-6 h-6 fill-current" />
													</div>
													<p className="text-sm">Order Tracking</p>
												</NavLink>
												<div
													className="p-2 flex items-center gap-3 rounded-lg hover:bg-gray-200 cursor-pointer transition ease-in duration-300"
													onClick={logOut}
												>
													<div className="p-2 rounded-full bg-gray-300">
														<IoLogOut className="w-6 h-6 fill-current" />
													</div>
													<p className="text-sm">Log out</p>
												</div>
											</div>
										</div>
										<div className={`${isAdminOption ? "flex" : "hidden"} flex-col gap-2 w-[300px] transition-all ease duration-300`}>
											<div className="p-2 flex items-center gap-3">
												<button className="p-2 rounded-full hover:bg-gray-200 transition ease-in duration-300" onClick={() => setAdminOption(false)}>
													<HiArrowLeft className="w-6 h-6 fill-current" />
												</button>
												<p className="text-xl font-semibold">Admin</p>
											</div>
											<NavLink to="manage/admin/products" onClick={() => setMenuDisplay(false)} className="p-2 flex items-center gap-3 rounded-lg hover:bg-gray-200 transition ease-in duration-300">
												<div className="p-2 rounded-full bg-gray-300">
													<GiGlassShot className="w-6 h-6 fill-current" />
												</div>
												<p className="text-sm">Products Management</p>
											</NavLink>
											<NavLink to="manage/admin/orders" onClick={() => setMenuDisplay(false)} className="p-2 flex items-center gap-3 rounded-lg hover:bg-gray-200 transition ease-in duration-300">
												<div className="p-2 rounded-full bg-gray-300">
													<IoReceipt className="w-6 h-6 fill-current" />
												</div>
												<p className="text-sm">Orders Management</p>
											</NavLink>											
										</div>
									</motion.div>
								)}
							</div>
						</div>
					</div>

					{/* Mobile */}
					<div className="flex items-center justify-between md:hidden w-full h-full">

						<div>
							<IoMenu 
								className="text-white text-2xl cursor-pointer"
								onClick={() => dispatch({
									type: actionType.SET_SIDEBAR_SHOW,
									sidebarShow: true,
								})} 
							/>
						</div>

						<NavLink to="/" className="cursor-pointer">
							<img className="w-28 object-cover" src={Logo} alt="logo" />
						</NavLink>

						<div 
							className="relative flex items-center justify-center"
							onClick={showCart}
						>
							<MdShoppingBasket className="text-white text-2xl cursor-pointer" />
							{cartItems && cartItems.length > 0 && (
								<div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
									<span className="text-xs text-white font-semibold">{cartItems.length}</span>
								</div>
							)}
						</div>
					</div>
			</header>
		}
			{sidebarShow && 
				<div className="w-full h-full fixed z-[999] top-0 left-0">
					<div 
					className="absolute top-0 left-0 w-full h-full bg-black opacity-30" 
						onClick={() => dispatch({
							type: actionType.SET_SIDEBAR_SHOW,
							sidebarShow: false,
						})}>
					</div>
					<motion.div
						initial={{ opacity: 0, x: -200 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -200 }} 
						className="absolute left-0 w-full sm:w-340 h-full bg-white px-4 py-8 overflow-y-scroll"
					>
						<IoReturnDownBack 
							className="text-2xl cursor-pointer"
							onClick={() => dispatch({
								type: actionType.SET_SIDEBAR_SHOW,
								sidebarShow: false,
							})}
						/>
						<div className="border-b py-4">
							{user ? (
								<>
									<p className="flex items-center justify-start gap-5 px-4 py-4 text-headingColor text-lg">
										<motion.img
											whileTap={{ scale: 0.8 }}
											className="w-10 min-w-[40] h-10 min-h-[40] drop-shadow-xl rounded-full"
											src={user.photoURL}
											alt="avatar"
										/>{user.displayName}
									</p>
									{user && user.email === 'admin@gmail.com' && (
										<>
											<NavLink to="manage/admin/products">
												<p className="flex items-center justify-start gap-5 rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg"
													onClick={() => dispatch({
														type: actionType.SET_SIDEBAR_SHOW,
														sidebarShow: false,
													})}
												>
													<GiGlassShot /> Product Management
												</p>
											</NavLink>
											<NavLink to="manage/admin/orders">
												<p className="flex items-center justify-start gap-5 rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg"
													onClick={() => dispatch({
														type: actionType.SET_SIDEBAR_SHOW,
														sidebarShow: false,
													})}
												>
													<IoReceipt /> Order Management
												</p>
											</NavLink>
										</>
									)}
									<NavLink to="/manage/user/profile">
										<p className="flex items-center justify-start gap-5 rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg"
											onClick={() => dispatch({
												type: actionType.SET_SIDEBAR_SHOW,
												sidebarShow: false,
											})}
										>
											<CgProfile /> Profile
										</p>
									</NavLink>
									<NavLink to="/manage/user/orders">
										<p className="flex items-center justify-start gap-5 rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg"
											onClick={() => dispatch({
												type: actionType.SET_SIDEBAR_SHOW,
												sidebarShow: false,
											})}
										>
											<RiShoppingBag2Fill /> My Order
										</p>
									</NavLink>
								</>
								) : ( <p className="flex items-center justify-start gap-5 rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg" onClick={logIn}>
										<FaUser /> Account
									</p> )
							}
						</div>
						<div className="border-b py-4">
							<NavLink to="/">
								<p className="flex items-center justify-start gap-5 rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg"
									onClick={() => dispatch({
										type: actionType.SET_SIDEBAR_SHOW,
										sidebarShow: false,
									})}
								>
									<AiFillHome /> Home
								</p>
							</NavLink>
							<NavLink to="/menu">
								<p className="flex items-center justify-start gap-5 rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg"
									onClick={() => dispatch({
										type: actionType.SET_SIDEBAR_SHOW,
										sidebarShow: false,
									})}
								>
									<FaCocktail /> Menu
								</p>
							</NavLink>
							<NavLink to="/contact">
								<p className="flex items-center justify-start gap-5 rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg"
									onClick={() => dispatch({
										type: actionType.SET_SIDEBAR_SHOW,
										sidebarShow: false,
									})}
								>
									<FaPhoneAlt /> Contact
								</p>
							</NavLink>
						</div>
						{user &&
							<div className="py-4">
								<p
									className="flex items-center justify-center gap-5 bg-slate-200 rounded-md mx-4 py-2 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-headingColor text-lg"
									onClick={logOut}
								>
									Logout <MdLogout />
								</p>
							</div>
						}
					</motion.div>	
				</div>
			}		
		</>
	)
}

export default Header
