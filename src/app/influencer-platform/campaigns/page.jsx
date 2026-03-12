'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CampaignCard from '@/components/influencer/CampaignCard';
import ApplicationModal from '@/components/influencer/ApplicationModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { HiSearch, HiPlus, HiX } from 'react-icons/hi';

const defaultCampaigns = [
  { id: 'camp-1', brandName: 'NovaSkin', title: 'Summer Glow Collection Launch', description: 'Looking for beauty creators to showcase our new summer skincare line. Must create 1 Reel + 2 Stories featuring the products with honest reviews.', budget: '$5,000 - $10,000', platforms: ['instagram', 'tiktok'], niche: ['Beauty'], requirements: 'Min 50K followers, beauty niche, 3%+ engagement', status: 'active' },
  { id: 'camp-2', brandName: 'FitPro', title: 'New Year Fitness Challenge', description: 'Join our 30-day fitness challenge campaign! Create workout content featuring our app and equipment. Weekly content required.', budget: '$3,000 - $7,000', platforms: ['instagram', 'youtube', 'tiktok'], niche: ['Fitness', 'Wellness'], requirements: 'Min 25K followers, fitness creators', status: 'active' },
  { id: 'camp-3', brandName: 'TechWave', title: 'Gadget Review Program', description: 'Review our latest smart home devices. We ship products for free. Create honest, detailed review videos for your audience.', budget: '$2,000 - $5,000', platforms: ['youtube'], niche: ['Tech'], requirements: 'Min 10K subs on YouTube, tech review channel', status: 'active' },
  { id: 'camp-4', brandName: 'WanderLust', title: 'Travel Photography Series', description: 'Capture stunning travel photos featuring our luggage and travel accessories. 6-month partnership with quarterly deliverables.', budget: '$8,000 - $15,000', platforms: ['instagram'], niche: ['Travel', 'Photography'], requirements: 'Min 100K followers, travel photography focus', status: 'active' },
  { id: 'camp-5', brandName: 'GreenBite', title: 'Plant-Based Recipe Collab', description: 'Create 4 recipe videos using our plant-based products. Fun, engaging, and delicious content for food-loving audiences.', budget: '$1,500 - $4,000', platforms: ['tiktok', 'instagram'], niche: ['Food'], requirements: 'Food creators with 20K+ followers', status: 'active' },
  { id: 'camp-6', brandName: 'StyleDrop', title: 'Street Style Lookbook', description: 'Style 5 outfits from our new collection and create a trending lookbook video. Bonus for viral content!', budget: '$3,000 - $8,000', platforms: ['instagram', 'tiktok'], niche: ['Fashion'], requirements: 'Fashion creators, 30K+ followers, strong aesthetic', status: 'active' },
];

const allNiches = ['Beauty', 'Fashion', 'Tech', 'Gaming', 'Fitness', 'Wellness', 'Food', 'Lifestyle', 'Travel', 'Photography', 'Business', 'Education', 'Sports'];
const allPlatforms = ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin'];

export default function BrowseCampaignsPage() {
  const [campaigns, setCampaigns] = useLocalStorage('scg_campaigns', defaultCampaigns);
  const [search, setSearch] = useState('');
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [modalTarget, setModalTarget] = useState(null);

  // Create form
  const [form, setForm] = useState({
    brandName: '', title: '', description: '', budget: '', requirements: '',
    platforms: [], niche: [],
  });

  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.brandName?.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedNiches.length > 0 && !selectedNiches.some((n) => c.niche?.includes(n))) return false;
      return true;
    });
  }, [campaigns, search, selectedNiches]);

  const handleCreate = (e) => {
    e.preventDefault();
    const newCampaign = {
      ...form,
      id: `camp-${Date.now()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    setShowCreateForm(false);
    setForm({ brandName: '', title: '', description: '', budget: '', requirements: '', platforms: [], niche: [] });
  };

  const handleApply = (campaign) => {
    setModalTarget(campaign);
  };

  const handleApplicationSubmit = (data) => {
    const apps = JSON.parse(localStorage.getItem('scg_applications') || '[]');
    apps.push({
      id: `app-${Date.now()}`,
      type: 'campaign-apply',
      campaignId: data.targetId,
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
              Browse <span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent">Campaigns</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm"
            >
              {filtered.length} active campaigns
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
          >
            <HiPlus /> Post a Campaign
          </motion.button>
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
              <form onSubmit={handleCreate} className="rounded-2xl p-8 border border-gray-800 bg-surface-light">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-foreground">Post a Campaign</h2>
                  <button type="button" onClick={() => setShowCreateForm(false)} className="text-gray-500 hover:text-foreground transition-colors">
                    <HiX size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Brand Name *</label>
                    <input required value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} className="w-full px-4 py-2.5 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Campaign Title *</label>
                    <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Budget Range *</label>
                    <input required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full px-4 py-2.5 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all" placeholder="e.g. $3,000 - $5,000" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Requirements</label>
                    <input value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className="w-full px-4 py-2.5 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all" placeholder="Min followers, niche, etc." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">Description *</label>
                    <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Target Niches *</label>
                    <div className="flex flex-wrap gap-2">
                      {allNiches.map((n) => (
                        <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, niche: f.niche.includes(n) ? f.niche.filter(x => x !== n) : [...f.niche, n] }))}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${form.niche.includes(n) ? 'border-purple/50 bg-purple/10 text-purple' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Platforms *</label>
                    <div className="flex flex-wrap gap-2">
                      {allPlatforms.map((p) => (
                        <button key={p} type="button" onClick={() => setForm((f) => ({ ...f, platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p] }))}
                          className={`px-3 py-1 text-xs rounded-full border transition-all capitalize ${form.platforms.includes(p) ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="submit" className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
                    Publish Campaign
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters + Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-gray-800 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan/50 transition-all"
              placeholder="Search campaigns..."
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allNiches.slice(0, 8).map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNiches((p) => p.includes(n) ? p.filter(x => x !== n) : [...p, n])}
                className={`px-2.5 py-1 text-[11px] rounded-full border transition-all ${
                  selectedNiches.includes(n) ? 'border-purple/50 bg-purple/10 text-purple' : 'border-gray-800 text-gray-500 hover:border-gray-600'
                }`}
              >
                {n}
              </button>
            ))}
            {selectedNiches.length > 0 && (
              <button
                onClick={() => setSelectedNiches([])}
                className="px-2.5 py-1 text-[11px] text-pink hover:text-pink/80 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((campaign, i) => (
            <CampaignCard key={campaign.id} campaign={campaign} onApply={handleApply} delay={i * 0.05} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500 rounded-2xl border border-gray-800 bg-surface/30">
            <p className="text-lg mb-2">No campaigns found</p>
            <p className="text-sm">Try adjusting your filters or post a new campaign!</p>
          </div>
        )}
      </div>

      <ApplicationModal
        isOpen={!!modalTarget}
        onClose={() => setModalTarget(null)}
        target={modalTarget}
        type="campaign"
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
}
