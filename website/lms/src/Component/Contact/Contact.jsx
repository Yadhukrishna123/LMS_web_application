import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import axios from "axios";

const Contact = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });

  const getInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user_enquiries`,
        {
          name: inputs.name,
          email: inputs.email,
          message: inputs.message,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-[#f2f0fd] min-h-screen overflow-hidden">
      {/* LEFT SECTION */}
      <div className="relative z-10 w-full lg:w-[55%] bg-[#f2f0fd] flex flex-col justify-center px-10 py-16">
        <h4 className="text-sm font-semibold text-[#7a6fee] mb-2 uppercase tracking-wider">
          Contact Us
        </h4>
        <h2 className="text-4xl font-bold text-[#232129] leading-snug mb-4">
          Feel Free To Contact Us Anytime
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-lg">
          Thank you for choosing our templates. We provide you best CSS
          templates absolutely free of charge. You may support us by sharing our
          website with your friends.
        </p>

        {/* OFFER BOX */}
        <div className="bg-white rounded-2xl shadow-md flex items-center p-5 w-full max-w-md">
          <div className="bg-[#7a6fee] w-20 h-20 rounded-full flex flex-col items-center justify-center text-white mr-4">
            <span className="text-xs font-semibold">OFF</span>
            <span className="text-2xl font-bold mt-1">50%</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase font-semibold text-[#666]">
              Valid: <span className="text-[#7a6fee] font-bold">24 April 2036</span>
            </p>
            <p className="text-sm font-semibold text-[#232129] mt-1">
              Special Offer <span className="text-[#7a6fee]">50% OFF!</span>
            </p>
          </div>
          <button className="bg-[#7a6fee] text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition-all hover:bg-[#6a5be0]">
            &rarr;
          </button>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="relative w-full lg:w-[45%] h-[90vh] bg-gradient-to-tr from-[#8168e5] to-[#a38bf3] flex items-center justify-center overflow-hidden rounded-l-[200px] shadow-2xl">

        {/* Decorative Background Circles 
        <div className="absolute w-[400px] h-[400px] rounded-full bg-white bg-opacity-10 top-[-100px] right-[-100px] blur-2xl"></div>
        <div className="absolute w-[250px] h-[250px] rounded-full bg-white bg-opacity-10 bottom-[-100px] right-[50px] blur-2xl"></div>*/}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-md flex flex-col space-y-5 px-8"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name..."
            onChange={getInput}
            className="w-full bg-[#9c89f8] bg-opacity-80 text-white placeholder-white rounded-2xl px-6 py-3 outline-none focus:bg-[#8a78ef] transition-all text-sm"
          />
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Your E-mail..."
              onChange={getInput}
              className="w-full bg-[#9c89f8] bg-opacity-80 text-white placeholder-white rounded-2xl px-6 py-3 pr-10 outline-none focus:bg-[#8a78ef] transition-all text-sm"
            />
            <MdEmail
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-90"
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            onChange={getInput}
            className="w-full bg-[#9c89f8] bg-opacity-80 text-white placeholder-white rounded-2xl px-6 py-3 outline-none focus:bg-[#8a78ef] transition-all text-sm resize-none"
          />
          <button
            type="submit"
            className="bg-white text-[#7a6fee] font-semibold rounded-2xl py-3 text-sm hover:bg-[#edeafc] transition-all shadow-sm"
          >
            Send Message Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
