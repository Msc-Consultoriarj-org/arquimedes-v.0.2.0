import { useState } from "react";
import { Play, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { extractYouTubeId } from "@/lib/youtube";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

/**
 * Componente reutilizável para embed de vídeos do YouTube
 * 
 * @param videoId - ID do vídeo do YouTube (ex: "dQw4w9WgXcQ")
 * @param title - Título do vídeo (opcional, para acessibilidade)
 * @param autoplay - Se deve iniciar automaticamente (padrão: false)
 * @param loop - Se deve repetir em loop (padrão: false)
 * @param className - Classes CSS adicionais
 * 
 * @example
 * <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Aula de Adição" />
 */
export function YouTubeEmbed({
  videoId,
  title = "Vídeo educacional",
  autoplay = false,
  loop = false,
  className = "",
}: YouTubeEmbedProps) {
  const resolvedVideoId = extractYouTubeId(videoId);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isInvalidVideo = !resolvedVideoId;

  // Construir URL do embed com parâmetros
  const embedUrl = resolvedVideoId
    ? `https://www.youtube.com/embed/${resolvedVideoId}?${new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    loop: loop ? "1" : "0",
    playlist: loop ? resolvedVideoId : "", // Necessário para loop funcionar
    rel: "0", // Não mostrar vídeos relacionados
    modestbranding: "1", // Logo menor do YouTube
  }).toString()}`
    : "";

  // URL da thumbnail do vídeo
  const thumbnailUrl = resolvedVideoId
    ? `https://img.youtube.com/vi/${resolvedVideoId}/maxresdefault.jpg`
    : "";

  // URL para abrir no app YouTube
  const youtubeAppUrl = resolvedVideoId ? `https://www.youtube.com/watch?v=${resolvedVideoId}` : "";

  // Função para abrir vídeo no YouTube (app ou navegador)
  const openInYouTube = () => {
    if (!youtubeAppUrl) return;
    window.open(youtubeAppUrl, '_blank');
  };

  // Detectar erro de carregamento do iframe
  const handleIframeError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Container responsivo 16:9 */}
      <div className="relative w-full pb-[56.25%] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        {!isLoaded && !hasError && !isInvalidVideo && (
          <>
            {/* Thumbnail de preview */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setHasError(true)}
            />
            
            {/* Overlay com botão de play */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors">
              <button
                onClick={() => setIsLoaded(true)}
                className="group flex items-center justify-center w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full shadow-xl transition-all hover:scale-110"
                aria-label="Reproduzir vídeo"
              >
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              </button>
            </div>

            {/* Badge "Vídeo Educacional" */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg">
              📺 Vídeo Educacional
            </div>
          </>
        )}

        {/* iFrame do YouTube (carregado apenas quando usuário clicar) */}
        {isLoaded && !hasError && !isInvalidVideo && (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            onError={handleIframeError}
          />
        )}

        {/* Fallback: Erro ao carregar vídeo */}
        {(hasError || isInvalidVideo) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
            <p className="text-white font-semibold text-lg mb-2">
              Não foi possível carregar o vídeo
            </p>
            <p className="text-gray-400 text-sm max-w-md mb-6">
              {isInvalidVideo
                ? "ID ou link de vídeo inválido."
                : "O vídeo pode estar indisponível ou sua conexão pode estar instável. Tente abrir diretamente no YouTube."}
            </p>
            <Button
              onClick={openInYouTube}
              variant="default"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Abrir no YouTube
            </Button>
          </div>
        )}
      </div>

      {/* Título do vídeo (opcional) */}
      {title && (
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {title}
          </p>
          {!hasError && (
            <button
              onClick={openInYouTube}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Ver no YouTube
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Placeholder para vídeo que ainda não foi adicionado
 * Usado durante desenvolvimento para indicar onde o vídeo será inserido
 */
export function YouTubePlaceholder({ title }: { title: string }) {
  return (
    <div className="relative w-full">
      <div className="relative w-full pb-[56.25%] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg border-2 border-dashed border-gray-600">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <Play className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-white font-semibold text-lg mb-2">
            Vídeo em Breve
          </p>
          <p className="text-gray-400 text-sm max-w-md">
            {title}
          </p>
          <div className="mt-4 px-4 py-2 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
            📹 Conteúdo em Produção
          </div>
        </div>
      </div>
    </div>
  );
}
