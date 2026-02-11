import { motion } from 'framer-motion';

// 实训项目资源数据
const trainingProjects = [
  {
    id: 1,
    title: '结构原理实训',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E7%BB%93%E6%9E%84%E5%8E%9F%E7%90%86%E5%AE%9E%E8%AE%AD%EF%BC%8C%E7%9C%9F%E5%AE%9E%E5%AE%9E%E9%AA%8C%E5%AE%A4%E5%9C%BA%E6%99%AF%EF%BC%8C%E5%AD%A6%E7%94%9F%E6%93%8D%E4%BD%9C&sign=17343d3df5bcff3c31b591236cc792da",
  },
  {
    id: 2,
    title: '拆装实训-更换充配电总成',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E5%85%85%E9%85%8D%E7%94%B5%E6%80%BB%E6%88%90%E6%8B%86%E8%A3%85%E5%AE%9E%E8%AE%AD%EF%BC%8C%E7%9C%9F%E5%AE%9E%E6%93%8D%E4%BD%9C%E5%9C%BA%E6%99%AF&sign=3989d4754e150e5b5dab50df3b2e4723",
  },
  {
    id: 3,
    title: '高压虚仿实训',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E9%AB%98%E5%8E%8B%E7%B3%BB%E7%BB%9F%E5%AE%9E%E8%AE%AD%EF%BC%8C%E5%AE%89%E5%85%A8%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA&sign=ae9e42893425f988a4a28332c5cec619",
  },
  {
    id: 4,
    title: '故障维护实训',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E6%95%85%E9%9A%9C%E8%AF%8A%E6%96%AD%E4%B8%8E%E7%BB%B4%E6%8A%A4%E5%AE%9E%E8%AE%AD%EF%BC%8C%E7%9C%9F%E5%AE%9E%E7%BB%B4%E4%BF%AE%E5%9C%BA%E6%99%AF&sign=a50af15f2c70c77fb55a8d97e1ef0162",
  },
  {
    id: 5,
    title: '交流异步电机拆卸实训',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%BA%A4%E6%B5%81%E5%BC%82%E6%AD%A5%E7%94%B5%E6%9C%BA%E6%8B%86%E5%8D%B8%E5%AE%9E%E8%AE%AD%EF%BC%8C%E7%9C%9F%E5%AE%9E%E6%93%8D%E4%BD%9C%E5%9C%BA%E6%99%AF%EF%BC%8C%E5%AD%A6%E7%94%9F%E5%88%86%E7%BB%84%E5%AD%A6%E4%B9%A0&sign=7ab9b4172433cc940001d63f03dbcc09",
  }
];

export default function TrainingProject() {
  return (
    <div className="h-full">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trainingProjects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] overflow-hidden cursor-default"
          >
            <div className="relative h-48">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white px-4 py-1 rounded-full bg-[var(--brand-pink)]/70 text-sm">
                  即将上线
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-base font-medium text-[var(--text-primary)]">{project.title}</h3>
              <div className="mt-2 flex items-center">
                <div className="w-2 h-2 rounded-full bg-[var(--brand-pink)] mr-2"></div>
                <span className="text-xs text-[var(--text-secondary)]">实训项目资源</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-[var(--bg-primary)] rounded-lg">
        <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">实训项目说明</h3>
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
  );
}