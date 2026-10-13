/**
 * Khushi Mehta — Developer Portfolio & CodeQuest Bug Hunt Engine
 * Built with Vanilla JavaScript, Web Audio API, and DOM Animations
 */

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------------------
  // 1. Navigation, Mobile Menu & Active Link Tracking
  // -------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky Navbar Blur On Scroll
  const handleScroll = () => {
    if (window.scrollY > 25) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile Menu Drawer Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile drawer when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active Section Spy with IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));

  // -------------------------------------------------------------------------
  // 2. Scroll Reveal Animations
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add("show"));
  }

  // -------------------------------------------------------------------------
  // 3. Technical Skills Interactive Filtering
  // -------------------------------------------------------------------------
  const filterChips = document.querySelectorAll(".filter-chip");
  const skillCards = document.querySelectorAll(".skill-category-card");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-selected", "true");

      const filterVal = chip.dataset.filter;

      skillCards.forEach((card) => {
        if (filterVal === "all" || card.dataset.category === filterVal) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 20);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Web Audio API Procedural Sound Synthesizer (Zero Audio File Latency)
  // -------------------------------------------------------------------------
  let audioEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = "sine", duration = 0.12, volume = 0.15) {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  const soundFx = {
    patch: () => {
      playTone(520, "triangle", 0.08, 0.18);
      setTimeout(() => playTone(880, "sine", 0.1, 0.2), 40);
    },
    combo: (mult) => {
      const baseFreq = 400 + mult * 120;
      playTone(baseFreq, "sine", 0.12, 0.2);
      setTimeout(() => playTone(baseFreq * 1.25, "triangle", 0.14, 0.2), 50);
    },
    hotfix: () => {
      playTone(300, "sawtooth", 0.35, 0.25);
      setTimeout(() => playTone(600, "triangle", 0.3, 0.25), 100);
      setTimeout(() => playTone(1200, "sine", 0.4, 0.25), 200);
    },
    damage: () => {
      playTone(180, "sawtooth", 0.18, 0.25);
    },
    victory: () => {
      playTone(523.25, "triangle", 0.15, 0.2);
      setTimeout(() => playTone(659.25, "triangle", 0.15, 0.2), 140);
      setTimeout(() => playTone(783.99, "triangle", 0.15, 0.2), 280);
      setTimeout(() => playTone(1046.5, "sine", 0.35, 0.25), 420);
    },
  };

  const audioToggleBtn = document.getElementById("audioToggleBtn");
  const audioIcon = document.getElementById("audioIcon");
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener("click", () => {
      initAudio();
      audioEnabled = !audioEnabled;
      audioIcon.textContent = audioEnabled ? "🔊" : "🔇";
      audioToggleBtn.setAttribute(
        "aria-label",
        audioEnabled ? "Mute Sound Effects" : "Enable Sound Effects"
      );
    });
  }

  // -------------------------------------------------------------------------
  // 5. CodeQuest: Bug Hunt Game Engine
  // -------------------------------------------------------------------------
  const gameViewport = document.getElementById("gameViewport");
  const playfield = document.getElementById("playfield");
  const bugsStage = document.getElementById("bugsStage");
  const screenStart = document.getElementById("screenStart");
  const screenGameOver = document.getElementById("screenGameOver");
  const startGameBtn = document.getElementById("startGameBtn");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const gameRestartBtn = document.getElementById("gameRestartBtn");
  const hotfixTriggerBtn = document.getElementById("hotfixTriggerBtn");
  const hotfixFill = document.getElementById("hotfixFill");
  const hotfixPercent = document.getElementById("hotfixPercent");

  const hudScore = document.getElementById("hudScore");
  const hudStreak = document.getElementById("hudStreak");
  const hudTimer = document.getElementById("hudTimer");
  const hudHighScore = document.getElementById("hudHighScore");
  const stabilityBar = document.getElementById("stabilityBar");
  const stabilityText = document.getElementById("stabilityText");
  const comboBanner = document.getElementById("comboBanner");

  // Results screen elements
  const resultScore = document.getElementById("resultScore");
  const resultBugs = document.getElementById("resultBugs");
  const resultStreak = document.getElementById("resultStreak");
  const resultRank = document.getElementById("resultRank");
  const overTitle = document.getElementById("overTitle");
  const overBadge = document.getElementById("overBadge");

  // Game Configuration & State
  const GAME_DURATION = 45; // seconds
  let gameState = "IDLE"; // IDLE, PLAYING, OVER
  let score = 0;
  let bugsPatched = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let stability = 100;
  let hotfixCharge = 0;
  let timeRemaining = GAME_DURATION;
  let gameTimerInterval = null;
  let spawnInterval = null;
  let activeBugs = [];
  let bugIdCounter = 0;

  // Retrieve Best High Score from localStorage
  const STORAGE_KEY = "khushi_portfolio_bug_hunt_best";
  let highScore = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  if (hudHighScore) hudHighScore.textContent = highScore;

  // Bug Archetypes
  const BUG_TYPES = [
    {
      type: "nullpointer",
      name: "NullPointer",
      icon: "🐞",
      points: 100,
      speed: 1.25,
      stabilityDamage: 8,
    },
    {
      type: "syntax",
      name: "SyntaxError",
      icon: "⚠️",
      points: 150,
      speed: 1.05,
      stabilityDamage: 7,
    },
    {
      type: "sqli",
      name: "SQL Injection",
      icon: "🛡️",
      points: 250,
      speed: 1.45,
      stabilityDamage: 14,
    },
    {
      type: "memory",
      name: "MemoryLeak",
      icon: "💧",
      points: 200,
      speed: 0.95,
      stabilityDamage: 10,
    },
    {
      type: "race",
      name: "RaceCondition",
      icon: "⚡",
      points: 300,
      speed: 1.6,
      stabilityDamage: 12,
    },
  ];

  function updateHUD() {
    if (hudScore) hudScore.textContent = score;
    if (hudStreak) hudStreak.textContent = `${Math.max(1, Math.min(5, Math.floor(currentStreak / 3) + 1))}x`;
    if (hudTimer) hudTimer.textContent = `${timeRemaining}s`;

    if (stabilityBar && stabilityText) {
      const clampedStability = Math.max(0, Math.min(100, stability));
      stabilityBar.style.width = `${clampedStability}%`;

      if (clampedStability > 60) {
        stabilityBar.style.background = "linear-gradient(90deg, #10b981 0%, #34d399 100%)";
        stabilityText.textContent = `${clampedStability}% (Healthy)`;
        stabilityText.style.color = "#34d399";
      } else if (clampedStability > 30) {
        stabilityBar.style.background = "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)";
        stabilityText.textContent = `${clampedStability}% (Degraded)`;
        stabilityText.style.color = "#f59e0b";
      } else {
        stabilityBar.style.background = "linear-gradient(90deg, #ef4444 0%, #f87171 100%)";
        stabilityText.textContent = `${clampedStability}% (Critical)`;
        stabilityText.style.color = "#ef4444";
      }
    }

    if (hotfixFill && hotfixPercent && hotfixTriggerBtn) {
      const clampedCharge = Math.min(100, hotfixCharge);
      hotfixFill.style.width = `${clampedCharge}%`;
      hotfixPercent.textContent = `${clampedCharge}%`;
      hotfixTriggerBtn.disabled = clampedCharge < 100;
    }
  }

  function spawnBug() {
    if (gameState !== "PLAYING") return;

    const laneIndex = Math.floor(Math.random() * 5); // 0 to 4
    const archetype = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
    const id = ++bugIdCounter;

    // Viewport calculation
    const laneWidthPercent = 20; // 100% / 5 lanes
    const xPosPercent = laneIndex * laneWidthPercent + 10; // Center in lane

    const bugEl = document.createElement("div");
    bugEl.className = `bug-entity bug-${archetype.type}`;
    bugEl.id = `bug-${id}`;
    bugEl.setAttribute("data-lane", laneIndex);
    bugEl.setAttribute("data-id", id);
    bugEl.style.left = `${xPosPercent}%`;
    bugEl.style.top = "-40px";

    bugEl.innerHTML = `
      <div class="bug-sprite" aria-hidden="true">${archetype.icon}</div>
      <div class="bug-label-pill">${archetype.name}</div>
    `;

    // Click / Touch Squash Event
    const squashHandler = (e) => {
      e.stopPropagation();
      patchBug(id);
    };

    bugEl.addEventListener("mousedown", squashHandler);
    bugEl.addEventListener("touchstart", squashHandler, { passive: true });

    bugsStage.appendChild(bugEl);

    const bugObj = {
      id,
      el: bugEl,
      archetype,
      lane: laneIndex,
      y: -40,
      speed: (1.2 + Math.random() * 0.8) * archetype.speed,
    };

    activeBugs.push(bugObj);
  }

  function gameLoop() {
    if (gameState !== "PLAYING") return;

    const viewportHeight = gameViewport.clientHeight;

    for (let i = activeBugs.length - 1; i >= 0; i--) {
      const bug = activeBugs[i];
      bug.y += bug.speed;
      bug.el.style.top = `${bug.y}px`;

      // Check if bug breached production perimeter (reached bottom)
      if (bug.y >= viewportHeight - 40) {
        // Bug slipped past!
        stability = Math.max(0, stability - bug.archetype.stabilityDamage);
        currentStreak = 0;
        soundFx.damage();

        // Remove bug element
        if (bug.el.parentNode) {
          bug.el.parentNode.removeChild(bug.el);
        }
        activeBugs.splice(i, 1);

        updateHUD();

        // Check crash condition
        if (stability <= 0) {
          endGame("CRASH");
          return;
        }
      }
    }

    requestAnimationFrame(gameLoop);
  }

  function patchBug(bugId) {
    if (gameState !== "PLAYING") return;

    const bugIndex = activeBugs.findIndex((b) => b.id === bugId);
    if (bugIndex === -1) return;

    const bug = activeBugs[bugIndex];
    bugsPatched++;
    currentStreak++;
    if (currentStreak > maxStreak) maxStreak = currentStreak;

    // Multiplier calculation
    const mult = Math.min(5, Math.floor(currentStreak / 3) + 1);
    const earnedPoints = bug.archetype.points * mult;
    score += earnedPoints;

    // Heal stability slightly
    stability = Math.min(100, stability + 2);

    // Charge hotfix meter
    hotfixCharge = Math.min(100, hotfixCharge + 12);

    // Sound FX
    if (mult > 1 && currentStreak % 3 === 0) {
      soundFx.combo(mult);
      showComboToast(`${mult}x MULTIPLIER!`);
    } else {
      soundFx.patch();
    }

    // Spawn floating score particle
    createParticle(bug.el, `+${earnedPoints}`);

    // Remove element
    if (bug.el.parentNode) {
      bug.el.parentNode.removeChild(bug.el);
    }
    activeBugs.splice(bugIndex, 1);

    updateHUD();
  }

  function createParticle(targetEl, text) {
    if (!targetEl || !bugsStage) return;
    const rect = targetEl.getBoundingClientRect();
    const stageRect = bugsStage.getBoundingClientRect();

    const particle = document.createElement("div");
    particle.className = "patch-particle";
    particle.textContent = text;
    particle.style.left = `${rect.left - stageRect.left + rect.width / 2}px`;
    particle.style.top = `${rect.top - stageRect.top}px`;

    bugsStage.appendChild(particle);
    setTimeout(() => {
      if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 600);
  }

  function showComboToast(text) {
    if (!comboBanner) return;
    comboBanner.textContent = text;
    comboBanner.classList.add("show");
    setTimeout(() => {
      comboBanner.classList.remove("show");
    }, 800);
  }

  function triggerHotfixOverdrive() {
    if (gameState !== "PLAYING" || hotfixCharge < 100) return;

    hotfixCharge = 0;
    soundFx.hotfix();

    // Visual wave sweep
    const wave = document.createElement("div");
    wave.className = "hotfix-wave";
    gameViewport.appendChild(wave);
    setTimeout(() => {
      if (wave.parentNode) wave.parentNode.removeChild(wave);
    }, 550);

    // Patch all active bugs on screen
    const bugCount = activeBugs.length;
    let bonusPoints = 500;

    activeBugs.forEach((bug) => {
      bonusPoints += bug.archetype.points;
      bugsPatched++;
      if (bug.el.parentNode) {
        bug.el.parentNode.removeChild(bug.el);
      }
    });

    activeBugs = [];
    score += bonusPoints;
    stability = Math.min(100, stability + 15);
    currentStreak += bugCount;
    if (currentStreak > maxStreak) maxStreak = currentStreak;

    showComboToast(`HOTFIX DEPLOYED! +${bonusPoints}`);
    updateHUD();
  }

  function patchLane(laneIndex) {
    if (gameState !== "PLAYING") return;

    // Find the bug in this lane closest to the bottom (highest y)
    let candidate = null;
    let highestY = -999;

    for (let i = 0; i < activeBugs.length; i++) {
      if (activeBugs[i].lane === laneIndex && activeBugs[i].y > highestY) {
        highestY = activeBugs[i].y;
        candidate = activeBugs[i];
      }
    }

    if (candidate) {
      patchBug(candidate.id);
    }
  }

  // Keyboard shortcut binding: [1]-[5] for lanes, [Space] for Hotfix
  window.addEventListener("keydown", (e) => {
    if (gameState !== "PLAYING") return;

    if (e.key >= "1" && e.key <= "5") {
      const lane = parseInt(e.key, 10) - 1;
      patchLane(lane);
    } else if (e.code === "Space" || e.key === " ") {
      e.preventDefault();
      if (hotfixCharge >= 100) {
        triggerHotfixOverdrive();
      }
    }
  });

  if (hotfixTriggerBtn) {
    hotfixTriggerBtn.addEventListener("click", triggerHotfixOverdrive);
  }

  function startGame() {
    initAudio();
    gameState = "PLAYING";
    score = 0;
    bugsPatched = 0;
    currentStreak = 0;
    maxStreak = 0;
    stability = 100;
    hotfixCharge = 0;
    timeRemaining = GAME_DURATION;
    activeBugs = [];
    bugIdCounter = 0;

    if (bugsStage) bugsStage.innerHTML = "";
    if (screenStart) screenStart.classList.add("hidden");
    if (screenGameOver) screenGameOver.classList.add("hidden");

    updateHUD();

    // Start Clock
    clearInterval(gameTimerInterval);
    gameTimerInterval = setInterval(() => {
      timeRemaining--;
      updateHUD();
      if (timeRemaining <= 0) {
        endGame("TIMEOUT");
      }
    }, 1000);

    // Bug Spawn Rhythm
    clearInterval(spawnInterval);
    spawnInterval = setInterval(() => {
      spawnBug();
    }, 850);

    // Initial bug burst
    setTimeout(spawnBug, 200);
    setTimeout(spawnBug, 600);

    requestAnimationFrame(gameLoop);
  }

  function endGame(reason) {
    gameState = "OVER";
    clearInterval(gameTimerInterval);
    clearInterval(spawnInterval);

    // High Score Persistence
    if (score > highScore) {
      highScore = score;
      localStorage.setItem(STORAGE_KEY, highScore.toString());
      if (hudHighScore) hudHighScore.textContent = highScore;
    }

    // Rank Calculation
    let rank = "Junior Bug Hunter";
    if (score >= 3500) {
      rank = "Principal Architect";
    } else if (score >= 2400) {
      rank = "Senior Full-Stack Engineer";
    } else if (score >= 1400) {
      rank = "Full-Stack Developer Intern";
    }

    if (resultScore) resultScore.textContent = score;
    if (resultBugs) resultBugs.textContent = bugsPatched;
    if (resultStreak) resultStreak.textContent = `${maxStreak}x`;
    if (resultRank) resultRank.textContent = rank;

    if (reason === "TIMEOUT") {
      if (overBadge) overBadge.textContent = "DIAGNOSTIC PASSED";
      if (overTitle) overTitle.textContent = "Server Maintained & Stable!";
      soundFx.victory();
    } else {
      if (overBadge) {
        overBadge.textContent = "SERVER BREACH";
        overBadge.style.color = "#f87171";
        overBadge.style.borderColor = "rgba(239, 68, 68, 0.4)";
      }
      if (overTitle) overTitle.textContent = "System Stability Depleted!";
      soundFx.damage();
    }

    if (screenGameOver) screenGameOver.classList.remove("hidden");
  }

  function resetGame() {
    clearInterval(gameTimerInterval);
    clearInterval(spawnInterval);
    gameState = "IDLE";
    if (bugsStage) bugsStage.innerHTML = "";
    if (screenGameOver) screenGameOver.classList.add("hidden");
    if (screenStart) screenStart.classList.remove("hidden");
    stability = 100;
    score = 0;
    timeRemaining = GAME_DURATION;
    hotfixCharge = 0;
    updateHUD();
  }

  if (startGameBtn) startGameBtn.addEventListener("click", startGame);
  if (playAgainBtn) playAgainBtn.addEventListener("click", startGame);
  if (gameRestartBtn) gameRestartBtn.addEventListener("click", resetGame);

  // -------------------------------------------------------------------------
  // 6. Contact Form Validation & Submission
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const submitFormBtn = document.getElementById("submitFormBtn");
  const btnText = document.getElementById("btnText");
  const formFeedback = document.getElementById("formFeedback");

  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const messageInput = document.getElementById("userMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let isValid = true;
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formFeedback.className = "form-feedback";
      formFeedback.style.display = "none";

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();

      if (!nameVal) {
        nameError.textContent = "Please enter your name.";
        isValid = false;
      }

      if (!emailVal) {
        emailError.textContent = "Please enter your email address.";
        isValid = false;
      } else if (!validateEmail(emailVal)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (!messageVal) {
        messageError.textContent = "Please write a brief message.";
        isValid = false;
      }

      if (!isValid) return;

      // Submit state
      btnText.textContent = "Transmitting...";
      submitFormBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);

        const response = await fetch("https://formsubmit.co/ajax/khushimehta1409@gmail.com", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        if (response.ok) {
          formFeedback.textContent =
            "Thank you! Your message has been sent directly to Khushi Mehta (khushimehta1409@gmail.com). I will get back to you shortly!";
          formFeedback.classList.add("success");
          formFeedback.style.display = "block";
          contactForm.reset();
        } else {
          throw new Error("Service response was not ok");
        }
      } catch (err) {
        // Fallback to mailto link
        const subject = encodeURIComponent(
          document.getElementById("userSubject")?.value || "Inquiry from Portfolio"
        );
        const body = encodeURIComponent(
          `Hi Khushi,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`
        );
        window.location.href = `mailto:khushimehta1409@gmail.com?subject=${subject}&body=${body}`;

        formFeedback.textContent =
          "Message packaged! Your default email client was opened to complete the transmission directly.";
        formFeedback.classList.add("success");
        formFeedback.style.display = "block";
      } finally {
        btnText.textContent = "Send Message";
        submitFormBtn.disabled = false;
      }
    });
  }

  // -------------------------------------------------------------------------
  // 7. Portfolio AI Assistant Widget
  // -------------------------------------------------------------------------
  const assistantTrigger = document.getElementById("assistantTrigger");
  const assistantContainer = document.getElementById("assistantContainer");
  const assistantCloseBtn = document.getElementById("assistantCloseBtn");
  const assistantMessages = document.getElementById("assistantMessages");
  const assistantInput = document.getElementById("assistantInput");
  const assistantSendBtn = document.getElementById("assistantSendBtn");
  const quickQuestions = document.getElementById("quickQuestions");

  if (assistantTrigger && assistantContainer) {
    assistantTrigger.addEventListener("click", () => {
      const isHidden = assistantContainer.classList.toggle("hidden");
      assistantTrigger.setAttribute("aria-expanded", isHidden ? "false" : "true");
      if (!isHidden && assistantInput) assistantInput.focus();
    });

    assistantCloseBtn.addEventListener("click", () => {
      assistantContainer.classList.add("hidden");
      assistantTrigger.setAttribute("aria-expanded", "false");
    });

    const KNOWLEDGE_BASE = [
      {
        keywords: ["vedas", "vedas tech", "intern", "internship", "anand", "fit", "why hire", "hire"],
        answer:
          "Khushi is an ideal match for the Vedas Tech Full-Stack Internship in Anand! She resides in Nadiad (just 20 minutes from Anand), studies IT at MBIT (CVM University), has maintained an 8.03 CGPA, and has verified hands-on project experience with Django, React, REST APIs, and SQLite. She is available for immediate joining.",
      },
      {
        keywords: ["project", "projects", "work", "portfolio", "neobank", "secureauth", "code"],
        answer:
          "Khushi features two verified core full-stack systems: (1) NeoBank Learning Simulator (React 19, Vite, Express.js, SQLite, JWT, Recharts, and scam education games), and (2) SecureAuth (a Django distributor portal with approval workflows, email OTPs, and login lockout built during her BrainyBeam internship). Plus, play her CodeQuest Bug Hunt game above!",
      },
      {
        keywords: ["skill", "skills", "tech", "stack", "languages", "python", "django", "react"],
        answer:
          "Khushi's technical stack spans: Languages: Python, JavaScript, C, C++; Backend: Python, Django, Node.js, Express.js, REST APIs; Frontend: React, HTML5, CSS3, Tailwind CSS, Bootstrap 5; Databases: SQLite, Relational Modeling; Tools: Git, GitHub, Render, Vercel; AI Tools: ChatGPT, Gemini, Copilot, Antigravity.",
      },
      {
        keywords: ["education", "college", "cgpa", "mbit", "school", "grade", "marks", "university"],
        answer:
          "Khushi is a final-year B.Tech Information Technology student at MBIT (CVM University, Gujarat) with an 8.03 CGPA through the 5th semester. She scored 79.8% in Class 10 (Bhakti Vedant High School) and 56.5% in Class 12 (A.J. High School).",
      },
      {
        keywords: ["experience", "brainybeam", "internship", "company"],
        answer:
          "Khushi completed a 15-day Python with Django internship at BrainyBeam Info-Tech Pvt. Ltd., Ahmedabad (15–29 May 2026), where she engineered and deployed the SecureAuth distributor portal live on Render.",
      },
      {
        keywords: ["contact", "email", "phone", "reach", "linkedin", "github", "location"],
        answer:
          "You can reach Khushi directly at khushimehta1409@gmail.com. Her GitHub is github.com/khushimehta-09 and LinkedIn is linkedin.com/in/khushi-mehta09. She is based in Nadiad / Anand, Gujarat.",
      },
      {
        keywords: ["game", "bug hunt", "codequest", "demo"],
        answer:
          "CodeQuest: Bug Hunt is Khushi's interactive browser mini-game created specifically to meet the Vedas Tech demo requirement. It simulates patching server pipeline bugs using vanilla JS, DOM animations, and Web Audio API synthesis with zero external dependencies!",
      },
    ];

    function appendMessage(text, isUser = false) {
      const msgDiv = document.createElement("div");
      msgDiv.className = isUser ? "user-msg" : "bot-msg";
      msgDiv.textContent = text;
      assistantMessages.appendChild(msgDiv);
      assistantMessages.scrollTop = assistantMessages.scrollHeight;
    }

    function processQuestion(query) {
      if (!query || !query.trim()) return;
      appendMessage(query, true);
      if (assistantInput) assistantInput.value = "";

      const lower = query.toLowerCase();
      let matched = KNOWLEDGE_BASE.find((k) =>
        k.keywords.some((w) => lower.includes(w))
      );

      const reply = matched
        ? matched.answer
        : "Khushi is a final-year B.Tech IT student (8.03 CGPA) specializing in Python, Django, and React full-stack development. Feel free to ask about her projects (NeoBank, SecureAuth), skills, education, or Vedas Tech internship readiness!";

      setTimeout(() => {
        appendMessage(reply, false);
      }, 350);
    }

    if (assistantSendBtn && assistantInput) {
      assistantSendBtn.addEventListener("click", () => {
        processQuestion(assistantInput.value);
      });

      assistantInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          processQuestion(assistantInput.value);
        }
      });
    }

    if (quickQuestions) {
      quickQuestions.addEventListener("click", (e) => {
        const chip = e.target.closest(".quick-chip");
        if (!chip) return;
        const queryType = chip.dataset.query;
        if (queryType === "vedas") processQuestion("Why is Khushi a good fit for Vedas Tech internship?");
        else if (queryType === "projects") processQuestion("Tell me about Khushi's full-stack projects.");
        else if (queryType === "skills") processQuestion("What is Khushi's technical skills stack?");
        else if (queryType === "cgpa") processQuestion("What are Khushi's academic credentials and CGPA?");
      });
    }
  }
});
