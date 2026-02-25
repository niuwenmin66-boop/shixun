/**
 * 技能图谱组件
 * 
 * 基于ECharts的力导向图，展示技能节点及其关联关系。
 * 支持按技能状态筛选、节点点击交互等功能。
 * 
 * @example
 * ```tsx
 * <SkillGraph
 *   nodes={skillNodes}
 *   links={skillLinks}
 *   filterOptions={filterOptions}
 *   onNodeClick={handleNodeClick}
 * />
 * ```
 */

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { Skill, SkillLink, FilterOptions, SkillStatus } from './types';
import { statusColorMap } from './types';

interface SkillGraphProps {
  /** 技能节点数据 */
  nodes: Skill[];
  /** 技能连接关系 */
  links: SkillLink[];
  /** 筛选选项 */
  filterOptions: FilterOptions;
  /** 节点点击回调 */
  onNodeClick: (skill: Skill) => void;
  /** 容器类名 */
  className?: string;
}

export default function SkillGraph({
  nodes,
  links,
  filterOptions,
  onNodeClick,
  className = ''
}: SkillGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 初始化图表
  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);

      // 绑定节点点击事件
      chartInstance.current.on('click', (params: any) => {
        if (params.dataType === 'node') {
          const skill: Skill = {
            id: params.data.id,
            name: params.data.name,
            status: params.data.status,
            score: params.data.score,
            category: params.data.category || 0,
            level: params.data.level || 'L2',
            x: 0,
            y: 0
          };
          onNodeClick(skill);
        }
      });

      // 响应窗口大小变化
      const handleResize = () => {
        chartInstance.current?.resize();
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, []);

  // 当数据变化时更新图表
  useEffect(() => {
    updateChart();
  }, [nodes, links, filterOptions]);

  // 更新图表配置
  const updateChart = () => {
    if (!chartInstance.current) return;

    // 过滤节点（根节点和一级节点始终显示）
    const filteredNodes = nodes.filter(node => {
      if (node.level === 'L0' || node.level === 'L1') return true;
      if (node.status === 'mastered' && !filterOptions.mastered) return false;
      if (node.status === 'good' && !filterOptions.good) return false;
      if (node.status === 'weak' && !filterOptions.weak) return false;
      if (node.status === 'veryWeak' && !filterOptions.veryWeak) return false;
      if (node.status === 'notLearned' && !filterOptions.notLearned) return false;
      return true;
    });

    // 过滤连接
    const filteredLinks = links.filter(link => {
      const sourceExists = filteredNodes.some(node => node.id === link.source);
      const targetExists = filteredNodes.some(node => node.id === link.target);
      return sourceExists && targetExists;
    });

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: function(params: any) {
          if (params.dataType === 'node') {
            const status = params.data.status as SkillStatus;
            const statusText = {
              mastered: '已精通',
              good: '已掌握',
              weak: '一般弱项',
              veryWeak: '严重弱项',
              notLearned: '未学习'
            }[status];
            return `
              <div style="padding: 8px;">
                <div style="font-weight: bold; margin-bottom: 4px;">${params.data.name}</div>
                <div style="color: ${statusColorMap[status]}; font-size: 12px;">
                  状态: ${statusText}
                </div>
                <div style="font-size: 12px; margin-top: 4px;">
                  得分: ${params.data.score}分
                </div>
              </div>
            `;
          }
          return '';
        }
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'cubicInOut',
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: filteredNodes.map(node => ({
            id: node.id,
            name: node.name,
            status: node.status,
            score: node.score,
            category: node.category,
            level: node.level,
            itemStyle: {
              color: statusColorMap[node.status]
            },
            symbolSize: node.level === 'L0' ? 50 : node.level === 'L1' ? 40 : 30
          })),
          links: filteredLinks,
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 4
            }
          },
          force: {
            repulsion: 600,
            edgeLength: 100,
            gravity: 0.2,
            layoutAnimation: true
          }
        }
      ]
    };

    chartInstance.current.setOption(option);
  };

  return (
    <div 
      ref={chartRef} 
      className={`w-full h-[600px] ${className}`}
      style={{ minHeight: '500px' }}
    />
  );
}
