import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../state/AppStateContext';
import { generateDetail } from '../services/aiService';

export const TipDetail = ({ index, onBack }) => {
  const { tips, profile, ai, addFavorite, setStatus, darkMode } = useApp();
  const tip = tips[index];

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const { detail } = await generateDetail(profile, tip, ai, setStatus);
        if (cancelled) return;
        setDetail(detail || {});
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || 'Failed to generate details.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDetail();
    return () => { cancelled = true; };
  }, [index, profile, tip, ai, setStatus]);

  const colors = {
    cardBg: darkMode ? 'rgba(30,30,40,0.95)' : '#fff',
    text: darkMode ? '#f0f0f0' : '#1e1e2f',
    muted: darkMode ? '#aaa' : '#555',
    buttonSave: '#f5b50a',
    buttonBack: darkMode ? '#555' : '#ccc',
    buttonBackText: darkMode ? '#fff' : '#000',
    divider: darkMode ? '#555' : '#ccc',
    menuBg: darkMode ? 'rgba(50,50,60,0.95)' : '#fefefe',
    glow: darkMode ? '0 4px 15px rgba(78,115,223,0.3)' : '0 2px 8px rgba(78,115,223,0.2)',
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.text }}>
      <span className="spinner" /> Generating detailed advice…
    </div>
  );

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const menuItems = [
    { key: 'save', label: '☆ Save', action: () => addFavorite(tip) },
    { key: 'back', label: '← Back', action: onBack },
  ];

  return (
    <div
      style={{
        position: 'relative',
        background: colors.cardBg,
        padding: 24,
        borderRadius: 20,
        boxShadow: darkMode
          ? '0 6px 20px rgba(0,0,0,0.7)'
          : '0 6px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 700,
        margin: '0 auto',
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
            {menuItems.map(item => (
              <button
                key={item.key}
                onClick={() => { item.action(); setMenuOpen(false); }}
                style={{
                  padding: '6px 10px',
                  borderRadius: 8,
                  border: 'none',
                  background: colors.glow,
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
      <h2 style={{ margin: 0, color: colors.text }}>
        <span>{tip?.icon || '✨'}</span> {detail?.title || 'Tip Details'}
      </h2>

      {detail?.why && <p style={{ color: colors.muted }}>{detail.why}</p>}

      {detail?.steps?.length > 0 && (
        <>
          <div style={{ borderTop: `1px solid ${colors.divider}` }} />
          <h3 style={{ margin: '8px 0', color: colors.text }}>Steps</h3>
          <ol style={{ paddingLeft: 20 }}>
            {detail.steps.map((s, i) => (
              <li key={i} style={{ color: colors.text }}>{s}</li>
            ))}
          </ol>
        </>
      )}

      <p style={{ fontSize: '0.9rem', color: colors.muted }}>
        <strong>Time:</strong> {detail?.time_commitment || '5–15 minutes/day'}<br />
        <strong>Safety:</strong> {detail?.safety_note || 'If pain or discomfort occurs, stop and consult a professional.'}
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => addFavorite(tip)}
          style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: colors.buttonSave,
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          ☆ Save
        </button>

        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: colors.buttonBack,
            color: colors.buttonBackText,
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          ← Back to tips
        </button>
      </div>
    </div>
  );
};
