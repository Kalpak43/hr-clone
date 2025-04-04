"use client";

import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StepperProps {
  steps: string[];
  currentStep?: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleClick: (index: number) => void;
}

export function Stepper({
  steps,
  currentStep = 0,
  handleNext,
  handlePrev,
  handleClick,
}: StepperProps) {
  // const [currentStep, setCurrentStep] = useState(initialStep);

  const handleStepClick = (index: number) => {
    handleClick(index);
    // setCurrentStep(index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center  justify-center w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-1 relative"
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors cursor-pointer",
                  index <= currentStep
                    ? "bg-blue-400 border-blue-400 text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground bg-white"
                )}
                onClick={() => handleStepClick(index + 1)}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 w-full transition-colors absolute z-[-1] translate-x-1/2",
                    index < currentStep
                      ? "bg-blue-400"
                      : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="labels flex mt-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 text-center text-sm font-medium capitalize",
                index <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
