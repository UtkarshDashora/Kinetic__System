```markdown
# Design System Document: Kinetic Stadium

## 1. Overview & Creative North Star
### Creative North Star: "The Electric Pulse"
This design system is not a static interface; it is a living extension of the stadium atmosphere. We move beyond the "template" look by embracing **The Electric Pulse**—a philosophy that balances the raw energy of live sports with the precision of high-end aerospace instrumentation.

To break the generic grid, this system utilizes **Intentional Asymmetry** and **Optical Depth**. We avoid centered, static layouts in favor of dynamic, left-heavy weightings and overlapping elements that suggest forward motion. Large-scale typography bleeds off the edges of containers, and high-contrast color pairings create a "glow" effect that mimics stadium floodlights against a night sky.

---

## 2. Colors: High-Contrast Luminance
The palette is designed for maximum legibility in harsh outdoor sunlight and the moody atmosphere of a night-time arena.

### The Palette (Material Design 3 Tokens)
*   **Background / Surface:** `#090f15` (Deep Navy) – Our "Pitch Black" canvas.
*   **Primary:** `#8ff5ff` (Electric Blue) – Used for critical active states.
*   **Secondary:** `#ff7439` (Vibrant Orange) – Our "Action Energy" color, reserved for high-priority crowd management and urgent alerts.
*   **Tertiary:** `#9cb4fe` (Soft Periwinkle) – Used for secondary data visualizations.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. We define boundaries through **Chromatic Shifts**.
*   Use `surface-container-low` for secondary sections.
*   Use `surface-container-high` to bring an element "closer" to the user.
*   A section should sit on the `background` and be distinguished only by its slightly lighter or darker tonal value.

### The "Glass & Gradient" Rule
To inject "soul" into the UI, main Hero cards and CTA buttons should utilize a **Kinetic Gradient**: transitioning from `primary` (`#8ff5ff`) to `primary_container` (`#00eefc`) at a 135-degree angle. For floating navigation or modal overlays, apply **Glassmorphism**: use `surface_variant` at 60% opacity with a `24px` backdrop blur to allow the "stadium lights" (background content) to bleed through.

---

## 3. Typography: Editorial Impact
We pair the geometric precision of **Lexend** (Display) with the industrial clarity of **Inter** (Interface).

*   **Display (Lexend, 2.25rem - 3.5rem):** Used for scores, countdowns, and section headers. Use `headline-lg` with tight letter-spacing (-0.02em) to create an authoritative, editorial feel.
*   **Interface (Inter, 0.75rem - 1.375rem):** Used for navigation, labels, and body copy.
*   **The Hierarchy Strategy:** Use `display-lg` for "Hero Numbers" (e.g., Seat Numbers or Minutes Left) to make them the undeniable focal point. Contrast this with `label-sm` in all-caps for metadata to create a sophisticated, "pro-spec" look.

---

## 4. Elevation & Depth: Tonal Layering
We reject the 2010s "Drop Shadow." Depth in this system is achieved through light, not shadow.

*   **The Layering Principle:** Stack surfaces like sheets of polarized glass. 
    *   *Base:* `surface` (`#090f15`)
    *   *Section:* `surface_container_low` (`#0d141b`)
    *   *Interaction Element:* `surface_container_highest` (`#1e272f`)
*   **Ambient Shadows:** If an element must float (like a Floating Action Button), use a shadow tinted with `primary` at 8% opacity with a `48px` blur. It should look like a soft glow, not a dark stain.
*   **The "Ghost Border" Fallback:** For input fields or cards needing high definition, use `outline_variant` at **15% opacity**. This provides a "hint" of a boundary without breaking the seamless tonal flow.

---

## 5. Components: Precision Tools

### Buttons
*   **Primary:** Kinetic Gradient (`primary` to `primary_container`) with `on_primary` text. `xl` roundedness (1.5rem).
*   **Secondary:** Ghost style. No background, `outline` at 20% opacity, with `primary` text.
*   **Action Chips:** Use `full` roundedness. When active, use `secondary_container` with `on_secondary_container` text to signal "High Energy."

### Cards & Lists
*   **The Divider Ban:** Never use a line to separate list items. Use 16px of vertical whitespace or a subtle shift from `surface_container_low` to `surface_container`.
*   **Crowd Management Cards:** Use a `secondary` (Orange) left-accent bar (4px wide) to denote urgency or high-traffic areas.

### Navigation & Iconography
*   **Icons:** Use a 2.5px stroke weight. Avoid filled icons unless in an "active" state.
*   **Crowd Indicators:** Use a "Heatmap" approach. A `surface_container` card with a glowing `tertiary` pulse indicates crowd density without the need for complex text.

### Inputs
*   **States:** Default state is `surface_container_highest`. Focus state triggers a 1px `primary` ghost-border and a subtle `primary` inner-glow.

---

## 6. Do’s and Don’ts

### Do
*   **Do** bleed display typography off the right edge of cards for an "in-motion" feel.
*   **Do** use `secondary` (Orange) sparingly—only for things that require immediate physical action from the user.
*   **Do** leverage `xl` (1.5rem) rounded corners for main containers to keep the "tech-forward" feel friendly.

### Don’t
*   **Don’t** use pure black (`#000000`) for backgrounds; it kills the depth of the Navy/Blue palette.
*   **Don’t** use standard "Material Design" blue. Only use the provided `8ff5ff` for that neon-electric energy.
*   **Don’t** use shadows on flat-surface cards. Let the background color shift do the heavy lifting.
*   **Don’t** center-align long-form text. Keep it "Left-Heavy" to maintain the editorial edge.

---
**Director's Final Note:** This system should feel like it was designed for a pilot's cockpit, but refined for a luxury sporting event. Every pixel must feel intentional, every transition smooth, and every color choice vibrant enough to be seen through the adrenaline of the crowd.```