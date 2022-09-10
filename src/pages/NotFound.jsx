import React from 'react'
import { Link } from "react-router-dom";

import icon from '../img/emoji.webp'

const NotFound = () => {
	return (
		<div className="max-w-[1920px] relative h-screen px-6 md:px-10 xl:px-20 flex-grow">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full text-center leading-normal">
				<div className="h-[190px]">
					<h1 className="text-[146px] font-bold m-0">
						4
						<span 
							className="inline-block w-[120px] h-[120px] bg-cover scale-[1.4] -z-1"
							style={{backgroundImage: `url(${icon})`}}>
						</span>
						4
					</h1>
				</div>
				<h2 className="text-[22px] font-bold m-0 uppercase">Oops! Page Not Be Found</h2>
				<p className="mx-6 sm:mx-0 my-8 font-light">Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable</p>
				<Link to="/" className="inline-block py-3 px-[30px] font-bold rounded-full bg-headingColor text-amber-500 hover:text-white hover:bg-amber-500 transition ease-in-out duration-300">Back to homepage</Link>
			</div>
		</div>
	)
}

export default NotFound
