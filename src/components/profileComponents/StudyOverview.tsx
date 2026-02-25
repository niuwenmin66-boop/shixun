/**
 * 学习概况组件
 *
 * 展示用户的学习数据概览，包括累计学习时长、完成任务数、
 * 技能掌握率、实训完成度和连续学习天数五个维度。
 *
 * @example
 * ```tsx
 * <StudyOverview data={studyOverviewData} />
 * ```
 */

import type { StudyOverviewData } from './types';

interface StudyOverviewProps {
  /** 学习概况数据 */
  data: StudyOverviewData;
  /** 容器类名 */
  className?: string;
}

// 数据项配置
interface OverviewItem {
  key: keyof StudyOverviewData;
  label: string;
  icon: string;
  unit: string;
  trend: {
    value: string;
    type: 'up' | 'down' | 'neutral';
    text: string;
  };
}

export default function StudyOverview({ data, className = '' }: StudyOverviewProps) {
  // 数据项配置
  const items: OverviewItem[] = [
    {
      key: 'totalStudyTime',
      label: '累计学习时长',
      icon: 'fa-clock',
      unit: '小时',
      trend: { value: '12%', type: 'up', text: '较上周' }
    },
    {
      key: 'completedCourses',
      label: '完成任务数',
      icon: 'fa-check-circle',
      unit: '个',
      trend: { value: '3个', type: 'up', text: '较上周' }
    },
    {
      key: 'skillMasteryRate',
      label: '技能掌握率',
      icon: 'fa-chart-pie',
      unit: '%',
      trend: { value: '5%', type: 'up', text: '较上周' }
    },
    {
      key: 'practicalCompletion',
      label: '实训完成度',
      icon: 'fa-tools',
      unit: '次',
      trend: { value: '', type: 'neutral', text: '无变化' }
    },
    {
      key: 'continuousDays',
      label: '连续学习天数',
      icon: 'fa-fire',
      unit: '天',
      trend: { value: '', type: 'up', text: '保持良好' }
    }
  ];

  // 获取趋势样式
  const getTrendStyle = (type: 'up' | 'down' | 'neutral') => {
    switch (type) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'neutral':
        return 'text-[var(--text-secondary)]';
    }
  };

  // 获取趋势图标
  const getTrendIcon = (type: 'up' | 'down' | 'neutral') => {
    switch (type) {
      case 'up':
        return 'fa-arrow-up';
      case 'down':
        return 'fa-arrow-down';
      case 'neutral':
        return 'fa-minus';
    }
  };

  return (
    <div className={`bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 ${className}`}>
      {/* 标题区 */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-medium text-[var(--text-primary)] mb-2">学习概况</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          全方位追踪学习进度 · 精准掌握技能分布 · 个性化推荐学习路径
        </p>
      </div>

      {/* 数据卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <div key={item.key} className="bg-[var(--bg-primary)] rounded-[12px] p-4">
            {/* 标签和图标 */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-secondary)] text-sm">{item.label}</span>
              <i className={`fa-solid ${item.icon} text-[var(--brand-pink)]`}></i>
            </div>

            {/* 数值 */}
            <div className="text-2xl font-medium text-[var(--text-primary)]">
              {data[item.key]}{item.unit}
            </div>

            {/* 趋势 */}
            <div className={`text-xs flex items-center mt-1 ${getTrendStyle(item.trend.type)}`}>
              <i className={`fa-solid ${getTrendIcon(item.trend.type)} mr-1`}></i>
              {item.trend.type !== 'neutral' && item.trend.value}
              {item.trend.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
