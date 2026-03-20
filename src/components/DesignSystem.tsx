import React from 'react';

const DesignSystem: React.FC = () => {
  const colors = [
    { name: 'bg-primary', hex: '#0a0a0f', desc: '主背景色' },
    { name: 'bg-secondary', hex: '#12121a', desc: '次级背景' },
    { name: 'bg-card', hex: '#1a1a24', desc: '卡片背景' },
    { name: 'bg-hover', hex: '#252532', desc: '悬停状态' },
    { name: 'accent-primary', hex: '#00d4ff', desc: '科技蓝' },
    { name: 'accent-secondary', hex: '#7c3aed', desc: '紫罗兰' },
    { name: 'accent-success', hex: '#10b981', desc: '成功绿' },
    { name: 'accent-warning', hex: '#f59e0b', desc: '警告黄' },
    { name: 'text-primary', hex: '#ffffff', desc: '主要文字' },
    { name: 'text-secondary', hex: '#9ca3af', desc: '次要文字' },
    { name: 'text-muted', hex: '#6b7280', desc: '弱化文字' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">SkillHub Design System</h1>
          <p className="text-text-secondary">黑色高级感 + 科技感设计规范</p>
        </div>

        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">色彩系统</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colors.map((color) => (
              <div
                key={color.name}
                className="card p-4 space-y-2"
                style={{ background: color.hex }}
              >
                <div className="h-16 rounded-lg border border-white/10 flex items-center justify-center">
                  <span
                    className="font-mono text-sm"
                    style={{ color: color.name.includes('bg') ? '#00d4ff' : color.hex }}
                  >
                    {color.hex}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{color.name}</p>
                  <p className="text-sm text-text-muted">{color.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">字体系统</h2>
          <div className="card p-6 space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-text-primary">Heading 1 - Inter Bold</h1>
              <p className="text-text-muted text-sm">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-text-primary">Heading 2 - Inter SemiBold</h2>
              <p className="text-text-muted text-sm">text-3xl font-semibold</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-text-primary">Heading 3 - Inter Medium</h3>
              <p className="text-text-muted text-sm">text-2xl font-medium</p>
            </div>
            <div>
              <p className="text-base text-text-primary">Body Text - Inter Regular</p>
              <p className="text-text-muted text-sm">text-base</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Secondary Text - Inter Regular</p>
              <p className="text-text-muted text-sm">text-sm text-text-secondary</p>
            </div>
            <div>
              <code className="font-mono text-accent-primary bg-accent-primary/10 px-2 py-1 rounded">
                Code: JetBrains Mono
              </code>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">按钮组件</h2>
          <div className="card p-6 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-primary opacity-50 cursor-not-allowed">Disabled</button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary text-sm px-4 py-2">Small</button>
              <button className="btn-primary px-6 py-3">Medium</button>
              <button className="btn-primary text-lg px-8 py-4">Large</button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">卡片组件</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">普通卡片</h3>
              <p className="text-text-secondary">这是一个普通的卡片组件，带有默认样式。</p>
            </div>
            <div className="card card-hover p-6 cursor-pointer">
              <h3 className="text-lg font-semibold text-text-primary mb-2">悬停效果卡片</h3>
              <p className="text-text-secondary">鼠标悬停时会显示发光边框效果。</p>
            </div>
            <div className="card p-6 gradient-border">
              <h3 className="text-lg font-semibold text-text-primary mb-2">渐变边框卡片</h3>
              <p className="text-text-secondary">带有渐变边框的特殊卡片样式。</p>
            </div>
            <div className="card p-6 shadow-glow-blue">
              <h3 className="text-lg font-semibold text-text-primary mb-2">发光阴影卡片</h3>
              <p className="text-text-secondary">带有科技蓝发光阴影效果。</p>
            </div>
          </div>
        </section>

        {/* Tags */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">标签组件</h2>
          <div className="card p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">UI Design</span>
              <span className="tag">Python</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20">
                Design
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-success/10 text-accent-success border border-accent-success/20">
                Completed
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-warning/10 text-accent-warning border border-accent-warning/20">
                In Progress
              </span>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">输入框组件</h2>
          <div className="card p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">普通输入框</label>
              <input
                type="text"
                placeholder="请输入内容..."
                className="input-dark w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">搜索框</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索技能、项目..."
                  className="input-dark w-full pl-10"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Effects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">特效展示</h2>
          <div className="card p-6 space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-accent-primary animate-pulse-glow px-4 py-2 rounded-lg border border-accent-primary/30">
                呼吸发光效果
              </span>
              <span className="text-accent-primary glow-text text-xl font-bold">
                文字发光效果
              </span>
              <span className="gradient-text text-xl font-bold">
                渐变文字效果
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-text-muted text-sm pt-8 border-t border-white/5">
          <p>SkillHub Design System v1.0</p>
          <p className="mt-1">黑色高级感 + 科技感</p>
        </footer>
      </div>
    </div>
  );
};

export default DesignSystem;