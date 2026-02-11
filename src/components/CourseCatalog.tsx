import { useState } from 'react';
import { cn } from '@/lib/utils';

// 课程目录数据结构
interface CourseItem {
  id: string;
  title: string;
  items?: {
    id: string;
    title: string;
    subItems?: {
      id: string;
      title: string;
      isActive?: boolean;
    }[];
  }[];
}

export default function CourseCatalog() {
  // 目录数据
  const [catalog] = useState<CourseItem[]>([
    {
      id: 'project-7',
      title: '项目七 电动汽车制动系统维护',
      items: [
        { id: 'task-7-1', title: '任务一 认识电动汽车制动系统' },
        { id: 'task-7-2', title: '任务二 制动能量回收系统故障诊断与...' },
        {
          id: 'task-7-3',
          title: '任务三 交流异步电机拆卸',
          subItems: [
            { id: 'theory-7-3', title: '理论学习' },
            { id: 'training-7-3', title: '实训指导', isActive: true },
          ],
        },
      ],
    },
    {
      id: 'project-10',
      title: '项目十 电动汽车充电系统的构造与维修',
      items: [
        { id: 'task-10-1', title: '任务一 充电系统基础认知' },
        { id: 'task-10-2', title: '任务二 直流充电系统原理与故障诊断' },
        { id: 'task-10-3', title: '任务三 交流充电系统原理与故障诊断' },
      ],
    },
  ]);

  // 展开/折叠状态
  const [expandedProjects, setExpandedProjects] = useState<string[]>(['project-7', 'project-10']);
  const [expandedTasks, setExpandedTasks] = useState<string[]>(['task-7-1', 'task-7-2', 'task-7-3', 'task-10-1', 'task-10-2', 'task-10-3']);

  // 切换项目展开/折叠
  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  // 切换任务展开/折叠
  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  return (
    <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-4 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">课程目录</h3>
      
      <div className="space-y-2">
        {catalog.map((project) => (
          <div key={project.id} className="space-y-1">
            <button
              onClick={() => toggleProject(project.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--light-pink)]/30 transition-colors text-left"
            >
              <span className="text-[var(--text-primary)]">{project.title}</span>
              <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedProjects.includes(project.id) ? 'transform rotate-180' : ''}`}></i>
            </button>
            
            {expandedProjects.includes(project.id) && project.items && (
              <div className="ml-5 space-y-1">
                {project.items.map((task) => (
                  <div key={task.id} className="space-y-1">
                    {task.subItems ? (
                      <>
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--light-pink)]/30 transition-colors text-left"
                        >
                          <span className="text-[var(--text-primary)]">{task.title}</span>
                          <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${expandedTasks.includes(task.id) ? 'transform rotate-180' : ''}`}></i>
                        </button>
                        
                        {expandedTasks.includes(task.id) && task.subItems && (
                          <div className="ml-5 space-y-1">
                            {task.subItems.map((subItem) => (
                              <button
                                key={subItem.id}
                                className={cn(
                                  'w-full px-3 py-2 rounded-lg transition-colors text-left',
                                  subItem.isActive
                                    ? 'bg-[var(--brand-pink)]/10 text-[var(--brand-pink)] font-medium'
                                    : 'hover:bg-[var(--light-pink)]/30 text-[var(--text-primary)]'
                                )}
                              >
                                {subItem.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        className="w-full px-3 py-2 rounded-lg hover:bg-[var(--light-pink)]/30 transition-colors text-left text-[var(--text-primary)]"
                      >
                        {task.title}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}