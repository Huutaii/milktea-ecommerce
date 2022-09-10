import React, { useState, useEffect } from 'react'

import { IoLocationSharp, IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { Banner, Input } from '../components';

import bg from "../img/bg-checkout.jpg";

const Contact = () => {

	useEffect(() => {
		window.scrollTo(0,0);
	}, [])
  
  const [isSubmit, setisSubmit] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
      event.preventDefault();
      setisSubmit(true)
      if(name && email && subject && message) {
        console.log("Name: ", name)
        console.log("Email: ", email)
        console.log("Subject: ", subject)
        console.log("Message: ", message)
      }
  }
  return (
    <div>
      <Banner backgroundImage={bg}>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
            <span className="font-['Satisfy'] block font-normal mb-3">explore</span>
            Contact Us
        </h2>
      </Banner>

      <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
        <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div className="md:w-full lg:w-2/5 2xl:w-2/6 flex flex-col h-full">
            <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
              <h4 className="text-2xl md:text-lg font-bold pb-7 md:pb-10 lg:pb-6 -mt-1">Find us here</h4>
              <div className="flex pb-7">
                <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
                  <IoLocationSharp />
                </div>
                <div className="flex flex-col pl-3 2xl:pl-4">
                  <h5 className="text-sm font-bold text-heading">Address</h5>
                  <p className="text-sm mt-0">Ward 6, District 1, Ho Chi Minh City</p>
                </div>
              </div>
              <div className="flex pb-7">
                <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
                  <IoMail />
                </div>
                <div className="flex flex-col pl-3 2xl:pl-4">
                  <h5 className="text-sm font-bold text-heading">Email</h5>
                  <p className="text-sm mt-0">example@example.com</p>
                </div>
              </div>
              <div className="flex pb-7">
                <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
                  <FaPhoneAlt />
                </div>
                <div className="flex flex-col pl-3 2xl:pl-4">
                  <h5 className="text-sm font-bold text-heading">Phone</h5>
                  <p className="text-sm mt-0">+1 1234 5678 90</p>
                </div>
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.313307064376!2d106.69140279293067!3d10.78729846131248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2b5055a107%3A0xa8ccde6f51ccbe3c!2zQ8O0bmcgdmnDqm4gTMOqIFbEg24gVMOhbQ!5e0!3m2!1svi!2s!4v1660978908939!5m2!1svi!2s" title="myFrame" className="w-full aspect-video border-none rounded-md" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

          <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full md:ml-7 flex-col lg:pl-7">
            <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
              <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">Get in touch</h4>
            </div>
            <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col justify-center ">
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                  <div className="w-full md:w-1/2 ">
                    <Input label="Your Name (required)" type="text" value={name} setValue={setName} style={name.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                        {name.trim().length === 0 && isSubmit &&
                            <p className="my-2 text-xs text-red-500">You must need to provide your name</p>
                        }
                    </Input>
                  </div>
                  <div className="w-full md:w-1/2 md:ml-2.5 lg:ml-5 mt-2 md:mt-0">
                    <Input label="Your Email (required)" type="email" value={email} setValue={setEmail} style={email.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                        {email.trim().length === 0 && isSubmit &&
                            <p className="my-2 text-xs text-red-500">You must need to provide your email address</p>
                        }
                    </Input>
                  </div>
                </div>

                <div className="relative">
                  <Input label="Subject" type="text" value={subject} setValue={setSubject} style={subject.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"}>
                      {subject.trim().length === 0 && isSubmit &&
                          <p className="my-2 text-xs text-red-500">Your subject is required</p>
                      }
                  </Input>
                </div>

                <div className="relative mb-4">
                  <label className="block text-gray-600 font-semibold text-sm leading-none mb-3">Message</label>
                  <textarea
                      className={`px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-sm bg-white border ${message.trim().length === 0 && isSubmit ? "border-red-300 focus:outline-red-500" : "border-gray-300"} focus:shadow focus:outline focus:outline-1`}
                      rows="4"
                      placeholder="Write your message here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  {message.trim().length === 0 && isSubmit &&
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
  )
}

export default Contact