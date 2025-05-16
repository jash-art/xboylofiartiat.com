// import React from 'react';

// const LoadingSpinner: React.FC = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default LoadingSpinner;

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-16 h-16">
        {[...Array(8)].map((_, i) => {
          const style = {
            top: '50%',
            left: '50%',
            marginTop: '-6px',
            marginLeft: '-6px',
            transformOrigin: '12px 12px',
            transform: `rotate(${i * 45}deg) translate(12px) rotate(-${i * 45}deg)`,
            animationDelay: `${i * 0.15}s`,
          };
          return (
            <span
              key={i}
              className="absolute block w-3 h-3 bg-white rounded-full opacity-75 animate-twinkle"
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LoadingSpinner;

