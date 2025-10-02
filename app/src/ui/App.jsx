import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useApp } from '../state/AppStateContext';
import { ProfileForm } from './ProfileForm';
import { TipsBoard } from './TipsBoard';
import { TipDetail } from './TipDetail';
import { Favorites } from './Favorites';
import './global.css';

const Card = ({ children, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    style={{
      background: darkMode ? '#1e1e2f' : '#fff',
      color: darkMode ? '#f0f0f0' : '#1e1e2f',
      borderRadius: 16,
      padding: 20,
      boxShadow: darkMode
        ? '0 8px 20px rgba(0,0,0,0.7)'
        : '0 8px 20px rgba(0,0,0,0.1)',
    }}
  >
    {children}
  </motion.div>
);

export const App = () => {
  const { status } = useApp();
  const [screen, setScreen] = useState('profile');
  const [detailIndex, setDetailIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // -------------------
  // Delayed content fade-in
  // -------------------
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // -------------------
  // Body class for dark/light mode
  // -------------------
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  // -------------------
  // Auto-play audio after content shown
  // -------------------
  useEffect(() => {
    if (showContent && audioRef.current) {
      const t = setTimeout(() => {
        audioRef.current.play().catch(() => {});
        setAudioPlaying(true);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [showContent]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setAudioPlaying(!audioPlaying);
  };

  const goDetail = (idx) => {
    setDetailIndex(idx);
    setScreen('detail');
    setMenuOpen(false);
  };

  // -------------------
  // Screen components
  // -------------------
  const screens = {
    profile: <ProfileForm onNext={() => setScreen('board')} />,
    board: <TipsBoard onOpenDetail={goDetail} />,
    detail: <TipDetail index={detailIndex ?? 0} onBack={() => setScreen('board')} />,
    favs: <Favorites />,
  };

  const menuItems = [
    { key: 'profile', label: 'Profile', emoji: '👤' },
    { key: 'board', label: 'Tips Board', emoji: '📝' },
    { key: 'favs', label: 'Favorites', emoji: '⭐' },
  ];

  return (
    <div className="container">
      {/* Confetti intro */}
      {!showContent && <Confetti numberOfPieces={200} recycle={false} />}

      {/* Hamburger menu */}
      {showContent && (
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`line ${menuOpen ? 'rotate1' : ''}`}></div>
          <div className={`line ${menuOpen ? 'fade' : ''}`}></div>
          <div className={`line ${menuOpen ? 'rotate2' : ''}`}></div>
        </div>
      )}

      {/* Dark/Light toggle */}
      {showContent && (
        <div
          className="toggle-darklight"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '🌞' : '🌙'}
        </div>
      )}

      {/* Hamburger Menu Items */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu open"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setScreen(item.key)}
                className={`menu-btn ${screen === item.key ? 'active' : ''}`}
              >
                {item.emoji} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main>
        <AnimatePresence>
          {showContent && (
            <Card key={screen} darkMode={darkMode}>
              {screens[screen]}
            </Card>
          )}
        </AnimatePresence>

        {/* Status overlay */}
        {showContent && screen === 'board' && status !== 'Idle' && (
          <motion.div
            className="status-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            🔄 {status}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">&copy; 2025 Wellness App</footer>

      {/* Audio */}
      <audio ref={audioRef} src="/audio/relax.mp3" loop />
      {showContent && (
        <button
          className="toggle-audio"
          onClick={toggleAudio}
          title={audioPlaying ? 'Mute' : 'Play'}
        >
          {audioPlaying ? '🔇' : '🎵'}
        </button>
      )}
    </div>
  );
};
