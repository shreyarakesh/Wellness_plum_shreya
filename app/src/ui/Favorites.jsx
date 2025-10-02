import React from 'react';
import { useApp } from '../state/AppStateContext';
import { motion } from 'framer-motion';

export const Favorites = () => {
  const { favorites, removeFavorite } = useApp();

  if (!favorites.length) {
    return (
      <p
        style={{
          fontStyle: 'italic',
          marginTop: 32,
          color: '#555',
          textAlign: 'center',
          fontSize: 16,
        }}
      >
        No favorites saved yet. 🌿
      </p>
    );
  }

  const colors = {
    cardBg: '#fff', // always white for clarity
    text: '#1e1e2f',
    badgeBg: '#4e73df',
    removeBtn: '#ff6b6b',
    shadow: '0 12px 24px rgba(0,0,0,0.08)',
    starGlow: '0 0 12px #f5b50a, 0 0 20px #f5b50a33',
  };

  return (
    <div style={{ padding: '24px 16px' }}>
      <h2
        style={{
          marginBottom: 32,
          textAlign: 'center',
          color: colors.text,
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        ⭐ Your Saved Favorites
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 24,
        }}
      >
        {favorites.map((tip, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            style={{
              padding: 20,
              borderRadius: 20,
              boxShadow: colors.shadow,
              backgroundColor: colors.cardBg,
              color: colors.text,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Image */}
            {tip.image && (
              <img
                src={tip.image}
                alt={tip.title}
                style={{
                  borderRadius: 16,
                  marginBottom: 16,
                  objectFit: 'cover',
                  height: 140,
                  width: '100%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              />
            )}

            {/* Title */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 500,
                flexWrap: 'wrap',
                fontSize: 16,
              }}
            >
              <motion.span
                style={{ color: '#f5b50a', textShadow: colors.starGlow }}
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ★
              </motion.span>
              <span>{tip.icon || '✨'}</span>
              <span>{tip.title}</span>
            </div>

            {/* Category Badge */}
            <div
              style={{
                background: colors.badgeBg,
                color: '#fff',
                borderRadius: 12,
                padding: '4px 10px',
                fontSize: 12,
                marginTop: 12,
                width: 'fit-content',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              {tip.category || 'Wellness'}
            </div>

            {/* Remove Button */}
            <motion.button
              onClick={() => removeFavorite(tip.title)}
              whileHover={{ scale: 1.05, opacity: 0.9 }}
              style={{
                marginTop: 16,
                alignSelf: 'flex-end',
                backgroundColor: colors.removeBtn,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '6px 14px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
            >
              Remove
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
