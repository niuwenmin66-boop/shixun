import { useEffect, useRef, useCallback } from 'react';
import type { PhaseCurrents } from '@/types';

interface WaveformCanvasProps {
  currents: PhaseCurrents;
  frequency: number;
  amplitude: number;
  currentTime: number;
  direction: number;
}

export function WaveformCanvas({ 
  currents, 
  frequency, 
  amplitude, 
  currentTime,
}: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<{ time: number; currents: PhaseCurrents }[]>([]);
  const maxHistory = 300; // 保存的历史点数

  // 颜色配置
  const colors = {
    a: '#ef4444', // 红色 - A相
    b: '#22c55e', // 绿色 - B相
    c: '#3b82f6', // 蓝色 - C相
    grid: 'rgba(255, 255, 255, 0.1)',
    axis: 'rgba(255, 255, 255, 0.3)',
    currentLine: 'rgba(255, 255, 255, 0.5)',
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸 (考虑高分屏)
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const width = rect.width;
    const height = rect.height;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 绘制区域参数
    const padding = { top: 40, right: 20, bottom: 40, left: 50 };
    const drawWidth = width - padding.left - padding.right;
    const drawHeight = height - padding.top - padding.bottom;
    const centerY = padding.top + drawHeight / 2;

    // 绘制网格
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    
    // 水平网格线
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (drawHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // 垂直网格线
    for (let i = 0; i <= 6; i++) {
      const x = padding.left + (drawWidth / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();
    }

    // 绘制坐标轴
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 2;
    
    // X轴
    ctx.beginPath();
    ctx.moveTo(padding.left, centerY);
    ctx.lineTo(width - padding.right, centerY);
    ctx.stroke();

    // Y轴
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();

    // 添加历史数据
    historyRef.current.push({ 
      time: currentTime, 
      currents: { ...currents } 
    });
    
    // 限制历史数据长度
    if (historyRef.current.length > maxHistory) {
      historyRef.current.shift();
    }

    // 绘制波形
    const drawWave = (phase: keyof PhaseCurrents, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const history = historyRef.current;
      if (history.length < 2) return;

      // 计算显示的时间范围 (显示约3个周期)
      const period = 1 / frequency;
      const displayDuration = period * 3;
      const endTime = currentTime;
      const startTime = endTime - displayDuration;

      for (let i = 0; i < history.length; i++) {
        const point = history[i];
        if (point.time < startTime) continue;

        // 计算x坐标 (时间映射到宽度)
        const timeRatio = (point.time - startTime) / displayDuration;
        const x = padding.left + timeRatio * drawWidth;

        // 计算y坐标 (电流值映射到高度)
        const current = point.currents[phase];
        const yRatio = (current + amplitude * 1.2) / (amplitude * 2.4);
        const y = padding.top + (1 - yRatio) * drawHeight;

        if (i === 0 || point.time <= startTime) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // 绘制当前点
      const lastPoint = history[history.length - 1];
      const timeRatio = 1; // 在最右侧
      const x = padding.left + timeRatio * drawWidth;
      const current = lastPoint.currents[phase];
      const yRatio = (current + amplitude * 1.2) / (amplitude * 2.4);
      const y = padding.top + (1 - yRatio) * drawHeight;

      // 点外圈
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();

      // 点内圈
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    // 绘制三相波形
    drawWave('a', colors.a);
    drawWave('b', colors.b);
    drawWave('c', colors.c);

    // 绘制当前时刻指示线
    ctx.strokeStyle = colors.currentLine;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width - padding.right, padding.top);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // 绘制标签
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'right';
    
    // Y轴标签
    ctx.fillText(`+${amplitude.toFixed(1)}`, padding.left - 10, padding.top + 5);
    ctx.fillText('0', padding.left - 10, centerY + 4);
    ctx.fillText(`-${amplitude.toFixed(1)}`, padding.left - 10, height - padding.bottom);

    // X轴标签
    ctx.textAlign = 'center';
    ctx.fillText('ωt', width - padding.right, height - 10);

  }, [currents, frequency, amplitude, currentTime]);

  useEffect(() => {
    draw();
  }, [draw]);

  // 窗口大小改变时重绘
  useEffect(() => {
    const handleResize = () => {
      draw();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  return (
    <div className="canvas-container" style={{ height: '280px' }}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
