# Changelog

## 1.0.0 (2026-10-01)

First public release by Joseph Brendan, Dev and Design HQ.

- Specification (SPEC.md) with problem statement, timing, color steps, rules and accessibility notes.
- Two-phase escalation: color deepens every 2 seconds to full color by 6 seconds, then the outline thickens by 0.5 px every 2 seconds to 4 px by 14 seconds.
- Return detection: when the user comes back from another tab, window or app, the ring shows at least full color.
- Reference implementation in plain JavaScript and CSS, no dependencies.
- Live demo page.
- Defensive publication text.

## Planned for 1.1.0

- Skip escalation on fields focused by the page on load, until the user interacts.
- React and Vue wrappers.
