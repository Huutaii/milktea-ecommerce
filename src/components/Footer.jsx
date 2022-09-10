import React from 'react'
import { Link, useNavigate } from "react-router-dom";

import Logo from "../img/logo.png";
import { IoIosSend } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { BsYoutube, BsTwitter } from "react-icons/bs";

const Footer = () => {
  let navigate = useNavigate();

  return (
    <footer className="w-screen px-6 md:px-10 xl:px-20 bg-headingColor">
      <div className="flex flex-wrap justify-between gap-10 py-16">
        <div>
          <div className="flex justify-center">
            <img src={Logo} className="w-40 object-cover cursor-pointer" alt="logo" onClick={() => navigate("/")}/>
          </div>
          <ul className="text-gray-400 leading-9">
              <li>Address: Ward 6, District 1, Ho Chi Minh City</li>
              <li>Phone: +1 1234 5678 90</li>
              <li>Email: example@example.com</li>
          </ul>
        </div>

        <div>
          <p className="text-white text-xl font-bold mb-6">Company Info</p>
          <ul className="text-gray-400 leading-9">
              <li>About Us</li>
              <li>Payment Methods</li>
              <li>Privacy Policy</li>
              <li>Our Sitemap</li>
              <li>Contact Us</li>
          </ul>
        </div>
        
        <div>
          <p className="text-white text-xl font-bold mb-6">Help & Support</p>
          <ul className="text-gray-400 leading-9">
              <li>Shipping Info</li>
              <li>Refunds</li>
              <li>How to Order</li>
              <li>How to Track</li>
              <li>Bonus Point</li>
          </ul>
        </div>

        <div className="flex-initial">
          <p className="text-white text-xl font-bold mb-6">Join Our Newsletter Now</p>
          <p className="text-gray-400 leading-9">Get E-mail updates about our latest shop and special offers.</p>
          <form onSubmit={(event) => event.preventDefault()} className="flex items-center">
            <input type="email" placeholder="Email" className="bg-[#4B6587] w-1/2 p-3.5 mr-2 rounded-l-md text-white"/>
            <button type="submit" className="group bg-[#4B6587] hover:bg-[#76BA99] w-[12%] py-3.5 rounded-r-md transition-all duration-300 ease">
              <IoIosSend className="text-2xl text-[#76BA99] group-hover:text-[#4B6587] transition-all duration-300 ease m-auto"/>
            </button>
          </form>
        </div>
      </div>
      
      <div className="py-6 space-y-3 md:flex items-center justify-between text-center text-gray-400 border-t-[#232a35] border-t">
        <p>Copyright ©2022 All rights reserved</p>
        <div className="flex justify-center gap-8 text-2xl">
          <FaFacebookF className="hover:text-blue-500 transition-all duration-300 ease-in-out cursor-pointer"/>
          <FiInstagram className="hover:text-pink-600 transition-all duration-300 ease-in-out cursor-pointer"/>
          <BsYoutube className="hover:text-red-600 transition-all duration-300 ease-in-out cursor-pointer"/>
          <BsTwitter className="hover:text-sky-500 transition-all duration-300 ease-in-out cursor-pointer"/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
