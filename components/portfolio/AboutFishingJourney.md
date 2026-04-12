# AboutFishingJourney

Client widget: a decorative fishing SVG (`aria-hidden`) plus a **card slot** above it. Cards are driven by [`lib/about-journey-cards.ts`](../../lib/about-journey-cards.ts).

## Controls

- **Reel in the first / next chapter**: primary button; advances one step until all five are shown, then disables.
- **Journey steps** (`nav`): five buttons with full chapter titles; jump to any step. The active step uses `aria-current="step"`.
- **Keyboard**: native `button` supports **Enter** and **Space** on the reel control.

## Screen readers

- Region label comes from the first `sr-only` span (`aria-labelledby`).
- Step changes are mirrored in an `aria-live="polite"` paragraph (`sr-only`) with text like `Step 2 of 5: …`.

## Motion

- `motion/react` with `AnimatePresence` for card enter/exit.
- `useReducedMotion()`: shorter/zero duration and no vertical offset when the user prefers reduced motion.

## Editing copy

Update titles and `paragraphs` in `lib/about-journey-cards.ts` only; the UI reads from that array.
