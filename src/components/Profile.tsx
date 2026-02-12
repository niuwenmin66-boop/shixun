import { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import * as pdfjsLib from 'pdfjs-dist';
import MotorParameterCalculator from './MotorParameterCalculator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// 技能状态类型
type SkillStatus = 'mastered' | 'good' | 'weak' | 'veryWeak' | 'notLearned';

// 技能类型
interface Skill {
  id: string;
  name: string;
  category: number;
  level: string;
  status: SkillStatus;
  score: number;
  x: number;
  y: number;
}

// 筛选选项类型
interface FilterOptions {
  mastered: boolean;
  good: boolean;
  weak: boolean;
  veryWeak: boolean;
  notLearned: boolean;
}

export default function Profile() {
  // 状态管理
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    mastered: true,
    good: true,
    weak: true,
    veryWeak: true,
    notLearned: false
  });
  const [showLinkPreview, setShowLinkPreview] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 学习概况数据
  const studyOverviewData = {
    totalStudyTime: 128,
    completedCourses: 24,
    skillMasteryRate: 68,
    practicalCompletion: "15/20",
    continuousDays: 12,
    certificationLevel: "L2"
  };

  // 推荐学习资源数据
  const recommendedResources = [
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
      url: 'https://e.necibook.com/api/media/api/v1/media/showImage/2021823151676293120',
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

  // 技能节点数据
  const skillNodes = [
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

  // 技能连接数据
  const skillLinks = [
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

  // 技能状态颜色映射
  const statusColorMap: Record<SkillStatus, string> = {
    mastered: '#722ed1', // 已精通
    good: '#1890ff',     // 已掌握
    weak: '#faad14',     // 一般弱项
    veryWeak: '#f5222d', // 严重弱项
    notLearned: '#bfbfbf' // 未学习
  };

  // 初始化技能图谱
  useEffect(() => {
    if (chartRef.current) {
      // 添加toggleFilter函数到window对象
      (window as any).toggleFilter = (key: keyof FilterOptions) => {
        setFilterOptions(prev => ({
          ...prev,
          [key]: !prev[key]
        }));
      };

      chartInstance.current = echarts.init(chartRef.current);
      updateSkillChart();

      // 绑定节点点击事件
      chartInstance.current.on('click', (params: any) => {
        if (params.dataType === 'node') {
          // 创建一个符合Skill接口的对象
          const skill: Skill = {
            id: params.data.id,
            name: params.data.name,
            status: params.data.status,
            score: params.data.score,
            category: 0, // 默认分类，实际使用中可能需要根据技能ID确定
            level: 'L2', // 默认级别，实际使用中可能需要根据技能ID确定
            x: 0, // 默认坐标
            y: 0  // 默认坐标
          };
          setSelectedSkill(skill);
          setIsDrawerOpen(true);
        }
      });

      // 响应窗口大小变化
      const handleResize = () => {
        chartInstance.current?.resize();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        // 清理toggleFilter函数
        delete (window as any).toggleFilter;
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, []); // 只在组件挂载时初始化一次

  // 当筛选选项变化时更新图谱
  useEffect(() => {
    updateSkillChart();
  }, [filterOptions]);

  // 更新技能图谱
  const updateSkillChart = () => {
    if (!chartInstance.current) return;

    // 过滤节点（根节点和一级节点始终显示）
    const filteredNodes = skillNodes.filter(node => {
      if (node.level === 'L0' || node.level === 'L1') return true;
      if (node.status === 'mastered' && !filterOptions.mastered) return false;
      if (node.status === 'good' && !filterOptions.good) return false;
      if (node.status === 'weak' && !filterOptions.weak) return false;
      if (node.status === 'veryWeak' && !filterOptions.veryWeak) return false;
      if (node.status === 'notLearned' && !filterOptions.notLearned) return false;
      return true;
    });

    // 过滤连接
    const filteredLinks = skillLinks.filter(link => {
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
            
            // 确定所属域
            let domain = '';
            if (params.data.id === 'root') {
              domain = '根节点';
            } else if (params.data.id.startsWith('category-')) {
              domain = params.data.name;
            } else if (params.data.id.startsWith('skill-')) {
              // 根据技能ID确定所属分类
              const skillId = params.data.id;
              if (skillId >= 'skill-001' && skillId <= 'skill-015') {
                domain = '动力电池技术';
              } else if (skillId >= 'skill-016' && skillId <= 'skill-030') {
                domain = '电驱动技术';
              } else if (skillId >= 'skill-031' && skillId <= 'skill-045') {
                domain = '电控网络技术';
              } else if (skillId >= 'skill-046' && skillId <= 'skill-060') {
                domain = '充电技术';
              } else if (skillId >= 'skill-061' && skillId <= 'skill-072') {
                domain = '热管理技术';
              }
            }
            
            return `
              <div style="font-weight: bold; margin-bottom: 4px;">${params.data.name}</div>
              <div>状态: ${statusText}</div>
              <div>得分: ${params.data.score || '-'}</div>
              <div>所属域: ${domain}</div>
            `;
          }
          return '';
        }
      },
      graphic: [
        {
          type: 'group',
          left: 10,
          top: 20,
          z: 10, // 设置z值为10，确保面板位于节点上方
          children: [
            // 面板背景
            {
              type: 'rect',
              shape: {
                width: 150,
                height: 200
              },
              style: {
                fill: 'white',
                stroke: '#ddd',
                lineWidth: 1
              }
            },
            // 标题
            {
              type: 'text',
              left: 15,
              top: 15,
              style: {
                text: '技能掌握情况',
                fontSize: 14,
                fontWeight: 'bold',
                fill: '#333'
              }
            },
            // 已精通
            {
              type: 'group',
              left: 15,
              top: 45,
              children: [
                {
                  type: 'circle',
                  shape: {
                    cx: 0,
                    cy: 0,
                    r: 6
                  },
                  style: {
                    fill: '#722ed1'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('mastered');
                  }
                },
                {
                  type: 'text',
                  left: 15,
                  top: 0,
                  style: {
                    text: `已精通 (${skillStatusCount.mastered})`,
                    fontSize: 12,
                    fill: filterOptions.mastered ? '#333' : '#999'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('mastered');
                  }
                }
              ]
            },
            // 已掌握
            {
              type: 'group',
              left: 15,
              top: 75,
              children: [
                {
                  type: 'circle',
                  shape: {
                    cx: 0,
                    cy: 0,
                    r: 6
                  },
                  style: {
                    fill: '#1890ff'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('good');
                  }
                },
                {
                  type: 'text',
                  left: 15,
                  top: 0,
                  style: {
                    text: `已掌握 (${skillStatusCount.good})`,
                    fontSize: 12,
                    fill: filterOptions.good ? '#333' : '#999'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('good');
                  }
                }
              ]
            },
            // 一般弱项
            {
              type: 'group',
              left: 15,
              top: 105,
              children: [
                {
                  type: 'circle',
                  shape: {
                    cx: 0,
                    cy: 0,
                    r: 6
                  },
                  style: {
                    fill: '#faad14'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('weak');
                  }
                },
                {
                  type: 'text',
                  left: 15,
                  top: 0,
                  style: {
                    text: `一般弱项 (${skillStatusCount.weak})`,
                    fontSize: 12,
                    fill: filterOptions.weak ? '#333' : '#999'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('weak');
                  }
                }
              ]
            },
            // 严重弱项
            {
              type: 'group',
              left: 15,
              top: 135,
              children: [
                {
                  type: 'circle',
                  shape: {
                    cx: 0,
                    cy: 0,
                    r: 6
                  },
                  style: {
                    fill: '#f5222d'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('veryWeak');
                  }
                },
                {
                  type: 'text',
                  left: 15,
                  top: 0,
                  style: {
                    text: `严重弱项 (${skillStatusCount.veryWeak})`,
                    fontSize: 12,
                    fill: filterOptions.veryWeak ? '#333' : '#999'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('veryWeak');
                  }
                }
              ]
            },
            // 未学习
            {
              type: 'group',
              left: 15,
              top: 165,
              children: [
                {
                  type: 'circle',
                  shape: {
                    cx: 0,
                    cy: 0,
                    r: 6
                  },
                  style: {
                    fill: '#bfbfbf'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('notLearned');
                  }
                },
                {
                  type: 'text',
                  left: 15,
                  top: 0,
                  style: {
                    text: `未学习 (${skillStatusCount.notLearned})`,
                    fontSize: 12,
                    fill: filterOptions.notLearned ? '#333' : '#999'
                  },
                  onclick: function() {
                    (window as any).toggleFilter('notLearned');
                  }
                }
              ]
            }
          ]
        }
      ],
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
            itemStyle: {
              color: statusColorMap[node.status as SkillStatus]
            },
            symbolSize: node.level === 'L0' ? 50 : node.level === 'L1' ? 40 : 30,
            // 设置初始位置，避免节点与面板重叠
            x: Math.random() * 700 + 250, // 从250开始，更远地避开左侧面板
            y: Math.random() * 400 + 100  // 从100开始，更远地避开面板顶部
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
            repulsion: 600, // 减少排斥力，使节点更紧凑
            edgeLength: 100, // 缩短边长度，使节点更集中
            gravity: 0.2, // 增加重力，使节点向中心聚集
            layoutAnimation: true
          }
        }
      ]
    };

    chartInstance.current.setOption(option);
  };

  // 关闭抽屉
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedSkill(null);
  };

  // PDF预览组件
  const PDFPreview = ({ url }: { url: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
      const loadPDF = async () => {
        try {
          setLoading(true);
          setError(null);

          // 加载PDF文档
          const pdfDocument = await pdfjsLib.getDocument(url).promise;
          setPageCount(pdfDocument.numPages);

          // 渲染第一页
          const page = await pdfDocument.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = canvasRef.current;
          if (!canvas) return;

          const context = canvas.getContext('2d');
          if (!context) return;

          // 设置canvas尺寸
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // 渲染PDF页面到canvas
          await page.render({
            canvasContext: context,
            viewport: viewport,
            canvas: canvas
          }).promise;

          setLoading(false);
        } catch (err) {
          console.error('PDF加载失败:', err);
          setError('PDF文件加载失败，请尝试下载查看');
          setLoading(false);
        }
      };

      loadPDF();
    }, [url]);

    if (loading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--brand-pink)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">加载PDF中...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="text-center">
            <i className="fa-solid fa-file-pdf text-red-500 text-6xl mb-4"></i>
            <p className="text-[var(--text-secondary)] mb-4">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full overflow-auto">
        <canvas ref={canvasRef} className="mx-auto" />
        {pageCount > 1 && (
          <div className="text-center mt-4 text-sm text-[var(--text-secondary)]">
            第 1 / {pageCount} 页
          </div>
        )}
      </div>
    );
  };

  // Markdown预览组件
  const MarkdownPreview = ({ filePath }: { filePath: string }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [markdownContent, setMarkdownContent] = useState<string>('');

    useEffect(() => {
      const loadMarkdown = async () => {
        try {
          setLoading(true);
          setError(null);

          // 这里我们直接使用静态的Markdown内容，因为在浏览器中无法直接读取本地文件
          // 在实际项目中，应该通过API从服务器获取Markdown内容
          const content = `# 充配电总成拆装实训指导书

## 一、实训目的

1. 掌握充配电总成拆卸前的准备工作流程，包括前舱盖操作、蓄电池断电、维修开关拆卸及放电等关键步骤。
2. 熟练掌握充配电总成拆卸的各项操作技能，能正确使用各类工具完成连接线、插接器、盖板、母线、水管等部件的拆卸。
3. 掌握充配电总成安装的规范流程，确保各部件安装到位、紧固符合标准，明确高压操作的安全规范。
4. 培养规范操作、安全作业的职业素养，了解新能源汽车高压部件维修的安全注意事项。

## 二、实训准备

### （一）工具准备

十号开口扳手、中号棘轮扳手、中号长接杆、13 号六角套筒、十字螺丝刀、内五花扳手、小号棘轮扳手、旋转手柄、十号六角套筒、磁力棒、鲤鱼钳、绝缘手套、绝缘紧固工具、力矩扳手（可测 45 牛米）。

### （二）物料准备

对应车型充配电总成、垫布、电机冷却液、各类螺栓 / 螺母（备用）。

### （三）安全准备

1. 实训前确认场地无易燃易爆物品，通风良好。
2. 所有参与实训人员需了解高压安全规范，高压操作环节必须穿戴绝缘手套。
3. 明确应急处置流程，准备绝缘救援工具。

## 三、实训步骤

### （一）拆卸前准备工作

#### 步骤 1：前舱盖开启及垫布铺设

操作要点：打开车辆前舱盖，在右前翼子板、前保险杠、左前翼子板位置分别铺设垫布，防止操作过程中刮擦车身漆面。

#### 步骤 2：断开蓄电池正负极接头

操作要点：使用十号开口扳手，先断开蓄电池负极线接头，再断开正极线接头，断开后做好接头防护，避免误接触。

#### 步骤 3：拆维修开关并放电

操作要点：拆开扶手箱 USB 面板，取下维修开关；等待十分钟，确保电容内电量完全释放后，再进行后续操作。

### （二）充配电总成拆卸操作

#### 步骤 4：拆卸 DC 直流输出连接线

操作要点：使用中号棘轮扳手、中号长接杆、13 号六角套筒，拆卸充配电总成的 DC 直流输出连接线，取出紧固螺母和直流连接线，做好部件标记。

#### 步骤 5：拆卸三类高压输出插接器

操作要点：依次拆卸 PTC 高压输出插接器、压缩机高压输出插接器、交流充电插接器，拆卸时轻拔插接器卡扣，避免损坏插接器。

#### 步骤 6：拆卸直流充电维修盖板

操作要点：佩戴绝缘手套，使用十字螺丝刀和内五花扳手，拆卸直流充电维修盖板，取出螺栓和维修盖板，妥善放置配件。

#### 步骤 7：拆卸直流输入线及正负极母线

操作要点：使用小号棘轮扳手、旋转手柄、十号六角套筒，拆卸直流输入线鼻子固定螺栓；用磁力棒取出固定螺栓后，缓慢拔出直流充电负极母线和正极母线，做好母线端口防护。

#### 步骤 8：拆卸动力电池输入维修盖板

操作要点：使用十字螺丝刀和内五花扳手，拆卸动力电池输入维修盖板，取出螺栓和维修盖板，放置在指定区域。

#### 步骤 9：拆卸动力电池及电机控制母线

操作要点：使用小号棘轮扳手、旋转手柄、十号六角套筒，拆卸动力电池输入正负极母线和电机控制输出正负母线线鼻子固定螺栓；用磁力棒取出固定螺栓后，拔出对应母线，做好母线分类标记。

#### 步骤 10：拆卸水管固定架

操作要点：使用中号棘轮扳手、中号长接杆、10 号六角套筒，拆卸水管固定架，拆卸过程中注意避免触碰冷却液水管。

#### 步骤 11：拆卸冷却液水管及卡夹

操作要点：使用鲤鱼钳，拆卸充配电总成的冷却液排气管、进水管和出水管卡夹，缓慢拔出水管，收集流出的冷却液，避免污染场地。

#### 步骤 12：拆卸充配电总成搭铁螺栓

操作要点：使用中号棘轮扳手、中号长接杆、13 号六角套筒，拆卸充配电总成搭铁螺栓，取下搭铁线并做好标记。

#### 步骤 13：取出充配电总成

操作要点：先拔出充配电总成低压插接器；再使用中号棘轮扳手、中号长接杆、13 号六角套筒，拆卸充配电总成固定螺栓；平稳取出充配电总成，放置在专用工装台面上。

### （三）充配电总成安装操作

#### 步骤 14：安装充配电总成并紧固

操作要点：将充配电总成安装至指定位置，使用中号棘轮扳手等工具安装固定螺栓，通过力矩扳手将螺栓拧紧至标准力矩 45 牛米，确保紧固到位且力矩符合要求。

#### 步骤 15：安装低压插接器及搭铁螺栓

操作要点：安装充配电总成低压插接器，确保插接器卡紧到位；再安装充配电总成两个搭铁线螺栓，按规定力矩拧紧。

#### 步骤 16：安装水管及水管固定架

操作要点：安装充配电总成进出水口水管、冷却液排气管，确保水管连接紧密无渗漏；再安装水管固定支架，固定好所有水管，避免水管松动。

#### 步骤 17：安装电机及动力电池母线

操作要点：佩戴绝缘手套，安装电机控制器输出正负极母线和动力电池输入正负极母线；安装线鼻子固定螺栓，使用绝缘工具按标准力矩紧固，确保母线连接牢固。

#### 步骤 18：安装动力电池输入维修盖板

操作要点：放置动力电池输入维修盖板，使用十字螺丝刀和内五花扳手拧紧螺栓，确保盖板贴合、螺栓紧固。

#### 步骤 19：安装直流充电母线及维修盖板

操作要点：佩戴绝缘手套，安装直流充电正负极母线，安装线鼻子固定螺栓并用绝缘工具紧固；再安装直流充电维修盖板，用十字螺丝刀和内五花扳手拧紧螺栓。

#### 步骤 20：安装三类高压插接器

操作要点：依次安装交流充电插接器、压缩机高压输出插接器、PTC 高压输出插接器，确保插接器完全卡入，无松动。

#### 步骤 21：安装 DC 12 伏输出连接线

操作要点：安装充配电总成的 DC 12 伏输出连接线，套上螺母并按标准力矩拧紧，确保连接线接触良好。

#### 步骤 22：安装蓄电池负极及相关部件

操作要点：安装蓄电池负极接头并拧紧；再安装维修开关和扶手箱 USB 面板，确保部件安装复位。

### （四）安装后收尾工作

#### 步骤 23：添加冷却液并盖回水壶盖

操作要点：向冷却系统添加电机冷却液至标准最高液位；盖回冷却水壶盖，确保密封良好。

## 四、注意事项

1. 所有高压部件操作环节，必须穿戴绝缘手套，确认断电、放电完成后再操作。
2. 拆卸的螺栓、螺母、插接器等部件需分类放置、做好标记，避免安装时混淆。
3. 力矩紧固环节需使用力矩扳手，严格按照 45 牛米等标准力矩操作，禁止超力矩或欠力矩。
4. 冷却液水管拆卸后需及时收集冷却液，避免环境污染，安装后检查有无渗漏。
5. 充配电总成取出和安装时需轻拿轻放，避免碰撞、损坏部件接口和外壳。
6. 实训全程遵循安全操作规程，若发现异常（如部件损坏、连接松动），立即停止操作并报告指导老师。

## 五、实训考核

1. 流程规范性：拆卸、安装步骤是否符合指导书要求，工具使用是否正确。
2. 操作安全性：高压操作是否佩戴绝缘手套，断电、放电等安全措施是否到位。
3. 部件完整性：实训后部件无丢失、损坏，安装后各部件连接牢固。
4. 结果有效性：充配电总成安装后，冷却液液位正常，无渗漏、松动等问题。`;

          setMarkdownContent(content);
          setLoading(false);
        } catch (err) {
          console.error('Markdown加载失败:', err);
          setError('Markdown文件加载失败');
          setLoading(false);
        }
      };

      loadMarkdown();
    }, [filePath]);

    if (loading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--brand-pink)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">加载Markdown中...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="text-center">
            <i className="fa-solid fa-file-lines text-[var(--brand-pink)] text-6xl mb-4"></i>
            <p className="text-[var(--text-secondary)] mb-4">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    );
  };

  // 技能状态统计
  const skillStatusCount = {
    mastered: skillNodes.filter(node => node.status === 'mastered' && node.level !== 'L0' && node.level !== 'L1').length,
    good: skillNodes.filter(node => node.status === 'good' && node.level !== 'L0' && node.level !== 'L1').length,
    weak: skillNodes.filter(node => node.status === 'weak' && node.level !== 'L0' && node.level !== 'L1').length,
    veryWeak: skillNodes.filter(node => node.status === 'veryWeak' && node.level !== 'L0' && node.level !== 'L1').length,
    notLearned: skillNodes.filter(node => node.status === 'notLearned' && node.level !== 'L0' && node.level !== 'L1').length
  };

  // 亟需提升技能点状态
  const [currentWeakSkillIndex, setCurrentWeakSkillIndex] = useState(0);
  const weakSkills = skillNodes
    .filter(node => node.status === 'veryWeak')
    .sort((a, b) => a.score - b.score);

  // 更换技能点
  const changeWeakSkill = () => {
    setCurrentWeakSkillIndex(prev => (prev + 1) % weakSkills.length);
  };

  // 获取当前技能点
  const currentWeakSkill = weakSkills[currentWeakSkillIndex];

  // 根据当前技能点获取相关的推荐学习资源
  const getRelatedResources = () => {
    // 这里可以根据当前技能点的名称或类型来筛选相关的推荐资源
    // 为了简化实现，我们暂时返回所有推荐资源
    return recommendedResources;
  };

  // 获取当前相关的推荐学习资源
  const relatedResources = getRelatedResources();

  return (
    <div className="p-6 h-[calc(100vh-100px)] max-w-7xl mx-auto">
      {/* 学习概况数据区 */}
      <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 mb-6">
        <h2 className="text-xl font-medium text-[var(--text-primary)] mb-6">学习概况</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* 累计学习时长 */}
          <div className="bg-[var(--bg-primary)] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-secondary)] text-sm">累计学习时长</span>
              <i className="fa-solid fa-clock text-[var(--brand-pink)]"></i>
            </div>
            <div className="text-2xl font-medium text-[var(--text-primary)]">{studyOverviewData.totalStudyTime}小时</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <i className="fa-solid fa-arrow-up mr-1"></i>
              较上周12%
            </div>
          </div>

          {/* 完成任务数 */}
          <div className="bg-[var(--bg-primary)] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-secondary)] text-sm">完成任务数</span>
              <i className="fa-solid fa-check-circle text-[var(--brand-pink)]"></i>
            </div>
            <div className="text-2xl font-medium text-[var(--text-primary)]">{studyOverviewData.completedCourses}个</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <i className="fa-solid fa-arrow-up mr-1"></i>
              较上周3个
            </div>
          </div>

          {/* 技能掌握率 */}
          <div className="bg-[var(--bg-primary)] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-secondary)] text-sm">技能掌握率</span>
              <i className="fa-solid fa-chart-pie text-[var(--brand-pink)]"></i>
            </div>
            <div className="text-2xl font-medium text-[var(--text-primary)]">{studyOverviewData.skillMasteryRate}%</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <i className="fa-solid fa-arrow-up mr-1"></i>
              较上周5%
            </div>
          </div>

          {/* 实训完成度 */}
          <div className="bg-[var(--bg-primary)] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-secondary)] text-sm">实训完成度</span>
              <i className="fa-solid fa-tools text-[var(--brand-pink)]"></i>
            </div>
            <div className="text-2xl font-medium text-[var(--text-primary)]">{studyOverviewData.practicalCompletion}次</div>
            <div className="text-xs text-[var(--text-secondary)] flex items-center mt-1">
              <i className="fa-solid fa-minus mr-1"></i>
              无变化
            </div>
          </div>

          {/* 连续学习天数 */}
          <div className="bg-[var(--bg-primary)] rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-secondary)] text-sm">连续学习天数</span>
              <i className="fa-solid fa-fire text-[var(--brand-pink)]"></i>
            </div>
            <div className="text-2xl font-medium text-[var(--text-primary)]">{studyOverviewData.continuousDays}天</div>
            <div className="text-xs text-yellow-500 flex items-center mt-1">
              <i className="fa-solid fa-fire mr-1"></i>
              保持良好
            </div>
          </div>
        </div>
      </div>

      {/* 技能掌握情况图谱区 */}
      <div className="flex gap-6">
        {/* 左侧个性化学习推荐路径面板 */}
        <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-4 w-80 flex-shrink-0">
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-6">个性化学习路径</h3>
          
          {/* 亟需提升技能点 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">亟需提升技能点</h4>
              {weakSkills.length > 1 && (
                <button
                  onClick={changeWeakSkill}
                  className="text-xs text-[var(--brand-pink)] hover:underline flex items-center"
                >
                  <i className="fa-solid fa-refresh mr-1"></i>
                  换一个
                </button>
              )}
            </div>
            <div className="space-y-3">
              {currentWeakSkill && (
                <div key={currentWeakSkill.id} className="bg-[var(--bg-primary)] rounded-[8px] p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{currentWeakSkill.name}</span>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">严重弱项</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">得分: {currentWeakSkill.score}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* 推荐学习资源 */}
          <div>
            <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">推荐学习资源</h4>
            <div className="space-y-3">
              {relatedResources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="bg-[var(--bg-primary)] rounded-[8px] overflow-hidden cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors relative"
                  onClick={() => {
                    setSelectedResource(resource);
                    setShowLinkPreview(true);
                  }}
                >
                  <div className="relative h-24 overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                      <i className={`fa-solid ${resource.icon} mr-1`}></i>
                      {resource.type}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{resource.name}</span>
                    </div>
                  </div>
                  <button
                    className="absolute bottom-3 right-3 px-3 py-1.5 bg-[var(--brand-pink)] text-white text-xs font-medium rounded-[6px] hover:bg-pink-600 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedResource(resource);
                      setShowLinkPreview(true);
                    }}
                  >
                    开始学习
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 右侧技能图谱 */}
        <div className="flex-1 bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-[var(--text-primary)]">技能图谱</h3>
            <div className="flex items-center bg-[var(--bg-primary)] rounded-[8px] p-2 shadow-sm">
              <i className="fa-solid fa-circle-info text-[var(--text-secondary)] mr-2"></i>
              <p className="text-xs text-[var(--text-secondary)]">点击技能点，可查看掌握程度，AI提供个性化学习建议</p>
            </div>
          </div>
          <div ref={chartRef} style={{ width: '100%', height: '600px' }}></div>
        </div>
      </div>

      {/* 右侧抽屉详情面板 */}
      {isDrawerOpen && selectedSkill && (
        <div className="fixed inset-0 z-50">
          {/* 遮罩层 */}
          <div className="absolute inset-0 bg-black/50" onClick={closeDrawer}></div>
          
          {/* 抽屉 */}
          <div className="absolute right-0 top-0 bottom-0 w-[480px] bg-white p-6 overflow-y-auto">
            {/* 顶部标题栏 */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-[var(--text-primary)]">{selectedSkill.name}</h3>
              <button onClick={closeDrawer} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            {/* 技能掌握程度仪表盘 */}
            <div className="bg-[var(--bg-primary)] rounded-[12px] p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[var(--text-secondary)]">掌握程度</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedSkill.status === 'mastered' ? 'bg-purple-100 text-purple-700' :
                  selectedSkill.status === 'good' ? 'bg-blue-100 text-blue-700' :
                  selectedSkill.status === 'weak' ? 'bg-yellow-100 text-yellow-700' :
                  selectedSkill.status === 'veryWeak' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {
                    selectedSkill.status === 'mastered' ? '已精通' :
                    selectedSkill.status === 'good' ? '已掌握' :
                    selectedSkill.status === 'weak' ? '一般弱项' :
                    selectedSkill.status === 'veryWeak' ? '严重弱项' :
                    '未学习'
                  }
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
                      stroke={statusColorMap[selectedSkill.status as SkillStatus]}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(selectedSkill.score / 100) * 283} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-[var(--text-primary)]">{selectedSkill.score}%</div>
                    <div className="text-xs text-[var(--text-secondary)]">技能评分</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 技能介绍 */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">技能介绍</h4>
              <p className="text-[var(--text-secondary)]">
                本技能涵盖{selectedSkill.name}相关的核心知识点和操作技能，包括理论基础、实际操作流程及常见问题处理。
                通过学习本技能，能够掌握{selectedSkill.name}的基本原理和应用方法，提高实际操作能力和问题解决能力。
              </p>
            </div>

            {/* 学习建议 */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">学习建议</h4>
              <div className="bg-[var(--bg-primary)] rounded-[8px] p-3">
                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                  <li>系统学习{selectedSkill.name}的理论知识</li>
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
                {[
                  {
                    id: 101,
                    name: `${selectedSkill.name}详解`,
                    icon: 'fa-book',
                    type: 'Markdown',
                    url: '充配电总成拆装实训指导书.md',
                    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=200&fit=crop',
                    description: `详细介绍${selectedSkill.name}的核心概念、原理和应用，包括理论基础、实际操作流程及常见问题处理。`,
                    duration: '1小时30分钟',
                    difficulty: '入门'
                  },
                  {
                    id: 102,
                    name: `${selectedSkill.name}操作演示`,
                    icon: 'fa-video',
                    type: '视频',
                    url: 'https://e.necibook.com/api/media/api/v1/media/showImage/2021823151676293120',
                    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop',
                    description: `通过视频演示${selectedSkill.name}的实际操作过程，包括步骤分解、注意事项和常见问题处理方法。`,
                    duration: '30分钟',
                    difficulty: '入门'
                  },
                  {
                    id: 103,
                    name: `${selectedSkill.name}实训项目`,
                    icon: 'fa-tools',
                    type: '组件',
                    url: 'MotorParameterCalculator',
                    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop',
                    description: `通过实际操作练习，巩固${selectedSkill.name}的理论知识，提高实际操作能力和问题解决能力。`,
                    duration: '2小时',
                    difficulty: '进阶'
                  }
                ].map((resource) => (
                  <div 
                    key={resource.id} 
                    className="bg-[var(--bg-primary)] rounded-[8px] p-3 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors relative"
                    onClick={() => {
                      setSelectedResource(resource);
                      setShowLinkPreview(true);
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <i className={`fa-solid ${resource.icon} text-[var(--brand-pink)] mr-2`}></i>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{resource.name}</span>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">{resource.type === 'Markdown' ? '理论学习资料' : resource.type === '视频' ? '视频教程' : '实践练习'}</div>
                    <button
                      className="absolute bottom-3 right-3 px-3 py-1 bg-[var(--brand-pink)] text-white text-xs font-medium rounded-[6px] hover:bg-pink-600 transition-colors shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedResource(resource);
                        setShowLinkPreview(true);
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
      )}

      {/* 资源预览弹窗 */}
      {showLinkPreview && selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 遮罩层 */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowLinkPreview(false)}></div>
          
          {/* 弹窗内容 */}
          <div className="relative bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 w-[80vw] max-w-[1000px] max-h-[90vh] overflow-y-auto">
            {/* 关闭按钮 */}
            <button 
              onClick={() => setShowLinkPreview(false)}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] z-10"
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>

            {/* 资源标题 */}
            <div className="mb-4">
              <h3 className="text-xl font-medium text-[var(--text-primary)]">{selectedResource.name}</h3>
            </div>

            {/* 资源基础信息 */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <i className="fa-solid fa-tag text-[var(--text-secondary)] mr-2"></i>
                  <span className="text-sm text-[var(--text-secondary)]">类型: {selectedResource.type}</span>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-clock text-[var(--text-secondary)] mr-2"></i>
                  <span className="text-sm text-[var(--text-secondary)]">时长: {selectedResource.duration}</span>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-signal text-[var(--text-secondary)] mr-2"></i>
                  <span className="text-sm text-[var(--text-secondary)]">难度: {selectedResource.difficulty}</span>
                </div>
              </div>
            </div>

            {/* 资源描述 */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">资源介绍</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {selectedResource.description}
              </p>
            </div>

            {/* 文档预览 */}
            {selectedResource.type === '文档' && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">文档预览</h4>
                <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-hidden">
                  <PDFPreview url={selectedResource.url} />
                </div>
                <div className="mt-4">
                  <a 
                    href={selectedResource.url} 
                    download
                    className="text-sm text-[var(--brand-pink)] hover:underline flex items-center"
                  >
                    <i className="fa-solid fa-download mr-2"></i>
                    下载文档
                  </a>
                </div>
              </div>
            )}

            {/* Markdown文档预览 */}
            {selectedResource.type === 'Markdown' && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">文档预览</h4>
                <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-y-auto p-6">
                  <MarkdownPreview filePath={selectedResource.url} />
                </div>
              </div>
            )}

            {/* 视频预览 */}
            {selectedResource.type === '视频' && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">视频预览</h4>
                <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-hidden flex items-center justify-center">
                  <video 
                    src={selectedResource.url} 
                    className="w-full h-full object-contain"
                    title={selectedResource.name}
                    controls
                    controlsList="nodownload"
                    onError={(e) => {
                      console.error('视频加载失败:', e);
                      // 可以在这里添加错误处理逻辑，例如显示错误信息
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)]">
                      <i className="fa-solid fa-video text-4xl mb-2"></i>
                      <p>您的浏览器不支持视频播放。</p>
                      <p className="text-xs mt-2">视频加载失败，请检查网络连接或稍后重试。</p>
                    </div>
                  </video>
                </div>
              </div>
            )}

            {/* 网页预览 */}
            {selectedResource.type === '网页' && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">网页预览</h4>
                <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-hidden">
                  <iframe 
                    src={selectedResource.url} 
                    className="w-full h-full"
                    title={selectedResource.name}
                  />
                </div>
              </div>
            )}

            {/* 组件预览 */}
            {selectedResource.type === '组件' && selectedResource.url === 'MotorParameterCalculator' && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">组件预览</h4>
                <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-auto">
                  <MotorParameterCalculator />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
