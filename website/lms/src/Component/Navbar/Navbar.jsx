import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-600">Edu Line</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-gray-700">
        {["Home", "Pages", "Courses", "Blog", "Contact"].map((item) => (
          <li key={item} className="hover:text-blue-500 cursor-pointer">
            {item}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="text-blue-600">Login</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col gap-4 p-4 md:hidden shadow-md">
          {["Home", "Pages", "Courses", "Blog", "Contact"].map((item) => (
            <li key={item} className="hover:text-blue-500 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
