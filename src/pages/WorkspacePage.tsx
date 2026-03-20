import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, CheckCircle2, Circle, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockProjects, mockUsers, getUserById, getCurrentUser } from '../data/mock';

const WorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  // 获取当前用户参与的项目
  const myProjects = mockProjects.filter(p => 
    p.members.includes(currentUser.id) || p.ownerId === currentUser.id
  );

  // 统计
  const pendingTasks = myProjects.reduce((acc, p) => 
    acc + p.tasks.filter(t => t.status === 'todo' && t.assignee === currentUser.id).length, 0
  );

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-text-primary mb-4">协作终端</h1>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="card p-3">
              <div className="text-2xl font-bold text-white">{myProjects.length}</div>
              <div className="text-xs text-text-muted">进行中的项目</div>
            </div>
            <div className="card p-3">
              <div className="text-2xl font-bold text-yellow-400">{pendingTasks}</div>
              <div className="text-xs text-text-muted">待处理任务</div>
            </div>
            <div className="card p-3">
              <div className="text-2xl font-bold text-gray-400">3</div>
              <div className="text-xs text-text-muted">未读消息</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="px-4 py-4">
        <h2 className="text-sm font-medium text-text-secondary mb-3">我的协作项目</h2>
        
        <div className="space-y-3">
          {myProjects.map((project, index) => {
            const completedTasks = project.tasks.filter(t => t.status === 'done').length;
            const totalTasks = project.tasks.length;
            const hasUnread = index === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/projects/${project.id}/chat`)}
                className={`card p-4 cursor-pointer ${
                  hasUnread ? 'border-white/30 shadow-glow' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-text-primary">{project.title}</h3>
                      {hasUnread && (
                        <span className="px-2 py-0.5 bg-white text-bg-primary rounded-full text-xs font-medium">
                          新消息
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> 2小时前更新
                      </span>
                      <span>{completedTasks}/{totalTasks} 任务</span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </div>

                {/* Progress */}
                <div className="mt-3">
                  <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                  <div className="flex -space-x-1.5">
                    {project.members.slice(0, 3).map((memberId) => {
                      const member = getUserById(memberId);
                      return member ? (
                        <img
                          key={memberId}
                          src={member.avatar}
                          alt={member.name}
                          className="w-6 h-6 rounded-full border border-bg-card"
                        />
                      ) : null;
                    })}
                  </div>
                  <span className="text-xs text-text-muted">最近：前端框架选型讨论</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Partners */}
      <div className="px-4">
        <h2 className="text-sm font-medium text-text-secondary mb-3">最近协作伙伴</h2>
        
        <div className="card p-4">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {mockUsers.filter(u => u.id !== currentUser.id).slice(0, 5).map((user) => (
              <div key={user.id} className="flex flex-col items-center gap-2 min-w-[64px]">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-bg-hover"
                />
                <span className="text-xs text-text-secondary truncate max-w-[64px]">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Overview */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-medium text-text-secondary mb-3">任务概览</h2>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-3 text-center">
            <Circle className="w-5 h-5 text-text-muted mx-auto mb-1" />
            <div className="text-lg font-semibold text-text-primary">2</div>
            <div className="text-xs text-text-muted">待办</div>
          </div>
          <div className="card p-3 text-center">
            <Play className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <div className="text-lg font-semibold text-text-primary">3</div>
            <div className="text-xs text-text-muted">进行中</div>
          </div>
          <div className="card p-3 text-center">
            <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <div className="text-lg font-semibold text-text-primary">8</div>
            <div className="text-xs text-text-muted">已完成</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;