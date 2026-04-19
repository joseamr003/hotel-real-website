# Design System Strategy: The Cinematic Monolith

## 1. Overview & Creative North Star
This design system is built upon the **"Cinematic Monolith"** philosophy. It rejects the cluttered, component-heavy aesthetic of standard web templates in favor of high-fashion editorial layouts. The goal is to make every scroll feel like a deliberate camera pan across a luxury estate.

We achieve this through **Intentional Asymmetry** and **Massive Scale**. By utilizing oversized typography against expansive blocks of Deep Burgundy and Stark White, we create a rhythmic "heartbeat" of high contrast. This system does not use traditional grids to contain content; it uses space to frame it. Elements should overlap, bleed off-canvas, and command attention through sheer typographic authority.

---

## 2. Color & Tone
The palette is a study in power. We explicitly avoid "cheap grays" and "default neutrals," opting instead for tinted surfaces that feel intentional and warm.

### The Palette
* **Primary Container (#800020):** Our signature "Conchovino." This is used for massive, full-width sections to anchor the experience.
* **Secondary (#735c00):** Our "Classic Gold." Used sparingly for high-intent actions, accents, and fine-line details.
* **Surface (#F9F9F9):** Our "Stark White." It is never pure #FFF in UI components to allow for a "Surface Bright" highlight.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. We define space through:
1. **Color Blocking:** Transitioning from a `surface` section to a `primary-container` section.
2. **Tonal Shifts:** Using `surface-container-low` (#f3f3f4) against a `surface` background to define a zone.
3. **Negative Space:** Using the 16 (5.5rem) and 24 (8.5rem) spacing tokens to create mental boundaries.

### Glass & Gradient Polish
To prevent flat color blocks from feeling "dead," use subtle radial gradients. A transition from `primary` (#570013) to `primary-container` (#800020) in a hero section adds a "velvet" texture. For floating elements over imagery, use **Glassmorphism**:
* **Background:** `surface` at 70% opacity.
* **Effect:** Backdrop blur (12px–20px).
* **Stroke:** None (or a 10% opacity `outline-variant` Ghost Border).

---

## 3. Typography: The Magazine Edit
Typography is the primary visual engine of this system. We pair the dramatic, high-contrast `notoSerif` with the surgical precision of `manrope`.

* **Display Large (3.5rem):** Reserved for "Hero Statements." Use tight letter-spacing (-0.02em) to create a monolithic block of text.
* **Headline Series:** These are your "Magazine Subheaders." They should often be placed asymmetrically, perhaps overlapping a color block or image edge.
* **Body (Manrope):** Use `body-lg` for introductory paragraphs and `body-md` for standard reading. The sans-serif must feel invisible, allowing the serif headlines to lead the eye.
* **Label Small (Uppercase):** Use for "Gold" accents. Set in `secondary` (#735c00) with wide letter-spacing (0.1em) for a premium, branded feel.

---

## 4. Elevation & Depth
We reject traditional drop shadows. Depth is achieved through **Tonal Layering** and **Atmospheric Ambient Light**.

* **The Layering Principle:** Treat the UI as stacked sheets of fine paper.
* Base: `surface`
* Card/Layer: `surface-container-lowest`
* Interaction Layer: `surface-bright`
* **Ambient Shadows:** If a layer must "float" (e.g., a booking modal), use a shadow tinted with the `on-surface` color.
* *Formula:* `0px 24px 48px rgba(26, 28, 28, 0.06)`
* **The Ghost Border:** For accessibility in forms, use the `outline-variant` token at 20% opacity. It should be felt, not seen.
* **0px Roundedness:** All elements—buttons, cards, inputs—must have a `0px` border radius. Sharp edges convey architectural permanence and high-end precision.

---

## 5. Components

### Buttons (The "Jewel" Actions)
* **Primary:** Background: `primary_container` (#800020), Text: `on_primary` (#ffffff). High-contrast, sharp corners.
* **Secondary:** Background: `transparent`, Text: `secondary` (#735c00), Underline: 1px `secondary`.
* **State:** On hover, the background should shift to `primary` (#570013) with a subtle lift.

### Input Fields
* Forbid traditional "box" inputs. Use a "Bottom-Border Only" approach using the `outline` token (#8c7071) or a subtle background fill of `surface-container-high`.
* Labels should be `label-md`, uppercase, in Gold (`secondary`) when active.

### Cards & Editorial Modules
* **Strictly No Dividers.** Use vertical white space (Spacing 12 or 16) to separate items.
* Images within cards should use a subtle `primary_container` overlay at 5% to unify the photography with the brand palette.

### Interactive Chips
* Used for room amenities or filters.
* **Unselected:** `surface-container-high` with `on-surface-variant` text.
* **Selected:** `secondary_container` (Gold) with `on-secondary-container` text. Sharp corners only.

---

## 6. Do's and Don'ts

### Do:
* **Embrace the Asymmetry:** Place a `display-lg` headline so it bleeds over the edge of a `primary_container` block.
* **Use Massive Spacing:** If you think there is enough margin, double it. Use the `24` (8.5rem) token for section padding.
* **Think in Layers:** Use `surface-container-low` to create "sub-rooms" within a white page.

### Don't:
* **No Rounded Corners:** Never use a radius. The luxury of 'Hotel Real' is found in its sharp, architectural lines.
* **No Generic Grays:** If you need a neutral, use `surface_variant` or a low-opacity `primary`. Never use hex #888 or #CCC.
* **No Clutter:** If a component doesn't serve a cinematic purpose, remove it. Avoid "Dashboard-style" density.
* **No 1px Lines:** Do not use lines to separate content. Let the colors and the typography do the work.

---

## 7. Spacing & Rhythm
Rhythm is controlled via the core spacing scale. For a premium feel, avoid odd-numbered spacing.
* **Section Gaps:** Always use `20` (7rem) or `24` (8.5rem).
* **Component Internal Padding:** Use `4` (1.4rem) or `6` (2rem) to ensure text has "breathing room" within its container.
* **Text Stack:** Use `2` (0.7rem) between a headline and body text to maintain a tight, editorial relationship.