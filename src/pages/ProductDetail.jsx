import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { updateDoc, onSnapshot, doc, arrayUnion } from 'firebase/firestore';
import { firestore } from '../firebase.config'

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { Banner, Input, Pagination, StarRating } from '../components';

import { BiMinus, BiPlus } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import bg from "../img/banner-order.jpg";

const ProductDetail = () => {
    // Get data in Firestore
    const { id } = useParams();
    const [items, setItems] = useState()
    const [star5, setStar5] = useState(0)
    const [star4, setStar4] = useState(0)
    const [star3, setStar3] = useState(0)
    const [star2, setStar2] = useState(0)
    const [star1, setStar1] = useState(0)
    useEffect(() => {
        window.scrollTo(0,0);
		onSnapshot(doc(firestore, "products", id), (doc) => {
        setItems(doc.data())
        setStar5(doc.data().reviews.filter((n) => n.rating === 5).length)
        setStar4(doc.data().reviews.filter((n) => n.rating === 4).length)
        setStar3(doc.data().reviews.filter((n) => n.rating === 3).length)
        setStar2(doc.data().reviews.filter((n) => n.rating === 2).length)
        setStar1(doc.data().reviews.filter((n) => n.rating === 1).length)
    })}, []);
    // Caculate width of Star
    useEffect(() => {
        if(items) {
            document.querySelector('.progress-line-5').style.width = `${items.reviews.length > 0 ? ((star5/items.reviews.length)*100).toFixed(1) : 0}%`;
            document.querySelector('.progress-line-4').style.width = `${items.reviews.length > 0 ? ((star4/items.reviews.length)*100).toFixed(1) : 0}%`;
            document.querySelector('.progress-line-3').style.width = `${items.reviews.length > 0 ? ((star3/items.reviews.length)*100).toFixed(1) : 0}%`;
            document.querySelector('.progress-line-2').style.width = `${items.reviews.length > 0 ? ((star2/items.reviews.length)*100).toFixed(1) : 0}%`;
            document.querySelector('.progress-line-1').style.width = `${items.reviews.length > 0 ? ((star1/items.reviews.length)*100).toFixed(1) : 0}%`;
        }
    }, [star5, star4, star3, star2, star1]);   

    const avgRating = items && items.reviews ? (items.reviews.reduce(function(sum, value) {
        return sum + value.rating;
    }, 0) / items.reviews.length).toFixed(1) : 0;
    
    // Add product to cart
    const [{ cartItems }, dispatch] = useStateValue();
    const [cartitems, setcartItems] = useState(cartItems);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const addtocart = () => {
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: cartitems,
        });
        localStorage.setItem("cartItems", JSON.stringify(cartitems));
    };
    
    useEffect(() => {
        addtocart();
    }, [cartitems]);

    // Send feeadback to firestore
    const [isSubmit, setisSubmit] = useState(false)
    const [name, setName] = useState('')
    const [feedback, setFeedback] = useState('')
    const [rating, setRating] = useState(null)

    const ratingPOST = async (data) => {
		await updateDoc(doc(firestore, 'products', id), data)
	}
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setisSubmit(true)
        if(name.trim() !== "" && feedback.trim() !== "" && rating) {
          const data = {
            reviews: arrayUnion({
                reviewId: Date.now(),
                nameClient: name,
                feedback: feedback,
                rating: rating,
            })
        }
        ratingPOST(data)
        }
    }
    
    // Data pagination
    const [currentReview, setCurrentReview] = useState([])

    return (
        <>
            {items && (
                <>
                    <Banner backgroundImage={bg}>
                        <h2 className="font-['Itim'] text-3xl md:text-5xl lg:text-7xl font-bold text-white text-center">
                            Product
                            <span className='block text-2xl md:text-3xl lg:text-4xl font-normal mt-3'>{items.title}</span>
                        </h2>
                    </Banner>
                    <div className="mx-auto max-w-[1920px] px-6 md:px-10 xl:px-20 pt-6 pb-2 lg:pt-10">
                        {/* Order Product */}
                        <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
                            <div className="col-span-5 mb-6 overflow-hidden md:mb-8 lg:mb-0">
                                <div className="w-full mb-2.5 md:mb-3 border border-border-base overflow-hidden rounded-md relative">
                                    <img src={items.imageURL} alt="" />
                                </div>
                            </div>

                            <div className="flex flex-col col-span-5 shrink-0 xl:ltr:pl-2 xl:rtl:pr-2">
                                <div className="pb-7 mb-7 border-b border-gray-300">
                                    <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">{items.title}</h2>
                                    <p className="text-body text-sm lg:text-base leading-6 lg:leading-8">Category: {items.category}</p>
                                    <div className="mt-5 text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl">{new Intl.NumberFormat().format(items.price)} VND</div>
                                </div>
                                <div className="pb-3">
                                    {items.size.length > 0 &&
                                        <div className="mb-4 flex items-center">
                                            <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 mr-3">Size:</h3>
                                            <div className="flex flex-wrap -mr-3">
                                                {items.size.map((size, index) => (
                                                    <div key={index}>
                                                        <input type="radio" name="radio-size" id={size} className="hidden" />
                                                        <label 
                                                            htmlFor={size} 
                                                            className="lbl-radio cursor-pointer rounded border w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 mr-2 md:mr-3 flex justify-center items-center text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black"
                                                            onClick={() => setSize(size)}
                                                        >
                                                            {size}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                    <div className="mb-4 flex items-center">
                                        <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 mr-3">Quantity:</h3>
                                        <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                                            <button 
                                                className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-10 md:w-12 text-heading border-r border-gray-300 hover:text-amber-500 hover:bg-headingColor"
                                                onClick={() => setQty(qty > 1 ? qty-1 : 1)}
                                            >
                                                <BiMinus />
                                            </button>
                                            <span className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-12  md:w-20 xl:w-24">{qty}</span>
                                            <button 
                                                className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-10 md:w-12 text-heading border-l border-gray-300 hover:text-amber-500 hover:bg-headingColor"
                                                onClick={() => setQty(qty+1)}
                                            >
                                                <BiPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        className={`mt-4 text-sm leading-4 inline-flex items-center transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 ${items.size.length > 0 && size === "" ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-headingColor hover:bg-amber-500"} px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-full`}
                                        disabled={items.size.length > 0 && size === "" ? true : false}
                                        onClick={() => { if(cartItems.some(function(cartItem) {return cartItem.id === items.id+size})) {
                                            const newcartItem = cartItems.find(function(cartItem) {return cartItem.id === items.id+size})
                                            setcartItems([...cartItems.filter(function(cartItem) {return cartItem.id !== items.id+size}), {...newcartItem, qty: newcartItem.qty+1}]);
                                          } else { 
                                            setcartItems(size && size === "L" ? [...cartItems, {...items, id: items.id+size, price: parseFloat(items.price)+8000, qty: qty, size: size}] : [...cartItems, {...items, id: items.id+size, qty: qty, size: size}]);
                                          } 
                                        }}
                                    >Add to Cart</button>
                                </div>
                            </div>
                        </div>

                        {/* Review Rating */}
                        <div className="w-full py-8">
                            <div className="block border-b border-border-base">
                                <h2 className="relative inline-block md:text-xl leading-5 pb-3 lg:pb-5 hover:text-brand font-semibold">Review Rating</h2>
                            </div>
                            <div className="my-6 lg:my-8 mx-auto flex flex-col md:flex-row w-full">
                                <div className="md:w-full lg:w-1/2 flex flex-col h-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex">
                                            <img src={items.imageURL} className="w-14 h-14 object-cover rounded-md" />
                                            <div className="mx-2 w-full">
                                                <p className="text-lg font-bold">{items.title}</p>
                                                <p>Category: {items.category}</p>
                                            </div>
                                        </div>
                                        <div className="font-bold">{new Intl.NumberFormat().format(items.price)} VND</div>
                                    </div>
                                    <div className="flex py-5 justify-between items-center">
                                        <div>
                                            <span className="text-3xl font-bold">{items.reviews.length > 0 ? avgRating : 0} </span>
                                            OUT OF 5
                                        </div>
                                        <div>
                                            <StarRating disabled rating={items.reviews.length > 0 ? avgRating : 0}/>
                                            <div className="text-right">
                                                <span>{items.reviews.length} </span>
                                                ratings
                                            </div>
                                        </div>
                                    </div>
                                    {/* Progress line Percent Star */}
                                    <div>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <p className="w-3">5</p>
                                                <FaStar className="ml-1 text-[#ffc107]"/>
                                            </div>
                                            <div className="grow mx-3 h-2 rounded-lg overflow-hidden bg-slate-300">
                                                <div className="h-full progress-line-5 w-[0%] bg-yellow-400 transition-all ease duration-500"></div>
                                            </div>
                                            <div className="shrink-0 w-10">{items.reviews.length > 0 ? ((star5/items.reviews.length)*100).toFixed(1) : 0}%</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <p className="w-3">4</p>
                                                <FaStar className="ml-1 text-[#ffc107]"/>
                                            </div>
                                            <div className="grow mx-3 h-2 rounded-lg overflow-hidden bg-slate-300">
                                                <div className="h-full progress-line-4 w-[0%] bg-yellow-400 transition-all ease duration-500"></div>
                                            </div>
                                            <div className="shrink-0 w-10">{items.reviews.length > 0 ? ((star4/items.reviews.length)*100).toFixed(1) : 0}%</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <p className="w-3">3</p>
                                                <FaStar className="ml-1 text-[#ffc107]"/>
                                            </div>
                                            <div className="grow mx-3 h-2 rounded-lg overflow-hidden bg-slate-300">
                                                <div className="h-full progress-line-3 w-[0%] bg-yellow-400 transition-all ease duration-500"></div>
                                            </div>
                                            <div className="shrink-0 w-10">{items.reviews.length > 0 ? ((star3/items.reviews.length)*100).toFixed(1) : 0}%</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <p className="w-3">2</p>
                                                <FaStar className="ml-1 text-[#ffc107]"/>
                                            </div>
                                            <div className="grow mx-3 h-2 rounded-lg overflow-hidden bg-slate-300">
                                                <div className="h-full progress-line-2 w-[0%] bg-yellow-400 transition-all ease duration-500"></div>
                                            </div>
                                            <div className="shrink-0 w-10">{items.reviews.length > 0 ? ((star2/items.reviews.length)*100).toFixed(1) : 0}%</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <p className="w-3">1</p>
                                                <FaStar className="ml-1 text-[#ffc107]"/>
                                            </div>
                                            <div className="grow mx-3 h-2 rounded-lg overflow-hidden bg-slate-300">
                                                <div className="h-full progress-line-1 w-[0%] bg-yellow-400 transition-all ease duration-500"></div>
                                            </div>
                                            <div className="shrink-0 w-10">{items.reviews.length > 0 ? ((star1/items.reviews.length)*100).toFixed(1) : 0}%</div>
                                        </div>
                                    </div>
                                    {/* Reviews of Client */}
                                    <div className="my-5">
                                        <p className="my-2">{items.reviews.length} Reviews</p>
                                        {currentReview && currentReview.map((review, index) => (
                                            <div key={index} className="border-b border-border-base last:border-0 pb-4 mb-4 last:mb-0 ">
                                                <div className="flex justify-between">
                                                    <h3 className="text-brand-dark text-15px sm:text-base font-semibold mb-1.5">{review.nameClient}</h3>
                                                    <StarRating disabled rating={review.rating}/>
                                                </div>
                                                <p className="text-brand-muted text-sm leading-7 lg:leading-[27px] lg:text-15px xl:leading-[2em]">{review.feedback}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Pagination items={items.reviews} itemsPerpage={4} parentCallback={setCurrentReview}/>
                                </div>

                                <div className="md:w-full lg:w-1/2 flex h-full md:ml-7 flex-col md:pl-7">
                                    <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
                                        <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">Send us your feedback !</h4>
                                    </div>
                                    <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col justify-center ">
                                        <div className="flex flex-col space-y-5">
                                            <div className="relative">
                                                <label className="block text-gray-600 font-semibold text-sm leading-none mb-3">How was your experience?</label>
                                                <StarRating submit={isSubmit} rating={rating} setRating={setRating}>
                                                    {rating === null && isSubmit &&
                                                        <p className="ml-6 text-xs text-red-500">Rating is required</p>
                                                    }
                                                </StarRating>
                                            </div>

                                            <div className="relative">
                                            <Input label="Name *" type="text" value={name} setValue={setName} style={name.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                                                {name.trim().length === 0 && isSubmit &&
                                                    <p className="my-2 text-xs text-red-500">Your name is required</p>
                                                }
                                            </Input>
                                            </div>

                                            <div className="relative mb-4">
                                            <label className="block text-gray-600 font-semibold text-sm leading-none mb-3">Feedback</label>
                                            <textarea
                                                className={`px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-sm bg-white border ${feedback.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"} focus:shadow focus:outline focus:outline-1`}
                                                rows="4"
                                                placeholder="Write your feedback here"
                                                value={feedback}
                                                onChange={(e) => setFeedback(e.target.value)}
                                            ></textarea>
                                            {feedback.trim().length === 0 && isSubmit &&
                                                <p className="my-2 text-xs text-red-500">Tell us more about it</p>
                                            }
                                            </div>

                                            <div className="relative">
                                            <button data-variant="flat" className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-headingColor text-amber-500 px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-headingColor hover:bg-amber-500 hover:shadow-cart w-full sm:w-auto">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetail;
