import React from 'react'

const Banner = ({ backgroundImage, children }) => {
  return (
    <div 
        className="flex justify-center p-10 relative bg-no-repeat bg-center bg-cover"
        style={{backgroundImage: `url(${backgroundImage})`}}
    >
        <div className="absolute top-0 left-0 bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80"></div>
        <div className="w-full flex items-center justify-center relative z-10 py-14 md:py-20 xl:py-24 2xl:py-32">
            {children}
        </div>
    </div>
  )
}

export default Banner