import { useState, useEffect } from 'react';

export default function MotorParameterCalculator() {
  // 输入参数
  const [voltage, setVoltage] = useState<number>(380);
  const [frequency, setFrequency] = useState<number>(50);
  const [power, setPower] = useState<number>(15);
  const [efficiency, setEfficiency] = useState<number>(0.85);
  const [powerFactor, setPowerFactor] = useState<number>(0.8);
  const [polePairs, setPolePairs] = useState<number>(2);

  // 计算结果
  const [calculatedParams, setCalculatedParams] = useState({
    current: 0,
    torque: 0,
    synchronousSpeed: 0,
    ratedSpeed: 0,
    slip: 0
  });

  // 计算电机参数
  useEffect(() => {
    // 计算电流 I = P × 1000 / (√3 × U × cosφ × η)
    const current = (power * 1000) / (Math.sqrt(3) * voltage * powerFactor * efficiency);
    
    // 计算同步转速 n₁ = 60 × f / p
    const synchronousSpeed = (60 * frequency) / polePairs;
    
    // 估算额定转速（假设转差率为5%）n = n₁ × (1 - s)
    const slip = 0.05;
    const ratedSpeed = synchronousSpeed * (1 - slip);
    
    // 计算转矩 T = P × 1000 × 60 / (2π × n)
    const torque = (power * 1000 * 60) / (2 * Math.PI * ratedSpeed);
    
    setCalculatedParams({
      current: parseFloat(current.toFixed(2)),
      torque: parseFloat(torque.toFixed(2)),
      synchronousSpeed: parseFloat(synchronousSpeed.toFixed(1)),
      ratedSpeed: parseFloat(ratedSpeed.toFixed(1)),
      slip: parseFloat(slip.toFixed(3))
    });
  }, [voltage, frequency, power, efficiency, powerFactor, polePairs]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl p-6 border border-cyan-500/30">
      {/* 标题区域 */}
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-semibold text-cyan-400 flex items-center">
          <i className="fa-solid fa-microchip mr-3 text-2xl"></i>
          电机参数计算器
        </h3>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 输入参数区域 */}
        <div className="lg:w-1/2">
          <h4 className="font-medium mb-4 text-cyan-400 flex items-center">
            <i className="fa-solid fa-sliders mr-2"></i>
            参数设置
          </h4>
          
          <div className="space-y-5">
            {/* 电压 */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-cyan-900/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  额定电压 <span className="text-cyan-400 font-mono text-sm">(U)</span>
                </label>
                <span className="text-sm font-medium text-cyan-400 min-w-[60px] text-right">
                  {voltage}
                </span>
              </div>
              <input 
                type="range" 
                min="220" 
                max="660" 
                step="10" 
                value={voltage} 
                onChange={(e) => setVoltage(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((voltage - 220) / (660 - 220)) * 100}%, #374151 ${((voltage - 220) / (660 - 220)) * 100}%, #374151 100%)` 
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>220V</span>
                <span>380V</span>
                <span>660V</span>
              </div>
            </div>
            
            {/* 频率 */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-cyan-900/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  电源频率 <span className="text-cyan-400 font-mono text-sm">(f)</span>
                </label>
                <span className="text-sm font-medium text-cyan-400 min-w-[60px] text-right">
                  {frequency}
                </span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="60" 
                step="1" 
                value={frequency} 
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((frequency - 50) / (60 - 50)) * 100}%, #374151 ${((frequency - 50) / (60 - 50)) * 100}%, #374151 100%)` 
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>50Hz</span>
                <span>60Hz</span>
              </div>
            </div>
            
            {/* 功率 */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-cyan-900/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  额定功率 <span className="text-cyan-400 font-mono text-sm">(P)</span>
                </label>
                <span className="text-sm font-medium text-cyan-400 min-w-[60px] text-right">
                  {power}
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                step="1" 
                value={power} 
                onChange={(e) => setPower(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((power - 1) / (50 - 1)) * 100}%, #374151 ${((power - 1) / (50 - 1)) * 100}%, #374151 100%)` 
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1kW</span>
                <span>15kW</span>
                <span>50kW</span>
              </div>
            </div>
            
            {/* 效率 */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-cyan-900/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  效率 <span className="text-cyan-400 font-mono text-sm">(η)</span>
                </label>
                <span className="text-sm font-medium text-cyan-400 min-w-[60px] text-right">
                  {Math.round(efficiency * 100)}%
                </span>
              </div>
              <input 
                type="range" 
                min="0.7" 
                max="0.98" 
                step="0.01" 
                value={efficiency} 
                onChange={(e) => setEfficiency(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((efficiency - 0.7) / (0.98 - 0.7)) * 100}%, #374151 ${((efficiency - 0.7) / (0.98 - 0.7)) * 100}%, #374151 100%)` 
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>70%</span>
                <span>85%</span>
                <span>98%</span>
              </div>
            </div>
            
            {/* 功率因数 */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-cyan-900/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  功率因数 <span className="text-cyan-400 font-mono text-sm">(cosφ)</span>
                </label>
                <span className="text-sm font-medium text-cyan-400 min-w-[60px] text-right">
                  {powerFactor.toFixed(2)}
                </span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="0.95" 
                step="0.01" 
                value={powerFactor} 
                onChange={(e) => setPowerFactor(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((powerFactor - 0.5) / (0.95 - 0.5)) * 100}%, #374151 ${((powerFactor - 0.5) / (0.95 - 0.5)) * 100}%, #374151 100%)` 
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.5</span>
                <span>0.8</span>
                <span>0.95</span>
              </div>
            </div>
            
            {/* 极对数 */}
            <div className="bg-gray-800/60 p-4 rounded-lg border border-cyan-900/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  极对数 <span className="text-cyan-400 font-mono text-sm">(p)</span>
                </label>
                <span className="text-sm font-medium text-cyan-400 min-w-[60px] text-right">
                  {polePairs}
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="4" 
                step="1" 
                value={polePairs} 
                onChange={(e) => setPolePairs(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((polePairs - 1) / (4 - 1)) * 100}%, #374151 ${((polePairs - 1) / (4 - 1)) * 100}%, #374151 100%)` 
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 计算结果区域 */}
        <div className="lg:w-1/2">
          <h4 className="font-medium mb-4 text-cyan-400 flex items-center">
            <i className="fa-solid fa-chart-line mr-2"></i>
            计算结果
          </h4>
          
          {/* 电机可视化 */}
          <div className="mb-5 bg-gray-800/60 p-4 rounded-lg border border-cyan-900/50 flex justify-center">
            <div className="w-40 h-40 relative">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/50 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-cyan-700/50 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center">
                    <i className="fa-solid fa-bolt text-cyan-400 text-xl"></i>
                  </div>
                </div>
              </div>
              {/* 转子叶片 - 旋转速度跟随转速数值 */}
              <div 
                className="absolute inset-0"
                style={{ 
                  animation: `spin-slow ${calculatedParams.ratedSpeed > 0 ? (3 * 1500 / calculatedParams.ratedSpeed).toFixed(2) : 3}s linear infinite`
                }}
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <div 
                    key={angle} 
                    className="absolute top-1/2 left-1/2 w-1 h-16 bg-cyan-500/30 origin-bottom"
                    style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)` }}
                  ></div>
                ))}
              </div>
              {/* 外围发光效果 */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-pulse"></div>
            </div>
          </div>
          
          <div className="bg-gray-800/60 rounded-lg p-5 border border-cyan-900/50">
            <div className="space-y-4">
              {/* 额定电流 */}
              <div className="flex justify-between items-center p-3 bg-gray-700/40 rounded-lg border-l-4 border-cyan-500">
                <div className="flex items-center">
                  <i className="fa-solid fa-bolt text-cyan-400 mr-2"></i>
                  <span className="text-gray-300">额定电流 <span className="text-cyan-400 font-mono text-sm">(I)</span></span>
                </div>
                <span className="font-medium text-cyan-400">{calculatedParams.current} A</span>
              </div>
              
              {/* 额定转矩 */}
              <div className="flex justify-between items-center p-3 bg-gray-700/40 rounded-lg border-l-4 border-cyan-500">
                <div className="flex items-center">
                  <i className="fa-solid fa-rotate text-cyan-400 mr-2"></i>
                  <span className="text-gray-300">额定转矩 <span className="text-cyan-400 font-mono text-sm">(T)</span></span>
                </div>
                <span className="font-medium text-cyan-400">{calculatedParams.torque} N·m</span>
              </div>
              
              {/* 同步转速 */}
              <div className="flex justify-between items-center p-3 bg-gray-700/40 rounded-lg border-l-4 border-cyan-500">
                <div className="flex items-center">
                  <i className="fa-solid fa-tachometer text-cyan-400 mr-2"></i>
                  <span className="text-gray-300">同步转速 <span className="text-cyan-400 font-mono text-sm">(n₁)</span></span>
                </div>
                <span className="font-medium text-cyan-400">{calculatedParams.synchronousSpeed} rpm</span>
              </div>
              
              {/* 额定转速 */}
              <div className="flex justify-between items-center p-3 bg-gray-700/40 rounded-lg border-l-4 border-cyan-500">
                <div className="flex items-center">
                  <i className="fa-solid fa-cog text-cyan-400 mr-2"></i>
                  <span className="text-gray-300">额定转速 <span className="text-cyan-400 font-mono text-sm">(n)</span></span>
                </div>
                <span className="font-medium text-cyan-400">{calculatedParams.ratedSpeed} rpm</span>
              </div>
              
              {/* 转差率 */}
              <div className="flex justify-between items-center p-3 bg-gray-700/40 rounded-lg border-l-4 border-cyan-500">
                <div className="flex items-center">
                  <i className="fa-solid fa-percent text-cyan-400 mr-2"></i>
                  <span className="text-gray-300">转差率 <span className="text-cyan-400 font-mono text-sm">(s)</span></span>
                </div>
                <span className="font-medium text-cyan-400">{calculatedParams.slip}</span>
              </div>
            </div>
          </div>
          
          {/* 计算公式说明 */}
          <div className="mt-5 p-4 bg-gray-800/60 rounded-lg border border-cyan-900/50">
            <h5 className="text-sm font-medium text-cyan-400 mb-3 flex items-center">
              <i className="fa-solid fa-calculator mr-2"></i>
              计算公式
            </h5>
            <div className="text-xs text-gray-400 space-y-2">
              <p className="flex items-center">
                <i className="fa-solid fa-angle-right text-cyan-400 mr-1"></i>
                电流：I = P × 1000 / (√3 × U × cosφ × η)
              </p>
              <p className="flex items-center">
                <i className="fa-solid fa-angle-right text-cyan-400 mr-1"></i>
                同步转速：n₁ = 60 × f / p
              </p>
              <p className="flex items-center">
                <i className="fa-solid fa-angle-right text-cyan-400 mr-1"></i>
                额定转速：n = n₁ × (1 - s)
              </p>
              <p className="flex items-center">
                <i className="fa-solid fa-angle-right text-cyan-400 mr-1"></i>
                转矩：T = P × 1000 × 60 / (2π × n)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
