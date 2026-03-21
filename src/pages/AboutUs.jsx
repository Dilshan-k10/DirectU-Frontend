import React, { useEffect } from 'react';
import { FiTarget, FiCheck } from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import { IoRocketOutline } from 'react-icons/io5';

import AOS from 'aos';
import 'aos/dist/aos.css';



const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
      offset: 100,   
    });
  }, []);

  const coreValues = [
    {
      id: 1,
      icon: <FiTarget className="text-4xl text-red-500 mb-4" />,
      title: "Our Mission",
      description: "To provide a transparent and data-backed pathway for every student's higher education journey."
    },
    {
      id: 2,
      icon: <FaLightbulb className="text-4xl text-yellow-400 mb-4" />,
      title: "The Innovation",
      description: "Integrating smart document analysis with dynamic entrance exam solutions for better accuracy."
    },
    {
      id: 3,
      icon: <IoRocketOutline className="text-4xl text-orange-500 mb-4" />,
      title: "Future Vision",
      description: "Expanding DirectU to become the global standard for skill-aligned university intake."
    }
  ];

  const getImageUrl = (imageName) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };


  const teamMembers = [
    { id: 1, name: "Sandeepa Bandara", role: "Project Lead / Developer", img: getImageUrl('Lahiru.jpg'), quote: "Driven by solving complex education hurdles with technology." },
    { id: 2, name: "Raveesha Eranda", role: "UI/UX Designer / Frontend Developer", img: getImageUrl('Raveesha.jpg'), quote: "Focusing on making complex systems simple and beautiful." },
    { id: 3, name: "Dilshan Kavinda", role: "System Architect / Full Stack Developer", img: getImageUrl('Dilshan.jpg'), quote: "Building the robust backbone of DirectU admission logic." },
    { id: 4, name: "Rakshitha Wishwajith", role: "Backend Developer", img: getImageUrl('Rakshitha.jpg'), quote: "Ensuring every student journey is bug-free and smooth." },
    { id: 5, name: "Praveen Mathisha", role: "AI Engineer", img: getImageUrl('Mathisha.jpg'), quote: "Analyzing academic trends to provide smart recommendations." },
    { id: 6, name: "Thamindu Dinujaya", role: "Quality Assurance", img: getImageUrl('Thamindu.jpg'), quote: "Crafting the visual experience that students interact with." }
  ];

  const achievements = [
    "Smart Admission Document Analysis",
    "Automated Entrance Exam Generation",
    "Rank-based Batch Selection System",
    "AI Degree Recommendation Engine"
  ];

  return (
    <div className="bg-brand-dark min-h-screen text-white py-16 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-20" data-aos="fade-down">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
          Meet the Minds Behind <span className="text-accent">DirectU</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          We are a team of passionate innovators dedicated to modernizing the university 
          admission experience. Through DirectU, we bridge the gap between student potential and 
          academic excellence using AI-driven analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-28">
        {coreValues.map((item, index) => (
          <div 
            key={item.id} 
            data-aos="fade-up" 
            data-aos-delay={index * 150} 
            className="bg-brand-card rounded-3xl p-8 flex flex-col items-center text-center border border-brand-border shadow-lg hover:-translate-y-2 transition-transform duration-300"
          >
            {item.icon}
            <h3 className="text-xl font-bold mb-3 text-gray-100">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Expert Team Section */}
      <div className="mb-28">
        <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Our Expert Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-brand-card rounded-3xl p-8 flex flex-col items-center text-center border border-brand-border shadow-lg"
            >
              
              <div className="w-32 aspect-[3/4] rounded-2xl border-2 border-accent mb-5 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#4b2c91] to-[#251547] shadow-md transition-transform hover:scale-105 duration-300">
                {member.img ? (
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <span className="text-xs text-gray-300 text-center px-2">Photo Here</span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-100 mb-1">{member.name}</h3>
              <p className="text-accent text-sm font-semibold mb-4">{member.role}</p>
              <p className="text-gray-400 text-sm italic px-4">"{member.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 justify-between items-center bg-[#050920] rounded-[3rem] p-10 lg:p-16 border border-[#1A2255]">
        
        <div className="w-full lg:w-1/2" data-aos="fade-right">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">
            What We Achieved in
          </h2>
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-8">
            Phase 1
          </h2>
          <ul className="space-y-4">
            {achievements.map((item, index) => (
              <li key={index} className="flex items-center space-x-3 text-gray-300 font-medium">
                <FiCheck className="text-green-500 text-xl flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-1/2" data-aos="fade-left">
          <div className="bg-brand-card rounded-3xl p-8 border border-brand-border shadow-2xl">
            <h3 className="text-xl font-bold text-gray-100 mb-6">Project Statistics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#141A46] rounded-2xl p-6 text-center border border-[#232B60]">
                <h4 className="text-2xl lg:text-3xl font-bold text-[#A87BFF] mb-1">100%</h4>
                <p className="text-gray-400 text-xs tracking-wider uppercase">Automation</p>
              </div>
              
              <div className="bg-[#141A46] rounded-2xl p-6 text-center border border-[#232B60]">
                <h4 className="text-2xl lg:text-3xl font-bold text-[#A87BFF] mb-1">Secured</h4>
                <p className="text-gray-400 text-xs tracking-wider uppercase">Data</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AboutUs;