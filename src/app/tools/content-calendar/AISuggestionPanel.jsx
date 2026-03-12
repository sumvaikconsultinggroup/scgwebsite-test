'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiX, HiLightningBolt, HiArrowRight, HiClipboardCopy, HiCheck } from 'react-icons/hi';
import { platforms, themes, contentTypes } from './calendarData';

export default function AISuggestionPanel({ onClose, onApply, brandName, selectedPlatforms }) {
  const [platform, setPlatform] = useState(selectedPlatforms?.[0] || 'instagram');
  const [theme, setTheme] = useState('');
  const [contentType, setContentType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setError('');
    setLoading(true);
    setSuggestion(null);
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          platform,
          contentType,
          theme,
          description,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'AI suggestion failed');
      } else {
        setSuggestion(data.suggestion);
      }
    } catch {
      setError('Failed to get AI suggestion. Please try again.');
    }
    setLoading(false);
  };

  const copyCaption = () => {
    if (suggestion?.caption) {
      navigator.clipboard.writeText(suggestion.caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg rounded-2xl border border-gray-800 bg-background p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-pink flex items-center justify-center">
              <HiLightningBolt className="text-white" size={16} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-foreground">AI Content Suggestions</h3>
              <p className="text-[10px] text-gray-600">Powered by Claude</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-foreground rounded-lg hover:bg-surface transition-all"><HiX size={18} /></button>
        </div>

        <div className="space-y-4">
          {/* Platform */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Platform</label>
            <div className="flex flex-wrap gap-2">
              {platforms.filter((p) => selectedPlatforms?.includes(p.id) || !selectedPlatforms).map((p) => {
                const Icon = p.icon;
                return (
                  <button key={p.id} onClick={() => setPlatform(p.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${platform === p.id ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}>
                    <Icon style={{ color: platform === p.id ? p.color : undefined }} size={14} /> {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Theme (optional)</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface border border-gray-800 rounded-lg text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all">
              <option value="">Any theme</option>
              {themes.map((t) => <option key={t.id} value={t.name}>{t.emoji} {t.name}</option>)}
            </select>
          </div>

          {/* Content type */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Content Type (optional)</label>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setContentType('')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${!contentType ? 'border-purple/50 bg-purple/10 text-purple' : 'border-gray-800 text-gray-500'}`}>
                Any
              </button>
              {contentTypes.map((ct) => (
                <button key={ct.id} onClick={() => setContentType(ct.label)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${contentType === ct.label ? 'text-white' : 'border-gray-800 text-gray-500'}`}
                  style={contentType === ct.label ? { borderColor: ct.color + '80', backgroundColor: ct.color + '20', color: ct.color } : {}}>
                  {ct.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Additional Context (optional)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
              placeholder="Describe what you want to post about..."
              className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground text-sm placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-all resize-none" />
          </div>

          {/* Generate button */}
          <button onClick={generate} disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-purple to-pink text-white rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all disabled:opacity-50">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <><HiLightningBolt size={16} /> Generate with AI</>
            )}
          </button>

          {error && <div className="text-sm text-pink bg-pink/10 border border-pink/20 rounded-xl px-4 py-2.5">{error}</div>}

          {/* Result */}
          {suggestion && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-purple/30 bg-purple/5 p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-purple font-bold uppercase tracking-wider">Caption</span>
                  <button onClick={copyCaption} className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-cyan transition-colors">
                    {copied ? <><HiCheck size={10} /> Copied</> : <><HiClipboardCopy size={10} /> Copy</>}
                  </button>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{suggestion.caption}</p>
              </div>

              {suggestion.hashtags?.length > 0 && (
                <div>
                  <span className="text-[10px] text-purple font-bold uppercase tracking-wider">Hashtags</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {suggestion.hashtags.map((h, i) => (
                      <span key={i} className="text-[10px] text-cyan/80 bg-cyan/5 px-2 py-0.5 rounded-full">{h}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {suggestion.bestTime && (
                  <div>
                    <span className="text-[10px] text-purple font-bold uppercase tracking-wider">Best Time</span>
                    <p className="text-xs text-gray-300 mt-0.5">{suggestion.bestTime}</p>
                  </div>
                )}
                {suggestion.contentType && (
                  <div>
                    <span className="text-[10px] text-purple font-bold uppercase tracking-wider">Format</span>
                    <p className="text-xs text-gray-300 mt-0.5 capitalize">{suggestion.contentType}</p>
                  </div>
                )}
              </div>

              {suggestion.tip && (
                <div>
                  <span className="text-[10px] text-purple font-bold uppercase tracking-wider">Tip</span>
                  <p className="text-xs text-gray-400 mt-0.5">{suggestion.tip}</p>
                </div>
              )}

              {/* Apply button */}
              <button onClick={() => {
                onApply?.({
                  caption: suggestion.caption,
                  hashtags: suggestion.hashtags || [],
                  time: suggestion.bestTime || '',
                  type: suggestion.contentType || 'post',
                  platform,
                });
                onClose();
              }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-purple border border-purple/30 rounded-lg hover:bg-purple/10 transition-all">
                <HiArrowRight size={14} /> Add to Calendar
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
