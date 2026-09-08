/* Real-money packs, and the unit prices needed to value them.
   ==========================================================================

   A pack is worth what its contents would cost you to buy separately, which
   makes pack value ACCOUNT-SPECIFIC in a way the gem and coin tiers are not:
   coaches resolve through Francisco's own Training Centre discount. Why that
   makes the scoring self-defeating as the account improves — and why that is
   the real economics rather than a scoring artefact: vault note "Packs".

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
   data/coaches.js instead, so they never have to be restated here.

   Stored as BASE price plus which facility discounts it, never as the net figure
   — see data/facilities.js. Before 2026-09-08 these were net values with the
   base kept in a note, which meant every scout and agent price on this site was
   silently Francisco's rather than the reader's, and no amount of reading the
   page revealed it. `disc: null` means no facility touches this class. */
const ITEM_PRICES = {
  'Agent Common':      { base: 40,  disc: 'agent', sure: true,
                         note: 'Read off the Agents screen: 38 with 40 struck through, and the card\'s own line reads "5% Facility Discount".' },
  'Agent Rare':        { base: null, disc: 'agent', sure: false,
                         note: 'Hidden behind the USE button in the screenshot — this account owns seven.' },
  'Agent Legendary':   { base: 375, disc: 'agent', sure: false,
                         note: 'Base confirmed by Francisco 2026-09-08. It reconciles exactly: 375 x 0.95 = 356.25, floored to 356, and 375 is the only integer that lands there. Still his recollection rather than a screen, so it stays flagged.' },

  /* Scout bases recovered 2026-09-08 by running the paid prices backwards
     through the confirmed 15% Recruitment Centre discount. Each base is forced,
     not chosen: under floor rounding, 75 is the only integer that lands on 63,
     250 the only one on 212, 650 the only one on 552. */
  'Scout Common':      { base: 75,  disc: 'scout', sure: true,
                         note: 'Base 75. The scout screen prints a separate 10% PLAYER discount — that is what the scout does, not what it costs.' },
  'Scout Rare':        { base: 250, disc: 'scout', sure: true,
                         note: 'Base 250. 212.5 floored, per the coaches.js rounding rule.' },
  'Scout Legendary':   { base: 650, disc: 'scout', sure: true,
                         note: 'Base 650. 552.5 floored. The dearest single item on this site.' },

  /* Physios carry the deepest facility discount in the game (40% at Medical 5),
     which is worth knowing before the price is ever captured: read on this
     account it will be a discounted figure, and the base has to be recovered
     from it the way the scout bases were. */
  'Physio Rare':       { base: null, disc: 'physio', sure: false, note: 'Not collected.' },
  'Physio Legendary':  { base: null, disc: 'physio', sure: false, note: 'Not collected.' },

  'Form Boost Common': { base: null, disc: null, sure: false, note: 'Not collected. No facility discounts form boosts, so this price will be universal once it is.' },
  'Form Boost Rare':   { base: null, disc: null, sure: false, note: 'Not collected. No facility discounts form boosts.' },
  'Form Boost Legendary': { base: null, disc: null, sure: false, note: 'Not collected. No facility discounts form boosts.' },

  /* Dream Point Boosts, from Francisco 2026-09-04. These once carried a caveat
     that nobody knew whether they were quoted before or after a discount.
     Settled 2026-09-08: no facility discounts a boost, so these ARE the prices,
     for everybody. They stay flagged only because they are stated rather than
     read off a screen. */
  'DP Boost Common':    { base: 25,  disc: null, sure: false,
                          note: 'Stated by Francisco. Universal — no facility discounts boosts.' },
  'DP Boost Rare':      { base: 35,  disc: null, sure: false,
                          note: 'Stated by Francisco. Universal — no facility discounts boosts.' },
  'DP Boost Legendary': { base: 125, disc: null, sure: false,
                          note: 'Stated by Francisco. Universal — no facility discounts boosts.' }
};

/* The gem price of one item at the reader's facility levels. The single place
   an ITEM_PRICES row turns into a number; nothing else should read `.base`. */
function itemGems(key, levels) {
  var p = ITEM_PRICES[key];
  if (!p) return null;
  return facilityNet(p.base, p.disc, levels);
}

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
