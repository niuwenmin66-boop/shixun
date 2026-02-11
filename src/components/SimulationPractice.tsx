import { motion } from 'framer-motion';

// 虚仿演练资源数据
const simulationResources = [
  {
    id: 1,
    title: '结构原理虚仿演练',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E7%BB%93%E6%9E%84%E5%8E%9F%E7%90%86%E8%99%9A%E6%8B%9F%E4%BB%BF%E7%9C%9F%EF%BC%8C3D%E5%BB%BA%E6%A8%A1%EF%BC%8C%E4%BA%A4%E4%BA%92%E5%BC%8F%E5%AD%A6%E4%B9%A0&sign=03eb7268603bda9571578c85e4949b56",
    isClickable: false
  },
  {
    id: 2,
    title: '拆装虚仿演练-更换充配电总成',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E5%85%85%E9%85%8D%E7%94%B5%E6%80%BB%E6%88%90%E8%99%9A%E6%8B%9F%E6%8B%86%E8%A3%85%EF%BC%8C%E4%BA%A4%E4%BA%92%E5%BC%8F3D%E6%A8%A1%E6%8B%9F&sign=69bbce2677fedff26bf5f6d29f41763b",
    isClickable: false
  },
  {
    id: 3,
    title: '高压虚仿演练',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E9%AB%98%E5%8E%8B%E7%B3%BB%E7%BB%9F%E8%99%9A%E6%8B%9F%E6%BC%94%E7%BB%83%EF%BC%8C%E5%AE%89%E5%85%A8%E6%93%8D%E4%BD%9C%E6%A8%A1%E6%8B%9F&sign=b8556799c30d4516eb96a67e584a7bdf",
    isClickable: false
  },
  {
    id: 4,
    title: '故障维护虚仿演练',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E6%95%85%E9%9A%9C%E8%AF%8A%E6%96%AD%E8%99%9A%E6%8B%9F%E6%BC%94%E7%BB%83%EF%BC%8C%E4%BA%A4%E4%BA%92%E5%BC%8F%E6%95%85%E9%9A%9C%E6%8E%92%E6%9F%A5&sign=0b31c85cd838e27fec8b4062761324bc",
    isClickable: false
  },
  {
    id: 5,
    title: '交流异步电机拆卸虚仿演练',
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%BA%A4%E6%B5%81%E5%BC%82%E6%AD%A5%E7%94%B5%E6%9C%BA%E8%99%9A%E6%8B%9F%E6%8B%86%E5%8D%B8%E6%BC%94%E7%BB%83%EF%BC%8C3D%E4%BA%A4%E4%BA%92%E5%BC%8F%E6%A8%A1%E6%8B%9F&sign=f5c9f288c5d2073e4aca4aa281499774",
    isClickable: true,
    link: "#"
  }
];

export default function SimulationPractice() {
  // 处理点击事件
  const handleResourceClick = (resource: typeof simulationResources[0]) => {
    if (resource.isClickable && resource.link) {
      // 在实际应用中，这里可以进行页面跳转或打开新窗口
      alert(`将跳转到：${resource.title}`);
    }
  };

  return (
    <div className="h-full">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {simulationResources.map((resource) => (
          <motion.div
            key={resource.id}
            whileHover={resource.isClickable ? { scale: 1.02 } : {}}
            whileTap={resource.isClickable ? { scale: 0.98 } : {}}
            className={`bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] overflow-hidden cursor-${resource.isClickable ? 'pointer' : 'default'}`}
            onClick={() => handleResourceClick(resource)}
          >
            <div className="relative h-48">
              <img 
                src={resource.image} 
                alt={resource.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {!resource.isClickable && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white px-4 py-1 rounded-full bg-[var(--brand-pink)]/70 text-sm">
                    即将上线
                  </span>
                </div>
              )}
              {resource.isClickable && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <span className="text-white px-4 py-2 w-full flex justify-end">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-base font-medium text-[var(--text-primary)]">{resource.title}</h3>
              <div className="mt-2 flex items-center">
                <div className="w-2 h-2 rounded-full bg-[var(--brand-pink)] mr-2"></div>
                <span className="text-xs text-[var(--text-secondary)]">虚拟仿真资源</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-[var(--bg-primary)] rounded-lg">
        <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">使用说明</h3>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start">
            <i className="fa-solid fa-circle-info text-[var(--brand-pink)] mt-1 mr-2"></i>
            <span>虚拟演练模块提供了新能源汽车各系统的交互式3D模拟操作，帮助学生在虚拟环境中熟悉操作流程。</span>
          </li>
          <li className="flex items-start">
            <i className="fa-solid fa-circle-info text-[var(--brand-pink)] mt-1 mr-2"></i>
            <span>目前仅开放"交流异步电机拆卸虚仿演练"资源，其他资源将陆续上线。</span>
          </li>
          <li className="flex items-start">
            <i className="fa-solid fa-circle-info text-[var(--brand-pink)] mt-1 mr-2"></i>
            <span>建议使用Chrome、Firefox等现代浏览器，并确保网络连接稳定。</span>
          </li>
        </ul>
      </div>
    </div>
  );
}