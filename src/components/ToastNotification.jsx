import React from 'react';
import { motion } from "framer-motion";

import { IoIosCheckmarkCircle } from "react-icons/io";

const ToastNotification = ({ type, message }) => {
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut"}}
            exit={{ opacity: 0 }}
            className={`z-50 fixed left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-white shadow-lg border-l-4 ${type === "Success" ? "border-green-600" : ""} w-fit px-4 py-2 rounded-md`}
        >
            <IoIosCheckmarkCircle className={`text-lg ${type === "Success" ? "text-green-600 mr-4" : ""}`}/>
            <div>
                <h2 className="font-medium text-green-600">{type}</h2>
                <p className="text-sm text-gray-500">{message}</p>
            </div>
        </motion.div>
    )
}

export default ToastNotification