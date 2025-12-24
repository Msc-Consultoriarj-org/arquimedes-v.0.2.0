import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DisciplinePage from "./pages/DisciplinePage";
import ModulePage from "./pages/ModulePage";
import LessonPage from "./pages/LessonPage";
import ProfilePage from "./pages/ProfilePage";
import VisualsDemo from "./pages/VisualsDemo";
import ComponentsDemo from "./pages/ComponentsDemo";
import InteractiveDemo from "./pages/InteractiveDemo";
import UnifiedExerciseRoomPage from "./pages/UnifiedExerciseRoomPage";
import StatisticsPage from "./pages/StatisticsPage";
import InteractiveExerciseRoomPage from "./pages/InteractiveExerciseRoomPage";
import VideoRoomPage from "./pages/VideoRoomPage";
import DailyChallengePage from "./pages/DailyChallengePage";
import DisciplinesPage from "./pages/DisciplinesPage";
import AchievementsPage from "./pages/AchievementsPage";
import AdminPage from "./pages/AdminPage";
import ExercisesCompletedPage from "./pages/ExercisesCompletedPage";
import { SoundToggle } from "./components/SoundToggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/perfil" component={ProfilePage} />
      <Route path="/exercicios" component={UnifiedExerciseRoomPage} />
            <Route path="/exercicios-interativos" component={InteractiveExerciseRoomPage} />
            <Route path="/exercicios-resolvidos" component={ExercisesCompletedPage} />
            <Route path="/estatisticas" component={StatisticsPage} />
      <Route path="/videos" component={VideoRoomPage} />
      {/* <Route path="/desafio-do-dia" component={DailyChallengePage} /> */} {/* Oculto temporariamente - validar respostas */}
      <Route path="/conquistas" component={AchievementsPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/disciplinas" component={DisciplinesPage} />
      <Route path="/minhas-disciplinas" component={DisciplinesPage} />
      <Route path="/visuals" component={VisualsDemo} />
        <Route path="/demo" component={ComponentsDemo} />
        <Route path="/interactive-demo" component={InteractiveDemo} />
      <Route path="/disciplina/:disciplineSlug" component={DisciplinePage} />
      <Route path="/disciplina/:disciplineSlug/modulo/:moduleSlug" component={ModulePage} />
      <Route
        path="/disciplina/:disciplineSlug/modulo/:moduleSlug/aula/:pageSlug"
        component={LessonPage}
      />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
            <SoundToggle />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
