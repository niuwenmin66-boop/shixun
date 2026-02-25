/**
 * 个性化学习路径组件
 *
 * 展示个性化学习推荐路径，包括亟需提升技能点和推荐学习资源。
 * 支持切换技能点、预览学习资源等功能。
 *
 * @example
 * ```tsx
 * <LearningPath
 *   weakSkills={weakSkills}
 *   resources={recommendedResources}
 *   onResourceClick={handleResourceClick}
 * />
 * ```
 */

import { useState } from 'react';
import type { Skill, LearningResource } from './types';

interface LearningPathProps {
  /** 弱项技能列表 */
  weakSkills: Skill[];
  /** 推荐学习资源 */
  resources: LearningResource[];
  /** 资源点击回调 */
  onResourceClick: (resource: LearningResource) => void;
  /** 容器类名 */
  className?: string;
}

export default function LearningPath({
  weakSkills,
  resources,
  onResourceClick,
  className = ''
}: LearningPathProps) {
  // 当前显示的技能点索引
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  // 当前显示的技能点
  const currentSkill = weakSkills[currentSkillIndex];

  // 更换技能点
  const changeSkill = () => {
    setCurrentSkillIndex(prev => (prev + 1) % weakSkills.length);
  };

  return (
    <div className={`bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-4 w-80 flex-shrink-0 ${className}`}>
      <h3 className="text-lg font-medium text-[var(--text-primary)] mb-6">个性化学习路径</h3>

      {/* 亟需提升技能点 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-medium text-[var(--text-secondary)]">亟需提升技能点</h4>
          {weakSkills.length > 1 && (
            <button
              onClick={changeSkill}
              className="text-xs text-[var(--brand-pink)] hover:underline flex items-center"
            >
              <i className="fa-solid fa-refresh mr-1"></i>
              换一个
            </button>
          )}
        </div>

        {currentSkill && (
          <div className="bg-[var(--bg-primary)] rounded-[8px] p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {currentSkill.name}
              </span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                严重弱项
              </span>
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
              得分: {currentSkill.score}
            </div>
          </div>
        )}
      </div>

      {/* 推荐学习资源 */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">推荐学习资源</h4>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-[var(--bg-primary)] rounded-[8px] overflow-hidden cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors relative"
              onClick={() => onResourceClick(resource)}
            >
              {/* 资源图片 */}
              <div className="relative h-24 overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.name}
                  className="w-full h-full object-cover"
                />
                {/* 类型标签 */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                  <i className={`fa-solid ${resource.icon} mr-1`}></i>
                  {resource.type}
                </div>
              </div>

              {/* 资源信息 */}
              <div className="p-3">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {resource.name}
                  </span>
                </div>
              </div>

              {/* 开始学习按钮 */}
              <button
                className="absolute bottom-3 right-3 px-3 py-1.5 bg-[var(--brand-pink)] text-white text-xs font-medium rounded-[6px] hover:bg-pink-600 transition-colors shadow-sm"
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
  );
}
