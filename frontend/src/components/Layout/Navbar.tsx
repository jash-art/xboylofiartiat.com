import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSoundcloudLine,RiInstagramLine,RiYoutubeLine,RiSpotifyLine,RiAppleLine,RiAmazonLine } from "@remixicon/react";



const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto  sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <NavLink to="/" className="font-semibold tracking-tight text-xl text-white">
              X.BOY
            </NavLink>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex space-x-8 ">       
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-6"
          >
            <a href="https://www.instagram.com/xboy.bx/" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="Instagram">
              <RiInstagramLine size={24} />
            </a>
            <a href="https://open.spotify.com/artist/5WHZ7ZLFTcVzF1hJZgJzgp" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
              <RiSpotifyLine size={24} />
            </a>
           
            <a href="https://music.apple.com/in/artist/x-boy/1800881639" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="SoundCloud">
              <RiAppleLine size={24} />
            </a>
             <a href="https://soundcloud.com/xboybx" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
              <RiSoundcloudLine size={24} />
            </a>
            <a href="https://music.amazon.in/artists/B0F13HMSYF/x-boy?referrer=https://xboyartist.netlify.app/"  target='__main'  className="text-white hover:text-gray-300 transition-colors" aria-label="YouTube">
              <RiAmazonLine size={24} />
            </a>
            <a href="https://www.youtube.com/@xboybx/" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="YouTube">
              <RiYoutubeLine size={24} />
            </a>
          </motion.div>
            </div>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-black/20 backdrop-blur-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive 
                    ? "px-3 py-2 text-white font-medium border-l-4 border-white" 
                    : "px-3 py-2 text-white/70 hover:text-white hover:bg-white/10"
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/music" 
                className={({ isActive }) => 
                  isActive 
                    ? "px-3 py-2 text-white font-medium border-l-4 border-white" 
                    : "px-3 py-2 text-white/70 hover:text-white hover:bg-white/10"
                }
              >
                Music
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive 
                    ? "px-3 py-2 text-white font-medium border-l-4 border-white" 
                    : "px-3 py-2 text-white/70 hover:text-white hover:bg-white/10"
                }
              >
                About
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;