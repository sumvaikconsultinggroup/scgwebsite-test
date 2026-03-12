'use client';
import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter } from 'react-icons/fa';

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  twitter: FaTwitter,
};

export default function CampaignCard({ campaign, onApply, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-white font-bold text-sm">
          {campaign.brandName?.charAt(0) || 'B'}
        </div>
        <div>
          <h4 className="font-bold text-foreground text-sm">{campaign.brandName}</h4>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
            campaign.status === 'active' ? 'text-neon-green bg-neon-green/10' : 'text-gray-500 bg-gray-500/10'
          }`}>
            {campaign.status || 'active'}
          </span>
        </div>
      </div>

      <h3 className="font-bold text-foreground mb-2">{campaign.title}</h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{campaign.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Budget</span>
          <span className="text-cyan font-medium">{campaign.budget}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Niche</span>
          <div className="flex gap-1">
            {campaign.niche?.map((n) => (
              <span key={n} className="px-2 py-0.5 text-[10px] text-purple bg-purple/10 rounded-full">{n}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Platforms</span>
          <div className="flex gap-1.5">
            {campaign.platforms?.map((p) => {
              const Icon = platformIcons[p];
              return Icon ? <Icon key={p} size={12} className="text-gray-400" /> : null;
            })}
          </div>
        </div>
      </div>

      {campaign.requirements && (
        <p className="text-xs text-gray-500 mb-4 italic">{campaign.requirements}</p>
      )}

      <button
        onClick={() => onApply?.(campaign)}
        className="w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-purple to-pink text-white rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
      >
        Apply Now
      </button>
    </motion.div>
  );
}
