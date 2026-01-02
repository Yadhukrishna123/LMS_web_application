import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen, MessageCircle, HelpCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();


  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center">
          
          {/* 404 GIF Background Section */}
          <div className="relative mb-8">
            <div 
              className="h-[400px] md:h-[500px] bg-center bg-no-repeat mx-auto flex items-center justify-center"
              style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                maxWidth: '600px',
              }}
            >
              <h1 className="text-7xl md:text-9xl font-bold text-gray-700" style={{ fontFamily: 'Arvo, serif' }}>
                404
              </h1>
            </div>
          </div>

          {/* Content Box */}
          <div className="max-w-3xl mx-auto -mt-16">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arvo, serif' }}>
              Look like you're lost
            </h3>
            
            <p className="text-gray-600 text-lg md:text-xl mb-8">
              The page you are looking for is not available!
            </p>
            
            {/* Main Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ fontFamily: 'Arvo, serif' }}
              >
                <Home className="w-5 h-5" />
                Go to Home
              </button>
              
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition-all shadow-md hover:shadow-lg"
                style={{ fontFamily: 'Arvo, serif' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NotFound;