import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const AppStateCtx = createContext(null);
const STORAGE_KEY = 'wellness_state_v2';

export const AppProvider = ({ children }) => {
  // -------------------
  // State
  // -------------------
  const [profile, setProfileState] = useState({ goal: 'General wellness' });
  const [tips, setTipsState] = useState([]);
  const [favorites, setFavoritesState] = useState([]);
  const [ai, setAIState] = useState({ model: 'gpt-4o-mini', useProxy: true });
  const [status, setStatus] = useState('Idle');

  // -------------------
  // Hydrate from localStorage
  // -------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (parsed.profile) setProfileState(parsed.profile);
      if (parsed.tips) setTipsState(parsed.tips);
      if (parsed.favorites) setFavoritesState(parsed.favorites);
      if (parsed.ai) setAIState({ ...parsed.ai, apiKey: undefined }); // Never restore API key
    } catch (err) {
      console.warn('Failed to hydrate app state:', err);
    }
  }, []);

  // -------------------
  // Persist state to localStorage
  // -------------------
  const persist = useCallback(
    (patch = {}) => {
      try {
        const next = { profile, tips, favorites, ai, ...patch };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn('Failed to persist app state:', err);
      }
    },
    [profile, tips, favorites, ai]
  );

  // -------------------
  // Setters with persistence
  // -------------------
  const setProfile = useCallback(
    (p) => {
      setProfileState(p);
      persist({ profile: p });
    },
    [persist]
  );

  const setAI = useCallback(
    (cfg) => {
      setAIState(cfg);
      persist({ ai: cfg });
    },
    [persist]
  );

  const setTips = useCallback(
    (newTips) => {
      setTipsState(newTips);
      persist({ tips: newTips });
    },
    [persist]
  );

  const addFavorite = useCallback(
    (tip) => {
      setFavoritesState((prev) => {
        if (prev.find((x) => x.title === tip.title)) return prev;
        const next = [...prev, tip];
        persist({ favorites: next });
        return next;
      });
    },
    [persist]
  );

  const removeFavorite = useCallback(
    (title) => {
      setFavoritesState((prev) => {
        const next = prev.filter((x) => x.title !== title);
        persist({ favorites: next });
        return next;
      });
    },
    [persist]
  );

  const reset = useCallback((fullReset = false) => {
    setProfileState({ goal: 'General wellness' });
    setTipsState([]);
    setFavoritesState([]);
    setAIState({ model: 'gpt-4o-mini', useProxy: true });
    setStatus('Idle');
    if (fullReset) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  }, []);

  // -------------------
  // Memoized context
  // -------------------
  const value = useMemo(
    () => ({
      profile,
      tips,
      favorites,
      ai,
      status,
      setProfile,
      setAI,
      setTips,
      addFavorite,
      removeFavorite,
      setStatus,
      reset
    }),
    [profile, tips, favorites, ai, status, setProfile, setAI, setTips, addFavorite, removeFavorite, reset]
  );

  return <AppStateCtx.Provider value={value}>{children}</AppStateCtx.Provider>;
};

// -------------------
// Hook to consume context
// -------------------
export const useApp = () => {
  const ctx = useContext(AppStateCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
