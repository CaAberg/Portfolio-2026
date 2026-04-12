/** One chapter in the interactive “fishing” journey (edit copy here). */
export type JourneyCard = {
  id: string;
  title: string;
  /** Short paragraphs shown in the card body. */
  paragraphs: string[];
};

/** Five milestones: edit names and details to match your story. */
export const journeyCards: JourneyCard[] = [
  {
    id: "discovery",
    title: "How I found coding",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    id: "studies",
    title: "Starting my studies",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    id: "parking-time",
    title: "First project: Parking Time",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    id: "matsmart",
    title: "Apprenticeship at Matsmart",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    id: "future",
    title: "What I am aiming for next",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
];
