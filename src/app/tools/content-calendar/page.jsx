'use client';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiArrowRight, HiArrowLeft, HiDownload, HiRefresh, HiTrash, HiPlus, HiCheck,
  HiChevronLeft, HiChevronRight, HiCalendar, HiViewList, HiViewGrid,
  HiX, HiClock, HiHashtag, HiSave, HiFolder, HiDocumentDownload,
  HiLightningBolt, HiChartBar, HiPencil,
} from 'react-icons/hi';
import {
  platforms, contentTypes, themes, contentTemplates, months, dayNames, dayNamesFull,
  getDaysInMonth, getFirstDayOfMonth, getBestTimeForPlatform, getContentTypeInfo, getPlatformInfo,
} from './calendarData';

// ─── Step labels ───
const stepLabels = ['Brand Setup', 'Content Config', 'Review', 'Calendar'];

// ─── Entry detail modal ───
function EntryModal({ entry, day, month, year, onSave, onDelete, onClose, selectedPlatforms }) {
  const [caption, setCaption] = useState(entry.caption);
  const [type, setType] = useState(entry.type);
  const [platform, setPlatform] = useState(entry.platform);
  const [time, setTime] = useState(entry.time || '');
  const [hashtags, setHashtags] = useState(entry.hashtags?.join(' ') || '');
  const [notes, setNotes] = useState(entry.notes || '');

  const pInfo = getPlatformInfo(platform);
  const PIcon = pInfo?.icon;
  const dateStr = `${dayNamesFull[new Date(year, month, day).getDay()]}, ${months[month]} ${day}, ${year}`;

  const handleSave = () => {
    onSave(day, entry.id, {
      caption,
      type,
      platform,
      time,
      hashtags: hashtags.split(/\s+/).filter(Boolean),
      notes,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg rounded-2xl border border-gray-800 bg-background p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)]">Edit Entry</h3>
            <p className="text-xs text-gray-500 mt-0.5">{dateStr}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-foreground rounded-lg hover:bg-surface transition-all"><HiX size={18} /></button>
        </div>

        <div className="space-y-5">
          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Platform</label>
            <div className="flex flex-wrap gap-2">
              {platforms.filter((p) => selectedPlatforms.includes(p.id)).map((p) => {
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

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Content Type</label>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((ct) => (
                <button key={ct.id} onClick={() => setType(ct.id)}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${type === ct.id ? 'text-white' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
                  style={type === ct.id ? { borderColor: ct.color + '80', backgroundColor: ct.color + '20', color: ct.color } : {}}>
                  {ct.label}
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Caption</label>
            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={3}
              className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all resize-none" />
          </div>

          {/* Hashtags */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-400 mb-2"><HiHashtag size={14} /> Hashtags</label>
            <input value={hashtags} onChange={(e) => setHashtags(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all"
              placeholder="#hashtag1 #hashtag2 #hashtag3" />
            {entry.hashtags?.length > 0 && hashtags === '' && (
              <button onClick={() => setHashtags(entry.hashtags.join(' '))} className="mt-1.5 text-xs text-cyan hover:text-cyan/80 transition-colors">
                Restore suggested hashtags
              </button>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-400 mb-2"><HiClock size={14} /> Posting Time</label>
            <div className="flex flex-wrap gap-2">
              {pInfo?.bestTimes?.map((t) => (
                <button key={t} onClick={() => setTime(t)}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${time === t ? 'border-purple/50 bg-purple/10 text-purple' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}>
                  {t}
                </button>
              ))}
              <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Custom time"
                className="px-3 py-2 bg-surface border border-gray-800 rounded-lg text-foreground text-xs w-28 focus:outline-none focus:border-cyan/50 transition-all" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
              className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all resize-none"
              placeholder="Internal notes, reminders..." />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
          <button onClick={() => { onDelete(day, entry.id); onClose(); }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-pink hover:bg-pink/10 rounded-lg transition-all">
            <HiTrash size={14} /> Delete
          </button>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
            <HiCheck size={14} /> Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Stats dashboard ───
function StatsDashboard({ entries, selectedPlatforms: selPlats }) {
  const stats = useMemo(() => {
    const allEntries = Object.values(entries).flat();
    const total = allEntries.length;
    const byType = {};
    const byPlatform = {};
    const byDay = {};

    allEntries.forEach((e) => {
      byType[e.type] = (byType[e.type] || 0) + 1;
      byPlatform[e.platform] = (byPlatform[e.platform] || 0) + 1;
    });

    Object.entries(entries).forEach(([day, dayEntries]) => {
      const dow = new Date(2026, 0, parseInt(day)).getDay();
      const name = dayNames[dow];
      byDay[name] = (byDay[name] || 0) + dayEntries.length;
    });

    return { total, byType, byPlatform, byDay };
  }, [entries]);

  if (stats.total === 0) return null;

  const maxTypeCount = Math.max(...Object.values(stats.byType), 1);
  const maxPlatformCount = Math.max(...Object.values(stats.byPlatform), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total posts */}
      <div className="rounded-xl border border-gray-800 bg-surface/30 p-5">
        <div className="flex items-center gap-2 mb-3">
          <HiChartBar className="text-cyan" size={16} />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overview</span>
        </div>
        <div className="text-3xl font-bold font-[family-name:var(--font-heading)] text-cyan">{stats.total}</div>
        <div className="text-xs text-gray-500 mt-0.5">total posts planned</div>
        <div className="text-xs text-gray-600 mt-2">
          ~{(stats.total / 4).toFixed(1)} posts/week avg
        </div>
      </div>

      {/* Content type breakdown */}
      <div className="rounded-xl border border-gray-800 bg-surface/30 p-5">
        <div className="flex items-center gap-2 mb-3">
          <HiViewGrid className="text-purple" size={16} />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Content Mix</span>
        </div>
        <div className="space-y-2">
          {Object.entries(stats.byType).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([typeId, count]) => {
            const ct = getContentTypeInfo(typeId);
            return (
              <div key={typeId} className="flex items-center gap-2">
                <span className="text-[10px] font-medium w-16 text-gray-400 truncate">{ct?.label || typeId}</span>
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(count / maxTypeCount) * 100}%`, backgroundColor: ct?.color || '#666' }} />
                </div>
                <span className="text-[10px] text-gray-500 w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform breakdown */}
      <div className="rounded-xl border border-gray-800 bg-surface/30 p-5">
        <div className="flex items-center gap-2 mb-3">
          <HiLightningBolt className="text-pink" size={16} />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Platform Split</span>
        </div>
        <div className="space-y-2">
          {Object.entries(stats.byPlatform).sort((a, b) => b[1] - a[1]).map(([pId, count]) => {
            const p = getPlatformInfo(pId);
            const PIcon = p?.icon;
            return (
              <div key={pId} className="flex items-center gap-2">
                <span className="w-16 flex items-center gap-1 text-[10px] text-gray-400 truncate">
                  {PIcon && <PIcon size={10} style={{ color: p.color }} />}{p?.name || pId}
                </span>
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(count / maxPlatformCount) * 100}%`, backgroundColor: p?.color || '#666' }} />
                </div>
                <span className="text-[10px] text-gray-500 w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───
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
  const [editingEntry, setEditingEntry] = useState(null); // { day, entry }
  const [view, setView] = useState('month'); // 'month' | 'week' | 'agenda'
  const [currentWeek, setCurrentWeek] = useState(0);
  const [dragEntry, setDragEntry] = useState(null); // { fromDay, entryId }
  const [savedCalendars, setSavedCalendars] = useState([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const calendarRef = useRef(null);

  // Load saved calendars from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('scg_saved_calendars') || '[]');
      setSavedCalendars(saved);
    } catch { /* empty */ }
  }, []);

  // ─── Calendar generation ───
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

    // Track used templates to ensure variety
    const usedRecently = [];

    for (let day = 1; day <= days; day++) {
      const dayOfWeek = new Date(selectedYear, selectedMonth, day).getDay();
      if (dayOfWeek === 0) continue; // skip Sundays

      const numPosts = dayOfWeek === 6 ? 1 : Math.random() > 0.3 ? 2 : 1;
      entries[day] = [];

      for (let p = 0; p < numPosts; p++) {
        // Pick template, avoiding recent repeats
        let available = templatePool.filter((t) => !usedRecently.includes(t.caption));
        if (available.length === 0) {
          available = templatePool;
          usedRecently.length = 0;
        }
        const template = available[Math.floor(Math.random() * available.length)];
        usedRecently.push(template.caption);
        if (usedRecently.length > Math.min(8, templatePool.length - 1)) usedRecently.shift();

        const platform = template.platforms[Math.floor(Math.random() * template.platforms.length)];
        entries[day].push({
          id: `${day}-${p}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          platform,
          type: template.type,
          caption: template.caption,
          hashtags: template.hashtags || [],
          time: getBestTimeForPlatform(platform),
          notes: '',
        });
      }
    }

    setCalendarEntries(entries);
    setStep(4);
    setCurrentWeek(0);
  }, [selectedMonth, selectedYear, selectedPlatforms, selectedThemes]);

  // ─── Entry CRUD ───
  const deleteEntry = (day, entryId) => {
    setCalendarEntries((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((e) => e.id !== entryId),
    }));
  };

  const updateEntry = (day, entryId, fields) => {
    setCalendarEntries((prev) => ({
      ...prev,
      [day]: (prev[day] || []).map((e) => (e.id === entryId ? { ...e, ...fields } : e)),
    }));
  };

  const addEntry = (day) => {
    const platform = selectedPlatforms[0] || 'instagram';
    const newEntry = {
      id: `${day}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      platform,
      type: 'post',
      caption: 'New content idea...',
      hashtags: [],
      time: getBestTimeForPlatform(platform),
      notes: '',
    };
    setCalendarEntries((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newEntry],
    }));
    setEditingEntry({ day, entry: newEntry });
  };

  // ─── Drag and drop ───
  const handleDragStart = (day, entryId) => {
    setDragEntry({ fromDay: day, entryId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (toDay) => {
    if (!dragEntry) return;
    const { fromDay, entryId } = dragEntry;
    if (fromDay === toDay) { setDragEntry(null); return; }

    setCalendarEntries((prev) => {
      const entry = (prev[fromDay] || []).find((e) => e.id === entryId);
      if (!entry) return prev;
      return {
        ...prev,
        [fromDay]: (prev[fromDay] || []).filter((e) => e.id !== entryId),
        [toDay]: [...(prev[toDay] || []), entry],
      };
    });
    setDragEntry(null);
  };

  // ─── Save / Load ───
  const saveCalendar = () => {
    const cal = {
      id: Date.now().toString(),
      name: `${brandName} - ${months[selectedMonth]} ${selectedYear}`,
      brandName, brandColor, brandColor2, logoText,
      selectedMonth, selectedYear, selectedPlatforms, selectedThemes,
      entries: calendarEntries,
      savedAt: new Date().toISOString(),
    };
    const updated = [cal, ...savedCalendars.filter((c) => c.id !== cal.id)].slice(0, 20);
    setSavedCalendars(updated);
    localStorage.setItem('scg_saved_calendars', JSON.stringify(updated));
  };

  const loadCalendar = (cal) => {
    setBrandName(cal.brandName);
    setBrandColor(cal.brandColor);
    setBrandColor2(cal.brandColor2);
    setLogoText(cal.logoText);
    setSelectedMonth(cal.selectedMonth);
    setSelectedYear(cal.selectedYear);
    setSelectedPlatforms(cal.selectedPlatforms);
    setSelectedThemes(cal.selectedThemes);
    setCalendarEntries(cal.entries);
    setStep(4);
    setShowSavedList(false);
  };

  const deleteSavedCalendar = (id) => {
    const updated = savedCalendars.filter((c) => c.id !== id);
    setSavedCalendars(updated);
    localStorage.setItem('scg_saved_calendars', JSON.stringify(updated));
  };

  // ─── Export ───
  const exportPNG = async () => {
    if (!calendarRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(calendarRef.current, { backgroundColor: '#050510', scale: 2 });
      const link = document.createElement('a');
      link.download = `${brandName || 'content'}-calendar-${months[selectedMonth]}-${selectedYear}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const exportCSV = () => {
    const rows = [['Day', 'Date', 'Platform', 'Content Type', 'Caption', 'Hashtags', 'Time', 'Notes']];
    const daysInM = getDaysInMonth(selectedMonth, selectedYear);
    for (let day = 1; day <= daysInM; day++) {
      const entries = calendarEntries[day] || [];
      const dateStr = `${months[selectedMonth]} ${day}, ${selectedYear}`;
      entries.forEach((e) => {
        rows.push([
          dayNamesFull[new Date(selectedYear, selectedMonth, day).getDay()],
          dateStr,
          getPlatformInfo(e.platform)?.name || e.platform,
          getContentTypeInfo(e.type)?.label || e.type,
          `"${(e.caption || '').replace(/"/g, '""')}"`,
          (e.hashtags || []).join(' '),
          e.time || '',
          `"${(e.notes || '').replace(/"/g, '""')}"`,
        ]);
      });
    }
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.download = `${brandName || 'content'}-calendar-${months[selectedMonth]}-${selectedYear}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  // ─── Navigation ───
  const navigateMonth = (dir) => {
    let m = selectedMonth + dir;
    let y = selectedYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setSelectedMonth(m);
    setSelectedYear(y);
    setCurrentWeek(0);
  };

  // ─── Computed ───
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  const today = new Date();
  const isCurrentMonth = today.getMonth() === selectedMonth && today.getFullYear() === selectedYear;

  // Week view helpers
  const weeks = useMemo(() => {
    const w = [];
    let week = [];
    for (let i = 0; i < firstDay; i++) week.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7) { w.push(week); week = []; }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      w.push(week);
    }
    return w;
  }, [firstDay, daysInMonth]);

  const togglePlatform = (id) => setSelectedPlatforms((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  const toggleTheme = (id) => setSelectedThemes((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);

  // ─── Render entry chip (used in month/week views) ───
  const renderEntryChip = (entry, day, compact = false) => {
    const pInfo = getPlatformInfo(entry.platform);
    const PIcon = pInfo?.icon;
    const ctInfo = getContentTypeInfo(entry.type);

    return (
      <div
        key={entry.id}
        draggable
        onDragStart={() => handleDragStart(day, entry.id)}
        onClick={() => setEditingEntry({ day, entry })}
        className={`group/entry relative rounded-md cursor-pointer hover:ring-1 hover:ring-cyan/30 transition-all ${compact ? 'px-1.5 py-1' : 'px-2 py-1.5'}`}
        style={{ borderLeft: `3px solid ${ctInfo?.color || '#666'}`, backgroundColor: (ctInfo?.color || '#666') + '08' }}
      >
        <div className="flex items-center gap-1.5">
          {PIcon && <PIcon style={{ color: pInfo.color }} size={compact ? 10 : 12} />}
          <span className={`font-medium text-gray-300 truncate ${compact ? 'text-[10px]' : 'text-xs'}`}>{ctInfo?.label}</span>
          {entry.time && !compact && <span className="text-[9px] text-gray-600 ml-auto flex-shrink-0">{entry.time}</span>}
        </div>
        {!compact && <div className="text-[11px] text-gray-500 truncate mt-0.5">{entry.caption}</div>}
      </div>
    );
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan border border-cyan/20 rounded-full bg-cyan/5">
            Free Tool
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Content{' '}
            <span className="bg-gradient-to-r from-cyan via-purple to-pink bg-clip-text text-transparent">Calendar Generator</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto">
            Plan, visualize, and organize your content strategy. Drag-and-drop scheduling, smart suggestions, and one-click export.
          </motion.p>

          {/* Saved calendars shortcut */}
          {savedCalendars.length > 0 && step !== 4 && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              onClick={() => setShowSavedList(!showSavedList)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 border border-gray-800 rounded-xl hover:border-gray-600 hover:text-foreground transition-all">
              <HiFolder size={16} /> Load Saved Calendar ({savedCalendars.length})
            </motion.button>
          )}
        </div>

        {/* Saved calendars list */}
        <AnimatePresence>
          {showSavedList && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8">
              <div className="rounded-2xl border border-gray-800 bg-surface/30 p-6 max-w-2xl mx-auto">
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Saved Calendars</h3>
                <div className="space-y-2">
                  {savedCalendars.map((cal) => (
                    <div key={cal.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{cal.name}</div>
                        <div className="text-[10px] text-gray-600">{new Date(cal.savedAt).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => loadCalendar(cal)} className="px-3 py-1.5 text-xs text-cyan border border-cyan/30 rounded-lg hover:bg-cyan/10 transition-all">Load</button>
                        <button onClick={() => deleteSavedCalendar(cal.id)} className="p-1.5 text-gray-500 hover:text-pink transition-colors"><HiTrash size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-14 max-w-lg mx-auto">
          {stepLabels.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => { if (step > i + 1) setStep(i + 1); }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step > i + 1 ? 'bg-gradient-to-br from-cyan to-purple text-background shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer hover:scale-110'
                    : step === i + 1 ? 'bg-cyan/10 text-cyan border-2 border-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    : 'bg-surface text-gray-500 border border-gray-800'
                  }`}>
                  {step > i + 1 ? <HiCheck /> : i + 1}
                </button>
                <span className={`text-[11px] mt-2 font-medium whitespace-nowrap ${step === i + 1 ? 'text-cyan' : step > i + 1 ? 'text-foreground' : 'text-gray-500'}`}>{s}</span>
              </div>
              {i < 3 && (
                <div className="flex-1 mx-2 mt-[-18px]">
                  <div className={`h-0.5 rounded-full transition-all duration-500 ${step > i + 1 ? 'bg-gradient-to-r from-cyan to-purple' : 'bg-gray-800'}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Steps Content */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Brand Setup */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto rounded-2xl p-8 border border-gray-800 bg-surface/30">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-6">Brand Setup</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Brand Name *</label>
                  <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Your Brand Name"
                    className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Logo Text (displayed on calendar header)</label>
                  <input type="text" value={logoText} onChange={(e) => setLogoText(e.target.value)} placeholder={brandName || 'Logo Text'}
                    className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent" />
                      <input type="text" value={brandColor} onChange={(e) => setBrandColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-surface border border-gray-800 rounded-lg text-foreground text-sm focus:outline-none focus:border-cyan/50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Secondary Color</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={brandColor2} onChange={(e) => setBrandColor2(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent" />
                      <input type="text" value={brandColor2} onChange={(e) => setBrandColor2(e.target.value)}
                        className="flex-1 px-3 py-2 bg-surface border border-gray-800 rounded-lg text-foreground text-sm focus:outline-none focus:border-cyan/50" />
                    </div>
                  </div>
                </div>
                {/* Preview */}
                <div className="p-4 rounded-xl border border-gray-800 bg-surface">
                  <p className="text-xs text-gray-500 mb-2">Preview</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor2})` }}>
                      {(logoText || brandName || 'B').charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold" style={{ color: brandColor }}>{logoText || brandName || 'Your Brand'}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button onClick={() => brandName && setStep(2)}
                  className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all ${!brandName ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Next Step <HiArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Content Config */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto rounded-2xl p-8 border border-gray-800 bg-surface/30">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-6">Content Configuration</h2>
              <div className="space-y-8">
                {/* Month/Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Month</label>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground focus:outline-none focus:border-cyan/50 transition-all">
                      {months.map((m, i) => (<option key={m} value={i}>{m}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Year</label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-xl text-foreground focus:outline-none focus:border-cyan/50 transition-all">
                      {[2025, 2026, 2027, 2028].map((y) => (<option key={y} value={y}>{y}</option>))}
                    </select>
                  </div>
                </div>
                {/* Platforms */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Select Platforms *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {platforms.map((p) => (
                      <button key={p.id} onClick={() => togglePlatform(p.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${selectedPlatforms.includes(p.id) ? 'border-cyan/50 bg-cyan/10 text-cyan shadow-[0_0_10px_rgba(0,240,255,0.1)]' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`}>
                        <p.icon style={{ color: selectedPlatforms.includes(p.id) ? p.color : undefined }} /> {p.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Themes */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Content Themes *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {themes.map((t) => (
                      <button key={t.id} onClick={() => toggleTheme(t.id)}
                        className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all ${selectedThemes.includes(t.id) ? 'border-purple/50 bg-purple/10 shadow-[0_0_10px_rgba(139,92,246,0.1)]' : 'border-gray-800 hover:border-gray-600'}`}>
                        <span className="text-lg mt-0.5">{t.emoji}</span>
                        <div>
                          <div className={`text-sm font-medium ${selectedThemes.includes(t.id) ? 'text-purple' : 'text-gray-400'}`}>{t.name}</div>
                          <div className="text-[11px] text-gray-600 mt-0.5">{t.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-400 hover:text-foreground transition-colors"><HiArrowLeft /> Back</button>
                <button onClick={() => selectedPlatforms.length > 0 && selectedThemes.length > 0 && setStep(3)}
                  className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all ${selectedPlatforms.length === 0 || selectedThemes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Next Step <HiArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Review */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto rounded-2xl p-8 border border-gray-800 bg-surface/30 text-center">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-4">Ready to Generate!</h2>
              <p className="text-gray-400 mb-8">
                Creating a content calendar for <span className="text-cyan font-medium">{brandName}</span> for{' '}
                <span className="text-purple font-medium">{months[selectedMonth]} {selectedYear}</span> with{' '}
                <span className="text-pink font-medium">{selectedPlatforms.length} platform{selectedPlatforms.length !== 1 && 's'}</span> and{' '}
                <span className="text-neon-green font-medium">{selectedThemes.length} content theme{selectedThemes.length !== 1 && 's'}</span>.
              </p>
              <div className="rounded-xl p-6 mb-8 text-left border border-gray-800 bg-surface/50">
                <h3 className="text-sm font-bold text-foreground mb-4">Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Brand</span><span className="text-foreground font-medium">{brandName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Period</span><span className="text-foreground font-medium">{months[selectedMonth]} {selectedYear}</span></div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400">Platforms</span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {selectedPlatforms.map((pId) => {
                        const p = getPlatformInfo(pId);
                        const PIcon = p?.icon;
                        return <span key={pId} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full border border-gray-800 text-gray-300">{PIcon && <PIcon size={10} style={{ color: p.color }} />}{p?.name}</span>;
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400">Themes</span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {selectedThemes.map((tId) => {
                        const t = themes.find((th) => th.id === tId);
                        return <span key={tId} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full border border-gray-800 text-gray-300">{t?.emoji} {t?.name}</span>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-400 hover:text-foreground transition-colors"><HiArrowLeft /> Back</button>
                <button onClick={generateCalendar}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
                  Generate Calendar <HiArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Calendar */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Stats Dashboard */}
              <StatsDashboard entries={calendarEntries} selectedPlatforms={selectedPlatforms} />

              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <button onClick={() => { setStep(2); setCalendarEntries({}); }} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-foreground transition-colors"><HiArrowLeft size={14} /> Edit</button>
                  <div className="w-px h-5 bg-gray-800 mx-1" />
                  <button onClick={generateCalendar} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-800 rounded-lg text-gray-400 hover:text-cyan hover:border-cyan/30 transition-all"><HiRefresh size={14} /> Regenerate</button>
                  <button onClick={saveCalendar} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-800 rounded-lg text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all"><HiSave size={14} /> Save</button>
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-1 p-1 rounded-lg border border-gray-800 bg-surface/30">
                  {[
                    { id: 'month', icon: HiCalendar, label: 'Month' },
                    { id: 'week', icon: HiViewGrid, label: 'Week' },
                    { id: 'agenda', icon: HiViewList, label: 'Agenda' },
                  ].map((v) => (
                    <button key={v.id} onClick={() => setView(v.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${view === v.id ? 'bg-cyan/10 text-cyan' : 'text-gray-500 hover:text-foreground'}`}>
                      <v.icon size={14} /> <span className="hidden sm:inline">{v.label}</span>
                    </button>
                  ))}
                </div>

                {/* Export */}
                <div className="flex items-center gap-2">
                  <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-800 rounded-lg text-gray-400 hover:text-foreground hover:border-gray-600 transition-all"><HiDocumentDownload size={14} /> CSV</button>
                  <button onClick={exportPNG} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"><HiDownload size={14} /> PNG</button>
                </div>
              </div>

              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigateMonth(-1)} className="p-2 text-gray-400 hover:text-foreground rounded-lg hover:bg-surface transition-all"><HiChevronLeft size={20} /></button>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: brandColor }}>{months[selectedMonth]} {selectedYear}</h2>
                  <p className="text-[10px] text-gray-600 mt-0.5">{Object.values(calendarEntries).flat().length} posts planned</p>
                </div>
                <button onClick={() => navigateMonth(1)} className="p-2 text-gray-400 hover:text-foreground rounded-lg hover:bg-surface transition-all"><HiChevronRight size={20} /></button>
              </div>

              {/* Calendar Views */}
              <div ref={calendarRef} className="rounded-2xl overflow-hidden border border-gray-800 bg-surface/30" style={{ padding: '16px' }}>
                {/* Branded header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                      style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor2})` }}>
                      {(logoText || brandName).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: brandColor }}>{logoText || brandName}</div>
                      <div className="text-[10px] text-gray-600">Content Calendar</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold font-[family-name:var(--font-heading)]" style={{ color: brandColor }}>{months[selectedMonth]}</div>
                    <div className="text-[10px] text-gray-600">{selectedYear}</div>
                  </div>
                </div>

                {/* === MONTH VIEW === */}
                {view === 'month' && (
                  <>
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {dayNames.map((d) => (
                        <div key={d} className="text-center text-[10px] font-bold text-gray-500 py-1.5 uppercase tracking-wider">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`e-${i}`} className="min-h-[120px] rounded-lg bg-surface/20" />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const entries = calendarEntries[day] || [];
                        const isToday = isCurrentMonth && today.getDate() === day;
                        return (
                          <div key={day}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(day)}
                            className={`min-h-[120px] rounded-lg border p-1.5 group relative transition-colors ${isToday ? 'border-cyan/40 bg-cyan/5' : 'border-gray-800/50 bg-surface/50 hover:border-gray-700'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-bold ${isToday ? 'text-cyan' : 'text-gray-500'}`}>
                                {isToday && <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan mr-1 align-middle" />}
                                {day}
                              </span>
                              <button onClick={() => addEntry(day)}
                                className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded bg-cyan/20 text-cyan flex items-center justify-center transition-opacity"><HiPlus size={10} /></button>
                            </div>
                            <div className="space-y-0.5">
                              {entries.slice(0, 3).map((entry) => renderEntryChip(entry, day, true))}
                              {entries.length > 3 && (
                                <div className="text-[9px] text-gray-600 text-center py-0.5">+{entries.length - 3} more</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* === WEEK VIEW === */}
                {view === 'week' && weeks.length > 0 && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <button onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))} disabled={currentWeek === 0}
                        className="p-1.5 text-gray-400 hover:text-foreground disabled:opacity-30 rounded transition-all"><HiChevronLeft size={16} /></button>
                      <span className="text-xs text-gray-400 font-medium">Week {currentWeek + 1} of {weeks.length}</span>
                      <button onClick={() => setCurrentWeek(Math.min(weeks.length - 1, currentWeek + 1))} disabled={currentWeek >= weeks.length - 1}
                        className="p-1.5 text-gray-400 hover:text-foreground disabled:opacity-30 rounded transition-all"><HiChevronRight size={16} /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {dayNames.map((d) => (
                        <div key={d} className="text-center text-[10px] font-bold text-gray-500 py-1 uppercase tracking-wider">{d}</div>
                      ))}
                      {(weeks[currentWeek] || []).map((day, i) => {
                        if (!day) return <div key={`w-empty-${i}`} className="min-h-[200px] rounded-lg bg-surface/20" />;
                        const entries = calendarEntries[day] || [];
                        const isToday = isCurrentMonth && today.getDate() === day;
                        return (
                          <div key={day}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(day)}
                            className={`min-h-[200px] rounded-lg border p-2 group transition-colors ${isToday ? 'border-cyan/40 bg-cyan/5' : 'border-gray-800/50 bg-surface/50 hover:border-gray-700'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-sm font-bold ${isToday ? 'text-cyan' : 'text-gray-400'}`}>{day}</span>
                              <button onClick={() => addEntry(day)}
                                className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded bg-cyan/20 text-cyan flex items-center justify-center transition-opacity"><HiPlus size={10} /></button>
                            </div>
                            <div className="space-y-1">
                              {entries.map((entry) => renderEntryChip(entry, day))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* === AGENDA VIEW === */}
                {view === 'agenda' && (
                  <div className="space-y-1">
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const entries = calendarEntries[day] || [];
                      if (entries.length === 0) return null;
                      const isToday = isCurrentMonth && today.getDate() === day;
                      const dow = dayNamesFull[new Date(selectedYear, selectedMonth, day).getDay()];
                      return (
                        <div key={day} className={`rounded-xl border p-4 transition-colors ${isToday ? 'border-cyan/40 bg-cyan/5' : 'border-gray-800/50 bg-surface/30'}`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {isToday && <span className="w-2 h-2 rounded-full bg-cyan" />}
                              <span className={`text-sm font-bold ${isToday ? 'text-cyan' : 'text-foreground'}`}>{dow}, {months[selectedMonth]} {day}</span>
                            </div>
                            <button onClick={() => addEntry(day)}
                              className="flex items-center gap-1 px-2.5 py-1 text-[10px] text-cyan border border-cyan/20 rounded-lg hover:bg-cyan/10 transition-all"><HiPlus size={10} /> Add</button>
                          </div>
                          <div className="space-y-2">
                            {entries.map((entry) => {
                              const pInfo = getPlatformInfo(entry.platform);
                              const PIcon = pInfo?.icon;
                              const ctInfo = getContentTypeInfo(entry.type);
                              return (
                                <div key={entry.id} onClick={() => setEditingEntry({ day, entry })}
                                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-800/50 bg-surface/30 hover:border-gray-700 cursor-pointer transition-all group/agenda"
                                  style={{ borderLeftWidth: '3px', borderLeftColor: ctInfo?.color || '#666' }}>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      {PIcon && <PIcon size={14} style={{ color: pInfo.color }} />}
                                      <span className="text-xs font-semibold text-foreground">{ctInfo?.label}</span>
                                      <span className="text-[10px] text-gray-600">{pInfo?.name}</span>
                                      {entry.time && <span className="text-[10px] text-gray-500 ml-auto flex items-center gap-0.5"><HiClock size={10} />{entry.time}</span>}
                                    </div>
                                    <div className="text-sm text-gray-400">{entry.caption}</div>
                                    {entry.hashtags?.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1.5">
                                        {entry.hashtags.slice(0, 4).map((h) => (
                                          <span key={h} className="text-[9px] text-cyan/70 bg-cyan/5 px-1.5 py-0.5 rounded">{h}</span>
                                        ))}
                                        {entry.hashtags.length > 4 && <span className="text-[9px] text-gray-600">+{entry.hashtags.length - 4}</span>}
                                      </div>
                                    )}
                                  </div>
                                  <button className="opacity-0 group-hover/agenda:opacity-100 p-1.5 text-gray-500 hover:text-cyan rounded transition-all"><HiPencil size={14} /></button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-800">
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider font-bold">Content types:</span>
                  {contentTypes.filter((ct) => Object.values(calendarEntries).flat().some((e) => e.type === ct.id)).map((ct) => (
                    <div key={ct.id} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: ct.color }} />
                      <span className="text-[10px] text-gray-500">{ct.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entry Detail Modal */}
        <AnimatePresence>
          {editingEntry && (
            <EntryModal
              entry={editingEntry.entry}
              day={editingEntry.day}
              month={selectedMonth}
              year={selectedYear}
              selectedPlatforms={selectedPlatforms}
              onSave={updateEntry}
              onDelete={deleteEntry}
              onClose={() => setEditingEntry(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
