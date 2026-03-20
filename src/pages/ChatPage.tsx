import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MoreHorizontal,
  Send,
  Paperclip,
  CheckSquare,
  Code,
  Bold,
  ListTodo,
} from 'lucide-react';
import { mockProjects, mockUsers, getUserById, getCurrentUser } from '../data/mock';
import type { Task } from '../types';

const ChatPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const project = mockProjects.find((p) => p.id === projectId);
  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: project?.ownerId,
      content: '项目启动，大家有什么想法？',
      type: 'text',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      senderId: currentUser.id,
      content: '我觉得可以先确定技术栈',
      type: 'text',
      timestamp: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: '3',
      senderId: 'system',
      content: '@前端开发 创建了一个新任务',
      type: 'system',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: inputText,
      type: 'text',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return '今天';
    if (date.toDateString() === yesterday.toDateString()) return '昨天';
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-muted">项目不存在</div>
      </div>
    );
  }

  const quickActions = [
    { icon: CheckSquare, label: '/todo', action: () => setInputText('/todo ') },
    { icon: ListTodo, label: '/done', action: () => setInputText('/done ') },
    { icon: Code, label: '/code', action: () => setInputText('```\n\n```') },
  ];

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-text-primary truncate">{project.title}</h1>
            <p className="text-xs text-text-muted">{project.members.length} 人参与 · 进度 {project.progress}%</p>
          </div>

          <button className="p-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Task Checklist */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="card p-3">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare size={16} className="text-white" />
            <span className="text-sm font-medium text-text-primary">任务清单</span>
            <span className="ml-auto text-xs text-text-muted">
              {project.tasks.filter((t) => t.status === 'done').length}/{project.tasks.length}
            </span>
          </div>

          <div className="space-y-2">
            {project.tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                    task.status === 'done'
                      ? 'bg-green-500 border-green-500'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  {task.status === 'done' && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <span
                  className={`text-sm ${
                    task.status === 'done' ? 'text-text-muted line-through' : 'text-text-primary'
                  }`}
                >
                  {task.title}
                </span>
              </div>
            ))}
            {project.tasks.length > 3 && (
              <div className="text-xs text-text-muted pl-6">+{project.tasks.length - 3} 个任务</div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message, index) => {
          const sender = getUserById(message.senderId || '');
          const isMe = message.senderId === currentUser.id;
          const isSystem = message.senderId === 'system';

          // 显示日期分割线
          const showDate =
            index === 0 ||
            formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

          return (
            <div key={message.id}>
              {showDate && (
                <div className="flex items-center justify-center my-4">
                  <span className="text-xs text-text-muted px-3 py-1 bg-bg-card rounded-full">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}

              {isSystem ? (
                <div className="flex items-center justify-center my-2">
                  <span className="text-xs text-text-muted bg-bg-card px-3 py-1.5 rounded-lg">
                    {message.content}
                  </span>
                </div>
              ) : (
                <div className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <img
                    src={sender?.avatar}
                    alt={sender?.name}
                    className="w-8 h-8 rounded-full border border-white/10"
                  />

                  <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    <span className="text-xs text-text-muted mb-1">{sender?.name}</span>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`px-4 py-2.5 rounded-2xl text-sm ${
                        isMe
                          ? 'bg-white text-bg-primary rounded-tr-sm'
                          : 'bg-bg-card text-text-primary rounded-tl-sm'
                      }`}
                    >
                      {message.content}
                    </motion.div>

                    <span className="text-xs text-text-muted mt-1">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/5 bg-bg-primary px-4 py-3 pb-safe">
        <div className="card p-2">
          {/* Quick Actions */}
          {showQuickActions && (
            <div className="flex gap-2 px-2 py-2 border-b border-white/5 mb-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    action.action();
                    setShowQuickActions(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-secondary text-xs text-text-secondary hover:text-white transition-colors"
                >
                  <action.icon size={14} />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
            >
              <Bold size={18} />
            </button>

            <button className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors">
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="输入消息..."
              className="flex-1 bg-transparent text-text-primary placeholder-text-muted focus:outline-none text-sm"
            />

            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-2 rounded-lg bg-white text-bg-primary disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;