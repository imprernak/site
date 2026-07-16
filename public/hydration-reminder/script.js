/* ===========================================================
   HYDRATE — script.js
   All app logic: countdown timer, LocalStorage persistence,
   progress ring rendering, doodle animation sequencing,
   the notification chime, and the reminder popup flow.

   Note: the very first check-in happens immediately after
   pressing Start — it does NOT wait for the full interval.
   Every check-in after that (from confirm or snooze) runs
   on the normal interval / snooze length.
   =========================================================== */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     Config
     --------------------------------------------------------- */
  const REMINDER_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
  const SNOOZE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
  const RING_CIRCUMFERENCE = 565.48; // 2 * PI * r(90), matches styles.css
  const STORAGE_KEY = "hydrate:state:v1";

  /* ---------------------------------------------------------
     Content: rotate through these so it never feels repetitive
     --------------------------------------------------------- */
  const MOTIVATIONAL_MESSAGES = [
    "Hey, quick pause — your body could use some water.",
    "Small sip, big difference. Go grab some water.",
    "This is your sign to hydrate.",
    "You're doing great. Let's keep it up with some water.",
    "A little water break never hurt anyone.",
    "Your future self says thanks in advance for this glass of water.",
    "Refill, sip, repeat. You've got this.",
    "Water o'clock. No excuses.",
    "Just a friendly nudge — time to hydrate.",
    "Take a breath, take a sip.",
  ];

  const HYDRATION_FACTS = [
    "Your body is about 60% water — it's the main ingredient, not a side note.",
    "Even mild dehydration can affect concentration and mood.",
    "Water helps regulate body temperature and cushion your joints.",
    "Thirst is a late signal — your body is often already low on water by the time you feel it.",
    "Drinking water can help curb unnecessary snacking.",
    "Your brain is roughly 75% water, so hydration directly affects focus.",
    "Water helps carry nutrients and oxygen to your cells.",
    "Mild dehydration can make you feel tired even after a full night's sleep.",
    "Skin, joints, and digestion all quietly depend on staying hydrated.",
    "A well-hydrated body regulates blood pressure more easily.",
  ];

  /* ---------------------------------------------------------
     DOM references
     --------------------------------------------------------- */
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const statusLabel = document.getElementById("statusLabel");
  const timeDisplay = document.getElementById("timeDisplay");
  const ringProgress = document.getElementById("ringProgress");
  const restingDoodle = document.getElementById("restingDoodle");

  const overlay = document.getElementById("overlay");
  const popupDoodle = document.getElementById("popupDoodle");
  const motivationText = document.getElementById("motivationText");
  const factText = document.getElementById("factText");
  const confirmBtn = document.getElementById("confirmBtn");
  const snoozeBtn = document.getElementById("snoozeBtn");

  const notifySound = document.getElementById("notifySound");

  /* ---------------------------------------------------------
     State
     Persisted fields:
       running        - boolean, whether the countdown is active
       nextReminderAt - timestamp (ms) when the next reminder fires
     --------------------------------------------------------- */
  let state = {
    running: false,
    nextReminderAt: null,
  };

  let tickHandle = null;
  let reminderShowing = false;

  // The ring always represents progress toward the *current* countdown length,
  // which is the full interval normally, or the snooze length right after a snooze.
  let currentCycleLengthMs = REMINDER_INTERVAL_MS;

  /* ---------------------------------------------------------
     Persistence
     --------------------------------------------------------- */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
    } catch (err) {
      console.warn("Hydrate: could not read saved state, starting fresh.", err);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Hydrate: could not save state.", err);
    }
  }

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function formatTime(ms) {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function setRingProgress(fraction) {
    // fraction: 0 (empty) -> 1 (full)
    const clamped = Math.min(1, Math.max(0, fraction));
    const offset = RING_CIRCUMFERENCE * (1 - clamped);
    ringProgress.style.strokeDashoffset = String(offset);
  }

  /* ---------------------------------------------------------
     Timer core
     --------------------------------------------------------- */
  function startTimer(durationMs) {
    currentCycleLengthMs = durationMs;
    state.running = true;
    state.nextReminderAt = Date.now() + durationMs;
    saveState();
    updateUIForRunning();
    tick();
  }

  function tick() {
    clearTimeout(tickHandle);

    if (!state.running || !state.nextReminderAt) return;

    const remaining = state.nextReminderAt - Date.now();

    if (remaining <= 0) {
      timeDisplay.textContent = "00:00";
      setRingProgress(1);
      triggerReminder();
      return;
    }

    timeDisplay.textContent = formatTime(remaining);
    setRingProgress(1 - remaining / currentCycleLengthMs);
    tickHandle = setTimeout(tick, 250);
  }

  function updateUIForRunning() {
    startBtn.hidden = true;
    resetBtn.hidden = false;
    statusLabel.textContent = "Counting down to your next sip";
    restingDoodle.classList.remove("is-hidden");
  }

  function resetTimer() {
    clearTimeout(tickHandle);
    state.running = false;
    state.nextReminderAt = null;
    saveState();

    currentCycleLengthMs = REMINDER_INTERVAL_MS;
    setRingProgress(0);
    timeDisplay.textContent = formatTime(REMINDER_INTERVAL_MS);
    statusLabel.textContent = "Ready when you are";
    startBtn.hidden = false;
    resetBtn.hidden = true;
  }

  /* ---------------------------------------------------------
     Reminder popup flow
     --------------------------------------------------------- */
  function triggerReminder() {
    if (reminderShowing) return;
    reminderShowing = true;

    // Pause the countdown while the reminder is up.
    clearTimeout(tickHandle);

    motivationText.textContent = pickRandom(MOTIVATIONAL_MESSAGES);
    factText.textContent = pickRandom(HYDRATION_FACTS);

    overlay.hidden = false;
    playNotifySound();

    // Animation sequence: walk in -> wave -> idle loop until the user responds.
    popupDoodle.className = "doodle doodle-popup state-walk-in";

    popupDoodle.addEventListener(
      "animationend",
      function onWalkInDone() {
        popupDoodle.removeEventListener("animationend", onWalkInDone);
        popupDoodle.className = "doodle doodle-popup state-wave";

        popupDoodle.addEventListener(
          "animationend",
          function onWaveDone() {
            popupDoodle.removeEventListener("animationend", onWaveDone);
            popupDoodle.className = "doodle doodle-popup state-idle";
          },
          { once: true }
        );
      },
      { once: true }
    );
  }

  function dismissReminderWithAnimation(reactionClass, onDone) {
    popupDoodle.className = `doodle doodle-popup ${reactionClass}`;

    popupDoodle.addEventListener(
      "animationend",
      function onReactionDone() {
        popupDoodle.removeEventListener("animationend", onReactionDone);
        popupDoodle.className = "doodle doodle-popup state-walk-out";

        popupDoodle.addEventListener(
          "animationend",
          function onWalkOutDone() {
            popupDoodle.removeEventListener("animationend", onWalkOutDone);
            overlay.hidden = true;
            reminderShowing = false;
            if (onDone) onDone();
          },
          { once: true }
        );
      },
      { once: true }
    );
  }

  function handleConfirm() {
    dismissReminderWithAnimation("state-happy", () => {
      startTimer(REMINDER_INTERVAL_MS);
    });
  }

  function handleSnooze() {
    dismissReminderWithAnimation("state-idle", () => {
      startTimer(SNOOZE_DURATION_MS);
    });
  }

  /* ---------------------------------------------------------
     Notification chime
     --------------------------------------------------------- */
  function playNotifySound() {
    notifySound.currentTime = 0;
    notifySound.volume = 0.7;
    notifySound.play().catch(() => {
      // Autoplay of audio can be blocked until a user gesture happens on the
      // page; the Start button click (a user gesture) covers this for us.
    });
  }

  /* ---------------------------------------------------------
     Resume logic on page load
     --------------------------------------------------------- */
  function resumeFromSavedState() {
    if (!state.running || !state.nextReminderAt) {
      timeDisplay.textContent = formatTime(REMINDER_INTERVAL_MS);
      setRingProgress(0);
      return;
    }

    const remaining = state.nextReminderAt - Date.now();

    if (remaining <= 0) {
      // Time passed while the tab was closed/reloaded — fire the reminder now.
      updateUIForRunning();
      triggerReminder();
      return;
    }

    // Still within a valid countdown — resume seamlessly.
    updateUIForRunning();
    tick();
  }

  /* ---------------------------------------------------------
     Wire up events
     --------------------------------------------------------- */
  startBtn.addEventListener("click", () => {
    // The very first check-in happens right away — no 30 minute wait.
    // Subsequent check-ins (after confirm/snooze) run on the normal schedule.
    startBtn.hidden = true;
    statusLabel.textContent = "Let's do a quick check-in first";
    restingDoodle.classList.remove("is-hidden");
    triggerReminder();
  });

  resetBtn.addEventListener("click", resetTimer);
  confirmBtn.addEventListener("click", handleConfirm);
  snoozeBtn.addEventListener("click", handleSnooze);

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  loadState();
  resumeFromSavedState();
})();
