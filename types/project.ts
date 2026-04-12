/** Portfolio project shown on the home page and detail route. */
export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** Short bullets for detail page. */
  highlights: string[];
  /** External case study or repo URL, optional. */
  href?: string;
  /** Label for external link. */
  hrefLabel?: string;
};
