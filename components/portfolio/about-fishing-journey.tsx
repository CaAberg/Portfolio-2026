"use client";

import { journeyCards } from "@/lib/about-journey-cards";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useId, useMemo, useRef, useState } from "react";

const STEP_COUNT = journeyCards.length;

/** Rope end Y in viewBox coords: deeper “cast” as the user progresses through steps. */
function ropeEndY(activeStep: number) {
  if (activeStep < 0) return 72;
  return Math.min(72 + (activeStep + 1) * 14, 132);
}

type FishingSceneProps = {
  activeStep: number;
  className?: string;
  reduceMotion: boolean;
};

function FishingScene({
  activeStep,
  className,
  reduceMotion,
}: FishingSceneProps) {
  const y2 = ropeEndY(activeStep);

  return (
    <svg
      aria-hidden
      className={cn(
        "h-32 w-36 shrink-0 text-foreground sm:h-40 sm:w-44",
        className,
      )}
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
      {/* Rod + line (line length reflects journey progress) */}
      <g
        className="text-foreground"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2.5}
      >
        <line x1={92} x2={150} y1={58} y2={28} />
        <motion.line
          className="text-link"
          strokeWidth={2}
          x1={150}
          x2={150}
          y1={28}
          animate={{ y2 }}
          initial={false}
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            ease: "easeInOut",
          }}
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
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  /** Focus when the heading mounts; `AnimatePresence mode="wait"` can mount it after layout, so avoid `useEffect` on `activeStep` alone. */
  const setChapterHeadingRef = useCallback((el: HTMLHeadingElement | null) => {
    headingRef.current = el;
    if (!el) return;
    requestAnimationFrame(() => {
      if (headingRef.current !== el) return;
      el.focus({ preventScroll: true });
    });
  }, []);

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
        className="relative mx-auto flex max-w-3xl flex-col items-stretch gap-6"
        role="region"
      >
        <span className="sr-only" id={baseId}>
          Interactive story of my journey. Use the reel button or step buttons.
        </span>

        {/* One bordered panel: story on the left, figure + reel + steps on the right */}
        <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm sm:flex-row sm:items-stretch">
          <div
            className="flex min-h-96 min-w-0 flex-1 flex-col border-border sm:border-r"
            id={panelId}
          >
            <AnimatePresence initial={false} mode="wait">
              {!hasActiveCard ? (
                <motion.div
                  key="placeholder"
                  animate={{ opacity: 1 }}
                  className="flex h-full min-h-0 flex-col justify-center px-5 py-8 text-center sm:px-6"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                  <p className="text-sm text-muted-foreground">
                    Press{" "}
                    <span className="font-medium text-foreground">
                      Reel in the next chapter
                    </span>{" "}
                    or pick a step on the right to open a card.
                  </p>
                </motion.div>
              ) : (
                <motion.article
                  key={journeyCards[activeStep].id}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full min-h-0 flex-col gap-3 px-5 py-8 sm:px-6"
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -24 }}
                  initial={{ opacity: 0.85, y: initialY }}
                  transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3
                    className="shrink-0 text-lg font-semibold text-foreground sm:text-xl"
                    ref={setChapterHeadingRef}
                    tabIndex={-1}
                  >
                    {journeyCards[activeStep].title}
                  </h3>
                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {journeyCards[activeStep].paragraphs.map((p, i) => (
                      <p key={`${journeyCards[activeStep].id}-${i}`}>{p}</p>
                    ))}
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>

          <aside className="flex w-full shrink-0 flex-col items-center gap-4 border-t border-border bg-muted/25 px-4 py-6 sm:w-48 sm:border-t-0 sm:py-8 md:w-52">
            <div className="flex justify-center">
              <FishingScene
                activeStep={activeStep}
                reduceMotion={Boolean(reduceMotion)}
              />
            </div>

            <button
              aria-controls={panelId}
              className={cn(
                "w-full max-w-xs rounded-lg border border-border bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground shadow-sm transition-opacity",
                "hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                "disabled:cursor-not-allowed disabled:opacity-50",
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
              <p className="max-w-xs text-center text-xs text-muted-foreground">
                That is the full journey for now. Use the steps any time to
                revisit a chapter.
              </p>
            ) : null}

            <nav aria-label="Journey steps" className="w-full max-w-xs">
              <ol className="flex flex-col items-stretch gap-0">
                {journeyCards.map((card, index) => {
                  const isCurrent = activeStep === index;
                  const hasRead = activeStep >= index;
                  const segmentFromAboveIsRead = activeStep >= index;

                  return (
                    <li className="flex flex-col items-center" key={card.id}>
                      {index > 0 ? (
                        <span
                          aria-hidden
                          className={cn(
                            "mb-1 h-4 w-0.5 shrink-0 rounded-full transition-colors duration-300",
                            segmentFromAboveIsRead ? "bg-link" : "bg-border",
                          )}
                        />
                      ) : null}
                      <button
                        aria-current={isCurrent ? "step" : undefined}
                        className={cn(
                          "w-full rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors sm:text-sm",
                          isCurrent
                            ? "border-foreground bg-background text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                          hasRead &&
                            !isCurrent &&
                            "border-link/60 text-foreground ring-2 ring-link/25",
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
          </aside>
        </div>
      </div>
    </div>
  );
}
