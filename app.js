/**
 * BINANCE AIRDROP & CAPTCHA SPEEDRUN PRACTICE ENGINE
 * Authentic 3-Second Airdrop Countdown, Random 26-Challenge Rotation,
 * Mobile-First Optimized, Zero-Audio Silent Execution.
 */

(function () {
  'use strict';

  // --- 26 Authentic De-duplicated Challenges from Binance Screenshots ---
  const CHALLENGES = [
    {
      id: 0,
      keyword: 'panda',
      title: 'Challenge #1 (Panda A)',
      badge: '#1 PANDA A',
      imageSrc: 'assets/challenges/challenge_1_panda.png',
      correctIndices: [1, 3, 4]
    },
    {
      id: 1,
      keyword: 'elephant',
      title: 'Challenge #2 (Elephant A)',
      badge: '#2 ELEPHANT A',
      imageSrc: 'assets/challenges/challenge_2_elephant.jpg',
      correctIndices: [2, 5, 6, 7]
    },
    {
      id: 2,
      keyword: 'bicycle',
      title: 'Challenge #3 (Bicycle A)',
      badge: '#3 BICYCLE A',
      imageSrc: 'assets/challenges/challenge_3_bicycle.png',
      correctIndices: [1, 2, 7]
    },
    {
      id: 3,
      keyword: 'elephant',
      title: 'Challenge #4 (Elephant B)',
      badge: '#4 ELEPHANT B',
      imageSrc: 'assets/challenges/challenge_4_elephant.jpg',
      correctIndices: [1, 2, 8]
    },
    {
      id: 4,
      keyword: 'panda',
      title: 'Challenge #5 (Panda B)',
      badge: '#5 PANDA B',
      imageSrc: 'assets/challenges/challenge_5_panda.png',
      correctIndices: [1, 6, 7]
    },
    {
      id: 5,
      keyword: 'bicycle',
      title: 'Challenge #6 (Bicycle B)',
      badge: '#6 BICYCLE B',
      imageSrc: 'assets/challenges/challenge_6_bicycle.jpg',
      correctIndices: [0, 4, 5]
    },
    {
      id: 6,
      keyword: 'airplane',
      title: 'Challenge #7 (Airplane)',
      badge: '#7 AIRPLANE',
      imageSrc: 'assets/challenges/challenge_7_airplane.jpg',
      correctIndices: [0, 3, 8]
    },
    {
      id: 7,
      keyword: 'calculator',
      title: 'Challenge #8 (Calculator A)',
      badge: '#8 CALCULATOR A',
      imageSrc: 'assets/challenges/challenge_8_calculator.jpg',
      correctIndices: [1, 5, 6]
    },
    {
      id: 8,
      keyword: 'pencil',
      title: 'Challenge #9 (Pencil)',
      badge: '#9 PENCIL',
      imageSrc: 'assets/challenges/challenge_9_pencil.jpg',
      correctIndices: [0, 1, 3, 4, 7, 8]
    },
    {
      id: 9,
      keyword: 'scissors',
      title: 'Challenge #10 (Scissors A)',
      badge: '#10 SCISSORS A',
      imageSrc: 'assets/challenges/challenge_10_scissors.jpg',
      correctIndices: [1, 2, 3, 5, 8]
    },
    {
      id: 10,
      keyword: 'notebook',
      title: 'Challenge #11 (Notebook A)',
      badge: '#11 NOTEBOOK A',
      imageSrc: 'assets/challenges/challenge_11_notebook.jpg',
      correctIndices: [0, 4, 7]
    },
    {
      id: 11,
      keyword: 'calculator',
      title: 'Challenge #12 (Calculator B)',
      badge: '#12 CALCULATOR B',
      imageSrc: 'assets/challenges/challenge_12_calculator.jpg',
      correctIndices: [1, 3, 5, 7, 8]
    },
    {
      id: 12,
      keyword: 'scissors',
      title: 'Challenge #13 (Scissors B)',
      badge: '#13 SCISSORS B',
      imageSrc: 'assets/challenges/challenge_13_scissors.jpg',
      correctIndices: [1, 2, 4, 5, 6, 7, 8]
    },
    {
      id: 13,
      keyword: 'calculator',
      title: 'Challenge #14 (Calculator C)',
      badge: '#14 CALCULATOR C',
      imageSrc: 'assets/challenges/challenge_14_calculator.jpg',
      correctIndices: [2, 3, 5, 7, 8]
    },
    {
      id: 14,
      keyword: 'scissors',
      title: 'Challenge #15 (Scissors C)',
      badge: '#15 SCISSORS C',
      imageSrc: 'assets/challenges/challenge_15_scissors.jpg',
      correctIndices: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    {
      id: 15,
      keyword: 'notebook',
      title: 'Challenge #16 (Notebook B)',
      badge: '#16 NOTEBOOK B',
      imageSrc: 'assets/challenges/challenge_16_notebook.jpg',
      correctIndices: [3, 4, 6, 7, 8]
    },
    {
      id: 16,
      keyword: 'calculator',
      title: 'Challenge #17 (Calculator D)',
      badge: '#17 CALCULATOR D',
      imageSrc: 'assets/challenges/challenge_17_calculator.jpg',
      correctIndices: [0, 1, 2, 3, 5, 6, 7]
    },
    {
      id: 17,
      keyword: 'notebook',
      title: 'Challenge #18 (Notebook C)',
      badge: '#18 NOTEBOOK C',
      imageSrc: 'assets/challenges/challenge_18_notebook.jpg',
      correctIndices: [2, 4, 6]
    },
    {
      id: 18,
      keyword: 'notebook',
      title: 'Challenge #19 (Notebook D)',
      badge: '#19 NOTEBOOK D',
      imageSrc: 'assets/challenges/challenge_19_notebook.jpg',
      correctIndices: [3, 6, 7]
    },
    {
      id: 19,
      keyword: 'notebook',
      title: 'Challenge #20 (Notebook E)',
      badge: '#20 NOTEBOOK E',
      imageSrc: 'assets/challenges/challenge_20_notebook.jpg',
      correctIndices: [1, 4, 5, 7, 8]
    },
    {
      id: 20,
      keyword: 'notebook',
      title: 'Challenge #21 (Notebook F)',
      badge: '#21 NOTEBOOK F',
      imageSrc: 'assets/challenges/challenge_21_notebook.jpg',
      correctIndices: [3, 4]
    },
    {
      id: 21,
      keyword: 'panda',
      title: 'Challenge #22 (Panda C)',
      badge: '#22 PANDA C',
      imageSrc: 'assets/challenges/challenge_22_panda.png',
      correctIndices: [0, 2, 3, 8]
    },
    {
      id: 22,
      keyword: 'panda',
      title: 'Challenge #23 (Panda D)',
      badge: '#23 PANDA D',
      imageSrc: 'assets/challenges/challenge_23_panda.png',
      correctIndices: [2, 5, 7]
    },
    {
      id: 23,
      keyword: 'car',
      title: 'Challenge #24 (Car)',
      badge: '#24 CAR',
      imageSrc: 'assets/challenges/challenge_24_car.png',
      correctIndices: [1, 7]
    },
    {
      id: 24,
      keyword: 'elephant',
      title: 'Challenge #25 (Elephant C)',
      badge: '#25 ELEPHANT C',
      imageSrc: 'assets/challenges/challenge_25_elephant.png',
      correctIndices: [5, 8]
    },
    {
      id: 25,
      keyword: 'bicycle',
      title: 'Challenge #26 (Bicycle C)',
      badge: '#26 BICYCLE C',
      imageSrc: 'assets/challenges/challenge_26_bicycle.png',
      correctIndices: [0, 2, 3, 4, 5]
    }
  ];

  // --- Keyboard Mapping (1-9 and QWE/ASD/ZXC) ---
  const KEY_MAP = {
    '1': 0, '2': 1, '3': 2,
    '4': 3, '5': 4, '6': 5,
    '7': 6, '8': 7, '9': 8,
    'q': 0, 'w': 1, 'e': 2,
    'a': 3, 's': 4, 'd': 5,
    'z': 6, 'x': 7, 'c': 8,
    'Q': 0, 'W': 1, 'E': 2,
    'A': 3, 'S': 4, 'D': 5,
    'Z': 6, 'X': 7, 'C': 8
  };

  // --- Application State ---
  const state = {
    mode: 'countdown', // 'countdown' (3-sec airdrop) or 'rapid' (instant captchas)
    currentChallengeIndex: 0,
    selectedIndices: new Set(),
    countdownActive: false,
    countdownSeconds: 3,
    captchaActive: false,
    captchaStartTime: 0,
    stats: {
      totalSolved: 0,
      totalAttempts: 0,
      bestTime: null,
      times: []
    }
  };

  // --- DOM Elements ---
  const DOM = {
    // Mode toggles
    btnModeCountdown: document.getElementById('btnModeCountdown'),
    btnModeInstant: document.getElementById('btnModeInstant'),

    // Airdrop Card elements
    airdropStatusBadge: document.getElementById('airdropStatusBadge'),
    badgeText: document.getElementById('badgeText'),
    coinNameDisplay: document.getElementById('coinNameDisplay'),
    coinSubDisplay: document.getElementById('coinSubDisplay'),
    claimAmountDisplay: document.getElementById('claimAmountDisplay'),
    startsInLabel: document.getElementById('startsInLabel'),
    countdownDisplay: document.getElementById('countdownDisplay'),
    btnClaimAction: document.getElementById('btnClaimAction'),
    btnClaimText: document.getElementById('btnClaimText'),

    // Bottom Navigation
    btnRestartRound: document.getElementById('btnRestartRound'),
    btnOpenGalleryModal: document.getElementById('btnOpenGalleryModal'),
    btnHeaderMore: document.getElementById('btnHeaderMore'),

    // Review Sheet
    reviewSheetBackdrop: document.getElementById('reviewSheetBackdrop'),
    btnCancelReview: document.getElementById('btnCancelReview'),
    btnConfirmReview: document.getElementById('btnConfirmReview'),

    // Captcha Modal
    captchaBackdrop: document.getElementById('captchaBackdrop'),
    captchaModalCard: document.getElementById('captchaModalCard'),
    captchaLoadingOverlay: document.getElementById('captchaLoadingOverlay'),
    captchaImg: document.getElementById('captchaImg'),
    gridCells: document.querySelectorAll('.grid-cell'),
    btnCloseCaptcha: document.getElementById('btnCloseCaptcha'),
    btnRefreshCaptcha: document.getElementById('btnRefreshCaptcha'),
    btnVerifyCaptcha: document.getElementById('btnVerifyCaptcha'),
    captchaSuccessPill: document.getElementById('captchaSuccessPill'),
    captchaFailPill: document.getElementById('captchaFailPill'),

    // Scoreboard & Solve Time Card (User marked area)
    cardLastSolveTime: document.getElementById('cardLastSolveTime'),
    cardBestSolveTime: document.getElementById('cardBestSolveTime'),
    cardSpeedRating: document.getElementById('cardSpeedRating'),
    cardAvgSpeed: document.getElementById('cardAvgSpeed'),
    cardTotalSolvedText: document.getElementById('cardTotalSolvedText'),
    btnQuickPractice: document.getElementById('btnQuickPractice'),
    statLastTime: document.getElementById('statLastTime'),
    statBestTime: document.getElementById('statBestTime'),
    statAvgTime: document.getElementById('statAvgTime'),
    statTotalSolved: document.getElementById('statTotalSolved'),
    btnResetStats: document.getElementById('btnResetStats'),

    // Gallery Modal
    galleryModalBackdrop: document.getElementById('galleryModalBackdrop'),
    galleryGridContainer: document.getElementById('galleryGridContainer'),
    btnCloseGallery: document.getElementById('btnCloseGallery')
  };

  // --- Random Challenge Selector (Never picks same challenge consecutively) ---
  function getRandomChallengeIndex() {
    if (CHALLENGES.length <= 1) return 0;
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * CHALLENGES.length);
    } while (nextIdx === state.currentChallengeIndex);
    return nextIdx;
  }

  // --- Load a Specific or Random Challenge ---
  function loadChallenge(index) {
    state.currentChallengeIndex = index;
    const challenge = CHALLENGES[index];

    // Reset selection state
    state.selectedIndices.clear();
    DOM.gridCells.forEach(cell => cell.classList.remove('selected'));
    DOM.captchaSuccessPill.classList.remove('visible');
    DOM.captchaFailPill.classList.remove('visible');

    // Update challenge image
    DOM.captchaImg.src = challenge.imageSrc;
  }

  // --- Open CAPTCHA Modal with Authentic Brief Loading Screen ---
  function openCaptchaModal() {
    state.captchaActive = true;
    DOM.captchaBackdrop.classList.add('open');

    // Show quick 180ms loading overlay (authenticity matching Binance app)
    DOM.captchaLoadingOverlay.classList.add('visible');
    setTimeout(() => {
      DOM.captchaLoadingOverlay.classList.remove('visible');
      state.captchaStartTime = performance.now();
    }, 180);
  }

  function closeCaptchaModal() {
    state.captchaActive = false;
    DOM.captchaBackdrop.classList.remove('open');
    DOM.captchaSuccessPill.classList.remove('visible');
    DOM.captchaFailPill.classList.remove('visible');
    state.selectedIndices.clear();
    DOM.gridCells.forEach(cell => cell.classList.remove('selected'));
  }

  // --- 3-Second Airdrop Countdown Engine ---
  let countdownTimerId = null;

  function startCountdownCycle() {
    if (countdownTimerId) {
      clearInterval(countdownTimerId);
      countdownTimerId = null;
    }

    state.countdownActive = true;
    state.countdownSeconds = 3;

    // Reset active card to "Upcoming" state
    DOM.airdropStatusBadge.className = 'status-badge upcoming';
    DOM.badgeText.textContent = 'Upcoming';
    DOM.coinNameDisplay.textContent = 'To Be Revealed'; // Unknown coin name per instruction
    DOM.coinSubDisplay.textContent = 'Project Alpha';
    DOM.claimAmountDisplay.textContent = '???';
    DOM.startsInLabel.textContent = 'Starts in';
    DOM.countdownDisplay.textContent = `00H : 00M : 03S`;
    DOM.countdownDisplay.classList.remove('active-glow');

    // Claim button disabled during countdown
    DOM.btnClaimAction.className = 'btn-claim-primary disabled';
    DOM.btnClaimText.textContent = 'Claim';

    countdownTimerId = setInterval(() => {
      state.countdownSeconds--;

      if (state.countdownSeconds > 0) {
        const secStr = state.countdownSeconds < 10 ? `0${state.countdownSeconds}` : `${state.countdownSeconds}`;
        DOM.countdownDisplay.textContent = `00H : 00M : ${secStr}S`;
      } else {
        // Countdown reached 00S! Airdrop goes live!
        clearInterval(countdownTimerId);
        countdownTimerId = null;
        triggerAirdropLive();
      }
    }, 1000);
  }

  // --- Trigger Airdrop Live State (Video 00:04) ---
  function triggerAirdropLive() {
    state.countdownActive = false;

    // Update status to Ongoing
    DOM.airdropStatusBadge.className = 'status-badge ongoing';
    DOM.badgeText.textContent = 'Ongoing';
    DOM.claimAmountDisplay.textContent = '72.82 ???';
    DOM.startsInLabel.textContent = 'Ends in';
    DOM.countdownDisplay.textContent = '23H : 59M : 59S';
    DOM.countdownDisplay.classList.add('active-glow');

    // Activate Claim button
    DOM.btnClaimAction.className = 'btn-claim-primary active';
    DOM.btnClaimText.textContent = 'Claim';
  }

  // --- Handle Claim Button Click ---
  function handleClaimClick() {
    if (DOM.btnClaimAction.classList.contains('disabled')) return;

    // Open "Review your claim" bottom sheet (User must tap Confirm to proceed to CAPTCHA)
    DOM.reviewSheetBackdrop.classList.add('open');
  }

  function proceedFromReviewToCaptcha() {
    DOM.reviewSheetBackdrop.classList.remove('open');
    // Load a fresh random challenge
    loadChallenge(getRandomChallengeIndex());
    // Open the CAPTCHA modal!
    openCaptchaModal();
  }

  // --- Toggle Grid Cell Selection (100% SILENT - NO SOUND) ---
  function toggleCell(index) {
    if (!state.captchaActive) return;

    if (state.selectedIndices.has(index)) {
      state.selectedIndices.delete(index);
      DOM.gridCells[index].classList.remove('selected');
    } else {
      state.selectedIndices.add(index);
      DOM.gridCells[index].classList.add('selected');
    }
  }

  // --- Verify User Selection ---
  function verifyCaptcha() {
    if (!state.captchaActive) return;

    const challenge = CHALLENGES[state.currentChallengeIndex];
    const userArray = Array.from(state.selectedIndices).sort();
    const correctArray = [...challenge.correctIndices].sort();

    const isCorrect = userArray.length === correctArray.length &&
      userArray.every((val, i) => val === correctArray[i]);

    const solveTimeMs = performance.now() - state.captchaStartTime;
    const solveSec = (solveTimeMs / 1000).toFixed(2);

    state.stats.totalAttempts++;

    if (isCorrect) {
      // SUCCESS (Video Frame 00:09)
      DOM.captchaSuccessPill.classList.add('visible');
      DOM.captchaFailPill.classList.remove('visible');

      // Update stats
      state.stats.totalSolved++;
      state.stats.times.push(parseFloat(solveSec));

      if (state.stats.bestTime === null || parseFloat(solveSec) < state.stats.bestTime) {
        state.stats.bestTime = parseFloat(solveSec);
      }

      updateScoreboard(solveSec);
      saveStats();

      // Close modal and cycle to next round after 850ms
      setTimeout(() => {
        closeCaptchaModal();

        if (state.mode === 'countdown') {
          // Restart the 3-second countdown for the next airdrop attempt!
          startCountdownCycle();
        } else {
          // Rapid mode: immediately open next random CAPTCHA!
          setTimeout(() => {
            loadChallenge(getRandomChallengeIndex());
            openCaptchaModal();
          }, 300);
        }
      }, 850);
    } else {
      // INCORRECT SELECTION:
      // User instruction: "ar keo jodi ekber captcha ta vul kore tahole sathe sathe arekta captcha screen a load kore diba , vul korle amr home page a nia jaba na kintu"
      DOM.captchaFailPill.textContent = '✕ Incorrect - Loading Next...';
      DOM.captchaFailPill.classList.add('visible');
      DOM.captchaSuccessPill.classList.remove('visible');

      // Clear current cell selections immediately
      state.selectedIndices.clear();
      DOM.gridCells.forEach(cell => cell.classList.remove('selected'));

      // Do NOT close the modal! Stay in the CAPTCHA modal and load a new random challenge immediately
      setTimeout(() => {
        loadChallenge(getRandomChallengeIndex());
        state.captchaStartTime = performance.now();
        DOM.captchaFailPill.classList.remove('visible');
      }, 400);
    }
  }

  // --- Update Scoreboard & Solve Time Card UI ---
  function updateScoreboard(lastSolveSec) {
    // 1. Update Card 2 (User marked area)
    if (DOM.cardLastSolveTime && lastSolveSec) {
      DOM.cardLastSolveTime.textContent = `${lastSolveSec} s`;
      DOM.cardLastSolveTime.classList.remove('updated');
      void DOM.cardLastSolveTime.offsetWidth; // trigger reflow for animation
      DOM.cardLastSolveTime.classList.add('updated');
    }

    if (DOM.cardBestSolveTime && state.stats.bestTime !== null) {
      DOM.cardBestSolveTime.textContent = `${state.stats.bestTime.toFixed(2)} s`;
    }

    if (DOM.cardAvgSpeed && state.stats.times.length > 0) {
      const avg = state.stats.times.reduce((a, b) => a + b, 0) / state.stats.times.length;
      DOM.cardAvgSpeed.textContent = `Avg: ${avg.toFixed(2)} s`;
    }

    if (DOM.cardTotalSolvedText) {
      DOM.cardTotalSolvedText.textContent = `Solved: ${state.stats.totalSolved} / ${CHALLENGES.length}`;
    }

    if (DOM.cardSpeedRating && lastSolveSec) {
      const sec = parseFloat(lastSolveSec);
      if (sec < 1.5) {
        DOM.cardSpeedRating.textContent = '⚡ Godspeed! (< 1.5s)';
      } else if (sec < 2.5) {
        DOM.cardSpeedRating.textContent = '🚀 Lightning Fast! (< 2.5s)';
      } else if (sec < 4.0) {
        DOM.cardSpeedRating.textContent = '🎯 Great Speed!';
      } else {
        DOM.cardSpeedRating.textContent = '👍 Solved! Try < 2.5s';
      }
    }

    // 2. Update Legacy Scoreboard if present
    if (DOM.statLastTime && lastSolveSec) {
      DOM.statLastTime.textContent = `${lastSolveSec}s`;
    }

    if (DOM.statBestTime && state.stats.bestTime !== null) {
      DOM.statBestTime.textContent = `${state.stats.bestTime.toFixed(2)}s`;
    }

    if (DOM.statAvgTime && state.stats.times.length > 0) {
      const avg = state.stats.times.reduce((a, b) => a + b, 0) / state.stats.times.length;
      DOM.statAvgTime.textContent = `${avg.toFixed(2)}s`;
    }

    if (DOM.statTotalSolved) {
      DOM.statTotalSolved.textContent = `${state.stats.totalSolved}`;
    }
  }

  // --- LocalStorage Stats Persistence ---
  function saveStats() {
    try {
      localStorage.setItem('binance_captcha_speedrun_v2', JSON.stringify({
        totalSolved: state.stats.totalSolved,
        totalAttempts: state.stats.totalAttempts,
        bestTime: state.stats.bestTime,
        times: state.stats.times.slice(-30)
      }));
    } catch (e) {}
  }

  function loadStats() {
    try {
      const saved = localStorage.getItem('binance_captcha_speedrun_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        state.stats.totalSolved = parsed.totalSolved || 0;
        state.stats.totalAttempts = parsed.totalAttempts || 0;
        state.stats.bestTime = parsed.bestTime || null;
        state.stats.times = parsed.times || [];
        updateScoreboard();
      }
    } catch (e) {}
  }

  // --- Render Gallery Grid (All 26 Challenges) ---
  function renderGallery() {
    if (!DOM.galleryGridContainer) return;

    DOM.galleryGridContainer.innerHTML = CHALLENGES.map((c, i) => `
      <div class="gallery-card" data-idx="${i}">
        <img src="${c.imageSrc}" alt="${c.title}" loading="lazy">
        <div class="gallery-card-info">
          <span class="gallery-card-badge">${c.badge}</span>
          <span class="gallery-card-keyword">Target: <strong>${c.keyword}</strong></span>
        </div>
      </div>
    `).join('');

    const cards = DOM.galleryGridContainer.querySelectorAll('.gallery-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx, 10);
        DOM.galleryModalBackdrop.classList.remove('open');
        loadChallenge(idx);
        openCaptchaModal();
      });
    });
  }

  // --- Setup Event Listeners ---
  function setupEventListeners() {
    // Mode Toggles
    DOM.btnModeCountdown.addEventListener('click', () => {
      state.mode = 'countdown';
      DOM.btnModeCountdown.classList.add('active');
      DOM.btnModeInstant.classList.remove('active');
      startCountdownCycle();
    });

    DOM.btnModeInstant.addEventListener('click', () => {
      state.mode = 'rapid';
      DOM.btnModeInstant.classList.add('active');
      DOM.btnModeCountdown.classList.remove('active');
      if (countdownTimerId) clearInterval(countdownTimerId);
      loadChallenge(getRandomChallengeIndex());
      openCaptchaModal();
    });

    // Claim Action Button
    DOM.btnClaimAction.addEventListener('click', handleClaimClick);

    // Bottom Navigation Bar
    DOM.btnRestartRound.addEventListener('click', () => {
      startCountdownCycle();
    });

    DOM.btnOpenGalleryModal.addEventListener('click', () => {
      DOM.galleryModalBackdrop.classList.add('open');
    });

    DOM.btnHeaderMore.addEventListener('click', () => {
      DOM.galleryModalBackdrop.classList.add('open');
    });

    DOM.btnCloseGallery.addEventListener('click', () => {
      DOM.galleryModalBackdrop.classList.remove('open');
    });

    DOM.galleryModalBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.galleryModalBackdrop) {
        DOM.galleryModalBackdrop.classList.remove('open');
      }
    });

    // Review Sheet Buttons
    DOM.btnCancelReview.addEventListener('click', () => {
      DOM.reviewSheetBackdrop.classList.remove('open');
    });

    DOM.btnConfirmReview.addEventListener('click', () => {
      proceedFromReviewToCaptcha();
    });

    DOM.reviewSheetBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.reviewSheetBackdrop) {
        DOM.reviewSheetBackdrop.classList.remove('open');
      }
    });

    // 3x3 Grid Cells (Silent, fast tap)
    DOM.gridCells.forEach(cell => {
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(cell.dataset.index, 10);
        toggleCell(idx);
      });
    });

    // CAPTCHA Hotspots
    DOM.btnVerifyCaptcha.addEventListener('click', (e) => {
      e.stopPropagation();
      verifyCaptcha();
    });

    DOM.btnRefreshCaptcha.addEventListener('click', (e) => {
      e.stopPropagation();
      // Load next random challenge
      loadChallenge(getRandomChallengeIndex());
    });

    DOM.btnCloseCaptcha.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCaptchaModal();
      if (state.mode === 'countdown') {
        startCountdownCycle();
      }
    });

    // Quick Practice Button on Solve Time Card
    if (DOM.btnQuickPractice) {
      DOM.btnQuickPractice.addEventListener('click', () => {
        loadChallenge(getRandomChallengeIndex());
        openCaptchaModal();
      });
    }

    // Reset Stats
    if (DOM.btnResetStats) {
      DOM.btnResetStats.addEventListener('click', () => {
        state.stats = {
          totalSolved: 0,
          totalAttempts: 0,
          bestTime: null,
          times: []
        };
        saveStats();
        if (DOM.statLastTime) DOM.statLastTime.textContent = '--';
        if (DOM.statBestTime) DOM.statBestTime.textContent = '--';
        if (DOM.statAvgTime) DOM.statAvgTime.textContent = '--';
        if (DOM.statTotalSolved) DOM.statTotalSolved.textContent = '0';
        if (DOM.cardLastSolveTime) DOM.cardLastSolveTime.textContent = '-- s';
        if (DOM.cardBestSolveTime) DOM.cardBestSolveTime.textContent = '-- s';
        if (DOM.cardAvgSpeed) DOM.cardAvgSpeed.textContent = 'Avg: -- s';
        if (DOM.cardTotalSolvedText) DOM.cardTotalSolvedText.textContent = `Solved: 0 / ${CHALLENGES.length}`;
        if (DOM.cardSpeedRating) DOM.cardSpeedRating.textContent = 'Solve a captcha to see rating';
      });
    }

    // Keyboard Shortcuts for Desktop Testing
    window.addEventListener('keydown', (e) => {
      if (!state.captchaActive) {
        if (e.key === ' ' || e.key === 'Enter') {
          if (!DOM.btnClaimAction.classList.contains('disabled')) {
            handleClaimClick();
          }
        }
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        verifyCaptcha();
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        loadChallenge(getRandomChallengeIndex());
        return;
      }

      if (e.key === 'Escape') {
        closeCaptchaModal();
        return;
      }

      if (KEY_MAP.hasOwnProperty(e.key)) {
        const cellIdx = KEY_MAP[e.key];
        toggleCell(cellIdx);
      }
    });
  }

  // --- Clock updater for authentic iOS / Android status bar ---
  function updateDeviceClock() {
    const clockEl = document.getElementById('deviceClock');
    if (!clockEl) return;
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    clockEl.textContent = `${hours}:${minutes}`;
  }

  // --- Bootstrap ---
  function init() {
    loadStats();
    renderGallery();
    setupEventListeners();
    updateDeviceClock();
    setInterval(updateDeviceClock, 30000);

    // Initial load: start the 3-second countdown cycle
    loadChallenge(getRandomChallengeIndex());
    startCountdownCycle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
