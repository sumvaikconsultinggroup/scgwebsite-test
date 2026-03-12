'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';
import { HiArrowRight, HiArrowLeft, HiDownload, HiRefresh, HiPencil, HiTrash, HiPlus } from 'react-icons/hi';
import { FaInstagram, FaTiktok, FaTwitter, FaLinkedinIn, FaFacebook, FaYoutube } from 'react-icons/fa';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E1306C' },
  { id: 'tiktok', name: 'TikTok', icon: FaTiktok, color: '#00f2ea' },
  { id: 'twitter', name: 'Twitter/X', icon: FaTwitter, color: '#1DA1F2' },
  { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedinIn, color: '#0077B5' },
  { id: 'facebook', name: 'Facebook', icon: FaFacebook, color: '#4267B2' },
  { id: 'youtube', name: 'YouTube', icon: FaYoutube, color: '#FF0000' },
];

const themes = [
  { id: 'product-launch', name: 'Product Launch', emoji: '🚀' },
  { id: 'brand-awareness', name: 'Brand Awareness', emoji: '💡' },
  { id: 'engagement', name: 'Engagement', emoji: '💬' },
  { id: 'educational', name: 'Educational', emoji: '📚' },
  { id: 'seasonal', name: 'Seasonal/Trending', emoji: '🔥' },
  { id: 'behind-scenes', name: 'Behind the Scenes', emoji: '🎬' },
];

const contentTemplates = {
  'product-launch': [
    { type: 'Reel', caption: 'Teaser: Something big is coming...', platforms: ['instagram', 'tiktok'] },
    { type: 'Post', caption: 'Behind the scenes of our latest creation', platforms: ['instagram', 'linkedin'] },
    { type: 'Story', caption: 'Launch day countdown!', platforms: ['instagram', 'facebook'] },
    { type: 'Video', caption: 'Official product reveal & first look', platforms: ['youtube', 'tiktok'] },
    { type: 'Carousel', caption: 'Top 5 features you need to know', platforms: ['instagram', 'linkedin'] },
    { type: 'Post', caption: 'Customer first reactions compilation', platforms: ['twitter', 'facebook'] },
  ],
  'brand-awareness': [
    { type: 'Post', caption: 'Our story: how it all began', platforms: ['instagram', 'linkedin'] },
    { type: 'Reel', caption: 'Meet the team behind the brand', platforms: ['instagram', 'tiktok'] },
    { type: 'Post', caption: 'Our core values in action', platforms: ['linkedin', 'facebook'] },
    { type: 'Story', caption: 'A day in the life at our office', platforms: ['instagram'] },
    { type: 'Video', caption: 'Customer testimonial spotlight', platforms: ['youtube', 'linkedin'] },
    { type: 'Post', caption: 'What makes us different (and better)', platforms: ['twitter', 'instagram'] },
  ],
  'engagement': [
    { type: 'Story', caption: 'Poll: Which do you prefer?', platforms: ['instagram', 'twitter'] },
    { type: 'Reel', caption: 'Challenge: Tag someone who...', platforms: ['instagram', 'tiktok'] },
    { type: 'Post', caption: 'Caption this! Best caption wins', platforms: ['instagram', 'facebook'] },
    { type: 'Post', caption: 'Q&A: Ask us anything!', platforms: ['twitter', 'instagram'] },
    { type: 'Story', caption: 'This or That: Quick picks', platforms: ['instagram'] },
    { type: 'Reel', caption: 'Giveaway announcement! Rules inside', platforms: ['instagram', 'tiktok'] },
  ],
  'educational': [
    { type: 'Carousel', caption: 'How-to guide: Step by step', platforms: ['instagram', 'linkedin'] },
    { type: 'Video', caption: 'Top tips & tricks you should know', platforms: ['youtube', 'tiktok'] },
    { type: 'Post', caption: 'Industry insight: What the data shows', platforms: ['linkedin', 'twitter'] },
    { type: 'Reel', caption: 'Myth busting: Common misconceptions', platforms: ['instagram', 'tiktok'] },
    { type: 'Carousel', caption: 'Beginner\'s guide to getting started', platforms: ['instagram', 'linkedin'] },
    { type: 'Post', caption: 'Did you know? Surprising facts', platforms: ['twitter', 'facebook'] },
  ],
  'seasonal': [
    { type: 'Post', caption: 'Happy holidays from our team!', platforms: ['instagram', 'facebook'] },
    { type: 'Reel', caption: 'Trending sound + our twist', platforms: ['instagram', 'tiktok'] },
    { type: 'Story', caption: 'Season\'s greetings & special offer', platforms: ['instagram'] },
    { type: 'Post', caption: 'New year, new goals: What\'s yours?', platforms: ['linkedin', 'twitter'] },
    { type: 'Reel', caption: 'Seasonal outfit/product styling', platforms: ['instagram', 'tiktok'] },
    { type: 'Post', caption: 'Throwback to our best moments', platforms: ['instagram', 'facebook'] },
  ],
  'behind-scenes': [
    { type: 'Story', caption: 'Office tour: Where the magic happens', platforms: ['instagram'] },
    { type: 'Reel', caption: 'How we make our products', platforms: ['instagram', 'tiktok'] },
    { type: 'Post', caption: 'Meet our newest team member!', platforms: ['linkedin', 'instagram'] },
    { type: 'Video', caption: 'A full day behind the scenes', platforms: ['youtube'] },
    { type: 'Story', caption: 'Sneak peek at what\'s coming next', platforms: ['instagram'] },
    { type: 'Reel', caption: 'Packing orders: the process', platforms: ['tiktok', 'instagram'] },
  ],
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

export default function ContentCalendarPage() {
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [brandColor, setBrandColor] = useState('#00f0ff');
  const [brandColor2, setBrandColor2] = useState('#8b5cf6');
  const [logoText, setLogoText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [calendarEntries, setCalendarEntries] = useState({});
  const [editingEntry, setEditingEntry] = useState(null);
  const calendarRef = useRef(null);

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleTheme = (id) => {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const generateCalendar = useCallback(() => {
    const days = getDaysInMonth(selectedMonth, selectedYear);
    const entries = {};
    let templatePool = [];

    selectedThemes.forEach((themeId) => {
      const templates = contentTemplates[themeId] || [];
      templates.forEach((t) => {
        const matchingPlatforms = t.platforms.filter((p) => selectedPlatforms.includes(p));
        if (matchingPlatforms.length > 0) {
          templatePool.push({ ...t, platforms: matchingPlatforms });
        }
      });
    });

    if (templatePool.length === 0) return;

    for (let day = 1; day <= days; day++) {
      const dayOfWeek = new Date(selectedYear, selectedMonth, day).getDay();
      if (dayOfWeek === 0) continue; // skip Sundays

      const numPosts = dayOfWeek === 6 ? 1 : Math.random() > 0.3 ? 2 : 1;
      entries[day] = [];

      for (let p = 0; p < numPosts; p++) {
        const template = templatePool[Math.floor(Math.random() * templatePool.length)];
        const platform = template.platforms[Math.floor(Math.random() * template.platforms.length)];
        entries[day].push({
          id: `${day}-${p}`,
          platform,
          type: template.type,
          caption: template.caption,
        });
      }
    }

    setCalendarEntries(entries);
    setStep(4);
  }, [selectedMonth, selectedYear, selectedPlatforms, selectedThemes]);

  const deleteEntry = (day, entryId) => {
    setCalendarEntries((prev) => ({
      ...prev,
      [day]: prev[day].filter((e) => e.id !== entryId),
    }));
  };

  const updateEntry = (day, entryId, field, value) => {
    setCalendarEntries((prev) => ({
      ...prev,
      [day]: prev[day].map((e) => (e.id === entryId ? { ...e, [field]: value } : e)),
    }));
  };

  const addEntry = (day) => {
    const newEntry = {
      id: `${day}-${Date.now()}`,
      platform: selectedPlatforms[0] || 'instagram',
      type: 'Post',
      caption: 'New content idea...',
    };
    setCalendarEntries((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newEntry],
    }));
  };

  const exportCalendar = async () => {
    if (!calendarRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(calendarRef.current, {
        backgroundColor: '#050510',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `${brandName || 'content'}-calendar-${months[selectedMonth]}-${selectedYear}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5"
          >
            Free Tool
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4"
          >
            Content <span className="gradient-text">Calendar Generator</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Create a beautiful, branded content calendar in minutes. Customize, edit, and download.
          </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {['Brand Setup', 'Content Config', 'Generate', 'Customize & Export'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > i + 1 ? 'bg-cyan text-background' : step === i + 1 ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-surface text-gray-500 border border-gray-700'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${step === i + 1 ? 'text-cyan' : 'text-gray-500'}`}>{s}</span>
              {i < 3 && <div className="w-8 h-px bg-gray-700" />}
            </div>
          ))}
        </div>

        {/* Steps Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-6">Brand Setup</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Brand Name *</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Your Brand Name"
                    className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Logo Text (displayed on calendar header)</label>
                  <input
                    type="text"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    placeholder={brandName || 'Logo Text'}
                    className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-surface border border-gray-700 rounded-lg text-foreground text-sm focus:outline-none focus:border-cyan/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Secondary Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={brandColor2}
                        onChange={(e) => setBrandColor2(e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={brandColor2}
                        onChange={(e) => setBrandColor2(e.target.value)}
                        className="flex-1 px-3 py-2 bg-surface border border-gray-700 rounded-lg text-foreground text-sm focus:outline-none focus:border-cyan/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 rounded-xl border border-gray-700 bg-surface">
                  <p className="text-xs text-gray-500 mb-2">Preview</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor2})` }}
                    >
                      {(logoText || brandName || 'B').charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold" style={{ color: brandColor }}>
                      {logoText || brandName || 'Your Brand'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <GradientButton onClick={() => brandName && setStep(2)} className={!brandName ? 'opacity-50 cursor-not-allowed' : ''}>
                  Next Step <HiArrowRight />
                </GradientButton>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-6">Content Configuration</h2>

              <div className="space-y-8">
                {/* Month/Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground focus:outline-none focus:border-cyan/50"
                    >
                      {months.map((m, i) => (
                        <option key={m} value={i}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-xl text-foreground focus:outline-none focus:border-cyan/50"
                    >
                      {[2025, 2026, 2027].map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Select Platforms *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {platforms.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          selectedPlatforms.includes(p.id)
                            ? 'border-cyan/50 bg-cyan/10 text-cyan'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <p.icon style={{ color: selectedPlatforms.includes(p.id) ? p.color : undefined }} />
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Themes */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Content Themes *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => toggleTheme(t.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          selectedThemes.includes(t.id)
                            ? 'border-purple/50 bg-purple/10 text-purple'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <span>{t.emoji}</span>
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-400 hover:text-foreground transition-colors">
                  <HiArrowLeft /> Back
                </button>
                <GradientButton
                  onClick={() => selectedPlatforms.length > 0 && selectedThemes.length > 0 && setStep(3)}
                  className={selectedPlatforms.length === 0 || selectedThemes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Next Step <HiArrowRight />
                </GradientButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto glass rounded-2xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4">Ready to Generate!</h2>
              <p className="text-gray-400 mb-8">
                We&apos;ll create a content calendar for <span className="text-cyan font-medium">{brandName}</span> for{' '}
                <span className="text-purple font-medium">{months[selectedMonth]} {selectedYear}</span> with{' '}
                <span className="text-pink font-medium">{selectedPlatforms.length} platforms</span> and{' '}
                <span className="text-neon-green font-medium">{selectedThemes.length} content themes</span>.
              </p>

              <div className="glass rounded-xl p-6 mb-8 text-left">
                <h3 className="text-sm font-bold text-foreground mb-3">Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Brand</span>
                    <span className="text-foreground">{brandName}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Month</span>
                    <span className="text-foreground">{months[selectedMonth]} {selectedYear}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Platforms</span>
                    <span className="text-foreground">{selectedPlatforms.join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Themes</span>
                    <span className="text-foreground">{selectedThemes.length} selected</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-400 hover:text-foreground transition-colors">
                  <HiArrowLeft /> Back
                </button>
                <GradientButton onClick={generateCalendar}>
                  Generate Calendar <HiArrowRight />
                </GradientButton>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <button onClick={() => { setStep(2); setCalendarEntries({}); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-foreground transition-colors">
                    <HiArrowLeft /> Reconfigure
                  </button>
                  <button onClick={generateCalendar} className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-700 rounded-lg text-gray-400 hover:text-cyan hover:border-cyan/30 transition-all">
                    <HiRefresh /> Regenerate
                  </button>
                </div>
                <button
                  onClick={exportCalendar}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
                >
                  <HiDownload /> Download as PNG
                </button>
              </div>

              {/* Calendar */}
              <div ref={calendarRef} className="glass rounded-2xl overflow-hidden" style={{ padding: '24px' }}>
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor2})` }}
                    >
                      {(logoText || brandName).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-foreground" style={{ color: brandColor }}>
                        {logoText || brandName}
                      </div>
                      <div className="text-xs text-gray-500">Content Calendar</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold font-[family-name:var(--font-heading)]" style={{ color: brandColor }}>
                      {months[selectedMonth]}
                    </div>
                    <div className="text-sm text-gray-500">{selectedYear}</div>
                  </div>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {dayNames.map((d) => (
                    <div key={d} className="text-center text-xs font-bold text-gray-500 py-2 uppercase">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="min-h-[100px] rounded-lg bg-surface/30" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const entries = calendarEntries[day] || [];
                    return (
                      <div
                        key={day}
                        className="min-h-[100px] rounded-lg bg-surface/50 border border-gray-800/50 p-1.5 group relative"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-gray-500">{day}</span>
                          <button
                            onClick={() => addEntry(day)}
                            className="opacity-0 group-hover:opacity-100 w-4 h-4 rounded bg-cyan/20 text-cyan flex items-center justify-center text-[8px] transition-opacity"
                          >
                            <HiPlus />
                          </button>
                        </div>
                        <div className="space-y-0.5">
                          {entries.map((entry) => {
                            const platform = platforms.find((p) => p.id === entry.platform);
                            const PIcon = platform?.icon;
                            return (
                              <div
                                key={entry.id}
                                className="group/entry relative text-[9px] rounded px-1 py-0.5 cursor-pointer hover:bg-surface transition-colors"
                                style={{ borderLeft: `2px solid ${platform?.color || '#666'}` }}
                                onClick={() => setEditingEntry(editingEntry === entry.id ? null : entry.id)}
                              >
                                <div className="flex items-center gap-1">
                                  {PIcon && <PIcon style={{ color: platform.color, fontSize: '8px' }} />}
                                  <span className="text-gray-400 font-medium truncate">{entry.type}</span>
                                </div>
                                {editingEntry === entry.id && (
                                  <div className="mt-1 space-y-1">
                                    <input
                                      value={entry.caption}
                                      onChange={(e) => updateEntry(day, entry.id, 'caption', e.target.value)}
                                      className="w-full text-[9px] px-1 py-0.5 bg-background border border-gray-700 rounded text-foreground focus:outline-none"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <button
                                      onClick={(e) => { e.stopPropagation(); deleteEntry(day, entry.id); }}
                                      className="text-pink text-[8px] flex items-center gap-0.5"
                                    >
                                      <HiTrash /> Remove
                                    </button>
                                  </div>
                                )}
                                {editingEntry !== entry.id && (
                                  <div className="text-gray-600 truncate">{entry.caption}</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-800">
                  <span className="text-xs text-gray-500">Platforms:</span>
                  {selectedPlatforms.map((pId) => {
                    const p = platforms.find((pl) => pl.id === pId);
                    return p ? (
                      <div key={pId} className="flex items-center gap-1 text-xs text-gray-400">
                        <p.icon style={{ color: p.color }} size={10} />
                        {p.name}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
