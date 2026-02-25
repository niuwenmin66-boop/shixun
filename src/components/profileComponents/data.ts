/**
 * Profile组件数据定义
 * 
 * 本文件包含所有Profile组件所需的静态数据，
 * 包括技能节点、连接关系、推荐资源等。
 */

import type { Skill, SkillLink, LearningResource, StudyOverviewData } from './types';

/** 学习概况数据 */
export const studyOverviewData: StudyOverviewData = {
  totalStudyTime: 128,
  completedCourses: 24,
  skillMasteryRate: 68,
  practicalCompletion: "15/20",
  continuousDays: 12,
  certificationLevel: "L2"
};

/** 推荐学习资源数据 */
export const recommendedResources: LearningResource[] = [
  {
    id: 1,
    name: '充配电总成拆装实训指导书',
    icon: 'fa-book',
    type: 'Markdown',
    url: '充配电总成拆装实训指导书.md',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=200&fit=crop',
    description: '详细的充配电总成拆装实训指导，包括工具使用、操作步骤、注意事项等，适合初学者学习充配电系统的基本结构和拆装方法。',
    duration: '10分钟',
    difficulty: '入门'
  },
  {
    id: 2,
    name: '交流异步电机安装',
    icon: 'fa-video',
    type: '视频',
    url: 'https://e.necibook.com/api/media/api/v1/media/showImage/2021466156888952832',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop',
    description: '详细讲解交流异步电机的安装步骤、注意事项和调试方法，帮助学习者掌握电机安装的核心技能。',
    duration: '8分钟',
    difficulty: '进阶'
  },
  {
    id: 3,
    name: '电机参数计算器',
    icon: 'fa-calculator',
    type: '组件',
    url: 'MotorParameterCalculator',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop',
    description: '通过调整电机参数，实时计算电机的额定电流、转矩、转速等关键参数，帮助理解电机参数之间的关系。',
    duration: '10分钟',
    difficulty: '进阶'
  }
];

/** 技能节点数据 */
export const skillNodes: Skill[] = [
  // 根节点
  { id: 'root', name: '新能源汽车技术', category: 5, level: 'L0', status: 'mastered', score: 100, x: 400, y: 50 },
  
  // 一级节点 - 节点大类
  { id: 'category-0', name: '动力电池技术', category: 5, level: 'L1', status: 'mastered', score: 90, x: 200, y: 150 },
  { id: 'category-1', name: '电驱动技术', category: 5, level: 'L1', status: 'good', score: 80, x: 400, y: 150 },
  { id: 'category-2', name: '电控网络技术', category: 5, level: 'L1', status: 'good', score: 75, x: 600, y: 150 },
  { id: 'category-3', name: '充电技术', category: 5, level: 'L1', status: 'good', score: 78, x: 300, y: 250 },
  { id: 'category-4', name: '热管理技术', category: 5, level: 'L1', status: 'weak', score: 65, x: 500, y: 250 },
  
  // 动力电池技术 (category: 0)
  { id: 'skill-001', name: '动力电池结构认知', category: 0, level: 'L2', status: 'mastered', score: 95, x: 300, y: 100 },
  { id: 'skill-002', name: '电池管理系统原理', category: 0, level: 'L2', status: 'good', score: 82, x: 450, y: 150 },
  { id: 'skill-003', name: '电池故障诊断', category: 0, level: 'L3', status: 'good', score: 78, x: 600, y: 200 },
  { id: 'skill-004', name: '电池SOC估算', category: 0, level: 'L3', status: 'weak', score: 65, x: 350, y: 200 },
  { id: 'skill-005', name: '电池SOH评估', category: 0, level: 'L3', status: 'weak', score: 62, x: 500, y: 250 },
  { id: 'skill-006', name: '电池均衡控制', category: 0, level: 'L4', status: 'veryWeak', score: 45, x: 250, y: 250 },
  { id: 'skill-007', name: '电池热管理系统', category: 0, level: 'L2', status: 'good', score: 76, x: 400, y: 300 },
  { id: 'skill-008', name: '电池PACK设计', category: 0, level: 'L4', status: 'veryWeak', score: 40, x: 550, y: 350 },
  { id: 'skill-009', name: '电池材料认知', category: 0, level: 'L2', status: 'good', score: 79, x: 200, y: 150 },
  { id: 'skill-010', name: '电池系统集成', category: 0, level: 'L3', status: 'weak', score: 68, x: 650, y: 250 },
  { id: 'skill-011', name: '电池安全防护', category: 0, level: 'L2', status: 'good', score: 81, x: 300, y: 250 },
  { id: 'skill-012', name: '电池充放电特性', category: 0, level: 'L2', status: 'mastered', score: 90, x: 450, y: 100 },
  { id: 'skill-013', name: '电池寿命预测', category: 0, level: 'L4', status: 'veryWeak', score: 35, x: 600, y: 150 },
  { id: 'skill-014', name: '电池系统测试', category: 0, level: 'L3', status: 'weak', score: 63, x: 250, y: 200 },
  { id: 'skill-015', name: '电池法规标准', category: 0, level: 'L2', status: 'good', score: 75, x: 500, y: 100 },
  
  // 电驱动技术 (category: 1)
  { id: 'skill-016', name: '电机控制器调试', category: 1, level: 'L3', status: 'weak', score: 65, x: 300, y: 300 },
  { id: 'skill-017', name: '永磁同步电机原理', category: 1, level: 'L2', status: 'good', score: 80, x: 450, y: 350 },
  { id: 'skill-018', name: '异步电机原理', category: 1, level: 'L2', status: 'good', score: 77, x: 600, y: 400 },
  { id: 'skill-019', name: '电机驱动系统设计', category: 1, level: 'L4', status: 'veryWeak', score: 42, x: 350, y: 400 },
  { id: 'skill-020', name: '电机效率优化', category: 1, level: 'L3', status: 'weak', score: 61, x: 500, y: 450 },
  { id: 'skill-021', name: '电机故障诊断', category: 1, level: 'L3', status: 'weak', score: 67, x: 250, y: 350 },
  { id: 'skill-022', name: '电机控制算法', category: 1, level: 'L4', status: 'veryWeak', score: 38, x: 650, y: 450 },
  { id: 'skill-023', name: '电机参数辨识', category: 1, level: 'L3', status: 'weak', score: 59, x: 400, y: 450 },
  { id: 'skill-024', name: '电机系统集成', category: 1, level: 'L3', status: 'weak', score: 64, x: 200, y: 400 },
  { id: 'skill-025', name: '电机热管理', category: 1, level: 'L2', status: 'good', score: 74, x: 550, y: 500 },
  { id: 'skill-026', name: '电机测试技术', category: 1, level: 'L2', status: 'good', score: 78, x: 300, y: 400 },
  { id: 'skill-027', name: '电机NVH分析', category: 1, level: 'L4', status: 'veryWeak', score: 35, x: 500, y: 550 },
  { id: 'skill-028', name: '电机选型设计', category: 1, level: 'L3', status: 'weak', score: 60, x: 250, y: 450 },
  { id: 'skill-029', name: '电机控制系统仿真', category: 1, level: 'L3', status: 'weak', score: 58, x: 600, y: 500 },
  { id: 'skill-030', name: '电机驱动系统调试', category: 1, level: 'L3', status: 'weak', score: 63, x: 350, y: 500 },
  
  // 电控网络技术 (category: 2)
  { id: 'skill-031', name: '整车CAN网络架构', category: 2, level: 'L2', status: 'mastered', score: 92, x: 600, y: 300 },
  { id: 'skill-032', name: 'CAN总线通信协议', category: 2, level: 'L2', status: 'good', score: 81, x: 450, y: 350 },
  { id: 'skill-033', name: 'CAN网络故障诊断', category: 2, level: 'L3', status: 'weak', score: 65, x: 300, y: 400 },
  { id: 'skill-034', name: 'LIN总线原理', category: 2, level: 'L2', status: 'good', score: 77, x: 550, y: 400 },
  { id: 'skill-035', name: '以太网车载网络', category: 2, level: 'L3', status: 'veryWeak', score: 45, x: 250, y: 450 },
  { id: 'skill-036', name: '车载网关设计', category: 2, level: 'L4', status: 'veryWeak', score: 38, x: 500, y: 450 },
  { id: 'skill-037', name: '车载网络安全', category: 2, level: 'L3', status: 'weak', score: 61, x: 350, y: 500 },
  { id: 'skill-038', name: '诊断协议UDS', category: 2, level: 'L3', status: 'weak', score: 59, x: 600, y: 450 },
  { id: 'skill-039', name: '车载网络测试', category: 2, level: 'L2', status: 'good', score: 76, x: 200, y: 500 },
  { id: 'skill-040', name: 'CAN FD技术', category: 2, level: 'L3', status: 'weak', score: 57, x: 400, y: 550 },
  { id: 'skill-041', name: '车载网络拓扑设计', category: 2, level: 'L3', status: 'weak', score: 62, x: 550, y: 550 },
  { id: 'skill-042', name: '车载网络仿真', category: 2, level: 'L3', status: 'weak', score: 58, x: 300, y: 550 },
  { id: 'skill-043', name: '车载网络工具使用', category: 2, level: 'L2', status: 'good', score: 79, x: 450, y: 500 },
  { id: 'skill-044', name: '车载网络架构优化', category: 2, level: 'L4', status: 'veryWeak', score: 40, x: 650, y: 550 },
  { id: 'skill-045', name: '车载网络标准法规', category: 2, level: 'L2', status: 'good', score: 74, x: 250, y: 550 },
  
  // 充电技术 (category: 3)
  { id: 'skill-046', name: '充电系统原理', category: 3, level: 'L2', status: 'good', score: 79, x: 300, y: 500 },
  { id: 'skill-047', name: '快充系统设计', category: 3, level: 'L3', status: 'weak', score: 63, x: 450, y: 550 },
  { id: 'skill-048', name: '慢充系统设计', category: 3, level: 'L2', status: 'good', score: 75, x: 600, y: 600 },
  { id: 'skill-049', name: '充电接口标准', category: 3, level: 'L2', status: 'mastered', score: 90, x: 250, y: 600 },
  { id: 'skill-050', name: '充电协议解析', category: 3, level: 'L3', status: 'weak', score: 61, x: 500, y: 650 },
  { id: 'skill-051', name: '充电系统测试', category: 3, level: 'L2', status: 'good', score: 77, x: 350, y: 650 },
  { id: 'skill-052', name: '充电系统故障诊断', category: 3, level: 'L3', status: 'weak', score: 59, x: 550, y: 700 },
  { id: 'skill-053', name: '无线充电技术', category: 3, level: 'L4', status: 'veryWeak', score: 35, x: 200, y: 650 },
  { id: 'skill-054', name: '充电系统集成', category: 3, level: 'L3', status: 'weak', score: 64, x: 400, y: 700 },
  { id: 'skill-055', name: '充电系统安全', category: 3, level: 'L2', status: 'good', score: 81, x: 650, y: 650 },
  { id: 'skill-056', name: '充电功率优化', category: 3, level: 'L3', status: 'weak', score: 60, x: 300, y: 700 },
  { id: 'skill-057', name: 'V2G技术', category: 3, level: 'L4', status: 'veryWeak', score: 38, x: 450, y: 750 },
  { id: 'skill-058', name: '充电系统仿真', category: 3, level: 'L3', status: 'weak', score: 58, x: 500, y: 750 },
  { id: 'skill-059', name: '充电系统法规标准', category: 3, level: 'L2', status: 'good', score: 76, x: 250, y: 700 },
  { id: 'skill-060', name: '充电系统热管理', category: 3, level: 'L2', status: 'good', score: 74, x: 600, y: 750 },
  
  // 热管理技术 (category: 4)
  { id: 'skill-061', name: '热管理系统原理', category: 4, level: 'L2', status: 'weak', score: 68, x: 450, y: 550 },
  { id: 'skill-062', name: '整车热管理设计', category: 4, level: 'L3', status: 'weak', score: 65, x: 300, y: 600 },
  { id: 'skill-063', name: '电池热管理系统', category: 4, level: 'L3', status: 'weak', score: 62, x: 550, y: 600 },
  { id: 'skill-064', name: '电机热管理系统', category: 4, level: 'L2', status: 'good', score: 77, x: 200, y: 650 },
  { id: 'skill-065', name: '热管理系统测试', category: 4, level: 'L2', status: 'good', score: 75, x: 400, y: 650 },
  { id: 'skill-066', name: '热管理系统仿真', category: 4, level: 'L3', status: 'weak', score: 59, x: 650, y: 700 },
  { id: 'skill-067', name: '热管理系统故障诊断', category: 4, level: 'L3', status: 'weak', score: 61, x: 350, y: 700 },
  { id: 'skill-068', name: '热管理系统优化', category: 4, level: 'L4', status: 'veryWeak', score: 42, x: 500, y: 700 },
  { id: 'skill-069', name: '热管理系统集成', category: 4, level: 'L3', status: 'weak', score: 60, x: 250, y: 750 },
  { id: 'skill-070', name: '热管理系统法规标准', category: 4, level: 'L2', status: 'good', score: 74, x: 450, y: 800 },
  { id: 'skill-071', name: '热管理系统控制策略', category: 4, level: 'L3', status: 'weak', score: 58, x: 600, y: 800 },
  { id: 'skill-072', name: '热管理系统传感器', category: 4, level: 'L2', status: 'good', score: 76, x: 300, y: 800 }
];

/** 技能连接数据 */
export const skillLinks: SkillLink[] = [
  // 根节点与一级节点的连接
  { source: 'root', target: 'category-0' },
  { source: 'root', target: 'category-1' },
  { source: 'root', target: 'category-2' },
  { source: 'root', target: 'category-3' },
  { source: 'root', target: 'category-4' },
  
  // 一级节点与动力电池技术技能点的连接
  { source: 'category-0', target: 'skill-001' },
  { source: 'category-0', target: 'skill-002' },
  { source: 'category-0', target: 'skill-003' },
  { source: 'category-0', target: 'skill-004' },
  { source: 'category-0', target: 'skill-005' },
  { source: 'category-0', target: 'skill-006' },
  { source: 'category-0', target: 'skill-007' },
  { source: 'category-0', target: 'skill-008' },
  { source: 'category-0', target: 'skill-009' },
  { source: 'category-0', target: 'skill-010' },
  { source: 'category-0', target: 'skill-011' },
  { source: 'category-0', target: 'skill-012' },
  { source: 'category-0', target: 'skill-013' },
  { source: 'category-0', target: 'skill-014' },
  { source: 'category-0', target: 'skill-015' },
  
  // 一级节点与电驱动技术技能点的连接
  { source: 'category-1', target: 'skill-016' },
  { source: 'category-1', target: 'skill-017' },
  { source: 'category-1', target: 'skill-018' },
  { source: 'category-1', target: 'skill-019' },
  { source: 'category-1', target: 'skill-020' },
  { source: 'category-1', target: 'skill-021' },
  { source: 'category-1', target: 'skill-022' },
  { source: 'category-1', target: 'skill-023' },
  { source: 'category-1', target: 'skill-024' },
  { source: 'category-1', target: 'skill-025' },
  { source: 'category-1', target: 'skill-026' },
  { source: 'category-1', target: 'skill-027' },
  { source: 'category-1', target: 'skill-028' },
  { source: 'category-1', target: 'skill-029' },
  { source: 'category-1', target: 'skill-030' },
  
  // 一级节点与电控网络技术技能点的连接
  { source: 'category-2', target: 'skill-031' },
  { source: 'category-2', target: 'skill-032' },
  { source: 'category-2', target: 'skill-033' },
  { source: 'category-2', target: 'skill-034' },
  { source: 'category-2', target: 'skill-035' },
  { source: 'category-2', target: 'skill-036' },
  { source: 'category-2', target: 'skill-037' },
  { source: 'category-2', target: 'skill-038' },
  { source: 'category-2', target: 'skill-039' },
  { source: 'category-2', target: 'skill-040' },
  { source: 'category-2', target: 'skill-041' },
  { source: 'category-2', target: 'skill-042' },
  { source: 'category-2', target: 'skill-043' },
  { source: 'category-2', target: 'skill-044' },
  { source: 'category-2', target: 'skill-045' },
  
  // 一级节点与充电技术技能点的连接
  { source: 'category-3', target: 'skill-046' },
  { source: 'category-3', target: 'skill-047' },
  { source: 'category-3', target: 'skill-048' },
  { source: 'category-3', target: 'skill-049' },
  { source: 'category-3', target: 'skill-050' },
  { source: 'category-3', target: 'skill-051' },
  { source: 'category-3', target: 'skill-052' },
  { source: 'category-3', target: 'skill-053' },
  { source: 'category-3', target: 'skill-054' },
  { source: 'category-3', target: 'skill-055' },
  { source: 'category-3', target: 'skill-056' },
  { source: 'category-3', target: 'skill-057' },
  { source: 'category-3', target: 'skill-058' },
  { source: 'category-3', target: 'skill-059' },
  { source: 'category-3', target: 'skill-060' },
  
  // 一级节点与热管理技术技能点的连接
  { source: 'category-4', target: 'skill-061' },
  { source: 'category-4', target: 'skill-062' },
  { source: 'category-4', target: 'skill-063' },
  { source: 'category-4', target: 'skill-064' },
  { source: 'category-4', target: 'skill-065' },
  { source: 'category-4', target: 'skill-066' },
  { source: 'category-4', target: 'skill-067' },
  { source: 'category-4', target: 'skill-068' },
  { source: 'category-4', target: 'skill-069' },
  { source: 'category-4', target: 'skill-070' },
  { source: 'category-4', target: 'skill-071' },
  { source: 'category-4', target: 'skill-072' }
];
