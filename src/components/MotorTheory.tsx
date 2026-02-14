import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';

import MotorDismantlingQuiz from './MotorAnimation';

import MotorParameterCalculator from './MotorParameterCalculator';
import MotorStatorInteractive from './MotorStatorInteractive';
import WaveformInteractive from './WaveformInteractive';
import Motor3DViewer from './Motor3DViewer';

export default function MotorTheory({ onSelectText }: { onSelectText?: (text: string) => void }) {
  // 展开/折叠状态管理
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    goals: true,
    structure: true,
    magneticField: true,
    calculation: true,
    advantages: true,
    resources: true,
  });
  
  // 图表ref
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  
  // 文字选中状态
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [showAskAIButton, setShowAskAIButton] = useState(false);
  
  // 容器引用
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  
  // 切换章节展开/折叠
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  // 初始化和更新图表
  useEffect(() => {
    if (chartRef.current) {
      // 销毁已有的图表实例
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      
      // 创建新的图表实例
      chartInstance.current = echarts.init(chartRef.current);
      
      // 图表配置
      const option = {
        title: {
          text: '电机转差率与性能关系',
          left: 'center',
          top: 0,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['转矩', '效率'],
          top: 30
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['0.05', '0.1', '0.15', '0.2', '0.25', '0.3', '0.35', '0.4', '0.45', '0.5'],
            name: '转差率',
            nameLocation: 'middle',
            nameGap: 30,
            axisLabel: {
              interval: 0,
              rotate: 0
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#e0e0e0'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '转矩',
            min: -90,
            max: 90,
            interval: 45,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#e0e0e0'
              }
            }
          },
          {
            type: 'value',
            name: '效率(%)',
            min: 0,
            max: 100,
            interval: 25,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '转矩',
            type: 'line',
            smooth: true,
            data: [45, 85, 90, 88, 46.6, 20, 10, 5, 3, 2],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: 'white',
              borderColor: '#a78bfa',
              borderWidth: 2,
              opacity: 1
            },
            lineStyle: {
              color: '#a78bfa',
              width: 2
            }
          },
          {
            name: '效率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: [40, 85, 90, 89, 87.5, 85, 80, 78, 76, 75],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: 'white',
              borderColor: 'green',
              borderWidth: 2,
              opacity: 1
            },
            lineStyle: {
              color: 'green',
              width: 2
            }
          }
        ]
      };
      
      // 设置图表配置
      chartInstance.current.setOption(option);
      
      // 监听窗口大小变化，调整图表大小
      const resizeHandler = () => {
        chartInstance.current?.resize();
      };
      window.addEventListener('resize', resizeHandler);
      
      // 清理函数
      return () => {
        window.removeEventListener('resize', resizeHandler);
        chartInstance.current?.dispose();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 h-full overflow-y-auto relative">
      {/* 标题 */}
      <h1 className="text-lg font-semibold mb-6 text-[var(--text-primary)] border-b border-[var(--light-pink)] pb-3">
        交流异步电机的结构与工作原理
      </h1>

      {/* 学习目标 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('goals')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>学习目标</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.goals ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.goals && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <p className="mb-3 text-[var(--text-primary)]">通过本课学习，应能够：</p>
            <ul className="list-disc list-inside text-[var(--text-primary)] space-y-2">
                <li>说出交流异步电机的基本结构组成</li>
                <li>理解旋转磁场的产生原理</li>
                <li>初步理解在新能源汽车中的应用意义</li>
              </ul>
          </motion.div>
        )}
      </div>

      {/* 交流异步电机的基本结构 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('structure')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>交流异步电机的基本结构</span>
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
            {/* 定子结构 */}
            <div className="mb-4">
              <h3 className="font-medium mb-3 flex items-center text-[var(--text-primary)]"><i className="fa-solid fa-cog text-[var(--brand-pink)] mr-2"></i>定子（Stator）</h3>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <p className="mb-3 text-[var(--text-primary)] leading-relaxed">定子是交流异步电机的静止部分，由以下组件构成：</p>
                  <ul className="list-disc list-inside text-[var(--text-primary)] space-y-2">
                    <li>定子铁芯：硅钢片叠压，导磁并降涡流。</li>
                    <li>定子绕组：三相铜线，通电生旋转磁场。</li>
                    <li>槽与槽楔：固定绕组，防松动。</li>
                    <li>机座：支撑铁芯，兼散热。</li>
                    <li>端盖与轴承：保持定转子同心。</li>
                    <li>冷却测温：风冷/水冷，埋热敏电阻。</li>
                    <li>出线与接地：IP67 屏蔽接头，M6 接地。</li>
                  </ul>
                </div>
                <div className="w-1/3">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=real%20AC%20motor%20stator%20structure%2C%20with%20core%20and%20windings%2C%20technical%20photograph%2C%20clear%20details%2C%20white%20background&image_size=square_hd" 
                    alt="真实定子结构" 
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* 定子结构互动资源 */}
            <div className="mb-4">
              <MotorStatorInteractive />
            </div>
            
            {/* 转子结构 */}
            <div className="mb-4">
              <h3 className="font-medium mb-3 flex items-center text-[var(--text-primary)]"><i className="fa-solid fa-cog text-[var(--brand-pink)] mr-2"></i>转子（Rotor）</h3>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <p className="mb-3 text-[var(--text-primary)] leading-relaxed">转子是交流异步电机的运动部分，由以下组件构成：</p>
                  <ul className="list-disc list-inside text-[var(--text-primary)] space-y-2">
                    <li>转子铁芯：硅钢片叠压，导磁并降涡流。</li>
                    <li>转子绕组：三相铜线，通电生旋转磁场。</li>
                    <li>轴承室：安装滚动轴承，支撑转子。</li>
                    <li>端盖：与机座止口配合，形成封闭腔体。</li>
                  </ul>
                </div>
                <div className="w-1/3">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=real%20AC%20motor%20rotor%20structure%2C%20with%20core%20and%20windings%2C%20technical%20photograph%2C%20clear%20details%2C%20white%20background&image_size=square_hd" 
                    alt="真实转子结构" 
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* 3D资源 */}
            <div className="mb-4">
              <div className="bg-[var(--bg-primary)] rounded-lg p-4 border border-[var(--light-pink)]">
                <h3 className="font-medium mb-3 text-[var(--text-primary)]">交流感应电动机 绕线式-转子3D模型</h3>
                <Motor3DViewer />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 旋转磁场产生原理 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('magneticField')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>旋转磁场产生原理</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.magneticField ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.magneticField && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <p className="text-[var(--text-primary)] leading-relaxed">
                  三相定子绕组通入相位差120°的交流电，形成空间上依次相差120°的脉振磁场，合成后得到幅值恒定、匀速旋转的合成磁场，其同步转速n₁=60f/p。
                </p>
              </div>
              <div className="w-1/3">
                <img 
                  src="https://e.necibook.com/api/media/api/v1/media/showImage/2022488447462375424" 
                  alt="旋转磁场产生原理" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
            
            {/* 三相电流波形模拟器 */}
            <div className="mt-6">
              <WaveformInteractive />
            </div>

          </motion.div>
        )}
      </div>




      {/* 异步电机参数计算 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('calculation')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>异步电机参数计算</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.calculation ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.calculation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="mb-4">
              <h3 className="font-medium mb-3 flex items-center text-[var(--text-primary)]"><i className="fa-solid fa-calculator text-[var(--brand-pink)] mr-2"></i>介绍计算方式</h3>
              <p className="mb-3 text-[var(--text-primary)] leading-relaxed">异步电机的参数计算主要基于其基本结构和工作原理。常用的计算方式包括：</p>
              <ul className="list-disc list-inside text-[var(--text-primary)] space-y-2">
                <li>同步转速计算：n₁ = 60f/p，其中 f 为电源频率，p 为电机极对数。</li>
                <li>最大转矩电流比（MTPA）计算：MTPA = Id/Imax，其中 Id 为最大转矩电流，Imax 为最大允许电流。</li>
                <li>弱磁区宽度计算：弱磁区宽度 = 120°/MTPA，即弱磁区占总旋转角度的比例。</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-3 flex items-center text-[var(--text-primary)]"><i className="fa-solid fa-chart-line text-[var(--brand-pink)] mr-2"></i>电机转差率与性能关系</h3>
              <div className="bg-white rounded-lg p-4 border border-[var(--light-pink)]">
                <div ref={chartRef} className="h-80 w-full"></div>
              </div>
            </div>
            
            <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow mb-4">
              <MotorParameterCalculator />
            </div>
          </motion.div>
        )}
      </div>

      {/* 异步电机在新能源汽车使用中的优势与劣势 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('advantages')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>异步电机在新能源汽车使用中的优势与劣势</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.advantages ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.advantages && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 优势卡片 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-md font-semibold mb-3 text-green-700 flex items-center">
                  <i className="fa-solid fa-plus-circle text-green-500 mr-2"></i>
                  优势
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">结构简单：无永磁体，制造与维护成本低</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">成本低廉：原材料易得，供应链成熟</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">可靠性高：耐高温、抗退磁，寿命长</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">高速弱磁区宽：易于实现宽速恒功率运行</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">免永磁体：规避稀土资源风险与价格波动</span>
                  </li>
                </ul>
              </div>
              
              {/* 劣势卡片 */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-md font-semibold mb-3 text-red-700 flex items-center">
                  <i className="fa-solid fa-minus-circle text-red-500 mr-2"></i>
                  劣势
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">低速效率偏低：励磁电流大，铜耗占比高</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">需无功励磁：增加逆变器容量与损耗</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">功率密度与转矩密度不及永磁机：同体积输出偏小</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-[var(--text-primary)]">控制器算法复杂：需精确滑差估算与转子参数辨识</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 小练习 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('resources')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>小练习</span>
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
    </div>
  );
}
