import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import ExplorePage from './pages/ExplorePage';
import ProjectsPage from './pages/ProjectsPage';
import WorkspacePage from './pages/WorkspacePage';
import ProfilePage from './pages/ProfilePage';
import DesignSystem from './components/DesignSystem';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary">
        <Routes>
          {/* 默认跳转到技能广场 */}
          <Route path="/" element={<Navigate to="/explore" replace />} />
          
          {/* 主要页面 */}
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<div className="p-8 text-text-primary">创建新项目页面（开发中）</div>} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* 设计系统展示页面 */}
          <Route path="/design" element={<DesignSystem />} />
          
          {/* 404 */}
          <Route path="*" element={<div className="p-8 text-text-primary">页面不存在</div>} />
        </Routes>
        
        <BottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;