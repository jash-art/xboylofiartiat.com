import React from 'react';
import { RiSoundcloudFill,RiInstagramFill,RiYoutubeFill,RiSpotifyFill,RiAppleFill,RiAmazonFill } from "@remixicon/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-auto w-full mb-2 rounded-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
           <a href="https://www.instagram.com/xboy.bx/" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="Instagram">
              <RiInstagramFill size={24} />
            </a>
            <a href="https://open.spotify.com/artist/5WHZ7ZLFTcVzF1hJZgJzgp" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
              <RiSpotifyFill size={24} />
            </a>
           
            <a href="https://music.apple.com/in/artist/x-boy/1800881639" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="SoundCloud">
              <RiAppleFill size={24} />
            </a>
             <a href="https://soundcloud.com/xboybx" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
              <RiSoundcloudFill size={24} />
            </a>
            <a href="https://music.amazon.in/artists/B0F13HMSYF/x-boy?referrer=https://xboyartist.netlify.app/" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="YouTube">
              <RiAmazonFill size={24} />
            </a>
            <a href="https://www.youtube.com/@xboybx/" target='__main' className="text-white hover:text-gray-300 transition-colors" aria-label="YouTube">
              <RiYoutubeFill size={24} />
            </a>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-white/70 text-sm">
              &copy; {new Date().getFullYear()} X.BOY. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;