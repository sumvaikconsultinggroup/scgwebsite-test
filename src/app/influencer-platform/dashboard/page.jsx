'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { HiPencil, HiTrash, HiCheck, HiX, HiClock, HiEye } from 'react-icons/hi';

export default function DashboardPage() {
  const [tab, setTab] = useState('listings');
  const [influencers, setInfluencers] = useLocalStorage('scg_influencers', []);
  const [campaigns, setCampaigns] = useLocalStorage('scg_campaigns', []);
  const [applications, setApplications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('scg_applications') || '[]');
    setApplications(apps);
    setIsLoaded(true);
  }, []);

  const updateApplicationStatus = (appId, status) => {
    const updated = applications.map((a) => a.id === appId ? { ...a, status } : a);
    setApplications(updated);
    localStorage.setItem('scg_applications', JSON.stringify(updated));
  };

  const deleteInfluencer = (id) => {
    setInfluencers((prev) => prev.filter((i) => i.id !== id));
  };

  const deleteCampaign = (id) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const deleteApplication = (id) => {
    const updated = applications.filter((a) => a.id !== id);
    setApplications(updated);
    localStorage.setItem('scg_applications', JSON.stringify(updated));
  };

  const statusColors = {
    pending: 'text-yellow-400 bg-yellow-400/10',
    accepted: 'text-neon-green bg-neon-green/10',
    declined: 'text-pink bg-pink/10',
  };

  const statusIcons = {
    pending: HiClock,
    accepted: HiCheck,
    declined: HiX,
  };

  // Count user-created items (items with createdAt are user-created)
  const userInfluencers = influencers.filter((i) => i.createdAt);
  const userCampaigns = campaigns.filter((c) => c.createdAt);

  const tabs = [
    { id: 'listings', label: 'My Listings', count: userInfluencers.length + userCampaigns.length },
    { id: 'applications', label: 'Applications', count: applications.length },
  ];

  if (!isLoaded) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20 text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-2">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-sm">Manage your listings and applications</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Influencer Profiles', value: userInfluencers.length, color: 'text-cyan' },
            { label: 'Campaigns', value: userCampaigns.length, color: 'text-purple' },
            { label: 'Applications', value: applications.length, color: 'text-pink' },
            { label: 'Accepted', value: applications.filter((a) => a.status === 'accepted').length, color: 'text-neon-green' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-4 text-center">
              <div className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-800 pb-px">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                tab === t.id ? 'text-cyan' : 'text-gray-500 hover:text-foreground'
              }`}
            >
              {t.label}
              {t.count > 0 && (
                <span className={`ml-2 px-1.5 py-0.5 text-[10px] rounded-full ${
                  tab === t.id ? 'bg-cyan/10 text-cyan' : 'bg-surface text-gray-500'
                }`}>
                  {t.count}
                </span>
              )}
              {tab === t.id && (
                <motion.div
                  layoutId="dashTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {tab === 'listings' && (
            <motion.div
              key="listings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* User Influencer Profiles */}
              {userInfluencers.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Influencer Profiles</h3>
                  <div className="space-y-3">
                    {userInfluencers.map((inf) => (
                      <div key={inf.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {inf.name?.split(' ').map(n => n[0]).join('') || '?'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-foreground text-sm truncate">{inf.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{inf.niche?.join(', ')} · {inf.followers} followers</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteInfluencer(inf.id)}
                          className="p-2 text-gray-500 hover:text-pink transition-colors flex-shrink-0"
                        >
                          <HiTrash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* User Campaigns */}
              {userCampaigns.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Campaigns</h3>
                  <div className="space-y-3">
                    {userCampaigns.map((camp) => (
                      <div key={camp.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {camp.brandName?.charAt(0) || 'B'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-foreground text-sm truncate">{camp.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{camp.brandName} · {camp.budget}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="px-2 py-0.5 text-[10px] text-neon-green bg-neon-green/10 rounded-full">
                            {camp.status || 'active'}
                          </span>
                          <button
                            onClick={() => deleteCampaign(camp.id)}
                            className="p-2 text-gray-500 hover:text-pink transition-colors"
                          >
                            <HiTrash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {userInfluencers.length === 0 && userCampaigns.length === 0 && (
                <div className="text-center py-16 glass rounded-2xl">
                  <p className="text-gray-500 mb-2">No listings yet</p>
                  <p className="text-sm text-gray-600">
                    Create an influencer profile or post a campaign to get started
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {tab === 'applications' && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {applications.length > 0 ? applications.map((app) => {
                const StatusIcon = statusIcons[app.status] || HiClock;
                return (
                  <div key={app.id} className="glass rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full font-medium ${statusColors[app.status]}`}>
                            <StatusIcon size={10} />
                            {app.status}
                          </span>
                          <span className="text-[10px] text-gray-600">
                            {app.type === 'campaign-apply' ? 'Campaign Application' : 'Influencer Connection'}
                          </span>
                        </div>
                        <h4 className="font-bold text-foreground text-sm">{app.applicantName}</h4>
                        <p className="text-xs text-gray-500 mb-2">{app.applicantEmail}</p>
                        <p className="text-sm text-gray-400">{app.message}</p>
                        <p className="text-[10px] text-gray-600 mt-2">
                          {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'accepted')}
                              className="p-2 text-gray-500 hover:text-neon-green transition-colors"
                              title="Accept"
                            >
                              <HiCheck size={16} />
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'declined')}
                              className="p-2 text-gray-500 hover:text-pink transition-colors"
                              title="Decline"
                            >
                              <HiX size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="p-2 text-gray-500 hover:text-pink transition-colors"
                          title="Delete"
                        >
                          <HiTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-16 glass rounded-2xl">
                  <p className="text-gray-500 mb-2">No applications yet</p>
                  <p className="text-sm text-gray-600">
                    Applications will appear here when someone applies to your campaigns or connects with your profile
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
