'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InfluencerCard from '@/components/influencer/InfluencerCard';
import ApplicationModal from '@/components/influencer/ApplicationModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { HiSearch, HiPlus, HiX } from 'react-icons/hi';

const defaultInfluencers = [
  { id: 'inf-1', name: 'Aria Martinez', bio: 'Beauty and fashion content creator. Passionate about sustainable beauty and inclusive fashion for all.', niche: ['Beauty', 'Fashion'], platforms: ['instagram', 'tiktok'], followers: '1.2M', engagementRate: 4.8, location: 'Los Angeles, CA' },
  { id: 'inf-2', name: 'Jake Chen', bio: 'Tech reviewer and gaming content creator. Making tech simple and fun for everyone.', niche: ['Tech', 'Gaming'], platforms: ['youtube', 'tiktok', 'twitter'], followers: '890K', engagementRate: 5.2, location: 'San Francisco, CA' },
  { id: 'inf-3', name: 'Sofia Rossi', bio: 'Fitness trainer and wellness advocate. Helping people transform their lives through health and nutrition.', niche: ['Fitness', 'Wellness'], platforms: ['instagram', 'youtube'], followers: '650K', engagementRate: 6.1, location: 'Miami, FL' },
  { id: 'inf-4', name: 'Marcus Davis', bio: 'Food blogger and lifestyle creator. Exploring cuisines from around the world one bite at a time.', niche: ['Food', 'Lifestyle'], platforms: ['tiktok', 'instagram'], followers: '2.1M', engagementRate: 3.9, location: 'New York, NY' },
  { id: 'inf-5', name: 'Luna Park', bio: 'Travel photographer and adventure seeker. Sharing hidden gems and travel tips from 50+ countries.', niche: ['Travel', 'Photography'], platforms: ['instagram', 'youtube'], followers: '500K', engagementRate: 7.2, location: 'Seoul, Korea' },
  { id: 'inf-6', name: 'Dex Turner', bio: 'Streetwear enthusiast and sneaker collector. Building the next generation of fashion culture.', niche: ['Fashion', 'Lifestyle'], platforms: ['instagram', 'tiktok'], followers: '340K', engagementRate: 5.8, location: 'London, UK' },
  { id: 'inf-7', name: 'Priya Sharma', bio: 'Business coach and personal development creator. Empowering entrepreneurs to scale their businesses.', niche: ['Business', 'Education'], platforms: ['linkedin', 'youtube', 'instagram'], followers: '420K', engagementRate: 4.5, location: 'Dubai, UAE' },
  { id: 'inf-8', name: 'Tyler Woods', bio: 'Outdoor adventure and extreme sports content. Living life on the edge and sharing every moment.', niche: ['Sports', 'Travel'], platforms: ['youtube', 'tiktok'], followers: '780K', engagementRate: 6.3, location: 'Denver, CO' },
];

const allNiches = ['Beauty', 'Fashion', 'Tech', 'Gaming', 'Fitness', 'Wellness', 'Food', 'Lifestyle', 'Travel', 'Photography', 'Business', 'Education', 'Sports'];
const allPlatforms = ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin'];
const followerRanges = ['Any', '10K-100K', '100K-500K', '500K-1M', '1M+'];

export default function BrowseInfluencersPage() {
  const [influencers, setInfluencers] = useLocalStorage('scg_influencers', defaultInfluencers);
  const [search, setSearch] = useState('');
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [followerRange, setFollowerRange] = useState('Any');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [modalTarget, setModalTarget] = useState(null);

  // New listing form
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newNiche, setNewNiche] = useState([]);
  const [newPlatforms, setNewPlatforms] = useState([]);
  const [newFollowers, setNewFollowers] = useState('');
  const [newEngagement, setNewEngagement] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const filtered = useMemo(() => {
    return influencers.filter((inf) => {
      if (search && !inf.name.toLowerCase().includes(search.toLowerCase()) && !inf.bio?.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedNiches.length > 0 && !selectedNiches.some((n) => inf.niche?.includes(n))) return false;
      if (selectedPlatforms.length > 0 && !selectedPlatforms.some((p) => inf.platforms?.includes(p))) return false;
      return true;
    });
  }, [influencers, search, selectedNiches, selectedPlatforms]);

  const handleCreateListing = (e) => {
    e.preventDefault();
    const newInfluencer = {
      id: `inf-${Date.now()}`,
      name: newName,
      bio: newBio,
      niche: newNiche,
      platforms: newPlatforms,
      followers: newFollowers,
      engagementRate: parseFloat(newEngagement) || 0,
      location: newLocation,
      createdAt: new Date().toISOString(),
    };
    setInfluencers((prev) => [newInfluencer, ...prev]);
    setShowCreateForm(false);
    setNewName(''); setNewBio(''); setNewNiche([]); setNewPlatforms([]); setNewFollowers(''); setNewEngagement(''); setNewLocation('');
  };

  const handleConnect = (influencer) => {
    setModalTarget(influencer);
  };

  const handleApplicationSubmit = (data) => {
    const apps = JSON.parse(localStorage.getItem('scg_applications') || '[]');
    apps.push({
      id: `app-${Date.now()}`,
      type: 'influencer-connect',
      influencerId: data.targetId,
      applicantName: data.name,
      applicantEmail: data.email,
      message: data.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('scg_applications', JSON.stringify(apps));
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-2"
            >
              Browse <span className="gradient-text">Creators</span>
            </motion.h1>
            <p className="text-gray-400 text-sm">{filtered.length} creators available</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-pink to-purple text-white rounded-lg hover:shadow-[0_0_20px_rgba(255,0,110,0.3)] transition-all"
          >
            <HiPlus /> List Yourself
          </button>
        </div>

        {/* Create Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <form onSubmit={handleCreateListing} className="glass rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-foreground">Create Your Profile</h2>
                  <button type="button" onClick={() => setShowCreateForm(false)} className="text-gray-500 hover:text-foreground">
                    <HiX size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name *</label>
                    <input required value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Location</label>
                    <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50" placeholder="City, Country" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Followers *</label>
                    <input required value={newFollowers} onChange={(e) => setNewFollowers(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50" placeholder="e.g. 50K, 1.2M" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Engagement Rate (%)</label>
                    <input value={newEngagement} onChange={(e) => setNewEngagement(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50" placeholder="e.g. 4.5" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">Bio *</label>
                    <textarea required value={newBio} onChange={(e) => setNewBio(e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 resize-none" placeholder="Tell brands about yourself..." />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Niches *</label>
                    <div className="flex flex-wrap gap-2">
                      {allNiches.map((n) => (
                        <button key={n} type="button" onClick={() => setNewNiche((p) => p.includes(n) ? p.filter(x => x !== n) : [...p, n])}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${newNiche.includes(n) ? 'border-purple/50 bg-purple/10 text-purple' : 'border-gray-700 text-gray-500'}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Platforms *</label>
                    <div className="flex flex-wrap gap-2">
                      {allPlatforms.map((p) => (
                        <button key={p} type="button" onClick={() => setNewPlatforms((prev) => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
                          className={`px-3 py-1 text-xs rounded-full border transition-all capitalize ${newPlatforms.includes(p) ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-gray-700 text-gray-500'}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="submit" className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
                    Create Profile
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="glass rounded-2xl p-6 sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface border border-gray-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50"
                    placeholder="Search creators..."
                  />
                </div>
              </div>

              {/* Niche Filter */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Niche</h3>
                <div className="flex flex-wrap gap-1.5">
                  {allNiches.map((n) => (
                    <button
                      key={n}
                      onClick={() => setSelectedNiches((p) => p.includes(n) ? p.filter(x => x !== n) : [...p, n])}
                      className={`px-2.5 py-1 text-[11px] rounded-full border transition-all ${
                        selectedNiches.includes(n) ? 'border-purple/50 bg-purple/10 text-purple' : 'border-gray-700 text-gray-500 hover:border-gray-600'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Filter */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Platform</h3>
                <div className="flex flex-wrap gap-1.5">
                  {allPlatforms.map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPlatforms((prev) => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
                      className={`px-2.5 py-1 text-[11px] rounded-full border transition-all capitalize ${
                        selectedPlatforms.includes(p) ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-gray-700 text-gray-500 hover:border-gray-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {(selectedNiches.length > 0 || selectedPlatforms.length > 0 || search) && (
                <button
                  onClick={() => { setSelectedNiches([]); setSelectedPlatforms([]); setSearch(''); setFollowerRange('Any'); }}
                  className="text-xs text-pink hover:text-pink/80 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((inf, i) => (
                <InfluencerCard key={inf.id} influencer={inf} onConnect={handleConnect} delay={i * 0.05} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg mb-2">No creators found</p>
                <p className="text-sm">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ApplicationModal
        isOpen={!!modalTarget}
        onClose={() => setModalTarget(null)}
        target={modalTarget}
        type="influencer"
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
}
