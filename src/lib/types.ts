// ─── Anthology Data Model ───────────────────────────────────────────

export interface Stanza {
  lines: string[];
}

export interface Poem {
  id: string;           // kebab-case slug, e.g. "the-cycle-of-solitudes"
  roman: string;        // "I", "II", … "XV"
  title: string;        // "The Cycle of Solitudes"
  stanzas: Stanza[];
}

export interface Act {
  number: number;       // 1–5
  label: string;        // "Act One", "Act Two", …
  title: string;        // "The Rupture & the Geometry of Separation"
  subtitle?: string;    // "(12:00 to 05:00)" or "(From "I" to "We")"
  epigraph: string;     // Block-quote intro text
  poems: Poem[];
}

export interface Epilogue {
  quote: string;
  authorsNote: string;
}

export interface Anthology {
  title: string;
  subtitle: string;
  author: string;
  epigraph: string;           // Front-matter epigraph
  prologue: Poem;             // "Where Do I Start Again?"
  acts: Act[];                // 5 Acts
  epilogue: Epilogue;
}

// ─── Section Tracking (for canvas + HUD) ───────────────────────────

export type SectionType =
  | 'hero'
  | 'epigraph'
  | 'prologue'
  | 'act-divider'
  | 'poem'
  | 'epilogue'
  | 'credits';

export type CanvasMode =
  | 'prologue'    // Hero + Epigraph + Prologue
  | 'rupture'     // Act I
  | 'purgatory'   // Act II
  | 'horizon'     // Act III
  | 'forge'       // Act IV
  | 'stillness';  // Act V + Epilogue

export interface ActiveSection {
  type: SectionType;
  actIndex: number | null;    // 0–4 for Acts, null otherwise
  poemId: string | null;
  poemTitle: string | null;
  actTitle: string | null;
  canvasMode: CanvasMode;
}
