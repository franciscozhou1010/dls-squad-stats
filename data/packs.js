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
  /* Captured 2026-09-08 off a SECOND account, where this card shows a price
     because that account owns none of them — on the main account it is hidden
     behind USE, which is why it sat unpriced for so long. The card read 148 with
     150 struck through and "1% Facility Discount", so that account is Recruitment
     1-star. A struck-through number is the base, and a base is the same for
     everybody; only the net differs. It also pins the agent ladder at both ends,
     1% at one star and 5% at five, and confirms floor rounding on a second item
     class: 150 x 0.99 = 148.5 shows as 148. */
  'Agent Rare':        { base: 150, disc: 'agent', sure: true,
                         note: 'Base 150, read off a second account as 148 with 150 struck through at a 1% discount. The main account pays 142.' },
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

  /* Physios are bought with COINS. They are the only item class on this site that
     is, and the reason an ITEM_PRICES row carries a currency at all.

     These are BASE prices, confirmed 2026-09-08. They were read off a second
     account, and for a few hours the site could not tell whether they were bases
     or already-discounted figures — the Medical Centre discounts physios by
     10/16/22/28/40%, the deepest ladder in the game, so the difference is large.

     What settled it was the missing discount line. The Agents card on that same
     account prints a struck-through base and "1% Facility Discount" for a
     discount of one percent; the Physios card prints neither. Read as "that
     account has Medical unbuilt", these are bases — and Francisco confirmed the
     building is indeed unbuilt there. So the reasoning and the fact agree, which
     is the only reason the reasoning is worth writing down.

     The main account pays 30 / 60 / 150 at 5 stars. */
  'Physio Common':     { base: 50,  cur: 'coins', disc: 'physio', sure: true,
                         note: 'Base 50 coins, read off an account with the Medical Centre unbuilt, so no discount is in the number. Recovers 10% squad energy. This account pays 30.' },
  'Physio Rare':       { base: 100, cur: 'coins', disc: 'physio', sure: true,
                         note: 'Base 100 coins, same account and same reasoning as Common. Recovers 20% squad energy. This account pays 60.' },
  'Physio Legendary':  { base: 250, cur: 'coins', disc: 'physio', sure: false,
                         note: 'Base 250 coins per Francisco — the full undiscounted price, since the account he is quoting has no Medical Centre. Stated rather than read off a screen, which is the only reason this row is still flagged. Recovers 50% energy and heals all active injuries. This account pays 150.' },

  /* Form Boosts, stated by Francisco 2026-09-08 rather than read off a screen.
     Undiscounted, so universal: the Training Centre moves how long a form boost
     LASTS, never what it costs. */
  'Form Boost Common': { base: 5,  disc: null, sure: false, note: 'Stated by Francisco. Universal — no facility discounts form boosts.' },
  'Form Boost Rare':   { base: 8,  disc: null, sure: false, note: 'Stated by Francisco. Universal — no facility discounts form boosts.' },
  'Form Boost Legendary': { base: 10, disc: null, sure: false, note: 'Stated by Francisco. Universal — no facility discounts form boosts.' },

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

/* The price of one item at the reader's facility levels, as an amount plus the
   currency it is charged in. The single place an ITEM_PRICES row turns into a
   number; nothing else should read `.base`. Currency defaults to gems, which is
   every class but physios — so a row only names `cur` when it is not gems.

   Returns null for an uncaptured price, which is what leaves a pack unscored. */
function itemPrice(key, levels) {
  var p = ITEM_PRICES[key];
  if (!p || p.base == null) return null;
  return { n: facilityNet(p.base, p.disc, levels), cur: p.cur || 'gems' };
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
