import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Card } from './ui/card';
import { YouTubeEmbed } from './YouTubeEmbed';
import { extractYouTubeId } from '@/lib/youtube';

interface MathContentProps {
  content: string;
  className?: string;
  videoUrl?: string | null;
  videoTitle?: string;
}

export function MathContent({ content, className = "", videoUrl, videoTitle }: MathContentProps) {
  if (!content) return null;

  // Converter separadores ; em quebras de linha Markdown
  let cleanContent = content
    .replace(/;\s*/g, '\n\n') // Substituir ; por quebras de linha duplas
    .replace(/\n{3,}/g, '\n\n') // Remover quebras excessivas
    .replace(/<ExerciseCard[\s\S]*?\/>/g, ''); // Remover ExerciseCard tags

  // Dividir conteúdo em partes (antes e depois do vídeo)
  const videoPlaceholderMatch = cleanContent.match(/<YouTubeEmbed([^>]*)\/>/);
  const placeholderVideoId = extractAttribute(videoPlaceholderMatch?.[1], 'videoId');
  const placeholderVideoTitle = extractAttribute(videoPlaceholderMatch?.[1], 'title');

  const embedVideoId = extractYouTubeId(placeholderVideoId || videoUrl);
  const embedVideoTitle = placeholderVideoTitle || videoTitle;

  const hasVideoPlaceholder = /<YouTubeEmbed[\s\S]*?\/>/.test(cleanContent) && !!embedVideoId;
  let contentParts: string[] = [];

  if (hasVideoPlaceholder && embedVideoId) {
    contentParts = cleanContent.split(/<YouTubeEmbed[\s\S]*?\/>/);
  } else {
    contentParts = [cleanContent];
  }
  
  const processedParts = contentParts.map(part => processLatex(part));

  return (
    <div className={`math-content prose prose-lg max-w-none ${className}`}>
      {/* Primeira parte do conteúdo */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {processedParts[0]}
      </ReactMarkdown>
      
      {/* Vídeo integrado naturalmente */}
      {hasVideoPlaceholder && embedVideoId && (
        <div className="my-8">
          <YouTubeEmbed
            videoId={embedVideoId}
            title={embedVideoTitle || "Vídeo Educacional"}
          />
        </div>
      )}
      
      {/* Segunda parte do conteúdo (se existir) */}
      {processedParts[1] && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={markdownComponents}
        >
          {processedParts[1]}
        </ReactMarkdown>
      )}
    </div>
  );
}

const markdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-3xl font-bold text-blue-900 mt-8 mb-4 border-b-2 border-blue-200 pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-semibold text-blue-700 mt-5 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="text-gray-700 leading-relaxed mb-4 text-base">
      {children}
    </p>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline font-medium"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ children }: any) => (
    <strong className="font-bold text-blue-900">
      {children}
    </strong>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside space-y-2 my-4 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside space-y-2 my-4 ml-4">
      {children}
    </ol>
  ),
  blockquote: ({ children }: any) => (
    <Card className="my-4 border-l-4 border-blue-500 bg-blue-50 p-4">
      <div className="text-gray-800 italic">
        {children}
      </div>
    </Card>
  ),
};

function processLatex(text: string): string {
  if (!text) return "";
  let processed = text;
  
  // Proteger R$ (moeda brasileira) antes de processar LaTeX
  processed = processed.replace(/R\$/g, 'R__DOLLAR__');
  
  // Processar LaTeX display mode ($$...$$)
  processed = processed.replace(/\$\$(.*?)\$\$/g, (match, math) => {
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      return `<div class="my-4 overflow-x-auto flex justify-center">${rendered}</div>`;
    } catch (e) {
      return match;
    }
  });
  processed = processed.replace(/\$(.*?)\$/g, (match, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch (e) {
      return match;
    }
  });
  
  // Restaurar R$ (moeda brasileira) após processar LaTeX
  processed = processed.replace(/R__DOLLAR__/g, 'R$');
  
  return processed;
}

function extractAttribute(attrs?: string | null, key?: string | null) {
  if (!attrs || !key) return null;
  const match = attrs.match(new RegExp(`${key}="([^"]+)"`));
  return match?.[1] || null;
}
