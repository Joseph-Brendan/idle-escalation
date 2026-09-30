# Idle Escalation

**A focus ring that gets stronger the longer a field sits idle.**

When a user clicks into a field and does not start typing, the focus ring starts as a light, soft tone of your primary color. Every 2 seconds it gains saturation until it reaches full color. If the user still has not typed, the outline then thickens by 0.5 px every 2 seconds, four times. The moment they type, it goes back to calm. No popups, sounds or shaking.

Created by **Joseph Brendan**, founder of [Dev and Design HQ](https://devdesignhq.com), 2026.


**[Read the full specification](SPEC.md)**

---

## Why this exists

Idle Escalation exists to help the user. It helps two kinds of people.

- **Users who freeze or stare.** They click a field, then their mind drifts or they get stuck. The growing ring pulls their attention back to the field, so they can start typing what they came to enter.
- **Users who look away.** They check their phone, open another tab, or switch to another window. When they come back, the strong ring shows exactly where they were. No scrolling. No searching.

People rarely give a screen their full attention. Research by Gloria Mark at UC Irvine found that people now stay on one screen for about 47 seconds, on average, before switching. A 2015 study from Florida State University found that just receiving a phone notification, without touching the phone, breaks focus about as much as using the phone. A normal focus ring looks the same after 2 seconds as after 2 minutes. Idle Escalation changes that.

See [SPEC.md, Section 2](SPEC.md#2-the-problem) for the full problem statement and sources.

## How it works

| Time idle | Step | Phase | Ring |
|---|---|---|---|
| 0 s | 1 | Color | Light, soft tone at 2 px (already visible) |
| 2 s | 2 | Color | Stronger tone, 2 px |
| 4 s | 3 | Color | Stronger again, 2 px |
| 6 s | 4 | Color | Full primary color, 2 px |
| 8 s | 5 | Width | Full color, 2.5 px |
| 10 s | 6 | Width | Full color, 3 px |
| 12 s | 7 | Width | Full color, 3.5 px |
| 14 s | 8 | Width | Full color, 4 px, hint text appears. Holds here. |

Typing resets to step 1 at 2 px. Leaving the field clears it. Switching to another tab, window or app pauses the timer, and on return the ring jumps to full color so the spot is easy to find.

## Quick start

### 1. Add the files

```html
<link rel="stylesheet" href="src/idle-escalation.css">
<script src="src/idle-escalation.js" defer></script>
```

### 2. Mark your fields

```html
<label for="email">Email address</label>
<input id="email" type="email"
       data-idle-escalation
       data-ie-hint="email-hint"
       aria-describedby="email-hint">
<p id="email-hint" class="ie-hint">Example: ada@example.com</p>
```

### 3. Start it

```html
<script>
  document.addEventListener('DOMContentLoaded', function () {
    IdleEscalation.init();
  });
</script>
```

### 4. Use your brand colors

Replace the four tones in `src/idle-escalation.css`:

```css
:root {
  --ie-step-1: #8a85f0; /* softest, must reach 3:1 contrast */
  --ie-step-2: #6b63eb;
  --ie-step-3: #5b52e8;
  --ie-step-4: #4f46e5; /* peak, your full primary color */
}
```

## Options

| Option | Data attribute | Default | What it does |
|---|---|---|---|
| `delay` | `data-ie-delay` | `2000` | Milliseconds between steps. Minimum 1000. |
| `colorSteps` | `data-ie-color-steps` | `4` | Steps in the color phase, including the soft start. |
| `widthSteps` | `data-ie-width-steps` | `4` | Steps in the width phase. `0` turns it off. |
| `widthIncrement` | `data-ie-width-increment` | `0.5` | Pixels added per width step (0.25 to 1). |
| `returnBoost` | `data-ie-return-boost` | `true` | Jump to full color when the user returns from another tab or app. |
| `watchPauses` | `data-ie-watch-pauses` | `false` | Also escalate after the user pauses mid-typing. |
| (hint) | `data-ie-hint` | none | ID of hint text to show at the peak. |

Add the class `ie-halo` to a field for a soft halo during the color phase.

```js
// Set options for every field at once
IdleEscalation.init(document, { delay: 3000, widthIncrement: 0.5 });

// Or attach to one field
const ie = new IdleEscalation(document.getElementById('email'), { delay: 2500 });
ie.destroy(); // remove it later
```

## Events

Each field fires `idleescalation:step` when its step changes. Use it to measure the pattern.

```js
field.addEventListener('idleescalation:step', (e) => {
  console.log(e.detail); // { step: 6, steps: 8, phase: 'width', widthAdded: 1, peak: false }
});
```

## Accessibility

- Step 1 always meets 3:1 contrast, so focus is visible from the start (WCAG 2.4.7 and 1.4.11).
- The width phase means color is not the only signal. Users who cannot tell tones apart still see the ring grow.
- The ring is an outline, so a thicker ring never moves the field or the page.
- The ring never blinks, pulses or loops. It stops at the peak.
- Reduced motion: steps change instantly with no easing.
- Forced colors (Windows High Contrast): the system focus color takes over.
- Hint text is linked with `aria-describedby`, so screen reader users hear it right away.

Full details in [SPEC.md, Section 8](SPEC.md#8-accessibility).

## Rules for a true Idle Escalation

1. It exists to help the user return to the field, never to pressure them.
2. The soft start is still clearly visible.
3. Color deepens first. Width grows only after full color.
4. Each step is stronger than the last. Width grows by 1 px or less per step, 4 px at most in total.
5. It stops at the peak. No loops, blinking or pulsing.
6. Any input resets it.
7. No sound, vibration, shaking or popups. Nothing on the page moves.

## Project files

```
idle-escalation/
├── README.md                  You are here
├── SPEC.md                    Full specification and research
├── DEFENSIVE-PUBLICATION.md   Public technical disclosure
├── LICENSE                    MIT License
├── CITATION.cff               How to cite this work
├── CHANGELOG.md               Version history
├── src/
│   ├── idle-escalation.js     Reference implementation
│   └── idle-escalation.css    Styles and color tokens
└── demo/
    └── index.html             Live demo
```

## Credit

Idle Escalation is free to use in any product, commercial or personal. If you write about it, teach it, or ship it in a design system, please credit it as:

> Idle Escalation, an interaction pattern by Joseph Brendan (Founder, Dev and Design HQ), 2026.

The specification is shared under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The code is shared under the [MIT License](LICENSE).

## Contributing

Ideas, bug reports and test results are welcome. If you run an A/B test with this pattern, please open an issue and share what you found, good or bad.

## Author

**Joseph Brendan**
Founder, Dev and Design HQ
[devdesignhq.com](https://devdesignhq.com) · [LinkedIn](https://www.linkedin.com/in/joseph-brendan/)
