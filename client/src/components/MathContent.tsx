import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathContentProps {
  content: string;
  className?: string;
}

/**
 * Component to render mathematical content with LaTeX support
 * Converts inline $...$ and display $$...$$ math to rendered equations
 */
export function MathContent({ content, className = "" }: MathContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !content) return;

    // Process the content to render LaTeX
    const processedContent = renderMathInText(content);
    containerRef.current.innerHTML = processedContent;
  }, [content]);

  return (
    <div 
      ref={containerRef} 
      className={`math-content ${className}`}
    />
  );
}

/**
 * Process text content and render LaTeX expressions
 */
function renderMathInText(text: string): string {
  if (!text) return "";

  // Convert markdown-style formatting
  let processed = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
    .replace(/\n\n/g, "</p><p>"); // Paragraphs

  // Wrap in paragraph tags if not already
  if (!processed.startsWith("<p>")) {
    processed = `<p>${processed}</p>`;
  }

  // Process display math ($$...$$)
  processed = processed.replace(/\$\$(.*?)\$\$/g, (match, math) => {
    try {
      return `<div class="my-4 overflow-x-auto">${katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      })}</div>`;
    } catch (e) {
      console.error("KaTeX display math error:", e);
      return match;
    }
  });

  // Process inline math ($...$)
  processed = processed.replace(/\$(.*?)\$/g, (match, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch (e) {
      console.error("KaTeX inline math error:", e);
      return match;
    }
  });

  return processed;
}
