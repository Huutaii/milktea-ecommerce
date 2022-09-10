import React from 'react'

const Input = ({ label, type, disabled, placeholder, value, setValue, style, children }) => {
  return (
    <>
        <label className="block text-gray-600 font-semibold text-sm leading-none mb-3">{label}</label>
        <input 
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled ? true : false}
            onChange={(e) => setValue(e.target.value)}
            className={`py-2 px-4 md:px-5 w-full appearance-none border text-sm rounded-md bg-white ${style} focus:outline focus:outline-1 h-11 md:h-12`}
            aria-invalid="true"
        />
        {children}
    </>
  )
}

export default Input
