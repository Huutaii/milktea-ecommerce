import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";

const ScrollTop = () => {
    const [backtoTop, setbacktoTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 200) {
                setbacktoTop(true);
            } else {
                setbacktoTop(false);
            }
        })
    }, [])

    const scrolltoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    
    return (
        <>
            {backtoTop && (
                    <div className="z-10 fixed bottom-5 right-5 p-4 bg-textColor rounded-full cursor-pointer animate-bounce" onClick={scrolltoTop}>
                        <IoIosArrowUp className="text-white" />
                    </div>
                )
            }
        </>
    )
}

export default ScrollTop