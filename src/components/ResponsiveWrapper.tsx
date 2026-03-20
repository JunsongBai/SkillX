import React from 'react';

// 响应式布局包装器 - 桌面端居中显示，模拟手机界面
const ResponsiveWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-primary md:bg-black md:flex md:items-center md:justify-center">
      {/* 桌面端显示手机外壳 */}
      <div className="hidden md:block w-[400px] h-[844px] bg-bg-primary rounded-[50px] overflow-hidden shadow-2xl border-[8px] border-gray-800 relative">
        {/* 刘海 - 提高z-index并添加背景 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-b-3xl z-[100]" />
        
        {/* 顶部安全区占位 */}
        <div className="h-8 bg-bg-primary z-50 relative" />
        
        {/* 内容区 */}
        <div className="h-[calc(100%-32px)] overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>

      {/* 移动端直接显示 */}
      <div className="md:hidden w-full">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveWrapper;