import { useState, memo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Step {
  id: string;
  text: string;
  order: number;
  colorIndex: number;
}

interface DragItem {
  id: string;
  index: number;
}

const COLORS = [
  { primary: 'bg-blue-500', secondary: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700' },
  { primary: 'bg-green-500', secondary: 'bg-green-50', border: 'border-green-300', text: 'text-green-700' },
  { primary: 'bg-purple-500', secondary: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700' },
  { primary: 'bg-orange-500', secondary: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700' },
  { primary: 'bg-pink-500', secondary: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-700' }
];

const DraggableStepComponent = ({ step, index, onMove, isHovering, isDragging, onDragEnd }: { step: Step; index: number; onMove: (dragIndex: number, hoverIndex: number) => void; isHovering: boolean; isDragging: boolean; onDragEnd: () => void }) => {
  const color = COLORS[step.colorIndex % COLORS.length];
  
  const [{ opacity }, drag] = useDrag({
    type: 'STEP',
    item: { id: step.id, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.7 : 1,
    }),
    end: () => {
      onDragEnd();
    }
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'STEP',
    hover: (draggedItem: DragItem) => {
      if (draggedItem.index !== index) {
        onMove(draggedItem.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-3 bg-white rounded-lg border ${color.border} cursor-move transition-all duration-300 hover:shadow-md ${isHovering || isOver ? 'shadow-lg scale-102' : ''}`}
      style={{ opacity }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-2 h-10 ${color.primary} rounded-full`}></div>
        <span className={`w-8 h-8 rounded-full ${color.secondary} ${color.text} flex items-center justify-center font-medium text-sm`}>
          {index + 1}
        </span>
        <span className="text-gray-700 flex-1 font-medium">{step.text}</span>
        <i className={`fa-solid fa-grip-vertical ${color.text} opacity-70`}></i>
      </div>
    </div>
  );
};

const DraggableStep = memo(DraggableStepComponent);

interface InsertionPointProps {
  index: number;
  isActive: boolean;
}

const InsertionPoint = ({ index, isActive }: InsertionPointProps) => {
  return (
    <div className={`h-1 my-1 transition-all duration-300 ${isActive ? 'bg-blue-500 rounded-full' : 'bg-transparent'}`}>
      {isActive && (
        <div className="flex justify-center -mt-2">
          <div className="w-3 h-3 border-2 border-blue-500 bg-white rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default function MotorDismantlingQuiz() {
  const correctOrder = [
    '断开电源并确保电机完全停止',
    '拆卸电机接线盒盖板并记录接线相序',
    '拆卸电机速度编码器',
    '拆卸轴承底座与后端盖',
    '取出转子并检查部件状况'
  ];

  const [userOrder, setUserOrder] = useState<Step[]>(correctOrder.map((text, index) => ({
    id: `step-${index}`,
    text,
    order: index,
    colorIndex: index
  })).sort(() => Math.random() - 0.5));

  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [insertionPoint, setInsertionPoint] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    if (dragIndex === hoverIndex) return;
    
    setDraggedIndex(dragIndex);
    
    // 计算插入点位置
    if (dragIndex < hoverIndex) {
      // 从上方拖到下方，插入到hoverIndex之后
      setInsertionPoint(hoverIndex + 1);
    } else {
      // 从下方拖到上方，插入到hoverIndex之前
      setInsertionPoint(hoverIndex);
    }
    
    setHoverIndex(hoverIndex);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && insertionPoint !== null && insertionPoint !== draggedIndex) {
      // 创建新数组，避免直接修改原数组
      const newOrder = [...userOrder];
      // 移除拖拽项
      const [draggedItem] = newOrder.splice(draggedIndex, 1);
      // 插入到新位置
      const insertPos = insertionPoint > draggedIndex ? insertionPoint - 1 : insertionPoint;
      newOrder.splice(insertPos, 0, draggedItem);
      // 更新状态
      setUserOrder(newOrder);
    }
    
    // 重置拖拽状态
    setHoverIndex(null);
    setInsertionPoint(null);
    setDraggedIndex(null);
  };

  const checkAnswer = () => {
    const userAnswers = userOrder.map(step => step.text);
    const isAllCorrect = userAnswers.every((answer, index) => answer === correctOrder[index]);
    setIsCorrect(isAllCorrect);
    setHasChecked(true);
    setIsCompleted(true);
  };

  const resetQuiz = () => {
    setUserOrder(correctOrder.map((text, index) => ({
      id: `step-${index}`,
      text,
      order: index,
      colorIndex: index
    })).sort(() => Math.random() - 0.5));
    setHasChecked(false);
    setIsCorrect(false);
    setHoverIndex(null);
    setInsertionPoint(null);
    setIsCompleted(false);
    setDraggedIndex(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-blue-700 flex items-center">
            <i className="fa-solid fa-wrench mr-3 text-2xl text-blue-600"></i>
            交流异步电机拆卸步骤排序
          </h3>
          <div className="flex gap-2">
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 border border-blue-200"
            >
              <i className="fa-solid fa-rotate-right text-blue-600"></i>
              重置
            </button>
            <button
              onClick={checkAnswer}
              disabled={hasChecked}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fa-solid fa-check"></i>
              检查答案
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <h4 className="font-medium mb-4 text-blue-700 flex items-center">
              <i className="fa-solid fa-hand-pointer mr-2 text-blue-600"></i>
              拖拽排序
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              请将以下步骤按照正确的拆卸顺序进行排列（拖拽步骤卡片调整顺序）
            </p>
            <div className="space-y-0">
              {userOrder.map((step, index) => (
                <>
                  {/* 插入点 */}
                  {insertionPoint === index && (
                    <InsertionPoint index={index} isActive={true} />
                  )}
                  <DraggableStep
                    key={step.id}
                    step={step}
                    index={index}
                    onMove={handleMove}
                    isHovering={hoverIndex === index}
                    isDragging={draggedIndex === index}
                    onDragEnd={handleDragEnd}
                  />
                </>
              ))}
              {/* 最后一个插入点 */}
              {insertionPoint === userOrder.length && (
                <InsertionPoint index={userOrder.length} isActive={true} />
              )}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h4 className="font-medium mb-4 text-blue-700 flex items-center">
              <i className="fa-solid fa-circle-info mr-2 text-blue-600"></i>
              操作提示
            </h4>

            {!isCompleted ? (
              <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fa-solid fa-lightbulb text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">拖拽提示</p>
                    <p className="text-gray-600 text-sm">拖动步骤卡片到正确位置，松开鼠标即可完成排序</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-100">
                  <h5 className="text-sm font-medium text-blue-700 mb-3">操作步骤：</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="fa-solid fa-angle-right text-blue-600 mt-1"></i>
                      <span>点击并拖动任意步骤卡片</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fa-solid fa-angle-right text-blue-600 mt-1"></i>
                      <span>将卡片移动到目标位置（高亮显示）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fa-solid fa-angle-right text-blue-600 mt-1"></i>
                      <span>松开鼠标完成排序</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fa-solid fa-angle-right text-blue-600 mt-1"></i>
                      <span>点击"检查答案"按钮验证排序结果</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    <i className={`fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'} text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}></i>
                  </div>
                  <div>
                    <p className={`text-lg font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? '回答正确！' : '回答错误'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {isCorrect ? '你已经掌握了正确的拆卸步骤' : '请查看正确答案并重新尝试'}
                    </p>
                  </div>
                </div>

                {!isCorrect && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-blue-700 mb-3">正确顺序：</h5>
                    <div className="space-y-2">
                      {correctOrder.map((stepText, index) => {
                        // 找到对应步骤的colorIndex
                        const colorIndex = index;
                        const color = COLORS[colorIndex % COLORS.length];
                        return (
                          <div key={index} className="flex items-start gap-3 text-sm">
                            <div className={`w-2 h-8 ${color.primary} rounded-full mt-1`}></div>
                            <span className={`w-6 h-6 rounded-full ${color.secondary} ${color.text} flex items-center justify-center font-medium text-xs flex-shrink-0`}>
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{stepText}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}