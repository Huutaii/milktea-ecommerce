import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'

import { Banner, Loading, Pagination, ProductList, Search } from '../components'
import { firestore } from '../firebase.config'

import { categories } from '../utils/data'
import { RiBubbleChartFill } from 'react-icons/ri'
import { HiMenuAlt2 } from 'react-icons/hi'

import bg from '../img/bg-menu.jpg'

const Menu = () => {
    
	useEffect(() => {
		window.scrollTo(0,0);
	}, [])

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])
    const [itemsSort, setItemsSort] = useState([])
    const [filter, setFilter] = useState('milktea')
    const [menuCate, setmenuCate] = useState(false)
    const [sort, setSort] = useState('')
    const [searchInput, setSearchInput] = useState('')
    
	useEffect(() => {
		onSnapshot(collection(firestore, "products"), (snapshot) => {
            setItems(snapshot.docs.map((doc) => doc.data()))
            setItemsSort(snapshot.docs.map((doc) => doc.data()).filter((n) => n.category === filter))
        })
        setIsLoading(false);
    }, []);
    
    //Search name product
    useEffect(() => {
        setItemsSort(items.filter((n) => n.category === filter).filter((val) => {
                if (searchInput === '') {
                    return val
                } else if (
                    val.title.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                    return val
                }
        }))
    }, [searchInput]);

    // Filter category
    useEffect(() => {
        setItemsSort(items.filter((n) => n.category === filter))
    }, [filter]);

    // Sort time, price
    useEffect(() => {
        setItemsSort((prev) => {
            return sort === 'High' ? [...prev.sort((a, b) => b.price - a.price)]
                    : sort === 'Low' ? [...prev.sort((a, b) => a.price - b.price)]
                    : sort === 'Latest' ? [...prev.sort((a, b) => parseFloat(b.id) - parseFloat(a.id))]
                    : [...prev]
        })
    }, [sort]);

    const showCategory = () => {
        setmenuCate(!menuCate)
    }

    // Data pagination
    const [currentItems, setCurrentItems] = useState([]);

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <Banner backgroundImage={bg}>
                <h2 className="font-['Itim'] text-3xl md:text-5xl lg:text-7xl font-bold text-white text-center">
                    30% Discount
                    <span className='block text-2xl md:text-3xl lg:text-4xl font-normal mt-3'>on the first orders</span>
                </h2>
            </Banner>

            <div className='max-w-[1920px] mx-auto flex w-full px-6 md:px-10 xl:px-20 py-12 xl:py-14'>
                {/* Menu category PC */}
                <div className='basis-1/5 hidden lg:block'>
                    {categories &&
                        categories.map((category, idex) => (
                            <ul key={idex} className='mb-5 text-lg font-semibold mx-[3vw]'>
                                {category.catogory}
                                {category.product.map((product) => (
                                    <div
                                        key={product.id}
                                        className='flex items-center leading-8 text-base font-normal cursor-pointer group'
                                        onClick={() => setFilter(product.urlParamName)}>
                                        <RiBubbleChartFill
                                            className={`text-amber-500 ${
                                                filter === product.urlParamName ? ' ' : 'invisible'
                                            }`}
                                        />
                                        <li
                                            className={`ml-4 group-hover:text-amber-500 transition-all duration-300 ease ${
                                                filter === product.urlParamName ? 'text-amber-500' : 'text-gray-500'
                                            }`}>
                                            {product.name}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        ))}
                </div>

                <div className='h-full w-full lg:basis-4/5 lg:px-8 border-l-0 lg:border-l'>
                    <div className='flex flex-col-reverse md:flex-row justify-between md:gap-5'>
                        <div className='flex items-center'>
                            <div
                                className={`lg:hidden bg-headingColor ${
                                    menuCate ? 'text-amber-500' : 'text-white'
                                } hover:text-amber-500 p-[0.55rem] mr-2 rounded-md cursor-pointer transition-all duration-300 ease`}
                                onClick={showCategory}>
                                <HiMenuAlt2 />
                            </div>

                            <div className='bg-headingColor w-28 flex justify-center items-center py-2 rounded-l-md text-white text-sm'>Sort by</div>
                            <select
                                className='border-headingColor border px-2 py-[7px] rounded-r-md text-sm w-full cursor-pointer'
                                onChange={(e) => setSort(e.target.value)}>
                                <option value='Latest'>Latest</option>
                                <option value='High'>High Price → Low Price</option>
                                <option value='Low'>Low Price → High Price</option>
                            </select>
                        </div>
                        <Search onSubmit={setSearchInput}/>
                    </div>
                    {/* Menu category Mobile & Tablet */}
                    <div
                        className={`lg:hidden w-full bg-gray-200 mb-3 rounded transition-all duration-300 ease-in-out ${
                            menuCate ? ' ' : 'h-0 overflow-hidden'
                        } `}>
                        <div className='grid grid-cols-2 '>
                            {categories &&
                                categories.map((category, idex) => (
                                    <ul key={idex} className='text-base sm:text-lg font-semibold mx-auto my-4'>
                                        {category.catogory}
                                        {category.product.map((product) => (
                                            <div
                                                key={product.id}
                                                className='flex items-center text-sm sm:text-base leading-6 sm:leading-8 font-normal cursor-pointer group'
                                                onClick={() => setFilter(product.urlParamName)}>
                                                <RiBubbleChartFill
                                                    className={`text-amber-500 ${
                                                        filter === product.urlParamName ? ' ' : 'invisible'
                                                    }`}
                                                />
                                                <li
                                                    className={`ml-3 sm:ml-4 group-hover:text-amber-500 transition-all duration-300 ease ${
                                                        filter === product.urlParamName
                                                            ? 'text-amber-500'
                                                            : 'text-gray-500'
                                                    }`}>
                                                    {product.name}
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                ))}
                        </div>
                    </div>

                    <ProductList
                        data={currentItems}
                    />

                <Pagination 
                    items={itemsSort}
                    itemsPerpage={8} 
                    parentCallback={setCurrentItems}
                />
                </div>
            </div>
        </>
    )
}

export default Menu
