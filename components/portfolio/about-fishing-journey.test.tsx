import { AboutFishingJourney } from "@/components/portfolio/about-fishing-journey";
import { journeyCards } from "@/lib/about-journey-cards";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

describe("AboutFishingJourney", () => {
  it("shows the first card after clicking the reel button", async () => {
    const user = userEvent.setup();
    render(<AboutFishingJourney />);

    await user.click(
      screen.getByRole("button", { name: /reel in the first chapter/i }),
    );

    expect(
      await screen.findByRole("heading", {
        level: 3,
        name: journeyCards[0].title,
      }),
    ).toBeInTheDocument();
  });

  it("advances to the next chapter when clicking reel again", async () => {
    const user = userEvent.setup();
    render(<AboutFishingJourney />);

    await user.click(
      screen.getByRole("button", { name: /reel in the first chapter/i }),
    );
    await user.click(
      screen.getByRole("button", { name: /reel in the next chapter/i }),
    );

    expect(
      await screen.findByRole("heading", {
        level: 3,
        name: journeyCards[1].title,
      }),
    ).toBeInTheDocument();
  });

  it("activates a step when choosing a step button", async () => {
    const user = userEvent.setup();
    render(<AboutFishingJourney />);

    await user.click(
      screen.getByRole("button", {
        name: new RegExp(journeyCards[3].title, "i"),
      }),
    );

    expect(
      await screen.findByRole("heading", {
        level: 3,
        name: journeyCards[3].title,
      }),
    ).toBeInTheDocument();
  });

  it("disables the reel after the last chapter is shown", async () => {
    const user = userEvent.setup();
    render(<AboutFishingJourney />);

    for (let i = 0; i < journeyCards.length; i += 1) {
      await user.click(
        screen.getByRole("button", {
          name:
            i === 0
              ? /reel in the first chapter/i
              : /reel in the next chapter/i,
        }),
      );
    }

    expect(
      await screen.findByRole("button", {
        name: /you have reeled in every chapter/i,
      }),
    ).toBeDisabled();
  });

  it("activates reel with Enter on the focused button", async () => {
    const user = userEvent.setup();
    render(<AboutFishingJourney />);

    const reel = screen.getByRole("button", {
      name: /reel in the first chapter/i,
    });
    reel.focus();
    await user.keyboard("{Enter}");

    expect(
      await screen.findByRole("heading", {
        level: 3,
        name: journeyCards[0].title,
      }),
    ).toBeInTheDocument();
  });
});
