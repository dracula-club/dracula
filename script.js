/* ========================================================
   DRACULA — Dramatic & Cultural Association (SRMCEM)
   THEATRICAL WEB ENGINE & INTERACTIONS
   Aesthetics: Classical Proscenium Theatre • Pure Photography
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. THEATRICAL WEB AUDIO API PERCUSSION SYNTHESIZER
  // ----------------------------------------------------
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // 1. Deep Theatrical Drum / Nagada Impact Hit
  function playNagadaHit() {
    if (!audioCtx || !isSoundEnabled) return;
    try {
      const now = audioCtx.currentTime;
      // Membrane low-end oscillator
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(70, now + 0.4);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.25);

      // Transient click / beater strike
      const clickOsc = audioCtx.createOscillator();
      const clickGain = audioCtx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(320, now);
      clickOsc.frequency.exponentialRampToValueAtTime(60, now + 0.05);

      clickGain.gain.setValueAtTime(0.35, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      clickOsc.connect(clickGain);
      clickGain.connect(audioCtx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.07);
    } catch (e) {}
  }

  // 2. Theatrical Stage Gong / Shimmering Brass Resonance
  function playStageGong() {
    if (!audioCtx || !isSoundEnabled) return;
    try {
      const now = audioCtx.currentTime;
      const partials = [180, 276, 385, 520, 740];
      partials.forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);

        const decay = 2.4 - i * 0.3;
        gain.gain.setValueAtTime(0.12 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + decay);
      });
    } catch (e) {}
  }

  // 3. Heavy Velvet Stage Curtain Reveal Whoosh
  function playCurtainWhoosh() {
    if (!audioCtx || !isSoundEnabled) return;
    try {
      const now = audioCtx.currentTime;
      const bufferSize = audioCtx.sampleRate * 1.4;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(160, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.5);
      filter.frequency.exponentialRampToValueAtTime(120, now + 1.3);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start(now);
      noise.stop(now + 1.4);
    } catch (e) {}
  }

  // 4. Subtle Theatrical Woodblock / Clapper Click for interactions
  function playTheatricalClick() {
    if (!audioCtx || !isSoundEnabled) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.045);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    } catch (e) {}
  }

  // 5. Authentic Proscenium Stage Ovation / Applause Synthesizer
  function playStageApplause() {
    if (!audioCtx || !isSoundEnabled) return;
    try {
      const now = audioCtx.currentTime;
      const bufferSize = audioCtx.sampleRate * 2.2;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Burst-clustered noise simulating hundreds of claps
        const burst = Math.sin(i * 0.04) * Math.sin(i * 0.013);
        data[i] = (Math.random() * 2 - 1) * (0.6 + 0.4 * burst);
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(1.2, now);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.32, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start(now);
      noise.stop(now + 2.2);
    } catch (e) {}
  }

  // Auto-prime Web Audio API on ANY first user gesture
  ['click', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, () => initAudio(), { once: true, passive: true });
  });

  // ----------------------------------------------------
  // 2. THEATRICAL GOLDEN EMBERS & STAGE DUST PARTICLE ENGINE
  // ----------------------------------------------------
  const canvas = document.getElementById('trailerEmberCanvas') || document.getElementById('trailerBatsCanvas');
  let embers = [];
  let emberAnimFrame = null;

  class EmberParticle {
    constructor(w, h) {
      this.reset(w, h, true);
    }

    reset(w, h, randomY = false) {
      this.w = w;
      this.h = h;
      this.x = Math.random() * w;
      this.y = randomY ? Math.random() * h : h + 10;
      this.size = Math.random() * 2.8 + 1.2;
      this.speedY = -(Math.random() * 1.4 + 0.6);
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.fadeRate = Math.random() * 0.004 + 0.002;
      // Warm gold & theatrical crimson embers
      this.isGold = Math.random() > 0.3;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 0.4;
      this.opacity -= this.fadeRate;

      if (this.y < -20 || this.opacity <= 0) {
        this.reset(this.w, this.h);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isGold 
        ? `rgba(229, 185, 105, ${this.opacity})` 
        : `rgba(217, 31, 43, ${this.opacity * 0.8})`;
      ctx.shadowColor = this.isGold ? 'rgba(229, 185, 105, 0.8)' : 'rgba(217, 31, 43, 0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  function initEmbers() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    embers = [];
    const count = window.innerWidth < 768 ? 32 : 65;
    for (let i = 0; i < count; i++) {
      embers.push(new EmberParticle(canvas.width, canvas.height));
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach(e => {
        e.update();
        e.draw(ctx);
      });
      emberAnimFrame = requestAnimationFrame(render);
    }
    render();
  }

  initEmbers();

  // ----------------------------------------------------
  // 3. CINEMATIC THEATRE TEASER SEQUENCER
  // ----------------------------------------------------
  const introOverlay = document.getElementById('introOverlay');
  const enterBtn = document.getElementById('enterTheatreBtn');
  const skipBtn = document.getElementById('skipIntroBtn');
  const replayBtns = document.querySelectorAll('.replay-intro-btn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const trailerActText = document.getElementById('trailerActText');

  const trailerScenes = [
    { text: 'WHEN THE PROSCENIUM LIGHTS DIM... TRUTH SPEAKS.', fx: 'gong' },
    { text: '20+ YEARS OF RAW STAGE REBELLION & ARTISTIC DISCIPLINE', fx: 'hit' },
    { text: 'NUKKAD NATAK • PROSCENIUM PLAYS • MONOACTS • LIVE DHOLAK', fx: 'hit' },
    { text: '5× ABHIVYAKTI CHAMPIONS — UNDISPUTED DRAMATIC FORCE', fx: 'gong' },
    { text: 'WHERE STORIES COME ALIVE — WELCOME TO DRACULA', fx: 'hit' }
  ];

  let sceneIdx = 0;
  let trailerTimer = null;

  function advanceTrailerScene() {
    if (!trailerActText || !introOverlay || introOverlay.classList.contains('hidden')) return;

    sceneIdx = (sceneIdx + 1) % trailerScenes.length;
    const scene = trailerScenes[sceneIdx];

    trailerActText.style.opacity = '0';
    trailerActText.style.transform = 'translateY(6px)';

    setTimeout(() => {
      trailerActText.textContent = scene.text;
      trailerActText.style.opacity = '1';
      trailerActText.style.transform = 'translateY(0)';

      if (scene.fx === 'hit') {
        playNagadaHit();
      } else if (scene.fx === 'gong') {
        playStageGong();
      }
    }, 250);
  }

  function startTrailerEngine() {
    sceneIdx = 0;
    if (trailerActText) {
      trailerActText.textContent = trailerScenes[0].text;
    }
    if (trailerTimer) clearInterval(trailerTimer);

    setTimeout(() => {
      initAudio();
      playStageGong();
    }, 350);

    trailerTimer = setInterval(advanceTrailerScene, 2600);
  }

  // Audio trigger on user first touch/click
  window.addEventListener('click', () => initAudio(), { once: true });
  window.addEventListener('keydown', () => initAudio(), { once: true });

  const navSoundBtn = document.getElementById('navSoundBtn');

  function updateSoundUI() {
    const barsHTML = '<span class="sound-bars"><i class="bar"></i><i class="bar"></i><i class="bar"></i></span>';
    if (soundToggleBtn) {
      soundToggleBtn.innerHTML = isSoundEnabled ? `🔊 Sound: ON ${barsHTML}` : '🔈 Sound: OFF';
      soundToggleBtn.classList.toggle('sound-active', isSoundEnabled);
    }
    if (navSoundBtn) {
      navSoundBtn.innerHTML = isSoundEnabled ? `🔊 Sound: ON ${barsHTML}` : '🔈 Sound: OFF';
      navSoundBtn.classList.toggle('sound-active', isSoundEnabled);
    }
  }

  updateSoundUI();

  function toggleSound() {
    initAudio();
    isSoundEnabled = !isSoundEnabled;
    updateSoundUI();
    if (isSoundEnabled) {
      playNagadaHit();
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSound();
    });
  }

  if (navSoundBtn) {
    navSoundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSound();
    });
  }

  function triggerCurtainReveal() {
    if (!introOverlay) return;
    initAudio();
    if (isSoundEnabled) {
      playCurtainWhoosh();
      playNagadaHit();
    }
    introOverlay.classList.add('revealing');
    if (trailerTimer) {
      clearInterval(trailerTimer);
      trailerTimer = null;
    }

    setTimeout(() => {
      introOverlay.classList.add('hidden');
      introOverlay.style.display = 'none';
    }, 1350);
  }

  function replayTrailer() {
    if (!introOverlay) return;
    introOverlay.style.display = 'flex';
    introOverlay.classList.remove('hidden');
    introOverlay.classList.remove('revealing');
    startTrailerEngine();
  }

  if (enterBtn) enterBtn.addEventListener('click', triggerCurtainReveal);
  if (skipBtn) skipBtn.addEventListener('click', triggerCurtainReveal);
  replayBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    replayTrailer();
  }));

  // Auto-start trailer on index.html so the very first interface is the grand cinematic intro teaser!
  if (introOverlay && !introOverlay.classList.contains('hidden') && introOverlay.style.display !== 'none') {
    startTrailerEngine();
  }

  // Subtle theatrical click sound on interactive elements
  document.querySelectorAll('.btn, .filter-btn, .prod-card, .gallery-theatre-card, .faq-question').forEach(el => {
    el.addEventListener('click', () => {
      playTheatricalClick();
    });
  });

  // ----------------------------------------------------
  // 4. PERFORMANCE VIDEO MODAL
  // ----------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const videoClose = document.getElementById('videoClose');
  const openVideoBtn = document.getElementById('openVideoBtn');
  const performanceVideo = document.getElementById('performanceVideo');

  if (openVideoBtn && videoModal) {
    openVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal.classList.add('active');
      if (performanceVideo) {
        performanceVideo.play().catch(() => {});
      }
    });
  }

  if (videoClose && videoModal) {
    videoClose.addEventListener('click', () => {
      videoModal.classList.remove('active');
      if (performanceVideo) performanceVideo.pause();
    });
  }

  // ----------------------------------------------------
  // 5. RESPONSIVE MOBILE MENU
  // ----------------------------------------------------
  const menuBtn = document.getElementById('menu');
  const nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  // ----------------------------------------------------
  // 6. TOAST NOTIFICATIONS
  // ----------------------------------------------------
  const notice = document.getElementById('notice');
  function showToast(msg) {
    if (!notice) return;
    notice.textContent = msg;
    notice.classList.add('show');
    setTimeout(() => notice.classList.remove('show'), 3200);
  }

  // ----------------------------------------------------
  // 7. PURE THEATRICAL CINEMA LIGHTBOX ENGINE (16 AUTHENTIC PHOTOS • 100% RELIABLE)
  // ----------------------------------------------------
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxSpinner = document.getElementById('lightboxSpinner');
  const lightboxThumbnails = document.getElementById('lightboxThumbnails');

  // Complete archive of the 16 authentic club photographs
  const galleryPhotos = [
    'images/gallery/photo-01.jpg',
    'images/gallery/photo-02.jpg?v=20261102k',
    'images/gallery/photo-03.jpg',
    'images/gallery/photo-04.jpg',
    'images/gallery/photo-05.jpg',
    'images/gallery/photo-06.jpg',
    'images/gallery/photo-07.jpg',
    'images/gallery/photo-08.jpg',
    'images/gallery/photo-09.jpg',
    'images/gallery/photo-10.jpg',
    'images/gallery/photo-11.jpg',
    'images/gallery/photo-12.jpg?v=20261102k',
    'images/gallery/photo-13.jpg',
    'images/gallery/photo-14.jpg',
    'images/gallery/photo-15.jpg',
    'images/gallery/photo-16.jpg?v=20261102k'
  ];

  // Official verified descriptions for all 16 archival stills
  const GALLERY_STILLS = [
    {
      title: "IIT Roorkee Act",
      desc: "A glimpse of DRACULA's theatrical performance at IIT Roorkee."
    },
    {
      title: "OJAS",
      desc: "A memorable moment from our cultural participation at OJAS."
    },
    {
      title: "IIT Roorkee — DRACULA Nukkad Team",
      desc: "The DRACULA team representing its street theatre spirit at IIT Roorkee."
    },
    {
      title: "A Moment of Appreciation",
      desc: "A proud moment as the SRMCEM Director appreciates DRACULA's performance."
    },
    {
      title: "Mai Toh Girdhar Ki — Meera & Krishna",
      desc: "A beautiful theatrical portrayal of Meera Bai's unconditional love and devotion towards Lord Krishna."
    },
    {
      title: "Sita Swayamvar",
      desc: "A glimpse into DRACULA's mythological stage production."
    },
    {
      title: "Celebrating Victory — Team DRACULA",
      desc: "The team celebrating a memorable achievement together."
    },
    {
      title: "The Divine Krishna",
      desc: "A glimpse of an actor portraying Lord Krishna in our stage production."
    },
    {
      title: "Ad-Mad Show — A Moment of Recognition",
      desc: "Mayur receiving a certificate during the Ad-Mad Show."
    },
    {
      title: "Sita Swayamvar — On Stage",
      desc: "A memorable scene from our theatrical presentation of Sita Swayamvar."
    },
    {
      title: "Beyond the Stage — Unforgettable Moments",
      desc: "A collection of memories, experiences, and moments that define DRACULA."
    },
    {
      title: "DRACULA Alumni — IIT Kanpur",
      desc: "Our alumni representing DRACULA at IIT Kanpur through Nukkad Natak."
    },
    {
      title: "Yamraj Ki Adalat — The Cast",
      desc: "The cast behind one of DRACULA's memorable stage productions."
    },
    {
      title: "The DRACULA Family",
      desc: "A photograph capturing the unity, energy, and spirit of Team DRACULA."
    },
    {
      title: "IIT Kanpur — DRACULA Nukkad Team",
      desc: "Our Nukkad Natak team representing DRACULA at IIT Kanpur."
    },
    {
      title: "The Neta Ji — Character Performance",
      desc: "Mayur portraying the character of Netaji in a DRACULA theatrical production."
    }
  ];

  // Preload all 16 authentic photos into browser cache in the background
  function preloadAllGalleryPhotos() {
    galleryPhotos.forEach((src) => {
      const pImg = new Image();
      pImg.src = src;
    });
  }

  if (window.requestIdleCallback) {
    window.requestIdleCallback(preloadAllGalleryPhotos);
  } else {
    setTimeout(preloadAllGalleryPhotos, 150);
  }

  let currentPhotoIndex = 0;

  // Build Filmstrip Thumbnails inside Lightbox Modal
  function buildLightboxThumbnails() {
    if (!lightboxThumbnails) return;
    lightboxThumbnails.innerHTML = '';
    galleryPhotos.forEach((src, idx) => {
      const thumb = document.createElement('button');
      thumb.className = `lightbox-thumb-btn ${idx === currentPhotoIndex ? 'active' : ''}`;
      thumb.setAttribute('type', 'button');
      thumb.setAttribute('aria-label', `View Archive Still ${idx + 1}`);
      thumb.innerHTML = `<img src="${src}" alt="Still ${idx + 1}">`;
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        playTheatricalClick();
        currentPhotoIndex = idx;
        updateLightbox();
      });
      lightboxThumbnails.appendChild(thumb);
    });
  }

  // Get active navigable indices (honoring active category filter on gallery.html)
  function getActiveNavigableIndices() {
    const visibleCards = Array.from(document.querySelectorAll('.gallery-theatre-card:not(.is-filtered-out)'));
    if (visibleCards.length > 0) {
      return visibleCards.map(c => parseInt(c.getAttribute('data-gallery-index'), 10)).filter(n => !isNaN(n));
    }
    return galleryPhotos.map((_, i) => i);
  }

  window.openLightbox = function(index, fallbackSrc) {
    if (!lightboxOverlay) return;
    initAudio();
    if (isSoundEnabled) {
      playStageGong();
    }
    currentPhotoIndex = (typeof index === 'number' && index >= 0 && index < galleryPhotos.length) ? index : 0;
    buildLightboxThumbnails();
    updateLightbox(fallbackSrc);
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function updateLightbox(fallbackSrc) {
    if (!lightboxImg) return;

    const targetSrc = galleryPhotos[currentPhotoIndex] || fallbackSrc || 'images/gallery/photo-01.jpg';

    // Show gold stage loading spinner
    if (lightboxSpinner) lightboxSpinner.classList.add('visible');

    // Setup handlers before assigning src to eliminate race conditions
    lightboxImg.onload = () => {
      if (lightboxSpinner) lightboxSpinner.classList.remove('visible');
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    };

    lightboxImg.onerror = () => {
      if (lightboxSpinner) lightboxSpinner.classList.remove('visible');
      lightboxImg.style.opacity = '1';
    };

    lightboxImg.src = targetSrc;

    // Synchronous memory cache detection — render immediately with 0 delay
    if (lightboxImg.complete && lightboxImg.naturalWidth > 0) {
      if (lightboxSpinner) lightboxSpinner.classList.remove('visible');
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }

    // Dynamic theatrical caption & counter
    if (lightboxCaption) {
      const currentNum = String(currentPhotoIndex + 1).padStart(2, '0');
      const totalNum = String(galleryPhotos.length).padStart(2, '0');
      const still = GALLERY_STILLS[currentPhotoIndex] || {
        title: "DRACULA THEATRICAL ARCHIVE",
        desc: "Where Stories Come Alive • SRMCEM"
      };
      lightboxCaption.innerHTML = `
        <div class="lightbox-caption-pill">
          <span class="lightbox-counter">[ STILL ${currentNum} / ${totalNum} ]</span>
          <span class="lightbox-society">${still.title}</span>
          <span class="lightbox-cue">${still.desc}</span>
        </div>
      `;
    }

    // Update active thumbnail in filmstrip
    if (lightboxThumbnails) {
      const thumbs = lightboxThumbnails.querySelectorAll('.lightbox-thumb-btn');
      thumbs.forEach((t, i) => {
        if (i === currentPhotoIndex) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
          t.classList.remove('active');
        }
      });
    }
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrevPhoto() {
    playTheatricalClick();
    const navIndices = getActiveNavigableIndices();
    const curPos = navIndices.indexOf(currentPhotoIndex);
    if (curPos !== -1) {
      const nextPos = (curPos - 1 + navIndices.length) % navIndices.length;
      currentPhotoIndex = navIndices[nextPos];
    } else {
      currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    }
    updateLightbox();
  }

  function showNextPhoto() {
    playTheatricalClick();
    const navIndices = getActiveNavigableIndices();
    const curPos = navIndices.indexOf(currentPhotoIndex);
    if (curPos !== -1) {
      const nextPos = (curPos + 1) % navIndices.length;
      currentPhotoIndex = navIndices[nextPos];
    } else {
      currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
    }
    updateLightbox();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevPhoto();
  });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextPhoto();
  });

  // Close when clicking modal backdrop outside the photo frame
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay || e.target.classList.contains('lightbox-backdrop-click-target')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox (Esc, Left Arrow, Right Arrow)
  document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay || !lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevPhoto();
    if (e.key === 'ArrowRight') showNextPhoto();
  });

  // Mobile Touch Swipe Navigation
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxOverlay.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showPrevPhoto();
        else showNextPhoto();
      }
    }, { passive: true });
  }

  // Delegated click listener for ALL gallery triggers across the website
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-gallery-index]');
    if (card) {
      e.preventDefault();
      const idx = parseInt(card.getAttribute('data-gallery-index'), 10);
      const img = card.querySelector('img');
      const fallback = img ? img.getAttribute('src') : null;
      window.openLightbox(idx, fallback);
    }
  });

  // ----------------------------------------------------
  // DYNAMIC PROSCENIUM GALLERY SPOTLIGHT & FILMSTRIP ENGINE
  // ----------------------------------------------------
  const spotlightHeroFrame = document.getElementById('spotlightHeroFrame');
  const spotlightHeroImg = document.getElementById('spotlightHeroImg');
  const spotlightProgressBar = document.getElementById('spotlightProgressBar');
  const spotlightFrameCounter = document.getElementById('spotlightFrameCounter');
  const spotlightHudTitle = document.getElementById('spotlightHudTitle');
  const spotlightPrevBtn = document.getElementById('spotlightPrevBtn');
  const spotlightNextBtn = document.getElementById('spotlightNextBtn');
  const spotlightPlayToggleBtn = document.getElementById('spotlightPlayToggleBtn');
  const spotlightPlayIcon = document.getElementById('spotlightPlayIcon');
  const spotlightPlayText = document.getElementById('spotlightPlayText');
  const spotlightShuffleBtn = document.getElementById('spotlightShuffleBtn');
  const spotlightFilmstripTrack = document.getElementById('spotlightFilmstripTrack');
  const spotlightExpandBtn = document.getElementById('spotlightExpandBtn');

  if (spotlightHeroImg && typeof galleryPhotos !== 'undefined' && galleryPhotos.length > 0) {
    let spotlightIndex = 0;
    let isAutoplayActive = true;
    let spotlightTimer = null;
    const SLIDE_DURATION = 4200;

    // Build filmstrip thumbnails
    if (spotlightFilmstripTrack) {
      spotlightFilmstripTrack.innerHTML = '';
      galleryPhotos.forEach((src, idx) => {
        const thumb = document.createElement('button');
        thumb.className = `spotlight-strip-thumb ${idx === 0 ? 'active' : ''}`;
        thumb.setAttribute('type', 'button');
        thumb.setAttribute('aria-label', `Spotlight Still ${idx + 1}`);
        thumb.innerHTML = `
          <img src="${src}" alt="Still ${idx + 1}" loading="lazy">
          <span class="thumb-index-tag">${String(idx + 1).padStart(2, '0')}</span>
        `;
        thumb.addEventListener('click', (e) => {
          e.stopPropagation();
          playTheatricalClick();
          setSpotlightIndex(idx, true);
        });
        spotlightFilmstripTrack.appendChild(thumb);
      });
    }

    function setSpotlightIndex(index, userTriggered = false) {
      spotlightIndex = (index + galleryPhotos.length) % galleryPhotos.length;

      // Update ambient backdrop
      const spotlightAmbientBlur = document.getElementById('spotlightAmbientBlur');
      if (spotlightAmbientBlur) {
        spotlightAmbientBlur.style.backgroundImage = `url("${galleryPhotos[spotlightIndex]}")`;
      }

      // Update hero image with smooth crossfade
      spotlightHeroImg.style.opacity = '0.15';
      spotlightHeroImg.style.transform = 'scale(0.98)';

      setTimeout(() => {
        spotlightHeroImg.src = galleryPhotos[spotlightIndex];
        spotlightHeroImg.onload = () => {
          spotlightHeroImg.style.opacity = '1';
          spotlightHeroImg.style.transform = 'scale(1)';
        };
        if (spotlightHeroImg.complete) {
          spotlightHeroImg.style.opacity = '1';
          spotlightHeroImg.style.transform = 'scale(1)';
        }
      }, 100);

      // Update counter and authentic title & subtitle
      if (spotlightFrameCounter) {
        spotlightFrameCounter.textContent = `STILL ${String(spotlightIndex + 1).padStart(2, '0')} / ${String(galleryPhotos.length).padStart(2, '0')}`;
      }
      const still = GALLERY_STILLS[spotlightIndex] || {
        title: "DRACULA Theatrical Archive",
        desc: "Where Stories Come Alive • SRMCEM"
      };
      if (spotlightHudTitle) {
        spotlightHudTitle.textContent = still.title;
      }
      const spotlightHudSub = document.getElementById('spotlightHudSub');
      if (spotlightHudSub) {
        spotlightHudSub.textContent = still.desc;
      }

      // Update active thumbnail in filmstrip
      if (spotlightFilmstripTrack) {
        const thumbs = spotlightFilmstripTrack.querySelectorAll('.spotlight-strip-thumb');
        thumbs.forEach((t, i) => {
          if (i === spotlightIndex) {
            t.classList.add('active');
            t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } else {
            t.classList.remove('active');
          }
        });
      }

      resetProgressBar();

      if (userTriggered && isAutoplayActive) {
        restartAutoplayTimer();
      }
    }

    function resetProgressBar() {
      if (!spotlightProgressBar) return;
      spotlightProgressBar.style.transition = 'none';
      spotlightProgressBar.style.width = '0%';
      void spotlightProgressBar.offsetWidth;
      if (isAutoplayActive) {
        spotlightProgressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
        spotlightProgressBar.style.width = '100%';
      }
    }

    function restartAutoplayTimer() {
      if (spotlightTimer) clearInterval(spotlightTimer);
      resetProgressBar();
      if (!isAutoplayActive) return;
      spotlightTimer = setInterval(() => {
        setSpotlightIndex(spotlightIndex + 1, false);
      }, SLIDE_DURATION);
    }

    function toggleAutoplay() {
      playTheatricalClick();
      isAutoplayActive = !isAutoplayActive;
      if (isAutoplayActive) {
        if (spotlightPlayIcon) spotlightPlayIcon.textContent = '❚❚';
        if (spotlightPlayText) spotlightPlayText.textContent = 'PAUSE';
        if (spotlightPlayToggleBtn) spotlightPlayToggleBtn.classList.remove('paused');
        restartAutoplayTimer();
      } else {
        if (spotlightPlayIcon) spotlightPlayIcon.textContent = '▶';
        if (spotlightPlayText) spotlightPlayText.textContent = 'PLAY';
        if (spotlightPlayToggleBtn) spotlightPlayToggleBtn.classList.add('paused');
        if (spotlightTimer) clearInterval(spotlightTimer);
        if (spotlightProgressBar) {
          spotlightProgressBar.style.transition = 'none';
          spotlightProgressBar.style.width = '0%';
        }
      }
    }

    if (spotlightPrevBtn) {
      spotlightPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playTheatricalClick();
        setSpotlightIndex(spotlightIndex - 1, true);
      });
    }

    if (spotlightNextBtn) {
      spotlightNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playTheatricalClick();
        setSpotlightIndex(spotlightIndex + 1, true);
      });
    }

    if (spotlightPlayToggleBtn) {
      spotlightPlayToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAutoplay();
      });
    }

    if (spotlightShuffleBtn) {
      spotlightShuffleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playTheatricalClick();
        let nextRandom;
        do {
          nextRandom = Math.floor(Math.random() * galleryPhotos.length);
        } while (nextRandom === spotlightIndex && galleryPhotos.length > 1);

        if (spotlightHeroFrame) {
          spotlightHeroFrame.classList.add('spotlight-flash');
          setTimeout(() => {
            if (spotlightHeroFrame) spotlightHeroFrame.classList.remove('spotlight-flash');
          }, 380);
        }
        setSpotlightIndex(nextRandom, true);
      });
    }

    if (spotlightExpandBtn) {
      spotlightExpandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playTheatricalClick();
        window.openLightbox(spotlightIndex);
      });
    }

    if (spotlightHeroFrame) {
      spotlightHeroFrame.addEventListener('click', () => {
        playTheatricalClick();
        window.openLightbox(spotlightIndex);
      });
    }

    setSpotlightIndex(0);
    restartAutoplayTimer();
  }

  // ----------------------------------------------------
  // 8. PRODUCTION DOSSIER MODAL
  // ----------------------------------------------------
  const prodModal = document.getElementById('prodModal');
  const prodClose = document.getElementById('prodClose');
  const prodTitle = document.getElementById('modalProdTitle');
  const prodCategory = document.getElementById('modalProdCategory');
  const prodSynopsis = document.getElementById('modalProdSynopsis');
  const prodDirector = document.getElementById('modalProdDirector');
  const prodCast = document.getElementById('modalProdCast');
  const prodAwards = document.getElementById('modalProdAwards');

  const productionsData = {
    'yamraj': {
      title: 'Yamraj Ki Adalat',
      category: 'Stage Play • Proscenium Production',
      synopsis: 'A satirical proscenium courtroom drama challenging mortal vanity, societal hypocrisy, and justice in the celestial court of Yamraj.',
      director: 'Writer: Saurabh Mishra | Performer: Sankalp Shrivastava (Yamraj)',
      cast: 'Sankalp Shrivastava & DRACULA Stage Cast',
      awards: '🏆 Best Presentation Award — Abhivyakti 2K26'
    },
    'samaj': {
      title: 'Samaj (समाज)',
      category: 'Nukkad Natak • Street Theatre',
      synopsis: 'A powerful street theatre production highlighting the language divide in India, questioning linguistic discrimination and the barriers created by language. Through sharp satire, impactful dialogues, and a powerful chorus, the act delivers a message of unity in diversity.',
      director: 'Writer: Prabuddha Singh | Directors: Prabuddha Singh & Anshit Giri',
      cast: 'DRACULA Street Play Ensemble',
      awards: '★ Flagship Campus Street Theatre Campaign'
    },
    'trp': {
      title: 'TRP Ka Circus',
      category: 'Nukkad Natak • Street Play',
      synopsis: 'A hard-hitting street theatre production exposing the reality of sensationalism, paid news, and the culture of TRP-driven media. Through satire, sharp dialogues, and powerful performances, the act questions the credibility of modern journalism and highlights the influence of बिकाऊ मीडिया.',
      director: 'Writer: Aditya Singh | Directors: Aditya Singh & Prabuddha Singh',
      cast: 'DRACULA Street Natak Circle',
      awards: '🏆 Finalist at IIT Roorkee'
    },
    'girdhar': {
      title: 'Main Toh Girdhar Ki (मैं तो गिरधर की)',
      category: 'Stage Play • Classical Drama',
      synopsis: 'A soulful theatrical portrayal of Meera Bai\'s unconditional love and unwavering devotion towards Lord Krishna. The play captures her spiritual journey, deep faith, and the power of divine love that transcends worldly boundaries.',
      director: 'Writer: Honey Singh | Directors: Anshika Agarwal & Honey Singh',
      cast: 'Proscenium Cast Ensemble',
      awards: '★ Classical Stage Showcase'
    },
    'sita': {
      title: 'Sita Swayamvar (सीता स्वयंवर)',
      category: 'Stage Play • Mythological Drama',
      synopsis: 'Recreating the court of Mithila, the breaking of the divine Shiva Dhanush by Lord Rama, and classical theatrical dialogue delivery.',
      director: 'DRACULA Production Wing',
      cast: 'Full Mythological Ensemble',
      awards: '★ Grand Classical Production'
    },
    'alone': {
      title: 'Alone Spotlight',
      category: 'Monoact • Solo Showcase',
      synopsis: 'An annual monoact showcase featuring powerful solo performances by DRACULA artists. Each act brings a unique story, emotion, and perspective to the spotlight, celebrating the art of solo storytelling and individual expression.',
      director: 'DRACULA Solo Wing',
      cast: 'Solo Dramatic Artists',
      awards: '★ Annual Solo Showcase'
    },
    'mahabharat': {
      title: 'Mahabharat (महाभारत)',
      category: 'Stage Production • Epic Drama',
      synopsis: 'A multi-act proscenium production staging the philosophical conflict of Dharma, duty, and destiny on the Kurukshetra battlefield.',
      director: 'DRACULA Stage Council',
      cast: 'Full Proscenium Ensemble & Crew',
      awards: '★ Grand Annual Production'
    }
  };

  document.querySelectorAll('[data-prod]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const prodKey = card.getAttribute('data-prod');
      const data = productionsData[prodKey];
      if (data && prodModal) {
        initAudio();
        if (isSoundEnabled) {
          playStageGong();
        }
        prodTitle.textContent = data.title;
        prodCategory.textContent = data.category;
        prodSynopsis.textContent = data.synopsis;
        prodDirector.textContent = data.director;
        prodCast.textContent = data.cast;
        prodAwards.textContent = data.awards;
        prodModal.classList.add('active');
      }
    });
  });

  if (prodClose && prodModal) {
    prodClose.addEventListener('click', () => prodModal.classList.remove('active'));
  }

  // ----------------------------------------------------
  // 9. FAQ ACCORDION
  // ----------------------------------------------------
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      parent.classList.toggle('open');
    });
  });

  // ----------------------------------------------------
  // 10. CLOSE MODALS ON ESCAPE & BACKDROP CLICK
  // ----------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      if (videoModal) {
        videoModal.classList.remove('active');
        if (performanceVideo) performanceVideo.pause();
      }
      if (prodModal) prodModal.classList.remove('active');
    } else if (e.key === 'ArrowRight' && lightboxOverlay && lightboxOverlay.classList.contains('active')) {
      currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
      updateLightbox();
    } else if (e.key === 'ArrowLeft' && lightboxOverlay && lightboxOverlay.classList.contains('active')) {
      currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
      updateLightbox();
    }
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        if (performanceVideo) performanceVideo.pause();
      }
    });
  });

  // ----------------------------------------------------
  // 11. INTERACTIVE STAGE SPOTLIGHT CURSOR FOLLOWER
  // ----------------------------------------------------
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mousemove', (e) => {
      const rect = heroEl.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      heroEl.style.setProperty('--spotlight-x', `${x}%`);
      heroEl.style.setProperty('--spotlight-y', `${y}%`);
    }, { passive: true });
  }

  // ----------------------------------------------------
  // 12. THEATRICAL SCROLL REVEAL OBSERVER
  // ----------------------------------------------------
  const revealElements = document.querySelectorAll('.theatre-reveal, .theatre-reveal-stagger');
  function markInViewReveals() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.25 && rect.bottom > -100) {
        el.classList.add('is-visible');
      }
    });
  }
  markInViewReveals();
  window.addEventListener('load', markInViewReveals);

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ----------------------------------------------------
  // 14. 3D THEATRICAL CARD TILT & DYNAMIC GLARE SHEEN ENGINE
  // ----------------------------------------------------
  function init3DCardTiltEngine() {
    const tiltElements = document.querySelectorAll(
      '.tilt-card, .prod-card, .team-person-card, .royal-stageportal-card, .royal-wing-card, .craft-card, .playbill-card, .milestone-item, .milestone-card, .featured-prod-hero, .team-ensemble-banner'
    );

    tiltElements.forEach(card => {
      // Ensure glare sheen child exists
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      let bounds = null;

      card.addEventListener('mouseenter', () => {
        bounds = card.getBoundingClientRect();
        card.classList.add('tilt-moving');
      });

      card.addEventListener('mousemove', (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const normX = mouseX / bounds.width;  // 0 to 1
        const normY = mouseY / bounds.height; // 0 to 1

        const rotX = ((0.5 - normY) * 12).toFixed(2);
        const rotY = ((normX - 0.5) * 12).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        card.style.setProperty('--glare-x', `${(normX * 100).toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${(normY * 100).toFixed(1)}%`);
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt-moving');
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        bounds = null;
      });
    });
  }

  init3DCardTiltEngine();

  // ----------------------------------------------------
  // 15. GRAND PROSCENIUM DUAL VOLUMETRIC SPOTLIGHTS & STAGE HAZE ENGINE
  // ----------------------------------------------------
  function initHeroStageAtmosphereEngine() {
    const heroCanvas = document.getElementById('heroStageCanvas');
    if (!heroCanvas) return;

    const ctx = heroCanvas.getContext('2d');
    let heroParticles = [];
    let smokePuffs = [];
    let heroAnimFrame = null;
    let heroMouseX = null;
    let heroMouseY = null;

    function resize() {
      const parent = heroCanvas.parentElement;
      if (!parent) return;
      heroCanvas.width = parent.offsetWidth;
      heroCanvas.height = parent.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Track mouse over hero for interactive theatrical lighting
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.addEventListener('mousemove', (e) => {
        const rect = heroCanvas.getBoundingClientRect();
        heroMouseX = e.clientX - rect.left;
        heroMouseY = e.clientY - rect.top;
      }, { passive: true });

      heroEl.addEventListener('mouseleave', () => {
        heroMouseX = null;
        heroMouseY = null;
      });
    }

    // Atmospheric Smoke / Stage Haze Cloud Puff
    class SmokePuff {
      constructor(w, h) {
        this.w = w;
        this.h = h;
        this.reset();
      }

      reset() {
        this.x = Math.random() * this.w;
        this.y = this.h * 0.65 + Math.random() * (this.h * 0.35);
        this.radius = Math.random() * 90 + 70;
        this.vx = (Math.random() - 0.48) * 0.35;
        this.vy = -(Math.random() * 0.15 + 0.05);
        this.alpha = Math.random() * 0.07 + 0.025;
        this.maxAlpha = this.alpha;
        this.life = 0;
        this.maxLife = Math.random() * 400 + 300;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        const half = this.maxLife / 2;
        if (this.life < half) {
          this.alpha = (this.life / half) * this.maxAlpha;
        } else {
          this.alpha = (1 - (this.life - half) / half) * this.maxAlpha;
        }
        if (this.life >= this.maxLife || this.y < this.h * 0.4) {
          this.reset();
        }
      }

      draw(context) {
        if (this.alpha <= 0.001) return;
        context.save();
        const grad = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, `rgba(200, 170, 190, ${this.alpha * 0.8})`);
        grad.addColorStop(0.5, `rgba(140, 20, 40, ${this.alpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = grad;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    // Glowing Golden Stage Dust Mote
    class StageMote {
      constructor(w, h) {
        this.reset(w, h, true);
      }

      reset(w, h, randomY = false) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = randomY ? Math.random() * h : h + 15;
        this.size = Math.random() * 2.4 + 0.8;
        this.speedY = -(Math.random() * 0.7 + 0.25);
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.opacity = Math.random() * 0.65 + 0.25;
        this.fadeRate = Math.random() * 0.003 + 0.001;
        this.isGold = Math.random() > 0.35;
        this.twinkleSpeed = Math.random() * 0.04 + 0.02;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.015) * 0.3;
        this.opacity -= this.fadeRate;
        this.twinklePhase += this.twinkleSpeed;

        if (this.y < -15 || this.opacity <= 0) {
          this.reset(this.w, this.h);
        }
      }

      draw(context) {
        const pulse = 0.7 + 0.3 * Math.sin(this.twinklePhase);
        const finalAlpha = Math.max(0, this.opacity * pulse);
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.isGold
          ? `rgba(235, 195, 115, ${finalAlpha})`
          : `rgba(225, 45, 60, ${finalAlpha * 0.8})`;
        context.shadowColor = this.isGold ? 'rgba(235, 195, 115, 0.85)' : 'rgba(225, 45, 60, 0.75)';
        context.shadowBlur = 8;
        context.fill();
        context.restore();
      }
    }

    const moteCount = window.innerWidth < 768 ? 25 : 55;
    for (let i = 0; i < moteCount; i++) {
      heroParticles.push(new StageMote(heroCanvas.width, heroCanvas.height));
    }

    const puffCount = window.innerWidth < 768 ? 6 : 14;
    for (let j = 0; j < puffCount; j++) {
      smokePuffs.push(new SmokePuff(heroCanvas.width, heroCanvas.height));
    }

    let time = 0;

    // Renders Dual Volumetric Sweeping Spotlights
    function renderSpotlights(context, w, h) {
      context.save();
      context.globalCompositeOperation = 'screen';

      // Source positions of stage spotlights at proscenium ceiling
      const spotLeftX = w * 0.12;
      const spotLeftY = -40;
      const spotRightX = w * 0.88;
      const spotRightY = -40;

      // Base sweep targets
      let targetLeftX = w * 0.42 + Math.sin(time * 0.0012) * (w * 0.22);
      let targetLeftY = h * 0.85 + Math.cos(time * 0.0016) * 40;

      let targetRightX = w * 0.58 - Math.cos(time * 0.0014) * (w * 0.22);
      let targetRightY = h * 0.85 + Math.sin(time * 0.0015) * 40;

      // Interactive mouse attraction
      if (heroMouseX !== null && heroMouseY !== null) {
        targetLeftX = targetLeftX * 0.65 + heroMouseX * 0.35;
        targetLeftY = targetLeftY * 0.65 + heroMouseY * 0.35;
        targetRightX = targetRightX * 0.65 + heroMouseX * 0.35;
        targetRightY = targetRightY * 0.65 + heroMouseY * 0.35;
      }

      // 1. Warm Golden Amber Proscenium Spotlight
      drawConicalBeam(context, spotLeftX, spotLeftY, targetLeftX, targetLeftY, 140, 'rgba(235, 190, 95, 0.13)', 'rgba(235, 190, 95, 0)');

      // 2. Deep Dramatic Crimson Theatrical Spotlight
      drawConicalBeam(context, spotRightX, spotRightY, targetRightX, targetRightY, 140, 'rgba(215, 25, 45, 0.11)', 'rgba(215, 25, 45, 0)');

      context.restore();
    }

    function drawConicalBeam(context, sx, sy, tx, ty, beamRadius, centerColor, edgeColor) {
      const angle = Math.atan2(ty - sy, tx - sx);
      const dist = Math.hypot(tx - sx, ty - sy);
      const halfAngle = Math.atan2(beamRadius, dist);

      const p1x = sx;
      const p1y = sy;
      const p2x = sx + Math.cos(angle - halfAngle) * (dist * 1.35);
      const p2y = sy + Math.sin(angle - halfAngle) * (dist * 1.35);
      const p3x = sx + Math.cos(angle + halfAngle) * (dist * 1.35);
      const p3y = sy + Math.sin(angle + halfAngle) * (dist * 1.35);

      context.save();
      context.beginPath();
      context.moveTo(p1x, p1y);
      context.lineTo(p2x, p2y);
      context.lineTo(p3x, p3y);
      context.closePath();

      const grad = context.createRadialGradient(sx, sy, 10, tx, ty, dist * 1.2);
      grad.addColorStop(0, centerColor);
      grad.addColorStop(0.7, centerColor.replace(/[\d.]+\)$/, '0.04)'));
      grad.addColorStop(1, edgeColor);

      context.fillStyle = grad;
      context.fill();
      context.restore();
    }

    function render() {
      time += 16;
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

      // 1. Draw volumetric theatrical spotlights
      renderSpotlights(ctx, heroCanvas.width, heroCanvas.height);

      // 2. Draw drifting rolling stage smoke/fog
      smokePuffs.forEach(puff => {
        puff.update();
        puff.draw(ctx);
      });

      // 3. Draw golden embers rising through the light beams
      heroParticles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      heroAnimFrame = requestAnimationFrame(render);
    }

    render();
  }

  initHeroStageAtmosphereEngine();

  // ----------------------------------------------------
  // 16. THEATRICAL DYNAMIC NUMBER COUNTERS
  // ----------------------------------------------------
  function initNumberCounters() {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;

    let hasCounted = false;

    function startCounting() {
      if (hasCounted) return;
      hasCounted = true;

      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 1600; // ms
        const startTime = performance.now();
        const startVal = 0;

        function updateVal(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(startVal + (target - startVal) * eased);

          if (target === 2003) {
            counter.textContent = current;
          } else if (target === 5) {
            counter.innerHTML = `${current}&times;`;
          } else if (target === 100) {
            counter.textContent = `${current}%`;
          } else if (target === 4) {
            counter.textContent = `${current} Wings`;
          } else {
            counter.textContent = `${current}+`;
          }

          if (progress < 1) {
            requestAnimationFrame(updateVal);
          }
        }

        requestAnimationFrame(updateVal);
      });
    }

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounting();
            obs.disconnect();
          }
        });
      }, { threshold: 0.2 });

      counters.forEach(c => obs.observe(c));
    } else {
      startCounting();
    }
  }

  // 17. ALUMNI HORIZONTAL SIDE-SCROLL ARROW NAVIGATION
  const alumniTrack = document.getElementById('alumniScrollTrack');
  const alumniPrev = document.getElementById('alumniScrollPrev');
  const alumniNext = document.getElementById('alumniScrollNext');
  if (alumniTrack && alumniPrev && alumniNext) {
    alumniPrev.addEventListener('click', () => {
      alumniTrack.scrollBy({ left: -220, behavior: 'smooth' });
    });
    alumniNext.addEventListener('click', () => {
      alumniTrack.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }
  initNumberCounters();

  // 18. EVENTS PAGE DYNAMIC COUNTDOWN & CATEGORY FILTERING
  function initEventsPageDynamics() {
    // A. Live Countdown Timer to Republic Day Special Act (26 Jan 2027 09:00:00)
    const countdownWrap = document.getElementById('eventLiveCountdown');
    const evDays = document.getElementById('evDays');
    const evHours = document.getElementById('evHours');
    const evMins = document.getElementById('evMins');
    const evSecs = document.getElementById('evSecs');

    if (countdownWrap && evDays && evHours && evMins && evSecs) {
      const targetDate = new Date('2027-01-26T09:00:00').getTime();

      function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          evDays.textContent = days < 10 ? '0' + days : days;
          evHours.textContent = hours < 10 ? '0' + hours : hours;
          evMins.textContent = minutes < 10 ? '0' + minutes : minutes;
          evSecs.textContent = seconds < 10 ? '0' + seconds : seconds;
        } else {
          evDays.textContent = '00';
          evHours.textContent = '00';
          evMins.textContent = '00';
          evSecs.textContent = '00';
        }
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);
    }

    // B. Interactive Category Filter Pills
    const filterPills = document.querySelectorAll('.events-filter-pill');
    const tableRows = document.querySelectorAll('.event-schedule-row');
    const mobileCards = document.querySelectorAll('.playbill-mobile-cards .playbill-card');

    if (filterPills.length > 0) {
      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          const filterValue = pill.getAttribute('data-filter');

          // Update active state
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');

          // Filter desktop table rows
          tableRows.forEach(row => {
            const categories = (row.getAttribute('data-category') || '').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
              row.classList.remove('is-hidden');
              row.classList.add('is-filtered-in');
            } else {
              row.classList.add('is-hidden');
              row.classList.remove('is-filtered-in');
            }
          });

          // Filter mobile cards
          mobileCards.forEach(card => {
            const categories = (card.getAttribute('data-category') || '').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
              card.classList.remove('is-hidden');
              card.classList.add('is-filtered-in');
            } else {
              card.classList.add('is-hidden');
              card.classList.remove('is-filtered-in');
            }
          });
        });
      });
    }
  }

  initEventsPageDynamics();
});