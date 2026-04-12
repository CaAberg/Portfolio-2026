"use client";

import { journeyCards } from "@/lib/about-journey-cards";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useMemo, useState } from "react";

const STEP_COUNT = journeyCards.length;

function FishingScene({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("h-32 w-full max-w-xs text-foreground sm:h-40", className)}
      viewBox="0 0 200 140"
    >
      {/* Water */}
      <path
        className="text-muted"
        d="M0 95 Q50 88 100 95 T200 95 L200 140 L0 140 Z"
        fill="currentColor"
        opacity={0.35}
      />
      {/* Stick figure */}
      <g
        className="text-foreground"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2.5}
      >
        <circle cx={72} cy={38} r={7} />
        <line x1={72} x2={72} y1={45} y2={78} />
        <line x1={72} x2={52} y1={55} y2={68} />
        <line x1={72} x2={92} y1={55} y2={62} />
        <line x1={72} x2={62} y1={78} y2={102} />
        <line x1={72} x2={88} y1={78} y2={98} />
      </g>
      {/* Rod */}
      <g
        className="text-foreground"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2.5}
      >
        <line x1={92} x2={150} y1={58} y2={28} />
        <line
          className="text-muted-foreground"
          strokeWidth={2}
          x1={150}
          x2={150}
          y1={28}
          y2={72}
        />
      </g>
    </svg>
  );
}

type AboutFishingJourneyProps = {
  className?: string;
};

/**
 * Interactive journey: reel button advances cards into the slot above the figure;
 * step buttons offer direct navigation. See AboutFishingJourney.md.
 */
export function AboutFishingJourney({ className }: AboutFishingJourneyProps) {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const liveId = `${baseId}-live`;
  const panelId = `${baseId}-panel`;

  /** -1 = no card yet; 0–4 = active card index */
  const [activeStep, setActiveStep] = useState(-1);

  const liveMessage = useMemo(() => {
    if (activeStep < 0) {
      return `Journey not started. Step 0 of ${STEP_COUNT}. Use Reel in the next chapter or the step buttons.`;
    }
    const card = journeyCards[activeStep];
    return `Step ${activeStep + 1} of ${STEP_COUNT}: ${card.title}`;
  }, [activeStep]);

  const canReelFurther = activeStep < STEP_COUNT - 1;
  const hasActiveCard = activeStep >= 0;

  const reelNext = () => {
    setActiveStep((s) => {
      if (s < STEP_COUNT - 1) return s + 1;
      return s;
    });
  };

  const duration = reduceMotion ? 0 : 0.45;
  const initialY = reduceMotion ? 0 : 56;

  return (
    <div className={cn("mt-8", className)}>
      <p id={liveId} aria-live="polite" className="sr-only">
        {liveMessage}
      </p>

      <div
        aria-labelledby={baseId}
        className="relative mx-auto flex max-w-2xl flex-col items-center gap-6"
        role="region"
      >
        <span className="sr-only" id={baseId}>
          Interactive story of my journey. Use the reel button or step buttons.
        </span>

        {/* Card slot above the fishing scene */}
        <div
          className="relative h-72 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-background px-5 py-6 shadow-sm sm:px-6"
          id={panelId}
        >
          <AnimatePresence initial={false} mode="wait">
            {!hasActiveCard ? (
              <motion.div
                key="placeholder"
                animate={{ opacity: 1 }}
                className="flex h-full min-h-52 flex-col justify-center text-center"
                exit={{ opacity: 0 }}
                initial={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              >
                <p className="text-sm text-muted-foreground">
                  Press{" "}
                  <span className="font-medium text-foreground">
                    Reel in the next chapter
                  </span>{" "}
                  or pick a step below to pull up a card.
                </p>
              </motion.div>
            ) : (
              <motion.article
                key={journeyCards[activeStep].id}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3"
                exit={{ opacity: 0, y: reduceMotion ? 0 : -24 }}
                initial={{ opacity: 0.85, y: initialY }}
                transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                  {journeyCards[activeStep].title}
                </h3>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {journeyCards[activeStep].paragraphs.map((p, i) => (
                    <p key={`${journeyCards[activeStep].id}-${i}`}>{p}</p>
                  ))}
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <FishingScene />
          <div className="flex flex-col items-center gap-2">
            <button
              aria-controls={panelId}
              className={cn(
                "rounded-lg border border-border bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-opacity",
                "hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
              disabled={!canReelFurther}
              type="button"
              onClick={reelNext}
            >
              {activeStep < 0
                ? "Reel in the first chapter"
                : canReelFurther
                  ? "Reel in the next chapter"
                  : "You have reeled in every chapter"}
            </button>
            {!canReelFurther && activeStep === STEP_COUNT - 1 ? (
              <p className="w-64 text-center text-xs text-muted-foreground">
                That is the full journey for now. Use the steps any time to
                revisit a chapter.
              </p>
            ) : null}
          </div>
        </div>

        <nav aria-label="Journey steps" className="w-full max-w-xl">
          <ol className="flex flex-wrap justify-center gap-2">
            {journeyCards.map((card, index) => {
              const isCurrent = activeStep === index;
              return (
                <li key={card.id}>
                  <button
                    aria-current={isCurrent ? "step" : undefined}
                    className={cn(
                      "rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                      isCurrent
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                    )}
                    type="button"
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="sr-only">
                      Step {index + 1} of {STEP_COUNT}:{" "}
                    </span>
                    {card.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
