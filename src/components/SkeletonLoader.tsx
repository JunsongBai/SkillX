import React from 'react';
import { motion } from 'framer-motion';

// 基础骨架元素
export const SkeletonElement: React.FC<{ className?: string; width?: string; height?: string }> = ({
  className = '',
  width,
  height,
}) => (
  <motion.div
    initial={{ opacity: 0.5 }}
    animate={{ opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    className={`bg-white/10 rounded ${className}`}
    style={{ width, height }}
  />
);

// 卡片骨架
export const SkeletonCard: React.FC = () => (
  <div className="card p-4 space-y-3">
    <div className="flex items-center gap-3">
      <SkeletonElement className="w-12 h-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <SkeletonElement className="w-1/3 h-4" />
        <SkeletonElement className="w-1/4 h-3" />
      </div>
    </div>
    <SkeletonElement className="w-full h-3" />
    <SkeletonElement className="w-2/3 h-3" />
    <div className="flex gap-2 pt-2">
      <SkeletonElement className="w-16 h-6 rounded-full" />
      <SkeletonElement className="w-16 h-6 rounded-full" />
    </div>
  </div>
);

// 列表骨架
export const SkeletonList: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

// 项目卡片骨架
export const SkeletonProjectCard: React.FC = () => (
  <div className="card overflow-hidden">
    <SkeletonElement className="h-1 w-full" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between">
        <SkeletonElement className="w-1/2 h-5" />
        <SkeletonElement className="w-6 h-6" />
      </div>
      <SkeletonElement className="w-full h-3" />
      <SkeletonElement className="w-3/4 h-3" />
      <div className="flex gap-2">
        <SkeletonElement className="w-12 h-5 rounded-full" />
        <SkeletonElement className="w-12 h-5 rounded-full" />
      </div>
      <SkeletonElement className="w-full h-2 rounded-full" />
    </div>
  </div>
);

export default {
  Element: SkeletonElement,
  Card: SkeletonCard,
  List: SkeletonList,
  ProjectCard: SkeletonProjectCard,
};