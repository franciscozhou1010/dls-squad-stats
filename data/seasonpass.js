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

   The gate is tighter than it sounds. 21 tiers with a 12-hour gate is 20 gaps,
   240 hours, exactly the 10-day season. Buy on day one and play to the last
   hour and C$4.99 delivers everything with zero days to spare; buy late and
   the tail of the track is unreachable at any amount of play. That is the real
   question the C$10 answers, and it is a question about WHEN you buy.

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
   Six of the 21 tiers offer two items this site has no price for, and six more
   offer one priced and one unpriced. The scorer takes the best PRICEABLE
   option at each tier and adds them up, which is a genuine lower bound: every
   missing price can only push the number up.

   That is a different rule from the Packs tab, and deliberately so. A pack is
   one purchase — pricing half its contents and calling it a verdict hides the
   other half, so packs.js refuses to score partially. A track is 21 separate
   prizes, so a partial sum really is a floor and says so on its face.

   Weak cross-check, not a confirmation: the game will sell you a skipped tier
   for 75 gems, so it prices the whole 21-tier track at 1,575 gems. The floor
   computed from the contents lands near that by a completely different route —
   but the skip price is what the publisher charges for NOT WAITING, a price on
   time rather than on prizes, and the closeness partly survives because the
   floor is incomplete. Fill in the missing prices and the two move apart. The
   percentage is computed on the page, never restated here, so the two cannot
   disagree. */

const PASS_CURRENCY = 'CAD';
const PASS_CHECKED = '2026-09-04';

const PASS_SEASON_DAYS = 10;
const PASS_GATE_HOURS = 12;
/* What the game charges to unlock one tier without playing for it. Francisco:
   "no one will pay for that" — which is the point. It is not a reward value,
   it is the publisher's own asking price for a tier, and it is only used on
   the page as a cross-check on a number derived a different way. */
const PASS_SKIP_GEMS = 75;

/* How fast the track moves, from Francisco. Held here rather than typed into a
   sentence on the page, so the page can state matches-per-tier as something it
   computed from his figures rather than as something he said. */
const PASS_SP = { perMatch: 150, perTier: 400 };

/* Keys the track uses that packs.js has no ITEM_PRICES entry for at all. An
   absent key prices as null, which is exactly what a misspelt key does, so the
   ones we know about are listed and anything else is shouted about in the
   console at boot. Physio Common appears only on the free row, which never
   enters a total. */
const PASS_KEYS_NOT_IN_PACKS = ['Physio Common'];

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
   'boost' is this file's own: a percentage multiplier on what you earn, not a
   quantity of anything. It has no price and cannot get one — the same reason
   packs.js leaves Champions Arena unscored. */
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

  { q: 'Six tiers offer two items with no price on this site.',
    why: 'Scouts, Physios and Form Boosts have never been priced, and Dream Point Boosts are a '
       + 'percentage rather than a quantity so they cannot be. The floor skips those tiers entirely, '
       + 'so the real figure is higher than the one shown.',
    direction: 'better' }
];
