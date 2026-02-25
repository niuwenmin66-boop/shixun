/**
 * 技能详情抽屉组件
 *
 * 展示选中技能的详细信息，包括：
 * - 技能掌握程度仪表盘
 * - 技能介绍
 * - 学习建议
 * - 相关学习资源
 *
 * @example
 * ```tsx
 * <SkillDrawer
 *   skill={selectedSkill}
 *   isOpen={isDrawerOpen}
 *   onClose={closeDrawer}
 *   onResourceClick={handleResourceClick}
 * />
 * ```
 */

import type { Skill, LearningResource } from './types';
import { statusColorMap, statusTextMap, statusStyleMap } from './types';

interface SkillDrawerProps {
  /** 选中的技能 */
  skill: Skill | null;
  /** 是否打开 */
  isOpen: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 资源点击回调 */
  onResourceClick: (resource: LearningResource) => void;
  /** 容器类名 */
  className?: string;
}

// 生成相关资源数据
function generateRelatedResources(skill: Skill): LearningResource[] {
  return [
    {
      id: 101,
      name: `${skill.name}详解`,
      icon: 'fa-book',
      type: 'Markdown',
      url: '充配电总成拆装实训指导书.md',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=200&fit=crop',
      description: `详细介绍${skill.name}的核心概念、原理和应用，包括理论基础、实际操作流程及常见问题处理。`,
      duration: '1小时30分钟',
      difficulty: '入门'
    },
    {
      id: 102,
      name: `${skill.name}操作演示`,
      icon: 'fa-video',
      type: '视频',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop',
      description: `通过视频演示${skill.name}的实际操作过程，包括步骤分解、注意事项和常见问题处理方法。`,
      duration: '30分钟',
      difficulty: '入门'
    },
    {
      id: 103,
      name: `${skill.name}实训项目`,
      icon: 'fa-tools',
      type: '组件',
      url: 'MotorParameterCalculator',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop',
      description: `通过实际操作练习，巩固${skill.name}的理论知识，提高实际操作能力和问题解决能力。`,
      duration: '2小时',
      difficulty: '进阶'
    }
  ];
}

export default function SkillDrawer({
  skill,
  isOpen,
  onClose,
  onResourceClick,
  className = ''
}: SkillDrawerProps) {
  if (!isOpen || !skill) return null;

  const relatedResources = generateRelatedResources(skill);

  return (
    <div className={`fixed inset-0 z-50 ${className}`}>
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* 抽屉 */}
      <div className="absolute right-0 top-0 bottom-0 w-[480px] bg-white p-6 overflow-y-auto">
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-[var(--text-primary)]">{skill.name}</h3>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        {/* 技能掌握程度仪表盘 */}
        <div className="bg-[var(--bg-primary)] rounded-[12px] p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[var(--text-secondary)]">掌握程度</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyleMap[skill.status]}`}>
              {statusTextMap[skill.status]}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* 背景圆 */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="10"
                />
                {/* 进度圆 */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={statusColorMap[skill.status]}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(skill.score / 100) * 283} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-[var(--text-primary)]">{skill.score}%</div>
                <div className="text-xs text-[var(--text-secondary)]">技能评分</div>
              </div>
            </div>
          </div>
        </div>

        {/* 技能介绍 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">技能介绍</h4>
          <p className="text-[var(--text-secondary)]">
            本技能涵盖{skill.name}相关的核心知识点和操作技能，包括理论基础、实际操作流程及常见问题处理。
            通过学习本技能，能够掌握{skill.name}的基本原理和应用方法，提高实际操作能力和问题解决能力。
          </p>
        </div>

        {/* 学习建议 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">学习建议</h4>
          <div className="bg-[var(--bg-primary)] rounded-[8px] p-3">
            <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
              <li>系统学习{skill.name}的理论知识</li>
              <li>多进行实际操作练习，提高动手能力</li>
              <li>参加相关的实训项目，积累实战经验</li>
              <li>关注行业最新动态，不断更新知识体系</li>
            </ul>
          </div>
        </div>

        {/* 相关资源 */}
        <div>
          <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">相关资源</h4>
          <div className="space-y-3">
            {relatedResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-[var(--bg-primary)] rounded-[8px] p-3 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors relative"
                onClick={() => onResourceClick(resource)}
              >
                <div className="flex items-center mb-2">
                  <i className={`fa-solid ${resource.icon} text-[var(--brand-pink)] mr-2`}></i>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {resource.name}
                  </span>
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {resource.type === 'Markdown'
                    ? '理论学习资料'
                    : resource.type === '视频'
                    ? '视频教程'
                    : '实践练习'}
                </div>
                <button
                  className="absolute bottom-3 right-3 px-3 py-1 bg-[var(--brand-pink)] text-white text-xs font-medium rounded-[6px] hover:bg-pink-600 transition-colors shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onResourceClick(resource);
                  }}
                >
                  开始学习
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
