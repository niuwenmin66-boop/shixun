import { useState, useEffect } from 'react';

export default function MotorAnimation() {
  // 动画播放状态
  const [isPlaying, setIsPlaying] = useState(true);
  // 动画速度
  const [speed, setSpeed] = useState(1);
  // 显示模式
  const [mode, setMode] = useState<'rotation' | 'magnetic' | 'current'>('rotation');
  // 动画帧
  const [frame, setFrame] = useState(0);

  // 动画循环
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 360);
    }, 50 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // 模式选项
  const modeOptions = [
    { value: 'rotation', label: '旋转磁场' },
    { value: 'magnetic', label: '磁场分布' },
    { value: 'current', label: '电流变化' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-4 text-[var(--text-primary)]">
        工作原理动画
      </h3>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* 动画展示区域 */}
        <div className="md:w-2/3">
          <div className="bg-[var(--bg-primary)] rounded-lg h-64 flex items-center justify-center relative">
            {/* 动画内容 */}
            <div className="relative w-48 h-48">
              {mode === 'rotation' && (
                <>
                  {/* 旋转磁场动画 */}
                  <div className="absolute inset-0 rounded-full border-4 border-gray-300 flex items-center justify-center">
                    {/* 三相绕组 */}
                    <div className="relative w-36 h-36">
                      {/* 绕组A */}
                      <div 
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-16 bg-red-400 rounded-full"
                        style={{ opacity: 0.7 + 0.3 * Math.sin((frame * Math.PI) / 180) }}
                      ></div>
                      {/* 绕组B */}
                      <div 
                        className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-1/2 w-4 h-16 bg-green-400 rounded-full rotate-120"
                        style={{ opacity: 0.7 + 0.3 * Math.sin(((frame - 120) * Math.PI) / 180) }}
                      ></div>
                      {/* 绕组C */}
                      <div 
                        className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-1/2 w-4 h-16 bg-blue-400 rounded-full -rotate-120"
                        style={{ opacity: 0.7 + 0.3 * Math.sin(((frame - 240) * Math.PI) / 180) }}
                      ></div>
                      {/* 旋转磁场 */}
                      <div 
                        className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-50"
                        style={{ transform: `rotate(${frame}deg)` }}
                      >
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full"></div>
                      </div>
                      {/* 转子 */}
                      <div 
                        className="absolute inset-4 rounded-full border-4 border-[#2196F3] bg-blue-50 flex items-center justify-center"
                        style={{ transform: `rotate(${frame * 0.8}deg)` }}
                      >
                        <div className="w-4 h-4 bg-[#2196F3] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {mode === 'magnetic' && (
                <>
                  {/* 磁场分布动画 */}
                  <div className="absolute inset-0 rounded-full border-4 border-gray-300 flex items-center justify-center">
                    <div className="relative w-36 h-36">
                      {/* 定子磁场 */}
                      <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-50"></div>
                      {/* 转子磁场 */}
                      <div 
                        className="absolute inset-8 rounded-full border-2 border-blue-400 opacity-50"
                        style={{ transform: `rotate(${frame}deg)` }}
                      ></div>
                      {/* 磁力线 */}
                      {[0, 60, 120, 180, 240, 300].map(angle => (
                        <div 
                          key={angle}
                          className="absolute inset-0 w-full h-full"
                          style={{ transform: `rotate(${angle}deg)` }}
                        >
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300 opacity-30"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {mode === 'current' && (
                <>
                  {/* 电流变化动画 */}
                  <div className="absolute inset-0 rounded-full border-4 border-gray-300 flex items-center justify-center">
                    <div className="relative w-36 h-36">
                      {/* 三相电流波形 */}
                      <div className="absolute inset-0 flex flex-col justify-around">
                        {/* 相A */}
                        <div className="h-8 w-full bg-red-100 rounded flex items-center">
                          <div 
                            className="h-full bg-red-400 rounded"
                            style={{ width: `${50 + 50 * Math.sin((frame * Math.PI) / 180)}%` }}
                          ></div>
                        </div>
                        {/* 相B */}
                        <div className="h-8 w-full bg-green-100 rounded flex items-center">
                          <div 
                            className="h-full bg-green-400 rounded"
                            style={{ width: `${50 + 50 * Math.sin(((frame - 120) * Math.PI) / 180)}%` }}
                          ></div>
                        </div>
                        {/* 相C */}
                        <div className="h-8 w-full bg-blue-100 rounded flex items-center">
                          <div 
                            className="h-full bg-blue-400 rounded"
                            style={{ width: `${50 + 50 * Math.sin(((frame - 240) * Math.PI) / 180)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* 动画状态提示 */}
            <div className="absolute bottom-4 left-4 text-xs text-[var(--text-secondary)]">
              <p>模式：{modeOptions.find(opt => opt.value === mode)?.label}</p>
            </div>
          </div>
        </div>
        
        {/* 控制区域 */}
        <div className="md:w-1/3">
          <h4 className="font-medium mb-3 text-[var(--text-primary)]">
            动画控制
          </h4>
          
          {/* 播放/暂停按钮 */}
          <button 
            className="w-full px-4 py-2 bg-[var(--brand-pink)] text-white rounded-lg mb-4 hover:bg-[var(--brand-pink)]/90 transition-colors flex items-center justify-center gap-2"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            {isPlaying ? '暂停' : '播放'}
          </button>
          
          {/* 速度控制 */}
          <div className="mb-4">
            <label className="block text-sm text-[var(--text-secondary)] mb-2">
              动画速度
            </label>
            <input 
              type="range" 
              min="0.5" 
              max="3" 
              step="0.5" 
              value={speed} 
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
              <span>慢</span>
              <span>快</span>
            </div>
          </div>
          
          {/* 模式选择 */}
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">
              显示模式
            </label>
            <div className="space-y-2">
              {modeOptions.map(option => (
                <div 
                  key={option.value}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${mode === option.value ? 'bg-[var(--brand-pink)]/10' : 'hover:bg-[var(--light-pink)]/30'}`}
                  onClick={() => setMode(option.value as any)}
                >
                  <span className="text-sm text-[var(--text-primary)]">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
