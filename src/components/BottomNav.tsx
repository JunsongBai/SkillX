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

const navItems: NavItem[] = [
  { id: 'explore', label: '技能广场', icon: Compass, path: '/explore' },
  { id: 'projects', label: '项目实验室', icon: FlaskConical, path: '/projects' },
  { id: 'workspace', label: '协作终端', icon: Terminal, path: '/workspace' },
  { id: 'profile', label: '节点画像', icon: User, path: '/profile' },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  // 检查当前路径是否匹配
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* 顶部渐变遮罩 */}
      <div className="h-8 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
      
      {/* 导航栏 */}
      <nav className="bg-bg-primary/95 backdrop-blur-md border-t border-white/5 px-2 pb-safe">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className="relative flex flex-col items-center gap-1 py-2 px-3 min-w-[64px]"
              >
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-1 w-8 h-1 bg-accent-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`relative p-2 rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-accent-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  <Icon
                    size={24}
                    strokeWidth={active ? 2.5 : 2}
                    className={`transition-all duration-200 ${
                      active ? 'drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]' : ''
                    }`}
                  />
                </motion.div>
                
                <span
                  className={`text-xs font-medium transition-colors duration-200 ${
                    active ? 'text-accent-primary' : 'text-text-muted'
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
          
          {/* 中央发布按钮 */}
          <NavLink
            to="/projects/new"
            className="relative -mt-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary 
                         flex items-center justify-center shadow-glow-blue
                         border-4 border-bg-primary"
            >
              <Plus size={28} className="text-bg-primary" strokeWidth={2.5} />
            </motion.div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;