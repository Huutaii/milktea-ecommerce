import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { IoClose } from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";
import ToastNotification from './ToastNotification';

const ProductModal = () => {
  const [{ cartItems, modalShow, dataModal }, dispatch] = useStateValue();

  let navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [items, setItems] = useState(cartItems);
  const [showToast, setShowToast] = useState(false);

  const showModal = () => {
    dispatch({
      type: actionType.SET_MODAL_SHOW,
      modalShow: !modalShow,
    });
  };
  
  const goToDetail = () => {
    showModal();
    navigate('/product/' + dataModal.id, {state: dataModal});
  }

  const addtocart = () => {
      dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: items,
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleToastNotification = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false)
    }, 2500);
  }
  
  useEffect(() => {
      addtocart();
  }, [items]);

  return (
    <div className="fixed bg-black bg-opacity-70 inset-0 z-50 p-4 md:p-5">
      {showToast && <ToastNotification message="The product has been added to cart" type="Success"/>}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut"}}
        exit={{ opacity: 0, y: -50 }}
        className="relative h-full mx-auto w-full"
      >
        <div className="w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg">
          <button 
            className="fixed z-10 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow text-gray-600 transition duration-200 focus:outline-none focus:text-gray-800 focus:shadow-md hover:text-gray-800 hover:shadow-md -top-3.5 md:-top-4 -right-3.5 md:-right-4"
            onClick={showModal}
          >
            <IoClose />
          </button>
          <div className="overflow-y-auto h-full rounded-lg max-h-[calc(100vh_-_120px)]">
            <div className="rounded-lg bg-white">
              <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
                <div className="w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
                  <img src={dataModal.imageURL} className="lg:object-cover lg:w-full lg:h-full" />
                </div>
                <div className="flex flex-col p-5 md:p-8 w-full">
                  <div className="pb-5">
                    <h2 className="mb-2 md:mb-2.5 block -mt-1.5 text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">{dataModal.title}</h2>
                    <p className="text-sm leading-6 md:text-body md:leading-7">Category: {dataModal.category}</p>
                    <div className="mt-3 text-heading font-semibold text-base md:text-xl lg:text-2xl">{new Intl.NumberFormat().format(dataModal.price)} VND</div>
                  </div>
                  {dataModal.size.length > 0 &&
                    <div className="mb-4">
                      <h3 className="text-base md:text-lg font-semibold mb-2.5">Size</h3>
                      <div className="flex flex-wrap -mr-3">
                        {dataModal.size.map((size, index) => (
                            <div key={index}>
                                <input type="radio" name="radio-size" id={size} className="hidden" />
                                <label 
                                    htmlFor={size} 
                                    className="lbl-radio cursor-pointer rounded border w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 mr-2 md:mr-3 flex justify-center items-center text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black"
                                    onClick={() => setSize(size)}
                                >
                                    {size}
                                </label>
                            </div>
                        ))}
                      </div>
                    </div>
                  }
                  <div className="pt-2 md:pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                        <button 
                            className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-10 md:w-12 text-heading border-r border-gray-300 hover:text-amber-500 hover:bg-headingColor"
                            onClick={() => setQty(qty > 1 ? qty-1 : 1)}
                        >
                            <BiMinus />
                        </button>
                        <span className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-12  md:w-20 xl:w-24">{qty}</span>
                        <button 
                            className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-10 md:w-12 text-heading border-l border-gray-300 hover:text-amber-500 hover:bg-headingColor"
                            onClick={() => setQty(qty+1)}
                        >
                            <BiPlus />
                        </button>
                      </div>
                      <button 
                          className={`only:odd:text-sm leading-4 inline-flex items-center transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 ${dataModal.size.length > 0 && size === "" ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:text-headingColor hover:bg-amber-500"} ml-4 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-full`}
                          disabled={dataModal.size.length > 0 && size === "" ? true : false}
                          onClick={() => { if(cartItems.some(function(cartItem) {return cartItem.id === dataModal.id+size})) {
                            const newcartItem = cartItems.find(function(cartItem) {return cartItem.id === dataModal.id+size})
                            setItems([...cartItems.filter(function(cartItem) {return cartItem.id !== dataModal.id+size}), {...newcartItem, qty: newcartItem.qty+1}]);
                          } else { 
                            setItems(size && size === "L" ? [...cartItems, {...dataModal, id: dataModal.id+size, price: parseFloat(dataModal.price)+8000, qty: qty, size: size}] : [...cartItems, {...dataModal, id: dataModal.id+size, qty: qty, size: size}]);
                          }  
                            handleToastNotification();
                          }}
                      >Add to Cart</button>
                    </div>
                    <button 
                        className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 w-full"
                        onClick={goToDetail}
                    >View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductModal;
