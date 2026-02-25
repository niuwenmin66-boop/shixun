/**
 * Profile组件模块导出
 *
 * 本模块包含所有Profile相关的组件，用于用户学习档案页面。
 * 包括技能图谱、学习概况、个性化学习路径等功能模块。
 *
 * @module profile
 */

// 类型定义
export type {
  Skill,
  SkillLink,
  SkillStatus,
  FilterOptions,
  LearningResource,
  ResourceType,
  StudyOverviewData,
  SkillStatusCount,
} from './types';

// 常量导出
export {
  statusColorMap,
  statusTextMap,
  statusStyleMap,
} from './types';

// 数据导出
export {
  studyOverviewData,
  recommendedResources,
  skillNodes,
  skillLinks,
} from './data';

// 组件导出
export { default as SkillGraph } from './SkillGraph';
export { default as SkillFilter } from './SkillFilter';
export { default as StudyOverview } from './StudyOverview';
export { default as LearningPath } from './LearningPath';
export { default as ResourcePreview } from './ResourcePreview';
export { default as SkillDrawer } from './SkillDrawer';
