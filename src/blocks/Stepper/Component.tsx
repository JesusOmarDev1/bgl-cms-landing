'use client'
import React from 'react'
import Stepper, { Step } from '@/components/ui/stepper'
import { cn } from '@/utilities/ui/cn'
import { Media } from '@/components/Media'
import type { StepperBlock as StepperBlockType } from '@/payload-types'

type Props = {
  className?: string
} & StepperBlockType

export const StepperBlock: React.FC<Props> = ({
  className,
  title,
  description,
  steps,
  settings,
}) => {
  // Early return if no steps
  if (!steps || steps.length === 0) {
    return (
      <div className="my-8 p-6 border border-dashed border-muted-foreground/25 rounded-lg text-center text-muted-foreground">
        <p className="text-sm">Stepper vacío</p>
        <p className="text-xs mt-1">Añade pasos para crear tu stepper</p>
      </div>
    )
  }

  // Extract settings with defaults
  const backButtonText = settings?.backButtonText || 'Atrás'
  const nextButtonText = settings?.nextButtonText || 'Continuar'
  const disableStepIndicators = settings?.disableStepIndicators || false

  return (
    <section className={cn('my-8', className)}>
      <div className="container mx-auto">
        {/* Header section */}
        {(title || description) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">{title}</h2>}
            {description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        )}

        {/* Stepper component */}
        <Stepper
          backButtonText={backButtonText}
          nextButtonText={nextButtonText}
          disableStepIndicators={disableStepIndicators}
          stepCircleContainerClassName="bg-card border-border"
          className="w-full"
        >
          {steps.map((step, index: number) => (
            <Step key={step.id || index}>
              <div className="space-y-6">
                {step.stepTitle && (
                  <h3 className="text-xl font-semibold text-center text-primary">
                    {step.stepTitle}
                  </h3>
                )}

                {/* Media section - Video takes priority over image */}
                {step.stepMedia && (
                  <div className="flex justify-center">
                    <div className="w-full max-w-md">
                      <Media
                        resource={step.stepMedia}
                        fill
                        className="rounded-lg shadow-md size-96"
                      />
                    </div>
                  </div>
                )}

                {step.stepContent && (
                  <div className="text-center">
                    <p className="text-muted-foreground whitespace-pre-wrap">{step.stepContent}</p>
                  </div>
                )}
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
    </section>
  )
}
