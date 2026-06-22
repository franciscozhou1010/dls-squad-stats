# DLS Squad Stats

A single-page, standalone stats reference table for **Dream League Soccer 2026** squads.

### ▶ Live site: **https://franciscozhou1010.github.io/dls-squad-stats/**

Open that link to see the actual product. Because the page is fully self-contained,
you can also just download **`index.html`** and double-click it to open in any
browser — it works offline, with no server and no internet connection needed.

![DLS Squad Stats — sortable player ratings table](screenshot.png)

## What's inside

- **73 players**, each rated across 9 attribute columns — `OVR`, `SPE`, `ACC`,
  `STA`, `STR`, `CON`, `PAS`, `SHO`, `TAC` — plus a **Total**.
- **Card types**, color-coded by row: 🟡 Legend · 🟣 TOTS · 🔴 WC 2026 · 🟠 Standard.
- **Category filters:** All Players · Special · Forwards · Midfielders · Defenders ·
  Goalkeeper, each with position sub-tabs (CF / LW / RW / SS, CM / AM / DM, CB / LB / RB).
- **Click any column header to sort** the table by that stat.
- **Click any player** to open a detail card — club, nationality (with flag), height
  and preferred foot, alongside their octagram radar and full stat list.
- **Live search** — start typing in the search box to instantly filter the list to
  players whose name matches.
- **Compare two players** — the **Compare** tab lets you pick any two players and
  see their stats side by side (the higher value in each row highlighted), plus an
  8-axis *octagram* radar that overlays both players' attributes for an at-a-glance
  shape comparison.
- **Goalkeepers** have their own table — shown beneath the outfield players on
  *All Players*, and on the *Goalkeeper* tab — with keeper-specific `GKR` / `GKH`
  columns in place of `STA` / `SHO`.
- **Best XI** — the **Best XI** tab auto-picks the top-rated player for each slot of a
  chosen formation (no player used twice) and lays them out on a pitch, with an
  8-player substitute bench (1 GK · 2 DF · 3 MF · 2 FW) to the side. Pick from **8
  formations** — 4-3-3, 4-2-3-1, 4-4-2, 3-5-2, 4-1-2-1-2 (diamond), 5-3-2, 3-4-3,
  3-4-2-1 — and the highest-rated eligible player fills each slot, where the central
  zone (DM/CM/AM) and strikers (CF/SS) interchange while wings and full-backs stay to
  type, so a different formation yields a different XI. **Click any player on the pitch
  to swap or lock** a specific choice into that slot (🔒) — the rest re-optimise around
  it; **Reset** clears the locks. Adding a formation is one entry in `FORMATIONS`.

![Compare two players — side-by-side stats with the octagram radar overlay](compare.png)

## Tech

- One file: `index.html` — plain HTML, CSS, and vanilla JavaScript.
- **Single data source** — every player is defined once in a `PLAYERS` list near the
  bottom of the file; the page builds all tables, counts, search, and compare from it.
  Adding a player is a one-line change.
- **No external dependencies** — no CDN, no web fonts, no build step, no backend.
  All data, styling, and interactivity are inline, so it renders identically
  whether served online or opened straight from disk.

## View it locally

```bash
# Option 1 — just open the file
open index.html              # macOS (or simply double-click it)

# Option 2 — serve it over HTTP
python3 -m http.server 8000  # then visit http://localhost:8000
```

## Hosting

Deployed with **GitHub Pages** from the `main` branch root.
Every push to `main` redeploys the site automatically.
