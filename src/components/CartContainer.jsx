import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import { IoTrashOutline, IoClose } from "react-icons/io5";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

const CartContainer = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const [{ cartShow, cartItems, products , user }, dispatch] = useStateValue();

  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

	const logIn = async () => {
		if (!user) {
        navigate('/signin')
			dispatch({
				type: actionType.SET_TEMPORARY_PARAM,
				temporaryParam: location.pathname,
			  });
		}
	}

  const goToCheck = () => {
    showCart();
    navigate('/checkout');
  }

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <div className="w-full h-full fixed z-[99] top-0 right-0">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30" onClick={showCart}></div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }} 
        className="absolute right-0 w-full sm:w-500 h-full bg-white"
      >
        <div className="relative h-full overflow-auto z-[1]">
          <div className="flex flex-col w-full h-full">
            <div className="w-full z-50 flex items-center justify-between px-6 py-4 border-b">
              <p className="text-xl font-semibold">Shopping Cart</p>
              <div className="flex items-center justify-between">
                <p
                  className="flex items-center gap-2 p-1 px-2 my-2 cursor-pointer text-gray-500 hover:text-black transition duration-150 ease-in"
                  onClick={clearCart}
                >
                  <IoTrashOutline />Clear
                </p>
                <motion.div whiletap={{ scale: 0.75 }} onClick={showCart}>
                  <IoClose className="text-2xl cursor-pointer mx-3" />
                </motion.div>
              </div>
              
            </div>

            {/* cart Items section */}
            {cartItems && cartItems.length > 0 ? (
              <>
                <div className="w-full h-510 md:h-42 px-6 py-2 flex flex-col overflow-y-scroll scrollbar-none">
                  {/* cart Item */}
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      setFlag={setFlag}
                      flag={flag}
                    />
                  ))}
                </div>

                <div className="px-5 py-5 border-t md:px-7 md:py-6">
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col gap-2 basis-4/5">
                      <p className="font-medium">Subtotal:</p>
                      <p className="text-sm text-gray-500">Final price and discounts will be determined at the time of payment processing.</p>
                    </div>
                    <p className="text-lg font-medium basis-1/5 flex justify-end">{new Intl.NumberFormat().format(tot)}</p>
                  </div>

                  {user ? (
                    <button
                      whiletap={{ scale: 0.8 }}
                      type="button"
                      className="w-full p-2 rounded-full bg-headingColor text-amber-500 cursor-pointer hover:text-headingColor hover:bg-amber-500 transition ease-in-out duration-300 text-lg mt-5 hover:shadow-lg"
                      onClick={goToCheck}
                    >
                      Proceed To Checkout
                    </button>
                  ) : (
                    <button
                      whiletap={{ scale: 0.8 }}
                      type="button"
                      className="w-full p-2 rounded-full bg-headingColor text-amber-500 cursor-pointer hover:text-headingColor hover:bg-amber-500 transition ease-in-out duration-300 text-lg mt-5 hover:shadow-lg"
                      onClick={logIn}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              </>
            ) : (
              <EmptyCart />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartContainer;