import { useState, useEffect, useCallback } from 'react';

let toastFn = null;

export function showToast(message, type = 'success') {
  if (toastFn) toastFn(message, type);
}

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  useEffect(() => {
    toastFn = addToast;
    return () => { toastFn = null; };
  }, [addToast]);

  return (
    <div style={{
      position: 'fixed', top: '80px', right: '24px',
      zIndex: 99999, display: 'flex', flexDirection: 'column', gap: '10px',
      pointerEvents: 'none',
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '14px 20px', borderRadius: '14px', fontSize: '14px',
          fontWeight: 600, minWidth: '280px', maxWidth: '380px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.14)', background: 'white',
          border: `1.5px solid ${t.type === 'success' ? 'rgba(29,185,84,0.3)' : t.type === 'error' ? 'rgba(255,77,46,0.3)' : 'rgba(79,172,254,0.3)'}`,
          pointerEvents: 'all',
        }}>
          <span style={{ fontSize: '18px' }}>
            {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          <span style={{ flex: 1 }}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}