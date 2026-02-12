import { useState } from 'react';

export default function MotorDiagnosticSimulator() {
  // 选中的故障
  const [selectedFault, setSelectedFault] = useState<string | null>(null);
  // 诊断步骤
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  // 诊断结果
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  // 故障列表
  const faults = [
    { 
      id: 'no_start', 
      name: '电机无法启动',
      symptoms: ['电源指示灯不亮', '电机无任何反应', '控制电路无电压'],
      causes: ['电源故障', '绕组断路', '控制电路故障', '过载保护动作'],
      solutions: ['检查电源连接', '测试绕组电阻', '检查控制电路', '复位过载保护器']
    },
    { 
      id: 'overheat', 
      name: '电机过热',
      symptoms: ['电机外壳温度高', '热保护器动作', '电机运行噪音大'],
      causes: ['过载运行', '通风不良', '轴承故障', '绕组短路'],
      solutions: ['减少负载', '改善通风', '更换轴承', '修复绕组']
    },
    { 
      id: 'noise', 
      name: '电机噪声异常',
      symptoms: ['轴承噪音', '电磁噪音', '机械摩擦声'],
      causes: ['轴承磨损', '气隙不均', '转子失衡', '紧固件松动'],
      solutions: ['更换轴承', '调整气隙', '转子动平衡', '紧固螺丝']
    },
    { 
      id: 'vibration', 
      name: '电机振动大',
      symptoms: ['电机剧烈振动', '安装基础振动', '运行不稳定'],
      causes: ['转子失衡', '轴承损坏', '安装不良', '联轴器不对中'],
      solutions: ['转子动平衡', '更换轴承', '加固基础', '调整联轴器']
    }
  ];

  // 诊断步骤
  const steps = [
    '选择故障类型',
    '观察故障症状',
    '分析可能原因',
    '制定诊断方案',
    '实施维修措施',
    '验证修复结果'
  ];

  // 开始诊断
  const startDiagnostic = (faultId: string) => {
    setSelectedFault(faultId);
    setDiagnosticStep(0);
    setDiagnosticResult(null);
  };

  // 下一步诊断
  const nextStep = () => {
    if (diagnosticStep < steps.length - 1) {
      setDiagnosticStep(prev => prev + 1);
    } else {
      // 完成诊断
      setDiagnosticResult('故障诊断完成，建议按照推荐方案进行维修');
    }
  };

  // 重置诊断
  const resetDiagnostic = () => {
    setSelectedFault(null);
    setDiagnosticStep(0);
    setDiagnosticResult(null);
  };

  // 当前选中的故障
  const currentFault = selectedFault ? faults.find(f => f.id === selectedFault) : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-4 text-[var(--text-primary)]">
        故障诊断模拟器
      </h3>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* 模拟器展示区域 */}
        <div className="md:w-2/3">
          <div className="bg-[var(--bg-primary)] rounded-lg h-64 flex flex-col p-4">
            {!selectedFault ? (
              <>
                {/* 故障选择界面 */}
                <h4 className="text-md font-medium mb-3 text-[var(--text-primary)]">
                  选择故障类型
                </h4>
                <div className="space-y-2">
                  {faults.map(fault => (
                    <button
                      key={fault.id}
                      className="w-full text-left p-3 bg-white border border-[var(--light-pink)] rounded-lg hover:bg-[var(--light-pink)]/30 transition-colors"
                      onClick={() => startDiagnostic(fault.id)}
                    >
                      <span className="text-[var(--text-primary)]">{fault.name}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* 诊断过程界面 */}
                <div className="mb-4">
                  <h4 className="text-md font-medium text-[var(--text-primary)] mb-2">
                    诊断步骤：{steps[diagnosticStep]}
                  </h4>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-[var(--brand-pink)] h-2.5 rounded-full"
                      style={{ width: `${((diagnosticStep + 1) / steps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {currentFault && (
                  <div className="flex-1 overflow-y-auto">
                    {diagnosticStep === 0 && (
                      <p className="text-[var(--text-secondary)]">
                        已选择故障：{currentFault.name}
                      </p>
                    )}
                    
                    {diagnosticStep === 1 && (
                      <>
                        <p className="text-[var(--text-primary)] font-medium mb-2">
                          故障症状：
                        </p>
                        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                          {currentFault.symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {diagnosticStep === 2 && (
                      <>
                        <p className="text-[var(--text-primary)] font-medium mb-2">
                          可能原因：
                        </p>
                        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                          {currentFault.causes.map((cause, index) => (
                            <li key={index}>{cause}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {diagnosticStep === 3 && (
                      <p className="text-[var(--text-secondary)]">
                        建议诊断方案：使用万用表测试绕组电阻，检查电源电压，观察运行状态
                      </p>
                    )}
                    
                    {diagnosticStep === 4 && (
                      <>
                        <p className="text-[var(--text-primary)] font-medium mb-2">
                          推荐解决方案：
                        </p>
                        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                          {currentFault.solutions.map((solution, index) => (
                            <li key={index}>{solution}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {diagnosticStep === 5 && (
                      <p className="text-[var(--text-secondary)]">
                        诊断完成！请按照推荐方案进行维修，并验证修复结果。
                      </p>
                    )}
                  </div>
                )}
                
                {diagnosticResult && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700">{diagnosticResult}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* 控制区域 */}
        <div className="md:w-1/3">
          <h4 className="font-medium mb-3 text-[var(--text-primary)]">
            模拟器控制
          </h4>
          
          {selectedFault ? (
            <>
              {/* 诊断控制按钮 */}
              <div className="space-y-3 mb-4">
                <button 
                  className="w-full px-4 py-2 bg-[var(--brand-pink)] text-white rounded-lg hover:bg-[var(--brand-pink)]/90 transition-colors"
                  onClick={nextStep}
                  disabled={diagnosticStep >= steps.length - 1}
                >
                  {diagnosticStep >= steps.length - 1 ? '诊断完成' : '下一步'}
                </button>
                
                <button 
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={resetDiagnostic}
                >
                  重置诊断
                </button>
              </div>
              
              {/* 故障信息 */}
              {currentFault && (
                <div className="bg-[var(--bg-primary)] rounded-lg p-3">
                  <h5 className="text-sm font-medium text-[var(--text-primary)] mb-2">
                    故障信息
                  </h5>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">
                    {currentFault.name}
                  </p>
                  <div className="text-xs text-[var(--text-secondary)]">
                    <p className="font-medium">症状：</p>
                    <p>{currentFault.symptoms[0]}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-[var(--bg-primary)] rounded-lg p-4">
              <p className="text-sm text-[var(--text-secondary)]">
                请从左侧选择一个故障类型开始诊断模拟
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
