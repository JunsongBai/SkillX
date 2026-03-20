// 技能标签
export interface Skill {
  id: string;
  name: string;
  category: 'dev' | 'design' | 'business' | 'academic' | 'other';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// 用户节点
export interface User {
  id: string;
  name: string;
  avatar: string;
  school: string;
  major?: string;
  bio?: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: number; // 每周可投入小时数
  reputation: number; // 信誉值 0-5
  projectsCompleted: number;
  contributions: Contribution[];
  readme?: string;
  isOnline?: boolean;
}

// 贡献记录（用于贡献图）
export interface Contribution {
  date: string;
  count: number;
}

// 任务
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee?: string; // user id
  skills: string[];
  dueDate?: string;
}

// 项目
export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'recruiting' | 'in-progress' | 'completed';
  ownerId: string;
  members: string[]; // user ids
  tasks: Task[];
  skillsNeeded: string[];
  startDate: string;
  endDate?: string;
  reward?: string;
  progress: number; // 0-100
}

// 消息
export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  content: string;
  type: 'text' | 'code' | 'file' | 'system';
  timestamp: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// 协作会话
export interface Collaboration {
  id: string;
  projectId: string;
  participants: string[];
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
  updatedAt: string;
}

// 导航项
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}