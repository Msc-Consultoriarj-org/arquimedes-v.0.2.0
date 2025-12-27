import { useState, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { MathContent } from "./MathContent";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useSounds } from "@/lib/sounds";
import { useConfetti } from "@/hooks/useConfetti";

interface Exercise {
  id: number;
  type: "simple_input" | "practical_problem" | "multiple_choice";
  question: string;
  description?: string | null;
  hints?: string[] | null;
  options?: Array<{ id: string; text: string }> | null;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete?: (exerciseId: number, isCorrect: boolean) => void;
}

// ⚡ Optimization: Using React.memo to prevent unnecessary re-renders of the exercise card.
// This is beneficial when ExerciseCard is part of a list that might re-render (like in LessonPage),
// ensuring this component only re-renders if its specific props change.
// This avoids costly re-renders when parent state changes but this card's data remains the same.
export const ExerciseCard = memo(function ExerciseCard({ exercise, onComplete }: ExerciseCardProps) {
  const { playSuccess, playError } = useSounds();
  const { fireEmojiConfetti } = useConfetti();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "correct" | "incorrect" | null;
    message: string;
  }>({ type: null, message: "" });
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const submitMutation = trpc.exercises.submit.useMutation({
    onSuccess: (data) => {
      setAttemptCount(data.attemptNumber);
      
      if (data.isCorrect) {
        playSuccess(); // Som de acerto
        fireEmojiConfetti('✅'); // Confete com emoji de check
        setFeedback({
          type: "correct",
          message: "Excelente! Resposta correta! 🎉",
        });
        toast.success("Resposta correta!");
        onComplete?.(exercise.id, true);
      } else {
        playError(); // Som de erro
        setFeedback({
          type: "incorrect",
          message: data.correctAnswer
            ? `Não foi dessa vez. A resposta correta é: ${data.correctAnswer}`
            : "Resposta incorreta. Tente novamente!",
        });
        
        // Show hint after 2 incorrect attempts
        if (data.attemptNumber >= 2 && exercise.hints && exercise.hints.length > 0) {
          setShowHint(true);
        }
      }
    },
    onError: (error) => {
      toast.error("Erro ao enviar resposta: " + error.message);
    },
  });

  const handleSubmit = () => {
    if (!answer.trim()) {
      toast.error("Por favor, insira uma resposta");
      return;
    }

    submitMutation.mutate({
      exerciseId: exercise.id,
      answer: answer.trim(),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !submitMutation.isPending) {
      handleSubmit();
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg md:text-xl flex items-start gap-2">
          <span className="text-primary">📝</span>
          <div className="flex-1">
            <MathContent content={exercise.question} />
          </div>
        </CardTitle>
        {exercise.description && (
          <p className="text-sm text-muted-foreground mt-2">
            {exercise.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Answer Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Digite sua resposta..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={submitMutation.isPending || feedback.type === "correct"}
            className="flex-1 min-h-[48px] text-base"
          />
          <Button
            onClick={handleSubmit}
            disabled={submitMutation.isPending || feedback.type === "correct"}
            className="w-full sm:w-auto min-h-[48px] text-base"
          >
            {submitMutation.isPending ? "Enviando..." : "Enviar"}
          </Button>
        </div>

        {/* Feedback */}
        {feedback.type && (
          <Alert
            variant={feedback.type === "correct" ? "default" : "destructive"}
            className={
              feedback.type === "correct"
                ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                : ""
            }
          >
            <div className="flex items-start gap-2">
              {feedback.type === "correct" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 mt-0.5" />
              )}
              <AlertDescription className="flex-1">
                {feedback.message}
              </AlertDescription>
            </div>
          </Alert>
        )}

        {/* Hint */}
        {showHint && exercise.hints && exercise.hints.length > 0 && (
          <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertDescription>
              <strong>Dica:</strong> {exercise.hints[0]}
            </AlertDescription>
          </Alert>
        )}

        {/* Attempt Counter */}
        {attemptCount > 0 && (
          <p className="text-sm text-muted-foreground text-right">
            Tentativa {attemptCount}
          </p>
        )}
      </CardContent>
    </Card>
  );
});
