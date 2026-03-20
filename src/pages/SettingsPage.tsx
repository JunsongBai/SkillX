import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Bell, Shield, Palette, ChevronRight } from 'lucide-react';
import MarkdownEditor from '../components/MarkdownEditor';
import { getCurrentUser, skillsLibrary } from '../data/mock';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeSection, setActiveSection] = useState<'main' | 'profile' | 'skills' | 'notifications'>('main');
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || '',
    school: user.school,
    major: user.major || '',
    availability: user.availability,
    readme: user.readme || '',
  });

  const handleSave = () => {
    // 模拟保存
    alert('设置已保存！');
    setActiveSection('main');
  };

  // 主菜单
  if (activeSection === 'main') {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5 px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-text-primary">设置</h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-4">
          {/* Profile Settings */}
          <button
            onClick={() => setActiveSection('profile')}
            className="card p-4 w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <User size={20} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-text-primary">个人资料</div>
                <div className="text-sm text-text-muted">编辑基本信息和简介</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-text-muted" />
          </button>

          {/* Skills Settings */}
          <button
            onClick={() => setActiveSection('skills')}
            className="card p-4 w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Palette size={20} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-text-primary">技能管理</div>
                <div className="text-sm text-text-muted">{user.skillsOffered.length} 个技能</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-text-muted" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveSection('notifications')}
            className="card p-4 w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Bell size={20} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-text-primary">通知设置</div>
                <div className="text-sm text-text-muted">管理消息提醒</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-text-muted" />
          </button>

          {/* About */}
          <div className="card p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield size={20} className="text-text-muted" />
              <span className="font-medium text-text-primary">关于 SkillX</span>
            </div>
            <p className="text-sm text-text-muted">版本 1.0.0</p>
            <p className="text-xs text-text-muted mt-1">高校学生技能交换平台</p>
          </div>
        </div>
      </div>
    );
  }

  // Profile Settings
  if (activeSection === 'profile') {
    return (
      <div className="min-h-screen bg-bg-primary pb-24">
        <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5 px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection('main')}
              className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-text-primary">个人资料</h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-4 py-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">昵称</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">学校</label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">专业</label>
            <input
              type="text"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">个人简介</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="input-dark w-full h-24 resize-none"
              placeholder="一句话介绍自己..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">每周可用时间（小时）</label>
            <input
              type="number"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: parseInt(e.target.value) || 0 })}
              className="input-dark w-full"
              min={0}
              max={40}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">个人 README</label>
            <MarkdownEditor
              value={formData.readme}
              onChange={(value) => setFormData({ ...formData, readme: value })}
              placeholder="使用 Markdown 编写详细的个人介绍..."
              height="200px"
            />
          </div>
        </motion.div>

        <div className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-white/5 px-4 py-4">
          <button onClick={handleSave} className="w-full btn-primary py-4">
            保存修改
          </button>
        </div>
      </div>
    );
  }

  // Skills Settings
  if (activeSection === 'skills') {
    return (
      <div className="min-h-screen bg-bg-primary pb-24">
        <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5 px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection('main')}
              className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-text-primary">技能管理</h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-4 py-6"
        >
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">已提供的技能</h3>
            <div className="space-y-3">
              {user.skillsOffered.map((skill) => (
                <div key={skill.id} className="card p-4 flex items-center justify-between">
                  <div>
                    <span className="text-text-primary">{skill.name}</span>
                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded text-xs text-text-muted">
                      {skill.level === 'expert' ? '专家' :
                       skill.level === 'advanced' ? '熟练' :
                       skill.level === 'intermediate' ? '进阶' : '入门'}
                    </span>
                  </div>
                  <button className="text-red-400 text-sm">删除</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-text-primary mb-3">想学习的技能</h3>
            <div className="space-y-3">
              {user.skillsWanted.map((skill) => (
                <div key={skill.id} className="card p-4 flex items-center justify-between">
                  <span className="text-text-primary">{skill.name}</span>
                  <button className="text-red-400 text-sm">删除</button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-text-primary mb-3">添加新技能</h3>
            <div className="flex flex-wrap gap-2">
              {skillsLibrary.slice(0, 10).map((skill) => (
                <button
                  key={skill.id}
                  className="px-3 py-2 bg-bg-card rounded-lg text-sm text-text-secondary hover:bg-white/10"
                >
                  + {skill.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-white/5 px-4 py-4">
          <button onClick={handleSave} className="w-full btn-primary py-4">
            保存修改
          </button>
        </div>
      </div>
    );
  }

  // Notifications Settings
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveSection('main')}
            className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-text-primary">通知设置</h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-4 py-6 space-y-4"
      >
        {[
          { id: 'project', label: '项目邀请', desc: '当有人邀请你加入项目时' },
          { id: 'message', label: '新消息', desc: '协作聊天中的新消息' },
          { id: 'task', label: '任务提醒', desc: '任务截止提醒' },
          { id: 'system', label: '系统通知', desc: '平台公告和更新' },
        ].map((item) => (
          <div key={item.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium text-text-primary">{item.label}</div>
              <div className="text-sm text-text-muted">{item.desc}</div>
            </div>
            <div className="w-12 h-6 bg-white rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-bg-primary rounded-full" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SettingsPage;