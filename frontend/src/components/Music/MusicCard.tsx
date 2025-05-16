import React from 'react';
import { motion } from 'framer-motion';
import { MusicRelease } from '../../types';
import { RiSoundcloudFill, RiYoutubeFill, RiSpotifyFill, RiAppleFill, RiAmazonFill } from "@remixicon/react";

interface MusicCardProps {
  release: MusicRelease;
}

const MusicCard: React.FC<MusicCardProps> = ({ release }) => {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-lg overflow-hidden flex flex-row mb-2 hover:shadow-md transition-shadow duration-300 h-16 w-full sm:h-20 md:h-24 lg:h-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 relative">
        <img 
          src={release.coverImage} 
          alt={`${release.title} cover`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 p-2 sm:p-2 lg:p-3 flex flex-col justify-center overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-xs text-white lg:text-sm font-bold mb-1 truncate">{release.title}</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 p-2 sm:p-3 md:p-4">
            {release.links.spotify && (
              <a href={release.links.spotify} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Spotify">
                <RiSpotifyFill size={20} />
              </a>
            )}
            {release.links.appleMusic && (
              <a href={release.links.appleMusic} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Apple Music">
                <RiAppleFill size={20} />
              </a>
            )}
            {release.links.soundcloud && (
              <a href={release.links.soundcloud} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="SoundCloud">
                <RiSoundcloudFill size={20} />
              </a>
            )}
            {release.links.youtube && (
              <a href={release.links.youtube} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube">
                <RiYoutubeFill size={20} />
              </a>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-1 lg:mb-2 line-clamp-2 lg:line-clamp-3">{release.description}</p>
      </div>
    </motion.div>
  );
};

export default MusicCard;

// import React from 'react';
// import { motion } from 'framer-motion';
// import { MusicRelease } from '../../types';
// import { ExternalLink } from 'lucide-react';
// import { RiSoundcloudFill,RiYoutubeFill,RiSpotifyFill,RiAppleFill,RiAmazonFill } from "@remixicon/react";


// interface MusicCardProps {
//   release: MusicRelease;
// }

// const MusicCard: React.FC<MusicCardProps> = ({ release }) => {
//   return (
//     <motion.div 
//       className="bg-white/5 backdrop-blur-sm border-t  border-white/10 rounded-lg overflow-hidden  flex flex-row mb-2 hover:shadow-md transition-shadow duration-300 h-16 md:h-24 md:w-full lg:w-full lg:h-24"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileHover={{ scale: 1.01 }}
//     >
//       <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 relative">
//         <img 
//           src={release.coverImage} 
//           alt={`${release.title} cover`} 
//           className="w-full h-full object-cover"
//         />
//       </div>
      
//       <div className="flex-1 p-2 sm:p-2 lg:p-3 flex flex-col justify-center overflow-hidden">
//         <div className="flex items-center justify-between">
//           <h3 className="text-xs text-white lg:text-sm font-bold mb-1 truncate">{release.title}</h3>
//           <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 p-2 sm:p-3 md:p-4">
         
//             <a href="https://twitter.com" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
//               <RiSpotifyFill size={20} />
//             </a>
//              <a href="https://twitter.com" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
//               <RiAppleFill size={20} />
//             </a>
            
//             <a href="https://soundcloud.com" className="text-white/70 hover:text-white transition-colors" aria-label="SoundCloud">
//               <RiAmazonFill size={20} />
//             </a>
//              <a href="https://soundcloud.com" className="text-white/70 hover:text-white transition-colors" aria-label="SoundCloud">
//               <RiSoundcloudFill size={20} />
//             </a>
            
            
//             <a href="https://youtube.com" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube">
//               <RiYoutubeFill size={20} />
//             </a>
//           </div>
//         </div>
//         <p className="text-xs text-gray-400 mb-1 lg:mb-2 line-clamp-2 lg:line-clamp-3">{release.description}</p>
//       </div>
//     </motion.div>
//   );
// };

// export default MusicCard;