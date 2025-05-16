import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Music, Headphones, Coffee, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import { pageSections } from '../data/music';
import { div } from 'framer-motion/client';

const About: React.FC = () => {
  return (
<div className="relative h-screen w-screen md:h-full bg-[#f8f5ec] bg-[url(https://c4.wallpaperflare.com/wallpaper/636/709/249/pixel-art-sea-beach-rocks-wallpaper-preview.jpg)] bg-cover   ">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <NavLink 
          to="/" 
          className="absolute top-4 left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="text-white" size={24} />
        </NavLink>
      </motion.div>
      <PageLayout section={pageSections.about[0]}>
       <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-16 rounded-3xl">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="bg-gray-100 aspect-square mb-4 rounded-lg overflow-hidden">
              <img 
                src="/profile.gif" 
                alt="Artist portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0 text-gray-600" />
                <span>Hyderabad, India</span>
              </div>
              
              <div className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5 flex-shrink-0 text-gray-600" />
                <span>j.jaswanth@icloud.com</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-4">The Story</h3>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Hello, I'm a music producer specializing in lo-fi hip hop and ambient music. Based in Tokyo, Japan, I draw inspiration from the quiet moments in the bustling city, the rainy days spent indoors, and the calm of early mornings.
              </p>
              
              <p>
                My journey began in 2018 when I started experimenting with sampling techniques and drum programming. What started as a hobby quickly turned into a passion as I found myself spending hours crafting beats and melodies that evoke specific moods and atmospheres.
              </p>
              
              <p>
                My music is designed to be a companion for your everyday moments – whether you're studying, working, relaxing, or just need something playing in the background while you go about your day.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Equipment & Process</h3>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Music size={18} className="mr-2 mt-0.5 flex-shrink-0 text-gray-600" />
                <span> Various MIDI Controllers</span>
              </div>
              
              <div className="flex items-start">
                <Headphones size={18} className="mr-2 mt-0.5 flex-shrink-0 text-gray-600" />
                <span>Ableton Live, FL Studio</span>
              </div>
              
              <div className="flex items-start">
                <Coffee size={18} className="mr-2 mt-0.5 flex-shrink-0 text-gray-600" />
                <span>Vinyl samples, field recordings, and a lot of coffee</span>
              </div>
            </div>
          </motion.div>
        </div>
       </div>
      </PageLayout>
      
   
</div>
  );
};

export default About;