import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: string;
  completedSteps: string[];
}

const steps = [
  { key: 'setup', label: 'Setup', description: 'Business email' },
  { key: 'upload', label: 'Upload', description: 'CSV contacts' },
  { key: 'template', label: 'Template', description: 'Choose design' },
  { key: 'send', label: 'Send', description: 'Send emails' },
  { key: 'complete', label: 'Complete', description: 'Finished' }
];

/**
 * Visual step indicator component showing the current progress through the email campaign setup
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, completedSteps }) => {
  const getCurrentStepIndex = () => steps.findIndex(step => step.key === currentStep);
  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.key);
          const isCurrent = step.key === currentStep;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step.key} className="flex flex-col items-center relative">
              {/* Step Circle */}
              <div className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : isCurrent 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.description}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`
                  absolute top-5 left-full w-full h-0.5 -translate-y-0.5
                  ${isCompleted || (index < currentStepIndex) ? 'bg-green-500' : 'bg-gray-300'}
                `} style={{ width: 'calc(100vw / 5 - 2.5rem)' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};