import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, CheckCircle2, Circle, Play, X, MessageSquare, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProjects, mockUsers, getUserById, getCurrentUser } from '../data/mock';
import type { Task } from '../types';

const WorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [activeModal, setActiveModal] = useState<'projects' | 'tasks' | 'messages' | null>(null);
  
  // 获取当前用户参与的项目
  const myProjects = mockProjects.filter(p => 
    p.members.includes(currentUser.id) || p.ownerId === currentUser.id
  );

  // 统计
  const pendingTasks = myProjects.flatMap(p => 
    p.tasks.filter(t => t.status === 'todo')
  ) as Task[];
  
  const unreadMessages = [
    { id: '1', project: '学术写作辅助工具', message: '前端框架选型讨论', time: '10分钟前' },
    { id: '2', project: '学生技能交换平台', message: 'UI设计稿已更新', time: '30分钟前' },
    { id: '3', project: '校园碳中和', message: '数据收集进度汇报', time: '1小时前' },
  ];

  const taskStats = {
    todo: myProjects.flatMap(p => p.tasks.filter(t => t.status === 'todo')).length,
    inProgress: myProjects.flatMap(p => p.tasks.filter(t => t.status === 'in-progress')).length,
    done: myProjects.flatMap(p => p.tasks.filter(t => t.status === 'done')).length,
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-text-primary mb-4">协作终端</h1>

          {/* Quick Stats - 可点击 */}
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => setActiveModal('projects')}
              className="card p-3 text-left hover:bg-bg-hover transition-colors"
            >
              <div className="text-2xl font-bold text-white">{myProjects.length}</div>
              <div className="text-xs text-text-muted">进行中的项目</div>
            </button>
            
            <button 
              onClick={() => setActiveModal('tasks')}
              className="card p-3 text-left hover:bg-bg-hover transition-colors"
            >
              <div className="text-2xl font-bold text-yellow-400">{pendingTasks.length}</div>
              <div className="text-xs text-text-muted">待处理任务</div>
            </button>
            
            <button 
              onClick={() => setActiveModal('messages')}
              className="card p-3 text-left hover:bg-bg-hover transition-colors relative"
            >
              <div className="text-2xl font-bold text-gray-400">{unreadMessages.length}</div>
              <div className="text-xs text-text-muted">未读消息</div>
              {unreadMessages.length > 0 && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
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
              <div 
                key={user.id} 
                className="flex flex-col items-center gap-2 min-w-[64px] cursor-pointer"
                onClick={() => navigate(`/profile`)}
              >
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
            <div className="text-lg font-semibold text-text-primary">{taskStats.todo}</div>
            <div className="text-xs text-text-muted">待办</div>
          </div>
          <div className="card p-3 text-center">
            <Play className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <div className="text-lg font-semibold text-text-primary">{taskStats.inProgress}</div>
            <div className="text-xs text-text-muted">进行中</div>
          </div>
          <div className="card p-3 text-center">
            <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <div className="text-lg font-semibold text-text-primary">{taskStats.done}</div>
            <div className="text-xs text-text-muted">已完成</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'projects' && (
          <Modal title="进行中的项目" onClose={() => setActiveModal(null)}>
            <div className="space-y-3">
              {myProjects.map(project => (
                <div 
                  key={project.id}
                  onClick={() => {
                    setActiveModal(null);
                    navigate(`/projects/${project.id}`);
                  }}
                  className="card p-3 cursor-pointer"
                >
                  <div className="font-medium text-text-primary">{project.title}</div>
                  <div className="text-sm text-text-muted">进度 {project.progress}% · {project.members.length} 人参与</div>
                </div>
              ))}
            </div>
          </Modal>
        )}

        {activeModal === 'tasks' && (
          <Modal title="待处理任务" onClose={() => setActiveModal(null)}>
            <div className="space-y-3">
              {pendingTasks.length > 0 ? pendingTasks.map((task, idx) => (
                <div 
                  key={idx}
                  className="card p-3 cursor-pointer"
                  onClick={() => {
                    setActiveModal(null);
                    navigate(`/projects/p1/chat`);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-yellow-400" />
                    <span className="font-medium text-text-primary">{task.title}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {task.skills.map(skill => (
                      <span key={skill} className="tag text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="text-center text-text-muted py-8">暂无待处理任务</div>
              )}
            </div>
          </Modal>
        )}

        {activeModal === 'messages' && (
          <Modal title="未读消息" onClose={() => setActiveModal(null)}>
            <div className="space-y-3">
              {unreadMessages.map(msg => (
                <div 
                  key={msg.id}
                  className="card p-3 cursor-pointer"
                  onClick={() => {
                    setActiveModal(null);
                    navigate(`/projects/p1/chat`);
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare size={16} className="text-white" />
                    <span className="font-medium text-text-primary">{msg.project}</span>
                    <span className="text-xs text-text-muted ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{msg.message}</p>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal 组件
const Modal: React.FC<{ title: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
    />
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto"
    >
      <div className="bg-bg-primary rounded-t-3xl border-t border-white/10 shadow-2xl max-h-[70vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-bg-card text-text-muted hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(70vh-72px)]">
          {children}
        </div>
      </div>
    </motion.div>
  </>
);

export default WorkspacePage;