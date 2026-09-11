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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
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
    // SCENE 02: SPEED COUNTER PARALLAX
    // ----------------------------------------------------
    gsap.from("#sceneCounter .media-frame", {
      scrollTrigger: {
        trigger: "#sceneCounter",
        start: "top 80%",
        end: "bottom top",
        scrub: 1
      },
      y: 50,
      ease: "none"
    });

    gsap.from("#sceneCounter .counter-col-content", {
      scrollTrigger: {
        trigger: "#sceneCounter",
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out"
    });

    // ----------------------------------------------------
    // SCENE 03: EDITORIAL MENU ROWS STAGGER & INTERACTION
    // ----------------------------------------------------
    gsap.from(".menu-row", {
      scrollTrigger: {
        trigger: "#sceneMenu",
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      y: 35,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out"
    });

    const menuRows = document.querySelectorAll('.menu-row');
    menuRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        menuRows.forEach(r => r.classList.remove('active'));
        row.classList.add('active');
      });
    });

    // ----------------------------------------------------
    // SCENE 04: MONUMENTAL QUOTE SCALE REVEAL
    // ----------------------------------------------------
    gsap.from("#sceneQuote .quote-content", {
      scrollTrigger: {
        trigger: "#sceneQuote",
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      scale: 0.94,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out"
    });

    // ----------------------------------------------------
    // SCENE 05: LOCATION DOCK
    // ----------------------------------------------------
    gsap.from("#sceneLocation .location-visual", {
      scrollTrigger: {
        trigger: "#sceneLocation",
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      x: -40,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out"
    });

    gsap.from("#sceneLocation .location-details", {
      scrollTrigger: {
        trigger: "#sceneLocation",
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out"
    });

    // ----------------------------------------------------
    // SCENE 06: FINAL ACTION CREST
    // ----------------------------------------------------
    gsap.from("#sceneAction .action-container", {
      scrollTrigger: {
        trigger: "#sceneAction",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

  }

});
