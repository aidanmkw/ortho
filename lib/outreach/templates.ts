// DM outreach templates — the three from the video (Casual, Short & Sweet,
// Fan Angle) plus a couple more angles. Variables are filled from the
// selected influencer + your brand settings. No spam, no lies: you're
// offering a genuine free feature.

import type { Brand, Influencer } from "./types";

export interface DmTemplate {
  id: string;
  label: string;
  tag: string;
  /** Raw body with {{name}}, {{topic}}, {{blog}}, {{handle}} tokens. */
  body: string;
}

export const DM_TEMPLATES: DmTemplate[] = [
  {
    id: "casual",
    label: "The Casual One",
    tag: "friendly",
    body: `hey {{name}}! love your content on {{topic}}, man. i run a little blog/page thing ({{blog}}) and honestly i'd love to feature you. i'd turn your top post into an article and a carousel, tag you, all free. you down?`,
  },
  {
    id: "short",
    label: "Short & Sweet",
    tag: "low-effort",
    body: `yo {{name}}, your {{topic}} post kinda went crazy lol. mind if i turn it into a writeup and carousel and tag you? no catch man, just free promo via {{blog}}.`,
  },
  {
    id: "fan",
    label: "The Fan Angle",
    tag: "warm",
    body: `{{name}}! been lowkey obsessed with your {{topic}} stuff. i make features for creators i actually rock with, and yours is next on my list — cool if i put one together and tag you? it's {{blog}}, all free.`,
  },
  {
    id: "value",
    label: "The Value-First",
    tag: "direct",
    body: `hi {{name}} — I run {{blog}} ({{handle}}). I want to write a proper article + build an Instagram carousel around your {{topic}} work and credit you throughout. Zero cost, you get the assets to repost. Want me to send a draft first so you can approve it?`,
  },
  {
    id: "collab",
    label: "The Collab Pitch",
    tag: "partnership",
    body: `hey {{name}} — loved the {{topic}} post. I'd love to feature it on {{blog}} as an article + carousel and post it as a collab so it lands on both our pages. All free, you approve everything before it goes live. Down to try it?`,
  },
];

export function fillTemplate(
  body: string,
  influencer: Pick<Influencer, "name" | "niche"> | null,
  brand: Brand
): string {
  const name = influencer?.name?.trim() || "[name]";
  const topic = influencer?.niche?.trim() || "[topic]";
  return body
    .replace(/\{\{name\}\}/g, name)
    .replace(/\{\{topic\}\}/g, topic)
    .replace(/\{\{blog\}\}/g, brand.blogName?.trim() || "[your blog]")
    .replace(/\{\{handle\}\}/g, brand.yourHandle?.trim() || "[@you]");
}
