/* Coach prices, in gems.
   ==========================================================================

   `base` is the sticker price with no Training Centre discount. Francisco's
   Training Centre is 5★ = 30% off coaches, so the price he actually pays is
   derived, never typed in — upgrade the facility and one constant changes.

   Rounding is FLOOR, and Goalkeeping Common is the proof: base 15 at 30% off
   is 10.5 and Francisco reads 10, not 11. The Special prices all divide evenly
   (90→63, 240→168, 400→280) so they could never have settled it; the Fitness
   line (25→17, 75→52, 225→157) is consistent with the same rule.

   `src` records how much each row is actually worth trusting:
     'shot'      — read off a screenshot of Francisco's own account
     'shot-alt'  — read off a screenshot of a DIFFERENT account (a retbit.com
                   article). Prices there carry no discount note, so they are
                   probably base prices, but that account's facility level is
                   unknown and the card wording differs from the current game.
     'said'      — Francisco stated it directly as fact (not hedged), but no
                   screenshot of it exists yet
     'unknown'   — not collected yet

   Nothing derived from a non-'shot' row should be presented as fact. */

/* Held as an integer percentage on purpose: base * (1 - 0.30) evaluates to
   62.99999999999999 for a base of 90, which floors to 62 and contradicts the
   63 on Francisco's own screen. base * 70 / 100 is exact. */
const COACH_DISCOUNT_PCT = 30;        // Training Centre 5★
const COACH_DISCOUNT_SOURCE = 'Training Centre 5★ — read off the facility screen';

const COACHES = [
  /* Special coaches — the price line verified on Francisco's own account.
     Card reads "1 PLAYER · +N STAT INCREASE · M RANDOM STATS OF YOUR CHOICE".
     Special coaches always hit one player; only the stat spread grows. */
  { type: 'Special', rarity: 'Common',    base: 90,  players: 1, step: 1, statN: 2, pick: 'of your choice', chance: 5,  bt: 1.5, src: 'shot' },
  { type: 'Special', rarity: 'Rare',      base: 240, players: 1, step: 2, statN: 3, pick: 'of your choice', chance: 10, bt: 3,   src: 'shot' },
  { type: 'Special', rarity: 'Legendary', base: 400, players: 1, step: 3, statN: 4, pick: 'of your choice', chance: 20, bt: 5,   src: 'shot' },

  /* Core coaches. The x1 / x2 / x3 badge on the card is the NUMBER OF PLAYERS
     trained — Francisco confirmed a Legendary does three players at +9 each,
     which is what those badges were counting all along. Rarity therefore
     scales three things at once: players, stats hit, and points per stat. */
  { type: 'Fitness', rarity: 'Common',    base: 25,  players: 1, step: 1, statN: 1, pick: 'random', rndPlayers: true, chance: 5,  bt: 1.5, src: 'shot-alt' },
  { type: 'Fitness', rarity: 'Rare',      base: 75,  players: 2, step: 2, statN: 2, pick: 'random', rndPlayers: true, chance: 10, bt: 3,   src: 'shot-alt' },
  { type: 'Fitness', rarity: 'Legendary', base: 225, players: 3, step: 3, statN: 3, pick: 'random', rndPlayers: true, chance: 20, bt: 5,   src: 'shot-alt' },

  { type: 'Technical', rarity: 'Common',    base: 25,  players: 1, step: 1, statN: 1, pick: 'random', rndPlayers: true, chance: 5,  bt: 1.5, src: 'said',
    note: 'Francisco: Technical matches Fitness on both price and mechanic.' },
  { type: 'Technical', rarity: 'Rare',      base: 75,  players: 2, step: 2, statN: 2, pick: 'random', rndPlayers: true, chance: 10, bt: 3,   src: 'said',
    note: 'Francisco: Technical matches Fitness on both price and mechanic.' },
  { type: 'Technical', rarity: 'Legendary', base: 225, players: 3, step: 3, statN: 3, pick: 'random', rndPlayers: true, chance: 20, bt: 5,   src: 'said',
    note: 'Francisco: Technical matches Fitness on both price and mechanic.' },

  /* Corrected 2026-08-31 (his first figure of 17 was 15). All three reconcile
     at 30% off with flooring, and Common is what settles the rounding rule for
     the whole table: 15 × 0.70 = 10.5 and the game shows 10. */
  { type: 'Goalkeeping', rarity: 'Common',    base: 15,  players: 1, step: 1, statN: 1, pick: 'random', rndPlayers: true, chance: 5,  bt: 1.5, src: 'said',
    note: 'All three GK rows reconcile at 30% off (10 / 28 / 105); stated, not seen.' },
  { type: 'Goalkeeping', rarity: 'Rare',      base: 40,  players: 2, step: 2, statN: 2, pick: 'random', rndPlayers: true, chance: 10, bt: 3,   src: 'said',
    note: 'All three GK rows reconcile at 30% off (10 / 28 / 105); stated, not seen.' },
  { type: 'Goalkeeping', rarity: 'Legendary', base: 150, players: 3, step: 3, statN: 3, pick: 'random', rndPlayers: true, chance: 20, bt: 5,   src: 'said',
    note: 'All three GK rows reconcile at 30% off (10 / 28 / 105); stated, not seen.' }
];

/* Stat points delivered by one coach = players trained × stats hit × points
   per stat. This is the number the whole value comparison hangs on, and it is
   only knowable because Francisco confirmed a Legendary core coach gives three
   players +9 each rather than 9 points in total.

   Deliberately NOT folded in: breakthrough. It fires on a minority of uses and
   raises the per-stat step (1→1.5, 2→3, 3→5), so including it would quietly
   turn a hard number into an expected value. Francisco asked for it recorded,
   not calculated — it is shown as its own column. */
function coachPoints(c) { return c.players * c.statN * c.step; }

/* How coaching actually works. Every line below is quoted or paraphrased from
   a screenshot — no inference. The one thing these do NOT settle is whether
   "+3 STAT INCREASE / 3 RANDOM STATS" means 3 points in total or 3 points on
   each of 3 stats, which is exactly the number every value comparison needs. */
const COACH_RULES = [
  { rule: 'Regular cards are trained by the three core coaches (Fitness, Technical, Goalkeeping); special cards are trained by Special coaches. The two are not substitutes, so their prices are not comparable.',
    src: 'Coaches screen + Francisco' },
  { rule: 'Rarity scales three things at once for core coaches: how many players are trained (1 / 2 / 3), how many stats are hit, and how many points each stat gains. Special coaches always train one player.',
    src: 'Francisco + the x1 / x2 / x3 badge on the coach cards' },
  { rule: 'The players a core coach trains are RANDOM. A Legendary is the most efficient coach per point, but it spends those points on three cards you did not pick — efficiency, not aim.',
    src: 'Francisco — stated, not seen on screen' },
  { rule: 'Training is permanent, up to a player\'s maximum development potential.',
    src: 'Coaches screen header' },
  { rule: 'A player can gain at most +10 overall, and no individual stat can pass 100. Hit either ceiling and the increase is smaller than advertised.',
    src: 'Footnote on Francisco\'s Coaches screen' },
  { rule: 'When a ceiling is hit, the remaining increases are spread equally across the other awarded stats rather than being lost.',
    src: 'Footnote on Francisco\'s Coaches screen' },
  { rule: 'Breakthrough (5% / 10% / 20% by rarity) raises the points per stat when it fires: Common 1 → 1.5, Rare 2 → 3, Legendary 3 → 5. It is shown but left out of the value maths, so the per-point figures are the floor rather than an average.',
    src: 'Francisco — stated, not seen on screen' },
  { rule: 'A player near their +10 ceiling gains less than the table says: the ceiling is measured in overall rating, while the points here are raw stat points — different units, so they are not netted off.',
    src: 'Footnote on the Coaches screen' },
  { rule: 'Special coaches can train all statistics; core coaches are limited to their own group.',
    src: 'Francisco\'s Coaches screen' }
];

/* Bought from the Coaches screen, applied to one player. Counts Francisco
   currently holds, off his own screenshot — inventory, not price. */
const COACH_STOCK = { Fitness: 43, Technical: 17, Goalkeeping: 32 };
