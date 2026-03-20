import type { User, Skill } from '../types';

// 技能标签库
export const skillsLibrary: Skill[] = [
  // 开发
  { id: 'react', name: 'React', category: 'dev', level: 'advanced' },
  { id: 'vue', name: 'Vue', category: 'dev', level: 'advanced' },
  { id: 'typescript', name: 'TypeScript', category: 'dev', level: 'advanced' },
  { id: 'python', name: 'Python', category: 'dev', level: 'expert' },
  { id: 'nodejs', name: 'Node.js', category: 'dev', level: 'intermediate' },
  { id: 'go', name: 'Go', category: 'dev', level: 'intermediate' },
  { id: 'rust', name: 'Rust', category: 'dev', level: 'beginner' },
  
  // 设计
  { id: 'figma', name: 'Figma', category: 'design', level: 'expert' },
  { id: 'ui-design', name: 'UI Design', category: 'design', level: 'advanced' },
  { id: 'ux-design', name: 'UX Design', category: 'design', level: 'advanced' },
  { id: 'motion', name: 'Motion Design', category: 'design', level: 'intermediate' },
  { id: 'blender', name: 'Blender', category: 'design', level: 'beginner' },
  
  // 商业
  { id: 'product', name: 'Product Management', category: 'business', level: 'advanced' },
  { id: 'marketing', name: 'Marketing', category: 'business', level: 'intermediate' },
  { id: 'data-analysis', name: 'Data Analysis', category: 'business', level: 'advanced' },
  
  // 学术
  { id: 'academic-writing', name: 'Academic Writing', category: 'academic', level: 'expert' },
  { id: 'research', name: 'Research', category: 'academic', level: 'advanced' },
  { id: 'translation', name: 'Translation', category: 'academic', level: 'intermediate' },
  
  // 其他
  { id: 'video-edit', name: 'Video Editing', category: 'other', level: 'advanced' },
  { id: 'copywriting', name: 'Copywriting', category: 'other', level: 'intermediate' },
];

// Mock 用户数据
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: '李明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    school: '复旦大学',
    major: '计算机科学',
    bio: '全栈开发者，热爱开源',
    skillsOffered: [
      { id: 'react', name: 'React', category: 'dev', level: 'expert' },
      { id: 'typescript', name: 'TypeScript', category: 'dev', level: 'expert' },
      { id: 'nodejs', name: 'Node.js', category: 'dev', level: 'advanced' },
    ],
    skillsWanted: [
      { id: 'ui-design', name: 'UI Design', category: 'design', level: 'beginner' },
      { id: 'product', name: 'Product Management', category: 'business', level: 'beginner' },
    ],
    availability: 15,
    reputation: 4.8,
    projectsCompleted: 12,
    contributions: generateContributions(),
    readme: '# 李明的技能仓库\n\n## 可提供\n- React / TypeScript 前端开发\n- Node.js 后端开发\n- 技术架构设计\n\n## 想学习\n- UI/UX 设计\n- 产品管理',
    isOnline: true,
  },
  {
    id: 'u2',
    name: '张薇',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    school: '同济大学',
    major: '设计创意学院',
    bio: 'UI/UX 设计师，追求极致体验',
    skillsOffered: [
      { id: 'figma', name: 'Figma', category: 'design', level: 'expert' },
      { id: 'ui-design', name: 'UI Design', category: 'design', level: 'expert' },
      { id: 'motion', name: 'Motion Design', category: 'design', level: 'advanced' },
    ],
    skillsWanted: [
      { id: 'react', name: 'React', category: 'dev', level: 'beginner' },
      { id: 'frontend', name: 'Frontend Dev', category: 'dev', level: 'beginner' },
    ],
    availability: 10,
    reputation: 4.9,
    projectsCompleted: 8,
    contributions: generateContributions(),
    isOnline: true,
  },
  {
    id: 'u3',
    name: '王强',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    school: '上海交大',
    major: '电子信息',
    bio: 'Python 数据分析师',
    skillsOffered: [
      { id: 'python', name: 'Python', category: 'dev', level: 'expert' },
      { id: 'data-analysis', name: 'Data Analysis', category: 'business', level: 'expert' },
    ],
    skillsWanted: [
      { id: 'video-edit', name: 'Video Editing', category: 'other', level: 'intermediate' },
    ],
    availability: 8,
    reputation: 4.6,
    projectsCompleted: 6,
    contributions: generateContributions(),
    isOnline: false,
  },
  {
    id: 'u4',
    name: '陈雪',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    school: '华东师大',
    major: '中文系',
    bio: '文案策划 & 学术写作',
    skillsOffered: [
      { id: 'copywriting', name: 'Copywriting', category: 'other', level: 'expert' },
      { id: 'academic-writing', name: 'Academic Writing', category: 'academic', level: 'expert' },
    ],
    skillsWanted: [
      { id: 'data-analysis', name: 'Data Analysis', category: 'business', level: 'beginner' },
      { id: 'marketing', name: 'Marketing', category: 'business', level: 'beginner' },
    ],
    availability: 12,
    reputation: 4.7,
    projectsCompleted: 5,
    contributions: generateContributions(),
    isOnline: true,
  },
  {
    id: 'u5',
    name: '刘洋',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    school: '复旦',
    major: '软件工程',
    bio: '后端开发 & 系统架构',
    skillsOffered: [
      { id: 'go', name: 'Go', category: 'dev', level: 'advanced' },
      { id: 'rust', name: 'Rust', category: 'dev', level: 'intermediate' },
      { id: 'python', name: 'Python', category: 'dev', level: 'advanced' },
    ],
    skillsWanted: [
      { id: 'figma', name: 'Figma', category: 'design', level: 'beginner' },
    ],
    availability: 20,
    reputation: 4.5,
    projectsCompleted: 9,
    contributions: generateContributions(),
    isOnline: false,
  },
  {
    id: 'u6',
    name: '赵艺',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
    school: '上戏',
    major: '影视制作',
    bio: '视频剪辑 & 动效设计',
    skillsOffered: [
      { id: 'video-edit', name: 'Video Editing', category: 'other', level: 'expert' },
      { id: 'motion', name: 'Motion Design', category: 'design', level: 'expert' },
    ],
    skillsWanted: [
      { id: 'ui-design', name: 'UI Design', category: 'design', level: 'intermediate' },
      { id: 'copywriting', name: 'Copywriting', category: 'other', level: 'beginner' },
    ],
    availability: 10,
    reputation: 4.9,
    projectsCompleted: 15,
    contributions: generateContributions(),
    isOnline: true,
  },
];

// Mock 项目数据
export const mockProjects = [
  {
    id: 'p1',
    title: '校园二手书比价工具',
    description: '开发一个能自动抓取多平台二手书价格并生成比价报告的浏览器插件',
    status: 'recruiting' as const,
    ownerId: 'u1',
    members: ['u1'],
    tasks: [
      { id: 't1', title: '爬虫开发', status: 'todo', skills: ['python'], assignee: undefined },
      { id: 't2', title: '前端界面', status: 'todo', skills: ['react', 'typescript'], assignee: undefined },
      { id: 't3', title: '数据可视化', status: 'todo', skills: ['data-analysis'], assignee: undefined },
    ],
    skillsNeeded: ['python', 'react', 'data-analysis'],
    startDate: '2026-03-20',
    endDate: '2026-04-20',
    reward: '技能点数 150 + 署名权',
    progress: 10,
  },
  {
    id: 'p2',
    title: '学生技能交换平台官网设计',
    description: '为 SkillHub 平台设计品牌视觉和官网界面',
    status: 'in-progress' as const,
    ownerId: 'u2',
    members: ['u2', 'u1'],
    tasks: [
      { id: 't1', title: '品牌设计', status: 'done', skills: ['figma'], assignee: 'u2' },
      { id: 't2', title: '官网 UI', status: 'in-progress', skills: ['ui-design'], assignee: 'u2' },
      { id: 't3', title: '前端实现', status: 'todo', skills: ['react'], assignee: 'u1' },
    ],
    skillsNeeded: ['figma', 'ui-design', 'react'],
    startDate: '2026-03-15',
    endDate: '2026-04-15',
    reward: '共同作者 + 未来协助',
    progress: 45,
  },
  {
    id: 'p3',
    title: '校园碳中和数据可视化',
    description: '分析校园能耗数据，制作可视化报告和交互图表',
    status: 'recruiting' as const,
    ownerId: 'u3',
    members: ['u3'],
    tasks: [
      { id: 't1', title: '数据收集', status: 'in-progress', skills: ['python'], assignee: 'u3' },
      { id: 't2', title: '数据分析', status: 'todo', skills: ['data-analysis'], assignee: undefined },
      { id: 't3', title: '可视化设计', status: 'todo', skills: ['figma', 'motion'], assignee: undefined },
    ],
    skillsNeeded: ['python', 'data-analysis', 'figma', 'motion'],
    startDate: '2026-03-25',
    endDate: '2026-05-01',
    reward: '比赛奖金分成 + 技能点数',
    progress: 15,
  },
  {
    id: 'p4',
    title: '学术写作辅助工具',
    description: '开发一个辅助学术写作的 Chrome 插件，提供格式检查和引用管理',
    status: 'in-progress' as const,
    ownerId: 'u4',
    members: ['u4', 'u1', 'u5'],
    tasks: [
      { id: 't1', title: '需求分析', status: 'done', skills: ['academic-writing'], assignee: 'u4' },
      { id: 't2', title: '前端开发', status: 'in-progress', skills: ['react', 'typescript'], assignee: 'u1' },
      { id: 't3', title: '后端 API', status: 'in-progress', skills: ['python', 'nodejs'], assignee: 'u5' },
    ],
    skillsNeeded: ['react', 'typescript', 'python', 'academic-writing'],
    startDate: '2026-03-10',
    endDate: '2026-04-10',
    reward: '开源项目贡献者',
    progress: 60,
  },
];

// 生成贡献图数据
function generateContributions() {
  const contributions = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    contributions.push({
      date: date.toISOString().split('T')[0],
      count: Math.random() > 0.6 ? Math.floor(Math.random() * 5) + 1 : 0,
    });
  }
  return contributions;
}

// 获取当前用户（模拟登录状态）
export const getCurrentUser = (): User => mockUsers[0];

// 根据 ID 获取用户
export const getUserById = (id: string): User | undefined => 
  mockUsers.find(u => u.id === id);

// 根据 ID 获取项目
export const getProjectById = (id: string) => 
  mockProjects.find(p => p.id === id);