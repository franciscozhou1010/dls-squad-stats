/* DLS store — the plain gem and coin tiers.
   Prices in CAD, read off the in-game store on the date below.

   These two tiers are the only ones facility upgrades do NOT discount, so
   unlike coach / scout / agent prices this really is a flat price list rather
   than a snapshot of one account's discounts. It still needs re-checking:
   the game reprices and runs sales.

   Coins are listed as base + bonus because the store advertises them that
   way; every rate below is computed off the total actually received. */

const STORE_CURRENCY = 'CAD';
const STORE_CHECKED = '2026-08-30';

const GEM_PACKS = [
  { name: 'Bundle', gems: 90,   price: 2.99 },
  { name: 'Stack',  gems: 400,  price: 9.99 },
  { name: 'Locker', gems: 910,  price: 22.99 },
  { name: 'Sack',   gems: 2700, price: 59.99 },
  { name: 'Vault',  gems: 6000, price: 129.99 }
];

const COIN_PACKS = [
  { name: 'Bundle', base: 900,   bonus: 0,     price: 2.99 },
  { name: 'Stack',  base: 1750,  bonus: 200,   price: 4.99 },
  { name: 'Cup',    base: 3000,  bonus: 450,   price: 9.99 },
  { name: 'Case',   base: 5000,  bonus: 1700,  price: 14.99 },
  { name: 'Locker', base: 9000,  bonus: 5500,  price: 24.99 },
  { name: 'Vault',  base: 22000, bonus: 18500, price: 69.99 }
];
