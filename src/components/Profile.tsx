/**
 * 用户学习档案页面组件
 *
 * 整合所有Profile子组件，提供完整的学习档案功能：
 * - 学习概况数据展示
 * - 技能图谱可视化
 * - 个性化学习路径推荐
 * - 技能详情查看
 * - 学习资源预览
 *
 * @module Profile
 */

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import AIAssistant from './AIAssistant';
import {
  SkillGraph,
  SkillFilter,
  StudyOverview,
  LearningPath,
  ResourcePreview,
  SkillDrawer,
  studyOverviewData,
  recommendedResources,
  skillNodes,
  skillLinks,
} from './profileComponents';
import type {
  Skill,
  FilterOptions,
  LearningResource,
  SkillStatusCount,
} from './profileComponents';

export default function Profile() {
  // 状态管理
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    mastered: true,
    good: true,
    weak: true,
    veryWeak: true,
    notLearned: false,
  });
  const [showLinkPreview, setShowLinkPreview] = useState(false);
  const [selectedResource, setSelectedResource] = useState<LearningResource | null>(null);

  // 计算各状态技能数量
  const skillStatusCount: SkillStatusCount = useMemo(() => {
    return {
      mastered: skillNodes.filter((node) => node.status === 'mastered').length,
      good: skillNodes.filter((node) => node.status === 'good').length,
      weak: skillNodes.filter((node) => node.status === 'weak').length,
      veryWeak: skillNodes.filter((node) => node.status === 'veryWeak').length,
      notLearned: skillNodes.filter((node) => node.status === 'notLearned').length,
    };
  }, []);

  // 获取弱项技能列表
  const weakSkills = useMemo(() => {
    return skillNodes
      .filter((node) => node.status === 'veryWeak')
      .sort((a, b) => a.score - b.score);
  }, []);

  // 处理节点点击
  const handleNodeClick = useCallback((skill: Skill) => {
    setSelectedSkill(skill);
    setIsDrawerOpen(true);
  }, []);

  // 关闭抽屉
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  // 处理资源点击
  const handleResourceClick = useCallback((resource: LearningResource) => {
    setSelectedResource(resource);
    setShowLinkPreview(true);
  }, []);

  // 关闭资源预览
  const closeResourcePreview = useCallback(() => {
    setShowLinkPreview(false);
  }, []);

  // AI小助手展开/收起状态
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  return (
    <div className="p-6 h-[calc(100vh-100px)] max-w-7xl mx-auto">
      {/* 学习概况数据区 */}
      <StudyOverview data={studyOverviewData} className="mb-6" />

      {/* 技能掌握情况图谱区 */}
      <div className="flex gap-6">
        {/* 左侧个性化学习推荐路径面板 */}
        <LearningPath
          weakSkills={weakSkills}
          resources={recommendedResources}
          onResourceClick={handleResourceClick}
        />

        {/* 右侧技能图谱 */}
        <div className="flex-1 bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-4">
          {/* 标题栏 */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-[var(--text-primary)]">技能图谱</h3>
            <div className="flex items-center bg-[var(--bg-primary)] rounded-[8px] p-2 shadow-sm">
              <i className="fa-solid fa-circle-info text-[var(--text-secondary)] mr-2"></i>
              <p className="text-xs text-[var(--text-secondary)]">
                点击技能点，可查看掌握程度，AI提供个性化学习建议
              </p>
            </div>
          </div>

          {/* 技能掌握情况筛选面板 */}
          <SkillFilter
            filterOptions={filterOptions}
            onFilterChange={setFilterOptions}
            skillStatusCount={skillStatusCount}
            className="mb-4"
          />

          {/* 技能图谱 */}
          <SkillGraph
            nodes={skillNodes}
            links={skillLinks}
            filterOptions={filterOptions}
            onNodeClick={handleNodeClick}
          />
        </div>
      </div>

      {/* 技能详情抽屉 */}
      <SkillDrawer
        skill={selectedSkill}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onResourceClick={handleResourceClick}
      />

      {/* 资源预览弹窗 */}
      <ResourcePreview
        resource={selectedResource}
        isOpen={showLinkPreview}
        onClose={closeResourcePreview}
      />

      {/* AI实训小助手入口 */}
      <div className="fixed bottom-6 right-12 z-40">
        {/* 展开/收起按钮 */}
        <motion.button
          onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
          className="bg-[var(--brand-pink)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--brand-pink)]/90 transition-colors z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          <i className={`fa-solid ${isAIAssistantOpen ? 'fa-times' : 'fa-robot'} text-xl`}></i>
        </motion.button>
        
        {/* AI小助手面板 */}
        {isAIAssistantOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl w-80 h-[calc(100vh-120px)] overflow-hidden"
            style={{ position: 'absolute', bottom: '70px', right: 0 }}
          >
            <AIAssistant selectedText={selectedText} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
