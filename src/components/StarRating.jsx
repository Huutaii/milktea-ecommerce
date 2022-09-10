import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

const StarRating = ({ disabled, rating, setRating, children }) => {
    
    return (
        <div className="flex items-center">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={i} className={`${disabled ? "" : "cursor-pointer"}`}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            disabled={disabled ? true : false}
                            className="hidden"
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}/>
                    </label>
                )
            })}
            {children}
        </div>
    )
}

export default StarRating