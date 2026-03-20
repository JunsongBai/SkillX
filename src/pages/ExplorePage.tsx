import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockUsers } from '../data/mock';

// 技能分类
const skillCategories = [
  { id: 'all', name: '全部' },
  { id: 'dev', name: '开发' },
  { id: 'design', name: '设计' },
  { id: 'business', name: '商业' },
  { id: 'academic', name: '学术' },
  { id: 'other', name: '其他' },
];

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 过滤用户
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.school.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-text-primary mb-4">技能广场</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="搜索技能、学校、姓名..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-dark w-full pl-12 pr-4 py-3"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-accent-primary text-bg-primary'
                    : 'bg-bg-card text-text-secondary hover:bg-bg-hover'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="px-4 py-4 space-y-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card card-hover p-4 cursor-pointer"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-white/10"
                />
                {user.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-accent-success rounded-full border-2 border-bg-card" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-text-primary truncate">{user.name}</h3>
                  <span className="px-2 py-0.5 bg-bg-hover rounded text-xs text-text-secondary">
                    {user.school}
                  </span>
                </div>

                <p className="text-sm text-text-secondary line-clamp-1 mb-2">{user.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {user.skillsOffered.slice(0, 4).map(skill => (
                    <span key={skill.id} className="tag text-xs">{skill.name}</span>
                  ))}
                  {user.skillsOffered.length > 4 && (
                    <span className="text-xs text-text-muted">+{user.skillsOffered.length - 4}</span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    ⭐ {user.reputation.toFixed(1)}
                  </span>
                  <span>{user.projectsCompleted} 个项目</span>
                  <span>每周 {user.availability}h</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;