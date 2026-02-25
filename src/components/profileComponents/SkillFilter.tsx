/**
 * 技能筛选面板组件
 *
 * 提供按技能状态筛选的功能，包括已精通、已掌握、一般弱项、严重弱项、未学习五种状态。
 * 点击筛选项可切换显示/隐藏对应状态的技能节点。
 *
 * @example
 * ```tsx
 * <SkillFilter
 *   filterOptions={filterOptions}
 *   onFilterChange={setFilterOptions}
 *   skillStatusCount={skillStatusCount}
 * />
 * ```
 */

import type { FilterOptions, SkillStatusCount } from './types';
import { statusColorMap, statusTextMap } from './types';

interface SkillFilterProps {
  /** 当前筛选选项 */
  filterOptions: FilterOptions;
  /** 筛选选项变化回调 */
  onFilterChange: (options: FilterOptions | ((prev: FilterOptions) => FilterOptions)) => void;
  /** 各状态技能数量统计 */
  skillStatusCount: SkillStatusCount;
  /** 容器类名 */
  className?: string;
}

export default function SkillFilter({
  filterOptions,
  onFilterChange,
  skillStatusCount,
  className = ''
}: SkillFilterProps) {
  // 筛选项配置
  const filterItems: { key: keyof FilterOptions; color: string; label: string; count: number }[] = [
    { key: 'mastered', color: statusColorMap.mastered, label: statusTextMap.mastered, count: skillStatusCount.mastered },
    { key: 'good', color: statusColorMap.good, label: statusTextMap.good, count: skillStatusCount.good },
    { key: 'weak', color: statusColorMap.weak, label: statusTextMap.weak, count: skillStatusCount.weak },
    { key: 'veryWeak', color: statusColorMap.veryWeak, label: statusTextMap.veryWeak, count: skillStatusCount.veryWeak },
    { key: 'notLearned', color: statusColorMap.notLearned, label: statusTextMap.notLearned, count: skillStatusCount.notLearned },
  ];

  // 切换筛选状态
  const toggleFilter = (key: keyof FilterOptions) => {
    onFilterChange(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={`bg-[var(--bg-primary)] rounded-[12px] p-4 ${className}`}>
      <div className="flex flex-wrap gap-6">
        {filterItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => toggleFilter(item.key)}
          >
            <div
              className={`w-3 h-3 rounded-full mr-2 transition-opacity ${
                filterOptions[item.key] ? '' : 'opacity-30'
              }`}
              style={{ backgroundColor: item.color }}
            />
            <span
              className={`text-sm transition-colors ${
                filterOptions[item.key]
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              {item.label} ({item.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
