/**
 * BINANCE 3x3 IMAGE SELECTION CAPTCHA TRAINER
 * Authentic verification practice with 10-second auto-cycle,
 * millisecond speed calculation, and keyboard shortcuts.
 */

(function () {
  'use strict';

  // --- 5 Authentic Challenges from User's Screenshots ---
  const CHALLENGES = [
    {
      id: 0,
      keyword: 'panda',
      title: 'Challenge 1 of 5 (panda A)',
      imageSrc: 'assets/challenges/challenge_1_panda.png',
      correctIndices: [1, 3, 4] // Tiles: Top-mid (panda), Mid-left (panda), Center (panda)
    },
    {
      id: 1,
      keyword: 'elephant',
      title: 'Challenge 2 of 5 (elephant A)',
      imageSrc: 'assets/challenges/challenge_2_elephant.jpg',
      correctIndices: [2, 5, 6, 7] // Tiles: Top-right, Mid-right, Bottom-left, Bottom-mid
    },
    {
      id: 2,
      keyword: 'bicycle',
      title: 'Challenge 3 of 5 (bicycle)',
      imageSrc: 'assets/challenges/challenge_3_bicycle.png',
      correctIndices: [1, 2, 7] // Tiles: Top-mid, Top-right, Bottom-mid
    },
    {
      id: 3,
      keyword: 'elephant',
      title: 'Challenge 4 of 5 (elephant B)',
      imageSrc: 'assets/challenges/challenge_4_elephant.jpg',
      correctIndices: [1, 2, 8] // Tiles: Top-mid, Top-right, Bottom-right
    },
    {
      id: 4,
      keyword: 'panda',
      title: 'Challenge 5 of 5 (panda B)',
      imageSrc: 'assets/challenges/challenge_5_panda.png',
      correctIndices: [1, 6, 7] // Tiles: Top-mid (panda), Bottom-left (panda), Bottom-mid (panda)
    }
  ];

  const CONFIG = {
    ROUND_DURATION_MS: 10000 // 10 seconds per round
  };

  // --- Application State ---
  const state = {
    currentChallengeIndex: 0,
    selectedIndices: new Set(),
    roundStartTime: 0,
    roundActive: false,
    autoCycleEnabled: true,
    soundEnabled: true,
    currentRoundNum: 0,
    stats: {
      totalRounds: 0,
      solvedRounds: 0,
      failedRounds: 0,
      times: [],
      bestTime: null
    }
  };

  // --- DOM Elements ---
  const DOM = {
    captchaCard: document.getElementById('captchaCard'),
    captchaRawImg: document.getElementById('captchaRawImg'),
    promptKeyword: document.getElementById('promptKeyword'),
    interactiveGrid: document.getElementById('interactiveGrid'),
    gridCells: document.querySelectorAll('.grid-cell'),
    timerBarFill: document.getElementById('timerBarFill'),
    timerCountdown: document.getElementById('timerCountdown'),
    btnVerifyHotspot: document.getElementById('btnVerifyHotspot'),
    btnRefreshHotspot: document.getElementById('btnRefreshHotspot'),
    btnCloseHotspot: document.getElementById('btnCloseHotspot'),
    statusBanner: document.getElementById('statusBanner'),
    statusIcon: document.getElementById('statusIcon'),
    statusTitle: document.getElementById('statusTitle'),
    statusDesc: document.getElementById('statusDesc'),
    challengeIndicator: document.getElementById('challengeIndicator'),
    liveTimeDisplay: document.getElementById('liveTimeDisplay'),
    navTimerStatus: document.getElementById('navTimerStatus'),
    btnSoundToggle: document.getElementById('btnSoundToggle'),
    soundIcon: document.getElementById('soundIcon'),
    btnResetStats: document.getElementById('btnResetStats'),
    statLastTime: document.getElementById('statLastTime'),
    statLastSub: document.getElementById('statLastSub'),
    statBestTime: document.getElementById('statBestTime'),
    statBestSub: document.getElementById('statBestSub'),
    statAvgTime: document.getElementById('statAvgTime'),
    statAvgSub: document.getElementById('statAvgSub'),
    statAccuracy: document.getElementById('statAccuracy'),
    statRoundsPlayed: document.getElementById('statRoundsPlayed'),
    rankBadge: document.getElementById('rankBadge'),
    benchmarkFill: document.getElementById('benchmarkFill'),
    historyList: document.getElementById('historyList'),
    tabChips: document.querySelectorAll('.tab-chip'),
    imgModalBackdrop: document.getElementById('imgModalBackdrop'),
    btnOpenImgModal: document.getElementById('btnOpenImgModal'),
    btnCloseImgModal: document.getElementById('btnCloseImgModal'),
    btnDoneModal: document.getElementById('btnDoneModal'),
    previewCards: document.querySelectorAll('.preview-card'),
    phoneModalBackdrop: document.getElementById('phoneModalBackdrop'),
    btnOpenPhoneModal: document.getElementById('btnOpenPhoneModal'),
    btnClosePhoneModal: document.getElementById('btnClosePhoneModal'),
    btnDonePhoneModal: document.getElementById('btnDonePhoneModal'),
    btnCopyPublicLink: document.getElementById('btnCopyPublicLink'),
    btnCopyWifiLink: document.getElementById('btnCopyWifiLink'),
    publicLiveUrlInput: document.getElementById('publicLiveUrlInput'),
    localWifiUrlInput: document.getElementById('localWifiUrlInput')
  };

  // --- Web Audio API Synthesizer ---
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) {
        audioCtx = new AudioClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSuccessSound() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // High-grade pleasant Binance major chord (E5 -> G#5 -> B5)
      const freqs = [659.25, 830.61, 987.77];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.65);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  function playFailSound() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.28);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  function playClickSound() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // ignore
    }
  }

  function playTickSound() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      // ignore
    }
  }

  // --- Local Storage Management ---
  function loadSavedStats() {
    try {
      const saved = localStorage.getItem('binance_img_captcha_stats');
      if (saved) {
        state.stats = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read stats from localStorage:', e);
    }
  }

  function saveStats() {
    try {
      localStorage.setItem('binance_img_captcha_stats', JSON.stringify(state.stats));
    } catch (e) {
      // ignore
    }
  }

  // --- Load Challenge ---
  function loadChallenge(index) {
    state.currentChallengeIndex = index;
    const challenge = CHALLENGES[index];

    // Clear selections
    state.selectedIndices.clear();
    DOM.gridCells.forEach(cell => cell.classList.remove('selected'));

    // Reset status banner
    DOM.statusBanner.classList.remove('visible', 'success', 'fail');

    // Update image and keyword
    DOM.captchaRawImg.src = challenge.imageSrc;
    DOM.promptKeyword.textContent = challenge.keyword;
    DOM.challengeIndicator.textContent = challenge.title;

    // Update active tab chip
    DOM.tabChips.forEach(chip => {
      chip.classList.toggle('active', parseInt(chip.dataset.challenge, 10) === index);
    });

    // Start 10-second round
    startRound();
  }

  // --- 10-Second Timer Engine ---
  let timerRafId = null;
  let lastTickSecond = 10;

  function startRound() {
    state.roundActive = true;
    state.roundStartTime = performance.now();
    state.currentRoundNum++;
    lastTickSecond = 10;

    if (timerRafId) {
      cancelAnimationFrame(timerRafId);
    }

    runTimerTick();
  }

  function runTimerTick() {
    if (!state.roundActive) return;

    const now = performance.now();
    const elapsedMs = now - state.roundStartTime;
    const remainingMs = Math.max(0, CONFIG.ROUND_DURATION_MS - elapsedMs);

    // Live Stopwatch
    DOM.liveTimeDisplay.textContent = (elapsedMs / 1000).toFixed(2) + 's';

    if (state.autoCycleEnabled) {
      // Countdown Progress Bar
      const percent = (remainingMs / CONFIG.ROUND_DURATION_MS) * 100;
      DOM.timerBarFill.style.width = `${percent}%`;

      const remainingSec = (remainingMs / 1000).toFixed(1);
      DOM.timerCountdown.textContent = `${remainingSec}s`;

      // Warning color under 3s
      if (remainingMs <= 3000) {
        DOM.timerBarFill.classList.add('warning');
        const currentSecInt = Math.ceil(remainingMs / 1000);
        if (currentSecInt < lastTickSecond) {
          lastTickSecond = currentSecInt;
          playTickSound();
        }
      } else {
        DOM.timerBarFill.classList.remove('warning');
      }

      // Time Expired (10s)
      if (remainingMs <= 0) {
        handleTimeout();
        return;
      }
    } else {
      DOM.timerBarFill.style.width = '100%';
      DOM.timerCountdown.textContent = 'Paused';
    }

    timerRafId = requestAnimationFrame(runTimerTick);
  }

  function stopTimer() {
    state.roundActive = false;
    if (timerRafId) {
      cancelAnimationFrame(timerRafId);
      timerRafId = null;
    }
  }

  // --- Timeout Handling ---
  function handleTimeout() {
    stopTimer();
    playFailSound();

    DOM.captchaCard.classList.add('shake');
    setTimeout(() => DOM.captchaCard.classList.remove('shake'), 450);

    DOM.statusTitle.textContent = 'Verification Timed Out';
    DOM.statusDesc.textContent = '10.0s exceeded. Loading next challenge...';
    DOM.statusIcon.textContent = '⏱';
    DOM.statusBanner.classList.add('visible', 'fail');

    // Update stats
    state.stats.totalRounds++;
    state.stats.failedRounds++;
    saveStats();
    updateStatsUI('10.0s (Timeout)', false);
    addHistoryItem('Timed Out', '10.00s', false);

    // Advance to next challenge (0 -> 1 -> 2 -> 3 -> 0)
    const nextIdx = (state.currentChallengeIndex + 1) % CHALLENGES.length;

    setTimeout(() => {
      loadChallenge(nextIdx);
    }, 1100);
  }

  // --- Verification Validation ---
  function verifySelection() {
    if (!state.roundActive) return;
    stopTimer();

    const now = performance.now();
    const roundTotalSec = ((now - state.roundStartTime) / 1000).toFixed(2);
    const challenge = CHALLENGES[state.currentChallengeIndex];

    // Check if user's selections match challenge.correctIndices exactly
    const userArray = Array.from(state.selectedIndices).sort();
    const correctArray = [...challenge.correctIndices].sort();

    const isMatch = userArray.length === correctArray.length &&
      userArray.every((val, idx) => val === correctArray[idx]);

    if (isMatch) {
      // SUCCESS!
      handleSuccess(parseFloat(roundTotalSec));
    } else {
      // FAILED
      handleFail(userArray, correctArray);
    }
  }

  function handleSuccess(totalSec) {
    playSuccessSound();

    DOM.statusIcon.textContent = '✓';
    DOM.statusTitle.textContent = 'Verification Success';

    const speedPercentile = calculatePercentile(totalSec);
    DOM.statusDesc.textContent = `Completed in ${totalSec.toFixed(2)}s! ${speedPercentile}`;
    DOM.statusBanner.classList.add('visible', 'success');

    // Update Stats
    state.stats.totalRounds++;
    state.stats.solvedRounds++;
    state.stats.times.push(totalSec);

    if (state.stats.bestTime === null || totalSec < state.stats.bestTime) {
      state.stats.bestTime = totalSec;
    }

    saveStats();
    updateStatsUI(`${totalSec.toFixed(2)}s`, true);
    addHistoryItem('Success', `${totalSec.toFixed(2)}s`, true);

    // Advance to next challenge
    const nextIdx = (state.currentChallengeIndex + 1) % CHALLENGES.length;

    // Auto-advance after 1.25s celebration
    setTimeout(() => {
      loadChallenge(nextIdx);
    }, 1300);
  }

  function handleFail(userSel, correctSel) {
    playFailSound();

    DOM.captchaCard.classList.add('shake');
    setTimeout(() => DOM.captchaCard.classList.remove('shake'), 450);

    DOM.statusIcon.textContent = '✕';
    DOM.statusTitle.textContent = 'Verification Failed';

    let failMsg = 'Incorrect selection. Try again!';
    if (userSel.length === 0) {
      failMsg = 'No images selected! Please select all targets.';
    } else if (userSel.length < correctSel.length) {
      failMsg = 'You missed some target images!';
    } else if (userSel.length > correctSel.length) {
      failMsg = 'You selected non-target images!';
    }

    DOM.statusDesc.textContent = failMsg;
    DOM.statusBanner.classList.add('visible', 'fail');

    // Update Stats
    state.stats.totalRounds++;
    state.stats.failedRounds++;
    saveStats();
    updateStatsUI('Incorrect', false);
    addHistoryItem('Failed', 'Incorrect', false);

    // Advance to next challenge
    const nextIdx = (state.currentChallengeIndex + 1) % CHALLENGES.length;

    setTimeout(() => {
      loadChallenge(nextIdx);
    }, 1200);
  }

  function calculatePercentile(sec) {
    if (sec < 1.0) return 'Godlike Speed! Faster than 99.5% of users!';
    if (sec < 1.5) return 'Incredible! Faster than 96.8% of users!';
    if (sec < 2.2) return 'Fast Trader! Faster than 89.2% of users!';
    if (sec < 3.2) return 'Good Pace! Faster than 72.4% of users!';
    return 'Verified Human! Keep practicing speed.';
  }

  // --- Statistics & UI Updates ---
  function updateStatsUI(lastTimeText, isSuccess) {
    DOM.statLastTime.textContent = lastTimeText;
    DOM.statLastTime.style.color = isSuccess ? 'var(--color-success)' : 'var(--color-danger)';
    DOM.statLastSub.textContent = isSuccess ? 'Valid selection' : 'Try sharper focus';

    if (state.stats.bestTime !== null) {
      DOM.statBestTime.textContent = `${state.stats.bestTime.toFixed(2)}s`;
      DOM.statBestSub.textContent = getRankTitle(state.stats.bestTime);
    }

    if (state.stats.times.length > 0) {
      const sum = state.stats.times.reduce((a, b) => a + b, 0);
      const avg = sum / state.stats.times.length;
      DOM.statAvgTime.textContent = `${avg.toFixed(2)}s`;
      DOM.statAvgSub.textContent = `Over ${state.stats.times.length} solves`;
    }

    const total = state.stats.totalRounds;
    const solved = state.stats.solvedRounds;
    const accuracy = total > 0 ? Math.round((solved / total) * 100) : 0;
    DOM.statAccuracy.textContent = `${accuracy}%`;
    DOM.statRoundsPlayed.textContent = `${solved} / ${total} Solved`;

    // Benchmark progress
    if (state.stats.bestTime !== null) {
      const score = Math.max(0, Math.min(100, Math.round((4.0 - state.stats.bestTime) / 3.0 * 100)));
      DOM.benchmarkFill.style.width = `${Math.max(15, score)}%`;
      DOM.rankBadge.textContent = getRankTitle(state.stats.bestTime).toUpperCase();
    }
  }

  function getRankTitle(sec) {
    if (sec <= 1.0) return 'Binance God';
    if (sec <= 1.6) return 'Speed Demon';
    if (sec <= 2.4) return 'Fast Trader';
    if (sec <= 3.6) return 'Verified Human';
    return 'Rookie';
  }

  function addHistoryItem(status, time, isSuccess) {
    const emptyMsg = DOM.historyList.querySelector('.history-empty');
    if (emptyMsg) emptyMsg.remove();

    const item = document.createElement('div');
    item.className = `history-item ${isSuccess ? 'success' : 'fail'}`;

    const challenge = CHALLENGES[state.currentChallengeIndex];

    item.innerHTML = `
      <div class="history-item-left">
        <span class="history-tag">${status}</span>
        <span>#${state.currentRoundNum} (${challenge.keyword})</span>
      </div>
      <div class="history-item-time">${time}</div>
    `;

    DOM.historyList.insertBefore(item, DOM.historyList.firstChild);

    while (DOM.historyList.children.length > 15) {
      DOM.historyList.removeChild(DOM.historyList.lastChild);
    }
  }

  // --- Grid Cell Selection ---
  function toggleCell(index) {
    if (!state.roundActive) return;
    playClickSound();

    const cell = DOM.gridCells[index];
    if (state.selectedIndices.has(index)) {
      state.selectedIndices.delete(index);
      cell.classList.remove('selected');
    } else {
      state.selectedIndices.add(index);
      cell.classList.add('selected');
    }
  }

  // --- Keyboard Shortcuts ---
  // Maps numpad 1-9 and QWE/ASD/ZXC to grid indices 0-8
  const KEY_MAP = {
    // Top Row
    '1': 0, 'q': 0, 'Q': 0,
    '2': 1, 'w': 1, 'W': 1,
    '3': 2, 'e': 2, 'E': 2,

    // Middle Row
    '4': 3, 'a': 3, 'A': 3,
    '5': 4, 's': 4, 'S': 4,
    '6': 5, 'd': 5, 'D': 5,

    // Bottom Row
    '7': 6, 'z': 6, 'Z': 6,
    '8': 7, 'x': 7, 'X': 7,
    '9': 8, 'c': 8, 'C': 8
  };

  function setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Don't intercept if an input is focused
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        verifySelection();
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        const nextIdx = (state.currentChallengeIndex + 1) % CHALLENGES.length;
        loadChallenge(nextIdx);
        return;
      }

      if (e.key === 'Escape') {
        state.selectedIndices.clear();
        DOM.gridCells.forEach(cell => cell.classList.remove('selected'));
        return;
      }

      if (KEY_MAP.hasOwnProperty(e.key)) {
        const cellIdx = KEY_MAP[e.key];
        toggleCell(cellIdx);
      }
    });
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    // 3x3 Grid Cells
    DOM.gridCells.forEach(cell => {
      cell.addEventListener('click', () => {
        const idx = parseInt(cell.dataset.index, 10);
        toggleCell(idx);
      });
    });

    // Verify Button Hotspot
    DOM.btnVerifyHotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      verifySelection();
    });

    // Refresh Button Hotspot (↺)
    DOM.btnRefreshHotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextIdx = (state.currentChallengeIndex + 1) % CHALLENGES.length;
      loadChallenge(nextIdx);
    });

    // Close Button Hotspot (✕)
    DOM.btnCloseHotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      state.selectedIndices.clear();
      DOM.gridCells.forEach(cell => cell.classList.remove('selected'));
    });

    // Challenge Tab Chips
    DOM.tabChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const challengeIdx = parseInt(chip.dataset.challenge, 10);
        loadChallenge(challengeIdx);
      });
    });

    // Sound Toggle
    DOM.btnSoundToggle.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      DOM.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
      DOM.btnSoundToggle.title = `Sound Effects: ${state.soundEnabled ? 'ON' : 'OFF'}`;
    });

    // Reset Stats
    DOM.btnResetStats.addEventListener('click', () => {
      if (confirm('Reset all your speedrun practice stats?')) {
        state.stats = {
          totalRounds: 0,
          solvedRounds: 0,
          failedRounds: 0,
          times: [],
          bestTime: null
        };
        saveStats();
        DOM.statLastTime.textContent = '--';
        DOM.statLastSub.textContent = 'Ready for round 1';
        DOM.statBestTime.textContent = '--';
        DOM.statBestSub.textContent = 'Target: < 1.50s';
        DOM.statAvgTime.textContent = '--';
        DOM.statAvgSub.textContent = 'Over successful';
        DOM.statAccuracy.textContent = '0%';
        DOM.statRoundsPlayed.textContent = '0 / 0 Solved';
        DOM.rankBadge.textContent = 'ROOKIE';
        DOM.benchmarkFill.style.width = '20%';
        DOM.historyList.innerHTML = '<div class="history-empty">Solve a CAPTCHA to record history</div>';
      }
    });

    // Modal Events
    DOM.btnOpenImgModal.addEventListener('click', () => {
      DOM.imgModalBackdrop.classList.add('open');
    });

    DOM.btnCloseImgModal.addEventListener('click', () => {
      DOM.imgModalBackdrop.classList.remove('open');
    });

    DOM.btnDoneModal.addEventListener('click', () => {
      DOM.imgModalBackdrop.classList.remove('open');
    });

    DOM.imgModalBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.imgModalBackdrop) {
        DOM.imgModalBackdrop.classList.remove('open');
      }
    });

    // Modal challenge selection buttons
    const selectBtns = document.querySelectorAll('.btn-select-challenge');
    selectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        DOM.imgModalBackdrop.classList.remove('open');
        loadChallenge(idx);
      });
    });

    // Phone Modal Handlers
    if (DOM.btnOpenPhoneModal) {
      DOM.btnOpenPhoneModal.addEventListener('click', () => {
        DOM.phoneModalBackdrop.classList.add('open');
      });
    }

    if (DOM.btnClosePhoneModal) {
      DOM.btnClosePhoneModal.addEventListener('click', () => {
        DOM.phoneModalBackdrop.classList.remove('open');
      });
    }

    if (DOM.btnDonePhoneModal) {
      DOM.btnDonePhoneModal.addEventListener('click', () => {
        DOM.phoneModalBackdrop.classList.remove('open');
      });
    }

    if (DOM.phoneModalBackdrop) {
      DOM.phoneModalBackdrop.addEventListener('click', (e) => {
        if (e.target === DOM.phoneModalBackdrop) {
          DOM.phoneModalBackdrop.classList.remove('open');
        }
      });
    }

    // Copy Public Link
    if (DOM.btnCopyPublicLink && DOM.publicLiveUrlInput) {
      DOM.btnCopyPublicLink.addEventListener('click', () => {
        navigator.clipboard.writeText(DOM.publicLiveUrlInput.value).then(() => {
          DOM.btnCopyPublicLink.textContent = 'Copied!';
          DOM.btnCopyPublicLink.classList.add('copied');
          setTimeout(() => {
            DOM.btnCopyPublicLink.textContent = 'Copy';
            DOM.btnCopyPublicLink.classList.remove('copied');
          }, 2000);
        }).catch(() => {
          DOM.publicLiveUrlInput.select();
          document.execCommand('copy');
        });
      });
    }

    // Copy Wi-Fi Link
    if (DOM.btnCopyWifiLink && DOM.localWifiUrlInput) {
      DOM.btnCopyWifiLink.addEventListener('click', () => {
        navigator.clipboard.writeText(DOM.localWifiUrlInput.value).then(() => {
          DOM.btnCopyWifiLink.textContent = 'Copied!';
          DOM.btnCopyWifiLink.classList.add('copied');
          setTimeout(() => {
            DOM.btnCopyWifiLink.textContent = 'Copy';
            DOM.btnCopyWifiLink.classList.remove('copied');
          }, 2000);
        }).catch(() => {
          DOM.localWifiUrlInput.select();
          document.execCommand('copy');
        });
      });
    }
  }

  // --- Bootstrap ---
  function init() {
    loadSavedStats();
    setupEventListeners();
    setupKeyboard();

    if (state.stats.bestTime !== null) {
      updateStatsUI(`${state.stats.bestTime.toFixed(2)}s`, true);
    }

    // Load first challenge (#1 Panda)
    loadChallenge(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
