import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';
import Motor3DModel from './Motor3DModel';
import MotorDismantlingQuiz from './MotorAnimation';
import MotorDiagnosticSimulator from './MotorDiagnosticSimulator';
import MotorParameterCalculator from './MotorParameterCalculator';
import MotorStatorInteractive from './MotorStatorInteractive';

export default function MotorTheory({ onSelectText }: { onSelectText?: (text: string) => void }) {
  // 展开/折叠状态管理
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    goals: true,
    structure: true,
    magneticField: true,
    workflow: true,
    calculation: true,
    advantages: true,
    resources: true,
  });
  
  // 图表ref
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  
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
    <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 h-full overflow-y-auto">
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
            <div className="rounded-lg p-4">
              <p className="mb-3 text-[var(--text-primary)]">通过本课学习，应能够：</p>
              <ul className="list-disc list-inside text-[var(--text-primary)] space-y-2">
                <li>说出交流异步电机的基本结构组成</li>
                <li>理解旋转磁场的产生原理</li>
                <li>分析异步电机的工作过程</li>
                <li>初步理解在新能源汽车中的应用意义</li>
              </ul>
            </div>
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
            <div className="rounded-lg p-4 mb-4">
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
            <div className="rounded-lg p-4 mb-4">
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
            <div className="bg-[var(--bg-primary)] rounded-lg p-4 mb-4">
              <p className="mb-4 text-[var(--text-secondary)] leading-relaxed">
                三相定子绕组通入相位差120°的交流电，形成空间上依次相差120°的脉振磁场，合成后得到幅值恒定、匀速旋转的合成磁场，其同步转速n₁=60f/p。
              </p>
              <div className="bg-white rounded-lg p-3 border border-[var(--light-pink)]">
                <p className="text-[var(--text-primary)] font-medium mb-2">形象理解：</p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  想象三个人轮流拍手：<br/>
                  1. 三相电就像三位节拍不同的鼓手，A、B、C 各相差"一拍"（120°）。<br/>
                  2. 定子绕组是三组"线圈鼓"，通电后各自产生一个小磁场。<br/>
                  3. 因为三人节拍错开，小磁场像接力棒一样"你追我赶"，合成一个原地打转的大磁场——这就是"旋转磁场"。<br/>
                  4. 转速只由电源频率和电机极对数决定，跟转子有没有动无关，所以叫"同步转速"。<br/>
                  5. 转子像坐在旋转木马外的孩子，被转动的磁场"牵着跑"，但又永远追不上，于是形成"异步"。
                </p>
                <p className="mt-3 text-[var(--text-secondary)] font-medium italic">
                  一句话：三相电"轮流拍手"，定子里就转起了"隐形拨浪盘"，隔空推着转子转。
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 电机工作过程流程 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('workflow')}
          className="w-full flex items-center justify-between text-lg font-medium mb-3 text-[var(--text-primary)]"
        >
          <span>电机工作过程流程</span>
          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedSections.workflow ? 'transform rotate-180' : ''}`}></i>
        </button>
        
        {expandedSections.workflow && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-1"
          >
            <div className="bg-[var(--bg-primary)] rounded-lg p-4">
              <ol className="space-y-4 text-[var(--text-secondary)]">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">1</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">上电自检</h4>
                    <p>主控 MCU 检测母线电压、相电流采样、温度传感器与旋变信号，全部正常后进入待机。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">2</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">启机预充</h4>
                    <p>闭合预充继电器，通过 PTC 电阻将直流母线电容电压缓慢抬升至电池电压 95%，随后吸合主正继电器，切除预充。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">3</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">转速指令解析</h4>
                    <p>VCU 通过 CAN 发送目标转速 n* 与转矩 T*；MCU 依据当前转子实际转速 n 计算滑差 s = (n₁−n)/n₁，并查表得到最佳滑差-转矩曲线。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">4</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">SVPWM 调制</h4>
                    <p>根据目标转矩查弱磁/最大转矩电流比（MTPA）表，得到 id、iq；经 Park 逆变换得到三相电流参考 ia、ib、ic；通过 SVPWM 生成六路 PWM 占空比，驱动 IGBT 三相桥。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">5</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">功率驱动</h4>
                    <p>IGBT 将直流母线电压斩波成三相正弦 PWM 波，经滤波电感后形成近似正弦的相电流，注入定子绕组，产生旋转磁场。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">6</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">转子感应与转矩输出</h4>
                    <p>旋转磁场切割转子导条，感应出滑差频率的转子电流；该电流与气隙磁场作用产生异步转矩，驱动转子跟随磁场旋转，实现机电能量转换。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">7</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">闭环监控</h4>
                    <p>双环 PI：转速环 1 kHz 刷新，电流环 10 kHz 刷新；实时比较 n 与 n*，动态调整 iq，抑制负载扰动；同步监测温度、电流、电压，触发降额或故障保护。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">8</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">能量回收</h4>
                    <p>当 VCU 请求制动，MCU 将 iq 设为负值，电机进入发电状态，母线电压泵升至电池允许上限后，通过 Buck-Boost 回馈能量至电池，实现制动能量回收。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-medium">9</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">下电流程</h4>
                    <p>转速降至 50 rpm 以下，断开主正继电器，电容放电至 &lt;60 V，MCU 进入休眠，完成一次完整的"电子工作过程"。</p>
                  </div>
                </li>
              </ol>
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
            <div className="rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-3 flex items-center text-[var(--text-primary)]"><i className="fa-solid fa-calculator text-[var(--brand-pink)] mr-2"></i>介绍计算方式</h3>
              <p className="mb-3 text-[var(--text-primary)] leading-relaxed">异步电机的参数计算主要基于其基本结构和工作原理。常用的计算方式包括：</p>
              <ul className="list-disc list-inside text-[var(--text-primary)] space-y-2">
                <li>同步转速计算：n₁ = 60f/p，其中 f 为电源频率，p 为电机极对数。</li>
                <li>最大转矩电流比（MTPA）计算：MTPA = Id/Imax，其中 Id 为最大转矩电流，Imax 为最大允许电流。</li>
                <li>弱磁区宽度计算：弱磁区宽度 = 120°/MTPA，即弱磁区占总旋转角度的比例。</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-3 flex items-center text-[var(--text-primary)]"><i className="fa-solid fa-chart-line text-[var(--brand-pink)] mr-2"></i>电机转差率与性能关系</h3>
              <div className="bg-white rounded-lg p-4 border border-[var(--light-pink)]">
                <div ref={chartRef} className="h-80 w-full"></div>
              </div>
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
              <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">优势</h3>
                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                  <li>结构简单：无永磁体，制造与维护成本低</li>
                  <li>成本低廉：原材料易得，供应链成熟</li>
                  <li>可靠性高：耐高温、抗退磁，寿命长</li>
                  <li>高速弱磁区宽：易于实现宽速恒功率运行</li>
                  <li>免永磁体：规避稀土资源风险与价格波动</li>
                </ul>
              </div>
              
              <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                <h3 className="text-md font-medium mb-3 text-[var(--text-primary)]">劣势</h3>
                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                  <li>低速效率偏低：励磁电流大，铜耗占比高</li>
                  <li>需无功励磁：增加逆变器容量与损耗</li>
                  <li>功率密度与转矩密度不及永磁机：同体积输出偏小</li>
                  <li>控制器算法复杂：需精确滑差估算与转子参数辨识</li>
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
              
              {/* 资源2：拆卸步骤排序 */}
              <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <MotorDismantlingQuiz />
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
