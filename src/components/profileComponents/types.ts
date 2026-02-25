/**
 * Profile组件共享类型定义
 * 
 * 本文件包含所有Profile相关组件共享的类型定义，
 * 确保类型一致性并便于维护。
 */

/** 技能状态类型 */
export type SkillStatus = 'mastered' | 'good' | 'weak' | 'veryWeak' | 'notLearned';

/** 技能数据接口 */
export interface Skill {
  id: string;
  name: string;
  category: number;
  level: string;
  status: SkillStatus;
  score: number;
  x: number;
  y: number;
}

/** 技能连接接口 */
export interface SkillLink {
  source: string;
  target: string;
}

/** 筛选选项类型 */
export interface FilterOptions {
  mastered: boolean;
  good: boolean;
  weak: boolean;
  veryWeak: boolean;
  notLearned: boolean;
}

/** 学习资源类型 */
export type ResourceType = '文档' | '视频' | '网页' | '组件' | 'Markdown';

/** 学习资源接口 */
export interface LearningResource {
  id: number;
  name: string;
  icon: string;
  type: ResourceType;
  url: string;
  image: string;
  description: string;
  duration: string;
  difficulty: '入门' | '进阶' | '高级';
}

/** 学习概况数据接口 */
export interface StudyOverviewData {
  totalStudyTime: number;
  completedCourses: number;
  skillMasteryRate: number;
  practicalCompletion: string;
  continuousDays: number;
  certificationLevel: string;
}

/** 技能状态计数接口 */
export interface SkillStatusCount {
  mastered: number;
  good: number;
  weak: number;
  veryWeak: number;
  notLearned: number;
}

/** 技能状态颜色映射 */
export const statusColorMap: Record<SkillStatus, string> = {
  mastered: '#722ed1', // 已精通 - 紫色
  good: '#1890ff',     // 已掌握 - 蓝色
  weak: '#faad14',     // 一般弱项 - 黄色
  veryWeak: '#f5222d', // 严重弱项 - 红色
  notLearned: '#bfbfbf' // 未学习 - 灰色
};

/** 技能状态文本映射 */
export const statusTextMap: Record<SkillStatus, string> = {
  mastered: '已精通',
  good: '已掌握',
  weak: '一般弱项',
  veryWeak: '严重弱项',
  notLearned: '未学习'
};

/** 技能状态样式映射 */
export const statusStyleMap: Record<SkillStatus, string> = {
  mastered: 'bg-purple-100 text-purple-700',
  good: 'bg-blue-100 text-blue-700',
  weak: 'bg-yellow-100 text-yellow-700',
  veryWeak: 'bg-red-100 text-red-700',
  notLearned: 'bg-gray-100 text-gray-700'
};
