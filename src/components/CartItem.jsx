import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { fetchCart } from "../utils/fetchLocalStorageData";
let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="w-full py-4 border-b last:border-b-0 flex items-center gap-4">
      <img
        src={item?.imageURL}
        className="w-28 h-28 rounded object-contain"
        alt=""
      />

      {/* name section */}
      <div className="basis-full flex flex-col gap-2">
        <p>{item.title}</p>
        <p className="text-sm text-gray-500">
          Unit Price: {new Intl.NumberFormat().format(item.price)} VND
        </p>
        {item.size && 
          <p className="text-sm text-gray-500">
            Size: {item.size}
          </p>
        }

        {/* button section */}
        <div className="flex justify-between">
          <div className="group flex items-center gap-2">
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => updateQty("remove", item.id)}
              className="p-1 border rounded-full cursor-pointer hover:bg-[#012738] hover:text-orange-500 transition-all duration-300 ease"
            >
              {qty === 1 ? <BiTrash /> : <BiMinus />}
            </motion.div>

            <p className="w-5 h-5 rounded-sm flex items-center justify-center">
              {qty}
            </p>

            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => updateQty("add", item.id)}
              className="p-1 border rounded-full cursor-pointer hover:bg-[#012738] hover:text-orange-500 transition-all duration-300 ease"
            >
              <BiPlus />
            </motion.div>
          </div>
          <p className="font-medium">
            {new Intl.NumberFormat().format(item.price* qty)} VND
          </p>
        </div>
      </div>
    
      
    </div>
  );
};

export default CartItem;
