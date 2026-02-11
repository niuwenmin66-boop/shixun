import { useState, useRef, useEffect } from 'react';

export default function AIAssistant({ selectedText: propSelectedText }: { selectedText?: string }) {
  // 消息状态
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string, type?: 'text' | 'image', imageUrl?: string}>>([
    { role: 'assistant', content: '你好！我是你的AI实训小助手，有什么可以帮助你的吗？', type: 'text' }
  ]);
  
  // 输入框内容
  const [inputMessage, setInputMessage] = useState('');
  
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  
  // 文件输入引用
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 待发送的图片
  const [pendingImage, setPendingImage] = useState<{file: File, url: string} | null>(null);
  
  // 监听选中文字变化
  useEffect(() => {
    if (propSelectedText) {
      setInputMessage(`关于"${propSelectedText}"，`);
    }
  }, [propSelectedText]);
  
  // 消息容器引用，用于自动滚动到底部
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const sendMessage = async () => {
    if ((!inputMessage.trim() && !pendingImage) || isLoading) return;

    // 添加用户消息
    let newMessages = [...messages];
    
    // 处理文本消息
    if (inputMessage.trim()) {
      newMessages = [...newMessages, { role: 'user', content: inputMessage, type: 'text' }];
    }
    
    // 处理图片消息
    if (pendingImage) {
      newMessages = [...newMessages, { 
        role: 'user', 
        content: '上传了一张图片', 
        type: 'image', 
        imageUrl: pendingImage.url 
      }];
    }
    
    setMessages(newMessages);
    setInputMessage('');
    setPendingImage(null);
    setIsLoading(true);

    try {
      // 准备API请求数据
      const requestData = {
        model: "kimi-k2-0905-preview",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant."
          },
          ...newMessages
        ],
        temperature: 0.6,
        max_tokens: 32768,
        top_p: 1,
        stream: true
      };

      // 发送API请求
      const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-4eO2ekEo0bZbimbr9OreFy1F1W79bvWXuKycc1suiqnpB5yF'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.statusText}`);
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法获取响应流');
      }

      let aiResponseContent = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // 处理SSE格式的响应
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const json = JSON.parse(data);
              if (json.choices && json.choices[0]?.delta?.content) {
                aiResponseContent += json.choices[0].delta.content;
                // 更新消息状态
                setMessages([...newMessages, { role: 'assistant', content: aiResponseContent }]);
              }
            } catch (e) {
              console.error('解析响应数据失败:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('调用AI API失败:', error);
      // 添加错误消息
      const errorMessage = {
        role: 'assistant',
        content: `抱歉，我暂时无法回答你的问题。错误信息：${error instanceof Error ? error.message : '未知错误'}`
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // 打开文件选择
  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };
  
  // 处理粘贴事件
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const file = item.getAsFile();
        if (file) {
          handleImageUpload(file);
        }
      }
    }
  };
  
  // 处理图片上传
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      // 存储待发送的图片
      setPendingImage({ file, url: imageUrl });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(255,143,163,0.12)] flex flex-col h-full">
      {/* 头部 */}
      <div className="p-4 border-b border-[var(--light-pink)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center">
          <i className="fa-solid fa-robot text-[var(--brand-pink)] mr-2"></i>
          AI实训小助手
        </h3>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'image' && message.imageUrl ? (
              <div 
                className={`max-w-[80%] p-2 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-[var(--brand-pink)]/10 rounded-tr-none' 
                    : 'bg-[var(--bg-primary)] rounded-tl-none border border-[var(--light-pink)]'
                }`}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={message.imageUrl} 
                    alt="上传的图片" 
                    className="w-full h-auto max-h-64 object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                    {message.content}
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-[var(--brand-pink)] text-white rounded-tr-none' 
                    : 'bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-tl-none border border-[var(--light-pink)]'
                }`}
              >
                <p>{message.content}</p>
              </div>
            )}
          </div>
        ))}
        
        {/* 加载状态 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-tl-none border border-[var(--light-pink)]">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-[var(--brand-pink)] animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 rounded-full bg-[var(--brand-pink)] animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 rounded-full bg-[var(--brand-pink)] animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="p-4 border-t border-[var(--light-pink)]">
        {/* 待发送的图片 */}
        {pendingImage && (
          <div className="flex items-center justify-between mb-3 p-3 bg-[var(--bg-primary)] rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img 
                  src={pendingImage.url} 
                  alt="待发送图片" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">待发送图片</p>
                <p className="text-xs text-[var(--text-secondary)]">{pendingImage.file.name}</p>
              </div>
            </div>
            <button
              onClick={() => setPendingImage(null)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
        )}
        
        <div className="flex space-x-2">
          {/* 图片上传按钮 */}
          <button
            onClick={handleOpenFileDialog}
            className="px-3 py-2 rounded-full bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <i className="fa-solid fa-image"></i>
          </button>
          
          {/* 隐藏的文件输入 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
          
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            placeholder="请输入你的问题..."
            rows={1}
            maxLength={500}
            className="flex-1 px-4 py-2 rounded-full border border-[var(--light-pink)] focus:outline-none focus:border-[var(--brand-pink)] resize-none overflow-y-auto"
            style={{ maxHeight: '3.5rem' }}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-full bg-[var(--brand-pink)] text-white hover:bg-[var(--brand-pink)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || (!inputMessage.trim() && !pendingImage)}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}