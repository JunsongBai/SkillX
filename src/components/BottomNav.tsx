import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Compass, FlaskConical, Terminal, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

// 左侧导航项
const leftNavItems: NavItem[] = [
  { id: 'explore', label: '技能广场', icon: Compass, path: '/explore' },
  { id: 'projects', label: '项目实验室', icon: FlaskConical, path: '/projects' },
];

// 右侧导航项
const rightNavItems: NavItem[] = [
  { id: 'workspace', label: '协作终端', icon: Terminal, path: '/workspace' },
  { id: 'profile', label: '节点画像', icon: User, path: '/profile' },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  // 检查当前路径是否匹配
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    
    return (
      <NavLink
        key={item.id}
        to={item.path}
        className="relative flex flex-col items-center gap-1 py-2 px-3 min-w-[72px]"
      >
        {active && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -top-1 w-8 h-1 bg-white rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        
        <motion.div
          whileTap={{ scale: 0.9 }}
          className={`relative p-2 rounded-xl transition-all duration-200 ${
            active
              ? 'text-white'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          <Icon
            size={22}
            strokeWidth={active ? 2.5 : 2}
            className={`transition-all duration-200 ${
              active ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''
            }`}
          />
        </motion.div>
        
        <span
          className={`text-[10px] font-medium transition-colors duration-200 ${
            active ? 'text-white' : 'text-text-muted'
          }`}
        >
          {item.label}
        </span>
      </NavLink>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* 顶部渐变遮罩 */}
      <div className="h-8 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
      
      {/* 导航栏 */}
      <nav className="bg-bg-primary/95 backdrop-blur-md border-t border-white/5 px-2 pb-safe">
        <div className="max-w-lg mx-auto flex items-center justify-between py-2">
          {/* 左侧导航 */}
          <div className="flex items-center">
            {leftNavItems.map(renderNavItem)}
          </div>
          
          {/* 中央发布按钮 */}
          <NavLink
            to="/projects/new"
            className="relative -mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-white 
                         flex items-center justify-center shadow-glow-strong
                         border-4 border-bg-primary"
            >
              <Plus size={32} className="text-bg-primary" strokeWidth={2.5} />
            </motion.div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-text-muted whitespace-nowrap">
              发布
            </span>
          </NavLink>
          
          {/* 右侧导航 */}
          <div className="flex items-center">
            {rightNavItems.map(renderNavItem)}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;