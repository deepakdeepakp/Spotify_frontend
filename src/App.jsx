import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SearchPage from './components/SearchPage';
import LibraryPage from './components/LibraryPage';
import AlbumPage from './components/AlbumPage';
import Player from './components/Player';
import Login from './components/Login';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const renderCurrentPage = () => {
    if (selectedAlbum) {
      return <AlbumPage albumName={selectedAlbum} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
    }
    
    switch(currentPage) {
      case 'search':
        return <SearchPage currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setSelectedAlbum={setSelectedAlbum} />;
      case 'library':
        return <LibraryPage />;
      default:
        return <MainContent currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setSelectedAlbum={setSelectedAlbum} user={user} onLogout={handleLogout} setPlaylist={setPlaylist} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        setSelectedAlbum={setSelectedAlbum}
        user={user}
        onLogout={handleLogout}
      />
      {renderCurrentPage()}
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        playlist={playlist}
      />
    </div>
  );
}

export default App;