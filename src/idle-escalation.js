/*!
 * Idle Escalation v1.0.0
 * A focus indicator that starts soft and grows stronger, step by step,
 * while a focused field sits untouched. Phase 1 deepens the color.
 * Phase 2 thickens the outline.
 * Created by Joseph Brendan, Dev and Design HQ. MIT License.
 * https://github.com/YOUR-USERNAME/idle-escalation
 */
(function (global) {
  'use strict';

  var DEFAULTS = {
    delay: 2000,          // milliseconds between steps
    colorSteps: 4,        // phase 1: step 1 (soft start) to step 4 (full color)
    widthSteps: 4,        // phase 2: extra steps that thicken the outline
    widthIncrement: 0.5,  // pixels added to the outline per width step
    watchPauses: false,   // true: also escalate after the user pauses mid-entry
    returnBoost: true     // true: on return from another tab or app, jump to full color
  };

  function readDataOptions(el) {
    var d = el.dataset, o = {};
    if (d.ieDelay) o.delay = parseInt(d.ieDelay, 10);
    if (d.ieColorSteps) o.colorSteps = parseInt(d.ieColorSteps, 10);
    if (d.ieWidthSteps) o.widthSteps = parseInt(d.ieWidthSteps, 10);
    if (d.ieWidthIncrement) o.widthIncrement = parseFloat(d.ieWidthIncrement);
    if (d.ieWatchPauses) o.watchPauses = d.ieWatchPauses === 'true';
    if (d.ieReturnBoost) o.returnBoost = d.ieReturnBoost !== 'false';
    return o;
  }

  function IdleEscalation(el, options) {
    if (!(this instanceof IdleEscalation)) return new IdleEscalation(el, options);
    var o = Object.assign({}, DEFAULTS, readDataOptions(el), options || {});
    o.delay = Math.max(1000, o.delay);                 // never faster than 1 second
    o.colorSteps = Math.max(2, o.colorSteps);
    o.widthSteps = Math.max(0, o.widthSteps);
    o.widthIncrement = Math.min(1, Math.max(0.25, o.widthIncrement));
    this.opts = o;
    this.total = o.colorSteps + o.widthSteps;
    this.el = el;
    this.step = 0;
    this.timer = null;
    this.away = false;
    this.hintEl = el.dataset.ieHint ? document.getElementById(el.dataset.ieHint) : null;

    this._onFocus = this._handleFocus.bind(this);
    this._onBlur = this._handleBlur.bind(this);
    this._onInput = this._handleInput.bind(this);
    this._onVisibility = this._handleVisibility.bind(this);

    el.addEventListener('focus', this._onFocus);
    el.addEventListener('blur', this._onBlur);
    el.addEventListener('input', this._onInput);
    document.addEventListener('visibilitychange', this._onVisibility);

    if (document.activeElement === el && document.hasFocus()) this.start();
  }

  var P = IdleEscalation.prototype;

  P._isEmpty = function () {
    var el = this.el;
    if (el.type === 'checkbox' || el.type === 'radio') return !el.checked;
    return !String(el.value || '').trim();
  };

  P._setStep = function (n) {
    var o = this.opts, el = this.el;
    this.step = n;
    if (n === 0) {
      el.removeAttribute('data-ie-step');
      el.removeAttribute('data-ie-phase');
      el.style.removeProperty('--ie-width-added');
    } else {
      var widthStep = Math.max(0, n - o.colorSteps);
      el.setAttribute('data-ie-step', String(Math.min(n, o.colorSteps)));
      el.setAttribute('data-ie-phase', widthStep > 0 ? 'width' : 'color');
      el.style.setProperty('--ie-width-added', (widthStep * o.widthIncrement) + 'px');
    }
    var peak = n === this.total;
    if (this.hintEl) this.hintEl.classList.toggle('ie-hint--shown', peak);
    el.dispatchEvent(new CustomEvent('idleescalation:step', {
      detail: {
        step: n,
        steps: this.total,
        phase: n === 0 ? 'none' : (n > o.colorSteps ? 'width' : 'color'),
        widthAdded: Math.max(0, n - o.colorSteps) * o.widthIncrement,
        peak: peak
      }
    }));
  };

  P._schedule = function () {
    var self = this;
    clearTimeout(this.timer);
    if (this.away || this.step >= this.total) return; // cap: hold at peak, never loop
    this.timer = setTimeout(function () {
      if (self.away || document.hidden) return;
      if (!self.opts.watchPauses && !self._isEmpty()) return;
      self._setStep(self.step + 1);
      self._schedule();
    }, this.opts.delay);
  };

  P.start = function () {
    this.away = false;
    this._setStep(1);
    if (this.opts.watchPauses || this._isEmpty()) this._schedule();
  };

  P.stop = function () {
    clearTimeout(this.timer);
    this.away = false;
    this._setStep(0);
  };

  // The user left for another tab, window or app. Keep the ring in place.
  P._leave = function () {
    this.away = true;
    clearTimeout(this.timer);
  };

  // The user came back. Mark the spot clearly, then carry on.
  P._return = function () {
    this.away = false;
    if (this.opts.returnBoost && this.step < this.opts.colorSteps &&
        (this.opts.watchPauses || this._isEmpty())) {
      this._setStep(this.opts.colorSteps);
    }
    if (this.opts.watchPauses || this._isEmpty()) this._schedule();
  };

  P._handleFocus = function () {
    if (this.away) this._return();
    else this.start();
  };

  P._handleBlur = function () {
    // When the whole window loses focus, the field still owns focus inside the page.
    if (document.activeElement === this.el && !document.hasFocus()) this._leave();
    else this.stop();
  };

  P._handleInput = function () {
    // Any activity drops the ring back to calm.
    this.away = false;
    this._setStep(1);
    if (this.opts.watchPauses || this._isEmpty()) this._schedule();
    else clearTimeout(this.timer);
  };

  P._handleVisibility = function () {
    if (document.activeElement !== this.el || this.step === 0) return;
    if (document.hidden) this._leave();
    else if (document.hasFocus()) this._return();
  };

  P.destroy = function () {
    this.stop();
    this.el.removeEventListener('focus', this._onFocus);
    this.el.removeEventListener('blur', this._onBlur);
    this.el.removeEventListener('input', this._onInput);
    document.removeEventListener('visibilitychange', this._onVisibility);
    this.el._idleEscalation = null;
  };

  // Attach to every element with the data-idle-escalation attribute.
  IdleEscalation.init = function (root, options) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-idle-escalation]');
    return Array.prototype.map.call(nodes, function (el) {
      if (el._idleEscalation) return el._idleEscalation;
      el._idleEscalation = new IdleEscalation(el, options);
      return el._idleEscalation;
    });
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = IdleEscalation;
  else global.IdleEscalation = IdleEscalation;
})(typeof window !== 'undefined' ? window : this);
