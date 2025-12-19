import { useState, useEffect, useRef } from 'react';
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeOff,
  FaRandom,
  FaRedo,
  FaHeart,
  FaRegHeart,
  FaExpand,
  FaList
} from 'react-icons/fa';
function Player({ currentSong, setCurrentSong, isPlaying, setIsPlaying, playlist = [] }) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100 || 0);
    }
  };

  const handleEnded = () => {
    if (repeatMode === 2) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      handleNext();
    }
  };

  const handlePrevious = () => {
    if (!playlist.length) return;
    const currentIndex = playlist.findIndex((s) => (s._id || s.id) === (currentSong?._id || currentSong?.id));
    if (currentIndex > 0) {
      setCurrentSong(playlist[currentIndex - 1]);
    } else if (repeatMode === 1) {
      setCurrentSong(playlist[playlist.length - 1]);
    }
  };

  const handleNext = () => {
    if (!playlist.length) return;
    const currentIndex = playlist.findIndex((s) => (s._id || s.id) === (currentSong?._id || currentSong?.id));
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentSong(playlist[randomIndex]);
    } else if (currentIndex < playlist.length - 1) {
      setCurrentSong(playlist[currentIndex + 1]);
    } else if (repeatMode === 1) {
      setCurrentSong(playlist[0]);
    } else {
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current) {
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return (
      <div className="player empty">
        Select a song to play
      </div>
    );
  }

  return (
    <div className="player">
      <audio
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="metadata"
      />
      
      <div className="player-left">
        <img src={currentSong.image} alt={currentSong.title} />
        <div className="player-song-info">
          <div className="player-song-title">{currentSong.title}</div>
          <div className="player-song-artist">{currentSong.artist}</div>
        </div>
        <button className="like-btn">
          <FaRegHeart />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button
            className={`control-btn ${isShuffle ? 'active' : ''}`}
            onClick={() => setIsShuffle(!isShuffle)}
            title="Enable shuffle"
          >
            <FaRandom />
          </button>
          <button className="control-btn" onClick={handlePrevious} title="Previous">
            <FaStepBackward />
          </button>
          <button
            className="play-pause-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="control-btn" onClick={handleNext} title="Next">
            <FaStepForward />
          </button>
          <button
            className={`control-btn ${repeatMode > 0 ? 'active' : ''}`}
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
            title="Enable repeat"
          >
            <FaRedo />
          </button>
        </div>
        <div className="progress-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <button className="player-extra-btn" title="Now playing view">
          <FaList />
        </button>
        <button className="volume-btn" title="Mute">
          {volume > 0 ? <FaVolumeUp /> : <FaVolumeOff />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="volume-bar"
        />
        <button className="player-extra-btn" title="Full screen">
          <FaExpand />
        </button>
      </div>
    </div>
  );
}

export default Player;