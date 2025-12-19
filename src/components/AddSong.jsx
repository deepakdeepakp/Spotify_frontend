import { useState } from 'react';
import apiService from '../services/api';

function AddSong({ onSongAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    image: '',
    audioUrl: '',
    genre: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://spotify-backend-lsbe.onrender.com/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          playCount: 0
        })
      });
      
      if (response.ok) {
        const newSong = await response.json();
        alert('Song added successfully!');
        setFormData({
          title: '',
          artist: '',
          album: '',
          duration: '',
          image: '',
          audioUrl: '',
          genre: ''
        });
        if (onSongAdded) onSongAdded(newSong);
      } else {
        alert('Failed to add song');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ padding: '20px', background: '#121212', color: 'white', borderRadius: '8px', margin: '20px' }}>
      <h2>Add New Song</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input
          type="text"
          name="title"
          placeholder="Song Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist Name"
          value={formData.artist}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <input
          type="text"
          name="album"
          placeholder="Album Name"
          value={formData.album}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 3:45)"
          value={formData.duration}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <input
          type="url"
          name="audioUrl"
          placeholder="Audio File URL (MP3)"
          value={formData.audioUrl}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px', 
            background: '#1db954', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Adding...' : 'Add Song'}
        </button>
      </form>
    </div>
  );
}

export default AddSong;