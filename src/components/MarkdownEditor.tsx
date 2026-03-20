import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bold, Italic, Link, List, ListOrdered, Code, Quote, Eye, Edit3, Check } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = '开始编写 Markdown...',
  height = '400px',
}) => {
  const [isPreview, setIsPreview] = useState(false);

  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  }, [value, onChange]);

  const toolbarItems = [
    { icon: Bold, action: () => insertText('**', '**'), title: '粗体' },
    { icon: Italic, action: () => insertText('*', '*'), title: '斜体' },
    { icon: Link, action: () => insertText('[', '](url)'), title: '链接' },
    { icon: List, action: () => insertText('- '), title: '无序列表' },
    { icon: ListOrdered, action: () => insertText('1. '), title: '有序列表' },
    { icon: Code, action: () => insertText('```\n', '\n```'), title: '代码块' },
    { icon: Quote, action: () => insertText('> '), title: '引用' },
  ];

  return (
    <div className="card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-bg-secondary/50">
        <div className="flex items-center gap-1">
          {toolbarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              title={item.title}
            >
              <item.icon size={18} />
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-muted hover:text-white hover:bg-white/10 transition-colors"
        >
          {isPreview ? (
            <>
              <Edit3 size={16} />
              编辑
            </>
          ) : (
            <>
              <Eye size={16} />
              预览
            </>
          )}
        </button>
      </div>

      {/* Editor / Preview */}
      <div style={{ height }}>
        {isPreview ? (
          <div className="h-full p-4 overflow-auto prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-bg-secondary px-1.5 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {value || '无内容'}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            id="markdown-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 bg-transparent text-text-primary resize-none focus:outline-none font-mono text-sm leading-relaxed"
            style={{
              background: '#0a0a0f',
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-bg-secondary/30 text-xs text-text-muted">
        <span>支持 Markdown 语法</span>
        <span>{value.length} 字符</span>
      </div>
    </div>
  );
};

export default MarkdownEditor;