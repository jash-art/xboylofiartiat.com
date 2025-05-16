import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import MusicCard from '../components/Music/MusicCard';
import { pageSections } from '../data/music';
import axios from 'axios';
import { MusicRelease } from '../types';

const Music: React.FC = () => {
  const [releases, setReleases] = React.useState<MusicRelease[]>([]);

  React.useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/music`);
        setReleases(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching music:', error);
        setReleases([]);
      }
    };
    fetchMusic();
  }, []);

  return (
    <div className="relative h-screen bg-[url(/cst.gif)] bg-cover bg-bottom">
      <NavLink 
        to="/" 
        className="absolute top-4 left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <ArrowLeft className="text-white" size={24} />
      </NavLink>

      <PageLayout section={pageSections.music[0]}>
        <div className="absolute inset-0 px-16 z-10 bg-opacity-30 flex flex-col justify-center">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-gray-100 mb-8">
                Here you'll find all my music releases. Each release represents a unique mood and atmosphere, crafted with care to provide the perfect soundtrack for studying, relaxing, or simply enjoying.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {releases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative z-20"
                >
                  <MusicCard release={release} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Music;