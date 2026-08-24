import type { Anthology, Act, Poem, Stanza } from './types';

// ─── Number-word labels ────────────────────────────────────────────
const ACT_LABELS: Record<number, string> = {
  1: 'Act One',
  2: 'Act Two',
  3: 'Act Three',
  4: 'Act Four',
  5: 'Act Five',
};

// ─── Helpers ───────────────────────────────────────────────────────

function toTitleCase(str: string): string {
  const lowercaseWords = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'of', 'in', '&']);
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (word === '&') return '&';
      if (index === 0 || !lowercaseWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Strip surrounding quotes and italic markers from an epigraph line */
function cleanEpigraph(raw: string): string {
  return raw
    .replace(/^>\s*\*?"?/, '')
    .replace(/"?\*?\s*$/, '')
    .replace(/^"/, '')
    .replace(/"$/, '')
    .trim();
}

/** Extract the Roman numeral and title from a ### heading like "### XIV. The Sound of Silence" */
function parsePoemHeading(line: string): { roman: string; title: string } | null {
  // Matches "### I. Title" or "### XIV. The Sound of Silence"
  const match = line.match(/^###\s+([IVXLC]+)\.\s+(.+)$/);
  if (match) {
    return { roman: match[1], title: match[2].trim() };
  }
  // Also match prologue-style "### Where Do I Start Again?"
  const prologueMatch = line.match(/^###\s+(.+)$/);
  if (prologueMatch) {
    return { roman: '', title: prologueMatch[1].trim() };
  }
  return null;
}

/** Parse a block of verse lines into stanzas (separated by blank lines) */
function parseStanzas(lines: string[]): Stanza[] {
  const stanzas: Stanza[] = [];
  let current: string[] = [];

  for (const line of lines) {
    const trimmed = line.replace(/\s{2,}$/, '').trim(); // remove trailing double-spaces
    if (trimmed === '' || trimmed === '---') {
      if (current.length > 0) {
        stanzas.push({ lines: [...current] });
        current = [];
      }
    } else {
      current.push(trimmed);
    }
  }
  if (current.length > 0) {
    stanzas.push({ lines: current });
  }
  return stanzas;
}

// ─── Main Parser ───────────────────────────────────────────────────

export async function parseAnthology(url: string = '/Musings_of_Insomnia.md'): Promise<Anthology> {
  const response = await fetch(url);
  const text = await response.text();
  const allLines = text.split(/\r?\n/);

  // ── 1. Title & subtitle ──────────────────────────────────────────
  let title = 'Musings of Insomnia';
  let subtitle = 'A Five-Act Anthology';
  let author = 'Rahul Gouri';

  if (allLines.length > 0 && allLines[0].startsWith('# ')) {
    const rawTitle = allLines[0].replace(/^#\s+/, '').trim();
    // Format "MUSINGS OF INSOMNIA" into Title Case "Musings of Insomnia"
    title = rawTitle.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).replace(/\bOf\b/g, 'of');
  }

  if (allLines.length > 1 && allLines[1].startsWith('### ')) {
    const metaLine = allLines[1].replace(/^###\s*\*?/, '').replace(/\*?\s*$/, '').trim();
    const byMatch = metaLine.match(/^(.*?)\s+by\s+(.+)$/i);
    if (byMatch) {
      author = byMatch[2].trim();
    }
  }

  // ── 2. Front-matter epigraph (first blockquote) ──────────────────
  let epigraph = '';
  for (const line of allLines) {
    if (line.startsWith('> ')) {
      epigraph = cleanEpigraph(line);
      break;
    }
  }

  // ── 3. Find section boundaries ───────────────────────────────────
  // Identify indices of # headings (Act / Prologue / Epilogue)
  interface SectionMarker {
    index: number;
    heading: string;
    level: number;
  }

  const sectionMarkers: SectionMarker[] = [];
  for (let i = 0; i < allLines.length; i++) {
    const line = allLines[i];
    // Match # HEADING but not ## or ### (those are poems / TOC)
    if (/^# [A-Z]/.test(line)) {
      sectionMarkers.push({
        index: i,
        heading: line.replace(/^#\s+/, '').trim(),
        level: 1,
      });
    }
  }

  // ── 4. Parse Prologue ────────────────────────────────────────────
  const prologueMarker = sectionMarkers.find(s => s.heading.includes('PROLOGUE'));
  let prologue: Poem = { id: 'prologue', roman: '', title: 'Where Do I Start Again?', stanzas: [] };

  if (prologueMarker) {
    // Find the next # heading after prologue
    const nextMarkerIdx = sectionMarkers.indexOf(prologueMarker) + 1;
    const endIdx = nextMarkerIdx < sectionMarkers.length
      ? sectionMarkers[nextMarkerIdx].index
      : allLines.length;

    const prologueLines = allLines.slice(prologueMarker.index + 1, endIdx);
    // Find the ### poem heading
    const poemStartIdx = prologueLines.findIndex(l => l.startsWith('### '));
    if (poemStartIdx !== -1) {
      const heading = parsePoemHeading(prologueLines[poemStartIdx]);
      if (heading) {
        prologue.title = heading.title;
        prologue.id = slugify(heading.title);
      }
      const verseLines = prologueLines.slice(poemStartIdx + 1);
      prologue.stanzas = parseStanzas(verseLines);
    }
  }

  // ── 5. Parse Acts ────────────────────────────────────────────────
  const actMarkers = sectionMarkers.filter(s =>
    s.heading.startsWith('ACT ') && !s.heading.includes('EPILOGUE')
  );

  const acts: Act[] = [];
  const actNumberMap: Record<string, number> = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
  };

  for (let a = 0; a < actMarkers.length; a++) {
    const marker = actMarkers[a];
    // Determine end boundary
    const globalIdx = sectionMarkers.indexOf(marker);
    const nextGlobalMarker = globalIdx + 1 < sectionMarkers.length
      ? sectionMarkers[globalIdx + 1]
      : null;
    const endIdx = nextGlobalMarker ? nextGlobalMarker.index : allLines.length;

    const actLines = allLines.slice(marker.index, endIdx);

    // Parse act number from heading like "ACT I: THE RUPTURE…"
    const actNumMatch = marker.heading.match(/ACT\s+([IVX]+)/);
    const actNum = actNumMatch ? (actNumberMap[actNumMatch[1]] ?? a + 1) : a + 1;

    // Extract act title (part after "ACT X: ")
    const actTitleMatch = marker.heading.match(/ACT\s+[IVX]+:\s+(.+)/);
    const rawActTitle = actTitleMatch
      ? actTitleMatch[1].replace(/&/g, '&').trim()
      : marker.heading;

    // Separate main title from parenthetical subtitle e.g. "(12:00 TO 05:00)"
    const subMatch = rawActTitle.match(/^(.*?)\s*(\(.*?\))\s*$/);
    const rawTitlePart = subMatch ? subMatch[1].trim() : rawActTitle;
    const actSubtitle = subMatch ? subMatch[2].trim() : undefined;
    const actTitle = toTitleCase(rawTitlePart);

    // Extract act epigraph (blockquote after the act heading)
    let actEpigraph = '';
    for (const line of actLines) {
      if (line.startsWith('> ')) {
        actEpigraph = cleanEpigraph(line);
        break;
      }
    }

    // Parse poems within this act
    const poems: Poem[] = [];
    const poemIndices: number[] = [];
    for (let i = 0; i < actLines.length; i++) {
      if (actLines[i].startsWith('### ') && parsePoemHeading(actLines[i])?.roman) {
        poemIndices.push(i);
      }
    }

    for (let p = 0; p < poemIndices.length; p++) {
      const pIdx = poemIndices[p];
      const pEnd = p + 1 < poemIndices.length ? poemIndices[p + 1] : actLines.length;
      const heading = parsePoemHeading(actLines[pIdx]);
      if (!heading) continue;

      const verseLines = actLines.slice(pIdx + 1, pEnd);
      poems.push({
        id: slugify(heading.title),
        roman: heading.roman,
        title: heading.title,
        stanzas: parseStanzas(verseLines),
      });
    }

    acts.push({
      number: actNum,
      label: ACT_LABELS[actNum] ?? `Act ${actNum}`,
      title: actTitle,
      subtitle: actSubtitle,
      epigraph: actEpigraph,
      poems,
    });
  }

  // ── 6. Parse Epilogue ────────────────────────────────────────────
  const epilogueMarker = sectionMarkers.find(s =>
    s.heading.includes('EPILOGUE')
  );

  let epilogueQuote = '';
  const authorsNote = 'These fifteen poems were written across many nights that refused to end quietly. They move, roughly, the way insomnia itself moves: from private rupture, through the long twilight hours of the mind, outward to the shared ache of everyone else awake at the same hour, into the slow work of standing up again, and finally to a stillness that no longer needs to be escaped.';

  if (epilogueMarker) {
    const epilogueLines = allLines.slice(epilogueMarker.index + 1);
    for (const line of epilogueLines) {
      if (line.startsWith('> ')) {
        epilogueQuote = cleanEpigraph(line);
        break;
      }
    }
  }

  return {
    title,
    subtitle,
    author,
    epigraph,
    prologue,
    acts,
    epilogue: {
      quote: epilogueQuote,
      authorsNote,
    },
  };
}
