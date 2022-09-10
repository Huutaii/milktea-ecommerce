import React, { useState } from 'react';

import { IoCloseOutline } from 'react-icons/io5'
import { FiSearch } from 'react-icons/fi'

const Search = ({ onSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        onSubmit(e.target.value)
    }

    const deleteSearchTerm = (value) => {
        setSearchTerm(value);
        onSubmit(value)
    }

    return (
        <div className='w-full lg:w-[350px] px-4 py-2 border border-headingColor rounded-full my-2 flex items-center gap-3'>
            <FiSearch className='text-xl' />
            <input
                className='w-full h-full text-sm bg-transparent outline-none border-none placeholder:text-gray-400'
                id='search'
                value={searchTerm}
                required
                placeholder='Search Here...'
                type='text'
                onChange={handleSearchTermChange}
            />
            {searchTerm && (
                <div className='text-xl cursor-pointer' onClick={() => deleteSearchTerm('')}>
                    <IoCloseOutline />
                </div>
            )}
        </div>
    )
}

export default Search