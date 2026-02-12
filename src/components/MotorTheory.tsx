import { useState } from 'react';
import { motion } from 'framer-motion';
import Motor3DModel from './Motor3DModel';
import MotorAnimation from './MotorAnimation';
import MotorDiagnosticSimulator from './MotorDiagnosticSimulator';
import MotorParameterCalculator from './MotorParameterCalculator';

export default function MotorTheory({ onSelectText }: { onSelectText?: (text: string) => void }) {
  // 展开/折叠状态管理
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    intro: true,
    structure: true,
    principle: true,
    characteristics: true,
    maintenance: true,
    resources: true,
  });
  
  // 切换章节展开/折叠
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 h-full overflow-y-auto">
      {/* 标题 */}
      <h1 className="text-lg font-semibold mb-6 text-[var(--text-primary)] border-b border-[var(--light-pink)] pb-3">
        交流异步电机的结构与工作原理
      </h1>

      {/* 课程介绍 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('intro')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>课程介绍</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.intro ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.intro && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <p className="text-[var(--text-primary)] leading-relaxed">
              本课程主要介绍交流异步电机的基本结构、工作原理、特性及应用。通过学习本课程，学生将掌握交流异步电机的基本构成、电磁感应原理、旋转磁场的产生、转速与转矩特性等核心知识，为后续的电机控制、维护与故障诊断打下坚实的理论基础。
            </p>
          </motion.div>
        )}
      </div>

      {/* 电机结构 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('structure')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>电机结构</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.structure ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.structure && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="bg-[var(--bg-primary)] rounded-lg p-4 mb-4">
              <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">定子结构</h3>
              <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                <li>定子铁芯：由硅钢片叠压而成，内圆有均匀分布的槽，用于嵌放定子绕组</li>
                <li>定子绕组：由绝缘铜线绕制而成，三相绕组按一定规律嵌放在定子槽内</li>
                <li>机座：支撑定子铁芯和固定端盖，通常由铸铁或铸钢制成</li>
              </ul>
            </div>
            
            <div className="bg-[var(--bg-primary)] rounded-lg p-4">
              <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">转子结构</h3>
              <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                <li>转子铁芯：由硅钢片叠压而成，外圆有均匀分布的槽，用于嵌放转子绕组</li>
                <li>转子绕组：分为鼠笼式和绕线式两种
                  <ul className="list-circle list-inside ml-6 space-y-1 mt-1">
                    <li>鼠笼式：由铜条或铝条嵌入转子槽内，两端用端环短接</li>
                    <li>绕线式：由绝缘铜线绕制而成，三相绕组通过滑环和电刷与外部电路连接</li>
                  </ul>
                </li>
                <li>转轴：支撑转子铁芯，传递转矩</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* 工作原理 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('principle')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>工作原理</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.principle ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.principle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p className="leading-relaxed">
                交流异步电机的工作原理基于电磁感应和电磁力定律。当定子绕组通入三相交流电时，会产生一个以同步转速旋转的旋转磁场。旋转磁场切割转子导体，在转子导体中产生感应电动势和感应电流。感应电流与旋转磁场相互作用，产生电磁转矩，使转子沿着旋转磁场的方向旋转。
              </p>
              
              <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">关键概念</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>旋转磁场</strong>：三相交流电在空间上互差120度，通入对称的三相绕组后产生的磁场</li>
                  <li><strong>同步转速</strong>：旋转磁场的转速，n₁ = 60f/p（f为电源频率，p为磁极对数）</li>
                  <li><strong>转差率</strong>：s = (n₁ - n)/n₁（n为转子转速）</li>
                  <li><strong>异步</strong>：转子转速始终低于同步转速，否则无法产生感应电流和电磁转矩</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 运行特性 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('characteristics')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>运行特性</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.characteristics ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.characteristics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="space-y-4 text-[var(--text-secondary)]">
              <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">机械特性</h3>
                <p className="mb-2">
                  异步电机的机械特性是指转速与电磁转矩之间的关系。当负载变化时，转子转速会发生变化，从而改变转差率，使电磁转矩自动适应负载转矩的变化。
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>额定运行点：电机在额定电压、额定频率下输出额定功率时的工作点</li>
                  <li>最大转矩：电机能够产生的最大电磁转矩，通常为额定转矩的2-3倍</li>
                  <li>启动转矩：电机启动瞬间的电磁转矩</li>
                </ul>
              </div>
              
              <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">工作特性</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>转速特性</strong>：转速随负载变化的关系，近似为一条略微下降的直线</li>
                  <li><strong>转矩特性</strong>：转矩随负载变化的关系</li>
                  <li><strong>效率特性</strong>：效率随负载变化的关系，在额定负载附近效率最高</li>
                  <li><strong>功率因数特性</strong>：功率因数随负载变化的关系，轻载时功率因数较低</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 维护与故障诊断 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('maintenance')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>维护与故障诊断</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.maintenance ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.maintenance && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="space-y-4 text-[var(--text-secondary)]">
              <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">日常维护</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>定期检查电机的运行状态，包括温度、噪声、振动等</li>
                  <li>保持电机清洁，避免灰尘和杂物进入</li>
                  <li>定期检查轴承润滑情况，必要时更换润滑油或轴承</li>
                  <li>检查绕组绝缘电阻，确保绝缘良好</li>
                  <li>检查冷却系统，确保通风良好</li>
                </ul>
              </div>
              
              <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">常见故障与诊断</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>电机无法启动</strong>：检查电源、绕组、控制电路等</li>
                  <li><strong>电机过热</strong>：检查负载、通风、轴承、绕组等</li>
                  <li><strong>电机噪声异常</strong>：检查轴承、转子、气隙等</li>
                  <li><strong>电机振动大</strong>：检查平衡、轴承、安装等</li>
                  <li><strong>电机效率低</strong>：检查绕组、气隙、负载等</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 学习资源 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('resources')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>学习资源</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.resources ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.resources && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="grid grid-cols-1 gap-4">
              {/* 资源1：电机结构3D模型 */}
              <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <Motor3DModel />
              </div>
              
              {/* 资源2：工作原理动画 */}
              <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <MotorAnimation />
              </div>
              
              {/* 资源3：故障诊断模拟器 */}
              <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <MotorDiagnosticSimulator />
              </div>
              
              {/* 资源4：参数计算器 */}
              <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <MotorParameterCalculator />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
