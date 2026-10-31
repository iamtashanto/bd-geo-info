import { CopyButton } from '@/components/docs/copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = 'typescript', filename, showLineNumbers = false }: CodeBlockProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 my-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          {filename && (
            <span className="text-xs text-slate-400 ml-2">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 uppercase tracking-wider">{language}</span>
          <CopyButton text={code} />
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm text-slate-300 leading-relaxed">
          {showLineNumbers ? (
            <code>
              {code.split('\n').map((line, i) => (
                <span key={i} className="flex">
                  <span className="select-none w-8 shrink-0 text-right mr-4 text-slate-600 text-xs leading-6">
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </span>
              ))}
            </code>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
}

