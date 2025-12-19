import { FaPlay, FaHeart, FaMusic, FaUser } from 'react-icons/fa';
import { playlists } from '../data/mockData';

function LibraryPage() {
  return (
    <div className="library-page">
      <div className="library-header">
        <h1 className="page-title">Your Library</h1>
        <div className="library-filters">
          <button className="filter-btn active">Recently played</button>
          <button className="filter-btn">Recently added</button>
          <button className="filter-btn">Alphabetical</button>
        </div>
      </div>

      <div className="library-content">
        <div className="library-item liked-songs">
          <div className="library-item-image">
            <FaHeart className="liked-icon" />
          </div>
          <div className="library-item-info">
            <h3>Liked Songs</h3>
            <p>25 liked songs</p>
          </div>
        </div>

        {playlists.map((playlist) => (
          <div key={playlist.id} className="library-item">
            <div className="library-item-image">
              <img src={playlist.image} alt={playlist.name} />
            </div>
            <div className="library-item-info">
              <h3>{playlist.name}</h3>
              <p>Playlist • {playlist.songs} songs</p>
            </div>
          </div>
        ))}

        <div className="library-item">
          <div className="library-item-image">
            <FaMusic className="playlist-icon" />
          </div>
          <div className="library-item-info">
            <h3>Downloaded</h3>
            <p>12 songs</p>
          </div>
        </div>

        <div className="library-item">
          <div className="library-item-image">
            <FaUser className="artist-icon" />
          </div>
          <div className="library-item-info">
            <h3>Following</h3>
            <p>8 artists</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;