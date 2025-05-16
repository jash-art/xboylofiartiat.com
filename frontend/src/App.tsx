import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Music from './pages/Music';
import About from './pages/About';
import Admin from './pages/Admin';
import { MusicProvider } from './context/MusicContext';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <MusicProvider>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/about" element={<About />} />
        <Route path="/jashad" element={<Admin />} />
      </Routes>
    </AnimatePresence>
    </MusicProvider>
  );
}

export default App;