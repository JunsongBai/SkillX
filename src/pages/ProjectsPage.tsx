import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronRight, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockProjects, getUserById } from '../data/mock';

const statusConfig = {
  recruiting: { label: '招募中', color: 'bg-white', bgColor: 'bg-white/10', textColor: 'text-white' },
  'in-progress': { label: '进行中', color: 'bg-yellow-400', bgColor: 'bg-yellow-400/10', textColor: 'text-yellow-400' },
  completed: { label: '已完成', color: 'bg-green-400', bgColor: 'bg-green-400/10', textColor: 'text-green-400' },
};

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'recruiting' | 'in-progress' | 'completed'>('recruiting');

  const filteredProjects = mockProjects.filter(p => p.status === activeTab);

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-text-primary">项目实验室</h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/projects/new')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-bg-primary rounded-lg font-medium text-sm"
            >
              <Plus size={18} />
              发布项目
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === status
                    ? 'bg-bg-card text-text-primary border border-white/10'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {statusConfig[status].label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === status ? statusConfig[status].bgColor + ' ' + statusConfig[status].textColor : 'bg-bg-hover text-text-muted'
                }`}>
                  {mockProjects.filter(p => p.status === status).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="px-4 py-4 space-y-4">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="card card-hover overflow-hidden cursor-pointer"
          >
            {/* Status Bar */}
            <div className={`h-1 ${statusConfig[project.status].color}`} />
            
            <div className="p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      statusConfig[project.status].bgColor + ' ' + statusConfig[project.status].textColor
                    }`}>
                      {statusConfig[project.status].label}
                    </span>
                    <span className="text-xs text-text-muted">
                      {project.startDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted shrink-0" />
              </div>

              <p className="text-sm text-text-secondary line-clamp-2 mb-4">{project.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.skillsNeeded.map(skill => (
                  <span key={skill} className="tag text-xs">
                    @{skill}
                  </span>
                ))}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-text-secondary">项目进度</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {project.members.length} 人
                  </span>
                  <span className="flex items-center gap-1">
                    <Target size={14} /> {project.tasks.length} 个任务
                  </span>
                </div>
                <span className="text-white">{project.reward}</span>
              </div>

              {/* Members Avatar */}
              <div className="flex items-center mt-3 pt-3 border-t border-white/5">
                <div className="flex -space-x-2">
                  {project.members.map((memberId, i) => {
                    const member = getUserById(memberId);
                    return member ? (
                      <img
                        key={memberId}
                        src={member.avatar}
                        alt={member.name}
                        className="w-7 h-7 rounded-full border-2 border-bg-card"
                        style={{ zIndex: project.members.length - i }}
                      />
                    ) : null;
                  })}
                </div>
                <span className="ml-3 text-xs text-text-muted">
                  {project.members.map(id => getUserById(id)?.name).filter(Boolean).join(', ')}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;