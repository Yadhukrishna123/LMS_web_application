import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios"


const Contact = () => {
    let [inputs, setInputs] = useState({
        name:"",
        email:"",
        message:""
    })

    const getInput = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    }

    const handleSubmit =async (e) => {
          e.preventDefault()
          try {
            let res = await axios.post("http://localhost:8080/user_enquiries",{
                name:inputs.name,
                email:inputs.email,
                message:inputs.message
            })
            console.log(res.data);
            
          } catch (error) {
            
          }
    }
    console.log(inputs);
    
    return (
        <div className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-16">
  
      <div className="mb-10">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl  underline decoration-2 underline-offset-4">
          Contact Us
        </h2>
      </div>

     
      <div className="flex flex-col lg:flex-row gap-12">
       
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-6">
            Get In Touch
          </h2>

          <p className="w-full sm:w-[80%] text-gray-500 text-base sm:text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
            minus, soluta vero dolores cumque molestias!
          </p>

        
          <div className="w-full mt-7 space-y-6">
           
            <div className="flex items-start">
              <FaLocationDot size={28} className="text-blue-500 flex-shrink-0" />
              <div className="ml-4">
                <h4 className="text-xl font-semibold">Address</h4>
                <p className="text-gray-600 mt-2">
                  732 Despared, Atlanta, Georgia 30060
                </p>
              </div>
            </div>

           
            <div className="flex items-start">
              <MdEmail size={28} className="text-blue-500 flex-shrink-0" />
              <div className="ml-4">
                <h4 className="text-xl font-semibold">Email</h4>
                <p className="text-gray-600 mt-2">abc@123.com</p>
              </div>
            </div>

            
            <div className="flex items-start">
              <FaPhoneAlt size={28} className="text-blue-500 flex-shrink-0" />
              <div className="ml-4">
                <h4 className="text-xl font-semibold">Phone</h4>
                <p className="text-gray-600 mt-2">+91 1234567890</p>
              </div>
            </div>
          </div>
        </div>

       {/* form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full sm:w-[90%] lg:w-[80%] border border-gray-300 p-6 rounded-md bg-white shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={getInput}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={getInput}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                onChange={getInput}
              />

              <button
                className="mx-auto bg-blue-500 text-white px-6 py-2 rounded-3xl hover:bg-blue-700 transition-colors duration-200"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Contact