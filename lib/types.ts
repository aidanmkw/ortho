// Core content types for the Orthodox Apologist game.
// Every question is REQUIRED to carry at least one citation (Father, council,
// canon, or Scripture). The schema enforces this so the content can never
// drift away from primary sources.

export type Tradition =
  | "RCC"
  | "Lutheran"
  | "Reformed"
  | "Baptist"
  | "Anglican"
  | "Methodist"
  | "Pentecostal"
  | "NonDenom"
  | "SDA"
  | "JW"
  | "LDS"
  | "EO-Heresy"
  | "Secular"
  | "Islam"
  | "Judaism";

export type Citation = {
  // Free-form source string. Examples:
  //   "St. Ignatius of Antioch, Letter to the Smyrnaeans 8:2 (AD ~107)"
  //   "Council of Nicaea I (AD 325), Symbol of Faith"
  //   "St. John Chrysostom, Homily 50 on Matthew, NPNF1 10:308"
  source: string;
  // Optional verbatim quotation. Use when the wording matters in a debate.
  quote?: string;
  // Optional Scripture reference (use LXX numbering where it differs).
  scripture?: string;
  // Optional URL to a public edition (e.g. ccel.org, newadvent.org).
  url?: string;
};

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type ItemKind =
  // Open-recall question with an expected answer.
  | "qa"
  // Multiple choice with one correct option.
  | "mcq"
  // Cross-examination: opponent makes a claim, you must give the Orthodox
  // rebuttal with patristic / conciliar / scriptural backing.
  | "debate"
  // Identify which Father, council, or work a quotation belongs to.
  | "identify-source"
  // Order events / councils / heresies chronologically.
  | "chronology";

export type Choice = {
  id: string;
  text: string;
  // Optional explanation shown after answering (good for explaining WHY a
  // distractor is wrong — this is where apologetics is sharpened).
  rationale?: string;
};

export type QAItem = {
  id: string;
  kind: ItemKind;
  difficulty: Difficulty;
  tags: string[];

  // For "qa", "mcq", "identify-source": the question text.
  // For "debate": leave blank, use opponentClaim instead.
  // For "chronology": the instruction (e.g. "Order these councils").
  prompt?: string;

  // MCQ + identify-source + chronology
  choices?: Choice[];
  correctChoiceId?: string;
  // For chronology: ordered list of choice ids (earliest -> latest).
  correctOrder?: string[];

  // QA
  expectedAnswer?: string;

  // Debate
  opponentTradition?: Tradition;
  opponentClaim?: string;
  orthodoxRebuttal?: string;
  // Common counter-objections the opponent might raise after your rebuttal,
  // and how to respond. This is what trains a real apologist.
  rejoinders?: { objection: string; reply: string; citations?: Citation[] }[];

  // REQUIRED. Empty arrays are rejected by the content checker.
  citations: Citation[];

  // Optional pointers to deeper drills on the same topic.
  followUp?: string[];

  // Author / teacher notes (not shown to player by default).
  notes?: string;
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  learningObjectives: string[];
  primarySources: string[];
  items: QAItem[];
};

export type Stage = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  era?: string;
  description: string;
  // Rank earned upon mastering this stage (Catechumen -> ... -> Apologist).
  rank: string;
  // Topics in recommended study order.
  topics: Topic[];
};

export type Curriculum = {
  stages: Stage[];
};

// Player progress is stored locally in the browser.
export type ItemProgress = {
  itemId: string;
  attempts: number;
  correct: number;
  lastSeen: number; // epoch ms
  mastered: boolean;
};

export type Progress = {
  rank: string;
  xp: number;
  items: Record<string, ItemProgress>;
};

export const APOLOGIST_RANKS = [
  "Inquirer",
  "Catechumen",
  "Reader",
  "Subdeacon",
  "Deacon",
  "Priest",
  "Archpriest",
  "Confessor",
  "Apologist",
] as const;

export type ApologistRank = (typeof APOLOGIST_RANKS)[number];
