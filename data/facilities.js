/* The six club facilities, and every price on this site that they move.
   ==========================================================================

   Read off the facility panels in the 2026-08-30 capture set, one panel per
   building, plus the club overview screen — which names all six, and is what
   makes this a complete list rather than a sample.

   WHY THIS FILE EXISTS

   Until it did, this site published one account's prices as if they were
   everybody's. A coach cost "63 gems" here because Francisco's Training Centre
   is 5-star, and nothing on screen said so. Six of the item classes the site
   values are discounted by a building, and the discount runs from 1% to 40% —
   large enough that a stranger reading a coach price was reading a number that
   was simply not theirs.

   So prices are now stored as BASE and discounted at render time against
   whatever levels the reader has set.

   THE DEFAULTS ARE FRANCISCO'S LEVELS, DELIBERATELY

   Not because his account is the default account, but because every computed
   figure this site has ever published — the season pass floor, the pack
   percentages, the scout share of the track — was computed at these levels, and
   several of them are quoted with dates in the vault. Changing the default
   would silently falsify all of them. A reader who sets their own levels gets
   their own numbers; a reader who does not gets the ones the notes describe,
   and the pages say whose they are.

   ROUNDING is FLOOR, settled by data/coaches.js: Common Goalkeeping at
   15 x 0.70 = 10.5 shows in game as 10. Integer arithmetic throughout —
   base * (1 - 0.30) evaluates to 62.99999999999999 for a base of 90, which
   floors to 62 and contradicts the 63 on screen. base * 70 / 100 is exact.   */

const FACILITY_CHECKED = '2026-08-30';

/* `discounts` names the item class a column applies to; columns without it are
   real effects the site does not price. Values are indexed by level - 1. */
const FACILITIES = [
  /* This column went out, came back, and went out again on 2026-09-08. It was
     published as a physio PRICE discount, retracted that afternoon as injury
     probability, then confirmed as a price discount after all when Francisco
     re-read the panel. It IS a discount. The SECOND column is the injury one —
     player injury probability — which is what the two-columns-both-about-injuries
     confusion was.

     The round trip is left in the record because it was not free: physios shipped
     as undiscounted and universal for one deploy, and they are neither.

     What made the retraction plausible is real and still needs an explanation.
     The Physios purchase screen prints no discount line and no struck-through
     price, where the Agents screen prints both at a discount of just 1%. The
     likeliest reading is that the capture account has this building unbuilt, so
     there was no discount to print — but that is an inference, and the physio
     base prices rest on it. See data/packs.js. */
  { id: 'medical', name: 'Medical Centre', levels: 5,
    cols: [
      { label: 'Physio price', discounts: 'physio', suffix: '% off', v: [10, 16, 22, 28, 40] },
      { label: 'Player injury probability', suffix: '%', v: [-5, -10, -15, -20, -30] }
    ] },

  { id: 'recruitment', name: 'Recruitment Centre', levels: 5,
    cols: [
      { label: 'Scout price', discounts: 'scout', suffix: '% off', v: [3, 6, 9, 12, 15] },
      { label: 'Agent price', discounts: 'agent', suffix: '% off', v: [1, 2, 3, 4, 5] }
    ] },

  { id: 'training', name: 'Training Centre', levels: 5,
    cols: [
      { label: 'Form Boost lasts', suffix: ' matches',        v: [2, 2, 3, 3, 4] },
      { label: 'Coach price', discounts: 'coach', suffix: '% off', v: [5, 10, 15, 20, 30] }
    ] },

  { id: 'commercial', name: 'Commercial Centre', levels: 5,
    cols: [
      { label: 'Match winnings', suffix: '%',                      v: [2, 4, 6, 8, 10] },
      { label: 'Manager price', discounts: 'manager', suffix: '% off', v: [5, 10, 15, 20, 25] }
    ] },

  /* The only building on half-stars: ten levels, not five. Squad cap starts at
     28 and adds 4 a step; the discount adds 4% a step. */
  { id: 'accommodation', name: 'Accommodation Centre', levels: 10, halfStar: true,
    cols: [
      { label: 'Squad cap',   suffix: ' players',           v: [28, 32, 36, 40, 44, 48, 52, 56, 60, 64] },
      { label: 'Lock players', discounts: 'lock', suffix: '% off',
        v: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40] }
    ] },

  { id: 'fanzone', name: 'Fanzone Centre', levels: 5,
    cols: [
      { label: 'Custom stadium', discounts: 'stadium', suffix: '% off', v: [4, 8, 12, 16, 20] },
      { label: 'Clan points',    suffix: '%',                          v: [4, 8, 12, 16, 20] }
    ] }
];

/* Francisco's account, off the panels. Accommodation 8 = 4 stars of 5, because
   that building counts in half-stars. Fanzone 0 = unbuilt, every row crossed. */
const FACILITY_DEFAULTS = {
  medical: 5, recruitment: 5, training: 5,
  commercial: 5, accommodation: 8, fanzone: 0
};

/* Item classes NO facility touches, and therefore the classes whose prices are
   the same for every reader. Twelve columns across six panels and not one of them
   is a boost, which closed a long-standing open question: a boost price is
   universal, in the same class as the store's gem and coin tiers.

   Physios spent part of 2026-09-08 on this list and came back off it: the Medical
   Centre does discount them, and by more than any other building discounts
   anything. See the Medical Centre note above. */
const FACILITY_UNDISCOUNTED = ['Form Boost', 'Dream Point Boost', 'gem tiers', 'coin tiers'];

/* --- state ---------------------------------------------------------------
   One key, read through a try/catch because a private window throws on the
   accessor itself rather than returning empty. Any unreadable or malformed
   store falls back to the defaults, which is the safe direction: the reader
   sees the numbers the notes describe rather than a broken page. */
const FACILITY_STORE_KEY = 'dls.facilities.v1';

function facilityLevels() {
  var out = {}, k;
  for (k in FACILITY_DEFAULTS) out[k] = FACILITY_DEFAULTS[k];
  var raw = null;
  try { raw = window.localStorage.getItem(FACILITY_STORE_KEY); } catch (e) { raw = null; }
  if (!raw) return out;
  var saved;
  try { saved = JSON.parse(raw); } catch (e) { return out; }
  if (!saved || typeof saved !== 'object') return out;
  FACILITIES.forEach(function (f) {
    var v = saved[f.id];
    if (typeof v === 'number' && v >= 0 && v <= f.levels && v === Math.floor(v)) out[f.id] = v;
  });
  return out;
}

function setFacilityLevel(id, level) {
  var levels = facilityLevels();
  levels[id] = level;
  try { window.localStorage.setItem(FACILITY_STORE_KEY, JSON.stringify(levels)); } catch (e) {}
  return levels;
}

function resetFacilityLevels() {
  try { window.localStorage.removeItem(FACILITY_STORE_KEY); } catch (e) {}
  return facilityLevels();
}

function facilitiesAreDefault() {
  var cur = facilityLevels(), k;
  for (k in FACILITY_DEFAULTS) if (cur[k] !== FACILITY_DEFAULTS[k]) return false;
  return true;
}

/* --- discounts ------------------------------------------------------------ */

/* kind -> { facility, column }. Built from the table above so a new column with
   a `discounts` key wires itself up; nothing else has to be told about it. */
function facilityFor(kind) {
  for (var i = 0; i < FACILITIES.length; i++) {
    var f = FACILITIES[i];
    for (var j = 0; j < f.cols.length; j++) {
      if (f.cols[j].discounts === kind) return { facility: f, col: f.cols[j] };
    }
  }
  return null;
}

/* Percentage off for an item class at the reader's current levels. Level 0 is
   an unbuilt facility and discounts nothing. An unknown kind returns 0 rather
   than throwing — an unrecognised class is simply undiscounted, which is the
   correct answer for boosts and store tiers. */
function facilityDiscountPct(kind, levels) {
  var hit = facilityFor(kind);
  if (!hit) return 0;
  var lvl = (levels || facilityLevels())[hit.facility.id];
  if (!lvl) return 0;
  return hit.col.v[lvl - 1];
}

/* The one place a discount is ever applied. Integer arithmetic, floored. */
function facilityNet(base, kind, levels) {
  if (base == null) return null;
  return Math.floor(base * (100 - facilityDiscountPct(kind, levels)) / 100);
}

/* Level 3 of a half-star building reads "1.5", not "3". */
function facilityLevelLabel(f, lvl) {
  if (!lvl) return 'Not built';
  return (f.halfStar ? lvl / 2 : lvl) + '★';
}

/* --- the strip the pricing pages carry ------------------------------------
   The whole point of this file in one line of UI: a price here is somebody's
   price. Before this existed, coaches.html said "your Training Centre discount
   applied" to every reader, which was true for exactly one of them. */
function facilityBannerHTML() {
  var L = facilityLevels();
  var mine = facilitiesAreDefault();
  /* Only buildings that move a price the site publishes. Medical qualifies: it
     is the physio discount, and at 40% the deepest one in the game. */
  var shown = [
    { id: 'training',    label: 'Training' },
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'medical',     label: 'Medical' }
  ].map(function (b) {
    var f = FACILITIES.filter(function (x) { return x.id === b.id; })[0];
    return '<span class="dls-facbar__lvl"><b>' + facilityLevelLabel(f, L[b.id]) + '</b>'
      + b.label + '</span>';
  }).join('');

  return '<div class="dls-facbar' + (mine ? '' : ' dls-facbar--custom') + '">'
    + '<span class="dls-facbar__tag">' + (mine ? 'Site default' : 'Your levels') + '</span>'
    + '<span class="dls-facbar__body">' + shown + '</span>'
    + '<a class="dls-facbar__link" href="facilities.html">'
    + (mine ? 'These are one account&rsquo;s &mdash; set yours' : 'Change') + ' &rarr;</a>'
    + '</div>';
}
