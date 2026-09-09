/* Season Pass — a 21-tier reward track, not a bag of goods.
   ==========================================================================

   Read off the Sunny Season pass. Francisco: the prizes are the SAME every
   season, so this file is a standing reference rather than a snapshot of one
   season — which is why the season name and its countdown are deliberately not
   recorded. Nothing here expires when Sunny Season does.

   THE TWO PRICES BUY THE SAME 21 PRIZES.
   --------------------------------------------------------------------------
   C$4.99 releases one tier every 12 hours. C$14.99 removes that gate. By the
   end of the season both have handed over an identical track — confirmed by
   Francisco, and the reason the scorer values the track ONCE and treats the
   C$10 difference as buying time rather than goods.

   The gate is tighter than it sounds — the tiers-times-hours arithmetic lands
   exactly on the season length, so buying late puts the tail out of reach at
   any amount of play. The page computes that; the reasoning is in the vault
   note "Season Pass".

   WHAT IS BEING VALUED
   --------------------------------------------------------------------------
   Only the paid row. The free row arrives whether or not you pay, so counting
   it would credit the purchase with rewards it did not buy. The free row is
   listed for context and never enters a total.

   Every paid tier is a CHOOSE — one of two. Value is therefore the better of
   the two, which is a MAX and not a sum, and which makes the track worth less
   than the sum of everything printed on it.

   WHY THE TOTAL IS A FLOOR, NOT A TOTAL
   --------------------------------------------------------------------------
   Some tiers offer two items this site has no price for, and others offer one
   priced and one unpriced. The scorer takes the best PRICEABLE option at each
   tier and adds them up, which is a genuine lower bound: every missing price
   can only push the number up. The counts are computed on the page rather than
   stated here, because they move whenever a price is filled in — as three of
   them did on 2026-09-04, when scout and Dream Point Boost prices arrived and
   the floor roughly doubled.

   That is a different rule from the Packs tab, and deliberately so. A pack is
   one purchase — pricing half its contents and calling it a verdict hides the
   other half, so packs.js refuses to score partially. A track is 21 separate
   prizes, so a partial sum really is a floor and says so on its face.

   PASS_SKIP_GEMS feeds a cross-check that has already failed once. No
   percentage is restated in this file — the page computes the gap AND its
   direction and words itself accordingly, so the two cannot disagree. Why the
   check is weak, and the two competing readings of its failure: vault note
   "Season Pass". */

const PASS_CURRENCY = 'CAD';
const PASS_CHECKED = '2026-09-04';

const PASS_SEASON_DAYS = 10;
const PASS_GATE_HOURS = 12;
/* The publisher's own asking price for one tier — NOT a reward value. Seen
   once, between tiers 6 and 7, and extrapolated to the whole track by the page.
   Used only as a cross-check on a number derived a different way. */
const PASS_SKIP_GEMS = 75;

/* How fast the track moves, from Francisco. Held here rather than typed into a
   sentence on the page, so the page can state matches-per-tier as something it
   computed from his figures rather than as something he said. */
const PASS_SP = { perMatch: 150, perTier: 400 };

/* At a coins-or-gems fork the CAD ranking is wrong for this account, and the
   page does NOT fold that in: it prints the exchange rate the game is offering
   and leaves the choice, because the rate is a fact and the valuation is a
   judgement. Ranking stays on store price — the site's method everywhere else —
   so the disagreement is shown rather than hidden.

   Why gems win here (both currencies farm, gems an order of magnitude slower;
   what the gems are ultimately for): vault note "Gems beat coins". The two
   strings below are what the page prints. */
const PASS_PREFERENCE = {
  takeAtForks: 'gems',
  why: 'Both can be farmed, but gems arrive about an order of magnitude slower, '
     + 'and coins are the one thing this account is not short of.',
  goal: 'Gems go to gold agents and Special coaches — finishing special players, '
      + 'and banking for the next special-player event.',

  /* Items worth NOTHING to this account whatever they cost — which is a
     different claim from "unpriced", and has to be, because these are among the
     dearest things the site prices. Held as data so the list can grow without
     anyone editing the renderer, and so the page can show both totals rather
     than quietly picking one.

     Deliberately NOT in this list: core coaches. A maxed squad has no use for
     another keeper coach either, but Francisco's call was to leave the price
     ranking alone there — the tier is worth a couple of dollars and the ranking
     is right for anyone still building. Scouts are two orders of magnitude more
     of the total, which is what earns them the exception. */
  worthless: ['Scout Common', 'Scout Rare', 'Scout Legendary'],
  worthlessWhy: 'A scout surfaces two random players you can then sign with coins '
              + 'at a discount — worth exactly nothing to a squad that already has '
              + 'the players it wants.'
};

/* Keys the track uses that packs.js has no ITEM_PRICES entry for at all. An
   absent key prices as null, which is exactly what a misspelt key does, so the
   ones we know about are listed and anything else is shouted about in the
   console at boot.

   Empty since 2026-09-08: Physio Common was the only entry, and it now has a
   real price. The list stays because it is the escape hatch for a reward that
   exists on the track and nowhere else, not because it happens to be needed. */
const PASS_KEYS_NOT_IN_PACKS = [];

const PASS_EDITIONS = [
  { name: 'Season Pass', price: 4.99, gated: true,
    perks: [] },
  { name: 'Premium Season Pass', price: 14.99, gated: false,
    /* Rendered on the page rather than retyped there, so the two cannot drift.
       The percentage boosts are deliberately NOT in this list: the store screen
       prints them inside its premium column, but Francisco reports the only
       difference is the gate. Until that is settled they are an open question
       on the page, not a perk claimed for either edition. */
    perks: ['a gold profile picture and name tag', '5 clan gifts instead of 2'] }
];

/* Extra daily and weekly challenges, unlocked by activating the pass. These
   are a RATE, not a bundle: what they are worth depends on how much you play,
   so they are shown per day and per week and never folded into the headline.
   Figures from Francisco. The daily figure is a best day, not an average — the
   completion ladder climbs from 10 gems on day 1 to 22 on day 7. */
const PASS_EXTRAS = {
  weeklyGems: 70,        // 50 from one challenge + 20 for clearing the week
  dailyGemsMax: 29,      // 7 from one challenge + 22 at the top of the ladder
  dailyLadder: [10, 12, 14, 16, 18, 20, 22]
};

/* item kinds match store.html's priceItem(): gems | coins | coach | item.
   'boost' is this file's own, and it is kept as its own kind ONLY so the label
   can carry the percentage — "Legendary DP Boost +150%" says more than
   "1 x DP Boost Legendary". It resolves against ITEM_PRICES like any other item.

   It used to be treated as unpriceable, on the argument that a percentage
   multiplier is not a quantity of anything. That was wrong, and worth recording
   as wrong: what the boost DOES is a multiplier, but the boost ITSELF is an item
   the store sells for gems, and this site prices an item by what it would cost
   to buy separately. Champions Arena over in packs.js really is unpriceable —
   it changes match income and is not sold as an object — but that is not the
   same case. Corrected 2026-09-04 when the prices arrived. */
const PASS_TRACK = [
  { tier: 1,  paid: [{ kind: 'coins', n: 500 }, { kind: 'gems', n: 20 }],
              free: { kind: 'coins', n: 20 } },
  { tier: 2,  paid: [{ kind: 'gems', n: 25 }, { kind: 'boost', of: 'DP', pct: 150, rarity: 'Legendary' }],
              free: { kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' } },
  { tier: 3,  paid: [{ kind: 'coins', n: 150 }, { kind: 'item', key: 'Physio Legendary', n: 1 }],
              free: { kind: 'item', key: 'Scout Common', n: 1 } },
  { tier: 4,  paid: [{ kind: 'item', key: 'Form Boost Legendary', n: 1 }, { kind: 'item', key: 'Physio Legendary', n: 1 }],
              free: { kind: 'coins', n: 30 } },
  { tier: 5,  paid: [{ kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' }, { kind: 'item', key: 'Scout Rare', n: 1 }],
              free: { kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' } },
  { tier: 6,  paid: [{ kind: 'item', key: 'Form Boost Legendary', n: 1 }, { kind: 'gems', n: 10 }],
              free: { kind: 'coach', type: 'Fitness', rarity: 'Common', n: 1 } },
  { tier: 7,  paid: [{ kind: 'coach', type: 'Fitness', rarity: 'Rare', n: 1 }, { kind: 'coach', type: 'Technical', rarity: 'Rare', n: 1 }],
              free: { kind: 'coins', n: 40 } },
  { tier: 8,  paid: [{ kind: 'gems', n: 30 }, { kind: 'coins', n: 750 }],
              free: { kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' } },
  { tier: 9,  paid: [{ kind: 'item', key: 'Physio Legendary', n: 1 }, { kind: 'item', key: 'Form Boost Legendary', n: 1 }],
              free: { kind: 'item', key: 'Physio Common', n: 1 } },
  { tier: 10, paid: [{ kind: 'boost', of: 'DP', pct: 150, rarity: 'Legendary' }, { kind: 'item', key: 'Scout Legendary', n: 1 }],
              free: { kind: 'coins', n: 50 } },
  { tier: 11, paid: [{ kind: 'coins', n: 1000 }, { kind: 'gems', n: 40 }],
              free: { kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' } },
  { tier: 12, paid: [{ kind: 'boost', of: 'DP', pct: 150, rarity: 'Legendary' }, { kind: 'coach', type: 'Special', rarity: 'Rare', n: 1 }],
              free: { kind: 'coach', type: 'Technical', rarity: 'Common', n: 1 } },
  { tier: 13, paid: [{ kind: 'coach', type: 'Goalkeeping', rarity: 'Legendary', n: 1 }, { kind: 'coins', n: 1000 }],
              free: { kind: 'coins', n: 100 } },
  /* The tier Francisco singled out. 125 gems is C$2.71; the Legendary Agent
     prices at 356 gems — C$7.71 — so the engine picks the agent, which is also
     what he picks and for a reason no price captures: gold agents are what pull
     special players during special-player events. Rare agents, he says, are
     useless, which is worth knowing because a Rare Agent is the free row's
     final prize. */
  { tier: 14, paid: [{ kind: 'gems', n: 125 }, { kind: 'item', key: 'Agent Legendary', n: 1 }],
              free: { kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' } },
  { tier: 15, paid: [{ kind: 'item', key: 'Scout Rare', n: 1 }, { kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' }],
              free: { kind: 'item', key: 'Form Boost Legendary', n: 1 } },
  { tier: 16, paid: [{ kind: 'coins', n: 100 }, { kind: 'item', key: 'Form Boost Legendary', n: 1 }],
              free: { kind: 'coins', n: 150 } },
  { tier: 17, paid: [{ kind: 'coach', type: 'Fitness', rarity: 'Legendary', n: 1 }, { kind: 'coach', type: 'Technical', rarity: 'Legendary', n: 1 }],
              free: { kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' } },
  { tier: 18, paid: [{ kind: 'gems', n: 50 }, { kind: 'coins', n: 1250 }],
              free: { kind: 'coach', type: 'Goalkeeping', rarity: 'Common', n: 1 } },
  { tier: 19, paid: [{ kind: 'coach', type: 'Special', rarity: 'Common', n: 1 }, { kind: 'item', key: 'Scout Legendary', n: 1 }],
              free: { kind: 'coins', n: 250 } },
  { tier: 20, paid: [{ kind: 'item', key: 'Form Boost Legendary', n: 1 }, { kind: 'item', key: 'Physio Legendary', n: 1 }],
              free: { kind: 'boost', of: 'DP', pct: 75, rarity: 'Rare' } },
  { tier: 21, paid: [{ kind: 'coach', type: 'Fitness', rarity: 'Legendary', n: 1 }, { kind: 'coach', type: 'Technical', rarity: 'Legendary', n: 1 }],
              free: { kind: 'item', key: 'Agent Rare', n: 1 } }
];

/* What the store screen and the pass screen do not settle. Each says which way
   the truth would move the verdict. */
const PASS_UNKNOWNS = [
  { q: 'Do the four percentage boosts come with C$4.99, or only with C$14.99?',
    why: 'The store screen prints XP +33%, SP +25% and C +25% inside the PREMIUM column, and lists '
       + '“no time-locked tiers” beside them as a separate line — so the screen itself says the C$10 '
       + 'buys more than time. The in-game pass screen shows a fourth boost, DP +50%, and a single '
       + 'Activate button. If the boosts are premium-only, “the extra C$10 buys nothing but speed” '
       + 'is wrong.',
    direction: 'unknown' },

  { q: 'Does the paid tier replace the free tier, or arrive on top of it?',
    why: 'The pass screen says “upgrade your prizes”, which reads like a replacement, but both rows '
       + 'carry their own claim state. If it replaces, subtract the free row: at most about C$2 of '
       + 'priceable content, which does not move the verdict.',
    direction: 'worse' },

  { q: 'Does the 12-hour gate start with tier 1 already open?',
    why: 'It is the difference between 20 gaps and 21. At 20 the last tier unlocks exactly as the '
       + 'season ends; at 21 it unlocks half a day after the season is over and C$4.99 can never '
       + 'deliver the full track.',
    direction: 'unknown' },

  { q: 'Physio and Form Boost prices are one day old, and one of them is remembered.',
    why: 'Both classes were unpriced until 2026-09-08, and the eight tiers they blocked are the '
       + 'reason this figure was published as a floor. Physio Common and Rare were read off the '
       + 'screen; Legendary Physio and all three Form Boosts are Francisco stating a number rather '
       + 'than a capture. They are small — the eight tiers come to about C$6 together — so an error '
       + 'in them moves the headline very little, which is also why the old floor was close.',
    direction: 'unknown' },

  { q: 'Is 75 gems the price to skip EVERY tier, or only the one it was seen on?',
    why: 'It was read once, between tiers 6 and 7. The page multiplies it by 21 to build its '
       + 'cross-check, which is an extrapolation from a single observation and is the likeliest '
       + 'reason that cross-check now disagrees with the floor.',
    direction: 'unknown' },

  { q: 'Are the Dream Point Boost prices before or after a facility discount?',
    why: 'Scouts were given as a base price plus a 15% facility discount; the boost figures came '
       + 'with neither. A 15% swing on them moves less than 1% of the total, so it is recorded '
       + 'rather than chased.',
    direction: 'unknown' }
];
