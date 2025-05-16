import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import { pageSections } from '../data/music';
import Footer from '../components/Layout/Footer';
// import { useMusic } from '../context/MusicContext';
import { RiSpotifyFill, RiAppleFill } from "@remixicon/react";
// import { LogIn } from 'lucide-react';
import axios from 'axios';

// frontend/src/pages/Home.tsx
// Add this import at the top
import MusicPlayer from '../components/MusicPlayer';



const Home: React.FC = () => {
  const [profile, setProfile] = React.useState({ artistName: '', description: '' });
  // const { featuredMusic, latestMusic } = useMusic();
  const apiUrl = import.meta.env.VITE_API_URL ;
  const [featuredMusic, setFeaturedMusic] = React.useState([]);
  const [latestMusic, setLatestMusic] = React.useState([]);
  // console.log("featuredMusic", featuredMusic);
  // console.log("latestMusic", latestMusic);

  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/profile`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchMusic = async () => {
      try {
        const featuredRes = await axios.get(`${apiUrl}/status/featured`);
        setFeaturedMusic(featuredRes.data);
        

        const latestRes = await axios.get(`${apiUrl}/status/latest`);
        setLatestMusic(latestRes.data);
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };
    
    fetchProfile();
    fetchMusic();
  }, []);
  



  return (
    <>
      <PageLayout section={pageSections.home[0]}>
        <div className="flex flex-col items-center text-center min-h-[calc(100vh-8rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-white text-sm md:text-lg lg:text-xl font-bold mb-8 px-8 py-4">
              {profile.artistName}
            </h1>
            {profile.description && (
              <p className="text-xl text-gray-300 max-w-2xl mx-auto italic">
                {profile.description}
              </p>
            )}
   
          </motion.div>
   
          <Footer />
        </div>
      </PageLayout>

      <PageLayout section={pageSections.home[1]}>
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-white text-xl font-medium italic">Featured Track</h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="aspect-square flex items-center justify-center"
              >
                <div className="w-full h-full flex flex-col items-center justify-center transition-all duration-300 group backdrop-blur-lg bg-white/10 rounded-xl p-8 border border-white/20">
                  <img
                    src={featuredMusic[0]?.coverImage || ''}
                    alt={featuredMusic[0]?.title || 'Featured Music'}
                    className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
                  />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{featuredMusic[0]?.title || ''}</p>
                  <div className="flex gap-4">
                    <a href={featuredMusic[0]?.links?.spotify} target="_blank" rel="noopener noreferrer">
                      <RiSpotifyFill className="text-white text-3xl hover:text-green-500 transition-colors duration-300" />
                    </a>
                    <a href={featuredMusic[0]?.links?.appleMusic} target="_blank" rel="noopener noreferrer">
                      <RiAppleFill className="text-white text-3xl hover:text-pink-500 transition-colors duration-300" />
                    </a>
                  </div>
                </div>
                </div>


              </motion.div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-white text-xl font-medium italic ">Latest Release</h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="aspect-square flex items-center justify-center"
              >
                <div className="w-full h-full flex flex-col items-center justify-center transition-all duration-300 group backdrop-blur-lg bg-white/10 rounded-xl p-8 border border-white/20">
                  <img
                    src={latestMusic[0]?.coverImage || ''}
                    alt={latestMusic[0]?.title || 'Latest Music'}
                    className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
                  />
                 
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{latestMusic[0]?.title || ''}</p>
                  <div className="flex gap-4">
                    <a href={latestMusic[0]?.links?.spotify} target="_blank" rel="noopener noreferrer">
                      <RiSpotifyFill className="text-white text-3xl hover:text-green-500 transition-colors duration-300" />
                    </a>
                    <a href={latestMusic[0]?.links?.appleMusic} target="_blank" rel="noopener noreferrer">
                      <RiAppleFill className="text-white text-3xl hover:text-pink-500 transition-colors duration-300" />
                    </a>
                  </div>
                </div>
                </div>

              </motion.div>
            </div>
            <Link to="/music" className="aspect-square flex items-center justify-center transition-all duration-300 group">
              <span className="bg-white/5 backdrop-blur-sm border-t border-white/10 text-white px-20 py-5 rounded-full border border-white text-sm group-hover:scale-105 transition-transform duration-300">Music</span>
            </Link>
            <Link to="/about" className="aspect-square flex items-center justify-center transition-all duration-300 group">
              <span className="bg-white/5 backdrop-blur-sm border-t border-white/10 text-sm text-white px-20 py-5 rounded-full border border-white group-hover:scale-105 transition-transform duration-300">About</span>
            </Link>
          </div>
        </div>
      </PageLayout>

      <div className="min-h-[calc(100vh-8rem)] flex items-start justify-center bg-[url(/dad.gif)] bg-bottom">
        <p className='italic text-white py-32 pr-26'>"Myself isn't Loud.Me is Music.Intution is the only Listener"</p>
      </div>
                        <MusicPlayer 
        embedCode={latestMusic[0]?.embedCode} 
        embedType={latestMusic[0]?.embedType}
      />
    
    </>
  );
};

export default Home;