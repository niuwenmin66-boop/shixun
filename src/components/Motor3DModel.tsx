import { useState } from 'react';

export default function Motor3DModel() {
  // 模型旋转状态
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  // 模型缩放状态
  const [scale, setScale] = useState(1);
  // 选中的部件
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // 处理鼠标拖动旋转
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startRotation = { ...rotation };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setRotation({
        x: startRotation.x + deltaY * 0.5,
        y: startRotation.y + deltaX * 0.5
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // 处理滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.max(0.5, Math.min(2, prev * delta)));
  };

  // 部件列表
  const parts = [
    { id: 'stator', name: '定子', color: '#4CAF50' },
    { id: 'rotor', name: '转子', color: '#2196F3' },
    { id: 'windings', name: '绕组', color: '#FF9800' },
    { id: 'bearings', name: '轴承', color: '#9C27B0' },
    { id: 'shaft', name: '转轴', color: '#607D8B' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-4 text-[var(--text-primary)]">
        电机结构3D模型
      </h3>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* 3D模型展示区域 */}
        <div className="md:w-2/3">
          <div 
            className="bg-[var(--bg-primary)] rounded-lg h-64 flex items-center justify-center relative cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          >
            {/* 3D模型占位 */}
            <div 
              className="relative w-48 h-48"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* 电机外壳 */}
              <div className="absolute inset-0 border-4 border-gray-300 rounded-full bg-gray-100 flex items-center justify-center">
                {/* 定子 */}
                <div className="w-36 h-36 border-4 border-[#4CAF50] rounded-full bg-green-50 flex items-center justify-center">
                  {/* 转子 */}
                  <div className="w-24 h-24 border-4 border-[#2196F3] rounded-full bg-blue-50 flex items-center justify-center">
                    {/* 转轴 */}
                    <div className="w-4 h-48 bg-[#607D8B] rounded-full absolute transform -translate-y-12"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 控制提示 */}
            <div className="absolute bottom-4 left-4 text-xs text-[var(--text-secondary)]">
              <p>拖动：旋转模型 | 滚轮：缩放模型</p>
            </div>
          </div>
        </div>
        
        {/* 部件控制区域 */}
        <div className="md:w-1/3">
          <h4 className="font-medium mb-3 text-[var(--text-primary)]">
            部件控制
          </h4>
          <div className="space-y-2">
            {parts.map(part => (
              <div 
                key={part.id}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${selectedPart === part.id ? 'bg-[var(--brand-pink)]/10' : 'hover:bg-[var(--light-pink)]/30'}`}
                onClick={() => setSelectedPart(part.id)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: part.color }}
                  ></div>
                  <span className="text-sm text-[var(--text-primary)]">{part.name}</span>
                </div>
                {selectedPart === part.id && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1 ml-5">
                    {part.id === 'stator' && '定子是电机的静止部分，包含铁芯和绕组'}
                    {part.id === 'rotor' && '转子是电机的旋转部分，在旋转磁场作用下转动'}
                    {part.id === 'windings' && '绕组是通电流产生磁场的线圈'}
                    {part.id === 'bearings' && '轴承支撑转子并减少摩擦'}
                    {part.id === 'shaft' && '转轴传递转子的转矩'}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          {/* 操作按钮 */}
          <div className="mt-4 flex gap-2">
            <button 
              className="flex-1 px-3 py-1 bg-[var(--brand-pink)]/10 text-[var(--brand-pink)] rounded-lg text-sm hover:bg-[var(--brand-pink)]/20 transition-colors"
              onClick={() => setRotation({ x: 0, y: 0 })}
            >
              重置视角
            </button>
            <button 
              className="flex-1 px-3 py-1 bg-[var(--brand-pink)]/10 text-[var(--brand-pink)] rounded-lg text-sm hover:bg-[var(--brand-pink)]/20 transition-colors"
              onClick={() => setScale(1)}
            >
              重置缩放
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
