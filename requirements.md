# Wedding Site Requirements

## Purpose

The site serves two objectives:

1. **Information** — a digital notice board communicating key wedding details. No user input is collected at this stage.
2. **Aesthetic declaration** — the site sets and communicates the visual language for the wedding more broadly. It should feel intentional and design-forward, not just functional.

## Content

### Phase 1 (current)

Placeholder copy while designing:

> Sinéad & Jeshua will marry in Connemara on 28.08.2027.

Final copy to be supplied later. Key facts to communicate:

- We are getting married in Connemara, Ireland
- Wedding date: **28 August 2027**
- It is a **three-day event**: 26–28 August 2027

### Phase 2 (later — not required now)

- RSVP form / guest response collection
- Extended wedding information (venue, travel, accommodation, schedule, FAQ)

## Aesthetic

### Mood

Hyper-modern, design-forward. The reaction when someone lands on the site should be *"wow, this was very intentional."* Reference: [landonorris.com](https://landonorris.com) — that level of considered design, slightly less busy, different aesthetic.

### Visual language

- **Base layer**: concrete and brutalism — raw, structural, grounded
- **Emerging layer**: earthy greens, foliage, organic texture — not manicured or floral, more like wild growth from stone
- The contrast between the two layers is central to the aesthetic

### Typography

- Two fonts maximum
- Primary: **Futura** — as used by the Barbican. Bold, geometric sans-serif.
- Secondary: a serif, possibly introduced later
- Overall feel: very "stock" / editorial, not decorative

### Keywords

brutalist, earthy, foliage, concrete, green, hyper-modern, editorial, design-forward

## Password Protection

The entire site is gated behind a password distributed to invitees.

- **Password**: `kerrygold`
- Password is checked client-side (no backend required)
- Once entered correctly, the session is unlocked (persisted in sessionStorage so page refreshes don't re-prompt within the same session)

## Entry Experience

The user's first encounter with the site is a CRT terminal scene before the main content is revealed.

### Step 1 — CRT terminal view
- The user sees a physical CRT monitor rendered on screen (against the site's concrete/brutalist background)
- Inside the monitor: a minimal black terminal with blinking green cursor
- The terminal displays a password prompt: e.g. `> ENTER SITE ACCESS CODE:`
- Aesthetic: monochrome green-on-black phosphor, scanlines, screen curvature/vignette

### Step 2 — Correct password entered
- The CRT monitor/terminal expands to fill the entire viewport (animated transition)
- A single loading bar appears, with text that is **randomly selected** on each page load from the list below — so returning visitors see different messages over time
- A Mac startup chime plays (the classic boot sound) as the loading concludes

#### Loading bar copy pool (randomly selected)

```
[████████████████] Loading good craic
[████████████████] Loading my love for Sinéad (this could take a while)
[████████████████] Loading a sunny day in Ireland
  → this one FAILS: error displayed: "CANNOT GUARANTEE SUN IN IRELAND"
[████████████████] Loading Irish pubs vs UK pubs discourse
[████████████████] Loading an over-engineered wedding website
[████████████████] Loading the courage to get in the sea on day 2
```

The "sunny day" entry is a special case: the bar fills, then the line clears and an error is shown before proceeding.

### Step 3 — Site loads
- The terminal aesthetic fades/transitions out
- The main wedding information is revealed

### Step 4 — Wrong password
- Terminal displays an error message (copy TBD — something dry and in-keeping)
- Prompt resets

## Technical

- **Stack**: Next.js (App Router), TypeScript, Tailwind CSS v4
- **Hosting**: Handled by user independently
- **No backend required** for Phase 1
- Password validation is client-side only
- No analytics, no forms, no data collection in Phase 1

## Timeline

| Milestone | Target |
|---|---|
| First version live | 14 June 2026 (today) |
| Copy finalised | TBD |
| Phase 2 features | TBD |

## Open questions

- [x] Loading screen copy confirmed (see loading bar copy pool above)
- [ ] Confirm wrong-password error message copy
- [ ] Supply final copy for Phase 1 content (beyond the placeholder)
