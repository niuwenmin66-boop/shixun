import { useState, useEffect } from 'react';
import { WaveformCanvas } from './WaveformCanvas';
import { ControlPanel } from './ControlPanel';

type PhaseCurrents = {
  a: number;
  b: number;
  c: number;
};

export default function WaveformInteractive() {
  // 状态管理
  const [frequency, setFrequency] = useState<number>(1);
  const [polePairs, setPolePairs] = useState<number>(1);
  const [amplitude, setAmplitude] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currents, setCurrents] = useState<PhaseCurrents>({
    a: 0,
    b: 0,
    c: 0
  });

  // 计算三相电流
  useEffect(() => {
    const calculateCurrents = (time: number): PhaseCurrents => {
      const angleA = 2 * Math.PI * frequency * time * direction;
      const angleB = angleA - (2 * Math.PI) / 3;
      const angleC = angleA - (4 * Math.PI) / 3;

      return {
        a: amplitude * Math.sin(angleA),
        b: amplitude * Math.sin(angleB),
        c: amplitude * Math.sin(angleC)
      };
    };

    // 初始计算
    setCurrents(calculateCurrents(currentTime));

    // 动画循环
    let animationId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = (timestamp - lastTime) / 1000; // 转换为秒
      lastTime = timestamp;

      if (isPlaying) {
        setCurrentTime(prevTime => {
          const newTime = prevTime + deltaTime;
          setCurrents(calculateCurrents(newTime));
          return newTime;
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [frequency, amplitude, direction, isPlaying]);

  // 切换播放/暂停
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 切换方向
  const handleToggleDirection = () => {
    setDirection(prev => prev * -1);
  };

  // 重置
  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-xl border border-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
        <i className="fa-solid fa-wave-square text-blue-400 mr-2"></i>
        三相电流波形模拟器
      </h3>
      
      <div className="space-y-4">
        {/* 波形显示区域 */}
        <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
          <WaveformCanvas 
            currents={currents}
            frequency={frequency}
            amplitude={amplitude}
            currentTime={currentTime}
            direction={direction}
          />
          {/* 当前参数显示 */}
          <div className="mt-3 p-3 bg-black/30 rounded-lg border border-white/5">
            <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">当前参数</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-white/50">频率:</span>
                <span className="ml-2 mono text-[#3b82f6]">{frequency.toFixed(1)} Hz</span>
              </div>
              <div>
                <span className="text-white/50">极对数:</span>
                <span className="ml-2 mono text-[#8b5cf6]">{polePairs}</span>
              </div>
              <div>
                <span className="text-white/50">电流:</span>
                <span className="ml-2 mono text-[#f59e0b]">{amplitude.toFixed(1)} pu</span>
              </div>
              <div>
                <span className="text-white/50">方向:</span>
                <span className="ml-2 mono text-white/80">{direction === 1 ? '正转 (A→B→C)' : '反转 (A→C→B)'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 控制面板 */}
        <div className="bg-gray-850 rounded-lg p-3 border border-gray-700">
          <ControlPanel
            frequency={frequency}
            polePairs={polePairs}
            amplitude={amplitude}
            isPlaying={isPlaying}
            direction={direction}
            onFrequencyChange={setFrequency}
            onPolePairsChange={setPolePairs}
            onAmplitudeChange={setAmplitude}
            onTogglePlay={handleTogglePlay}
            onToggleDirection={handleToggleDirection}
            onReset={handleReset}
          />
        </div>

        {/* 说明信息 */}
        <div className="bg-gray-850/50 rounded-lg p-3 border border-gray-700/50">
          <h4 className="text-sm font-medium mb-2 text-gray-300">使用说明</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• 调整频率可以改变波形的变化速度</li>
            <li>• 调整电流幅值可以改变波形的高度</li>
            <li>• 点击方向按钮可以切换电流的相位顺序</li>
            <li>• 播放/暂停按钮可以控制波形的动态显示</li>
            <li>• 重置按钮可以将波形恢复到初始状态</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
