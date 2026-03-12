'use client';
import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
};

const platformColors = {
  instagram: '#E1306C',
  tiktok: '#00f2ea',
  youtube: '#FF0000',
  twitter: '#1DA1F2',
  linkedin: '#0077B5',
};

export default function InfluencerCard({ influencer, onConnect, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-6 group"
    >
      <div className="text-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink to-purple mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
          {influencer.name.split(' ').map(n => n[0]).join('')}
        </div>
        <h3 className="font-bold text-foreground">{influencer.name}</h3>
        <p className="text-xs text-gray-500">{influencer.location || 'Worldwide'}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1 mb-4">
        {influencer.niche?.map((n) => (
          <span key={n} className="px-2 py-0.5 text-[10px] font-medium text-purple bg-purple/10 border border-purple/20 rounded-full">
            {n}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        {influencer.platforms?.map((p) => {
          const Icon = platformIcons[p];
          return Icon ? <Icon key={p} style={{ color: platformColors[p] }} size={14} /> : null;
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-surface rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-cyan">{influencer.followers}</div>
          <div className="text-[10px] text-gray-500">Followers</div>
        </div>
        <div className="bg-surface rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-purple">{influencer.engagementRate}%</div>
          <div className="text-[10px] text-gray-500">Engagement</div>
        </div>
      </div>

      {influencer.bio && (
        <p className="text-xs text-gray-400 mb-4 line-clamp-2">{influencer.bio}</p>
      )}

      <button
        onClick={() => onConnect?.(influencer)}
        className="w-full py-2 text-sm font-medium border border-cyan/30 text-cyan rounded-lg hover:bg-cyan/10 transition-all"
      >
        Connect
      </button>
    </motion.div>
  );
}
