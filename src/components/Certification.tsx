import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// 证书详情类型
interface CertificateDetail {
  id: string;
  title: string;
  description: string;
  details: string[];
  officialWebsite?: string;
}

export default function Certification() {
  // 弹窗状态
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateDetail | null>(null);
  
  // 证书详情数据
  const certificateDetails: CertificateDetail[] = [
    {
      id: 'low-voltage-electrician',
      title: '特种作业操作证（低压电工）',
      description: '应急管理部颁发，全国通用、3年复审、6年换证，是新能源汽车维修法定上岗资质，所有涉及车载电气（含300-800V高压直流）维修、检测、拆装作业必须持证。',
      details: [
        '电气安全法规与特种作业管理规定',
        '低压电路基础、欧姆定律、功率计算、电气识图',
        '高压安全防护（新能源汽车专项）：绝缘原理、触电急救、电弧防护',
        '万用表、兆欧表、绝缘工具使用规范',
        '新能源汽车高压系统断电、验电、放电、挂牌上锁流程',
        '年龄：18-60周岁，身体健康（无心脏病、癫痫、色盲等）',
        '学历：初中及以上',
        '培训：不少于80学时安全技术培训',
        '考试：理论（机考，80分合格）+实操（现场操作，80分合格）'
      ],
      officialWebsite: 'https://www.mem.gov.cn/'
    },
    {
      id: 'high-voltage-electrician',
      title: '特种作业操作证（高压电工）',
      description: '应急管理部颁发，适用于1kV及以上高压电气作业，新能源汽车高压系统研发、试制、大型充换电站运维必备。',
      details: [
        '高压电路理论、电磁学、电力系统基础',
        '高压开关柜、变压器、配电设备原理与维护',
        '高压倒闸操作、接地保护、防雷技术',
        '高压电气火灾预防、高压触电急救',
        '基础条件同低压电工，部分地区要求持有低压电工证+1年相关经验',
        '培训：不少于120学时',
        '考试：理论+实操，均80分合格，3年复审'
      ],
      officialWebsite: 'https://www.mem.gov.cn/'
    },
    {
      id: 'new-energy-auto-mechanic',
      title: '新能源汽车维修工（五级-一级）',
      description: '人社部备案，第三方评价机构颁发，分初级（五级）、中级（四级）、高级（三级）、技师（二级）、高级技师（一级），是新能源汽修行业通用技能等级证明，求职、薪资定级、职称评定核心参考。',
      details: [
        '新能源汽车构造：三电系统（电池、电机、电控）、高压配电、充电系统',
        '动力电池原理：BMS、电池成组、热管理、均衡技术',
        '驱动电机原理：永磁同步/异步电机、逆变器、矢量控制',
        '整车控制器（VCU）、CAN总线、故障诊断基础',
        '高压安全规范、维修工具使用、环保与回收',
        '初级：年满18，初中及以上，零基础可报',
        '中级：初级证书+2年经验，或中专/技校相关专业毕业',
        '高级：中级证书+3年经验，或大专及以上相关专业',
        '技师/高级技师：逐级晋升，需论文答辩与业绩评审',
        '考试：理论（闭卷）+实操（现场考核），均60分合格'
      ],
      officialWebsite: 'https://www.mohrss.gov.cn/'
    },
    {
      id: 'auto-mechanic-electrician',
      title: '汽车维修工（电工方向，五级-一级）',
      description: '人社部认证，侧重汽车电气系统维修，覆盖传统车与新能源车电路、电控系统，是新能源汽车电控维修基础证书。',
      details: [
        '汽车电工电子基础、电路识图、传感器原理',
        '汽车低压电气系统：灯光、仪表、空调、启动系统',
        '新能源汽车电控系统:VCU、MCU、BMS通信原理',
        '汽车诊断仪、示波器、信号发生器使用',
        '认证要求：同新能源汽车维修工等级要求，侧重电气技能考核'
      ],
      officialWebsite: 'https://www.mohrss.gov.cn/'
    },
    {
      id: 'transport-certificate',
      title: '新能源汽车检测与维修专业能力评价证书（交通运输部）',
      description: '交通运输部职业资格中心颁发，全国通用、终身有效、无需年审，分四大模块，可单独或组合报考，是4S店、维修厂资质备案与招投标必备。',
      details: [
        '四大模块：动力电池及管理系统、驱动电机及控制系统、充电系统检测与维修、整车故障诊断与维修',
        '学历：高中/中专及以上，或相关专业在校生',
        '培训：线上理论+线下实操，总学时约80-120',
        '考试：理论（线上机考，60分合格）+实操（授权考点，60分合格）',
        '发证：成绩合格录入交通职业资格网，官网可查'
      ],
      officialWebsite: 'https://www.mot.gov.cn/'
    },
    {
      id: 'battery-maintenance',
      title: '动力电池维修专项证书',
      description: '聚焦新能源汽车核心部件——动力电池的检测、维护、维修与回收，是电池专修、4S店电池服务岗核心证书。',
      details: [
        '动力电池化学原理、电芯/模组/包结构',
        'BMS深度诊断、电池健康度（SOH）评估',
        '电池热失控预警、漏液处理、安全防护',
        '废旧电池回收、梯次利用、环保规范',
        '基础：高中及以上，或具备新能源汽车维修基础',
        '培训：专项培训约60-80学时',
        '考试：理论+实操，侧重电池专项技能考核'
      ],
      officialWebsite: 'https://www.camra.org.cn/'
    },
    {
      id: 'intelligent-new-energy',
      title: '智能新能源汽车职业技能等级证书（中车行，1+X）',
      description: '教育部1+X证书制度试点，北京中车行高新技术有限公司评价，分初/中/高级，覆盖新能源汽车全技术领域，与职业院校课程深度衔接。',
      details: [
        '模块1：新能源汽车动力驱动电机电池技术（初/中/高）',
        '模块2：新能源汽车电子电气空调舒适技术',
        '模块3：新能源汽车悬架转向制动安全技术',
        '模块4：新能源汽车网关控制娱乐系统技术',
        '模块5：新能源汽车多种能源高新系统技术',
        '面向职业院校学生、社会从业者',
        '培训：按等级约40-80学时',
        '考试：理论+实操，由评价机构组织，60分合格'
      ],
      officialWebsite: 'https://www.zhongchehang.com/'
    },
    {
      id: 'power-drive',
      title: '新能源汽车动力驱动证书（1+X专项）',
      description: '聚焦动力驱动系统，涵盖电机、电池、电控、传动系统，是职教学生动力系统专项能力证明。',
      details: [
        '动力驱动系统整体设计、工作原理',
        '电机控制器、减速器、差速器结构与原理',
        '动力系统匹配、标定、调试',
        '动力驱动系统装配、拆解、检查',
        '电机、控制器、电池性能测试',
        '动力系统故障诊断与维修'
      ],
      officialWebsite: 'https://www.zhongchehang.com/'
    },
    {
      id: 'byd-certification',
      title: '比亚迪新能源汽车维修技术认证',
      description: '比亚迪官方认证，分基础、中级、高级，掌握比亚迪三电系统、刀片电池、DiPilot等核心技术，是比亚迪4S店、授权服务站必备资质。',
      details: [
        '比亚迪e平台架构、刀片电池原理与维护',
        '永磁同步电机、SiC控制器技术',
        'BMS、VCU、MCU系统诊断与维修',
        '高压安全规范、专用诊断工具使用',
        '比亚迪车型三电系统故障诊断与维修',
        '电池包、电机、电控拆装与标定',
        '专用诊断仪（DiagTool）使用、软件刷新',
        '基础：具备新能源汽车维修基础，参加厂家培训',
        '中级/高级：逐级晋升，需通过厂家严格理论+实操考核'
      ],
      officialWebsite: 'https://www.byd.com/'
    },
    {
      id: 'tesla-certification',
      title: '特斯拉新能源汽车维修资质认证',
      description: '特斯拉官方认证，掌握特斯拉高压系统、电池包、电机、Autopilot等技术，是特斯拉授权服务中心、钣喷中心技术岗必备。',
      details: [
        '特斯拉高压架构、400V/800V平台技术',
        '圆柱/方形电池包、BMS、热管理系统',
        '永磁同步电机、逆变器、传动系统',
        '特斯拉诊断工具（Toolbox）使用、软件更新',
        '特斯拉车型高压安全操作、绝缘检测',
        '电池包、电机、电控故障诊断与维修',
        'Autopilot传感器校准、系统标定',
        '需通过特斯拉官方培训与考核，仅限授权渠道报名',
        '要求具备高压电工证与新能源汽车维修经验'
      ],
      officialWebsite: 'https://www.tesla.com/'
    },
    {
      id: 'other-manufacturer',
      title: '其他主流厂商认证',
      description: '各大汽车厂商的新能源汽车维修技术认证，掌握各品牌特色技术，提升就业竞争力。',
      details: [
        '蔚来/小鹏/理想：新能源汽车维修技术认证，掌握各自平台三电系统、智能座舱、自动驾驶技术',
        '大众/宝马/奔驰：新能源（MEB、eDrive、EQ）维修认证，覆盖豪华品牌新能源动力系统',
        '宁德时代/比亚迪电池：动力电池维修认证，专注电芯、模组、BMS深度维修与回收'
      ],
      officialWebsite: 'https://www.caam.org.cn/'
    }
  ];
  
  // 打开弹窗
  const openCertificateModal = (certificateId: string) => {
    const certificate = certificateDetails.find(cert => cert.id === certificateId);
    setSelectedCertificate(certificate || null);
  };
  
  // 关闭弹窗
  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };
  
  return (
    <div className="h-full flex flex-col items-center justify-start p-4 overflow-y-auto">
      {/* 头部 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mb-8"
      >
        <h2 className="text-2xl font-semibold mb-3 text-[var(--text-primary)]">技能认证</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          新能源汽车行业相关技能认证，助力职业发展
        </p>
      </motion.div>

      {/* 左右布局 */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* 左侧：证书分类 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-6"
        >
          {/* 国家强制准入类证书 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)] flex items-center">
              <i className="fa-solid fa-shield-halved text-[var(--brand-pink)] mr-2"></i>
              国家强制准入类证书
            </h3>
            <div className="space-y-4">
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('low-voltage-electrician')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">1. 特种作业操作证（低压电工）</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  应急管理部颁发，全国通用、3年复审、6年换证，是新能源汽车维修法定上岗资质
                </p>
              </div>
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('high-voltage-electrician')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">2. 特种作业操作证（高压电工）</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  应急管理部颁发，适用于1kV及以上高压电气作业，新能源汽车高压系统研发、试制、大型充换电站运维必备
                </p>
              </div>
            </div>
          </motion.section>

          {/* 国家职业技能等级类证书 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)] flex items-center">
              <i className="fa-solid fa-award text-[var(--brand-pink)] mr-2"></i>
              国家职业技能等级类证书
            </h3>
            <div className="space-y-4">
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('new-energy-auto-mechanic')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">1. 新能源汽车维修工（五级-一级）</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  人社部备案，第三方评价机构颁发，分初级（五级）、中级（四级）、高级（三级）、技师（二级）、高级技师（一级）
                </p>
              </div>
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('auto-mechanic-electrician')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">2. 汽车维修工（电工方向，五级-一级）</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  人社部认证，侧重汽车电气系统维修，覆盖传统车与新能源车电路、电控系统
                </p>
              </div>
            </div>
          </motion.section>

          {/* 行业专项能力类证书 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)] flex items-center">
              <i className="fa-solid fa-screwdriver-wrench text-[var(--brand-pink)] mr-2"></i>
              行业专项能力类证书
            </h3>
            <div className="space-y-4">
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('transport-certificate')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">1. 新能源汽车检测与维修专业能力评价证书（交通运输部）</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  交通运输部职业资格中心颁发，全国通用、终身有效、无需年审，分四大模块
                </p>
              </div>
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('battery-maintenance')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">2. 动力电池维修专项证书</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  聚焦新能源汽车核心部件——动力电池的检测、维护、维修与回收
                </p>
              </div>
            </div>
          </motion.section>

          {/* 1+X职业教育类证书 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)] flex items-center">
              <i className="fa-solid fa-graduation-cap text-[var(--brand-pink)] mr-2"></i>
              1+X职业教育类证书
            </h3>
            <div className="space-y-4">
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('intelligent-new-energy')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">1. 智能新能源汽车职业技能等级证书（中车行，1+X）</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  教育部1+X证书制度试点，北京中车行高新技术有限公司评价，分初/中/高级
                </p>
              </div>
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('power-drive')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">2. 新能源汽车动力驱动证书（1+X专项）</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  聚焦动力驱动系统，涵盖电机、电池、电控、传动系统
                </p>
              </div>
            </div>
          </motion.section>

          {/* 厂商专项认证类证书 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)] flex items-center">
              <i className="fa-solid fa-building text-[var(--brand-pink)] mr-2"></i>
              厂商专项认证类证书
            </h3>
            <div className="space-y-4">
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('byd-certification')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">1. 比亚迪新能源汽车维修技术认证</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  比亚迪官方认证，分基础、中级、高级，掌握比亚迪三电系统、刀片电池、DiPilot等核心技术
                </p>
              </div>
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('tesla-certification')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">2. 特斯拉新能源汽车维修资质认证</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  特斯拉官方认证，掌握特斯拉高压系统、电池包、电机、Autopilot等技术
                </p>
              </div>
              <div 
                className="bg-[var(--bg-primary)] rounded-lg p-4 cursor-pointer hover:bg-[var(--light-pink)]/30 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                onClick={() => openCertificateModal('other-manufacturer')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-300">3. 其他主流厂商认证</h4>
                  <button className="px-4 py-1 bg-[var(--brand-pink)] text-white rounded-full text-sm hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:scale-105">
                    查看详情
                  </button>
                </div>
                <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">
                  蔚来/小鹏/理想、大众/宝马/奔驰、宁德时代/比亚迪电池等厂商认证
                </p>
              </div>
            </div>
          </motion.section>
        </motion.div>

        {/* 右侧：推荐考证路径 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full lg:w-80 shrink-0"
        >
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 sticky top-4"
          >
            <h3 className="text-xl font-semibold mb-6 text-[var(--text-primary)] flex items-center">
              <i className="fa-solid fa-route text-[var(--brand-pink)] mr-2"></i>
              推荐考证路径
            </h3>
            <div className="space-y-4">
              <div className="relative">
                {/* 连接线 */}
                <div className="absolute left-4 top-8 bottom-6 w-0.5 bg-[var(--light-pink)]"></div>
                
                {/* 阶段1 */}
                <div className="flex mb-8">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand-pink)] flex items-center justify-center text-white font-medium relative z-10">
                    1
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-base font-medium text-[var(--text-primary)] mb-1">入门必拿</h4>
                    <p className="text-sm text-[var(--text-secondary)]">低压电工特种作业证 → 合法上岗</p>
                  </div>
                </div>
                
                {/* 阶段2 */}
                <div className="flex mb-8">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand-pink)] flex items-center justify-center text-white font-medium relative z-10">
                    2
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-base font-medium text-[var(--text-primary)] mb-1">职业基础</h4>
                    <p className="text-sm text-[var(--text-secondary)]">新能源汽车维修工（中级/四级）→ 行业通用证</p>
                  </div>
                </div>
                
                {/* 阶段3 */}
                <div className="flex mb-8">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand-pink)] flex items-center justify-center text-white font-medium relative z-10">
                    3
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-base font-medium text-[var(--text-primary)] mb-1">核心专项</h4>
                    <p className="text-sm text-[var(--text-secondary)]">交通部：动力电池+驱动电机 专项证书 → 技术硬通货</p>
                  </div>
                </div>
                
                {/* 阶段4 */}
                <div className="flex mb-8">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand-pink)] flex items-center justify-center text-white font-medium relative z-10">
                    4
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-base font-medium text-[var(--text-primary)] mb-1">高薪进阶</h4>
                    <p className="text-sm text-[var(--text-secondary)]">新能源汽车维修工（高级/三级）+ 主流车企认证 → 进4S店/专修厂</p>
                  </div>
                </div>
                
                {/* 阶段5 */}
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand-pink)] flex items-center justify-center text-white font-medium relative z-10">
                    5
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-base font-medium text-[var(--text-primary)] mb-1">技术专家（长期）</h4>
                    <p className="text-sm text-[var(--text-secondary)]">技师/高级技师 + 电池维修深度认证 → 技术主管/店长/培训师</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
      
      {/* 证书详情弹窗 */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeCertificateModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="bg-white rounded-[16px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(255,143,163,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 弹窗头部 */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--light-pink)] bg-[var(--bg-primary)]">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] flex items-center">
                  <i className="fa-solid fa-certificate text-[var(--brand-pink)] mr-2"></i>
                  {selectedCertificate.title}
                </h3>
                <button
                  onClick={closeCertificateModal}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--light-pink)]/50 rounded-full p-1"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
              
              {/* 弹窗内容 */}
              <div className="p-6 space-y-4">
                <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {selectedCertificate.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-medium mb-3 text-[var(--text-primary)] flex items-center">
                    <i className="fa-solid fa-list-check text-[var(--brand-pink)] mr-2"></i>
                    核心内容：
                  </h4>
                  <ul className="space-y-2 bg-[var(--bg-primary)] rounded-lg p-4">
                    {selectedCertificate.details.map((detail, index) => (
                      <li key={index} className="flex items-start transition-all duration-200 hover:translate-x-1">
                        <i className="fa-solid fa-circle text-[var(--brand-pink)] mr-2 mt-1 flex-shrink-0"></i>
                        <span className="text-sm text-[var(--text-secondary)]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedCertificate.officialWebsite && (
                  <div>
                    <h4 className="text-base font-medium mb-3 text-[var(--text-primary)] flex items-center">
                      <i className="fa-solid fa-file-lines text-[var(--brand-pink)] mr-2"></i>
                      其他资料：
                    </h4>
                    <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                      <a 
                        href={selectedCertificate.officialWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--brand-pink)] hover:text-[var(--brand-pink)]/80 transition-colors duration-300 flex items-center"
                      >
                        <i className="fa-solid fa-link mr-2"></i>
                        官方网站：{selectedCertificate.title}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 弹窗底部 */}
              <div className="p-6 border-t border-[var(--light-pink)] flex justify-end bg-[var(--bg-primary)]">
                <button
                  onClick={closeCertificateModal}
                  className="px-6 py-2 bg-[var(--brand-pink)] text-white rounded-full hover:bg-[var(--brand-pink)]/90 transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center"
                >
                  <i className="fa-solid fa-times-circle mr-2"></i>
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}