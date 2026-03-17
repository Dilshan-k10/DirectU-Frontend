import React, { useEffect, useState } from 'react'; // Added useState
import { FiMail, FiPhoneCall, FiMapPin, FiCheck } from 'react-icons/fi'; // Added FiCheck
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactUs = () => {
  // --- New States for Form Handling ---
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: ''
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 50 });
  }, []);

  // --- Input Change Handler ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear errors when user starts typing
  };

  // --- Submit & Validation Logic ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Check if ANY field is empty
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError("Please fill in all the blank fields before sending.");
      return;
    }

    // 2. Start Submitting State
    setIsSubmitting(true);

    // 3. Simulate Email Sending (Here you will add EmailJS or your Backend API later)
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true); // Show Success Modal
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' }); // Clear form
    }, 1500); // 1.5 seconds loading simulation
  };
  return (
    // Main Wrapper - Takes full height minus navbar
    <div className="min-h-[calc(100vh-80px)] bg-brand-dark py-12 lg:py-20 flex items-center justify-center font-sans overflow-hidden">
      
      {/* Responsive Hero Container - Scales up on larger screens */}
      <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="text-center mb-16 xl:mb-20" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white mb-4 xl:mb-6 tracking-wide">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base xl:text-lg">
            Have questions about your admission analysis? Our team is here to help.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 2xl:gap-16">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="w-full lg:w-[45%] flex flex-col gap-8 xl:gap-10" data-aos="fade-right">
            
            {/* Contact Information Card */}
            <div className="bg-brand-card rounded-[2rem] p-8 xl:p-10 2xl:p-12 border border-brand-border shadow-2xl flex-grow">
              <h2 className="text-2xl xl:text-3xl font-bold text-white mb-8 xl:mb-10">Contact Information</h2>
              
              <div className="flex flex-col gap-8">
                {/* Email Info */}
                <div className="flex items-start gap-5">
                  <div className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl p-4 flex-shrink-0 shadow-lg shadow-accent/20">
                    <FiMail className="text-white text-xl xl:text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs xl:text-sm font-semibold tracking-wider uppercase mb-1">Email Us</p>
                    <p className="text-white font-medium xl:text-lg">projectdirectu@gmail.com</p>
                  </div>
                </div>

                {/* Phone Info */}
                <div className="flex items-start gap-5">
                  <div className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl p-4 flex-shrink-0 shadow-lg shadow-accent/20">
                    <FiPhoneCall className="text-white text-xl xl:text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs xl:text-sm font-semibold tracking-wider uppercase mb-1">Call / Whatsapp</p>
                    <p className="text-white font-medium xl:text-lg">+94 11 222 2460</p>
                    <p className="text-green-400 text-sm font-medium mt-0.5">WA: +94 70 22 22 46</p>
                  </div>
                </div>

                {/* Location Info */}
                <div className="flex items-start gap-5">
                  <div className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl p-4 flex-shrink-0 shadow-lg shadow-accent/20">
                    <FiMapPin className="text-white text-xl xl:text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs xl:text-sm font-semibold tracking-wider uppercase mb-1">Location</p>
                    <p className="text-white font-medium xl:text-lg leading-relaxed">
                      No 42, Galle Road, Bambalapitiya,<br />
                      <span className="text-gray-400 text-sm font-normal">Colombo 04, Sri Lanka.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed - Working link for Bambalapitiya */}
            <div className="h-64 xl:h-72 2xl:h-80 w-full bg-brand-card rounded-[2rem] border border-brand-border overflow-hidden shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31686.08581692257!2d79.83612805404555!3d6.885741630138382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b630252b95b%3A0x868b137fc824b423!2sBambalapitiya%2C%20Colombo!5e0!3m2!1sen!2slk!4v1710660000000!5m2!1sen!2slk" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="DirectU Location"
              ></iframe>
            </div>

          </div>

          {/* ================= RIGHT COLUMN (FORM) ================= */}
          <div className="w-full lg:w-[55%]" data-aos="fade-left" data-aos-delay="200">
            <div className="bg-brand-card rounded-[2rem] p-8 xl:p-10 2xl:p-12 border border-brand-border shadow-2xl h-full flex flex-col justify-center">
              
              <h2 className="text-2xl xl:text-3xl font-bold text-white mb-8">Send a Message</h2>
              
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-gray-400 text-sm xl:text-base font-medium mb-2">First Name</label>
                    <input 
                      type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                      placeholder="John"
                      className="w-full bg-[#12183a] border border-brand-border rounded-xl px-5 py-3.5 xl:py-4 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm xl:text-base"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-400 text-sm xl:text-base font-medium mb-2">Last Name</label>
                    <input 
                      type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-[#12183a] border border-brand-border rounded-xl px-5 py-3.5 xl:py-4 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm xl:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm xl:text-base font-medium mb-2">Email Address</label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-[#12183a] border border-brand-border rounded-xl px-5 py-3.5 xl:py-4 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm xl:text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm xl:text-base font-medium mb-2">Subject</label>
                  <input 
                    type="text" name="subject" value={formData.subject} onChange={handleChange}
                    placeholder="Admission Inquiry"
                    className="w-full bg-[#12183a] border border-brand-border rounded-xl px-5 py-3.5 xl:py-4 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm xl:text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm xl:text-base font-medium mb-2">Message</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleChange}
                    placeholder="How can we help you?" rows="5"
                    className="w-full bg-[#12183a] border border-brand-border rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none text-sm xl:text-base"
                  ></textarea>
                </div>

                {/* Error Message Display */}
                {error && (
                  <div className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-semibold px-4 py-3 rounded-xl mt-2 text-center animate-pulse">
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-accent hover:bg-accent-hover disabled:bg-accent/50 disabled:cursor-not-allowed transition-all duration-300 text-white font-bold py-4 xl:py-5 rounded-xl shadow-lg hover:shadow-accent/30 text-base xl:text-lg flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  ) : null}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

              </form>
            </div>
          </div>

        </div>
        {/* ---------------- Success Popup Modal ---------------- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div 
            data-aos="zoom-in" 
            data-aos-duration="300"
            className="bg-[#1e253c] rounded-[2rem] p-8 max-w-sm w-full text-center border border-gray-700 shadow-2xl"
          >
            <div className="w-16 h-16 bg-[#183a3b] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#1e253c] shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <FiCheck className="text-[#22c55e] text-3xl font-bold" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
              Message Sent<br/>Successfully!
            </h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Thank you for reaching out. Our team will get back to you at projectdirectu@gmail.com very soon.
            </p>
            
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-[#8C52FF] hover:bg-[#7455F6] text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#8C52FF]/30"
            >
              Done
            </button>
          </div>
        </div>
      )}
      {/* ---------------- End of Modal ---------------- */}
      </div>
    </div>
  );
};

export default ContactUs;