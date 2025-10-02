import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../state/AppStateContext';
import { TipCard } from './TipCard';
import { generateShortTips } from '../services/aiService';

export const TipsBoard = ({ onOpenDetail }) => {
  const { tips, setTips, profile, ai, addFavorite, status, setStatus, darkMode } = useApp();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('');
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const doGenerate = async () => {
    setStatus('Generating…');
    try {
      const { tips: newTips, prompt } = await generateShortTips(profile, ai, setStatus);
      setTips(newTips);
      setLastPrompt(prompt);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!tips.length) void doGenerate();
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const colors = {
    text: darkMode ? '#f0f0f0' : '#1e1e2f',
    muted: darkMode ? '#aaa' : '#555',
    buttonPrimary: '#4e73df',
    buttonGhostBorder: darkMode ? '#666' : '#ccc',
    promptBg: darkMode ? '#2a2a3a' : '#cce7ff',
    promptText: darkMode ? '#f0f0f0' : '#001f3f',
    cardBg: darkMode ? 'rgba(30,30,40,0.95)' : '#fff',
    glow: darkMode ? '0 4px 15px rgba(78,115,223,0.3)' : '0 2px 8px rgba(78,115,223,0.2)',
  };

  const menuItems = [
    { key: 'regenerate', label: '🔄 Regenerate All', action: doGenerate },
    { key: 'saveAll', label: '☆ Save All', action: () => tips.forEach(t => addFavorite(t)) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: colors.cardBg,
        padding: 24,
        borderRadius: 20,
        boxShadow: darkMode
          ? '0 6px 20px rgba(0,0,0,0.7)'
          : '0 6px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
      }}
    >
      {/* Hamburger */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 24,
            height: 2,
            background: colors.text,
            borderRadius: 2,
            transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none',
            transition: 'all 0.3s ease',
          }}
        />
        <div
          style={{
            width: 24,
            height: 2,
            background: colors.text,
            borderRadius: 2,
            opacity: menuOpen ? 0 : 1,
            transition: 'all 0.3s ease',
          }}
        />
        <div
          style={{
            width: 24,
            height: 2,
            background: colors.text,
            borderRadius: 2,
            transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
            transition: 'all 0.3s ease',
          }}
        />
      </div>

      {/* Hamburger Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 44,
              right: 16,
              background: colors.cardBg,
              borderRadius: 12,
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 20,
            }}
          >
            {menuItems.map(item => (
              <button
                key={item.key}
                onClick={() => { item.action(); setMenuOpen(false); }}
                style={{
                  padding: '6px 10px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: colors.glow,
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <h2 style={{ margin: 0, color: colors.text }}>📌 Personalized Tips</h2>
        <span
          style={{
            background: darkMode ? '#444' : '#eee',
            padding: '4px 10px',
            borderRadius: 12,
            fontSize: 12,
            color: colors.text,
          }}
        >
          🔄 {status}
        </span>
      </div>

      <p style={{ fontSize: 14, color: colors.muted }}>
        Tap a card to see details. Use the menu or "Regenerate All" for fresh results.
      </p>

      {/* Prompt Display */}
      {showPrompt && (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            padding: 12,
            borderRadius: 8,
            backgroundColor: colors.promptBg,
            color: colors.promptText,
            overflowX: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {lastPrompt || '(Generate once to preview prompt)'}
        </pre>
      )}

      {/* Tips Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {tips.map((t, idx) => (
          <TipCard
            key={idx}
            tip={t}
            onOpen={() => onOpenDetail(idx)}
            onSave={() => addFavorite(t)}
          />
        ))}
      </div>
    </motion.div>
  );
};
