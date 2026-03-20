import React from 'react';

// 响应式布局包装器 - 桌面端居中显示，模拟手机界面
const ResponsiveWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-primary md:bg-black md:flex md:items-center md:justify-center">
      {/* 桌面端显示手机外壳 */}
      <div className="hidden md:block w-[400px] h-[844px] bg-bg-primary rounded-[50px] overflow-hidden shadow-2xl border-[8px] border-gray-800 relative">
        {/* 刘海 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-50" />
        
        {/* 内容区 */}
        <div className="h-full overflow-y-auto scrollbar-hide pt-8">
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