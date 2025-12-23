import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Play, Clock, BookOpen, Eye, Trophy } from "lucide-react";

export default function VideoRoomPage() {
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());

  // Queries
  const { data: disciplines } = trpc.disciplines.list.useQuery();
  const aritmeticaId = disciplines?.find((d) => d.slug === "aritmetica")?.id;
  
  const { data: modules } = trpc.modules.listByDiscipline.useQuery(
    { disciplineId: aritmeticaId! },
    { enabled: !!aritmeticaId }
  );
  
  const { data: allVideos } = trpc.standaloneVideos.getAll.useQuery();
  const { data: stats } = trpc.standaloneVideos.getStats.useQuery();

  // Mutations
  const markWatchedMutation = trpc.standaloneVideos.markWatched.useMutation({
    onSuccess: (_, variables) => {
      setWatchedVideos((prev) => new Set([...Array.from(prev), variables.videoId]));
      
      // Refetch stats after marking as watched
      setTimeout(() => {
        trpc.useUtils().standaloneVideos.getStats.invalidate();
      }, 500);
    },
  });

  // Group videos by module
  const videosByModule = modules?.map((module) => ({
    module,
    videos: allVideos?.filter((v) => v.moduleId === module.id) || [],
  })) || [];

  const handleMarkWatched = (videoId: number) => {
    if (watchedVideos.has(videoId)) {
      alert("Você já assistiu este vídeo!");
      return;
    }
    markWatchedMutation.mutate({ videoId });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sala de Vídeos</h1>
          <p className="text-lg text-gray-600">
            Aprenda com vídeos educacionais em português organizados por módulo
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Vídeos Assistidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">{stats.totalWatched}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Pontos Ganhos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">{stats.totalWatched * 3}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modules Tabs */}
        {modules && modules.length > 0 ? (
          <Tabs defaultValue={modules[0]?.id.toString()} className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-2 bg-white p-2 rounded-lg shadow-sm">
              {modules.map((module) => {
                const videoCount = allVideos?.filter((v) => v.moduleId === module.id).length || 0;
                return (
                  <TabsTrigger
                    key={module.id}
                    value={module.id.toString()}
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    <BookOpen className="h-4 w-4" />
                    {module.name}
                    <span className="ml-1 text-xs opacity-75">({videoCount})</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {videosByModule.map(({ module, videos }) => (
              <TabsContent key={module.id} value={module.id.toString()} className="mt-6">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-2xl">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {videos.length} vídeo{videos.length !== 1 ? "s" : ""} disponível
                      {videos.length !== 1 ? "is" : ""} em português
                    </p>
                  </CardContent>
                </Card>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.length > 0 ? (
                    videos.map((video) => {
                      const isWatched = watchedVideos.has(video.id);

                      return (
                        <Card
                          key={video.id}
                          className={`transition-all hover:shadow-lg ${
                            isWatched ? "border-green-500 bg-green-50" : ""
                          }`}
                        >
                          <CardHeader className="p-0">
                            <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                              <img
                                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                                <Play className="h-12 w-12 text-white" />
                              </div>
                              {isWatched && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Assistido
                                </div>
                              )}
                            </div>
                          </CardHeader>

                          <CardContent className="p-4 space-y-3">
                            <h3 className="font-bold text-gray-900 line-clamp-2">{video.title}</h3>
                            
                            {video.description && (
                              <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                            )}

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              {video.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {video.duration}
                                </span>
                              )}
                              {!isWatched && (
                                <span className="text-yellow-600 font-medium flex items-center gap-1">
                                  <Trophy className="h-4 w-4" />
                                  +3 pts
                                </span>
                              )}
                            </div>

                            {/* YouTube Player Embed */}
                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                              <iframe
                                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              />
                            </div>

                            {/* Mark as Watched Button */}
                            {!isWatched && (
                              <Button
                                onClick={() => handleMarkWatched(video.id)}
                                disabled={markWatchedMutation.isPending}
                                className="w-full"
                                size="sm"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                {markWatchedMutation.isPending ? "Marcando..." : "Marcar como Assistido"}
                              </Button>
                            )}

                            {isWatched && (
                              <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-100 text-green-800 text-sm">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="font-medium">Assistido! +3 pts</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <Card className="col-span-full">
                      <CardContent className="py-12 text-center">
                        <p className="text-gray-500">Nenhum vídeo disponível para este módulo ainda.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">Carregando módulos...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
