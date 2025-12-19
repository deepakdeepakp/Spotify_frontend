import { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { songs } from '../data/mockData';

function SearchPage({ currentSong, setCurrentSong, isPlaying, setIsPlaying }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="search-page">
      <h1 className="page-title">Search</h1>
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {searchQuery && (
        <div className="search-results">
          <h2 className="section-title">Songs</h2>
          <div className="songs-list">
            {filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className={`song-row ${currentSong?.id === song.id ? 'active' : ''}`}
                onClick={() => handlePlayPause(song)}
              >
                <span className="song-index">
                  {currentSong?.id === song.id && isPlaying ? (
                    <FaPause className="play-icon" />
                  ) : (
                    <span className="index-number">{index + 1}</span>
                  )}
                </span>
                <div className="song-title">
                  <img src={song.image} alt={song.title} />
                  <div className="song-info">
                    <span className="song-name">{song.title}</span>
                    <span className="song-artist">{song.artist}</span>
                  </div>
                </div>
                <span className="song-album">{song.album}</span>
                <span className="song-duration">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!searchQuery && (
        <div className="browse-categories">
          <h2 className="section-title">Browse all</h2>
          <div className="category-grid">
            <div className="category-card" style={{background: 'linear-gradient(135deg, #8400E7, #1DB954)'}}>
              <h3>Pop</h3>
            </div>
            <div className="category-card" style={{background: 'linear-gradient(135deg, #E22134, #FF6B35)'}}>
              <h3>Rock</h3>
            </div>
            <div className="category-card" style={{background: 'linear-gradient(135deg, #1E3264, #F99245)'}}>
              <h3>Hip Hop</h3>
            </div>
            <div className="category-card" style={{background: 'linear-gradient(135deg, #27856A, #168039)'}}>
              <h3>Jazz</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;