import { FaHome, FaSearch, FaBook, FaPlus, FaHeart } from 'react-icons/fa';

function Sidebar({ currentPage, setCurrentPage, setSelectedAlbum }) {
  const libraryItems = [
    { id: 1, name: 'Liked Songs', type: 'Playlist', image: 'https://misc.scdn.co/liked-songs/liked-songs-300.png' },
    { id: 2, name: 'My Playlist #1', type: 'Playlist', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=48&h=48&fit=crop' },
    { id: 3, name: 'Discover Weekly', type: 'Playlist', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=48&h=48&fit=crop' },
    { id: 4, name: 'Release Radar', type: 'Playlist', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=48&h=48&fit=crop' },
    { id: 5, name: 'Daily Mix 1', type: 'Playlist', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=48&h=48&fit=crop' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        Spotify
      </div>
      
      <nav>
        <ul className="sidebar-nav">
          <li>
            <a 
              href="#" 
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('home');
                setSelectedAlbum(null);
              }}
            >
              <FaHome />
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'search' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('search');
                setSelectedAlbum(null);
              }}
            >
              <FaSearch />
              Search
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'library' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('library');
                setSelectedAlbum(null);
              }}
            >
              <FaBook />
              Your Library
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-divider"></div>

      <div className="sidebar-library">
        <div className="library-header">
          <span className="library-title">Your Library</span>
          <div className="library-actions">
            <button title="Create Playlist">
              <FaPlus />
            </button>
          </div>
        </div>
        
        <ul className="library-list">
          {libraryItems.map((item) => (
            <li 
              key={item.id} 
              className="library-item"
              onClick={() => setSelectedAlbum(item.name)}
            >
              <div className="library-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="library-item-info">
                <div className="library-item-name">{item.name}</div>
                <div className="library-item-meta">
                  {item.id === 1 && <FaHeart style={{color: '#1db954'}} />}
                  <span>{item.type}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;