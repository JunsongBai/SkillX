import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from './components/BottomNav';
import ExplorePage from './pages/ExplorePage';
import ProjectsPage from './pages/ProjectsPage';
import WorkspacePage from './pages/WorkspacePage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import CreateProjectPage from './pages/CreateProjectPage';
import DesignSystem from './components/DesignSystem';
import ProjectDetailPage from './pages/ProjectDetailPage';
import SettingsPage from './pages/SettingsPage';
import ResponsiveWrapper from './components/ResponsiveWrapper';

// 页面过渡动画组件
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// 带底部导航的布局
const MainLayout: React.FC = () => {
  const location = useLocation();
  
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* 默认跳转到技能广场 */}
          <Route path="/" element={<Navigate to="/explore" replace />} />
          
          {/* 主要页面 */}
          <Route path="/explore" element={<PageTransition><ExplorePage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/workspace" element={<PageTransition><WorkspacePage /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
          
          {/* 设计系统展示页面 */}
          <Route path="/design" element={<PageTransition><DesignSystem /></PageTransition>} />
          
          {/* 404 */}
          <Route path="*" element={<PageTransition><div className="p-8 text-text-primary">页面不存在</div></PageTransition>} />
        </Routes>
      </AnimatePresence>
      
      <BottomNav />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ResponsiveWrapper>
        <Routes>
          {/* 全屏页面（无底部导航） */}
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/projects/:projectId/chat" element={<ChatPage />} />
          <Route path="/projects/new" element={<CreateProjectPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* 带底部导航的主布局 */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </ResponsiveWrapper>
    </BrowserRouter>
  );
};

export default App;