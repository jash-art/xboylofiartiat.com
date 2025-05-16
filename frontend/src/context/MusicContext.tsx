import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MusicRelease } from '../types';

type MusicContextType = {
  music: MusicRelease[];
  featuredMusic: MusicRelease[];
  latestMusic: MusicRelease | null;
  featuredMusicIds: string[];
  setMusic: (music: MusicRelease[]) => void;
  setFeaturedMusic: (featured: MusicRelease[]) => void;
  setLatestMusic: (latest: MusicRelease | null) => void;
  setFeaturedMusicIds: (ids: string[]) => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [music, setMusic] = useState<MusicRelease[]>([]);
  const [featuredMusic, setFeaturedMusic] = useState<MusicRelease[]>([]);
  const [latestMusic, setLatestMusic] = useState<MusicRelease | null>(null);
  const [featuredMusicIds, setFeaturedMusicIds] = useState<string[]>([]);

  React.useEffect(() => {
    const latestMusic=localStorage.getItem('latestRelaese');
    if(latestMusic){
      setLatestMusic(JSON.parse(latestMusic));
    }


 const featuredMusic=localStorage.getItem('featuredMusic');
 if(featuredMusic){
  setFeaturedMusic(JSON.parse(featuredMusic));
  }
  
 
  }, []);

  return (
    <MusicContext.Provider 
      value={{
        music,
        featuredMusic,
        latestMusic,
        featuredMusicIds,
        setMusic,
        setFeaturedMusic,
        setLatestMusic,
        setFeaturedMusicIds
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};