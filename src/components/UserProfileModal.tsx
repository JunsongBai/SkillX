import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Briefcase, Award, Clock } from 'lucide-react';
import type { User } from '../types';

interface UserProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto"
          >
            <div className="bg-bg-primary rounded-t-3xl border-t border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto">
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-2" onClick={onClose}>
                <div className="w-10 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-bg-card text-text-muted hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="px-6 pb-8">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full border-4 border-bg-card"
                    />
                    {user.isOnline && (
                      <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-bg-primary" />
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-text-primary mb-1">{user.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-text-secondary">
                      {user.school}
                    </span>
                    {user.major && (
                      <span className="text-sm text-text-muted">{user.major}</span>
                    )}
                  </div>

                  <p className="text-text-secondary">{user.bio}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="card p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-white mb-1">
                      {user.reputation}
                      <Star size={16} className="text-yellow-400" />
                    </div>
                    <div className="text-xs text-text-muted">信誉评分</div>
                  </div>

                  <div className="card p-3 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{user.projectsCompleted}</div>
                    <div className="text-xs text-text-muted">完成项目</div>
                  </div>

                  <div className="card p-3 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{user.availability}h</div>
                    <div className="text-xs text-text-muted">每周可用</div>
                  </div>
                </div>

                {/* Skills Offered */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={18} className="text-white" />
                    <h3 className="font-semibold text-text-primary">可提供的技能</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill) => (
                      <span key={skill.id} className="tag">{skill.name}</span>
                    ))}
                  </div>
                </div>

                {/* Skills Wanted */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={18} className="text-white" />
                    <h3 className="font-semibold text-text-primary">想学习的技能</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill) => (
                      <span key={skill.id} className="px-3 py-1 rounded-full text-sm bg-white/5 text-text-secondary border border-white/10">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* README Preview */}
                {user.readme && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={18} className="text-white" />
                      <h3 className="font-semibold text-text-primary">个人介绍</h3>
                    </div>
                    <div className="card p-4 text-sm text-text-secondary whitespace-pre-line">
                      {user.readme}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button className="w-full btn-primary py-4 text-lg">
                  发起协作
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserProfileModal;