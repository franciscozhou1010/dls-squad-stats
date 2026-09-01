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

/* The season that is running NOW. The rungs below, however, were read off the
   PREVIOUS season's ladder (Classic WC Players — Bergkamp, Desailly, Rivaldo,
   Cannavaro). The shape of a ladder almost certainly repeats season to season,
   but no threshold here has been checked against this one, and that is the
   single biggest reason to distrust this page right now. */
const LADDER_SEASON = {
  players: ['Essien', 'Berbatov', 'Andy Cole', 'Petit'],
  name: null,                    // not captured yet
  rungsFrom: 'Classic WC Players (previous season)'
};

const LADDER_EVENT = 'Prize Ladder';
const LADDER_TARGET = 250000;
const LADDER_DAYS = 90;

/* Three early rungs are already claimed in the screenshots, so their rewards
   are visible but their point thresholds are not. They are listed with a null
   threshold rather than a guessed one — the count still comes to the 40 total
   Francisco quoted, which is the check that nothing is missing. */
const LADDER = [
  { dp: null,   reward: 'Rare Dream Point Boost',  kind: 'dpboost', icon: 'dpboost', rar: 'rare' },
  { dp: null,   reward: '250 coins',               kind: 'coins', n: 250, icon: 'coins' },
  { dp: null,   reward: 'Common Fitness Coach',    kind: 'coach', icon: 'fitness', rar: 'common' },
  { dp: 3000,   reward: '25 gems',                 kind: 'gems', n: 25, icon: 'gems' },
  { dp: 4000,   reward: 'Rare Special Coach',      kind: 'coach', icon: 'special', rar: 'rare' },
  { dp: 5000,   reward: 'Rare Agent',              kind: 'agent', icon: 'agent', rar: 'rare' },
  { dp: 6000,   reward: '300 coins',               kind: 'coins', n: 300, icon: 'coins' },
  { dp: 7000,   reward: 'Common Dream Point Boost (+50%)', kind: 'dpboost', icon: 'dpboost', rar: 'common' },
  { dp: 8500,   reward: 'Rare Scout',              kind: 'scout', icon: 'scout', rar: 'rare' },
  { dp: 10000,  reward: '30 gems',                 kind: 'gems', n: 30, icon: 'gems' },
  { dp: 11500,  reward: 'Legendary Physio',        kind: 'physio', icon: 'physio', rar: 'legendary' },
  { dp: 13000,  reward: 'Rare Fitness Coach',      kind: 'coach', icon: 'fitness', rar: 'rare' },
  { dp: 14500,  reward: 'Legendary Form Boost',    kind: 'form', icon: 'form', rar: 'legendary' },
  { dp: 16000,  reward: '400 coins',               kind: 'coins', n: 400, icon: 'coins' },
  { dp: 17500,  reward: 'Legendary Scout',         kind: 'scout', icon: 'scout', rar: 'legendary' },
  { dp: 19500,  reward: 'Rare Dream Point Boost (+75%)', kind: 'dpboost', icon: 'dpboost', rar: 'rare' },
  { dp: 21500,  reward: 'Legendary Physio',        kind: 'physio', icon: 'physio', rar: 'legendary' },
  { dp: 23500,  reward: '40 gems',                 kind: 'gems', n: 40, icon: 'gems' },
  { dp: 26000,  reward: 'Legendary Form Boost',    kind: 'form', icon: 'form', rar: 'legendary' },
  { dp: 28500,  reward: 'Rare Agent',              kind: 'agent', icon: 'agent', rar: 'rare' },
  { dp: 31000,  reward: 'Legendary Physio',        kind: 'physio', icon: 'physio', rar: 'legendary' },
  { dp: 34000,  reward: '500 coins',               kind: 'coins', n: 500, icon: 'coins' },
  { dp: 37000,  reward: 'Rare Scout',              kind: 'scout', icon: 'scout', rar: 'rare' },
  { dp: 41000,  reward: 'Common Fitness Coach',    kind: 'coach', icon: 'fitness', rar: 'common' },
  { dp: 45000,  reward: 'Legendary Form Boost',    kind: 'form', icon: 'form', rar: 'legendary' },
  { dp: 50000,  reward: '50 gems',                 kind: 'gems', n: 50, icon: 'gems' },
  { dp: 55000,  reward: 'Legendary Physio',        kind: 'physio', icon: 'physio', rar: 'legendary' },
  { dp: 62500,  reward: 'Special Player',          kind: 'player', icon: 'player', rar: 'legendary' },
  { dp: 70000,  reward: 'Common Special Coach',    kind: 'coach', icon: 'special', rar: 'common' },
  { dp: 80000,  reward: 'Legendary Scout',         kind: 'scout', icon: 'scout', rar: 'legendary' },
  { dp: 90000,  reward: '750 coins',               kind: 'coins', n: 750, icon: 'coins' },
  { dp: 100000, reward: 'Legendary Dream Point Boost (+150%)', kind: 'dpboost', icon: 'dpboost', rar: 'legendary' },
  { dp: 115000, reward: 'Special Player',          kind: 'player', icon: 'player', rar: 'legendary' },
  { dp: 130000, reward: 'Rare Fitness Coach',      kind: 'coach', icon: 'fitness', rar: 'rare' },
  { dp: 145000, reward: '75 gems',                 kind: 'gems', n: 75, icon: 'gems' },
  { dp: 160000, reward: 'Rare Agent',              kind: 'agent', icon: 'agent', rar: 'rare' },
  { dp: 175000, reward: 'Special Player',          kind: 'player', icon: 'player', rar: 'legendary' },
  { dp: 200000, reward: 'Common Special Coach',    kind: 'coach', icon: 'special', rar: 'common' },
  { dp: 225000, reward: 'Rare Scout',              kind: 'scout', icon: 'scout', rar: 'rare' },
  { dp: 250000, reward: 'Special Player',          kind: 'player', icon: 'player', rar: 'legendary' }
];

/* Earning. A win pays a flat rate; watching an ad after it adds more. Boosts
   (Dream Time, and the +50/75/150% boost items the ladder itself hands out)
   multiply this, so the figures below are the unboosted floor. */
const DP_PER_WIN = 120;
const DP_PER_AD = 40;

/* Dream Point boosts. Crucially these last a FIXED NUMBER OF GAMES rather
   than a stretch of time, which is what makes them worth so little: a
   Legendary boost is the biggest one in the game and still only covers eight
   matches. They are buyable with gems, but Francisco says nobody does that —
   they come from the season pass, the ladder itself, and challenges. */
const DP_BOOSTS = [
  { rarity: 'Common',    pct: 50,  games: 3 },
  { rarity: 'Rare',      pct: 75,  games: 5 },
  { rarity: 'Legendary', pct: 150, games: 8 }
];

/* Extra DP a boost is worth, over playing the same games unboosted. */
function boostWorth(b, perWin) { return perWin * (b.pct / 100) * b.games; }

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
  { text: 'Dream Point boosts last a set number of games, not a stretch of time: +50% for 3, +75% for 5, +150% for 8. That is why they barely move a 250,000 target: the ones this ladder hands out are worth '
      + LADDER.filter(function (r) { return r.icon === 'dpboost'; }).reduce(function (a, r) {
          var b = DP_BOOSTS.find(function (x) { return x.rarity.toLowerCase() === r.rar; });
          return a + (b ? boostWorth(b, DP_PER_WIN + DP_PER_AD) : 0);
        }, 0).toLocaleString('en-CA')
      + ' DP between them, about one percent of the way.',
    src: 'Francisco + Prize Ladder screenshots' },
  { text: 'Boosts can be bought with gems, but nobody does. They come from the season pass, this ladder, and challenges.',
    src: 'Francisco' },
  { text: 'Screenshots are from another account, so no progress figure on them is yours.',
    src: 'Carrick / Manchester Utd — 2,020 DP' }
];
