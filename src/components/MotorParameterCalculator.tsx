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
    // 计算电流
    const current = (power * 1000) / (Math.sqrt(3) * voltage * powerFactor * efficiency);
    
    // 计算同步转速
    const synchronousSpeed = (60 * frequency) / polePairs;
    
    // 估算额定转速（假设转差率为5%）
    const slip = 0.05;
    const ratedSpeed = synchronousSpeed * (1 - slip);
    
    // 计算转矩
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
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-4 text-[var(--text-primary)]">
        参数计算器
      </h3>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* 输入参数区域 */}
        <div className="md:w-1/2">
          <h4 className="font-medium mb-3 text-[var(--text-primary)]">
            输入参数
          </h4>
          
          <div className="space-y-3">
            {/* 电压 */}
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                额定电压 (V)
              </label>
              <input 
                type="number" 
                value={voltage} 
                onChange={(e) => setVoltage(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)]"
              />
            </div>
            
            {/* 频率 */}
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                电源频率 (Hz)
              </label>
              <input 
                type="number" 
                value={frequency} 
                onChange={(e) => setFrequency(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)]"
              />
            </div>
            
            {/* 功率 */}
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                额定功率 (kW)
              </label>
              <input 
                type="number" 
                value={power} 
                onChange={(e) => setPower(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)]"
              />
            </div>
            
            {/* 效率 */}
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                效率 (%)
              </label>
              <input 
                type="number" 
                value={efficiency * 100} 
                onChange={(e) => setEfficiency(parseFloat(e.target.value) / 100 || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)]"
              />
            </div>
            
            {/* 功率因数 */}
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                功率因数
              </label>
              <input 
                type="number" 
                value={powerFactor} 
                onChange={(e) => setPowerFactor(parseFloat(e.target.value) || 0)}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)]"
              />
            </div>
            
            {/* 极对数 */}
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                极对数
              </label>
              <input 
                type="number" 
                value={polePairs} 
                onChange={(e) => setPolePairs(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)]"
              />
            </div>
          </div>
        </div>
        
        {/* 计算结果区域 */}
        <div className="md:w-1/2">
          <h4 className="font-medium mb-3 text-[var(--text-primary)]">
            计算结果
          </h4>
          
          <div className="bg-[var(--bg-primary)] rounded-lg p-4 h-64 overflow-y-auto">
            <div className="space-y-3">
              {/* 额定电流 */}
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-[var(--text-primary)]">额定电流</span>
                <span className="font-medium text-[var(--text-primary)]">{calculatedParams.current} A</span>
              </div>
              
              {/* 额定转矩 */}
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-[var(--text-primary)]">额定转矩</span>
                <span className="font-medium text-[var(--text-primary)]">{calculatedParams.torque} N·m</span>
              </div>
              
              {/* 同步转速 */}
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-[var(--text-primary)]">同步转速</span>
                <span className="font-medium text-[var(--text-primary)]">{calculatedParams.synchronousSpeed} rpm</span>
              </div>
              
              {/* 额定转速 */}
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-[var(--text-primary)]">额定转速</span>
                <span className="font-medium text-[var(--text-primary)]">{calculatedParams.ratedSpeed} rpm</span>
              </div>
              
              {/* 转差率 */}
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-[var(--text-primary)]">转差率</span>
                <span className="font-medium text-[var(--text-primary)]">{calculatedParams.slip}</span>
              </div>
            </div>
          </div>
          
          {/* 计算公式说明 */}
          <div className="mt-4 p-3 bg-[var(--bg-primary)] rounded-lg">
            <h5 className="text-sm font-medium text-[var(--text-primary)] mb-2">
              计算公式
            </h5>
            <div className="text-xs text-[var(--text-secondary)] space-y-1">
              <p>电流：I = P × 1000 / (√3 × U × cosφ × η)</p>
              <p>同步转速：n₁ = 60 × f / p</p>
              <p>额定转速：n = n₁ × (1 - s)</p>
              <p>转矩：T = P × 1000 × 60 / (2π × n)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
