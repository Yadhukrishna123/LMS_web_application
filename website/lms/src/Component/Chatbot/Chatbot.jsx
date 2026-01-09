
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const qaDatabase = {
  greetings: {
    patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: "Hello! 👋 Welcome to our Learning Platform. How can I help you today?"
  },
  
  courses: {
    patterns: ['courses', 'course', 'what courses', 'available courses', 'course list', 'programs'],
    response: "📚 We offer a variety of courses!\n\n• Browse all courses at our Courses page\n• Filter by category or skill level\n• Check course details and curriculum\n\nWould you like help finding a specific course?"
  },
  
  enrollment: {
    patterns: ['enroll', 'enrolment', 'join course', 'how to enroll', 'register course', 'sign up course'],
    response: "📝 To enroll in a course:\n\n1. Browse our courses\n2. Click on the course you like\n3. Click 'Enroll Now'\n4. Complete payment\n5. Start learning!\n\nNeed help with a specific course?"
  },
  
  pricing: {
    patterns: ['price', 'cost', 'fee', 'how much', 'payment', 'pricing'],
    response: "💰 Course Pricing:\n\n• Each course has its own pricing\n• Check the course detail page for exact fees\n• We accept multiple payment methods\n• EMI options available on select courses\n\nVisit the course page for detailed pricing!"
  },
  
  certificates: {
    patterns: ['certificate', 'certification', 'completion', 'credential'],
    response: "🎓 Certificates:\n\n• Complete all course modules\n• Pass required assessments\n• Get your verified certificate\n• Download & share on LinkedIn\n\nCertificates are issued within 24 hours of course completion!"
  },
  
  account: {
    patterns: ['account', 'profile', 'my account', 'settings'],
    response: "👤 Account Help:\n\n• View profile in 'My Account'\n• Update personal details\n• Change password in Settings\n• View enrolled courses\n\nLogin to access your account dashboard!"
  },
  
  login: {
    patterns: ['login', 'sign in', 'log in', 'access account', 'cant login'],
    response: "🔐 Login Help:\n\n• Click 'Login' in the header\n• Enter your email & password\n• Use 'Forgot Password' if needed\n• Or login with Google\n\nHaving trouble? Contact support!"
  },
  
  password: {
    patterns: ['password', 'forgot password', 'reset password', 'change password'],
    response: "🔑 Password Help:\n\n• Click 'Forgot Password' on login page\n• Enter your registered email\n• Check inbox for reset link\n• Create a new password\n\nLink expires in 24 hours!"
  },
  
  videos: {
    patterns: ['video', 'watch', 'lecture', 'lesson', 'recorded'],
    response: "🎥 Video Lessons:\n\n• Access videos from your dashboard\n• Watch anytime, anywhere\n• Pause & resume progress\n• HD quality streaming\n\nAll videos are available 24/7!"
  },
  
  quiz: {
    patterns: ['quiz', 'test', 'assessment', 'exam', 'quizzes'],
    response: "📝 Quizzes & Assessments:\n\n• Take quizzes after each module\n• Multiple attempts allowed\n• Instant results & feedback\n• Track your progress\n\nQuizzes help reinforce your learning!"
  },
  
  assignment: {
    patterns: ['assignment', 'homework', 'project', 'submit', 'submission'],
    response: "📋 Assignments:\n\n• Find assignments in your course\n• Submit before deadline\n• Get instructor feedback\n• Resubmit if needed\n\nCheck your course dashboard for pending assignments!"
  },
  
  progress: {
    patterns: ['progress', 'track', 'completion', 'how much completed'],
    response: "📊 Track Progress:\n\n• View progress in your dashboard\n• See completed vs pending modules\n• Track quiz scores\n• Monitor overall completion %\n\nKeep learning to reach 100%! 🎯"
  },
  
  instructor: {
    patterns: ['instructor', 'teacher', 'mentor', 'faculty', 'tutor'],
    response: "👨‍🏫 Our Instructors:\n\n• Industry experts\n• Years of experience\n• Available for doubts\n• Provide personalized feedback\n\nView instructor profiles on course pages!"
  },
  
  support: {
    patterns: ['support', 'help', 'contact', 'issue', 'problem', 'complaint'],
    response: "🆘 Need Support?\n\n• Visit Help Center\n• Raise a support ticket\n• Email: support@lms.com\n• Response within 24 hours\n\nWe're here to help!"
  },
  
  refund: {
    patterns: ['refund', 'money back', 'cancel', 'cancellation'],
    response: "💸 Refund Policy:\n\n• 7-day money-back guarantee\n• Request via Help Center\n• Provide order details\n• Refund in 5-7 business days\n\nTerms & conditions apply."
  },
  
  technical: {
    patterns: ['not working', 'error', 'bug', 'issue', 'technical', 'loading'],
    response: "🔧 Technical Issues?\n\n• Clear browser cache\n• Try a different browser\n• Check internet connection\n• Update your browser\n\nStill having issues? Raise a ticket!"
  },
  
  about: {
    patterns: ['about', 'who are you', 'company', 'platform'],
    response: "ℹ️ About Us:\n\n• Leading online learning platform\n• 1000+ courses\n• Expert instructors\n• Industry-recognized certificates\n\nVisit our About page to learn more!"
  },
  
  thanks: {
    patterns: ['thanks', 'thank you', 'thx', 'appreciate'],
    response: "You're welcome! 😊 Happy learning! Is there anything else I can help you with?"
  },
  
  bye: {
    patterns: ['bye', 'goodbye', 'see you', 'later'],
    response: "Goodbye! 👋 Happy learning! Feel free to chat anytime you need help."
  }
};

const quickReplies = [
  "Browse Courses",
  "How to Enroll?",
  "My Progress",
  "Certificate Info",
  "Payment Help",
  "Contact Support",
  "Refund policy",
];


const TypingIndicator = () => (
  <div className="flex gap-2">
    <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">
      🤖
    </div>
    <div className="flex gap-1 px-3 py-2 bg-white rounded-xl rounded-bl-sm shadow-sm">
      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
    </div>
  </div>
);

const Message = ({ message, formatTime }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-2 ${!isBot ? 'flex-row-reverse' : ''}`}>
      {isBot && (
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">
          🤖
        </div>
      )}
      <div className={`max-w-[80%] ${!isBot ? 'text-right' : ''}`}>
        <div
          className={`px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
            isBot
              ? 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
              : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
          }`}
        >
          {message.text}
        </div>
        <span className={`text-[10px] text-gray-400 mt-0.5 block ${!isBot ? 'text-right' : ''}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/sign_up', '/enter_email'];
  const isResetPasswordRoute = location.pathname.startsWith('/reset_password/');

  if (hideOnRoutes.includes(location.pathname) || isResetPasswordRoute) {
    return null;
  }

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const findResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    for (const category of Object.values(qaDatabase)) {
      for (const pattern of category.patterns) {
        if (input.includes(pattern)) {
          return category.response;
        }
      }
    }
    return "🤔 I'm not sure I understand. Try asking about:\n• Courses\n• Enrollment\n• Pricing\n• Certificates\n• Technical support\n\nOr type 'help' for more options!";
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }]);
    setInputValue('');
    setIsTyping(true);
    setShowQuickReplies(false);

    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: findResponse(text),
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

// Closed State 
if (!isOpen) {
  return (
    <div
      style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 9999 }}
      className="flex items-center gap-2"
    >
      {/* Text Button - Hidden on mobile, visible on sm+ */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-1.5 bg-white text-indigo-600
                   border-2 border-indigo-500 rounded-full cursor-pointer px-3 py-1.5
                   shadow-lg transition-all duration-300
                   hover:bg-indigo-50 hover:scale-105"
      >
        <span className="font-medium text-xs whitespace-nowrap">
          Need Help? 💬
        </span>
      </button>
      <button
        onClick={() => setIsOpen(true)}
        className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 
                   rounded-full cursor-pointer flex items-center justify-center
                   shadow-lg shadow-indigo-500/40 transition-all duration-300
                   hover:scale-110 hover:shadow-xl animate-pulse hover:animate-none"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </button>
    </div>
  );
}

  // Open State
  return (
    <div
      style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 9999 }}
      className="w-72 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden
                 max-sm:w-full max-sm:h-full max-sm:bottom-0 max-sm:right-0 max-sm:rounded-none"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-tight">Support Bot</h3>
            <span className="text-[10px] text-green-300">● Online</span>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50 flex flex-col gap-3">
        {messages.map((message) => (
          <Message key={message.id} message={message} formatTime={formatTime} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies - Collapsible */}
      <div className="border-t border-gray-100 bg-gray-50">
        <button
          onClick={() => setShowQuickReplies(!showQuickReplies)}
          className="w-full px-3 py-1.5 flex items-center justify-between text-[10px] text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-indigo-500">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
            </svg>
            Quick Replies
          </span>
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className={`w-3 h-3 transition-transform duration-200 ${showQuickReplies ? 'rotate-180' : ''}`}
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${showQuickReplies ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 pb-2 flex flex-wrap gap-1">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleSend(reply)}
                className="px-2 py-1 bg-white border border-indigo-400 rounded-full text-indigo-500 text-[10px]
                           hover:bg-indigo-500 hover:text-white transition-all duration-200 active:scale-95"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-2 bg-white flex gap-2 border-t border-gray-100">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-1.5 border border-gray-200 rounded-full text-xs outline-none
                     focus:border-indigo-400 placeholder:text-gray-400 transition-colors"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputValue.trim()}
          className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full
                     flex items-center justify-center hover:scale-105 transition-transform
                     disabled:opacity-50 disabled:hover:scale-100"
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;