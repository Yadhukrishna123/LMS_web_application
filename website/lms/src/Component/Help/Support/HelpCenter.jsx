import React, { useState } from 'react';
import { Search, User, DollarSign, Shield, CreditCard, ChevronDown, Mail, X, Upload } from 'lucide-react';

export default function HelpSupportPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    attachment: null
  });

  const categories = [
    {
      icon: User,
      title: 'My Account',
      subtitle: 'See articles',
      link: '#'
    },
    {
      icon: DollarSign,
      title: 'Payment',
      subtitle: 'See articles',
      link: '#'
    },
    {
      icon: Shield,
      title: 'Security',
      subtitle: 'See articles',
      link: '#'
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      subtitle: 'See articles',
      link: '#'
    }
  ];

  const faqs = [
    { id: 1, question: 'I forgot the password for my account.', answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Enter your email address and we\'ll send you instructions to reset your password.' },
    { id: 2, question: 'How Can I View My Payments History?', answer: 'Navigate to your account dashboard and click on "Payment History" to view all your past transactions and payment records.' },
    { id: 3, question: 'How do I withdraw funds from my account?', answer: 'Go to your wallet section, select "Withdraw", choose your preferred payment method, enter the amount, and confirm the transaction.' },
    { id: 4, question: 'Where is my refund?', answer: 'Refunds typically take 5-10 business days to process. You can check the status in your payment history or contact our support team.' },
    { id: 5, question: 'How do I link bank account to my account?', answer: 'Visit Account Settings, select "Payment Methods", click "Add Bank Account", and follow the verification steps to link your account.' },
    { id: 6, question: 'How do I request payments or send an invoice?', answer: 'From your dashboard, click "Create Invoice", fill in the recipient details and amount, then click "Send" to deliver it via email.' },
    { id: 7, question: 'How do I confirm the email address?', answer: 'Check your email inbox for a verification email. Click the confirmation link to verify your email address.' },
    { id: 8, question: 'How do I receive payments?', answer: 'Share your payment link or invoice with clients. Once they pay, the funds will be deposited directly into your account.' }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTicketForm(prev => ({ ...prev, attachment: file }));
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    console.log('Ticket submitted:', ticketForm);
    // Handle ticket submission logic here
    setShowTicketModal(false);
    setTicketForm({
      subject: '',
      category: '',
      priority: 'medium',
      description: '',
      attachment: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            How can we help you?
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-lg text-gray-800 placeholder-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a
                key={index}
                href={category.link}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 group-hover:bg-emerald-200 transition">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.subtitle} ›</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Popular Topics</h2>
          <p className="text-gray-600">Lisque persius interested his et, in quot quidam persequeris.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
              >
                <span className="text-gray-700 font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-white transition-transform ${
                    expandedFaq === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-4">
                We want to answer all of your queries. Get in touch and we'll get back to you as soon as we can.{' '}
                <a href="mailto:support@lmsplatform.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  support@lmsplatform.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support Section */}
      <div className="flex justify-center items-center bg-gray-100">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Help & Support</h2>

            <div className="flex justify-center flex-wrap gap-4">
              <button
                onClick={() => setShowTicketModal(true)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition"
              >
                <span>Raise a Ticket</span>
              </button>

              {/* <button
                onClick={() => (window.location.href = '#my-tickets')}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg font-medium transition"
              >
                <span>My Tickets</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Raise Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden" style={{ maxHeight: '90vh' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Raise a Support Ticket</h2>
                <p className="text-emerald-50 text-sm mt-1">We're here to help you resolve any issues</p>
              </div>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-95 hover:text-black rounded-full p-2 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
              <form onSubmit={handleSubmitTicket} className="p-8 space-y-6">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={ticketForm.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
                  />
                </div>

                {/* Category and Priority Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={ticketForm.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition bg-white"
                    >
                      <option value="">Select a category</option>
                      <option value="account">My Account</option>
                      <option value="payment">Payment</option>
                      <option value="security">Security</option>
                      <option value="payment-methods">Payment Methods</option>
                      <option value="technical">Technical Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                        Priority <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-3 mt-3">
                        {['low', 'medium', 'high'].map((priority) => {
                        // Define unique color styles for each priority
                        const colorStyles = {
                            low: 'bg-white',
                            medium: 'bg-white',
                            high: 'bg-white',
                        };

                        const activeStyles = {
                            low: 'bg-emerald-500 text-white shadow-md',
                            medium: 'bg-yellow-500 text-white shadow-md',
                            high: 'bg-red-500 text-white shadow-md',
                        };

                        return (
                            <label key={priority} className="flex-1">
                            <input
                                type="radio"
                                name="priority"
                                value={priority}
                                checked={ticketForm.priority === priority}
                                onChange={handleInputChange}
                                className="sr-only"
                            />
                            <div
                                className={`cursor-pointer px-4 py-3 rounded-lg text-center font-semibold capitalize transition duration-200 ${
                                ticketForm.priority === priority
                                    ? activeStyles[priority]
                                    : colorStyles[priority]
                                }`}
                            >
                                {priority}
                            </div>
                            </label>
                        );
                        })}
                    </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={ticketForm.description}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Please provide detailed information about your issue. Include any error messages, steps to reproduce, or relevant details..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition resize-none"
                  />
                </div>

                {/* Attachment */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Attachment <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition bg-gray-50">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer block">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-3">
                        <Upload className="w-8 h-8 text-emerald-600" />
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">
                        {ticketForm.attachment ? (
                          <span className="text-emerald-600">{ticketForm.attachment.name}</span>
                        ) : (
                          <>Click to upload or drag and drop</>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF, DOC up to 10MB</p>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowTicketModal(false)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition shadow-lg hover:shadow-xl"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}