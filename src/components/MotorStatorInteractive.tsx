import { useState } from 'react';

interface StatorComponent {
  id: string;
  name: string;
  description: string;
  position: string;
}

export default function MotorStatorInteractive() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>('frame');

  const statorComponents: StatorComponent[] = [
    {
      id: 'core',
      name: '定子铁芯',
      description: '由硅钢片叠压而成，导磁并降低涡流损耗',
      position: '位于定子最内层，直接与气隙接触'
    },
    {
      id: 'winding',
      name: '定子绕组',
      description: '由三相铜线绕制而成，通电后产生旋转磁场',
      position: '嵌入定子铁芯的槽中，按一定规律排列'
    },
    {
      id: 'slot',
      name: '槽与槽楔',
      description: '固定绕组，防止绕组松动',
      position: '定子铁芯上开有均匀分布的槽，槽内放置绕组，槽口用槽楔封固'
    },
    {
      id: 'frame',
      name: '机座',
      description: '支撑铁芯，兼作散热',
      position: '位于定子最外层，通常由铸铁或铸钢制成'
    },
    {
      id: 'endcap',
      name: '端盖与轴承',
      description: '保持定转子同心',
      position: '安装在机座两端，支撑转子转轴'
    },
    {
      id: 'cooling',
      name: '冷却测温',
      description: '风冷/水冷，埋有热敏电阻',
      position: '机座上设有散热片，内部可能有冷却通道'
    },
    {
      id: 'wiring',
      name: '出线与接地',
      description: 'IP67屏蔽接头，M6接地',
      position: '机座上设有出线盒，内部有接线端子'
    }
  ];

  return (
    <div className="bg-white border border-[var(--light-pink)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-md font-medium mb-4 text-[var(--text-primary)]">定子结构互动学习</h3>
      <p className="mb-4 text-[var(--text-secondary)]">点击下方组件，了解其详细信息：</p>
      
      <div className="flex gap-4">
        {/* 左侧：互动结构示意图 */}
        <div className="w-1/2">
          <div className="h-64 flex items-center justify-center">
            {/* 定子示意图 */}
            <div className="w-48 h-48 rounded-full border-8 border-[var(--brand-pink)] relative">
              {/* 机座 */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-[var(--text-primary)] cursor-pointer"
                onClick={() => setSelectedComponent('frame')}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--brand-pink)] text-white text-xs px-2 py-1 rounded">
                  机座
                </div>
              </div>
              
              {/* 铁芯 */}
              <div 
                className="absolute inset-4 rounded-full border-2 border-[var(--text-primary)] cursor-pointer"
                onClick={() => setSelectedComponent('core')}
              >
                <div className="absolute top-4 left-1/2 transform -translate-x-full -translate-y-1/2 bg-[var(--brand-pink)] text-white text-xs px-2 py-1 rounded z-10">
                    铁芯
                  </div>
              </div>
              
              {/* 绕组 */}
              <div 
                className="absolute inset-8 rounded-full border-2 border-dashed border-[var(--text-primary)] cursor-pointer"
                onClick={() => setSelectedComponent('winding')}
              >
                <div className="absolute top-8 left-1/2 transform -translate-x-full -translate-y-1/2 bg-[var(--brand-pink)] text-white text-xs px-2 py-1 rounded z-10">
                    绕组
                  </div>
              </div>
              
              {/* 槽与槽楔 */}
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div 
                  key={index}
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[${index*60}deg] w-2 h-10 bg-[var(--text-primary)] cursor-pointer"
                  onClick={() => setSelectedComponent('slot')}
                ></div>
              ))}
              
              {/* 端盖 */}
              <div 
                className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-24 bg-[var(--text-primary)] rounded-l-md cursor-pointer"
                onClick={() => setSelectedComponent('endcap')}
              >
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--brand-pink)] text-white text-xs px-2 py-1 rounded">
                  端盖
                </div>
              </div>
              
              <div 
                className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-24 bg-[var(--text-primary)] rounded-r-md cursor-pointer"
                onClick={() => setSelectedComponent('endcap')}
              ></div>
              
              {/* 冷却测温 */}
              <div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-2 bg-[var(--text-primary)] cursor-pointer"
                onClick={() => setSelectedComponent('cooling')}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-[var(--brand-pink)] text-white text-xs px-2 py-1 rounded">
                  冷却
                </div>
              </div>
              
              {/* 出线与接地 */}
              <div 
                className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-8 h-8 bg-[var(--brand-pink)] rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedComponent('wiring')}
              >
                <span className="text-white text-xs">出线</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧：组件信息 */}
        <div className="w-1/2">
          {selectedComponent && (
            <div className="bg-[var(--bg-primary)] rounded-lg p-6 border border-[var(--light-pink)] h-full">
              <h4 className="text-md font-medium mb-3 text-[var(--text-primary)]">
                {statorComponents.find(c => c.id === selectedComponent)?.name}
              </h4>
              <p className="mb-3 text-[var(--text-secondary)]">
                <strong>描述：</strong>{statorComponents.find(c => c.id === selectedComponent)?.description}
              </p>
              <p className="text-[var(--text-secondary)]">
                <strong>位置：</strong>{statorComponents.find(c => c.id === selectedComponent)?.position}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
