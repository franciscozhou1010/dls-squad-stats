/* Real-money packs, and the unit prices needed to value them.
   ==========================================================================

   A pack is worth what its contents would cost you to buy separately. That
   makes pack value ACCOUNT-SPECIFIC in a way the gem and coin tiers are not:
   the coaches inside are priced at Francisco's discounted rate, so the better
   his Training Centre gets, the cheaper the alternative becomes and the worse
   every coach pack looks.

   Contents were read off store screenshots. Names, prices and the discount
   badges are text and are reliable; the CONTENTS are icon + colour + count,
   and the colour is what encodes rarity (silver = Common, blue = Rare, gold =
   Legendary). That reading is the weak link in this file — every item carries
   `sure: false` where the rarity was inferred from a colour rather than read.

   Icon vocabulary, from the coach and agent screens:
     glove = Goalkeeping coach     heart = Fitness coach
     cone  = Technical coach       star  = Special coach
     person+ = Agent               binoculars = Scout
     kit   = Physio                chevrons (+1/+2/+3) = Form Boost   */

const PACK_CURRENCY = 'CAD';
const PACK_CHECKED = '2026-08-30';

/* Gem prices for pack contents that are not coaches. Coaches resolve against
   data/coaches.js instead, so they never have to be restated here. */
const ITEM_PRICES = {
  'Agent Common':      { gems: 38,   sure: true,
                         note: 'Read off the Agents screen: 38 with 40 struck through, 5% facility discount.' },
  'Agent Rare':        { gems: null, sure: false, note: 'Hidden behind the USE button in the screenshot.' },
  'Agent Legendary':   { gems: 356,  sure: false,
                         note: 'Francisco recalls 356. Does not reconcile: agents get 5% off, so 356 implies a base near 375, not the 480 he guessed.' },
  /* Scouts, from Francisco 2026-09-04: base 75 / 250 / 650, and the scout
     facility tops out at 15% off. Stored net like every other row here, with the
     base kept in the note so the arithmetic can be rechecked. Flooring follows
     the rule coaches.js settled — 250 x 0.85 and 650 x 0.85 both land on .5, and
     the game rounds those down (15 x 0.70 = 10.5 shows as 10). */
  'Scout Common':      { gems: 63,  sure: true,
                         note: 'Base 75, less the 15% scout-facility discount.' },
  'Scout Rare':        { gems: 212, sure: true,
                         note: 'Base 250, less 15%. 212.5 floored, per the coaches.js rounding rule.' },
  'Scout Legendary':   { gems: 552, sure: true,
                         note: 'Base 650, less 15%. 552.5 floored. The dearest single item on this site.' },
  'Physio Rare':       { gems: null, sure: false, note: 'Not collected.' },
  'Physio Legendary':  { gems: null, sure: false, note: 'Not collected.' },
  'Form Boost Common': { gems: null, sure: false, note: 'Not collected.' },
  'Form Boost Rare':   { gems: null, sure: false, note: 'Not collected.' },
  'Form Boost Legendary': { gems: null, sure: false, note: 'Not collected.' },

  /* Dream Point Boosts, from Francisco 2026-09-04. These were previously treated
     as unpriceable on the grounds that a percentage multiplier is not a quantity
     of anything — which was wrong. What the boost DOES is a multiplier, but the
     boost ITSELF is an item the store sells for gems, and this whole site prices
     an item by what it would cost you to buy separately. Whether these figures
     are before or after a facility discount was not stated; a 15% swing on them
     moves less than 1% of any total they appear in. */
  'DP Boost Common':    { gems: 25,  sure: false,
                          note: 'Stated by Francisco. Unclear whether this is the base price or the discounted one.' },
  'DP Boost Rare':      { gems: 35,  sure: false,
                          note: 'Stated by Francisco. Unclear whether this is the base price or the discounted one.' },
  'DP Boost Legendary': { gems: 125, sure: false,
                          note: 'Stated by Francisco. Unclear whether this is the base price or the discounted one.' }
};

/* 5,000 Dream Points sells for either C$9.99 or 500 gems, which pins the
   gem-to-DP rate without needing a separate price list. */
const DP_PER_GEM = 10;

/* kind: 'gems' | 'coins' | 'dp' | 'coach' | 'item'
   sure: false means the rarity was inferred from an icon colour. */
const PACKS = [
  { name: 'Promo Pack', price: 69.99, badge: '20% off', where: 'Highlights',
    items: [
      { kind: 'gems', n: 2000, sure: true },
      { kind: 'coins', n: 6000, sure: true },
      { kind: 'coach', type: 'Technical', rarity: 'Legendary', n: 1, sure: true }
    ] },

  { name: 'Large Coach Pack', price: 9.99, badge: '44% off', where: 'Packs',
    items: [
      { kind: 'coach', type: 'Goalkeeping', rarity: 'Rare', n: 1, sure: false },
      { kind: 'coach', type: 'Fitness', rarity: 'Rare', n: 2, sure: false },
      { kind: 'coach', type: 'Technical', rarity: 'Legendary', n: 2, sure: false }
    ] },

  { name: 'Performance Pack', price: 34.99, badge: '2× value', where: 'Packs',
    items: [
      { kind: 'coach', type: 'Special', rarity: 'Common', n: 5, sure: false },
      { kind: 'coach', type: 'Special', rarity: 'Rare', n: 4, sure: false },
      { kind: 'coach', type: 'Special', rarity: 'Legendary', n: 3, sure: false }
    ] },

  { name: 'Performance Pack', price: 14.99, badge: '59% off', where: 'Packs',
    items: [
      { kind: 'coach', type: 'Technical', rarity: 'Legendary', n: 2, sure: false },
      { kind: 'item', key: 'Agent Legendary', n: 2, sure: false }
    ] },

  { name: 'Large Agent Pack', price: 17.99, badge: '48% off', where: 'Packs',
    items: [
      { kind: 'item', key: 'Agent Legendary', n: 3, sure: false }
    ] },

  { name: 'Squad Boost Pack', price: 4.99, badge: '3× value', where: 'Packs',
    items: [
      { kind: 'item', key: 'Form Boost Common', n: 20, sure: false },
      { kind: 'item', key: 'Form Boost Rare', n: 15, sure: false },
      { kind: 'item', key: 'Physio Rare', n: 10, sure: false },
      { kind: 'item', key: 'Form Boost Legendary', n: 8, sure: false },
      { kind: 'item', key: 'Physio Legendary', n: 8, sure: false }
    ] },

  { name: 'Dream Points', price: 9.99, badge: null, where: 'Highlights',
    items: [ { kind: 'dp', n: 5000, sure: true } ],
    alsoGems: 500 },

  /* Not an item bundle: it raises stadium capacity and the per-match coin
     bonus. Worth is a payback period, not a bag of goods, so it is listed
     for completeness and deliberately not scored. */
  { name: 'Champions Arena', price: 34.99, badge: null, where: 'Packs',
    unscored: 'Raises stadium capacity 92,632 → 110,000 and the match bonus 52 → 62 coins. '
      + 'That is an income change, not a bag of items — it pays back over matches played, '
      + 'which needs a match count we do not track yet.' }
];
