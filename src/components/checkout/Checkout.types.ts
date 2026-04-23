export type Step = 1 | 2 | 3;

export interface StepItemProps {
  stepNumber: number;
  currentStep: number;
  hasError: boolean;
  title: string;
}
