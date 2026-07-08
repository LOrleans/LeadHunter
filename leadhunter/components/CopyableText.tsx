'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function CopyableText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="flex items-center gap-2 group">
      <span className="dark:text-zinc-300">{text}</span>
      <button 
        onClick={handleCopy}
        className="p-1.5 rounded-md text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Copiar para a área de transferência"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
      {copied && (
        <span className="absolute -mt-8 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded shadow-sm animate-in fade-in zoom-in duration-200">
          Copiado!
        </span>
      )}
    </div>
  );
}
