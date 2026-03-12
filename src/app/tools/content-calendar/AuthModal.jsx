'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { HiX, HiMail, HiLockClosed, HiUser, HiArrowRight, HiShieldCheck } from 'react-icons/hi';

export default function AuthModal({ onClose, onSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error) {
        setError('Invalid email or password');
      } else {
        onSuccess?.();
        onClose();
      }
    } catch {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }
      // Auto-login after registration
      const loginRes = await signIn('credentials', { email, password, redirect: false });
      if (loginRes?.error) {
        setError('Account created but login failed. Please try logging in.');
      } else {
        onSuccess?.();
        onClose();
      }
    } catch {
      setError('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md rounded-2xl border border-gray-800 bg-background p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-foreground rounded-lg hover:bg-surface transition-all"><HiX size={18} /></button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
            <HiShieldCheck className="text-background" size={28} />
          </div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'login' ? 'Sign in to access premium features' : 'Join to unlock whitelabel, team collab & AI'}
          </p>
        </div>

        {/* Features list */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            'Whitelabel Calendars',
            'Team Collaboration',
            'AI Content Suggestions',
            'Calendar Sync (ICS)',
            'Cloud Save & Sync',
            'Entry Comments',
          ].map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <div className="w-1 h-1 rounded-full bg-cyan" />
              {f}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground text-sm placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-all" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
            <div className="relative">
              <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground text-sm placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
            <div className="relative">
              <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                placeholder={mode === 'register' ? 'Min 6 characters' : 'Your password'}
                minLength={mode === 'register' ? 6 : undefined}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground text-sm placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-all" />
            </div>
          </div>

          {error && (
            <div className="text-sm text-pink bg-pink/10 border border-pink/20 rounded-xl px-4 py-2.5">{error}</div>
          )}

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50">
            {loading ? (
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            ) : (
              <>{mode === 'login' ? 'Sign In' : 'Create Account'} <HiArrowRight size={14} /></>
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-6 text-sm text-gray-500">
          {mode === 'login' ? (
            <>Don&apos;t have an account?{' '}<button onClick={() => { setMode('register'); setError(''); }} className="text-cyan hover:text-cyan/80 font-medium transition-colors">Sign up</button></>
          ) : (
            <>Already have an account?{' '}<button onClick={() => { setMode('login'); setError(''); }} className="text-cyan hover:text-cyan/80 font-medium transition-colors">Sign in</button></>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
