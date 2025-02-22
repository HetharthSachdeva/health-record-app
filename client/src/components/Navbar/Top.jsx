import React, { useState, useEffect } from 'react';
import { Search, MapPin, ShoppingCart, User, ChevronDown, Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'
import TopCho from '../HeroCom/TopCho';

const Top = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location, setLocation] = useState('Fetching location...');
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => setLocation(data.city || 'Unknown location'))
            .catch(() => setLocation('Location not found'));
        },
        () => {
          setLocation('Location access denied');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  const linktomap = () => {
    navigate('/Maps'); // Ensure this path matches the route defined for the maps page
  }
  const navLinks = [
    {
      title: 'Healthcare Services',
      isNew: true,
      sublinks: [
        'Primary Care',
        'Specialist Consultation',
        'Emergency Services',
        'Preventive Care',
        'Mental Health'
      ]
    },
    { title: 'Offers' },
    { title: 'Pharmacy' },
    { title: 'Insurance' }
  ];

  return (
    <nav className={`bg-[#F9FAFB] shadow-[0_4px_2px_-2px_#1b58fe] h-24 flex items-center justify-between z-20 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}> 
      <div className="w-full  px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex ">
              <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full mr-2" />
              <span className="text-4xl font-bold text-blue-900 inline-block font-serif">HEALTH CARE</span>
            </div>
            
            {/* Location Selector */}
            <div className="hidden md:flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Services Dropdown */}
            <div className="relative ">
              <button
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <span>Healthcare Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1 rounded">New</span>
              </button>
              
              {isServicesOpen && (
                <div
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl transform opacity-100 scale-100 transition-all duration-200 origin-top"
                >
                  {navLinks[0].sublinks.map((sublink, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      {sublink}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Offers</a>
            <div className="flex items-center space-x-4 rounded-3xl">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center justify-around gap-2" onClick={linktomap} > <MapPin className="w-4 h-4" />Nearby Cares</button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden pt-4 "> 
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200 absolute right-4 top-8"
            >
              <div className="relative w-6 h-6">
                <span className={`transform transition-all duration-300 absolute h-0.5 w-6 bg-current rounded-sm ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                <span className={`transform transition-all duration-300 absolute h-0.5 w-6 bg-current rounded-sm ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`transform transition-all duration-300 absolute h-0.5 w-6 bg-current rounded-sm ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden absolute top-16 right-5 z-20 rounded-lg transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t transform transition-transform duration-300">
          {/* Mobile Search */}
          <div className="px-3 py-2">
            <div className="relative">
             
           
            </div>
          </div>

          {/* Mobile Location */}
          <div className="flex items-center space-x-2 px-3 py-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
       
          {/* Mobile Nav Links */}
          {navLinks.map((link, index) => (
         <a
              key={index}
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {link.title}
              {link.isNew && (
                <span className="ml-2 bg-orange-500 text-white text-xs px-1 rounded">New</span>
              )}
            </a>
          ))}

     
       
        </div>
      </div>
      
    </nav>
  );
};

export default Top;
