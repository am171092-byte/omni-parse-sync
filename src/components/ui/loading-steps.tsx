import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingStep {
  message: string;
  duration: number;
}

interface LoadingStepsProps {
  steps: LoadingStep[];
  onComplete: () => void;
}

export function LoadingSteps({ steps, onComplete }: LoadingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      onComplete();
      return;
    }

    const currentStepData = steps[currentStep];
    const stepDuration = currentStepData.duration;
    
    let startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const stepProg = Math.min(100, (elapsed / stepDuration) * 100);
      const totalProg = ((currentStep / steps.length) * 100) + (stepProg / steps.length);
      
      setStepProgress(stepProg);
      setProgress(totalProg);
      
      if (elapsed < stepDuration) {
        requestAnimationFrame(updateProgress);
      } else {
        setCurrentStep(prev => prev + 1);
        setStepProgress(0);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [currentStep, steps, onComplete]);

  if (currentStep >= steps.length) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg font-medium">Processing...</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            Step {currentStep + 1} of {steps.length}
          </p>
          <p className="font-medium">{steps[currentStep]?.message}</p>
        </div>

        <div className="space-y-1">
          <Progress value={stepProgress} className="h-1" />
        </div>
      </CardContent>
    </Card>
  );
}