'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPlus, HiUserGroup, HiTrash, HiMail, HiShieldCheck, HiPencil } from 'react-icons/hi';

export default function TeamPanel({ onClose, session, onTeamSelect }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteTeamId, setInviteTeamId] = useState(null);
  const [inviteRole, setInviteRole] = useState('editor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setTeams(data.teams || []);
    } catch { /* empty */ }
    setLoading(false);
  };

  const createTeam = async () => {
    if (!newTeamName.trim()) return;
    setError('');
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTeamName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setTeams((prev) => [data.team, ...prev]);
      setNewTeamName('');
      setShowCreate(false);
      setSuccess('Team created!');
      setTimeout(() => setSuccess(''), 2000);
    } catch { setError('Failed to create team'); }
  };

  const inviteMember = async () => {
    if (!inviteEmail.trim() || !inviteTeamId) return;
    setError('');
    try {
      const res = await fetch(`/api/team/${inviteTeamId}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail.trim(), role: inviteRole }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setInviteEmail('');
      setInviteTeamId(null);
      setSuccess('Member invited!');
      setTimeout(() => setSuccess(''), 2000);
      fetchTeams();
    } catch { setError('Failed to invite member'); }
  };

  const removeMember = async (teamId, userId) => {
    try {
      await fetch(`/api/team/${teamId}/invite?userId=${userId}`, { method: 'DELETE' });
      fetchTeams();
    } catch { /* empty */ }
  };

  const deleteTeam = async (teamId) => {
    try {
      await fetch(`/api/team/${teamId}`, { method: 'DELETE' });
      setTeams((prev) => prev.filter((t) => t.id !== teamId));
    } catch { /* empty */ }
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl border border-gray-800 bg-background p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HiUserGroup className="text-purple" size={20} />
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-foreground">Team Collaboration</h3>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-foreground rounded-lg hover:bg-surface transition-all"><HiX size={18} /></button>
        </div>

        {error && <div className="text-sm text-pink bg-pink/10 border border-pink/20 rounded-xl px-4 py-2.5 mb-4">{error}</div>}
        {success && <div className="text-sm text-neon-green bg-neon-green/10 border border-neon-green/20 rounded-xl px-4 py-2.5 mb-4">{success}</div>}

        {/* Create team */}
        {!showCreate ? (
          <button onClick={() => setShowCreate(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-6 text-sm text-cyan border border-dashed border-cyan/30 rounded-xl hover:bg-cyan/5 transition-all">
            <HiPlus size={16} /> Create New Team
          </button>
        ) : (
          <div className="p-4 rounded-xl border border-gray-800 bg-surface/30 mb-6 space-y-3">
            <input type="text" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="Team name"
              className="w-full px-4 py-2.5 bg-surface border border-gray-800 rounded-lg text-foreground text-sm placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-all" />
            <div className="flex gap-2">
              <button onClick={createTeam} className="flex-1 px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan to-purple text-background rounded-lg transition-all">Create</button>
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm text-gray-400 border border-gray-800 rounded-lg hover:text-foreground transition-all">Cancel</button>
            </div>
          </div>
        )}

        {/* Team list */}
        {loading ? (
          <div className="text-center py-8 text-gray-500 text-sm">Loading teams...</div>
        ) : teams.length === 0 ? (
          <div className="text-center py-8">
            <HiUserGroup className="mx-auto text-gray-700 mb-2" size={32} />
            <p className="text-sm text-gray-500">No teams yet. Create one to start collaborating.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {teams.map((team) => {
              const isOwner = team.ownerId === session?.user?.id || team.owner?.email === session?.user?.email;
              return (
                <div key={team.id} className="rounded-xl border border-gray-800 bg-surface/30 overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <div className="text-sm font-bold text-foreground flex items-center gap-2">
                        {team.name}
                        {isOwner && <span className="text-[9px] text-cyan bg-cyan/10 px-1.5 py-0.5 rounded font-medium">Owner</span>}
                      </div>
                      <div className="text-[10px] text-gray-600 mt-0.5">
                        {team.members?.length || 0} member{team.members?.length !== 1 ? 's' : ''} &middot; {team._count?.calendars || 0} calendar{team._count?.calendars !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {onTeamSelect && (
                        <button onClick={() => { onTeamSelect(team.id); onClose(); }}
                          className="px-3 py-1.5 text-xs text-cyan border border-cyan/30 rounded-lg hover:bg-cyan/10 transition-all">Use</button>
                      )}
                      {isOwner && (
                        <button onClick={() => deleteTeam(team.id)}
                          className="p-1.5 text-gray-500 hover:text-pink transition-colors"><HiTrash size={14} /></button>
                      )}
                    </div>
                  </div>

                  {/* Members */}
                  <div className="border-t border-gray-800 px-4 py-3">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2">Members</div>
                    <div className="space-y-1.5">
                      {team.members?.map((m) => (
                        <div key={m.user.id} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-surface border border-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                              {m.user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="text-xs text-foreground">{m.user.name}</span>
                              <span className="text-[10px] text-gray-600 ml-1.5">{m.role}</span>
                            </div>
                          </div>
                          {isOwner && m.user.id !== session?.user?.id && (
                            <button onClick={() => removeMember(team.id, m.user.id)}
                              className="text-gray-600 hover:text-pink text-[10px] transition-colors">Remove</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invite */}
                  {isOwner && (
                    <div className="border-t border-gray-800 px-4 py-3">
                      {inviteTeamId === team.id ? (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="user@email.com"
                              className="flex-1 px-3 py-2 bg-surface border border-gray-800 rounded-lg text-foreground text-xs placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-all" />
                            <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}
                              className="px-2 py-2 bg-surface border border-gray-800 rounded-lg text-foreground text-xs focus:outline-none">
                              <option value="editor">Editor</option>
                              <option value="viewer">Viewer</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={inviteMember} className="flex-1 px-3 py-1.5 text-xs font-medium bg-cyan/10 text-cyan border border-cyan/30 rounded-lg hover:bg-cyan/20 transition-all">Send Invite</button>
                            <button onClick={() => setInviteTeamId(null)} className="px-3 py-1.5 text-xs text-gray-400 border border-gray-800 rounded-lg transition-all">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setInviteTeamId(team.id)}
                          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan transition-colors">
                          <HiMail size={12} /> Invite Member
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
