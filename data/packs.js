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
  'Scout Common':      { gems: null, sure: false, note: 'Not collected.' },
  'Scout Rare':        { gems: null, sure: false, note: 'Not collected.' },
  'Scout Legendary':   { gems: null, sure: false, note: 'Not collected.' },
  'Physio Rare':       { gems: null, sure: false, note: 'Not collected.' },
  'Physio Legendary':  { gems: null, sure: false, note: 'Not collected.' },
  'Form Boost Common': { gems: null, sure: false, note: 'Not collected.' },
  'Form Boost Rare':   { gems: null, sure: false, note: 'Not collected.' },
  'Form Boost Legendary': { gems: null, sure: false, note: 'Not collected.' }
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
