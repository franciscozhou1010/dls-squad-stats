/* The Prize Ladder, and the Dream Point economy that feeds it.
   ==========================================================================

   Rungs were read off Prize Ladder screenshots. Those screenshots are from a
   DIFFERENT account (Carrick / Manchester Utd, 2,020 DP) — the ladder itself
   is the same event for everyone, so the thresholds and rewards carry over,
   but nothing about that account's progress does.

   Overlapping screenshots cross-check each other: Legendary Physio at 55,000
   and Special Player at 175,000 each appear in two shots at the same number,
   which is the main reason to trust the readings.

   Two things Francisco said do not match the screenshots, and the screenshots
   win: he put the first Special Player at 67,500 (the ladder shows 62,500),
   and wrote the completion target as 25,000 (his own list ends at 250,000).  */

const LADDER_EVENT = 'Classic WC Players';
const LADDER_TARGET = 250000;
const LADDER_DAYS = 90;

/* Three early rungs are already claimed in the screenshots, so their rewards
   are visible but their point thresholds are not. They are listed with a null
   threshold rather than a guessed one — the count still comes to the 40 total
   Francisco quoted, which is the check that nothing is missing. */
const LADDER = [
  { dp: null,   reward: 'Rare Dream Point Boost',  kind: 'dpboost' },
  { dp: null,   reward: '250 coins',               kind: 'coins', n: 250 },
  { dp: null,   reward: 'Common Fitness Coach',    kind: 'coach' },
  { dp: 3000,   reward: '25 gems',                 kind: 'gems', n: 25 },
  { dp: 4000,   reward: 'Rare Special Coach',      kind: 'coach' },
  { dp: 5000,   reward: 'Rare Agent',              kind: 'agent' },
  { dp: 6000,   reward: '300 coins',               kind: 'coins', n: 300 },
  { dp: 7000,   reward: 'Common Dream Point Boost (+50%)', kind: 'dpboost' },
  { dp: 8500,   reward: 'Rare Scout',              kind: 'scout' },
  { dp: 10000,  reward: '30 gems',                 kind: 'gems', n: 30 },
  { dp: 11500,  reward: 'Legendary Physio',        kind: 'physio' },
  { dp: 13000,  reward: 'Rare Fitness Coach',      kind: 'coach' },
  { dp: 14500,  reward: 'Legendary Form Boost',    kind: 'form' },
  { dp: 16000,  reward: '400 coins',               kind: 'coins', n: 400 },
  { dp: 17500,  reward: 'Legendary Scout',         kind: 'scout' },
  { dp: 19500,  reward: 'Rare Dream Point Boost (+75%)', kind: 'dpboost' },
  { dp: 21500,  reward: 'Legendary Physio',        kind: 'physio' },
  { dp: 23500,  reward: '40 gems',                 kind: 'gems', n: 40 },
  { dp: 26000,  reward: 'Legendary Form Boost',    kind: 'form' },
  { dp: 28500,  reward: 'Rare Agent',              kind: 'agent' },
  { dp: 31000,  reward: 'Legendary Physio',        kind: 'physio' },
  { dp: 34000,  reward: '500 coins',               kind: 'coins', n: 500 },
  { dp: 37000,  reward: 'Rare Scout',              kind: 'scout' },
  { dp: 41000,  reward: 'Common Fitness Coach',    kind: 'coach' },
  { dp: 45000,  reward: 'Legendary Form Boost',    kind: 'form' },
  { dp: 50000,  reward: '50 gems',                 kind: 'gems', n: 50 },
  { dp: 55000,  reward: 'Legendary Physio',        kind: 'physio' },
  { dp: 62500,  reward: 'Special Player',          kind: 'player' },
  { dp: 70000,  reward: 'Common Special Coach',    kind: 'coach' },
  { dp: 80000,  reward: 'Legendary Scout',         kind: 'scout' },
  { dp: 90000,  reward: '750 coins',               kind: 'coins', n: 750 },
  { dp: 100000, reward: 'Legendary Dream Point Boost (+150%)', kind: 'dpboost' },
  { dp: 115000, reward: 'Special Player',          kind: 'player' },
  { dp: 130000, reward: 'Rare Fitness Coach',      kind: 'coach' },
  { dp: 145000, reward: '75 gems',                 kind: 'gems', n: 75 },
  { dp: 160000, reward: 'Rare Agent',              kind: 'agent' },
  { dp: 175000, reward: 'Special Player',          kind: 'player' },
  { dp: 200000, reward: 'Common Special Coach',    kind: 'coach' },
  { dp: 225000, reward: 'Rare Scout',              kind: 'scout' },
  { dp: 250000, reward: 'Special Player',          kind: 'player' }
];

/* Earning. A win pays a flat rate; watching an ad after it adds more. Boosts
   (Dream Time, and the +50/75/150% boost items the ladder itself hands out)
   multiply this, so the figures below are the unboosted floor. */
const DP_PER_WIN = 120;
const DP_PER_AD = 40;

/* Buying. The daily offers all resolve to one rate per currency, which is
   what makes them comparable at all. */
const DP_OFFERS = [
  { dp: 1000,  cost: 1500,  currency: 'coins' },
  { dp: 5000,  cost: 7500,  currency: 'coins' },
  { dp: 1000,  cost: 100,   currency: 'gems' },
  { dp: 5000,  cost: 500,   currency: 'gems' },
  { dp: 25000, cost: 24.99, currency: 'cad' }
];

/* Which of the four Classic players you get at each player rung is random;
   completing the ladder gets you all four regardless. */
const LADDER_NOTES = [
  { text: 'The ladder runs for ' + LADDER_DAYS + ' days and pays out 40 rewards, four of which are Special players.',
    src: 'Francisco' },
  { text: 'Which of the four players you get at each player rung is random. Finish the ladder and you get all four anyway.',
    src: 'Francisco' },
  { text: 'A win pays ' + DP_PER_WIN + ' DP, plus ' + DP_PER_AD + ' more for watching an ad after it.',
    src: 'Francisco' },
  { text: 'The ladder hands out three Dream Point Boosts along the way (+50% at 7,000, +75% at 19,500, +150% at 100,000), so the later rungs come faster than the earlier ones.',
    src: 'Prize Ladder screenshots' },
  { text: 'Screenshots are from another account, so the rungs are right but no progress figure on them is yours.',
    src: 'Carrick / Manchester Utd — 2,020 DP' }
];
