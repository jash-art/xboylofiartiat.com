// frontend/src/components/MusicPlayer.tsx
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface MusicPlayerProps {
  embedCode?: string;
  embedType?: 'spotify' | 'soundcloud';
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ embedCode, embedType }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: window.innerHeight - 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const defaultPosition = { x: window.innerWidth / 2 - 50, y: window.innerHeight - 200};

  if (!embedCode) return null;

  return (
  
    <div 
  className="fixed z-50 cursor-grab"
  style={{
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
    animation: !isDragging ? 'bounce 2s ease-in-out infinite' : 'none',
    transformOrigin: 'center bottom'
  }}
  onMouseDown={(e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }}
  onMouseMove={(e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Check proximity to default position (within 50px)
      const distance = Math.sqrt(
        Math.pow(newX - defaultPosition.x, 2) + 
        Math.pow(newY - defaultPosition.y, 2)
      );
      
      if (distance < 50 && !isDragging) {
        setPosition(defaultPosition);
      } else {
        setPosition({
          x: newX,
          y: newY
        });
      }
    }
  }}
  onMouseUp={() => setIsDragging(false)}
  onMouseLeave={() => setIsDragging(false)}
>
      {!isPlaying ? (
        <button
          onClick={() => setIsPlaying(true)}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-colors duration-300"
        >
          <Play className="w-6 h-6 text-white" />
        </button>
      ) : (
        <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2">
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute -top-2 -right-2 bg-black/50 rounded-full p-1"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="w-[300px] h-[80px]" dangerouslySetInnerHTML={{ __html: embedCode }} />

        </div>
      )}
    </div>
  );
};

export default MusicPlayer;




// // frontend/src/components/MusicPlayer.tsx
// import React, { useState } from 'react';
// import { Play, X } from 'lucide-react';

// interface MusicPlayerProps {
//   embedCode?: string;
//   embedType?: 'spotify' | 'soundcloud';
// }

// const MusicPlayer: React.FC<MusicPlayerProps> = ({ embedCode, embedType }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

//   if (!embedCode) return null;

//   return (
//     <div 
//   className="fixed z-50"
//   style={{
//     left: `${position.x}px`,
//     top: `${position.y}px`,
//     cursor: isDragging ? 'grabbing' : 'grab'
//   }}    
//   onMouseDown={(e) => {
//     setIsDragging(true);
//     setDragOffset({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     });
//   }}
//   onMouseMove={(e) => {
//     if (isDragging) {
//       setPosition({
//         x: e.clientX - dragOffset.x,
//         y: e.clientY - dragOffset.y
//       });
//     }
//   }}
//   onMouseUp={() => setIsDragging(false)}
//   onMouseLeave={() => setIsDragging(false)}
// >
//       {!isPlaying ? (
//         <button
//           onClick={() => setIsPlaying(true)}
//           className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-colors duration-300"
//         >
//           <Play className="w-6 h-6 text-white" />
//         </button>
//       ) : (
//         <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2">
//           <button
//             onClick={() => setIsPlaying(false)}
//             className="absolute -top-2 -right-2 bg-black/50 rounded-full p-1"
//           >
//             <X className="w-4 h-4 text-white" />
//           </button>
//           <div className="w-[300px] h-[80px]" dangerouslySetInnerHTML={{ __html: embedCode }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MusicPlayer;