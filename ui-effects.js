/* Shyam Sports Academy — subtle UI sound feedback
   Web Audio tones are generated locally; no external audio or network requests. */
(() => {
  "use strict";
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;

  let audioContext;
  let lastClickAt = 0;

  function playTone(kind) {
    try {
      if (!audioContext) audioContext = new AudioEngine();
      if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.type = "sine";

      if (kind === "popup") {
        oscillator.frequency.setValueAtTime(660, now);
        oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.075);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
        oscillator.start(now);
        oscillator.stop(now + 0.17);
      } else {
        oscillator.frequency.setValueAtTime(520, now);
        oscillator.frequency.exponentialRampToValueAtTime(410, now + 0.045);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.022, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
      }
    } catch (_) {
      /* Sound is optional; never interrupt an academy action. */
    }
  }

  function isSoundControl(target) {
    return target && target.closest &&
      target.closest('button,a.btn,a.nav-button,a.portal-link,a.contact,a.quick,.nav-link,[role="button"],input[type="submit"],input[type="button"]');
  }

  document.addEventListener("pointerdown", event => {
    const control = isSoundControl(event.target);
    if (!control || control.disabled || control.getAttribute("aria-disabled") === "true" ||
        control.dataset.sound === "off") return;
    const now = Date.now();
    if (now - lastClickAt < 65) return;
    lastClickAt = now;
    playTone("click");
  }, true);

  document.addEventListener("click", event => {
    if (event.detail !== 0) return;
    const control = isSoundControl(event.target);
    if (!control || control.disabled || control.dataset.sound === "off") return;
    playTone("click");
  }, true);

  const popupSelector = 'dialog[open],[role="dialog"],.modal.show,.modal.active,.popup.show,.popup.active';
  const seenPopups = new WeakSet();

  function checkPopup(node) {
    if (!(node instanceof Element)) return;
    const candidates = [];
    if (node.matches(popupSelector)) candidates.push(node);
    node.querySelectorAll?.(popupSelector).forEach(item => candidates.push(item));
    for (const popup of candidates) {
      if (seenPopups.has(popup)) continue;
      seenPopups.add(popup);
      playTone("popup");
    }
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === "childList") record.addedNodes.forEach(checkPopup);
      else if (record.target instanceof Element) checkPopup(record.target);
    }
  });
  observer.observe(document.documentElement, {
    subtree: true, childList: true, attributes: true,
    attributeFilter: ["open", "class", "aria-hidden"]
  });

  ["alert", "confirm", "prompt"].forEach(name => {
    const original = window[name];
    if (typeof original !== "function") return;
    window[name] = function (...args) {
      playTone("popup");
      return original.apply(window, args);
    };
  });
})();
