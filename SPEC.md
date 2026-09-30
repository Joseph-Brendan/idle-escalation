# Idle Escalation

**An interaction pattern for focus indicators**
Version 1.0 · Specification
Created by Joseph Brendan, Founder, Dev and Design HQ (devdesignhq.com)
First published: 30th September 2026
License: MIT (code) and CC BY 4.0 (this document)

---

## 1. Summary

When a user clicks into a field and does not start typing, the focus ring grows stronger in small steps until they act. The pattern runs in two phases.

- **Phase 1, color.** The ring starts as a light, soft tone of the primary color. Every 2 seconds the tone deepens and gains saturation. At 6 seconds it reaches the full primary color.
- **Phase 2, width.** If the user still has not typed, the outline starts to thicken. Every 2 seconds it adds 0.5 pixels, four times. By 14 seconds it has gained 2 pixels, going from 2 px to 4 px. Then it holds.

The moment the user types, the ring drops back to the soft tone at 2 px.

### 1.1 Why it exists: to help the user

Idle Escalation exists to help the user, not to push them. It serves two groups of people.

1. **Users who freeze, stall or stare.** Some users click a field and then lose focus without leaving the screen. They stare, drift into thought, or feel unsure what to do next. The slowly strengthening ring draws their eyes back to the field. It says, gently: come back here, your attention belongs in this box, continue typing what you came to enter. It helps them re-establish their attention on the field so they can start typing.
2. **Users who look away.** Other users leave the screen entirely. They check their phone, open another browser tab, or switch to another window. When they come back, the strong ring shows exactly where they were. They do not need to scroll, scan the page, or try to remember which field they had clicked. They see the spot and continue.

It does all of this without a popup, a sound, or a shake.

## 2. The problem

People do not use products with their full attention. They use them in between other things.

A user opens your sign-up form on a laptop. They click the email field. Their phone lights up. They read the message, reply, and look back at the laptop a minute later. The page looks the same as it did before. Nothing tells them where they were. They scan the screen, lose a few seconds, and sometimes lose the thread completely and leave.

A second user never looks away. They click the field and freeze. Their eyes rest on the screen, but their mind has drifted, or they are unsure what to enter. The field waits, silent and unchanged, and nothing on the page invites them back.

Research on attention and interruption shows this is the normal case, not the rare one.

### 2.1 Attention on a screen is short and getting shorter

Gloria Mark, Chancellor's Professor of Informatics at the University of California, Irvine, has measured how long people stay on one screen before switching since 2003. Her team found an average of about two and a half minutes in the first study (published 2004), 75 seconds in 2012, and an average of about 47 seconds across her more recent studies, run from around 2016 onward. In one 2016 study of 40 office workers tracked over two work weeks, the median was 40 seconds. Half of all screen visits lasted 40 seconds or less.

### 2.2 People interrupt themselves as often as they are interrupted

Mark's research also found that people interrupt themselves more than other people interrupt them. The pull comes from inside the user as well as from outside. A product cannot block every notification, because many switches start with the user's own urge to check something else.

### 2.3 Getting back on task is slow

In a 2005 field study of 24 office workers, Mark, Gonzalez and Harris found that 57 percent of work segments were interrupted. Most interrupted work was resumed the same day, but people passed through more than two other activities before they got back. Mark reports that it takes about 25 minutes, on average, to return to an interrupted task.

### 2.4 Interruptions raise stress, even when people keep up

In a 2008 experiment, Mark, Gudith and Klocke found that interrupted people finished tasks faster with no loss in quality. The price was higher stress, frustration, time pressure and effort. Users who come back to your product after a distraction are often rushing and tense.

### 2.5 A notification alone breaks attention

In 2015, Stothart, Mitchum and Yehnert at Florida State University found that simply receiving a phone notification, without picking up the phone, hurt performance on an attention task. The drop was similar in size to the effect of actually using a phone. The user does not need to touch the phone to lose their place on your page.

### 2.6 Interruptions arrive every few minutes at work

Microsoft's 2025 Work Trend Index special report, based on Microsoft 365 usage data, found that employees receive a meeting invite, email or chat roughly every two minutes during core work hours. That adds up to about 275 pings over a 24 hour day.

### 2.7 The first seconds decide whether people stay

Liu, White and Dumais (Microsoft Research, SIGIR 2010) studied page visit times across more than 200,000 web pages. The chance of a user leaving is highest in the first few seconds and drops once the user decides to stay. Nielsen Norman Group summarized this as: the first 10 seconds of a visit are critical.

### 2.8 The problem, stated plainly

1. Users switch away from the screen often, usually within a minute.
2. Many switches are self-started, so they cannot be prevented.
3. Some users do not switch away at all. They freeze or stare at the screen with their attention elsewhere.
4. When users come back, whether from their phone, another tab, another window or their own thoughts, the screen gives no sign of where they were or what to do next.
5. A standard focus ring is static. It looks the same after two seconds as after two minutes, so it cannot signal that the user has stalled.
6. The cost of a lost place is real: wasted time spent scrolling and searching, higher stress, and in some cases an abandoned task.

Idle Escalation gives the focused field a way to say, gently and without words: "You were here. Come back and continue from this spot."

### 2.9 A note on the "8-second attention span"

A widely shared claim says humans have an 8-second attention span, shorter than a goldfish. That number is not real. In 2017 the BBC traced it to a 2015 Microsoft Canada marketing report, which took it from a website called Statistic Brain. No research behind the number could be found. This specification does not use it, and neither should anyone promoting this pattern.

### 2.10 What the research does not prove

The studies above measure attention and interruption in general. None of them tested Idle Escalation. Whether this pattern reduces abandonment or speeds up form completion is a hypothesis. Section 13 explains how to test it.

## 3. Terms

| Term | Meaning |
|---|---|
| Focus ring | The outline a field shows when it is selected and ready for input. |
| Idle | The field is focused and the user has not typed or changed it. |
| Step | One level of ring strength. Step 1 is the softest. |
| Color phase | Steps 1 to 4. The tone deepens from soft to the full primary color. The width stays at 2 px. |
| Width phase | Steps 5 to 8. The color stays full. The outline thickens by 0.5 px per step. |
| Peak | The final and strongest step: full color at 4 px. |
| Delay | The time the field waits on one step before moving to the next. |
| Escalate | Move from one step to the next stronger step. |
| Reset | Return to step 1 because the user acted. |
| Away | The user has left the page for another tab, window or app, while the field still holds focus. |

## 4. Behavior

### 4.1 State timeline (default settings)

| Time idle | Step | Phase | Color | Outline width | What the user sees |
|---|---|---|---|---|---|
| 0 s | 1 | Color | Soft tone | 2 px | A light, soft ring. Already clearly visible. |
| 2 s | 2 | Color | Stronger tone | 2 px | The ring deepens. |
| 4 s | 3 | Color | Stronger again | 2 px | The ring deepens again. |
| 6 s | 4 | Color | Full primary | 2 px | Full brand color. |
| 8 s | 5 | Width | Full primary | 2.5 px | The ring starts to thicken. |
| 10 s | 6 | Width | Full primary | 3 px | Thicker. |
| 12 s | 7 | Width | Full primary | 3.5 px | Thicker again. |
| 14 s | 8 (peak) | Width | Full primary | 4 px | Strongest ring. Optional hint text appears. |
| After 14 s | 8 (hold) | None | Full primary | 4 px | No further change. The ring holds at the peak. |

The two phases run one after the other, never at the same time. Color changes first because it is the gentler signal. Width is added only if color alone did not bring the user back.

### 4.2 Events and responses

| Event | Response |
|---|---|
| Field receives focus | Go to step 1. Start the timer if the field is empty. |
| Delay passes with no input | Move up one step. Stop at the peak. |
| User types or changes the value | Reset to step 1: soft tone, 2 px. |
| User pauses after typing | By default, no escalation. With `watchPauses` on, the timer restarts. |
| User switches tab, window or app | Mark the field as away. Pause the timer. Keep the ring as it is. |
| User returns | If the ring is still in the color phase, jump to full color (step 4) so the spot is easy to see. Then resume the timer, which continues into the width phase. |
| Field loses focus inside the page | Remove all steps. The field returns to its normal look. |

## 5. Timing

| Setting | Default | Allowed range | Notes |
|---|---|---|---|
| Delay between steps | 2 s | 1 s to 5 s | Below 1 s feels like flashing. Above 5 s feels unrelated to idle. |
| Color steps | 4 | 3 to 5 | Fewer than 3 reads as a simple color swap. More than 5 makes each step too subtle. |
| Width steps | 4 | 0 to 4 | 0 turns the width phase off. |
| Width added per step | 0.5 px | 0.25 px to 1 px | Small steps keep the change gentle. |
| Total width added | 2 px | up to 4 px | Equals width steps × width added per step. |
| Transition per step | 400 ms, ease-out | 200 ms to 600 ms | Each step eases in. It never snaps unless reduced motion is on. |
| Time to full color | 6 s | 2 s to 20 s | Equals delay × (color steps − 1). |
| Time to peak | 14 s | 2 s to 40 s | Equals delay × (color steps + width steps − 1). |

Choosing a delay:

- **2 seconds** for short, simple inputs: search, email, one-time codes.
- **3 to 4 seconds** for fields that need thought: a password, a message, a job title.
- **5 seconds** for long writing areas where silence is normal. Consider turning the width phase off there.

## 6. Color steps

### 6.1 How to build the steps

1. Start from your brand's primary color and its tonal palette (for example 300, 400, 500, 600).
2. Pick step 1 as the softest tone that still reaches **3:1 contrast** against the background behind the field.
3. Pick the peak as your full primary color, or the tone with the highest contrast you are comfortable showing.
4. Fill the middle steps with tones spaced evenly between the two.
5. Check that each step has more contrast than the one before it.

"Stronger" means more contrast with the background. On a light page, stronger tones are deeper and more saturated. On a dark page, stronger tones are brighter.

### 6.2 Reference palette (indigo, light background #FFFFFF)

| Step | Color | Contrast on white |
|---|---|---|
| 1 | #8A85F0 | 3.1 : 1 |
| 2 | #6B63EB | 4.6 : 1 |
| 3 | #5B52E8 | 5.5 : 1 |
| 4 (peak) | #4F46E5 | 6.3 : 1 |

### 6.3 Reference palette (indigo, dark background #0F1117)

| Step | Color | Contrast on #0F1117 |
|---|---|---|
| 1 | #6B63EB | 4.1 : 1 |
| 2 | #8A85F0 | 6.0 : 1 |
| 3 | #A9A5F5 | 8.4 : 1 |
| 4 (peak) | #C7C4FA | 11.4 : 1 |

### 6.4 Ring shape and width

- Draw the ring as an **outline**, never a border. An outline sits outside the field's box, so a thicker ring never changes the field's size and nothing on the page moves.
- Starting width: 2 px. This is also the width after every reset.
- Width phase: +0.5 px every 2 seconds, four times. 2 px, 2.5 px, 3 px, 3.5 px, 4 px.
- Maximum width: 4 px. The ring never grows beyond this.
- Outline offset: 2 px from the field edge. It stays fixed; only the width grows.
- Color during the width phase: the full primary color (the last color step).
- Optional halo: a soft, low-opacity shadow that grows during the color phase (0, 2, 4, 7 px). The halo is extra. It never replaces the outline.

## 7. Rules

These rules define the pattern. An implementation that breaks a MUST rule is not Idle Escalation.

**MUST**

1. The pattern MUST exist to help the user find and return to the field. It MUST NOT be used to pressure the user.
2. Step 1 MUST be clearly visible and reach at least 3:1 contrast. The soft start is soft, not invisible.
3. Each step MUST be stronger than the one before. The ring never gets weaker while the user is idle.
4. The color phase MUST come before the width phase. Width grows only after the ring reaches full color.
5. Each width step MUST add no more than 1 px, and the total added width MUST NOT exceed 4 px.
6. The ring MUST stop at the peak and hold. It MUST NOT loop, blink, pulse or flash.
7. Any input MUST reset the ring to step 1 at the starting width.
8. The ring MUST be drawn so that it does not change the size or position of the field or anything around it.
9. Leaving the field inside the page MUST clear all steps.
10. The delay MUST NOT be shorter than 1 second.
11. The pattern MUST NOT use sound, vibration, movement of the field, or popups.
12. The pattern MUST respect forced-color modes by handing the focus color back to the system.

**SHOULD**

13. When the user leaves for another tab, window or app, the ring SHOULD stay in place and the timer SHOULD pause.
14. When the user returns, the ring SHOULD show at least full color, so the user can see at once where they were.
15. Escalation SHOULD only run on empty fields by default. Escalating after every typing pause can feel like nagging.
16. The peak SHOULD offer help, such as showing hint text or an example value. A user who stalls may be confused, not distracted.
17. Each step SHOULD ease in over about 400 ms.
18. A page SHOULD NOT escalate a field it focused on its own (autofocus) until the user has interacted with the page. (Planned for v1.1 of the reference code.)
19. Only one element on a screen SHOULD escalate at a time. Since only one field can have focus, this holds naturally for focus rings. Apply the same rule when using the pattern on buttons or other elements.

**MAY**

20. Teams MAY add a halo during the color phase.
21. Teams MAY change the delay, the number of steps and the width added per step within the allowed ranges.
22. Teams MAY turn the width phase off by setting width steps to 0.
23. Teams MAY apply the same escalation idea to other elements (see Section 11), following the same rules.

## 8. Accessibility

1. **Focus Visible (WCAG 2.4.7, Level AA).** Satisfied from step 1, because step 1 is always visible.
2. **Non-text Contrast (WCAG 1.4.11, Level AA).** Step 1 meets 3:1 against the adjacent background. Every later step exceeds it.
3. **Focus Appearance (WCAG 2.4.13, Level AAA).** The ring is a solid outline around the whole field, at least 2 px thick from step 1. The width phase takes it to 4 px, which makes the focus area even larger.
4. **Reduced motion.** When the user has asked their device to reduce motion, steps change instantly with no easing. The pattern contains no movement. Color and width change, but the field stays still, so the pattern stays on.
5. **Forced colors (Windows High Contrast).** The ring switches to the system `Highlight` color, and the halo is removed. The system's colors win. The width phase still applies, so users in this mode still get an escalating signal.
6. **Screen readers.** The escalation is visual only and makes no announcements. Hint text is linked to the field with `aria-describedby`, so screen reader users hear it when they reach the field, at step 1. It is only visually hidden until the peak.
7. **Color is not the only signal.** The width phase adds a change in thickness. Users who cannot tell tones apart, including people with color vision differences, still see the ring grow.
8. **Cognitive load.** The ring holds at the peak instead of flashing. This keeps the prompt gentle for users with attention or anxiety conditions.
9. **Keyboard users.** When a user tabs quickly through fields, each field loses focus before the first delay passes, so nothing escalates.
10. **No layout shift.** Because the ring is an outline, the thicker width never pushes text or other fields around. Users with low vision who zoom in do not lose their place.

## 9. When to use it

- Sign-up, login and checkout forms.
- One-time code (OTP) inputs, where the user often checks their phone for the code and comes back.
- Search boxes on pages built around search.
- Chat or support inputs, right after the product asks the user a question.
- Any field where users often stop to check another device or tab and then need to find their place again.
- Onboarding steps that need one piece of information to continue.

## 10. When not to use it

- Long writing areas where silence is thinking time, unless the delay is set to 5 seconds and `watchPauses` is off.
- Fields the user did not choose to focus, such as autofocus on page load.
- Screens where several things compete for attention at once. Escalation only works when it is the one thing changing.
- Any place where the goal is to pressure the user into a purchase or a choice that serves the business more than the user. That would turn a helpful nudge into a dark pattern.

## 11. Other uses of the same idea

The core idea is "a gentle signal that strengthens in steps while the user is idle, then resets on action." It can apply to:

- A primary button after a form is complete but not yet submitted.
- An "unsaved changes" indicator that warms up over time.
- A session timeout warning that strengthens as expiry nears.
- An onboarding checklist item that has been waiting too long.
- A required checkbox (such as accepting terms) the user skipped.
- A chat input after a bot asks the user a question.

Each of these must follow the MUST rules in Section 7.

## 12. Ethics

Idle Escalation exists to help users finish what they came to do. It must never:

- Speed up to create a feeling of urgency.
- Point attention at an upsell, an ad, or an option the user did not seek.
- Punish the user with alarm colors (red, orange) that suggest an error when there is none.

If the ring is helping the business at the user's expense, it is being misused.

## 13. Measuring whether it works

Run an A/B test: half of users get a standard focus ring, half get Idle Escalation. Compare:

1. **Time to first keystroke** after focus.
2. **Field abandonment rate**: focus without any input, followed by leaving the page.
3. **Form completion rate.**
4. **Return-to-field time** after a tab switch (time from tab return to first keystroke).
5. **Error and correction rate**, to confirm the pattern does not rush people into mistakes.

Collect results for at least two weeks and publish them, positive or negative. Real data will do more for the pattern than any claim.

## 14. Reference implementation

The reference code is plain JavaScript and CSS, with no dependencies.

### 14.1 Markup

```html
<label for="email">Email address</label>
<input id="email" type="email"
       data-idle-escalation
       data-ie-delay="2000"
       data-ie-hint="email-hint"
       aria-describedby="email-hint">
<p id="email-hint" class="ie-hint">Example: ada@example.com</p>
```

### 14.2 Script

```js
IdleEscalation.init(document, {
  delay: 2000,
  colorSteps: 4,
  widthSteps: 4,
  widthIncrement: 0.5,
  returnBoost: true,
  watchPauses: false
});
```

### 14.3 Options

| Option | Data attribute | Default | Description |
|---|---|---|---|
| `delay` | `data-ie-delay` | 2000 | Milliseconds between steps. Minimum 1000. |
| `colorSteps` | `data-ie-color-steps` | 4 | Steps in the color phase, including step 1. |
| `widthSteps` | `data-ie-width-steps` | 4 | Steps in the width phase. 0 turns it off. |
| `widthIncrement` | `data-ie-width-increment` | 0.5 | Pixels added per width step. 0.25 to 1. |
| `returnBoost` | `data-ie-return-boost` | true | On return from another tab, window or app, jump to full color. |
| `watchPauses` | `data-ie-watch-pauses` | false | Also escalate after a pause mid-typing. |
| (hint) | `data-ie-hint` | none | ID of an element to show at the peak. |

### 14.4 Output

The script sets three things on the field:

- `data-ie-step="1"` to `"4"`: the color step. It stays at `"4"` during the width phase.
- `data-ie-phase="color"` or `"width"`.
- The CSS variable `--ie-width-added`, from `0px` to `2px`.

The CSS maps these to the outline color and width. The field also fires an `idleescalation:step` event with `{ step, steps, phase, widthAdded, peak }` so teams can log each step for measurement.

## 15. Prior art and what is new

Related ideas exist:

- US Patent 9,003,326 describes a focus indicator that animates as focus moves from one element to another.
- US Patent 8,307,296 describes a dwell timer that tracks how long attention rests on a display element and changes the display once a threshold is passed.

Idle Escalation differs in its specific combination: a focus indicator on a single, already-focused element that first increases in color strength and then in outline thickness, in discrete, capped steps, while the element receives no input; that resets on input; that holds its place and shows at least full strength when the user returns from another tab, window or app; and that optionally reveals help at the peak. The author found no published pattern with this combination as of the first publish date.

## 16. Attribution and citation

Idle Escalation is free to use in any product, commercial or not. When you write about it, credit it as:

> Idle Escalation, an interaction pattern by Joseph Brendan (Dev and Design HQ), 2026.

## 17. References

1. Mark, G. (2023). *Attention Span: A Groundbreaking Way to Restore Balance, Happiness and Productivity.* Hanover Square Press.
2. University of California (2023). "Can't pay attention? You're not alone." Interview with Gloria Mark. universityofcalifornia.edu/news/cant-pay-attention-youre-not-alone
3. Mark, G., Gonzalez, V. M., and Harris, J. (2005). No task left behind? Examining the nature of fragmented work. *Proceedings of CHI 2005.* ACM. doi.org/10.1145/1054972.1055017
4. Mark, G., Gudith, D., and Klocke, U. (2008). The cost of interrupted work: More speed and stress. *Proceedings of CHI 2008,* 107 to 110. ACM. doi.org/10.1145/1357054.1357072
5. Stothart, C., Mitchum, A., and Yehnert, C. (2015). The attentional cost of receiving a cell phone notification. *Journal of Experimental Psychology: Human Perception and Performance,* 41(4), 893 to 897. doi.org/10.1037/xhp0000100
6. Microsoft WorkLab (2025). Breaking down the infinite workday. Work Trend Index special report. microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday
7. Liu, C., White, R. W., and Dumais, S. (2010). Understanding web browsing behaviors through Weibull analysis of dwell time. *Proceedings of SIGIR 2010,* 379 to 386. ACM. doi.org/10.1145/1835449.1835513
8. Nielsen, J. (2011). How long do users stay on web pages? Nielsen Norman Group. nngroup.com/articles/how-long-do-users-stay-on-web-pages
9. Maybin, S. (2017). Busting the attention span myth. BBC News.
10. W3C (2023). Web Content Accessibility Guidelines (WCAG) 2.2. w3.org/TR/WCAG22
11. US Patent 9,003,326. Indicating input focus by showing focus transitions.
12. US Patent 8,307,296. Systems and methods for effective attention shifting.
