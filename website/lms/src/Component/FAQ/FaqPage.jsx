import React, { useState } from 'react';

const Illustration = () => (
  <img
    src="https://themewagon.github.io/TopicListing/images/faq_graphic.jpg"
    alt="FAQ Illustration"
    className="w-48 sm:w-64 md:w-72 lg:max-w-xs xl:max-w-md"
    draggable="false"
  />
);

const faqs = [
  {
    question: 'What is Topic Listing?',
    answer: 'Topic Listing is a feature that allows users to browse all available subjects, filtered and sorted for convenience.',
  },
  {
    question: 'How to find a topic?',
    answer: 'You can search by keywords in the search bar or explore topic categories.',
  },
  {
    question: 'Does it need to paid?',
    answer: 'Most topics are free to browse. Premium topics will be clearly marked and require payment.',
  },
  {
    question: 'How do I create an account?',
    answer: 'Click the "Sign Up" button and fill in your details. You will receive a confirmation email after registration.',
  },
  {
    question: 'Can I access topics on mobile devices?',
    answer: 'Yes, our platform is fully responsive and works on smartphones and tablets.',
  },
  {
    question: 'How can I get support if I have an issue?',
    answer: 'You can use the Contact Us page or the chat feature to reach our support team for help or troubleshooting.',
  }
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center 
                    px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold 
                     mb-6 sm:mb-4 md:mb-0 text-center md:text-left 
                     w-full max-w-5xl ml-0 md:ml-8 px-2">
        Frequently Asked <br className="hidden sm:block" />
        Questions
      </h1>

      <div className="flex flex-col md:flex-row w-full max-w-5xl items-center 
                      md:items-start mt-4 sm:mt-6 md:mt-10 gap-6 sm:gap-8 md:gap-0">
        {/* Illustration */}
        <div className="flex justify-center flex-shrink-0 md:flex-1 md:min-w-[270px]">
          <Illustration />
        </div>

        {/* FAQ list */}
        <div className="flex-1 w-full flex justify-center md:justify-start md:pl-8 lg:pl-12">
          <div className="flex flex-col w-full max-w-xl md:max-w-2xl px-1 sm:px-0">
            {faqs.map((faq, i) => (
              <div key={faq.question} className="mb-2 sm:mb-3">
                <button
                  onClick={() => setOpenIndex(i === openIndex ? null : i)}
                  className={`
                    w-full text-left text-sm sm:text-base md:text-lg lg:text-xl 
                    font-semibold px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4
                    rounded-xl sm:rounded-2xl md:rounded-[2rem]
                    border-2 focus:outline-none transition-all duration-200
                    flex items-center justify-between gap-2
                    active:scale-[0.98]
                    ${
                      openIndex === i
                        ? 'bg-blue-50 border-blue-200 text-blue-800'
                        : 'border-gray-200 bg-white hover:bg-blue-50 active:bg-blue-100'
                    }
                  `}
                  style={{ minHeight: 'auto' }}
                >
                  <span className="flex-1 pr-2 leading-snug">{faq.question}</span>
                  <svg
                    className={`flex-shrink-0 transition-transform duration-200 
                                ${openIndex === i ? 'rotate-180' : 'rotate-0'}`}
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path 
                      d="M7 10l5 5 5-5" 
                      stroke={openIndex === i ? "#1e40af" : "#4A5568"} 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </button>

                {/* Answer Section */}
                <div
                  className={`
                    transition-all overflow-hidden duration-300 
                    px-4 sm:px-6 md:px-8 
                    text-gray-600 text-xs sm:text-sm md:text-base 
                    leading-relaxed
                    ${openIndex === i 
                      ? 'max-h-40 sm:max-h-36 md:max-h-28 py-2.5 sm:py-3 opacity-100' 
                      : 'max-h-0 py-0 opacity-0'
                    }
                  `}
                  style={{ 
                    background: openIndex === i ? "#f1f6fc" : "transparent", 
                    borderRadius: openIndex === i ? "0 0 1rem 1rem" : "1rem",
                    marginTop: openIndex === i ? "-2px" : "0"
                  }}
                >
                  {openIndex === i && (
                    <p className="py-1">{faq.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;