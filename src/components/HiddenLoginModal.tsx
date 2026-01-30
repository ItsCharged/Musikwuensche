import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function HiddenLoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '6') {
        if (!timerRef.current && !isOpen) {
          timerRef.current = window.setTimeout(() => {
            setIsOpen(true);
          }, 2000); // 2 seconds
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === '6') {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === 'BT_2025!') {
      sessionStorage.setItem('dj_auth', 'true');
      setIsOpen(false);
      setCode('');
      setError(false);
      navigate('/dj-dashboard');
    } else {
      setError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">DJ Access</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access Code"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">Falscher Code!</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
