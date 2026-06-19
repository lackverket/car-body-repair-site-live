
# CLAUDE.md — Reference-Clone Workflow

## Purpose

This project takes a **reference site** (screenshot + optional inspected
styles) and rebuilds its visual design almost exactly, then re-skins the
content/copy/functionality for a **new service** described in the prompt.

The result should look like the reference site's identical twin — same
fonts, type scale, spacing, color values, layout grid, component shapes,
shadows, borders, motion — with only the content, copy, and any explicitly
requested functional differences changed. This is **not** an "inspired by"
redesign. Treat deviation from the reference as a bug unless the prompt
explicitly asks for a change.

---

## Inputs you will receive

1. **Reference screenshot(s)** — always provided. This is the primary
   visual source of truth.
2. **Reference computed styles** (optional) — raw CSS / DevTools dump
   (computed styles, `getComputedStyle` output, or copied stylesheet). When
   present, this is **more authoritative than the screenshot** for exact
   values (hex codes, px values, font-family strings, line-height, etc.)
   because screenshots can mislead on color (compression, color profile)
   and exact spacing (sub-pixel rounding, retina scaling).
3. **Service context** — what the new site is for (product, audience,
   copy, content sections needed, any features). This determines *what
   the site says and does*, not *how it looks*.
4. **Follow-up prompt-bar instructions** — incremental, explicit change
   requests made after the first build. Apply these literally and
   narrowly; do not let them cascade into unrelated style changes.

If a screenshot is provided but **no style dump**, and the typeface cannot
be confidently identified from the screenshot alone, **stop and ask**
rather than guessing. See "Font identification" below — this is the one
input gap that justifies a clarifying question; everything else should be
inferred from the screenshot/styles as best-effort.

---

## Tech stack & conventions

- **Tailwind CSS** for all standard layout, spacing, color, typography
  utilities. Prefer Tailwind classes over custom CSS whenever the design
  value maps cleanly onto Tailwind's scale or an arbitrary-value utility
  (e.g. `mt-[37px]`, `text-[15px]`, `bg-[#1a1a2e]`).
- **Traditional CSS** only for things Tailwind can't express cleanly:
  complex gradients/masks, keyframe animations, unusual clip-paths,
  custom font-face declarations, pseudo-element heavy effects, or precise
  cubic-bezier transitions. Put this in a single `globals.css` /
  `index.css` — don't scatter `<style>` tags.
- Don't fight Tailwind's defaults by overriding the config unless the
  reference's scale is clearly non-standard across many measurements (in
  which case extend `tailwind.config` once, deliberately, rather than
  patching arbitrary values everywhere).
- Match the reference's actual breakpoint behavior if it's visible
  (e.g. screenshot at one viewport only → assume standard responsive
  collapse patterns rather than inventing breakpoints with no evidence).

---

## Step-by-step workflow

### Step 1 — Extract the design spec (once, up front)

Before writing any code, read the screenshot and style dump and produce a
**compact internal design token list**. Do this once, in thinking, not as
a long visible preamble:

- Colors (as exact hex/rgb from style dump if present, else best estimate
  from screenshot): background(s), text primary/secondary, accent,
  borders, link/hover states.
- Type: font-family per role (heading/body/mono/UI), sizes, weights,
  line-heights, letter-spacing, for each distinct text style observed
  (h1, h2, body, nav, button, caption, etc).
- Spacing: section padding, container max-width, gutter/grid gaps,
  component internal padding.
- Components: button shape (radius, padding, border), card shape,
  shadow values, nav layout, hero layout, image treatment (rounded?
  bordered? full-bleed?).
- Layout grid: column count, container width, breakpoint behavior if
  inferable.

This becomes your working spec for the rest of the build. Re-derive it
once; don't re-read the screenshot from scratch for every component.

### Step 2 — Font identification

- If the style dump includes `font-family` declarations, use those
  values directly — they are ground truth.
- If only a screenshot is provided, attempt identification from
  distinguishing letterforms (look at lowercase `a`, `g`, `t`; numeral
  shapes; overall x-height) and propose your best match (e.g. "this
  looks like Inter or a similar grotesque — confirm or provide the
  actual font").
- If you cannot narrow it to a specific confident match, **ask the user
  directly for the font name(s)** rather than silently picking a
  lookalike. This is the one case where pausing to ask is cheaper than
  guessing wrong and burning a verification cycle on a font mismatch.
- Default to loading identified/confirmed fonts via Google Fonts (or the
  user's specified source) — don't substitute a "close enough" system
  font without flagging it as a substitution.

### Step 3 — Build structure first, polish second

- Build semantic HTML/component structure and layout skeleton matching
  the reference's section order and grid, using real (or service-context)
  copy from the start — not lorem ipsum. Re-skinning copy later causes
  re-measurement of spacing.
- Apply the token list from Step 1 as you build, rather than building
  unstyled and styling in a second pass. This avoids redundant edit
  cycles.
- Swap in the service's content, copy, and any functional differences
  called for by the context — same skeleton, new words/data.

### Step 4 — Verify against the reference (the core loop)

This is the most important and most token-sensitive part of the workflow.
**Verify deliberately, not continuously** — a fixed checkpoint loop beats
re-screenshotting after every small change.

1. After the first full pass is built, take **one screenshot** of the
   built site (use the available browser/screenshot tool at the same
   viewport width as the reference, or both desktop + mobile only if both
   reference shots were given).
2. Compare side-by-side against the reference on, in priority order:
   - Layout/structure (sections in right place, right proportions)
   - Spacing (section padding, gaps — eyeball against the token list,
     don't re-measure from scratch)
   - Typography (size relationships, weight, font rendering)
   - Color accuracy
   - Component details (button/card shape, shadows, borders)
3. Write a short diff list (3–8 bullet points max) of concrete
   mismatches. Skip this step entirely if there are no material
   mismatches — don't manufacture nitpicks to justify another pass.
4. Fix the listed mismatches in one batch of edits (not one screenshot
   per fix).
5. Re-screenshot once and re-compare.
6. Stop when either:
   - The diff list comes back empty/trivial (sub-pixel-level only), or
   - **Two consecutive verification passes** have been completed.
     Diminishing returns set in fast; do not loop indefinitely chasing
     pixel-perfection. State remaining minor deltas to the user in one
     line instead of continuing to iterate.

**Token discipline for this loop:**
- Never take a screenshot after a single small CSS tweak — batch fixes.
- Don't re-describe the whole page in prose at every checkpoint; only
  report the diff (what's wrong / what changed).
- Don't re-read the original screenshot/style dump from context again —
  refer to your Step 1 token list, which already distilled them.

### Step 5 — Apply prompt-bar follow-up changes

- Treat each follow-up instruction as a scoped patch: identify exactly
  which element/section it targets, change only that, and don't let it
  trigger a full re-verification pass against the reference — only
  re-screenshot if the change is layout-affecting or the user asks to see
  it.
- Don't reinterpret unrelated parts of the design when handling a
  follow-up request.

---

## Fidelity boundaries — what should and shouldn't change

**Keep identical to the reference (unless told otherwise):**
Fonts, font sizes/weights, line-heights, letter-spacing, color palette,
spacing/padding/margins, border-radius values, shadow styles, grid/layout
structure, component shapes (buttons, cards, inputs, nav), icon style,
overall visual rhythm, animation/transition style if visible.

**Expected to change based on service context:**
Copy/text content, imagery/illustrations (unless the user supplies
assets), logo/brand name, specific data shown, navigation labels (if the
service's structure genuinely differs), any functionality explicitly
described as different in the service context.

**Gray area — use judgment, lean toward keeping reference style:**
If the service context implies a different number of nav items, pricing
tiers, feature cards, etc. than the reference shows, replicate the
reference's *style* for that component and repeat/trim it to fit the new
count — don't invent a new component style to accommodate a different
count.

---

## Efficiency notes (token/operation budget)

- One design-token extraction pass, not repeated re-reads of the source
  images.
- Build in as few large edits as practical rather than many tiny
  incremental ones.
- Screenshot-compare on a fixed cadence (end of first build, then up to
  two correction passes) — not after every change.
- Keep diff/verification notes terse (bullets, not paragraphs).
- Don't narrate routine steps ("now I will add padding to the hero...");
  just make the edit. Reserve written explanation for decisions that
  aren't obvious from the diff (e.g. a font substitution, an ambiguous
  spacing call, a deviation you chose deliberately).