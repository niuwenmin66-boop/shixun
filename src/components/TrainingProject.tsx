import { useState } from 'react';
import { motion } from 'framer-motion';

// 实训项目资源数据
const trainingProjects = [
  {
    id: 1,
    title: '结构原理实训',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E7%BB%93%E6%9E%84%E5%8E%9F%E7%90%86%E5%AE%9E%E8%AE%AD%EF%BC%8C%E7%9C%9F%E5%AE%9E%E5%AE%9E%E9%AA%8C%E5%AE%A4%E5%9C%BA%E6%99%AF%EF%BC%8C%E5%AD%A6%E7%94%9F%E6%93%8D%E4%BD%9C&sign=17343d3df5bcff3c31b591236cc792da",
    isClickable: false
  },
  {
    id: 2,
    title: '拆装实训-更换充配电总成',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E5%85%85%E9%85%8D%E7%94%B5%E6%80%BB%E6%88%90%E6%8B%86%E8%A3%85%E5%AE%9E%E8%AE%AD%EF%BC%8C%E7%9C%9F%E5%AE%9E%E6%93%8D%E4%BD%9C%E5%9C%BA%E6%99%AF&sign=3989d4754e150e5b5dab50df3b2e4723",
    isClickable: false
  },
  {
    id: 3,
    title: '高压虚仿实训',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E9%AB%98%E5%8E%8B%E7%B3%BB%E7%BB%9F%E5%AE%9E%E8%AE%AD%EF%BC%8C%E5%AE%89%E5%85%A8%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA&sign=ae9e42893425f988a4a28332c5cec619",
    isClickable: false
  },
  {
    id: 4,
    title: '故障维护实训',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E6%95%85%E9%9A%9C%E8%AF%8A%E6%96%AD%E4%B8%8E%E7%BB%B4%E6%8A%A4%E5%AE%9E%E8%AE%AD%EF%BC%8C%E7%9C%9F%E5%AE%9E%E7%BB%B4%E4%BF%AE%E5%9C%BA%E6%99%AF&sign=a50af15f2c70c77fb55a8d97e1ef0162",
    isClickable: false
  },
  {
    id: 5,
    title: '交流异步电机拆卸实训（带手套）',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%BA%A4%E6%B5%81%E5%BC%82%E6%AD%A5%E7%94%B5%E6%9C%BA%E6%8B%86%E5%8D%B8%E5%AE%9E%E8%AE%AD%EF%BC%8C%E7%9C%9F%E5%AE%9E%E6%93%8D%E4%BD%9C%E5%9C%BA%E6%99%AF%EF%BC%8C%E5%AD%A6%E7%94%9F%E5%88%86%E7%BB%84%E5%AD%A6%E4%B9%A0&sign=7ab9b4172433cc940001d63f03dbcc09",
    isClickable: true
  },
  {
    id: 6,
    title: '交流异步电机安装实训（上传视频）',
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=交流异步电机安装实训，真实操作场景，学生分组学习，技术培训，职业教育&image_size=landscape_4_3",
    isClickable: true,
    htmlPath: '/Observe_LSTM_Project/web/realtime_tasks_to_lstm_T60_v2c_demo_ui_fix9_fullvideo_judgeNEWUI_no_animation (5)DEMO.html'
  }
];

export default function TrainingProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<typeof trainingProjects[0] | null>(null);

  const handleOpenModal = (resource: typeof trainingProjects[0]) => {
    setCurrentResource(resource);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentResource(null);
  };

  // 处理资源点击事件
  const handleResourceClick = (resource: typeof trainingProjects[0]) => {
    if (resource.isClickable) {
      handleOpenModal(resource);
    }
  };

  // 处理开始实验点击事件
  const handleStartClick = (e: React.MouseEvent, resource: typeof trainingProjects[0]) => {
    e.stopPropagation();
    if (resource.isClickable) {
      handleOpenModal(resource);
    }
  };

  return (
    <div className="h-full">
      {/* 白色卡片容器 */}
      <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 h-[calc(100vh-100px)] overflow-y-auto max-w-5xl mx-auto">
        {/* 模块头部区 */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-medium text-[var(--text-primary)] mb-2">6大真实操作场景 · 项目驱动式学习 · 技能实战一体化提升</h2>
        </div>

        {/* 资源卡片网格区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingProjects.map((resource) => (
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
              </div>

              {/* 卡片内容 */}
              <div className="p-4">
                {/* 标题 */}
                <h3 className="text-base font-medium text-[var(--text-primary)] mb-1 line-clamp-2">
                  {resource.title}
                </h3>

                {/* 主按钮 */}
                <div className="flex justify-end">
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
              <span>实训项目模块包含了新能源汽车各系统的真实操作训练，帮助学生掌握实际操作技能。</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-circle-info text-[var(--brand-pink)] mt-1 mr-2"></i>
              <span>所有实训项目资源正在准备中，将根据课程进度陆续开放。</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-circle-info text-[var(--brand-pink)] mt-1 mr-2"></i>
              <span>实训项目需在指导教师的监督下进行，确保操作安全和规范。</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 实训弹窗 */}
      {isModalOpen && currentResource && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div 
            className="bg-white rounded-xl shadow-2xl p-2 w-full h-full flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-medium text-[var(--text-primary)]">{currentResource.title}</h3>
              <button 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                onClick={handleCloseModal}
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-1 flex-grow">
              <iframe 
                src={currentResource.htmlPath ? encodeURI(currentResource.htmlPath) : "/demo_three_views_IMU_POSE (2).html"} 
                className="w-full h-full"
                title={currentResource.title}
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}