import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../state/AppStateContext';

export const ProfileForm = ({ onNext }) => {
  const { profile, ai, setProfile, setAI, reset, darkMode } = useApp();

  const [form, setForm] = useState({
    age: profile.age || '',
    gender: profile.gender || '',
    goal: profile.goal || 'General wellness',
    apiBase: ai.apiBase || '',
    model: ai.model || 'gpt-4o-mini',
    useProxy: ai.useProxy !== false ? 'yes' : 'no',
  });

  const [focusedField, setFocusedField] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const saveProfile = () => {
    const ageNum = Number(form.age);
    if (ageNum < 12 || ageNum > 80) {
      alert('Age must be between 12 and 80 to generate tips.');
      return false;
    }
    setProfile({ age: ageNum, gender: form.gender, goal: form.goal });
    setAI({
      ...ai,
      apiBase: form.apiBase,
      model: form.model,
      useProxy: form.useProxy === 'yes',
    });
    return true;
  };

  const generateTips = () => { if(saveProfile()) onNext(); };

  const renderField = (field) => {
    const value = form[field.key];
    const isFocused = focusedField === field.key;
    const hasValue = value !== '';

    return (
      <div
        key={field.key}
        style={{ flex: field.flex, minWidth: field.minWidth, position: 'relative', marginBottom: 20 }}
      >
        <motion.label
          animate={{
            opacity: isFocused || hasValue ? 1 : 0.7,
            y: isFocused || hasValue ? -22 : 0,
            fontSize: isFocused || hasValue ? 14 : 16,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            position: 'absolute',
            left: 12,
            top: 10,
            pointerEvents: 'none',
            color: 'var(--text-muted)',
            background: 'transparent',
            padding: '0 4px',
          }}
        >
          {field.label}
        </motion.label>

        {field.type === 'select' ? (
          <select
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            onFocus={() => setFocusedField(field.key)}
            onBlur={() => setFocusedField(null)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 10,
              border: `1px solid var(--text-muted)`,
              background: 'var(--card-bg)',
              color: 'var(--text-color)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>{opt || 'Prefer not to say'}</option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            onFocus={() => setFocusedField(field.key)}
            onBlur={() => setFocusedField(null)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 10,
              border: `1px solid var(--text-muted)`,
              background: 'var(--card-bg)',
              color: 'var(--text-color)',
              outline: 'none',
            }}
          />
        )}
      </div>
    );
  };

  const fieldsUser = [
    { key: 'age', label: 'Age', type: 'number', flex: 1, minWidth: 120 },
    { key: 'gender', label: 'Gender', type: 'select', options: ['', 'Female', 'Male', 'Non-binary', 'Other'], flex: 1, minWidth: 140 },
    { key: 'goal', label: 'Primary Goal', type: 'select', options: ['Weight management','Improve sleep','Boost energy','Build strength','Stress reduction','General wellness'], flex: 1, minWidth: 180 },
  ];

  const fieldsAI = [
    { key: 'useProxy', label: 'Use Proxy', type: 'select', options: ['yes', 'no'], flex: 1, minWidth: 120 },
    { key: 'apiBase', label: 'API Base', type: 'text', flex: 2, minWidth: 200 },
    { key: 'model', label: 'Model', type: 'text', flex: 1, minWidth: 140 },
  ];

  const isAgeValid = Number(form.age) >= 12 && Number(form.age) <= 80;

  const menuItems = [
    { key: 'profile', label: 'Profile', emoji: '📝' },
    { key: 'board', label: 'Tips Board', emoji: '📝' },
    { key: 'favs', label: 'Favorites', emoji: '⭐' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 28,
        borderRadius: 28,
        background: 'var(--card-bg)',
        boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
      }}
    >
      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer' }}
      >
        <div className={`line ${menuOpen ? 'rotate1' : ''}`} style={{ width: 28, height: 3, background: 'var(--text-color)', borderRadius: 2, transition: 'all 0.3s ease' }}></div>
        <div className={`line ${menuOpen ? 'fade' : ''}`} style={{ width: 28, height: 3, background: 'var(--text-color)', borderRadius: 2, transition: 'all 0.3s ease' }}></div>
        <div className={`line ${menuOpen ? 'rotate2' : ''}`} style={{ width: 28, height: 3, background: 'var(--text-color)', borderRadius: 2, transition: 'all 0.3s ease' }}></div>
      </div>

      {/* Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu open"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 60,
              left: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 16,
              background: 'var(--card-bg)',
              borderRadius: 16,
              zIndex: 20,
              boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => alert(`Navigate to ${item.label}`)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 12,
                  border: 'none',
                  background: 'var(--primary)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {item.emoji} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 style={{ margin: 0 }}>📝 Profile</h2>
      <p style={{ color: 'var(--text-muted)' }}>Provide age, gender, and your primary goal to personalize recommendations.</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{fieldsUser.map(renderField)}</div>

      <hr style={{ borderColor: 'var(--text-muted)', opacity: 0.2 }} />

      <h2 style={{ margin: 0 }}>🤖 AI Settings</h2>
      <p style={{ color: 'var(--text-muted)' }}>Proxy is recommended for security.</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{fieldsAI.map(renderField)}</div>

      <hr style={{ borderColor: 'var(--text-muted)', opacity: 0.2 }} />

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <motion.button
          onClick={saveProfile}
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          style={{
            flex: 1,
            padding: '12px 18px',
            borderRadius: 12,
            border: 'none',
            background: 'var(--primary)',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 15,
            boxShadow: '0 6px 16px rgba(78,115,223,0.4)',
          }}
        >
          💾 Save Profile
        </motion.button>

        <motion.button
          onClick={generateTips}
          disabled={!isAgeValid}
          whileHover={{ scale: isAgeValid ? 1.05 : 1, opacity: isAgeValid ? 0.9 : 1 }}
          style={{
            flex: 1,
            padding: '12px 18px',
            borderRadius: 12,
            border: 'none',
            background: isAgeValid ? 'var(--primary)' : '#888',
            color: '#fff',
            cursor: isAgeValid ? 'pointer' : 'not-allowed',
            fontSize: 15,
            boxShadow: isAgeValid ? '0 6px 16px rgba(78,115,223,0.4)' : 'none',
          }}
        >
          🚀 Generate Tips →
        </motion.button>

        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          style={{
            flex: 1,
            padding: '12px 18px',
            borderRadius: 12,
            border: `1px solid var(--text-muted)`,
            background: 'transparent',
            color: 'var(--text-color)',
            cursor: 'pointer',
            fontSize: 15,
          }}
        >
          🧹 Reset App
        </motion.button>
      </div>
    </motion.div>
  );
};
