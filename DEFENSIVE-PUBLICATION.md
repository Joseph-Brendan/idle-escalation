# Defensive Publication

**Title:** Idle Escalation: A Focus Indicator That Increases First in Color Strength and Then in Outline Width, in Discrete, Capped Steps, While a Focused Input Element Remains Idle

**Author and originator:** Joseph Brendan, Founder, Dev and Design HQ
**Contact:** devdesignhq.com
**Date of first public disclosure:** 30th September 2026
**Public repository:** https://github.com/Joseph-Brendan/idle-escalation.git
**Archive DOI:** 10.5281/zenodo.23066053

**Purpose of this document:** This document publicly discloses the technique described below so that it enters the prior art. The author intends the technique to remain free for anyone to use and publishes it to prevent any party from obtaining a patent on it or on obvious variations of it.

---

## 1. Field

Graphical user interfaces. Specifically, visual indicators that show which interface element holds input focus, and methods for drawing a user's attention back to an element after a period of inactivity.

## 2. Background

In graphical user interfaces, an element that is ready to receive keyboard input (a text field, for example) shows a focus indicator, commonly an outline in a highlight color. Conventional focus indicators are static. Their appearance at the moment focus is received is the same as their appearance after any length of inactivity.

Users are frequently distracted after focusing an element. Some freeze or stare at the screen while their attention drifts. Others leave the screen for notifications on another device, another browser tab, or another application window. A static indicator does nothing to draw the first group back, and gives the second group no quick way to see where they were when they return, so they scroll and search. Existing attention mechanisms (modal dialogs, sounds, shaking animations, blinking) are disruptive, can fail accessibility guidelines, and are often perceived as hostile.

## 3. Summary of the technique

The purpose of the technique is to help the user: to bring the attention of a user who has frozen or stalled back to the focused element so they can begin input, and to show a user who has looked away, to another device, tab or window, exactly where they were when they return.

When an interface element receives focus, the system displays a focus indicator at a first, reduced visual strength that is still clearly perceivable. The system then measures how long the element remains idle, meaning no input is received. The indicator escalates in two consecutive phases. In the first phase, each time a predefined interval passes without input, the indicator's color moves one discrete step toward higher saturation and contrast, until it reaches the full primary color. In the second phase, which begins only after the first phase is complete, each further interval without input increases the thickness of the indicator by a small fixed amount, until a maximum thickness is reached. The indicator then holds without further change, oscillation or repetition. Any input returns the indicator to the first step and the starting thickness. Removal of focus within the page removes the indicator. When the user leaves the page for another tab, window or application while the element retains focus, the indicator remains in place and the timer pauses; on return, the indicator is shown at no less than full color so the user can immediately locate the element. At the maximum step, the system may reveal assistance content associated with the element.

## 4. Detailed description

### 4.1 Preferred embodiment

1. A text input element in a web page is marked as participating in the technique.
2. On receiving focus, the element displays an outline 2 pixels wide, offset 2 pixels from its border, in a first color. The first color is a light, soft tone of the interface's primary brand color, chosen so that its contrast ratio against the adjacent background is at least 3:1.
3. A timer starts. The interval is 2 seconds.
4. Color phase. When 2 seconds pass with no input, the outline color changes to a second tone of the primary color with higher saturation and contrast. The change is eased over approximately 400 milliseconds. This repeats for a third tone at 4 seconds and a fourth tone at 6 seconds. The fourth tone is the full primary color.
5. Width phase. If the user still has not typed, the outline width increases by 0.5 pixels every 2 seconds, four times: 2.5 pixels at 8 seconds, 3 pixels at 10 seconds, 3.5 pixels at 12 seconds and 4 pixels at 14 seconds. The color stays at the full primary color. Because the indicator is drawn as an outline outside the element's box, the increase does not change the size or position of the element or its surroundings.
6. At 4 pixels and full color (the peak), the outline holds. No further changes occur while the element remains idle.
7. At the peak, a hint text element associated with the input (for example, an example value) becomes visible. The hint is already available to assistive technology through an accessibility description relationship from step 1.
8. If the user types, the outline returns to the first tone at 2 pixels and, if the element is empty, the timer restarts.
9. If the user switches to another browser tab, another window or another application, the element keeps focus inside the page and is marked as away. The timer pauses and the outline keeps its current state. When the user returns, if the outline is still in the color phase, it moves directly to the full primary color, and the timer resumes into the width phase.
10. If the element loses focus to another element in the same page, the outline and all step state are removed.
11. When the user has requested reduced motion at the operating system level, color and width changes occur without easing. When a forced-colors or high-contrast mode is active, the system's own focus color replaces the stepped colors, while the width phase still applies.

### 4.2 Implementation example

The element's color step is stored as an attribute (for example `data-ie-step="1"` through `data-ie-step="4"`), its phase as `data-ie-phase="color"` or `"width"`, and the added width as a CSS custom property (`--ie-width-added`, from 0 to 2 pixels). A style sheet maps the step to an outline color and computes the outline width as the base width plus the added width. A script attaches listeners for focus, input, blur and document visibility changes, distinguishes a blur caused by the window losing focus from a blur caused by focus moving within the page, and manages a single timer per element. A custom event is emitted on every step change, carrying the current step, total steps, phase, added width and whether the maximum has been reached, so that the behavior can be measured.

## 5. Variations

The following variations are also disclosed. Each may be combined with any other.

**5.1 Visual property escalated.** Any ordering of two or more properties across consecutive phases (for example color then width, width then color, color then halo, color then width then halo), or a single property alone. Instead of or in addition to outline color and outline width: outline width; outline offset; border color or width; a surrounding shadow or glow ("halo") whose spread, blur or opacity increases per step; background tint of the element; color saturation; lightness; color temperature; opacity; size or weight of the element's label; size, color or visibility of an icon or caret; underline thickness; a progress-like arc or border segment that fills per step.

**5.2 Direction of change.** On light backgrounds, strength increases by darkening and saturating. On dark backgrounds, strength increases by brightening. More generally, each step increases perceived contrast or salience relative to the surrounding background.

**5.3 Timing.** Fixed intervals from 0.5 to 30 seconds; intervals that lengthen or shorten per step; intervals set per element type (short for codes and search, long for free-text areas); intervals adapted to the individual user's past typing latency; intervals set by the user in preferences.

**5.3a Width amounts.** Width increments from 0.1 to 2 pixels per step, fixed or growing per step; total added width from 0.5 to 8 pixels; width measured in device pixels, CSS pixels, points, or relative units such as em or rem.

**5.4 Number of steps.** Any number of discrete steps from two upward, including a large number of small steps that approximates a continuous change, provided the change stops at a maximum and does not repeat.

**5.5 Trigger for idle.** No keystrokes; no value change; no pointer movement within the element or the page; no scroll; no gaze on the element as measured by an eye-tracking device; loss of window or tab visibility followed by a return.

**5.5a Behavior on return.** On return from another tab, window or application: keep the current step; jump to full color; jump to the peak; advance by the number of steps the time away would have produced; briefly show the peak and then settle to full color; or reset to the first step.

**5.6 Reset behavior.** Reset to the first step on any input; reset by one step per input; reset only when the value becomes valid; restart the timer after a pause in typing ("watch pauses" mode) or only when the element is empty.

**5.7 Behavior at maximum.** Hold at maximum; reveal hint text, example values, a help link, or voice or chat assistance; announce assistance to assistive technology; offer to save progress; log an analytics event.

**5.8 Elements.** Text inputs, text areas, one-time code inputs, search fields, selects, checkboxes, radio groups, date pickers, buttons (for example a submit button after all required fields are complete), list items, cards, onboarding checklist items, unsaved-changes indicators, session timeout indicators, chat inputs following a question from an automated agent, form steps in a multi-step flow, and equivalent elements in native mobile, desktop, television, automotive, kiosk, wearable, virtual reality and augmented reality interfaces.

**5.9 Non-visual channels.** Equivalent stepped, capped escalation applied to haptic intensity on devices that support it, or to the verbosity of assistive technology hints, following the same rule that escalation stops at a maximum and resets on input.

**5.10 Platforms and languages.** Implementation in HTML, CSS and JavaScript; in component frameworks such as React, Vue, Angular, Svelte, Web Components; in native toolkits such as SwiftUI, UIKit, Jetpack Compose, Android Views, Flutter, WinUI, Qt; in design tools as a prototype interaction; or as a design token set describing the step colors and intervals.

## 6. Differences from known prior art

- US Patent 9,003,326 describes a focus indicator that animates during the transition of focus between elements. The present technique instead changes the indicator of a single element that already holds focus, based on idle time.
- US Patent 8,307,296 describes a dwell timer measuring attention on an element and changing the display after a threshold. The present technique increases a focus indicator in multiple discrete, capped steps during inactivity, resets on input, and pauses while the interface is hidden.

## 7. Keywords

focus indicator, focus ring, focus outline, outline width, stroke width, idle detection, return detection, frozen user, re-engagement, inactivity, attention, distraction, progressive emphasis, stepped emphasis, escalating highlight, saturation, contrast, form field, text input, user interface, interaction design, accessibility, WCAG, user engagement, form abandonment

## 8. Figures (descriptions)

- **Figure 1.** A text field shown eight times, at 0, 2, 4, 6, 8, 10, 12 and 14 seconds after focus. In the first four, the outline moves from a light tone to the full primary color at 2 pixels. In the last four, the outline stays at full color and thickens to 2.5, 3, 3.5 and 4 pixels. Below the eighth field, hint text is visible.
- **Figure 2.** State diagram. States: Unfocused, Color 1 to Color 4, Width 1 to Width 4 (Peak), and Away. Transitions: focus (Unfocused to Color 1); interval elapsed with no input (each state to the next); input (any state to Color 1); blur within the page (any state to Unfocused); window, tab or app switch (any state to Away, timer paused); return (Away to at least Color 4, timer resumed).
- **Figure 3.** Two stacked timeline charts over 0 to 16 seconds. The top chart shows contrast ratio rising in a staircase from 3:1 to 6.3:1 by 6 seconds, then flat. The bottom chart shows outline width flat at 2 pixels until 6 seconds, then rising in 0.5-pixel steps to 4 pixels at 14 seconds, then flat. Both drop back at the moment of a keystroke.
