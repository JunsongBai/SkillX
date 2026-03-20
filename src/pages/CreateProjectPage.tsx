import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X, Calendar, Tag, Users, ChevronRight } from 'lucide-react';
import MarkdownEditor from '../components/MarkdownEditor';
import { skillsLibrary } from '../data/mock';

const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsNeeded: [] as string[],
    startDate: '',
    endDate: '',
    reward: '',
    tasks: [] as { title: string; description: string; skills: string[] }[],
  });
  const [newSkill, setNewSkill] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', skills: [] as string[] });

  const handleAddSkill = () => {
    if (newSkill && !formData.skillsNeeded.includes(newSkill)) {
      setFormData({ ...formData, skillsNeeded: [...formData.skillsNeeded, newSkill] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skillsNeeded: formData.skillsNeeded.filter(s => s !== skill) });
  };

  const handleAddTask = () => {
    if (newTask.title) {
      setFormData({ ...formData, tasks: [...formData.tasks, newTask] });
      setNewTask({ title: '', description: '', skills: [] });
    }
  };

  const handleSubmit = () => {
    // 模拟提交
    console.log('Creating project:', formData);
    // 跳转到项目列表
    navigate('/projects');
  };

  const steps = [
    { id: 1, title: '基本信息', description: '填写项目名称和描述' },
    { id: 2, title: '技能需求', description: '选择需要的技能' },
    { id: 3, title: '任务拆解', description: '添加具体任务' },
    { id: 4, title: '报酬设置', description: '设置项目报酬' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-white/5 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-text-primary">发布新项目</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex gap-2 mt-4">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                step === s.id
                  ? 'bg-white text-bg-primary'
                  : step > s.id
                  ? 'bg-white/20 text-white'
                  : 'bg-bg-card text-text-muted'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                {step > s.id ? '✓' : s.id}
                <span className="hidden sm:inline">{s.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 py-6 pb-32">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                项目名称 *
              </label>
              <input
                type="text"
                placeholder="给你的项目起个名字"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-dark w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                项目描述 *
              </label>
              <MarkdownEditor
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="详细描述项目的目标、背景、预期成果..."
                height="250px"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  <Calendar size={14} className="inline mr-1" />
                  开始日期
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  <Calendar size={14} className="inline mr-1" />
                  截止日期
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="input-dark w-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <Tag size={14} className="inline mr-1" />
                所需技能 *
              </label>
              <p className="text-xs text-text-muted mb-3">添加完成项目所需的技能标签</p>

              {/* Selected Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-white text-bg-primary"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="输入技能名称"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                  className="input-dark flex-1"
                />
                <button
                  onClick={handleAddSkill}
                  className="btn-primary px-4"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Suggested Skills */}
              <div className="mt-4">
                <p className="text-xs text-text-muted mb-2">推荐技能：</p>
                <div className="flex flex-wrap gap-2">
                  {skillsLibrary.slice(0, 8).map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => {
                        if (!formData.skillsNeeded.includes(skill.name)) {
                          setFormData({
                            ...formData,
                            skillsNeeded: [...formData.skillsNeeded, skill.name],
                          });
                        }
                      }}
                      className="px-3 py-1.5 rounded-full text-sm bg-bg-card text-text-secondary hover:bg-white/10 transition-colors"
                    >
                      + {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                任务拆解
              </label>
              <p className="text-xs text-text-muted mb-3">将项目拆分为可执行的具体任务</p>

              {/* Task List */}
              <div className="space-y-3 mb-4">
                {formData.tasks.map((task, index) => (
                  <div key={index} className="card p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-text-primary">{task.title}</h4>
                        {task.description && (
                          <p className="text-sm text-text-muted mt-1">{task.description}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          {task.skills.map((skill) => (
                            <span key={skill} className="tag text-xs">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            tasks: formData.tasks.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-text-muted hover:text-red-400"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Task Form */}
              <div className="card p-4 space-y-3">
                <input
                  type="text"
                  placeholder="任务标题"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="input-dark w-full"
                />
                <textarea
                  placeholder="任务描述（可选）"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="input-dark w-full h-20 resize-none"
                />
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.title}
                  className="btn-secondary w-full disabled:opacity-50"
                >
                  <Plus size={18} className="inline mr-2" />
                  添加任务
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <Users size={14} className="inline mr-1" />
                报酬/价值 *
              </label>
              <p className="text-xs text-text-muted mb-3">
                描述参与者将获得什么（可以是技能点数、现金、署名权、未来协助等）
              </p>
              <textarea
                placeholder="例如：项目完成后，参与者将获得 100 技能点数 + 项目署名权 + 我的未来协助承诺"
                value={formData.reward}
                onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                className="input-dark w-full h-32 resize-none"
              />
            </div>

            {/* Preview */}
            <div className="card p-4">
              <h3 className="text-sm font-medium text-text-secondary mb-3">项目预览</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-text-muted">名称：</span>{formData.title || '（未填写）'}</p>
                <p><span className="text-text-muted">技能：</span>{formData.skillsNeeded.join(', ') || '（未选择）'}</p>
                <p><span className="text-text-muted">任务：</span>{formData.tasks.length} 个</p>
                <p><span className="text-text-muted">报酬：</span>{formData.reward || '（未填写）'}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-white/5 px-4 py-4">
        <div className="flex gap-3 max-w-lg mx-auto">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="btn-secondary flex-1"
            >
              上一步
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="btn-primary flex-1"
            >
              下一步
              <ChevronRight size={18} className="inline ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary flex-1"
            >
              发布项目
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;