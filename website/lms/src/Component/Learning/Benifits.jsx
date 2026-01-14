import React, { useState, useEffect } from 'react';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/get_all_courses?page=1&limit=100`);

        // Check if the response is actually JSON
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType?.includes("application/json")) {
          throw new Error(`Invalid response: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const shuffled = [...data.data].sort(() => 0.5 - Math.random());
          const randomCourses = shuffled.slice(0, 4);
          const eventsData = randomCourses.map(course => ({
            id: course._id,
            title: course.title || "Web Development Event",
            description: course.description || "Discover the latest trends and innovations shaping the future of web development.",
            image: course.thumbnail || `https://images.unsplash.com/photo-${getRandomImage()}?w=800&q=80`,
            buttonText: course.price === 0 ? "REGISTER FOR FREE" : "GET TICKET",
            isFree: course.price === 0,
          }));
          setEvents(eventsData);
        } else {
          setEvents(getDemoEvents());
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setEvents(getDemoEvents());
      } finally {
        setLoading(false);
      }
    };

    fetchRandomCourses();
  }, []);

  const getRandomImage = () => {
    const images = [
      '1498050108023-c5249f4df085',
      '1487058792252-fa8eac87a087',
      '1526374965328-7f61d4dc18c5',
      '1555066931-4365d14bab8c'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const getDemoEvents = () => [
    {
      id: 1,
      title: 'Future of Web Development: Trends and Innovations',
      description: 'Discover the latest trends and innovations shaping the future of web development.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      buttonText: 'REGISTER FOR FREE',
      isFree: true
    },
    {
      id: 2,
      title: 'WebDev Pro Code-a-Thon: Build a Responsive Website',
      description: 'Participants will have 48 hours to create a responsive website from scratch using HTML, CSS, and JavaScript.',
      image: 'https://plus.unsplash.com/premium_photo-1723849222657-e1e48a0a306e?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      buttonText: 'REGISTER FOR FREE',
      isFree: true
    },
    {
      id: 3,
      title: 'Ask the Experts: Frontend Web Development',
      description: 'Join our live Q&A session with our experienced instructors. Get answers to your queries, insights into best practices.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      buttonText: 'GET TICKET',
      isFree: false
    },
    {
      id: 4,
      title: 'Web Accessibility: Building Inclusive Websites',
      description: 'Industry experts will discuss the importance of inclusive design and share strategies for creating websites.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      buttonText: 'GET TICKET',
      isFree: false
    }
  ];

  if (loading) {
    return (
      <div className="bg-white py-10 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 sm:h-9 md:h-10 bg-gray-200 rounded 
                            w-48 sm:w-56 md:w-64 mx-auto mb-3 sm:mb-4"></div>
            <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded 
                            w-64 sm:w-80 md:w-96 mx-auto mb-8 sm:mb-10 md:mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-3 sm:space-y-4">
                  <div className="h-40 sm:h-44 md:h-48 bg-gray-200 rounded-xl sm:rounded-2xl"></div>
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-10 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 
                         mb-3 sm:mb-4 px-2">
            Upcoming Events
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-3xl mx-auto 
                        px-2 leading-relaxed">
            Join our web development events designed to share insights, trends,
            and real-world experiences.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-2 
                         border border-gray-100 active:scale-[0.98]"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 
                             hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 
                               line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] 
                               leading-snug">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6 
                              line-clamp-3 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] 
                              leading-relaxed">
                  {event.description}
                </p>

                {/* Button */}
                <button className="w-full bg-gray-900 text-white font-bold text-[10px] sm:text-xs 
                                   py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg 
                                   hover:bg-gray-800 active:bg-gray-700 
                                   transition-colors duration-300 uppercase tracking-wider
                                   active:scale-[0.98]">
                  {event.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;