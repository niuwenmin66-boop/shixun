import { useState } from 'react';
import { motion } from 'framer-motion';

// 虚仿演练资源数据
const simulationResources = [
  {
    id: 1,
    title: '动力电池系统结构认知与故障诊断虚拟仿真',
    subtitle: '3D虚拟拆装与BMS故障排查',
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新能源汽车动力电池包3D爆炸图，展示电芯、模组、BMS、冷却管路等内部结构，透明背景，科技感强&image_size=landscape_16_9",
    video: 'https://e.necibook.com/api/media/api/v1/media/showImage/2021466156888952832',
    tags: ['核心系统', '3D拆装', '故障诊断'],
    difficulty: '⭐⭐⭐',
    difficultyLevel: '中级',
    duration: '4学时',
    description: '通过三维虚拟现实技术，真实还原动力电池系统内外部结构。学员可进行电芯模组拆装、BMS电路检测、热失控故障模拟等操作，掌握动力电池工作原理、关键参数检测及常见故障诊断方法。',
    learningGoals: [
      '识别动力电池各组成部件',
      '掌握BMS通信协议检测',
      '完成绝缘故障诊断流程'
    ],
    link: '#/simulation/battery-system',
    status: '已完成',
    isClickable: true
  },
  {
    id: 2,
    title: '电驱动系统工作原理与性能测试虚拟仿真',
    subtitle: '电机控制器调试与效率分析',
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新能源汽车永磁同步电机剖面图，展示定子、转子、旋变传感器，配合控制器电路示意，深色科技背景&image_size=landscape_16_9",
    video: 'https://e.necibook.com/api/media/api/v1/media/showImage/2021463124759248896',
    tags: ['核心系统', '性能测试', '波形分析'],
    difficulty: '⭐⭐⭐⭐',
    difficultyLevel: '较难',
    duration: '6学时',
    description: '构建永磁同步电机与电机控制器的虚拟测试台架，支持电机转速转矩特性曲线测试、SVPWM调制波形观测、旋变信号解码等实验。可模拟不同工况下的电机效率map图，理解电驱动系统能量流。',
    learningGoals: [
      '理解电机矢量控制原理',
      '掌握电机性能参数测试',
      '分析电驱系统故障案例'
    ],
    link: '#/simulation/edrive-system',
    status: '未开始',
    isClickable: true
  },
  {
    id: 3,
    title: '整车电控网络与能量管理策略虚拟仿真',
    subtitle: 'CAN总线分析与VCU标定',
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新能源汽车整车网络拓扑图，展示VCU、BMS、MCU、OBC等节点及CAN/LIN总线连接，浅色线路风格&image_size=landscape_16_9",
    video: 'https://e.necibook.com/api/media/api/v1/media/showImage/2021463972480602112',
    tags: ['核心系统', '网络通信', '策略分析'],
    difficulty: '⭐⭐⭐⭐⭐',
    difficultyLevel: '高级',
    duration: '8学时',
    description: '搭建完整的新能源汽车电子电气架构虚拟环境，包含整车控制器VCU、电池管理系统BMS、电机控制器MCU等节点的CAN通信网络。支持报文监控、故障码读取、能量管理策略标定等高级功能。',
    learningGoals: [
      '解析整车CAN网络架构',
      '掌握报文解码与故障诊断',
      '优化能量回收策略'
    ],
    link: '#/simulation/vehicle-control',
    status: '未开始',
    isClickable: true
  },
  {
    id: 4,
    title: '交直流充电系统与充电桩运维虚拟仿真',
    subtitle: '国标充电协议与故障排查',
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新能源汽车充电桩与车辆充电口连接场景，展示CC/CP信号交互、充电枪内部结构，实景3D渲染&image_size=landscape_16_9",
    video: 'https://e.necibook.com/api/media/api/v1/media/showImage/2021464281667915776',
    tags: ['核心系统', '标准协议', '运维实操'],
    difficulty: '⭐⭐⭐',
    difficultyLevel: '中级',
    duration: '4学时',
    description: '依据GB/T 18487和GB/T 27930标准，构建交流慢充与直流快充的完整仿真环境。学员可体验充电握手过程、BMS与充电桩通信、绝缘检测、充电异常处理等全流程，掌握充电桩运维技能。',
    learningGoals: [
      '理解充电握手时序',
      '掌握充电故障分级处理',
      '完成充电桩日常维护'
    ],
    link: '#/simulation/charging-system',
    status: '已完成',
    isClickable: true
  },
  {
    id: 5,
    title: '整车热管理系统与热泵空调虚拟仿真',
    subtitle: '多模式热平衡与能效优化',
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新能源汽车热管理系统原理图，展示电池冷却回路、电机冷却回路、空调系统、热泵四通阀等，蓝色科技风格&image_size=landscape_16_9",
    video: 'https://e.necibook.com/api/media/api/v1/media/showImage/2021464898052259840',
    tags: ['核心系统', '系统集成', '能效分析'],
    difficulty: '⭐⭐⭐⭐',
    difficultyLevel: '较难',
    duration: '5学时',
    description: '构建包含PTC加热、热泵空调、液冷系统的整车热管理虚拟平台。支持高温快充冷却、低温预热、座舱采暖等多场景仿真，实时显示各回路温度/流量/压力参数，理解热管理对续航的影响。',
    learningGoals: [
      '分析热管理系统架构',
      '掌握热泵工作模式切换',
      '优化低温续航策略'
    ],
    link: '#/simulation/thermal-system',
    status: '未开始',
    isClickable: true
  }
];

export default function SimulationPractice() {
  // 视频弹窗状态管理
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<typeof simulationResources[0] | null>(null);

  // 处理资源点击事件
  const handleResourceClick = (resource: typeof simulationResources[0]) => {
    if (resource.isClickable && resource.link) {
      // 在实际应用中，这里可以进行页面跳转或打开新窗口
      alert(`将跳转到：${resource.title}`);
    }
  };

  // 处理预览点击事件
  const handlePreviewClick = (e: React.MouseEvent, resource: typeof simulationResources[0]) => {
    e.stopPropagation();
    setCurrentResource(resource);
    setIsVideoModalOpen(true);
  };

  // 处理开始实验点击事件
  const handleStartClick = (e: React.MouseEvent, resource: typeof simulationResources[0]) => {
    e.stopPropagation();
    if (resource.isClickable && resource.link) {
      alert(`开始实验：${resource.title}`);
    }
  };

  // 关闭视频弹窗
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentResource(null);
  };

  return (
    <div className="h-full">
      {/* 白色卡片容器 */}
      <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 h-[calc(100vh-100px)] overflow-y-auto max-w-5xl mx-auto">
        {/* 模块头部区 */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-medium text-[var(--text-primary)] mb-2">5大核心实训场景 · 沉浸式3D交互 · 理虚一体化训练</h2>
          <div className="bg-[var(--bg-primary)] px-4 py-2 rounded-lg inline-block mx-auto mt-4">
            <span className="text-[var(--text-primary)]">已完成 2/5 个资源</span>
          </div>
        </div>

        {/* 资源卡片网格区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulationResources.map((resource) => (
            <motion.div
              key={resource.id}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 12px 32px rgba(255,143,163,0.16)'
              }}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] overflow-hidden cursor-${resource.isClickable ? 'pointer' : 'default'}`}
              onClick={() => handleResourceClick(resource)}
            >
              {/* 资源封面图 */}
              <div className="relative h-48">
                <motion.img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                {/* 系统分类角标 */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[var(--brand-pink)] text-white px-3 py-1 rounded-full text-xs font-medium">
                    {resource.tags[0]}
                  </span>
                </div>
                {/* 悬停遮罩和按钮 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4"
                >
                  <div className="flex space-x-3 justify-center">
                    <button
                      onClick={(e) => handlePreviewClick(e, resource)}
                      className="bg-white/90 text-[var(--text-primary)] px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors flex items-center justify-center"
                    >
                      <i className="fa-solid fa-eye mr-1"></i>
                      预览
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* 卡片内容 */}
              <div className="p-4">
                {/* 标签组 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 标题和副标题 */}
                <h3 className="text-base font-medium text-[var(--text-primary)] mb-1 line-clamp-2">
                  {resource.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mb-3">
                  {resource.subtitle}
                </p>

                {/* 难度等级和学时 */}
                <div className="flex items-center mb-3 text-sm">
                  <span className="text-[var(--text-primary)]">{resource.difficulty} {resource.difficultyLevel}</span>
                  <span className="mx-2 text-[var(--text-secondary)]">|</span>
                  <span className="text-[var(--text-secondary)]">建议{resource.duration}</span>
                </div>

                {/* 资源简介 */}
                <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-3">
                  {resource.description}
                </p>

                {/* 学习目标 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">学习目标：</h4>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                    {resource.learningGoals.map((goal, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">·</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 状态标识和主按钮 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                    {resource.status}
                  </span>
                  <button
                    onClick={(e) => handleStartClick(e, resource)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      resource.isClickable 
                        ? 'bg-[var(--brand-pink)] text-white hover:bg-[var(--brand-pink)]/90'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!resource.isClickable}
                  >
                    开始实验
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* 使用说明 */}
        <div className="mt-8 p-4 bg-[var(--bg-primary)] rounded-lg">
          <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">使用说明</h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start">
              <i className="fa-solid fa-circle-info text-[var(--brand-pink)] mt-1 mr-2"></i>
              <span>虚拟演练模块提供了新能源汽车各系统的交互式3D模拟操作，帮助学生在虚拟环境中熟悉操作流程。</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-circle-info text-[var(--brand-pink)] mt-1 mr-2"></i>
              <span>所有虚仿资源均已开放，点击"开始实验"按钮进入对应资源页面。</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-circle-info text-[var(--brand-pink)] mt-1 mr-2"></i>
              <span>建议使用Chrome、Firefox等现代浏览器，并确保网络连接稳定。</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 视频播放弹窗 */}
      {isVideoModalOpen && currentResource && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors z-10"
            >
              <i className="fa-solid fa-times"></i>
            </button>

            {/* 视频标题 */}
            <h3 className="text-white text-xl font-medium mb-4 text-center">
              {currentResource.title} - 预览视频
            </h3>

            {/* 视频播放器 */}
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                src={currentResource.video}
                controls
                autoPlay
                muted
                className="w-full h-auto max-h-[70vh]"
              >
                您的浏览器不支持视频播放
              </video>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}