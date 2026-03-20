import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, GripVertical, CheckCircle2, Circle, Play } from 'lucide-react';
import type { Task } from '../types';

interface TaskBoardProps {
  tasks: Task[];
  onTaskMove?: (taskId: string, newStatus: Task['status']) => void;
  onTaskClick?: (task: Task) => void;
}

const columns = [
  { id: 'todo', label: '待办', icon: Circle, color: 'text-gray-400' },
  { id: 'in-progress', label: '进行中', icon: Play, color: 'text-white' },
  { id: 'done', label: '已完成', icon: CheckCircle2, color: 'text-green-400' },
];

const TaskCard: React.FC<{ task: Task; onClick?: () => void }> = ({ task, onClick }) => {
  return (
    <motion.div
      layout
      layoutId={task.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card p-3 cursor-pointer group"
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-text-primary mb-1">{task.title}</h4>
          {task.description && (
            <p className="text-xs text-text-muted line-clamp-2 mb-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {task.skills.map((skill) => (
              <span key={skill} className="tag text-xs">{skill}</span>
            ))}
          </div>
          
          {task.dueDate && (
            <div className="flex items-center gap-1 mt-2 text-xs text-text-muted">
              <Calendar size={12} />
              <span>{task.dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onTaskMove, onTaskClick }) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent, _status: Task['status']) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask && onTaskMove) {
      onTaskMove(draggedTask.id, status);
    }
    setDraggedTask(null);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {columns.map((column) => {
        const Icon = column.icon;
        const columnTasks = tasks.filter((t) => t.status === column.id);

        return (
          <div
            key={column.id}
            className="flex-shrink-0 w-72"
            onDragOver={(e) => handleDragOver(e, column.id as Task['status'])}
            onDrop={(e) => handleDrop(e, column.id as Task['status'])}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${column.color}`} />
                <span className="text-sm font-medium text-text-primary">{column.label}</span>
                <span className="px-2 py-0.5 bg-bg-card rounded-full text-xs text-text-muted">
                  {columnTasks.length}
                </span>
              </div>
              <button className="p-1 rounded hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-3 min-h-[200px]">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                >
                  <TaskCard
                    task={task}
                    onClick={() => onTaskClick?.(task)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskBoard;