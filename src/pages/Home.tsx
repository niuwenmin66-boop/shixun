import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import CourseCatalog from '@/components/CourseCatalog';
import TrainingGuide from '@/components/TrainingGuide';
import MotorTheory from '@/components/MotorTheory';
import AIAssistant from '@/components/AIAssistant';
import SimulationPractice from '@/components/SimulationPractice';
import TrainingProject from '@/components/TrainingProject';
import Certification from '@/components/Certification';
import Profile from '@/components/Profile';

// Tab类型定义
type TabType = 'theory' | 'simulation' | 'training' | 'certification' | 'profile';

// 课程内容类型定义
type CourseContentType = 'training' | 'theory';

export default function Home() {
  // 当前选中的Tab
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  
  // 选中的文字
  const [selectedText, setSelectedText] = useState<string>('');
  
  // 选中的课程内容
  const [selectedContent, setSelectedContent] = useState<CourseContentType>('theory');

  // Tab配置
  const tabs = [
    { id: 'theory', label: '理论学习' },
    { id: 'simulation', label: '虚拟演练' },
    { id: 'training', label: '实训项目' },
    { id: 'profile', label: '学习档案' },
    { id: 'certification', label: '技能认证' },
  ] as const;

  // 渲染当前Tab内容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'theory':
        return (
          <div className="h-full">
            <div className="flex gap-[5px] w-full h-[calc(100vh-100px)] max-w-7xl mx-auto">
              <div className="w-64 flex-shrink-0 h-full">
                <CourseCatalog onContentSelect={setSelectedContent} />
              </div>
              <div className="flex-1 h-full">
                {selectedContent === 'training' ? (
                  <TrainingGuide onSelectText={setSelectedText} />
                ) : (
                  <MotorTheory onSelectText={setSelectedText} />
                )}
              </div>
              <div className="w-80 flex-shrink-0 h-full">
                <AIAssistant selectedText={selectedText} />
              </div>
            </div>
          </div>
        );
      case 'simulation':
        return <div className="h-full"><SimulationPractice /></div>;
      case 'training':
        return <div className="h-full"><TrainingProject /></div>;
      case 'certification':
        return <div className="h-full"><Certification /></div>;
      case 'profile':
        return <div className="h-full"><Profile /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* 顶部课程标题和返回按钮 */}
      <div className="sticky top-0 z-20 py-4 px-6 backdrop-blur-sm bg-[var(--bg-primary)]/90 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={() => window.location.href = '/'}
            className="text-[var(--text-primary)] hover:text-[var(--brand-pink)] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-solid fa-arrow-left text-xl"></i>
          </motion.button>
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">新能源汽车动力系统与维护</h1>
        </div>
        
        {/* 居中的Tab导航 */}
        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex bg-white/60 p-2 rounded-full shadow-sm pointer-events-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-5 py-2 rounded-full transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-white text-[var(--brand-pink)] font-medium shadow-[0_4px_12px_rgba(255,143,163,0.25)]'
                    : 'text-[var(--text-secondary)] hover:bg-white/50'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* 占位元素，保持标题和返回按钮与Tab导航对齐 */}
        <div className="w-64"></div>
      </div>

      {/* 主内容区域 */}
      <div className="px-6 pt-4">
        {renderTabContent()}
      </div>
    </div>
  );
}