import { motion } from 'framer-motion';

export default function Certification() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--bg-primary)] mb-6">
          <i className="fa-solid fa-certificate text-[var(--brand-pink)] text-4xl"></i>
        </div>
        <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">技能认证</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          技能认证模块正在建设中，敬请期待！
        </p>
        <div className="bg-[var(--bg-primary)] rounded-lg p-4">
          <h3 className="text-base font-medium mb-2 text-[var(--text-primary)]">即将上线的认证内容</h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-center">
              <i className="fa-solid fa-circle text-[var(--brand-pink)] mr-2"></i>
              <span>国家职业技能等级认证培训</span>
            </li>
            <li className="flex items-center">
              <i className="fa-solid fa-circle text-[var(--brand-pink)] mr-2"></i>
              <span>行业职业技能认证指导</span>
            </li>
            <li className="flex items-center">
              <i className="fa-solid fa-circle text-[var(--brand-pink)] mr-2"></i>
              <span>企业技能等级认证模拟</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}