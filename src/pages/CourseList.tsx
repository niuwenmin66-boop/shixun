import { useState } from 'react';
import { motion } from 'framer-motion';

// 课程类型
interface Course {
  id: number;
  title: string;
  cover: string;
  description: string;
  duration: string;
  status: string;
  category: string;
}

// 课程数据
const courses: Course[] = [
  // 新增课程 - 放在第一个位置
  {
    id: 10,
    title: '新能源汽车动力系统与维护',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新能源汽车动力系统与维护课程封面，电机，电池，维护工具，蓝色科技感&image_size=landscape_4_3',
    description: '深入讲解新能源汽车动力系统的结构、工作原理及日常维护方法，包括电机、电池、电控系统的维护与故障排查。',
    duration: '26学时',
    status: '开始学习',
    category: '专业课程'
  },
  // 基础课程
  {
    id: 1,
    title: '新能源汽车概论',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新能源汽车概论课程封面，现代感，科技感，蓝色调&image_size=landscape_4_3',
    description: '介绍新能源汽车的基本概念、发展历程、分类及特点，为后续专业课程学习奠定基础。',
    duration: '16学时',
    status: '未开始',
    category: '基础课程'
  },
  {
    id: 2,
    title: '汽车电气基础',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=汽车电气基础课程封面，电路图，电子元件，红色调&image_size=landscape_4_3',
    description: '讲解汽车电气系统的基本原理、电路分析方法及常用电气元件的工作原理。',
    duration: '20学时',
    status: '未开始',
    category: '基础课程'
  },
  {
    id: 3,
    title: '机械基础',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=机械基础课程封面，机械零件，齿轮，金属质感&image_size=landscape_4_3',
    description: '介绍机械原理、机械零件设计及材料力学等基础知识，为理解汽车结构提供支撑。',
    duration: '24学时',
    status: '未开始',
    category: '基础课程'
  },
  
  // 专业课程
  {
    id: 4,
    title: '动力电池系统',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=动力电池系统课程封面，电池组，能量流动，绿色调&image_size=landscape_4_3',
    description: '深入讲解动力电池的结构、工作原理、管理系统及故障诊断方法。',
    duration: '32学时',
    status: '未开始',
    category: '专业课程'
  },
  {
    id: 5,
    title: '电驱动系统',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=电驱动系统课程封面，电机，控制器，蓝色科技感&image_size=landscape_4_3',
    description: '讲解电机原理、驱动控制策略及电驱动系统的集成与调试。',
    duration: '28学时',
    status: '未开始',
    category: '专业课程'
  },
  {
    id: 6,
    title: '整车控制系统',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=整车控制系统课程封面，汽车控制界面，数据流，紫色调&image_size=landscape_4_3',
    description: '介绍新能源汽车整车控制器的工作原理、控制策略及网络通信。',
    duration: '30学时',
    status: '未开始',
    category: '专业课程'
  },
  
  // 实验课程
  {
    id: 7,
    title: '动力电池拆装实验',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=动力电池拆装实验课程封面，学生操作，电池包，实验室环境&image_size=landscape_4_3',
    description: '通过实际操作，掌握动力电池的拆装流程、安全注意事项及检测方法。',
    duration: '16学时',
    status: '未开始',
    category: '实验课程'
  },
  {
    id: 8,
    title: '电机性能测试实验',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=电机性能测试实验课程封面，测试设备，电机，数据采集&image_size=landscape_4_3',
    description: '学习电机性能测试的方法、设备使用及数据分析。',
    duration: '12学时',
    status: '未开始',
    category: '实验课程'
  },
  {
    id: 9,
    title: '整车故障诊断实验',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=整车故障诊断实验课程封面，诊断仪器，汽车，故障代码&image_size=landscape_4_3',
    description: '通过实际案例，学习新能源汽车常见故障的诊断方法与排除技巧。',
    duration: '20学时',
    status: '未开始',
    category: '实验课程'
  }
];

// 课程分类
const categories = ['全部课程', '基础课程', '专业课程', '实验课程'];

export default function CourseListPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部课程');
  
  // 过滤课程
  const filteredCourses = selectedCategory === '全部课程' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9ff] to-[#ffffff] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* 模块头部区 */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">新能源汽车专业课程</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-10">
              探索新能源汽车技术的精髓，开启绿色出行未来，培养专业技能人才
            </p>
          </motion.div>
          
          {/* 分类筛选 */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${ 
                  selectedCategory === category 
                    ? 'bg-[var(--brand-pink)] text-white shadow-lg shadow-[var(--brand-pink)]/20' 
                    : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--light-pink)]/30 hover:shadow-md' 
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* 课程卡片网格区 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 20px 60px rgba(255,143,163,0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-[20px] shadow-[0_12px_48px_rgba(255,143,163,0.12)] overflow-hidden cursor-pointer border border-gray-100 hover:border-[var(--light-pink)]/50 transition-all duration-300"
              onClick={() => {
                if (course.id === 10) {
                  window.location.href = '/coursedetail';
                }
              }}
            >
              {/* 课程封面图 */}
              <div className="relative h-56 overflow-hidden">
                <motion.img 
                  src={course.cover} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                />
                {/* 分类标签 */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[var(--brand-pink)] text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-md">
                    {course.category}
                  </span>
                </div>
                {/* 课程状态标签 - 仅在新课程显示 */}
                {course.id === 10 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-md">
                      热门课程
                    </span>
                  </div>
                )}
              </div>

              {/* 课程内容 */}
              <div className="p-6">
                {/* 标题 */}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 leading-tight">
                  {course.title}
                </h3>

                {/* 课程介绍 */}
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* 课程信息 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-[var(--text-secondary)] flex items-center font-medium">
                    <i className="fa-solid fa-clock mr-2 text-[var(--brand-pink)]"></i>
                    {course.duration}
                  </span>
                  {course.status === '未开始' ? (
                    <span className="px-5 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      {course.status}
                    </span>
                  ) : (
                    <motion.button 
                      className="px-5 py-2 bg-[var(--brand-pink)] text-white rounded-full text-sm font-medium hover:bg-[var(--brand-pink)]/90 transition-colors shadow-md hover:shadow-lg hover:shadow-[var(--brand-pink)]/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      开始学习
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* 底部装饰 */}
        <div className="text-center mb-10">
          <div className="inline-block px-8 py-4 bg-white rounded-full shadow-md">
            <p className="text-sm text-[var(--text-secondary)]">
              持续更新更多优质课程，敬请期待
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
