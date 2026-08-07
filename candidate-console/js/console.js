/* ═══════════════════════════════════════════════════════════════
   CONSOLE.JS — Modular JavaScript for Candidate Console
   Terminal Typing Effect • Modal System • Scroll Animations • Particles
   ═══════════════════════════════════════════════════════════════ */

// ── Terminal Typing Engine ──
const TerminalEngine = (() => {
  const lines = [
    { text: 'Establishing secure connection to Oceanic servers...', class: 'info', delay: 600 },
    { text: 'Assessing linguistic architecture...', class: 'warn', delay: 500 },
    { text: 'Loading technical payload manifest...', class: 'info', delay: 450 },
    { text: 'Handshake protocols initialized.', class: 'success', delay: 400 },
    { text: 'Ready for download.', class: 'success', delay: 0 },
  ];

  let currentLine = 0;
  let currentChar = 0;
  let isTyping = false;

  function init() {
    const container = document.getElementById('terminal-lines');
    if (!container) return;

    // Create line elements
    lines.forEach((line, i) => {
      const el = document.createElement('div');
      el.className = 'terminal-line';
      el.id = `term-line-${i}`;
      el.innerHTML = `<span class="prompt">›</span><span class="${line.class}" id="term-text-${i}"></span>`;
      container.appendChild(el);
    });

    // Start typing after a brief delay
    setTimeout(() => startTyping(), 800);
  }

  function startTyping() {
    if (currentLine >= lines.length) {
      // Show cursor blinking on the last line
      const lastTextEl = document.getElementById(`term-text-${lines.length - 1}`);
      if (lastTextEl) {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        lastTextEl.appendChild(cursor);
      }
      return;
    }

    const lineEl = document.getElementById(`term-line-${currentLine}`);
    const textEl = document.getElementById(`term-text-${currentLine}`);
    if (!lineEl || !textEl) return;

    lineEl.classList.add('visible');
    isTyping = true;
    currentChar = 0;

    typeChar(textEl, lines[currentLine]);
  }

  function typeChar(textEl, lineData) {
    if (currentChar <= lineData.text.length) {
      textEl.textContent = lineData.text.substring(0, currentChar);

      // Add cursor to current position
      const existingCursor = textEl.querySelector('.terminal-cursor');
      if (existingCursor) existingCursor.remove();

      if (currentChar < lineData.text.length) {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        textEl.appendChild(cursor);
      }

      currentChar++;
      const speed = 25 + Math.random() * 25; // Variable speed for realism
      setTimeout(() => typeChar(textEl, lineData), speed);
    } else {
      // Remove cursor from finished line
      const existingCursor = textEl.querySelector('.terminal-cursor');
      if (existingCursor) existingCursor.remove();

      currentLine++;
      setTimeout(() => startTyping(), lineData.delay);
    }
  }

  return { init };
})();


// ── Bandwidth Bar Animator ──
const BandwidthAnimator = (() => {
  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.bandwidth-fill');
          fills.forEach(fill => {
            const target = fill.dataset.width || '0%';
            setTimeout(() => {
              fill.style.width = target;
            }, 300);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.net-node').forEach(node => observer.observe(node));

    // Cultural protocol progress bar
    const protocolObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.protocol-progress-fill');
          if (fill) {
            setTimeout(() => {
              fill.style.width = '0%';
            }, 500);
          }
          protocolObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.cultural-protocol-card').forEach(card => protocolObserver.observe(card));
  }

  return { init };
})();


// ── Scroll Reveal Animator ──
const ScrollReveal = (() => {
  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  return { init };
})();


// ── Modal Controller ──
const ModalController = (() => {
  let overlay;

  function init() {
    overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        close();
      }
    });

    // Form submission
    const form = document.getElementById('handshake-form');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }
  }

  function open() {
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset form to input state
    const formContent = document.getElementById('form-content');
    const successContent = document.getElementById('form-success');
    if (formContent) formContent.style.display = 'block';
    if (successContent) successContent.style.display = 'none';
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formContent = document.getElementById('form-content');
    const successContent = document.getElementById('form-success');

    if (formContent) formContent.style.display = 'none';
    if (successContent) successContent.style.display = 'block';

    // Auto-close after 3 seconds
    setTimeout(() => close(), 3500);
  }

  return { init, open, close };
})();


// ── Particle System ──
const ParticleSystem = (() => {
  let canvas, ctx, particles, animationId;
  const PARTICLE_COUNT = 60;

  function init() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    particles = [];

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }

    animate();
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.05,
      color: Math.random() > 0.5 ? '0, 255, 136' : '0, 212, 255',
    };
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around screen edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();
    });

    // Draw subtle connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 136, ${0.03 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  return { init };
})();


// ── Smooth Scroll for Nav Links ──
const SmoothNav = (() => {
  function init() {
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Update active state
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Highlight nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
  }

  return { init };
})();


// ── Navbar Scroll Effect ──
const NavbarScroll = (() => {
  function init() {
    const nav = document.querySelector('.console-nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 60) {
        nav.style.borderBottomColor = 'rgba(0, 255, 136, 0.1)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
      } else {
        nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
        nav.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  return { init };
})();


// ── Initialize Everything ──
document.addEventListener('DOMContentLoaded', () => {
  TerminalEngine.init();
  BandwidthAnimator.init();
  ScrollReveal.init();
  ModalController.init();
  ParticleSystem.init();
  SmoothNav.init();
  NavbarScroll.init();
});
