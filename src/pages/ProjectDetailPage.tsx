import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MessageSquare,
  Users,
  Calendar,
  Target,
  ChevronRight,
  Plus,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { mockProjects, getUserById, getCurrentUser } from '../data/mock';
import type { Task } from '../types';
import TaskBoard from '../components/TaskBoard';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [activeTab, setActiveTab] = useState<'info' | 'tasks' | 'members'>('info');

  const project = mockProjects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-muted">项目不存在</div>
      </div>
    );
  }

  const isMember = project.members.includes(currentUser.id);

  const statusConfig = {
    recruiting: { label: '招募中', color: 'bg-white', textColor: 'text-white' },
    'in-progress': { label: '进行中', color: 'bg-yellow-400', textColor: 'text-yellow-400' },
    completed: { label: '已完成', color: 'bg-green-400', textColor: 'text-green-400' },
  };

  const handleJoin = () => {
    // 模拟加入项目
    alert('申请加入项目成功！等待项目Owner审核');
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-text-primary truncate">{project.title}</h1>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs ${statusConfig[project.status].textColor}`}>
                {statusConfig[project.status].label}
              </span>
              <span className="text-xs text-text-muted">进度 {project.progress}%</span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/projects/${project.id}/chat`)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            <MessageSquare size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3">
        <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          {[
            { id: 'info', label: '项目信息', icon: Target },
            { id: 'tasks', label: '任务看板', icon: CheckCircle2 },
            { id: 'members', label: '团队成员', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white text-bg-primary'
                  : 'bg-bg-card text-text-secondary'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {activeTab === 'info' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Description */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-2">项目描述</h3>
              <p className="text-sm text-text-secondary whitespace-pre-wrap">{project.description}</p>
            </div>

            {/* Skills */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-3">所需技能</h3>
              <div className="flex flex-wrap gap-2">
                {project.skillsNeeded.map((skill) => (
                  <span key={skill} className="tag">@{skill}</span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-3">时间线</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">开始：{project.startDate}</span>
                </div>
                {project.endDate && (
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">截止：{project.endDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reward */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-2">项目报酬</h3>
              <p className="text-sm text-text-secondary">{project.reward}</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'tasks' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-text-muted">共 {project.tasks.length} 个任务</span>
              {isMember && (
                <button className="flex items-center gap-1 text-sm text-white bg-white/10 px-3 py-1.5 rounded-lg">
                  <Plus size={16} />
                  添加任务
                </button>
              )}
            </div>
            <TaskBoard
              tasks={project.tasks as Task[]}
              onTaskClick={(_task) => {
                if (isMember) {
                  navigate(`/projects/${project.id}/chat`);
                } else {
                  alert('请先加入项目');
                }
              }}
            />
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {project.members.map((memberId) => {
              const member = getUserById(memberId);
              if (!member) return null;
              return (
                <div
                  key={memberId}
                  className="card p-4 flex items-center gap-3"
                  onClick={() => navigate(`/profile/${memberId}`)}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary">{member.name}</span>
                      {memberId === project.ownerId && (
                        <span className="px-2 py-0.5 bg-white/20 rounded text-xs text-white">Owner</span>
                      )}
                    </div>
                    <span className="text-sm text-text-muted">{member.school}</span>
                  </div>
                  <ChevronRight size={18} className="text-text-muted" />
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Join Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-white/5 px-4 py-4">
        {!isMember ? (
          <button
            onClick={handleJoin}
            disabled={project.status !== 'recruiting'}
            className="w-full btn-primary py-4 disabled:opacity-50"
          >
            {project.status === 'recruiting' ? '申请加入项目' : '项目暂不招募'}
          </button>
        ) : (
          <button
            onClick={() => navigate(`/projects/${project.id}/chat`)}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2"
          >
            <MessageSquare size={20} />
            进入协作空间
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;