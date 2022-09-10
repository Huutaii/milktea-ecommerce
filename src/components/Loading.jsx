import React from "react";

import icon from '../img/loading.png'

const Loading = () => {
  return (
		<div className="max-w-[1920px] relative h-screen px-6 md:px-10 xl:px-20 flex-grow">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full text-center leading-normal">
        <div 
          className="inline-block w-40 h-40 my-4 bg-cover scale-[1.4] -z-1"
          style={{backgroundImage: `url(${icon})`}}>
        </div>
        <div className="flex items-center justify-center space-x-2 animate-bounce my-3">
            <div className="w-8 h-8 bg-[#EABF9F] rounded-full"></div>
            <div className="w-8 h-8 bg-[#B68973] rounded-full delay-100"></div>
            <div className="w-8 h-8 bg-[#1E212D] rounded-full delay-300"></div>
        </div>
				<h2 className="text-[22px] font-bold m-0 uppercase">Loading...</h2>
				<p className="my-4 font-light">Just one moment, please.</p>
			</div>
		</div>
  );
};

export default Loading;
