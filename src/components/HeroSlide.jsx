import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

import BannerJuices from "../img/Banner-Juices.jpg";
import BannerMilkTea from "../img/Banner-MilkTea.jpg";
import BannerCake from "../img/Banner-Cake.jpg";

const HeroSlide = () => {

  return (
    <section className="w-full mb-6">
      <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                grabCursor={true}
                loop={true}
                autoplay={{delay: 5000, disableOnInteraction: false,}}
                spaceBetween={0}
                slidesPerView={1}
      >
        <SwiperSlide>
          <div 
            className="h-[34vw] bg-cover bg-center flex items-center"
            style={{backgroundImage: `url(${BannerJuices})`}}  
          >
            <div className="w-3/5 text-center">
              <p className="text-[4.5vw] font-bold text-green-800 font-['Itim']">TRÀ THƠM ĐẬM VỊ</p>
              <p className="text-[4.5vw] font-bold text-red-700 font-['Itim']">VẢI MỌNG TƯƠI NGON</p>
              <p className="mt-[4vw] text-[2.5vw] text-green-800 font-['Itim']">- Chào Hè Thanh Mát -</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div 
            className="h-[34vw] bg-cover bg-center flex items-center"
            style={{backgroundImage: `url(${BannerMilkTea})`}}  
          >
            <div className="w-3/5 text-center">
              <p className="text-[5.5vw] font-extrabold text-white font-['Itim']">Instant Milk Tea</p>
              <p className="text-[3.5vw] font-semibold text-white font-['Itim']">Always beside you!</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div 
            className="h-[34vw] bg-cover bg-center relative"
            style={{backgroundImage: `url(${BannerCake})`}}  
          >
            <div className="w-3/5 text-center absolute top-[30%] right-[-5%]">
              <p className="text-[6vw] font-bold text-orange-700 font-['Mali']">Mouse Cake</p>
              <p className="text-[3vw] text-orange-700 font-['Mali']">"Vị ngọt đến từ trái tim"</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default HeroSlide