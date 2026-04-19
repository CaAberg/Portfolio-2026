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
      "I always had a passion for technology and programming, but I never knew how to start.",
      "My brother, who is a developer, introduced me to the world of programming and showed me how to get started.",
      "I started to learn programming by using codeacademy, and I quickly realized that I loved it.",
    ],
  },
  {
    id: "studies",
    title: "My studies",
    paragraphs: [
      "I started my studies by taking a course in JAVA, thinking it would be a good way to get started.",
      "After that I started to learn more about programming and I started to learn more about the different programming languages and frameworks.",
      "I decided to study Frontend Development at FutureGames, where I learned a lot, both in terms of programming and how to lead a team.",
    ],
  },
  {
    id: "parking-time",
    title: "First project with a client: Parking Time",
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
    title: "What I'm aiming for next",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
];
