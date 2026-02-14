import { useState } from 'react';
import { Play, Pause, RotateCcw, ArrowRightLeft } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ControlPanelProps {
  frequency: number;
  polePairs: number;
  amplitude: number;
  isPlaying: boolean;
  direction: number;
  onFrequencyChange: (value: number) => void;
  onPolePairsChange: (value: number) => void;
  onAmplitudeChange: (value: number) => void;
  onTogglePlay: () => void;
  onToggleDirection: () => void;
  onReset: () => void;
}

export function ControlPanel({
  frequency,
  polePairs,
  amplitude,
  isPlaying,
  direction,
  onFrequencyChange,
  onPolePairsChange,
  onAmplitudeChange,
  onTogglePlay,
  onToggleDirection,
  onReset,
}: ControlPanelProps) {
  const [freqValue, setFreqValue] = useState(frequency);
  const [ampValue, setAmpValue] = useState(amplitude);

  const polePairOptions = [
    { value: 1, label: '1对极 (2极)' },
    { value: 2, label: '2对极 (4极)' },
    { value: 4, label: '4对极 (8极)' },
  ];

  const handleFreqChange = (value: number[]) => {
    const newFreq = value[0];
    setFreqValue(newFreq);
    onFrequencyChange(newFreq);
  };

  const handleAmpChange = (value: number[]) => {
    const newAmp = value[0];
    setAmpValue(newAmp);
    onAmplitudeChange(newAmp);
  };

  return (
    <div className="space-y-6">
      {/* 频率控制 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white/80">
            电源频率 (f)
          </label>
          <span className="mono text-sm text-[#3b82f6] font-semibold">
            {freqValue.toFixed(1)} Hz
          </span>
        </div>
        <Slider
          value={[freqValue]}
          onValueChange={handleFreqChange}
          min={0.5}
          max={5}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-white/50">
          <span>0.5 Hz</span>
          <span>5 Hz</span>
        </div>
      </div>

      {/* 极对数控制 */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/80">
          极对数 (p)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {polePairOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onPolePairsChange(option.value)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${polePairs === option.value
                  ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 电流幅值控制 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white/80">
            电流幅值 (I)
          </label>
          <span className="mono text-sm text-[#f59e0b] font-semibold">
            {ampValue.toFixed(1)} pu
          </span>
        </div>
        <Slider
          value={[ampValue]}
          onValueChange={handleAmpChange}
          min={0.5}
          max={2}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-white/50">
          <span>0.5</span>
          <span>2.0</span>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        {/* 播放/暂停 */}
        <button
          onClick={onTogglePlay}
          className={`
            flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200
            ${isPlaying
              ? 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/50 hover:bg-[#ef4444]/30'
              : 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/50 hover:bg-[#22c55e]/30'
            }
          `}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>暂停</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>播放</span>
            </>
          )}
        </button>

        {/* 方向切换 */}
        <button
          onClick={onToggleDirection}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:border-white/20"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>{direction === 1 ? '正转' : '反转'}</span>
        </button>

        {/* 重置 */}
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:border-white/20"
        >
          <RotateCcw className="w-4 h-4" />
          <span>重置</span>
        </button>
      </div>
    </div>
  );
}
