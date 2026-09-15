/**
 * SUKIYA SÃO BERNARDO — DIRECTION A (THE TOKYO SPEED COUNTER)
 * Master Cinematic Timeline & Framing Transformation Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. LENIS INERTIAL SCROLL ENGINE
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    if (window.gsap) {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // 2. DISH SWITCHER DATA MATRIX
  const dishes = [
    {
      title: "KATSU CURRY",
      tag: "ESPECIAL DE BALCÃO",
      desc: "Lombo suíno crocante no panko, servido sobre arroz japonês quente e molho curry denso e aromático."
    },
    {
      title: "GYŪDON CLÁSSICO",
      tag: "TRADIÇÃO DE TÓQUIO",
      desc: "Finas lâminas de carne bovina e cebola cozidas no caldo dashi tradicional sobre arroz japonês macio."
    },
    {
      title: "TONKATSU DON",
      tag: "CLÁSSICO DE SÃO BERNARDO",
      desc: "Costeleta de porco empanada e cozida com ovos batidos e cebola em molho especial sobre arroz vaporizado."
    },
    {
      title: "KARAAGUE DON",
      tag: "CROCANTE & FRESCO",
      desc: "Sobrecoxa de frango frita ao estilo japonês marinada em gengibre e shoyu com muita cebolinha fresca fatiada."
    }
  ];

  const tabs = document.querySelectorAll('.nav-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const titleEl = document.getElementById('dishTitle');
  const tagEl = document.getElementById('dishTag');
  const descEl = document.getElementById('dishDesc');
  const orderPanel = document.getElementById('orderPanel');

  function selectTab(index) {
    const dish = dishes[index];
    if (!dish) return;

    tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    galleryItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
      if (window.gsap && i === index) {
        gsap.fromTo(item.querySelector('.full-photo'),
          { scale: 1.08 },
          { scale: 1, duration: 0.55, ease: "power3.out" }
        );
      }
    });

    if (window.gsap) {
      gsap.timeline()
        .to([titleEl, tagEl, descEl], {
          opacity: 0,
          x: -12,
          duration: 0.15,
          onComplete: () => {
            if (titleEl) titleEl.textContent = dish.title;
            if (tagEl) tagEl.textContent = dish.tag;
            if (descEl) descEl.textContent = dish.desc;
          }
        })
        .to([tagEl, titleEl, descEl], {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out"
        });

      if (orderPanel) {
        gsap.fromTo(orderPanel,
          { scale: 0.98 },
          { scale: 1, duration: 0.25, ease: "back.out(2)" }
        );
      }
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      selectTab(idx);
    });
  });

  // Keyboard navigation 1-4
  window.addEventListener('keydown', (e) => {
    const num = parseInt(e.key, 10);
    if (num >= 1 && num <= 4) {
      selectTab(num - 1);
    }
  });

  // 3. MASTER CINEMATIC SCROLL TIMELINE (FRAMING TRANSFORMATION)
  if (window.gsap && window.ScrollTrigger && window.innerWidth > 1024) {
    gsap.registerPlugin(ScrollTrigger);

    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#openingStage",
        start: "top top",
        end: "+=2600",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1
      }
    });

    // ----------------------------------------------------
    // PHASE 1 (0% -> 20% scroll, t=0 -> t=2): EXPANSION INTO RED FIELD
    // ----------------------------------------------------
    masterTL.to("#openingStage", {
      gridTemplateColumns: "78vw 22vw",
      duration: 2,
      ease: "power1.inOut"
    }, 0)
    .to(".full-photo", {
      scale: 1.15,
      xPercent: 3,
      duration: 2,
      ease: "power1.inOut"
    }, 0)
    .to("#heroStatement", {
      opacity: 0,
      y: 30,
      duration: 1.4
    }, 0)
    .to("#scrollCue", {
      opacity: 0,
      duration: 0.8
    }, 0);

    // ----------------------------------------------------
    // PHASE 2 (20% -> 40% scroll, t=2 -> t=4): FULL-BLEED HORIZON
    // ----------------------------------------------------
    masterTL.to("#openingStage", {
      gridTemplateColumns: "100vw 0vw",
      duration: 2,
      ease: "power2.inOut"
    }, 2)
    .to("#stageNarrative", {
      opacity: 0,
      xPercent: 40,
      duration: 1.8
    }, 2)
    .to(".full-photo", {
      scale: 1.24,
      xPercent: 0,
      duration: 2,
      ease: "power2.inOut"
    }, 2)
    .to("#visualCaption", {
      opacity: 0,
      y: -25,
      duration: 1.5
    }, 2.2)
    .to("#counterNav", {
      opacity: 0,
      y: 25,
      duration: 1.5
    }, 2.2);

    // ----------------------------------------------------
    // PHASE 3 (35% -> 55% scroll, t=3.5 -> t=5.5): SIGNATURE BLADE KANJI APERTURE
    // ----------------------------------------------------
    masterTL.fromTo("#signatureLayer", {
      opacity: 0,
      scale: 0.82
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    }, 3.5)
    .to(".full-photo", {
      scale: 1.30,
      filter: "brightness(0.36) contrast(1.35)",
      duration: 1.5,
      ease: "power2.inOut"
    }, 3.5);

    // ----------------------------------------------------
    // PHASE 4 (55% -> 80% scroll, t=5.5 -> t=8.0): UNVEIL DOCKED COUNTER INTERFACE
    // ----------------------------------------------------
    masterTL.to("#signatureLayer", {
      opacity: 0,
      scale: 1.15,
      y: -30,
      duration: 0.8,
      ease: "power2.in"
    }, 5.5)
    .to(".full-photo", {
      scale: 1.05,
      filter: "brightness(0.95) contrast(1.05)",
      duration: 1.4,
      ease: "power2.out"
    }, 5.8)
    .to("#visualCaption", {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power2.out"
    }, 6.0)
    .to("#counterNav", {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power2.out"
    }, 6.0);

    // ----------------------------------------------------
    // PHASE 5 (85% -> 100% scroll, t=8.5 -> t=10.0): STAGE HANDOFF
    // ----------------------------------------------------
    masterTL.to("#openingStage", {
      yPercent: -10,
      opacity: 0.95,
      duration: 1.5,
      ease: "power1.inOut"
    }, 8.5);

    // ----------------------------------------------------
    // SCENE 02: THE SPEED DISPATCH (A MECÂNICA DOS 180 SEGUNDOS)
    // Master Build Spec: Pin 1500px, Tray travel 105vw -> 4vw -> -35vw, Countdown timer, Editorial lockup
    // ----------------------------------------------------
    const dispatchTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#sceneDispatch",
        start: "top top",
        end: "+=1500",
        pin: ".dispatch-viewport",
        scrub: 0.5,
        anticipatePin: 1
      }
    });

    // Phase 1 (0.0 -> 0.45): Tray incurs 105vw -> 4vw, countdown 180s -> 000s
    dispatchTL
      .fromTo("#trayAssembly", {
        x: "105vw",
        y: "12vh",
        scale: 0.92,
        opacity: 1
      }, {
        x: "4vw",
        y: "12vh",
        scale: 1.0,
        ease: "power1.out",
        duration: 4.5
      }, 0)
      .to("#counterTimer", {
        opacity: 0.06,
        duration: 4.5,
        ease: "power1.out",
        onUpdate: function() {
          const p = dispatchTL.progress();
          if (p <= 0.45) {
            const sec = Math.max(0, Math.round(180 * (1 - p / 0.45)));
            const timerEl = document.getElementById("counterTimer");
            if (timerEl) timerEl.textContent = String(sec).padStart(3, '0') + "s";
          }
        }
      }, 0);

    // Phase 2 (0.40 -> 0.75): Editorial reveal
    dispatchTL.fromTo("#dispatchEditorial", {
      y: 40,
      opacity: 0,
      clipPath: "inset(0 0 100% 0)"
    }, {
      y: 0,
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      duration: 3.5,
      ease: "power2.out"
    }, 4.0);

    // Phase 3 (0.80 -> 1.0): Handoff transition
    dispatchTL
      .to("#trayAssembly", {
        x: "-35vw",
        scale: 1.04,
        opacity: 0.25,
        duration: 2.0,
        ease: "power2.in"
      }, 8.0)
      .to("#dispatchEditorial", {
        y: -60,
        opacity: 0,
        duration: 2.0,
        ease: "power2.in"
      }, 8.0);

    // ----------------------------------------------------
    // SCENE 03: THE TRINITY APERTURE (A ANATOMIA DOS 3 CLÁSSICOS)
    // Master Build Spec: Pin 2000px, 3 Slits flex expansion 6.8 / 1.6 / 1.6 per plate
    // ----------------------------------------------------
    const trinityTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#sceneTrinity",
        start: "top top",
        end: "+=2000",
        pin: ".trinity-viewport",
        scrub: 0.5,
        anticipatePin: 1
      }
    });

    const slit1 = document.querySelector(".slit-gyudon");
    const slit2 = document.querySelector(".slit-curry");
    const slit3 = document.querySelector(".slit-karaague");

    // Init state (0.0 -> 0.20): Equal slits 3.33 each
    // Focus Plate 01: Gyūdon (0.25 -> 0.45)
    trinityTL
      .to(slit1, { flex: 6.8, duration: 2.5, ease: "power2.out" }, 1.0)
      .to(slit2, { flex: 1.6, duration: 2.5, ease: "power2.out" }, 1.0)
      .to(slit3, { flex: 1.6, duration: 2.5, ease: "power2.out" }, 1.0)
      .to(slit1.querySelector(".slit-desc"), { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.5 }, 1.5)
      .to(slit1.querySelector(".slit-action"), { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.5 }, 1.5);

    // Focus Plate 02: Katsu Curry (0.50 -> 0.70)
    trinityTL
      .to(slit1.querySelector(".slit-desc"), { opacity: 0, y: 20, pointerEvents: "none", duration: 1.0 }, 4.0)
      .to(slit1.querySelector(".slit-action"), { opacity: 0, y: 20, pointerEvents: "none", duration: 1.0 }, 4.0)
      .to(slit1, { flex: 1.6, duration: 2.5, ease: "power2.inOut" }, 4.0)
      .to(slit2, { flex: 6.8, duration: 2.5, ease: "power2.inOut" }, 4.0)
      .to(slit3, { flex: 1.6, duration: 2.5, ease: "power2.inOut" }, 4.0)
      .to(slit2.querySelector(".slit-desc"), { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.5 }, 4.8)
      .to(slit2.querySelector(".slit-action"), { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.5 }, 4.8);

    // Focus Plate 03: Karaague Don (0.75 -> 0.95)
    trinityTL
      .to(slit2.querySelector(".slit-desc"), { opacity: 0, y: 20, pointerEvents: "none", duration: 1.0 }, 7.0)
      .to(slit2.querySelector(".slit-action"), { opacity: 0, y: 20, pointerEvents: "none", duration: 1.0 }, 7.0)
      .to(slit1, { flex: 1.6, duration: 2.5, ease: "power2.inOut" }, 7.0)
      .to(slit2, { flex: 1.6, duration: 2.5, ease: "power2.inOut" }, 7.0)
      .to(slit3, { flex: 6.8, duration: 2.5, ease: "power2.inOut" }, 7.0)
      .to(slit3.querySelector(".slit-desc"), { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.5 }, 7.8)
      .to(slit3.querySelector(".slit-action"), { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.5 }, 7.8);

    // Handoff (0.95 -> 1.0): Dim slits
    trinityTL.to([slit1, slit2, slit3], {
      filter: "brightness(0.25)",
      duration: 1.0,
      ease: "power1.in"
    }, 9.2);

    // ----------------------------------------------------
    // SCENE 04: THE SOCIAL MONOLITH (A PROVA SOCIAL MONUMENTAL)
    // Master Build Spec: Pin 1200px, 3.094 scale 1.15 -> 1.0, word slices mask reveal, red cross-through scaleX
    // ----------------------------------------------------
    const monolithTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#sceneMonolith",
        start: "top top",
        end: "+=1200",
        pin: ".monolith-viewport",
        scrub: 0.5,
        anticipatePin: 1
      }
    });

    // 0.0 -> 0.35: Backdrop score scale 1.15 -> 1.0, word-slices translate3d(0, 110%, 0) -> (0,0,0)
    monolithTL
      .fromTo("#backdropScore", {
        scale: 1.15,
        opacity: 0.02
      }, {
        scale: 1.0,
        opacity: 0.06,
        duration: 3.5,
        ease: "power2.out"
      }, 0)
      .fromTo(".word-slice .inner", {
        y: "110%"
      }, {
        y: "0%",
        duration: 3.0,
        stagger: 0.15,
        ease: "power3.out"
      }, 0.5);

    // 0.35 -> 0.65: Cross-through red line expands scaleX(1)
    const crossThroughEl = document.querySelector(".word-slice .inner.cross-through");
    if (crossThroughEl) {
      monolithTL.to(crossThroughEl, {
        "--cross-scale": 1,
        duration: 3.0,
        ease: "power2.out",
        onUpdate: function() {
          const prog = this.progress();
          crossThroughEl.style.setProperty('--line-w', (prog * 100) + '%');
        }
      }, 3.5);
    }

    // 0.70 -> 1.0: Monolith exit fade and scale
    monolithTL.to("#quoteWrapper", {
      scale: 0.95,
      y: -40,
      opacity: 0,
      duration: 3.0,
      ease: "power2.in"
    }, 7.0);

    // ----------------------------------------------------
    // SCENE 05: THE HARBOR AT MARECHAL DEODORO (A CASA REAL NO CENTRO)
    // Master Build Spec: Pin 1200px, Dolly-in scale 1.15 -> 1.0, Sign reveal, Scrim fade
    // ----------------------------------------------------
    const harborTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#sceneHarbor",
        start: "top top",
        end: "+=1200",
        pin: ".harbor-viewport",
        scrub: 0.5,
        anticipatePin: 1
      }
    });

    // 0.0 -> 0.40: Photo fade-in & Sign entrance
    harborTL
      .fromTo("#harborPhoto", {
        scale: 1.15,
        x: "2%",
        opacity: 0.2
      }, {
        opacity: 1,
        duration: 4.0,
        ease: "power1.out"
      }, 0)
      .fromTo("#harborSign", {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 3.5,
        ease: "power2.out"
      }, 0.5);

    // 0.40 -> 0.85: Dolly-in smoothly settles to scale 1.0
    harborTL.to("#harborPhoto", {
      scale: 1.0,
      x: "0%",
      duration: 4.5,
      ease: "none"
    }, 4.0);

    // 0.85 -> 1.0: Exit vinheta
    harborTL.to("#harborPhoto", {
      filter: "brightness(0.4)",
      duration: 1.5,
      ease: "power1.in"
    }, 8.5);

    // ----------------------------------------------------
    // SCENE 06: FINAL SCENE — THE TICKET COUNTER
    // Master Build Spec: High impact Kanji crest and direct action triggers
    // ----------------------------------------------------
    gsap.from(".final-container", {
      scrollTrigger: {
        trigger: "#sceneFinal",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 40,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out"
    });

  }

});

