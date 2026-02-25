/**
 * 资源预览组件
 *
 * 支持多种类型学习资源的预览：
 * - 文档(PDF)
 * - Markdown文档
 * - 视频
 * - 网页
 * - 组件(MotorParameterCalculator等)
 *
 * @example
 * ```tsx
 * <ResourcePreview
 *   resource={selectedResource}
 *   isOpen={showPreview}
 *   onClose={() => setShowPreview(false)}
 * />
 * ```
 */

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MotorParameterCalculator from '../MotorParameterCalculator';
import type { LearningResource } from './types';

interface ResourcePreviewProps {
  /** 要预览的资源 */
  resource: LearningResource | null;
  /** 是否显示 */
  isOpen: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 容器类名 */
  className?: string;
}

/**
 * Markdown文档预览子组件
 */
function MarkdownPreview({ filePath }: { filePath: string }) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [filePath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[var(--text-secondary)]">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">加载失败: {error}</div>
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function ResourcePreview({
  resource,
  isOpen,
  onClose,
  className = ''
}: ResourcePreviewProps) {
  if (!isOpen || !resource) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}>
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] p-6 w-[80vw] max-w-[1000px] max-h-[90vh] overflow-y-auto">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] z-10"
        >
          <i className="fa-solid fa-times text-xl"></i>
        </button>

        {/* 资源标题 */}
        <div className="mb-4">
          <h3 className="text-xl font-medium text-[var(--text-primary)]">{resource.name}</h3>
        </div>

        {/* 资源基础信息 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <i className="fa-solid fa-tag text-[var(--text-secondary)] mr-2"></i>
              <span className="text-sm text-[var(--text-secondary)]">类型: {resource.type}</span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-clock text-[var(--text-secondary)] mr-2"></i>
              <span className="text-sm text-[var(--text-secondary)]">时长: {resource.duration}</span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-signal text-[var(--text-secondary)] mr-2"></i>
              <span className="text-sm text-[var(--text-secondary)]">难度: {resource.difficulty}</span>
            </div>
          </div>
        </div>

        {/* 资源描述 */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">资源介绍</h4>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Markdown文档预览 */}
        {resource.type === 'Markdown' && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">文档预览</h4>
            <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-y-auto p-6">
              <MarkdownPreview filePath={resource.url} />
            </div>
          </div>
        )}

        {/* 视频预览 */}
        {resource.type === '视频' && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">视频预览</h4>
            <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-hidden flex items-center justify-center">
              <video
                src={resource.url}
                className="w-full h-full object-contain"
                title={resource.name}
                controls
                controlsList="nodownload"
              >
                您的浏览器不支持视频播放。
              </video>
            </div>
          </div>
        )}

        {/* 网页预览 */}
        {resource.type === '网页' && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">网页预览</h4>
            <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-hidden">
              <iframe
                src={resource.url}
                className="w-full h-full"
                title={resource.name}
              />
            </div>
          </div>
        )}

        {/* 组件预览 */}
        {resource.type === '组件' && resource.url === 'MotorParameterCalculator' && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">组件预览</h4>
            <div className="h-[60vh] border border-[var(--text-secondary)]/30 rounded-[8px] overflow-auto">
              <MotorParameterCalculator />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
