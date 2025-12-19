import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { playlists } from '../data/mockData';
import apiService from '../services/api';

function MainContent({ currentSong, setCurrentSong, isPlaying, setIsPlaying, setSelectedAlbum, user, onLogout, setPlaylist }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const data = await apiService.getSongs();
      if (data && data.length > 0) {
        setSongs(data);
        setPlaylist(data);
        console.log(`✅ Loaded ${data.length} songs from MongoDB`);
      } else {
        console.log('⚠️ No songs in database');
      }
    } catch (error) {
      console.error('❌ Failed to fetch from MongoDB:', error.message);
      console.log('📦 Backend connection failed');
    }
  };
  const handlePlayPause = async (song) => {
    const songId = song._id || song.id;
    if ((currentSong?._id || currentSong?.id) === songId) {
      setIsPlaying(!isPlaying);
    } else {
      console.log(`🎵 Playing: ${song.title} by ${song.artist}`);
      setCurrentSong(song);
      setIsPlaying(true);
      
      // Update play count in MongoDB
      if (song._id) {
        try {
          await apiService.updatePlayCount(song._id);
          console.log(`📊 Updated play count for: ${song.title}`);
        } catch (error) {
          console.log('⚠️ Play count update failed:', error.message);
        }
      }
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="main-content">
      <div className="main-header">
        <div className="header-controls">
          <button className="nav-btn" disabled>
            <FaChevronLeft />
          </button>
          <button className="nav-btn" disabled>
            <FaChevronRight />
          </button>
        </div>
        <div className="header-right">
          <div className="user-menu-container">
            <button 
              className="user-menu" 
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="profile-avatar">{user?.username?.[0]?.toUpperCase() || 'U'}</div>
              {user?.username || 'User'}
              <FaChevronDown className={`dropdown-icon ${showUserMenu ? 'open' : ''}`} />
            </button>
            {showUserMenu && (
              <div className="user-dropdown">
                <button onClick={onLogout} className="logout-btn">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="content-scroll">
        <div className="greeting-section">
          <h1 className="greeting-title">{getGreeting()}</h1>
          
          <div className="quick-picks">
            {songs.slice(0, 6).map((song) => (
              <div key={song._id || song.id} className="quick-pick-item" onClick={() => handlePlayPause(song)}>
                <div className="quick-pick-image">
                  <img src={song.image} alt={song.title} />
                </div>
                <div className="quick-pick-title">{song.title}</div>
                <button className="quick-pick-play">
                  {((currentSong?._id || currentSong?.id) === (song._id || song.id)) && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Made for you</h2>
            <a href="#" className="show-all">Show all</a>
          </div>
          <div className="cards-grid">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="card" onClick={() => setSelectedAlbum(playlist.name)}>
                <div className="card-image">
                  <img src={playlist.image} alt={playlist.name} />
                  <button className="card-play-btn">
                    <FaPlay />
                  </button>
                </div>
                <div className="card-title">{playlist.name}</div>
                <div className="card-description">By Spotify</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Recently played</h2>
            <a href="#" className="show-all">Show all</a>
          </div>
          <div className="cards-grid">
            {songs.slice(6, 11).map((song) => (
              <div key={song._id || song.id} className="card" onClick={() => handlePlayPause(song)}>
                <div className="card-image">
                  <img src={song.image} alt={song.title} />
                  <button className="card-play-btn">
                    {((currentSong?._id || currentSong?.id) === (song._id || song.id)) && isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <div className="card-title">{song.title}</div>
                <div className="card-description">{song.artist}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainContent;