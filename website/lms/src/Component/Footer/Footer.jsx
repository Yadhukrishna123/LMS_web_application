import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="px-4 sm:px-5 md:px-6 py-8 sm:py-10 md:py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                          gap-8 sm:gap-10">
            
            {/* Brand Info + Social */}
            <div className="text-center sm:text-left">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                               bg-clip-text text-transparent inline-block mb-2">
                  Studdy
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full 
                                mx-auto sm:mx-0 mb-3"></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-5 max-w-xs mx-auto sm:mx-0 leading-relaxed">
                Empowering learners worldwide with quality education and innovative learning experiences.
              </p>
              <div className="flex gap-3 text-gray-400 justify-center sm:justify-start">
                <a 
                  href="#" 
                  aria-label="Twitter"
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center 
                             bg-gray-800/50 backdrop-blur border border-gray-700
                             rounded-xl hover:bg-blue-500 hover:text-white hover:border-blue-500
                             hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25
                             transition-all duration-300 active:scale-95"
                >
                  <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="#" 
                  aria-label="Facebook"
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center 
                             bg-gray-800/50 backdrop-blur border border-gray-700
                             rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600
                             hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/25
                             transition-all duration-300 active:scale-95"
                >
                  <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram"
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center 
                             bg-gray-800/50 backdrop-blur border border-gray-700
                             rounded-xl hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 
                             hover:text-white hover:border-pink-500
                             hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/25
                             transition-all duration-300 active:scale-95"
                >
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="#" 
                  aria-label="YouTube"
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center 
                             bg-gray-800/50 backdrop-blur border border-gray-700
                             rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500
                             hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/25
                             transition-all duration-300 active:scale-95"
                >
                  <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 
                             relative inline-block">
                Contact Info
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-3 justify-center sm:justify-start group">
                  <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center 
                                  group-hover:bg-blue-500/20 transition-colors">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <p className="hover:text-white transition-colors">732 Despard St, Atlanta</p>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start group">
                  <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center 
                                  group-hover:bg-green-500/20 transition-colors">
                    <FaPhone className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <p className="hover:text-white transition-colors">+1 234 567 890</p>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start group">
                  <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center 
                                  group-hover:bg-purple-500/20 transition-colors">
                    <FaEnvelope className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <p className="hover:text-white transition-colors">arymail@gmail.com</p>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start group">
                  <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center 
                                  group-hover:bg-yellow-500/20 transition-colors">
                    <FaClock className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                  <p className="hover:text-white transition-colors">08:00 - 17:00</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 
                             relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></span>
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About', path: '/about' },
                  { name: 'FAQs', path: '/faqs' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Help Center', path: '/help' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      onClick={() => window.scrollTo(0, 0)} 
                      className="text-gray-300 hover:text-white hover:pl-2
                                 relative inline-flex items-center gap-2
                                 transition-all duration-300 group"
                    >
                      <span className="absolute left-0 opacity-0 group-hover:opacity-100 
                                       transition-opacity duration-300">
                        →
                      </span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 
                             relative inline-block">
                Newsletter
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full"></span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-5 max-w-xs mx-auto sm:mx-0">
                Get the latest updates on new courses and exclusive offers!
              </p>
              <form className="flex flex-col gap-3 max-w-xs mx-auto sm:mx-0">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-800/50 backdrop-blur
                               text-white text-sm placeholder-gray-400 
                               border border-gray-700
                               focus:outline-none focus:border-blue-500 focus:ring-2 
                               focus:ring-blue-500/20 transition-all"
                  />
                  <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 
                             hover:from-blue-600 hover:to-purple-700 
                             active:from-blue-700 active:to-purple-800
                             text-white text-sm sm:text-base font-semibold
                             px-4 py-3 rounded-xl
                             transition-all duration-300 
                             hover:shadow-lg hover:shadow-purple-500/25
                             active:scale-[0.98] group
                             flex items-center justify-center gap-2"
                >
                  <span>Subscribe Now</span>
                  <FaPaperPlane className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 
                                          group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800">
          <div className="px-4 sm:px-5 md:px-6 py-5 sm:py-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center 
                            justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-400">
                  © {new Date().getFullYear()} 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold mx-1">
                    ASK Project
                  </span>
                  All rights reserved.
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs md:text-sm">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors 
                             hover:underline underline-offset-4"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-600">•</span>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors 
                             hover:underline underline-offset-4"
                >
                  Terms & Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;