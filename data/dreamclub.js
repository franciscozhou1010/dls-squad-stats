/* Dream Club — the subscription.
   ==========================================================================

   Not a pack, and it must not be scored like one. Two consequences the scorer
   in store.html implements directly:

     - the tiers are the SAME product at different lengths, so price cannot
       rank them — cost PER DAY does;
     - every total assumes you claim every day of the term, and the break-even
       day is what turns that assumption into something checkable.

   Why those are the right two lenses, and what the answer means for buying:
   vault note "Dream Club".

   Both tiers were read off the in-game store, INCLUDING the 30-day tier's
   daily reward — confirmed 2026-09-03, not carried over from the 10-day tier.
   Recording that explicitly because assuming the two tiers shared a daily
   reward would have been the single most load-bearing guess on this page: it
   is the difference between the 30-day tier scoring 260% of its price and not
   being scoreable at all.

   "Gold" is the wording on the store screen. It is the same currency the Coins
   tab prices, so it converts at COIN_RATE like any other coin. */

const CLUB_CURRENCY = 'CAD';
const CLUB_CHECKED = '2026-09-03';

/* perDay is what lands in your account each day of the term, not a total.
   The totals on the page are derived — never restate a total here, or the two
   can drift apart and only one of them will be right. */
const CLUB_TIERS = [
  { name: 'Dream Club', term: 10, price: 24.99,
    perDay: { gems: 100, coins: 500 }, sure: true },

  { name: 'Dream Club', term: 30, price: 34.99,
    perDay: { gems: 100, coins: 500 }, sure: true }
];

/* What the store screen does not say. These are genuinely unknown — none of
   them is a number I can derive, and each one would move the verdict, so they
   are printed on the page rather than quietly assumed away.

   `direction` says which way the truth would move the value if we knew it:
     'worse' — the published figure is an optimistic ceiling
     'better' — the published figure is a floor
     'unknown' — could go either way */
const CLUB_UNKNOWNS = [
  { q: 'Do the daily rewards have to be claimed by opening the game that day?',
    why: 'Value assumes every day of the term is collected. If a missed day is simply lost, '
       + 'the 10-day tier has almost no margin: it only breaks even near the end of its own term.',
    direction: 'worse' },

  { q: 'Is there a one-off bonus for subscribing, on top of the daily rewards?',
    why: 'Nothing on the store screen mentions one. If there is, every figure here is a floor.',
    direction: 'better' },

  { q: 'Does it auto-renew, and at which price?',
    why: 'A renewal at the same price keeps the rate; a renewal at a different price is a '
       + 'different product than the one scored here.',
    direction: 'unknown' },

  { q: 'If both tiers are bought, do the terms stack or does the longer one replace the shorter?',
    why: 'Only matters if you were considering both — and the per-day comparison says you '
       + 'should not be.',
    direction: 'unknown' }
];
