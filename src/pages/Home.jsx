import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import { FaShippingFast } from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";

import { HeroSlide } from '../components';

import MilkTea from "../img/MilkTea.jpg";
import Juices from "../img/Juices.webp";
import Drinks from "../img/Drinks.png";
import Coffee from "../img/Coffee.jpg";
import Tiramisu from "../img/Tiramisu.jpg";

import bg from '../img/banner-home.jpg'

const Home = () => {

	useEffect(() => {
		window.scrollTo(0,0);
	}, [])

  let navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full py-[22vw] px-8 bg-contain md:bg-cover bg-no-repeat bg-fixed"
        style={{backgroundImage: `url(${bg})`}}  
      >
        <div className="w-full md:w-2/3 lg:w-3/5">
          <h2 className="font-['Itim'] text-4xl md:text-6xl font-bold text-white text-center">Quality Flavors and Original Drinks
            <span className="block text-2xl md:text-3xl font-normal mt-3">Visit us now at the nearest Tan Cha location to you! </span>
          </h2>
        </div>
      </div>

      <section className="max-w-[1920px] mx-auto w-full px-6 md:px-10 xl:px-20 my-10">
        <div className="flex justify-around">
          <div className="lg:flex lg:items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 lg:mb-0 lg:mr-5 rounded-full border-2 border-dashed border-orange-500 flex justify-center items-center">
              <FaShippingFast className="text-gray-500 text-3xl md:text-4xl" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-base md:text-xl font-bold text-headingColor mb-1">Free Shipping</p>
              <p className="text-sm md:text-base text-gray-500">For all order over $25</p>
            </div>
          </div>

          <div className="lg:flex lg:items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 lg:mb-0 lg:mr-5 rounded-full border-2 border-dashed border-orange-500 flex justify-center items-center">
              <GiRibbonMedal className="text-gray-500 text-4xl md:text-5xl" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-base md:text-xl font-bold text-headingColor mb-1">Superior Quality</p>
              <p className="text-sm md:text-base text-gray-500">Quality Products</p>
            </div>
          </div>

          <div className="lg:flex lg:items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 lg:mb-0 lg:mr-5 rounded-full border-2 border-dashed border-orange-500 flex justify-center items-center">
              <BiSupport className="text-gray-500 text-3xl md:text-4xl" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-base md:text-xl font-bold text-headingColor mb-1">24/7 Support</p>
              <p className="text-sm md:text-base text-gray-500">Get support all day</p>
            </div>
          </div>
        </div>  
      </section>

      <HeroSlide />

      <section className="max-w-[1920px] mx-auto w-full px-6 md:px-10 xl:px-20 my-6">
          <div className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
                  Featured caregories
              </p>
          </div>
          <div className="grid grid-rows-2 grid-cols-3 gap-5 my-6">
            <div 
              className="bg-cover bg-center relative overflow-hidden group"
              style={{backgroundImage: `url(${MilkTea})`}}
            >
              <div className="absolute w-full h-full bg-zinc-800/60 -translate-y-full group-hover:translate-y-0 opacity-50 group-hover:opacity-100 transition ease-in flex justify-center items-center">
                <p className="w-fit p-[3%] bg-zinc-800/80 text-orange-600 text-xl sm:text-4xl lg:text-5xl opacity-50 group-hover:opacity-100">Milk Tea</p>
              </div>
            </div>

            <div 
              className="h-[60vw] md:h-[40vw] row-span-2 bg-contain bg-no-repeat bg-bottom text-center"
              style={{backgroundImage: `url(${Drinks})`}}
            >
              <p className="text-orange-600 text-3xl lg:text-5xl">Drinks</p>
              <p className="text-sm lg:text-base my-2">Protect the health of every home</p>
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                className=" text-sm lg:text-base bg-gradient-to-br from-orange-400 to-orange-500 w-auto px-4 py-2 rounded-full hover:shadow-lg transition-all ease-in-out duration-100"
                onClick={() => navigate("/menu")}
              >
                Order Now
              </motion.button>
            </div>

            <div 
              className="bg-cover relative overflow-hidden group"
              style={{backgroundImage: `url(${Coffee})`}}
            >
              <div className="absolute w-full h-full bg-zinc-800/60 -translate-y-full group-hover:translate-y-0 opacity-50 group-hover:opacity-100 transition ease-in flex justify-center items-center">
                <p className="w-fit p-[3%] bg-zinc-800/80 text-orange-600 text-xl sm:text-4xl lg:text-5xl opacity-50 group-hover:opacity-100">Coffee</p>
              </div>
            </div>
            
            <div 
              className="bg-cover bg-center relative overflow-hidden group"
              style={{backgroundImage: `url(${Juices})`}}
            >
              <div className="absolute w-full h-full bg-zinc-800/60 -translate-y-full group-hover:translate-y-0 opacity-50 group-hover:opacity-100 transition ease-in flex justify-center items-center">
                <p className="w-fit p-[3%] bg-zinc-800/80 text-orange-600 text-xl sm:text-4xl lg:text-5xl opacity-50 group-hover:opacity-100">Juices</p>
              </div>
            </div>

            <div 
              className="bg-cover bg-bottom relative overflow-hidden group"
              style={{backgroundImage: `url(${Tiramisu})`}}
            >
              <div className="absolute w-full h-full bg-zinc-800/60 -translate-y-full group-hover:translate-y-0 opacity-50 group-hover:opacity-100 transition ease-in flex justify-center items-center">
                <p className="w-fit p-[3%] bg-zinc-800/80 text-orange-600 text-xl sm:text-4xl lg:text-5xl opacity-50 group-hover:opacity-100">Cake</p>
              </div>
            </div>
          </div>
      </section>
    </div>
  )
}

export default Home