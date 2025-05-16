import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MusicRelease } from '../types';
import { useMusic } from '../context/MusicContext';
import LoadingSpinner from '../components/LoadingSpinner';


const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { music, setMusic, latestMusic, setLatestMusic } = useMusic();
  const [featuredMusic, setFeaturedMusic] = useState<MusicRelease[]>([]);
  const [profile, setProfile] = useState({ artistName: '', description: '' });
  const [newMusic, setNewMusic] = useState<Partial<MusicRelease>>({
    title: '',
    releaseDate: '',
    coverImage: '',
    description: '',
    links: { spotify: '', appleMusic: '', soundcloud: '', youtube: '' }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();


  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchData();
      fetchFeaturedMusic();
    }
  }, []);


  // const fetchFeaturedMusic = async () => {
  //   try {
  //     setIsLoading(true);
  //     const token = localStorage.getItem('adminToken');
  //     const headers = { Authorization: `Bearer ${token}` };
  //     const response = await axios.get(`${apiUrl}/status/featured`, { headers });
  //     setFeaturedMusic(response.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error('Error fetching featured music:', error);
  //   }
  // };

  const fetchFeaturedMusic = async () => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };
    console.log('Fetching featured music from:', `${apiUrl}/status/featured`);
    const response = await axios.get(`${apiUrl}/status/featured`, { headers });
    console.log('Featured music response status:', response.status);
    
    // Ensure that the response data is an array
    const musicData = Array.isArray(response.data) ? response.data : [];
    setFeaturedMusic(musicData);
    
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.error('Error fetching featured music:', error);
    // Set featuredMusic to an empty array in case of an error
    setFeaturedMusic([]);
  }
};


  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };
      console.log('Fetching data from:', `${apiUrl}/api/music`);
      console.log('Fetching profile from:', `${apiUrl}/api/profile`);
      const [musicRes, profileRes] = await Promise.all([
        axios.get(`${apiUrl}/api/music`),
        axios.get(`${apiUrl}/api/profile`)
      ]);
      console.log('Music response status:', musicRes.status);
      console.log('Profile response status:', profileRes.status);
      const sortedMusic = [...musicRes.data].sort((a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
      setMusic(sortedMusic);
      setLatestMusic(sortedMusic[0] || null);


      if (sortedMusic.length > 0) {
        const latestMusicId = sortedMusic[0]._id;
        await axios.put(`${apiUrl}/status/${latestMusicId}/latest`,
          { latest: false },
          { headers }
        );
        await Promise.all(sortedMusic.slice(1).map(music =>
          axios.put(`${apiUrl}/status/${music._id}/latestf`,
            { latest: false },
            { headers }
          )
        ));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log('Attempting login with URL:', `${apiUrl}/api/admin/login`);
      console.log('Login payload:', { username, password });
      console.log('Full request URL:', `${apiUrl}/api/admin/login`);
      console.log('Environment API URL:', apiUrl);
      const res = await axios.post(`${apiUrl}/api/admin/login`, { username, password });
      console.log('Login response status:', res.status);
      console.log('Login response data:', res.data);
      console.log('Login response:', res.data);
      console.log('Response headers:', res.headers);
      console.log('Response status:', res.status);
      localStorage.setItem('adminToken', res.data.token);
      setIsLoggedIn(true);
      await fetchData();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Login error details:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      alert('Login failed');
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/');
  };


  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      await axios.put(`${apiUrl}/api/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsLoading(false);
      alert('Profile updated successfully');
    } catch (error) {
      setIsLoading(false);
      alert('Failed to update profile');
    }
  };


  const handleAddMusic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      await axios.post(`${apiUrl}/api/music`, newMusic, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchData();
      setNewMusic({
        title: '',
        releaseDate: '',
        coverImage: '',
        description: '',
        links: { spotify: '', appleMusic: '', soundcloud: '', youtube: '' },
        embedCode: ''
      });
      setIsLoading(false);
      alert('Music added successfully');
    } catch (error) {
      setIsLoading(false);
      alert('Failed to add music');
    }
  };


  const handleDeleteMusic = async (id: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${apiUrl}/api/music/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchData();
      setIsLoading(false);
      alert('Music deleted successfully');
    } catch (error) {
      setIsLoading(false);
      console.error('Delete error:', error);
      alert('Failed to delete music');
    }
  };


  const handleEditMusic = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      await axios.put(`${apiUrl}/api/music/${id}`, {
        title: newMusic.title,
        releaseDate: newMusic.releaseDate,
        coverImage: newMusic.coverImage,
        description: newMusic.description,
        links: newMusic.links
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchData();
      setNewMusic({
        title: '',
        releaseDate: '',
        coverImage: '',
        description: '',
        links: { spotify: '', appleMusic: '', soundcloud: '', youtube: '' },
        embedCode: ''
      });
      setEditingId(null);
      setIsLoading(false);
      alert('Music updated successfully');
    } catch (error) {
      setIsLoading(false);
      alert('Failed to update music');
    }
  };


  const handleEditClick = (release: MusicRelease) => {
    setNewMusic({
      title: release.title,
      releaseDate: release.releaseDate,
      coverImage: release.coverImage,
      description: release.description,
      links: {
        spotify: release.links.spotify,
        appleMusic: release.links.appleMusic,
        soundcloud: release.links.soundcloud,
        youtube: release.links.youtube
      }
    });
    setEditingId(release._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  if (!isLoggedIn) {
    return (
      <>
        {isLoading && <LoadingSpinner />}
        <div className="min-h-screen bg-black flex items-center justify-center">
          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-8 rounded-lg">
            <h2 className="text-2xl text-white mb-4">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full mb-4 p-2 rounded bg-white/10 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mb-4 p-2 rounded bg-white/10 text-white"
            />
            <button type="submit" className="w-full bg-white/20 text-white p-2 rounded hover:bg-white/30">
              Login
            </button>
          </form>
        </div>
      </>
    );
  }


  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-white/20 px-4 py-2 rounded hover:bg-white/30">
              Logout
            </button>
          </div>


          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-xl mb-4">Featured Music</h2>
            <div className="grid grid-cols-2 gap-4">
  {featuredMusic.length > 0 ? (
    featuredMusic.map((release, idx) => (
      <div key={idx} className="p-4 bg-white/10 rounded flex items-center gap-4">
        {release.coverImage && (
          <img
            src={release.coverImage}
            alt={release.title}
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <div>
          <h3 className={`font-bold ${release.embedCode ? 'text-red-500' : ''}`}>{release.title}</h3>
          <p className="text-sm text-gray-400">{release.releaseDate}</p>
          <p className="text-sm text-gray-400 mt-1">{release.description}</p>
        </div>
      </div>
    ))
  ) : (
    <p>No featured music available</p>
  )}
</div>
            {/* <div className="grid grid-cols-2 gap-4">
              {featuredMusic.map((release, idx) => (
                <div key={idx} className="p-4 bg-white/10 rounded flex items-center gap-4">
                  {release.coverImage && (
                    <img
                      src={release.coverImage}
                      alt={release.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className={`font-bold ${release.embedCode ? 'text-red-500' : ''}`}>{release.title}</h3>
                    <p className="text-sm text-gray-400">{release.releaseDate}</p>
                    <p className="text-sm text-gray-400 mt-1">{release.description}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>


          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-xl mb-4">Latest Release</h2>
            {music.length > 0 && (
              <div className="p-4 bg-white/10 rounded flex items-center gap-4">
                {music[0].coverImage && (
                  <img
                    src={music[0].coverImage}
                    alt={music[0].title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className={`font-bold ${music[0].embedCode ? 'text-red-500' : ''}`}>{music[0].title}</h3>
                  <p className="text-sm text-gray-400">{music[0].releaseDate}</p>
                  <p className="text-sm text-gray-400 mt-1">{music[0].description}</p>
                </div>
              </div>
            )}
          </div>


          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-xl mb-4">Profile Settings</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label className="block mb-2">Artist Name</label>
                <input
                  type="text"
                  value={profile.artistName}
                  onChange={(e) => setProfile({ ...profile, artistName: e.target.value })}
                  className="w-full p-2 rounded bg-white/10"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  className="w-full p-2 rounded bg-white/10 h-24"
                />
              </div>
              <button type="submit" className="bg-white/20 px-4 py-2 rounded hover:bg-white/30">
                Update Profile
              </button>
            </form>
          </div>


          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-xl mb-4">Add New Music</h2>
            <form onSubmit={editingId ? (e) => handleEditMusic(e, editingId) : handleAddMusic}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  value={newMusic.title}
                  onChange={(e) => setNewMusic({ ...newMusic, title: e.target.value })}
                  className="w-full p-2 rounded bg-white/10"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Release Date</label>
                <input
                  type="date"
                  value={newMusic.releaseDate}
                  onChange={(e) => setNewMusic({ ...newMusic, releaseDate: e.target.value })}
                  className="w-full p-2 rounded bg-white/10"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Cover Image URL</label>
                <input
                  type="text"
                  value={newMusic.coverImage}
                  onChange={(e) => setNewMusic({ ...newMusic, coverImage: e.target.value })}
                  className="w-full p-2 rounded bg-white/10"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newMusic.description}
                  onChange={(e) => setNewMusic({ ...newMusic, description: e.target.value })}
                  className="w-full p-2 rounded bg-white/10 h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Spotify Link</label>
                  <input
                    type="text"
                    value={newMusic.links?.spotify}
                    onChange={(e) => setNewMusic({ ...newMusic, links: { ...newMusic.links, spotify: e.target.value } })}
                    className="w-full p-2 rounded bg-white/10"
                  />
                </div>
                <div>
                  <label className="block mb-2">Apple Music Link</label>
                  <input
                    type="text"
                    value={newMusic.links?.appleMusic}
                    onChange={(e) => setNewMusic({ ...newMusic, links: { ...newMusic.links, appleMusic: e.target.value } })}
                    className="w-full p-2 rounded bg-white/10"
                  />
                </div>
                <div>
                  <label className="block mb-2">SoundCloud Link</label>
                  <input
                    type="text"
                    value={newMusic.links?.soundcloud}
                    onChange={(e) => setNewMusic({ ...newMusic, links: { ...newMusic.links, soundcloud: e.target.value } })}
                    className="w-full p-2 rounded bg-white/10"
                  />
                </div>
                <div>
                  <label className="block mb-2">YouTube Link</label>
                  <input
                    type="text"
                    value={newMusic.links?.youtube}
                    onChange={(e) => setNewMusic({ ...newMusic, links: { ...newMusic.links, youtube: e.target.value } })}
                    className="w-full p-2 rounded bg-white/10"
                  />
                </div>
                {/* // In frontend/src/pages/Admin.tsx
// Add these fields inside the "Add New Music" form: */}

<div className="mb-4">
  <label className="block mb-2">Embed Type</label>
  <select
    // value={newMusic.embedType} 
    onChange={(e) => setNewMusic({ ...newMusic, embedType: e.target.value })}
    className="w-full p-2 rounded bg-white/10"
  >
    <option value="">Select Type</option>
    <option value="spotify">Spotify</option>
    <option value="soundcloud">SoundCloud</option>
  </select>
</div>
<div className="mb-4">
  <label className="block mb-2">Embed Code</label>
  <h5 className='text-red-500 italic text-xs font-bold'>Spotify (height: 120, width: 100%) and SoundCloud (height: 78, width: 100%)—To add a new link, first delete the existing one. The music title in red contains embedded links. If a latest date is added, it cannot be edited. To modify the date, remove the embedded music link and add it again. You can only add an embed link once. If you want to change it, delete the previous one and add a new one. Keep in mind the latest issue ,for embeded links only keep date befor the todays date.</h5>
  <textarea
    value={newMusic.embedCode}
    onChange={(e) => setNewMusic({ ...newMusic, embedCode: e.target.value })}
    className="w-full p-2 rounded bg-white/10 h-24"
    placeholder="Paste Spotify or SoundCloud embed code here"
  />
</div>

              </div>
              <button type="submit" className="bg-white/20 px-4 py-2 rounded hover:bg-white/30">
                {editingId ? 'Update Music' : 'Add Music'}
              </button>
            </form>
          </div>


          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-xl mb-4">Manage Music</h2>
            <div className="space-y-4">
              {music.map((release, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/10 rounded">
                  <div>
                    <h3 className={`font-bold ${release.embedCode ? 'text-red-500' : ''}`}>{release.title}</h3>
                    <p className="text-sm text-gray-400">{release.releaseDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteMusic(release?._id)}
                      className="bg-red-500/20 px-4 py-2 rounded hover:bg-red-500/30"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditClick(release)}
                      className="bg-blue-500/20 px-4 py-2 rounded hover:bg-blue-500/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        setIsLoading(true);
                        const token = localStorage.getItem('adminToken');
                        const headers = { Authorization: `Bearer ${token}` };
                        const isCurrentlyFeatured = featuredMusic.some(m => m._id === release._id);
                        try {
                          await axios.put(`${apiUrl}/status/${release._id}/featured`,
                            { featured: !isCurrentlyFeatured },
                            { headers }
                          );
                          await fetchFeaturedMusic();
                          setMusic(prevMusic => prevMusic.map(m =>
                            m._id === release._id ? { ...m, featured: !isCurrentlyFeatured } : m
                          ));
                          setIsLoading(false);
                        } catch (error) {
                          setIsLoading(false);
                          console.error('Error updating featured status:', error);
                          alert('Failed to update featured status');
                        }
                      }}
                      className={`px-4 py-2 rounded ${featuredMusic.some(m => m._id === release._id) ? 'bg-green-500/20 hover:bg-green-500/30' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                      {featuredMusic.some(m => m._id === release._id) ? 'Featured' : 'Make Featured'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Admin;