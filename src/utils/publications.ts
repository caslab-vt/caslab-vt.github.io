import type { CollectionEntry } from 'astro:content';

const excludedTitles = new Set([
  'System synthesis supplementary data',
  'Industry Challenge',
  'Nation-State Adoption of Distributed Ledger Technology: How Blockchain Will Remake Traditional Nation-State Relationships',
  'Diagonalization Strikes Back: Some Recent Lower Bounds in Complexity Theory',
  'Connecting SAT algorithms and complexity lower bounds',
  'Waffle Mixer: A Library for Distributing Genetic Algorithms',
  'Bubble Trouble Bobble 3D Challenge 3000',
  'Access Complexity',
]);

export function isWilliamsPublication(entry: CollectionEntry<'publications'>) {
  if (excludedTitles.has(entry.data.title)) {
    return false;
  }

  return entry.data.authors.some((author) => /williams/i.test(author));
}
