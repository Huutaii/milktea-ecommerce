import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';

import { firestore } from '../firebase.config'
import { useStateValue } from "../context/StateProvider";
import { districts } from '../utils/data';
import { actionType } from "../context/reducer";

import { Banner, Input } from '../components';
import { IoIosArrowDown } from "react-icons/io";
import bg from "../img/bg-checkout.jpg";

const Checkout = () => {
    
	useEffect(() => {
		window.scrollTo(0,0);
	}, [])
    
    const today = new Date();
    let navigate = useNavigate();

    const [{ user, cartItems }, dispatch] = useStateValue();
    
    const districtTextRef = useRef(null);

    const [isSubmit, setisSubmit] = useState(false)
    const [isDropdown, setisDropdown] = useState(false)
    const [name, setName] = useState(user && user.displayName ? user.displayName : '')
    const [district, setDistrict] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState(user && user.phoneNumber ? user.phoneNumber : '')
    const [email, setEmail] = useState(user && user.email ? user.email : '')
    const [note, setNote] = useState('')

    const [ship, setShip] = useState(0);
    const [total, setTotal] = useState(0);

    const order = async (data) => {
		await setDoc(doc(firestore, 'orders', `${data.orderId}`), data, { merge: true })
	}

    const clearCart = () => {
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: [],
        });
    
        localStorage.setItem("cartItems", JSON.stringify([]));
    };

    const chooseDistrict = (district, shipprice) => {
        setDistrict(district);
        setShip(shipprice);
        districtTextRef.current.innerHTML = district;
        setisDropdown(!isDropdown);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setisSubmit(true)
        if(district && address && phone && email) {
            const data = {
                orderId: `${Date.now()}`,
                idUser: user.uid,
                nameUser: name,
                photoUser: user.photoURL,
                email: email,
                phone: phone,
                time: today,
                address: address + ", " + district,
                shipPrice: ship,
                totalPrice: total,
                note: note,
                status: 2,
                products: cartItems,
            }
            order(data);
            clearCart();
            navigate('/orders');
        }
    }

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);
        setTotal(totalPrice);
    }, [total]);

    document.addEventListener('mousedown', (e) => {
		if (isDropdown && !e.target.closest('.district-modal')) {
			setisDropdown(false)
		}
	})

    return (
        <div>
            <Banner backgroundImage={bg}>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
                    <span className="font-['Satisfy'] block font-normal mb-3">explore</span>
                    Checkout
                </h2>
            </Banner>
            <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
                <div className="py-12 xl:py-14 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row gap-y-8 w-full">
                    <div className="md:w-full lg:w-3/5 flex h-full flex-col -mt-1.5">
                        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">Shipping Address</h2>
                        <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col justify-center">
                            <div className="flex flex-col space-y-4 lg:space-y-5">
                                <div className="block">
                                    <Input label="Name" type="text" value={name} setValue={setName} />
                                </div>

                                <div className="flex flex-row space-y-0">
                                    <div className="w-1/5 ">
                                        <label className="block text-gray-600 font-semibold text-sm leading-none mb-3">District *</label>
                                        <div className="district-modal relative">
                                            <button 
                                                type="button" 
                                                className={`flex justify-between items-center py-2 px-4 w-full border text-sm rounded-md bg-white ${district.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"} focus:outline focus:outline-1 h-11 md:h-12`}
                                                onClick={() => setisDropdown(!isDropdown)}
                                            >
                                                <p ref={districtTextRef} className="truncate mr-2"></p>
                                                <IoIosArrowDown />
                                            </button>
                                            {district.trim().length === 0 && isSubmit &&
                                                <p className="my-2 text-xs text-red-500">District is required</p>
                                            }
                                            { isDropdown && (
                                                <div className="absolute top-14 z-10 w-36 h-28 overflow-y-scroll bg-white rounded divide-y divide-gray-100 shadow border">
                                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                                        {districts.map((district) => (
                                                            <li 
                                                                key = {district.id}
                                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                                onClick={() => chooseDistrict(district.district , district.money)}
                                                            >
                                                                {district.district}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-4/5 ml-3 mt-2 md:mt-0">
                                        <Input label="Address *" type="text" value={address} setValue={setAddress} style={address.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                                            {address.trim().length === 0 && isSubmit &&
                                                <p className="my-2 text-xs text-red-500">Address is required</p>
                                            }
                                        </Input>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                                    <div className="w-full lg:w-1/2 ">
                                        <Input label="Phone/Mobile *" type="text" value={phone} setValue={setPhone} style={phone.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                                            {phone.trim().length === 0 && isSubmit &&
                                                <p className="my-2 text-xs text-red-500">Phone number is required</p>
                                            }
                                        </Input>
                                    </div>
                                    <div className="w-full lg:w-1/2 lg:ml-3 mt-2 md:mt-0">
                                        <Input label="Email *" type="email" value={email} setValue={setEmail} style={email.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                                            {email.trim().length === 0 && isSubmit &&
                                                <p className="my-2 text-xs text-red-500">Email is required</p>
                                            }
                                        </Input>
                                    </div>
                                </div>

                                <div className="relative pt-3 xl:pt-6">
                                    <label className="block text-gray-600 font-semibold text-sm leading-none mb-3">Order Notes (Optional)</label>
                                    <textarea
                                        className="px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-sm bg-white border border-gray-300 focus:shadow focus:outline focus:outline-1"
                                        rows="4"
                                        placeholder="Notes about your order, e.g. special notes for delivery"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex w-full">
                                    <button data-variant="flat" className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 hover:shadow-cart w-full sm:w-auto">Place Order</button>
                                </div>

                            </div>
                        </form>
                    </div>

                    <div className="md:w-full lg:w-2/5 md:ml-7 lg:ml-10 xl:ml-14 flex flex-col h-full -mt-1.5">
                        <div className="md:pt-0 2xl:pl-4">
                            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">Your Order</h2>
                            <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-200 text-sm font-semibold text-heading">
                                <span>Product</span>
                                <span className="ml-auto flex-shrink-0">Subtotal (VND)</span>
                            </div>

                            { /* Order List */ }
                            <div className="px-3">
                                {cartItems && cartItems.length > 0 && cartItems.map((item) => (
                                    <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm w-full font-semibold last:border-b-0 last:text-base last:pb-0">
                                        <img
                                            src={item.imageURL}
                                            className="w-24 h-24 rounded object-contain"
                                            alt=""
                                        />
                                        <div className="pl-3">
                                            <h6>{item.title}</h6>
                                            <p className="text-sm font-normal text-gray-500">Unit Price: {new Intl.NumberFormat().format(item.price)} VND</p>
                                            {item.size && <p className="text-sm font-normal text-gray-500">Size: {item.size}</p>}
                                            <p className="text-sm font-normal text-gray-500">Quantity: {item.qty}</p>
                                        </div>
                                        
                                        <div className="flex ml-auto text-sm pl-2 flex-shrink-0">{new Intl.NumberFormat().format(item.price * item.qty)}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                                Subtotal
                                <span className="ml-auto flex-shrink-0">{new Intl.NumberFormat().format(total)}</span>
                            </div>
                            <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                                Shipping
                                <span className="ml-auto flex-shrink-0">{new Intl.NumberFormat().format(ship)}</span>
                            </div>
                            <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                                Total
                                <span className="ml-auto flex-shrink-0">{new Intl.NumberFormat().format(total + ship)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
