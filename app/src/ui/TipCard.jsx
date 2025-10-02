import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../state/AppStateContext';

export const TipCard = ({ tip, onOpen, onSave, saved = false }) => {
  const { darkMode } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const colors = {
    text: darkMode ? '#f0f0f0' : '#1e1e2f',
    heading: darkMode ? '#fff' : '#1e1e2f',
    badgeBg: darkMode
      ? 'linear-gradient(135deg, #4e73df, #1cc88a)'
      : '#e0e0e0',
    primary: '#4e73df',
    saved: '#f5b50a',
    glow: darkMode
      ? '0 4px 15px rgba(78,115,223,0.3)'
      : '0 2px 8px rgba(78,115,223,0.2)',
    cardBg: darkMode ? 'rgba(30,30,40,0.9)' : '#fff',
    menuBg: darkMode ? 'rgba(50,50,60,0.95)' : '#fefefe',
  };

  const menuItems = [
    { key: 'view', label: 'View Tip', action: onOpen },
    { key: 'save', label: saved ? 'Unsave Tip' : 'Save Tip', action: onSave },
  ];

  return (
    <div
      style={{
        position: 'relative',
        background: colors.cardBg,
        padding: 12,
        borderRadius: 20,
        boxShadow: darkMode
          ? '0 6px 20px rgba(0,0,0,0.7)'
          : '0 6px 20px rgba(0,0,0,0.1)',
        marginBottom: 16,
      }}
    >
      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <div
          className={`line ${menuOpen ? 'rotate1' : ''}`}
          style={{
            width: 24,
            height: 2,
            background: colors.text,
            borderRadius: 2,
            transition: 'all 0.3s ease',
          }}
        />
        <div
          className={`line ${menuOpen ? 'fade' : ''}`}
          style={{
            width: 24,
            height: 2,
            background: colors.text,
            borderRadius: 2,
            transition: 'all 0.3s ease',
          }}
        />
        <div
          className={`line ${menuOpen ? 'rotate2' : ''}`}
          style={{
            width: 24,
            height: 2,
            background: colors.text,
            borderRadius: 2,
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
              top: 36,
              right: 12,
              background: colors.menuBg,
              borderRadius: 12,
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 20,
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { item.action(); setMenuOpen(false); }}
                style={{
                  padding: '6px 10px',
                  borderRadius: 8,
                  border: 'none',
                  background: colors.primary,
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

      {/* Card Content */}
      <motion.div
        whileHover={{
          scale: 1.03,
          boxShadow: darkMode
            ? '0 10px 30px rgba(0,0,0,0.7)'
            : '0 6px 20px rgba(0,0,0,0.15)',
        }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: 16,
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 160,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onClick={(e) => {
          if (!['BUTTON', 'SPAN'].includes(e.target.tagName)) onOpen();
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, fontSize: 16 }}>
          <motion.span
            style={{ color: saved ? colors.saved : colors.text }}
            animate={{ rotate: saved ? [0, 15, -15, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {saved ? '★' : '✨'}
          </motion.span>
          <span>{tip.icon || '✨'}</span>
          <span style={{ color: colors.heading, fontWeight: 600 }}>{tip.title}</span>
        </div>

        <div style={{ flexGrow: 1 }} />

        {/* Badge */}
        <div
          style={{
            alignSelf: 'flex-start',
            background: colors.badgeBg,
            color: '#fff',
            borderRadius: 12,
            padding: '4px 10px',
            fontSize: 12,
            fontWeight: 500,
            boxShadow: colors.glow,
          }}
        >
          {tip.category || 'Wellness'}
        </div>
      </motion.div>
    </div>
  );
};
