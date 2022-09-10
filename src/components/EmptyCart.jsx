import React from 'react'
import { Link } from "react-router-dom";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import emptyCart from '../img/emptyCart.png'

const EmptyCart = () => {
  const [{ cartShow }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };

  return (
    <div className="relative h-screen flex-grow overflow-y-scroll">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-full text-center leading-normal">
            <div className="h-[190px]">
                <div 
                    className="inline-block w-[237px] h-[120px] bg-cover scale-[1.4] -z-1"
                    style={{backgroundImage: `url(${emptyCart})`}}>
                </div>
            </div>
            <h2 className="text-[22px] font-bold m-0 uppercase">Your cart is empty</h2>
            <p className="my-8 font-light">You haven't added anything in your cart yet. Start adding the products you like.</p>
            <Link to="/menu" onClick={showCart} className="inline-block py-3 px-[30px] font-bold rounded-full bg-amber-500 text-white hover:text-amber-500 hover:bg-[#012738] transition ease-in-out duration-300">Add product</Link>
        </div>
    </div>
  )
}

export default EmptyCart