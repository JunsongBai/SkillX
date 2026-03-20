import React from 'react';
import { Settings, Edit3, Clock, Award, Star, Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '../data/mock';

const ProfilePage: React.FC = () => {
  const user = getCurrentUser();

  // 生成贡献图数据
  const weeks = 26; // 显示26周
  
  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-bg-secondary to-bg-primary px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-text-primary">节点画像</h1>
          <button className="p-2 rounded-lg bg-bg-card text-text-secondary hover:text-text-primary transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="card p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border-4 border-bg-card"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-success rounded-full border-2 border-bg-card flex items-center justify-center">
                <div className="w-2 h-2 bg-bg-primary rounded-full" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">{user.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-accent-primary/10 text-accent-primary rounded text-xs">
                      {user.school}
                    </span>
                    {user.major && (
                      <span className="text-xs text-text-muted">{user.major}</span>
                    )}
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-bg-hover text-text-secondary hover:text-text-primary">
                  <Edit3 size={18} />
                </button>
              </div>

              <p className="text-sm text-text-secondary mt-2">{user.bio}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-primary">{user.projectsCompleted}</div>
              <div className="text-xs text-text-muted mt-1">完成项目</div>
            </div>
            <div className="text-center border-x border-white/5">
              <div className="text-2xl font-bold text-accent-secondary">{user.skillsOffered.length}</div>
              <div className="text-xs text-text-muted mt-1">技能标签</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-accent-warning">
                {user.reputation}
                <Star size={16} className="fill-accent-warning" />
              </div>
              <div className="text-xs text-text-muted mt-1">信誉评分</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="px-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-white" />
              <h3 className="text-sm font-medium text-text-primary">协作贡献图</h3>
            </div>
            <span className="text-xs text-text-muted">近6个月</span>
          </div>
          
          <p className="text-xs text-text-muted mb-4">记录你在项目中的协作活跃度，颜色越深表示当天贡献越多</p>
          
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 min-w-max">
              {Array.from({ length: weeks }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const contribution = user.contributions[weekIndex * 7 + dayIndex];
                    const count = contribution?.count || 0;
                    const date = contribution?.date || '';
                    const dateStr = date ? new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) : '';
                    return (
                      <motion.div
                        key={dayIndex}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: (weekIndex * 7 + dayIndex) * 0.002 }}
                        className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-125 ${
                          count === 0
                            ? 'bg-bg-hover'
                            : count <= 2
                            ? 'bg-white/30'
                            : count <= 4
                            ? 'bg-white/60'
                            : 'bg-white'
                        }`}
                        title={`${dateStr}: ${count} 次协作贡献`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-3 text-xs">
              <span className="text-text-muted">图例说明：</span>
              <div className="flex items-center gap-1">
                <span className="text-text-muted">无贡献</span>
                <div className="w-3 h-3 rounded-sm bg-bg-hover" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-text-muted">低</span>
                <div className="w-3 h-3 rounded-sm bg-white/30" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-text-muted">中</span>
                <div className="w-3 h-3 rounded-sm bg-white/60" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-text-muted">高</span>
                <div className="w-3 h-3 rounded-sm bg-white" />
              </div>
            </div>
            <div className="text-xs text-text-muted">
              总计 {user.contributions.reduce((sum, c) => sum + c.count, 0)} 次贡献
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="px-4 space-y-4">
        {/* Offered Skills */}
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={18} className="text-white" />
            <h3 className="font-medium text-text-primary">可提供的技能</h3>
          </div>
          
          <div className="space-y-3">
            {user.skillsOffered.map((skill) => (
              <div key={skill.id} className="flex items-center gap-3">
                <span className="flex-1 text-text-primary">{skill.name}</span>
                <div className="flex-1 h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{
                      width: skill.level === 'expert' ? '100%' :
                             skill.level === 'advanced' ? '75%' :
                             skill.level === 'intermediate' ? '50%' : '25%'
                    }}
                  />
                </div>
                <span className="text-xs text-text-muted w-16 text-right capitalize">
                  {skill.level === 'expert' ? '专家' :
                   skill.level === 'advanced' ? '熟练' :
                   skill.level === 'intermediate' ? '进阶' : '入门'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wanted Skills */}
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} className="text-white" />
            <h3 className="font-medium text-text-primary">想学习的技能</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1.5 rounded-full text-sm bg-white/10 text-white border border-white/20"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-accent-warning" />
              <span className="text-text-primary">每周可投入时间</span>
            </div>
            <span className="text-2xl font-bold text-accent-primary">{user.availability}h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;