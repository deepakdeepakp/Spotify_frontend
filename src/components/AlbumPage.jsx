import { FaPlay, FaPause, FaHeart, FaEllipsisH } from 'react-icons/fa';
import { songs } from '../data/mockData';

function AlbumPage({ albumName, currentSong, setCurrentSong, isPlaying, setIsPlaying }) {
  const albumSongs = songs.filter(song => song.album === albumName);
  
  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  if (albumSongs.length === 0) {
    return (
      <div className="album-page">
        <h1 className="page-title">Album not found</h1>
      </div>
    );
  }

  const albumImage = albumSongs[0].image;
  const albumArtist = albumSongs[0].artist;

  return (
    <div className="album-page">
      <div className="album-header">
        <div className="album-cover">
          <img src={albumImage} alt={albumName} />
        </div>
        <div className="album-info">
          <span className="album-type">ALBUM</span>
          <h1 className="album-title">{albumName}</h1>
          <p className="album-artist">{albumArtist}</p>
          <p className="album-details">{albumSongs.length} songs</p>
        </div>
      </div>

      <div className="album-controls">
        <button className="play-all-btn" onClick={() => handlePlayPause(albumSongs[0])}>
          {currentSong && albumSongs.some(s => s.id === currentSong.id) && isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>
        <button className="like-album-btn">
          <FaHeart />
        </button>
        <button className="more-options-btn">
          <FaEllipsisH />
        </button>
      </div>

      <div className="album-songs">
        <div className="songs-header">
          <span className="song-index">#</span>
          <span className="song-title">Title</span>
          <span className="song-duration">Duration</span>
        </div>
        {albumSongs.map((song, index) => (
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
              <div className="song-info">
                <span className="song-name">{song.title}</span>
                <span className="song-artist">{song.artist}</span>
              </div>
            </div>
            <div className="song-duration">
              <span>{song.duration}</span>
              <div className="song-actions">
                <button>
                  <FaHeart />
                </button>
                <button>
                  <FaEllipsisH />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumPage;