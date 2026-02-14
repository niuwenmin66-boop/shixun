import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MotorDismantlingQuiz from './MotorAnimation';

// 图片URL常量定义
const trainingImage = "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%E7%BB%B4%E4%BF%AE%E8%AE%AD%E7%BB%83%E5%9C%BA%E6%99%AF%EF%BC%8C%E6%9C%BA%E6%A2%B0%E8%BD%A6%E9%97%B4%EF%BC%8C%E4%B8%93%E4%B8%9A%E8%AE%BE%E5%A4%87%EF%BC%8C%E6%8A%80%E6%9C%AF%E4%BA%BA%E5%91%98%E5%9C%A8%E6%93%8D%E4%BD%9C&sign=42db5087903a8d144b64f067c76a5762";
const toolImages = [
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%B8%AD%E5%8F%B7%E6%A3%98%E8%BD%AE%E6%89%B3%E6%89%8B%EF%BC%8C%E4%B8%93%E4%B8%9A%E7%BB%B4%E4%BF%AE%E5%B7%A5%E5%85%B7&sign=f0f7bb9462752e3f94b30cab3ea09de8",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%B8%AD%E5%8F%B7%E7%9F%AD%E6%8E%A5%E6%9D%86%EF%BC%8C%E4%B8%93%E4%B8%9A%E7%BB%B4%E4%BF%AE%E5%B7%A5%E5%85%B7&sign=bba5dbd3f5d6debd821c35aeb459c697",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=13%E5%8F%B7%E5%85%AD%E8%A7%92%E5%A5%97%E7%AD%92%EF%BC%8C%E4%B8%93%E4%B8%9A%E7%BB%B4%E4%BF%AE%E5%B7%A5%E5%85%B7&sign=2d4f1a96cac44404b09fe5263d306b1c",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=HW4%E9%95%BF%E5%A5%97%E7%AD%92%EF%BC%8C%E4%B8%93%E4%B8%9A%E7%BB%B4%E4%BF%AE%E5%B7%A5%E5%85%B7&sign=07e75173a380d56134aba791ca5a0505",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=HW6%E9%95%BF%E5%A5%97%E7%AD%92%EF%BC%8C%E4%B8%93%E4%B8%9A%E7%BB%B4%E4%BF%AE%E5%B7%A5%E5%85%B7&sign=915d518cfb8952765a07bd9bd3fd0a65",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=PDR%E5%A5%97%E7%AD%92%EF%BC%8C%E4%B8%93%E4%B8%9A%E7%BB%B4%E4%BF%AE%E5%B7%A5%E5%85%B7&sign=d84fd0aefb08764932e8e2157702e986",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E6%A9%A1%E8%83%B6%E9%94%A4%EF%BC%8C%E4%B8%93%E4%B8%9A%E7%BB%B4%E4%BF%AE%E5%B7%A5%E5%85%B7&sign=94e0b4670aa4abfc01a14b3a3e6d5324",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%90%B8%E5%8A%9B%E6%B3%B5%EF%BC%8C%E4%B8%93%E4%B8%9A%E7%BB%B4%E4%BF%AE%E5%B7%A5%E5%85%B7&sign=1ce2eb5d43b0397a5865faddea4813d6",
];
const materialImages = [
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%BC%B9%E6%80%A7%E5%9E%AB%E5%9C%88%EF%BC%8C%E6%9C%BA%E6%A2%B0%E9%9B%B6%E4%BB%B6&sign=408185e2a3778af68a2c0b02a82ed839",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%9E%AB%E7%89%87%EF%BC%8C%E6%9C%BA%E6%A2%B0%E9%9B%B6%E4%BB%B6&sign=277cfbc097698768bd709921eac9c1ab",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%BC%B9%E6%80%A7%E6%8C%A1%E5%9C%88%EF%BC%8C%E6%9C%BA%E6%A2%B0%E9%9B%B6%E4%BB%B6&sign=7f75b35996ec27b8c5a097e27f570bff",
];
const workplaceImage = "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%B1%BD%E8%BD%A6%E7%BB%B4%E4%BF%AE%E5%B7%A5%E4%BD%8D%EF%BC%8C%E6%95%B4%E6%B4%81%E6%9C%89%E5%BA%8F%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8F%B0%EF%BC%8C%E5%B7%A5%E5%85%B7%E6%91%86%E6%94%BE%E6%95%B4%E9%BD%90&sign=764cd3b20f140858137c493eb0824f93";
const safetyImage = "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%B1%BD%E8%BD%A6%E7%BB%B4%E4%BF%AE%E5%AE%89%E5%85%A8%E6%93%8D%E4%BD%9C%EF%BC%8C%E6%8A%80%E6%9C%AF%E4%BA%BA%E5%91%98%E7%A9%BF%E6%88%B4%E9%98%B2%E6%8A%A4%E8%A3%85%E5%A4%87&sign=80e79be52f384aa05217c8076202414b";

// 步骤图片定义
const stepImages = [
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%8B%86%E5%8D%B8%E4%B8%89%E7%9B%B8%E7%BA%BF%E6%9D%9F%E8%BF%9E%E6%8E%A5%E5%99%A8%E5%9B%BA%E5%AE%9A%E8%9E%BA%E6%AF%8D%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=d149e41b311eac5bcc526a8d2e90aa6d",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%8F%96%E4%B8%8B%E4%B8%89%E7%9B%B8%E7%BA%BF%E6%9D%9F%E6%8E%A5%E5%A4%B4%E5%8F%8A%E7%9B%B8%E5%85%B3%E9%83%A8%E4%BB%B6%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=d2eb6fa4e38a1a6f805b825daaa557b2",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%9D%BE%E5%BC%80%E5%B9%B6%E5%8F%96%E5%87%BA%E4%B8%89%E7%9B%B8%E4%BA%A4%E6%B5%81%E7%BA%BF%E6%9D%9F%E8%BF%9E%E6%8E%A5%E5%99%A8%E5%9B%BA%E5%AE%9A%E8%9E%BA%E6%A0%93%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=4ca1962d8d258b8f18baff8f03be4dc4",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%8F%96%E4%B8%8B%E4%B8%89%E7%9B%B8%E4%BA%A4%E6%B5%81%E7%BA%BF%E6%9D%9F%E8%BF%9E%E6%8E%A5%E5%99%A8%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=892ce1b76b56926571dfa2c3a535f91a",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%8B%86%E5%8D%B8%E7%94%B5%E6%9C%BA%E9%80%9F%E5%BA%A6%E7%BC%96%E7%A0%81%E5%99%A8%E7%9B%96%E6%9D%BF%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=6d06b181f61ee634a2886d8161fe4b91",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%8B%86%E5%8D%B8%E7%94%B5%E6%9C%BA%E9%80%9F%E5%BA%A6%E7%BC%96%E7%A0%81%E5%99%A8%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=3590da36b58c5cce52d2e771873bab59",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%8B%86%E5%8D%B8%E8%BD%B4%E6%89%BF%E5%BA%95%E5%BA%A7%E5%9B%BA%E5%AE%9A%E8%9E%BA%E6%A0%93%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=21417ef0d8857f1599f217a3c0c29c35",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%9D%BE%E5%BC%80%E5%90%8E%E7%AB%AF%E7%9B%96%E5%9B%BA%E5%AE%9A%E8%9E%BA%E6%A0%93%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=35bd4cbb7fcfdf751e542a3300fb1777",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%8F%96%E5%87%BA%E5%90%8E%E7%AB%AF%E7%9B%96%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=a3358906cfee4b68086db8e1742a399d",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%8B%86%E5%8D%B8%E8%BD%AC%E5%AD%90%E5%89%8D%E7%AB%AF%E5%BC%B9%E6%80%A7%E6%8C%A1%E5%9C%88%E7%9A%84%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4&sign=9edc5318f96c1b1a9dd5ab7565b91867",
];

export default function TrainingGuide({ onSelectText }: { onSelectText?: (text: string) => void }) {
  // 展开/折叠状态管理
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    intro: true,
    skills: true,
    scenario: true,
    preparation: true,
    steps: true,
    conclusion: true,
    quiz: true,
  });
  
  // 放大图片预览状态
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // 文字选中状态
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [showAskAIButton, setShowAskAIButton] = useState(false);
  
  // 选中图片状态
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  
  // 容器引用
  const containerRef = useRef<HTMLDivElement>(null);

  // 切换章节展开/折叠
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // 关闭图片预览
  const closeImagePreview = () => {
    setSelectedImage(null);
  };
  
  // 文字选中事件处理
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setShowAskAIButton(false);
        return;
      }
      
      const text = selection.toString().trim();
      if (text.length < 5) {
        setShowAskAIButton(false);
        return;
      }
      
      setSelectedText(text);
      
      // 计算选中区域的位置
      const range = selection.getRangeAt(0);
      
      if (containerRef.current) {
        // 获取容器的位置和尺寸
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // 获取整个选中区域的位置
        const selectionRect = range.getBoundingClientRect();
        
        // 计算最后一个字的位置
        // 创建一个新的范围，只包含最后一个字
        const lastCharRange = document.createRange();
        const lastCharOffset = range.endOffset - 1;
        if (lastCharOffset >= 0) {
          lastCharRange.setStart(range.endContainer, lastCharOffset);
          lastCharRange.setEnd(range.endContainer, range.endOffset);
        } else {
          lastCharRange.setStart(range.endContainer, 0);
          lastCharRange.setEnd(range.endContainer, 1);
        }
        
        // 获取最后一个字的位置
        const lastCharRect = lastCharRange.getBoundingClientRect();
        
        // 计算按钮位置：最后一个字的下方行，中线对齐
        const buttonWidth = 80; // 按钮宽度
        const buttonHeight = 32; // 按钮高度
        
        // 计算相对于容器的位置
        let x = (lastCharRect.left - containerRect.left) + (lastCharRect.width / 2) - (buttonWidth / 2);
        let y = (lastCharRect.bottom - containerRect.top) + containerRef.current.scrollTop + 15; // 下方行，增加一些间距，加上滚动偏移量
        
        // 边界检查，确保按钮不会被容器边框压住
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // 水平边界检查
        if (x < 10) {
          x = 10;
        } else if (x + buttonWidth > containerWidth - 10) {
          x = containerWidth - buttonWidth - 10;
        }
        
        // 垂直边界检查
        if (y + buttonHeight > containerHeight - 10 + containerRef.current.scrollTop) {
          // 如果按钮会超出容器底部，调整位置到选中区域的上方
          y = (selectionRect.top - containerRect.top) + containerRef.current.scrollTop - buttonHeight - 15;
          // 确保按钮不会超出容器顶部
          if (y < 10 + containerRef.current.scrollTop) {
            y = 10 + containerRef.current.scrollTop;
          }
        }
        
        setSelectionPosition({ x, y });
        setShowAskAIButton(true);
      }
    };
    
    window.addEventListener('mouseup', handleSelection);
    window.addEventListener('touchend', handleSelection);
    
    return () => {
      window.removeEventListener('mouseup', handleSelection);
      window.removeEventListener('touchend', handleSelection);
    };
  }, []);
  
  // 问问AI按钮点击事件
  const handleAskAI = () => {
    if (selectedText && onSelectText) {
      onSelectText(selectedText);
    }
    setShowAskAIButton(false);
  };

  return (
    <div ref={containerRef} className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 h-full overflow-y-auto relative">
      {/* 标题 */}
      <h1 className="text-lg font-semibold mb-6 text-[var(--text-primary)] border-b border-[var(--light-pink)] pb-3">
        交流异步电机拆卸实训
      </h1>

      {/* 实训介绍 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('intro')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>实训介绍</span>
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
              交流异步电机拆卸实训是电工、机电设备类专业的核心实操实训，围绕电机核心部件拆卸展开，涵盖工具规范使用、关键部件无损拆卸、安全操作等内容。通过本实训，掌握电机拆卸标准流程与关键技巧，培养规范操作习惯和质量意识，为电机运维、检修相关岗位技能奠定基础。
            </p>
          </motion.div>
        )}
      </div>

      {/* 技能、岗位与技能认证 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>技能点</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.skills ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.skills && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 技能1：对角交叉法拆卸螺栓 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[var(--light-pink)] p-4">
                <h4 className="font-medium mb-3 flex items-center text-lg">
                  <span className="bg-[var(--brand-pink)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">1</span>
                  对角交叉法拆卸螺栓
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-2">
                    <p className="font-medium text-[var(--text-primary)] mb-1">技能要求：</p>
                    <p className="text-[var(--text-secondary)]">轴承底座、后端盖、线束连接器等部位必须使用对角均匀松动，防止端盖变形、受力不均、裂纹。易损件识别与处理。</p>
                  </div>

                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-2">
                    <p className="font-medium text-[var(--text-primary)] mb-1">技能认证：</p>
                    <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                      <li>维修电工（中级 / 四级及以上）</li>
                      <li>电机检修工（初级及以上）</li>
                      <li>企业电机相关岗位内部认证</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 技能2：橡胶锤轻敲拆卸后端盖 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[var(--light-pink)] p-4">
                <h4 className="font-medium mb-3 flex items-center text-lg">
                  <span className="bg-[var(--brand-pink)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">2</span>
                  橡胶锤轻敲拆卸后端盖
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-2">
                    <p className="font-medium text-[var(--text-primary)] mb-1">技能要求：</p>
                    <p className="text-[var(--text-secondary)]">禁止硬敲硬砸，掌握轻敲四角、均匀受力的技巧。保护端盖平面、止口、轴承。</p>
                  </div>

                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-2">
                    <p className="font-medium text-[var(--text-primary)] mb-1">技能认证：</p>
                    <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                      <li>维修电工（中级 / 四级及以上）</li>
                      <li>电机检修工（初级及以上）</li>
                      <li>工业机器人操作与运维（1+X 证书）</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 技能3：规范使用专用工具 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[var(--light-pink)] p-4">
                <h4 className="font-medium mb-3 flex items-center text-lg">
                  <span className="bg-[var(--brand-pink)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">3</span>
                  规范使用专用工具
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-2">
                    <p className="font-medium text-[var(--text-primary)] mb-1">技能要求：</p>
                    <p className="text-[var(--text-secondary)]">吸力泵取螺栓。不同规格套筒、棘轮扳手正确匹配。不混用、不强行操作。</p>
                  </div>

                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-2">
                    <p className="font-medium text-[var(--text-primary)] mb-1">技能认证：</p>
                    <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                      <li>维修电工（初级 / 五级及以上）</li>
                      <li>电工特种作业操作证（低压）</li>
                      <li>电机检修工（初级及以上）</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 技能4：拆卸流程逻辑与顺序 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[var(--light-pink)] p-4">
                <h4 className="font-medium mb-3 flex items-center text-lg">
                  <span className="bg-[var(--brand-pink)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">4</span>
                  拆卸流程逻辑与顺序
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-2">
                    <p className="font-medium text-[var(--text-primary)] mb-1">技能要求：</p>
                    <p className="text-[var(--text-secondary)]">先电气部件（线束、编码器）→再机械部件（轴承座、后端盖、转子挡圈）。顺序错误会导致部件损坏。</p>
                  </div>

                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-2">
                    <p className="font-medium text-[var(--text-primary)] mb-1">技能认证：</p>
                    <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                      <li>维修电工（中级 / 四级及以上）</li>
                      <li>电机检修工（初级及以上）</li>
                      <li>电工特种作业操作证（低压）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 实训场景案例 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('scenario')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>实训场景案例</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.scenario ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.scenario && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="bg-[var(--bg-primary)] rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <p className="text-[var(--text-primary)] leading-relaxed mb-4">
                    某新能源汽车维修车间接收了一辆需要电机检修的电动汽车。经初步检测，发现电机存在异常噪音和振动问题，技术主管决定进行电机拆卸检修。作为维修实习生，你需要在师傅的指导下，按照标准流程完成交流异步电机的拆卸工作。
                  </p>
                  <p className="text-[var(--brand-pink)] font-medium italic border-l-4 border-[var(--brand-pink)] pl-3 py-2 bg-[var(--bg-primary)]/30 rounded-r-lg">
                    这是你第一次独立操作此类任务，需要特别注意操作规范和安全要求...
                  </p>
                </div>
                <div className="flex-1 relative rounded-lg overflow-hidden">
                  <video 
                    src="https://e.necibook.com/api/media/api/v1/media/showImage/2021466316601610240" 
                    alt="实训场景" 
                    className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                    controls
                    muted
                    preload="metadata"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 实训准备 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('preparation')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>实训准备</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.preparation ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.preparation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 pl-1"
          >
            {/* 工具准备 */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <i className="fa-solid fa-toolbox text-[var(--brand-pink)] mr-2"></i>
                工具准备
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {['中号棘轮扳手', '中号短接杆', '13号六角套筒', 'HW4长套筒', 'HW6长套筒', 'PDR套筒', '橡胶锤', '吸力泵'].map((tool, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-[var(--light-pink)] rounded-lg p-2 text-center cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="mb-2 relative rounded overflow-hidden h-24">
                      <img 
                        src={toolImages[index]} 
                        alt={tool} 
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(toolImages[index]);
                          }}
                          className="text-white text-xl hover:text-white/80 transition-colors"
                        >
                          <i className="fa-solid fa-search-plus"></i>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectText) {
                              onSelectText(`[图片]${toolImages[index]}`);
                            }
                          }}
                          className="text-white text-xl hover:text-white/80 transition-colors"
                        >
                          <i className="fa-solid fa-robot"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{tool}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 物料准备 */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <i className="fa-solid fa-box-open text-[var(--brand-pink)] mr-2"></i>
                物料准备
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {['弹性垫圈', '垫片', '弹性挡圈'].map((material, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-[var(--light-pink)] rounded-lg p-2 text-center cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="mb-2 relative rounded overflow-hidden h-24">
                      <img 
                        src={materialImages[index]} 
                        alt={material} 
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(materialImages[index]);
                          }}
                          className="text-white text-xl hover:text-white/80 transition-colors"
                        >
                          <i className="fa-solid fa-search-plus"></i>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectText) {
                              onSelectText(`[图片]${materialImages[index]}`);
                            }
                          }}
                          className="text-white text-xl hover:text-white/80 transition-colors"
                        >
                          <i className="fa-solid fa-robot"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{material}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                注意：准备新的弹性垫圈、垫片、弹性挡圈。这些部件不可重复使用，安装时必须换新。
              </p>
            </div>

            {/* 工位整理、安全提示和实训时长 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 工位整理 */}
              <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  <i className="fa-solid fa-screwdriver-wrench text-[var(--brand-pink)] mr-2"></i>
                  工位整理
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  清理实训台面，划分部件摆放区域，避免拆卸后部件丢失、混用。
                </p>
              </div>

              {/* 安全提示 */}
              <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  <i className="fa-solid fa-shield-alt text-[var(--brand-pink)] mr-2"></i>
                  安全提示
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  穿戴好实训防护用品，明确禁止野蛮操作。
                </p>
              </div>

              {/* 实训时长 */}
              <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  <i className="fa-solid fa-clock text-[var(--brand-pink)] mr-2"></i>
                  实训时长
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">90分钟</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 实操步骤 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('steps')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>实操步骤</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.steps ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.steps && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            {/* 实操步骤图片 */}
            <div className="mb-6">
              <img 
                src="https://e.necibook.com/api/media/api/v1/media/showImage/2021490180977266688" 
                alt="实操步骤" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            
            {/* 步骤一 */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4 text-[var(--text-primary)] bg-[var(--bg-primary)] px-4 py-2 rounded-lg">
                步骤一：三相线束连接器拆卸
              </h3>
              
              <div className="space-y-6 ml-4">
                {/* 子步骤1 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-[var(--text-primary)]">① 拆卸三相线束连接器固定螺母</h4>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="md:w-1/2">
                      <div 
                        className="relative rounded-lg overflow-hidden cursor-pointer"
                      >
                        <img 
                          src="https://e.necibook.com/api/media/api/v1/media/showImage/2021476739061174272" 
                          alt="拆卸三相线束连接器固定螺母" 
                          className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-8">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage("https://e.necibook.com/api/media/api/v1/media/showImage/2021476739061174272");
                            }}
                            className="text-white text-2xl hover:text-white/80 transition-colors"
                          >
                            <i className="fa-solid fa-search-plus"></i>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageUrl("https://e.necibook.com/api/media/api/v1/media/showImage/2021476739061174272");
                              if (onSelectText) {
                                onSelectText(`[图片]https://e.necibook.com/api/media/api/v1/media/showImage/2021476739061174272`);
                              }
                            }}
                            className="text-white text-2xl hover:text-white/80 transition-colors"
                          >
                            <i className="fa-solid fa-robot"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 space-y-2 text-sm">
                      <p><strong className="text-[var(--text-primary)]">工具选用：</strong> <span className="text-[var(--text-secondary)]">中号棘轮扳手、中号短接杆、13号六角套筒。</span></p>
                      <p><strong className="text-[var(--text-primary)]">操作要点：</strong> <span className="text-[var(--text-secondary)]">用上述工具松开三相线束连接器固定螺母，依次取下螺母、弹性垫圈和垫片。</span></p>
                      <p><strong className="text-[var(--text-primary)]">注意事项：</strong> <span className="text-[var(--text-secondary)]">明确弹性垫圈和垫片不可重复使用，做好标记，提醒后续安装时更换新品。</span></p>
                      <p><strong className="text-[var(--text-primary)]">技能标注：</strong> <span className="text-[var(--text-secondary)]">基础技能（工具匹配、部件有序拆卸）</span></p>
                    </div>
                  </div>
                </div>

                {/* 子步骤2 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-[var(--text-primary)]">② 取下三相线束接头及相关部件</h4>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="md:w-1/2 space-y-2 text-sm">
                      <p><strong className="text-[var(--text-primary)]">操作要点：</strong> <span className="text-[var(--text-secondary)]">分别取下三相线束接头和下端垫片，将取下的部件按类别摆放在指定区域，做好区分标记。</span></p>
                      <p><strong className="text-[var(--text-primary)]">注意事项：</strong> <span className="text-[var(--text-secondary)]">避免线束拉扯、弯折，防止线束绝缘层破损。</span></p>
                      <p><strong className="text-[var(--text-primary)]">技能标注：</strong> <span className="text-[var(--text-secondary)]">基础技能（部件规范摆放、线束保护）</span></p>
                    </div>
                    <div className="md:w-1/2">
                      <div 
                        className="relative rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(stepImages[1])}
                      >
                        <img 
                          src={stepImages[1]} 
                          alt="取下三相线束接头及相关部件" 
                          className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i className="fa-solid fa-search-plus text-white text-2xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 子步骤3 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-[var(--text-primary)]">③ 松开并取出三相交流线束连接器固定螺栓</h4>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="md:w-1/2">
                      <div 
                        className="relative rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(stepImages[2])}
                      >
                        <img 
                          src={stepImages[2]} 
                          alt="松开并取出三相交流线束连接器固定螺栓" 
                          className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i className="fa-solid fa-search-plus text-white text-2xl"></i>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 space-y-2 text-sm">
                      <p><strong className="text-[var(--text-primary)]">工具选用：</strong> <span className="text-[var(--text-secondary)]">中号棘轮扳手、HW4长套筒。</span></p>
                      <p><strong className="text-[var(--text-primary)]">操作要点：</strong> <span className="text-[var(--text-secondary)]">采用对角交叉的方式，均匀松开三相交流线束连接器固定螺栓，松开后取出螺栓及垫片。</span></p>
                      <p><strong className="text-[var(--text-primary)]">注意事项：</strong> <span className="text-[var(--text-secondary)]">对角交叉松开时，力度均匀，避免螺栓滑丝、螺纹损坏。</span></p>
                      <p><strong className="text-[var(--text-primary)]">技能标注：</strong> <span className="text-[var(--warning-orange)] font-medium">★关键技能（对角交叉拆卸螺栓方法，防止部件受力不均）</span></p>
                    </div>
                  </div>
                </div>

                {/* 其他子步骤可以类似添加 */}
              </div>
            </div>

            {/* 步骤二：电机速度编码器拆卸 */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4 text-[var(--text-primary)] bg-[var(--bg-primary)] px-4 py-2 rounded-lg">
                步骤二：电机速度编码器拆卸
              </h3>
              
              <div className="space-y-6 ml-4">
                {/* 子步骤1 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-4 text-[var(--text-primary)] text-lg">① 拆卸电机速度编码器盖板</h4>
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="md:w-1/2 space-y-3 text-sm">
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">工具选用：</p>
                        <p className="text-[var(--text-secondary)]">中号棘轮扳手、中号短接杆、PDR套筒。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">操作要点：</p>
                        <p className="text-[var(--text-secondary)]">用上述工具松开电机速度编码器盖板固定螺栓，依次取下螺栓和盖板。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">注意事项：</p>
                        <p className="text-[var(--text-secondary)]">取下盖板时，轻拿轻放，避免盖板变形，防止灰尘进入编码器内部。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">技能标注：</p>
                        <p className="text-[var(--text-secondary)]">基础技能（盖板无损拆卸、精密部件防尘保护）</p>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <div 
                        className="relative rounded-lg overflow-hidden cursor-pointer shadow-sm"
                        onClick={() => setSelectedImage(stepImages[4])}
                      >
                        <img 
                          src={stepImages[4]} 
                          alt="拆卸电机速度编码器盖板" 
                          className="w-full h-auto object-cover hover:opacity-90 transition-opacity rounded-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(stepImages[4]);
                            }}
                          >
                            <i className="fa-solid fa-search-plus text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 子步骤2 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-4 text-[var(--text-primary)] text-lg">② 拆卸电机速度编码器</h4>
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="md:w-1/2 space-y-3 text-sm">
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">工具选用：</p>
                        <p className="text-[var(--text-secondary)]">中号棘轮扳手、HW4长套筒。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">操作要点：</p>
                        <p className="text-[var(--text-secondary)]">用工具松开电机速度编码器固定螺栓，取出螺栓和左右两侧固定片，随后平稳取下电机速度编码器。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">注意事项：</p>
                        <p className="text-[var(--text-secondary)]">拆卸过程中，不磕碰、不硬撬编码器，避免编码器内部元件损坏；固定片做好摆放标记，防止混淆。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">技能标注：</p>
                        <p className="text-[var(--warning-orange)] font-medium">★关键技能（编码器无损拆卸，精密部件保护技巧）</p>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <div 
                        className="relative rounded-lg overflow-hidden cursor-pointer shadow-sm"
                        onClick={() => setSelectedImage(stepImages[5])}
                      >
                        <img 
                          src={stepImages[5]} 
                          alt="拆卸电机速度编码器" 
                          className="w-full h-auto object-cover hover:opacity-90 transition-opacity rounded-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(stepImages[5]);
                            }}
                          >
                            <i className="fa-solid fa-search-plus text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 步骤三：轴承底座与后端盖拆卸 */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4 text-[var(--text-primary)] bg-[var(--bg-primary)] px-4 py-2 rounded-lg">
                步骤三：轴承底座与后端盖拆卸
              </h3>
              
              <div className="space-y-6 ml-4">
                {/* 子步骤1 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-4 text-[var(--text-primary)] text-lg">① 拆卸轴承底座固定螺栓</h4>
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="md:w-1/2">
                      <div 
                        className="relative rounded-lg overflow-hidden cursor-pointer shadow-sm h-48"
                        onClick={() => setSelectedImage(stepImages[6])}
                      >
                        <img 
                          src={stepImages[6]} 
                          alt="拆卸轴承底座固定螺栓" 
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity rounded-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(stepImages[6]);
                            }}
                          >
                            <i className="fa-solid fa-search-plus text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 space-y-3 text-sm">
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">工具选用：</p>
                        <p className="text-[var(--text-secondary)]">中号棘轮扳手、HW4长套筒、吸力泵。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">操作要点：</p>
                        <p className="text-[var(--text-secondary)]">采用对角交叉的方式，均匀松开轴承底座固定螺栓，松开后用吸力泵取出螺栓。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">注意事项：</p>
                        <p className="text-[var(--text-secondary)]">吸力泵使用规范，确保螺栓完全吸附后再取出，避免螺栓掉落损坏电机部件；对角交叉松开时力度均匀。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">技能标注：</p>
                        <p className="text-[var(--warning-orange)] font-medium">★关键技能（对角交叉拆卸方法、吸力泵规范使用）</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 子步骤2 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-4 text-[var(--text-primary)] text-lg">② 松开后端盖固定螺栓</h4>
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="md:w-1/2">
                      <div 
                        className="relative rounded-lg overflow-hidden cursor-pointer shadow-sm"
                        onClick={() => setSelectedImage(stepImages[7])}
                      >
                        <img 
                          src={stepImages[7]} 
                          alt="松开后端盖固定螺栓" 
                          className="w-full h-auto object-cover hover:opacity-90 transition-opacity rounded-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(stepImages[7]);
                            }}
                          >
                            <i className="fa-solid fa-search-plus text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 space-y-3 text-sm">
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">工具选用：</p>
                        <p className="text-[var(--text-secondary)]">中号棘轮扳手、HW6长套筒。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">操作要点：</p>
                        <p className="text-[var(--text-secondary)]">采用对角交叉的方式，均匀松开后端盖固定螺栓，松开后取出所有螺栓，按顺序摆放。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">注意事项：</p>
                        <p className="text-[var(--text-secondary)]">螺栓取出后做好标记，避免后续安装时混淆；力度均匀，防止后端盖受力不均产生变形、裂纹。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">技能标注：</p>
                        <p className="text-[var(--warning-orange)] font-medium">★关键技能（对角交叉拆卸螺栓，后端盖受力保护）</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 子步骤3 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-4 text-[var(--text-primary)] text-lg">③ 取出后端盖</h4>
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="md:w-1/2">
                      <div 
                        className="relative rounded-lg overflow-hidden cursor-pointer shadow-sm"
                        onClick={() => setSelectedImage(stepImages[8])}
                      >
                        <img 
                          src={stepImages[8]} 
                          alt="取出后端盖" 
                          className="w-full h-auto object-cover hover:opacity-90 transition-opacity rounded-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(stepImages[8]);
                            }}
                          >
                            <i className="fa-solid fa-search-plus text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 space-y-3 text-sm">
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">工具选用：</p>
                        <p className="text-[var(--text-secondary)]">橡胶锤。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">操作要点：</p>
                        <p className="text-[var(--text-secondary)]">用橡胶锤轻轻敲击后端盖四个端角，敲击力度均匀、轻柔，待后端盖松动后，移出三相线柱，平稳取出后端盖。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">注意事项：</p>
                        <p className="text-[var(--text-secondary)]">禁止用金属锤硬砸后端盖，避免端盖变形、破损；移出三相线柱时，避免拉扯线束。</p>
                      </div>
                      <div className="bg-[var(--bg-primary)]/30 rounded-lg p-3">
                        <p className="font-medium text-[var(--text-primary)] mb-1">技能标注：</p>
                        <p className="text-[var(--warning-orange)] font-medium">★关键技能（橡胶锤规范使用，后端盖无损拆卸技巧）</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 步骤四：转子前端部件拆卸 */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4 text-[var(--text-primary)] bg-[var(--bg-primary)] px-4 py-2 rounded-lg">
                步骤四：转子前端部件拆卸
              </h3>
              
              <div className="space-y-6 ml-4">
                {/* 子步骤1 */}
                <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-[var(--text-primary)]">① 拆卸转子前端弹性挡圈</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-[var(--text-primary)]">操作要点：</strong> <span className="text-[var(--text-secondary)]">用合适工具（根据挡圈型号选用）取下转子前端的弹性挡圈，操作轻柔，避免挡圈变形、断裂。</span></p>
                    <p><strong className="text-[var(--text-primary)]">注意事项：</strong> <span className="text-[var(--text-secondary)]">明确弹性挡圈不可重复使用，做好标记，提醒后续安装时更换新品；取下的挡圈妥善放置，避免丢失。</span></p>
                    <p><strong className="text-[var(--text-primary)]">技能标注：</strong> <span className="text-[var(--warning-orange)] font-medium">★关键技能（弹性挡圈无损拆卸、易损件识别与处理原则）</span></p>
                  </div>
                  <div 
                    className="mt-3 relative rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(stepImages[9])}
                  >
                    <img 
                      src={stepImages[9]} 
                      alt="拆卸转子前端弹性挡圈" 
                      className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <i className="fa-solid fa-search-plus text-white text-2xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 实训收尾 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('conclusion')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>实训收尾</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.conclusion ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.conclusion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="bg-[var(--bg-primary)] rounded-lg p-4 space-y-3">
              <div className="flex">
                <i className="fa-solid fa-check-circle text-[var(--success-green)] mt-1 mr-3"></i>
                <p className="text-[var(--text-primary)]"><strong>部件整理：</strong>将所有拆卸下来的部件（螺栓、垫片、盖板、编码器等）按类别、按拆卸顺序摆放整齐，做好标记，区分可重复使用件和需更换的易损件。</p>
              </div>
              <div className="flex">
                <i className="fa-solid fa-check-circle text-[var(--success-green)] mt-1 mr-3"></i>
                <p className="text-[var(--text-primary)]"><strong>工具归位：</strong>将使用后的工具清洁干净，按规格放回指定存放处，检查工具是否完好。</p>
              </div>
              <div className="flex">
                <i className="fa-solid fa-check-circle text-[var(--success-green)] mt-1 mr-3"></i>
                <p className="text-[var(--text-primary)]"><strong>工位清洁：</strong>清理实训台面的杂物、灰尘，保持工位整洁。</p>
              </div>
              <div className="flex">
                <i className="fa-solid fa-check-circle text-[var(--success-green)] mt-1 mr-3"></i>
                <p className="text-[var(--text-primary)]"><strong>记录填写：</strong>填写实训记录，注明拆卸过程中遇到的问题、易损件更换情况及操作体会。</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 小练习 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('quiz')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>小练习</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.quiz ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.quiz && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <MotorDismantlingQuiz />
            </div>
          </motion.div>
        )}
      </div>

      {/* 问问AI按钮 */}
      {showAskAIButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute z-40"
          style={{
            left: `${selectionPosition.x}px`,
            top: `${selectionPosition.y}px`
          }}
        >
          <button
            onClick={handleAskAI}
            className="bg-[var(--brand-pink)] text-white px-3 py-1.5 rounded-full shadow-lg hover:bg-[var(--brand-pink)]/90 transition-colors flex items-center text-sm whitespace-nowrap min-w-[80px] justify-center"
          >
            <i className="fa-solid fa-robot mr-1"></i>
            问问AI
          </button>
        </motion.div>
      )}
      
      {/* 图片预览模态框 */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeImagePreview}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300"
              onClick={closeImagePreview}
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <img 
              src={selectedImage} 
              alt="预览图片" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}