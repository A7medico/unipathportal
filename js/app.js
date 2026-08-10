/* ==========================================================================
   UNIPATH — APP CONTROLLER
   Manages tab navigation, initializes all modules, dashboard stats,
   dark mode, scroll reveals, count-up animations, and floating action bar
   ========================================================================== */

window.App = {
  currentTab: 'explorer',

  async init() {
    // Initialize document storage (IndexedDB)
    await window.UniDocuments.init();

    // Apply saved theme
    this.loadTheme();

    // Bind navigation
    this.bindTabNavigation();

    // Initialize core modules
    window.UniExplorer.init();
    window.UniApplications.init();
    window.UniScholarships.init();

    // Optional modules
    if (window.UniMatcher) window.UniMatcher.init();
    if (window.UniConversion) window.UniConversion.init();
    if (window.UniFinancials) window.UniFinancials.init();
    if (window.UniVisa) window.UniVisa.init();
    if (window.UniEssays) window.UniEssays.init();

    // New modules
    if (window.UniDeadlines) window.UniDeadlines.init();
    if (window.UniCompare) window.UniCompare.init();
    if (window.UniCostLiving) window.UniCostLiving.init();
    if (window.UniTimeline) window.UniTimeline.init();

    this.updateDashboardStats();

    // Student profile form handler
    this.bindStudentProfile();

    // Setup scroll reveals
    this.observeScrollReveals();

    // Setup floating action bar
    this.setupFloatingActionBar();

    // Count-up animation for hero stats
    this.setupCountUp();
  },

  // ═══════════════ TAB NAVIGATION ═══════════════
  bindTabNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetViewId = tab.getAttribute('data-tab');
        this.switchTab(targetViewId);
      });
    });
  },

  switchTab(tabId) {
    this.currentTab = tabId;

    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === `view-${tabId}`);
    });

    // Refresh data when entering specific tabs
    if (tabId === 'applications') {
      window.UniApplications.render();
      this.updateDashboardStats();
    } else if (tabId === 'explorer') {
      window.UniExplorer.render();
    } else if (tabId === 'timeline') {
      if (window.UniTimeline) window.UniTimeline.render();
    } else if (tabId === 'tools') {
      if (window.UniCostLiving) {
        // Re-trigger bar animations
        setTimeout(() => {
          document.querySelectorAll('.col-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
          });
        }, 300);
      }
    }

    if (window.lucide) window.lucide.createIcons();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ═══════════════ DASHBOARD STATS ═══════════════
  updateDashboardStats() {
    const stats = window.UniApplications.getCompletionStats();

    const statTotalEl = document.getElementById('stat-total-apps');
    const statCompleteEl = document.getElementById('stat-complete-apps');
    const statDocsEl = document.getElementById('stat-docs-uploaded');

    if (statTotalEl) statTotalEl.textContent = stats.total;
    if (statCompleteEl) statCompleteEl.textContent = stats.complete;
    if (statDocsEl) statDocsEl.textContent = `${stats.uploadedDocs}/${stats.totalDocs}`;
  },

  // ═══════════════ STUDENT PROFILE ═══════════════
  bindStudentProfile() {
    const form = document.getElementById('student-profile-form');
    if (!form) return;

    // Load existing data
    const profile = window.UniDocuments.getStudentProfile();
    const fields = ['name', 'email', 'phone', 'nationality', 'notes'];
    fields.forEach(f => {
      const input = document.getElementById(`student-${f}`);
      if (input && profile[f]) input.value = profile[f];
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {};
      fields.forEach(f => {
        const input = document.getElementById(`student-${f}`);
        data[f] = input ? input.value.trim() : '';
      });
      window.UniDocuments.saveStudentProfile(data);
      this.showToast('Student profile saved!');
    });
  },

  // ═══════════════ DARK MODE ═══════════════
  loadTheme() {
    const savedTheme = localStorage.getItem('unipath_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('unipath_theme', newTheme);
    this.showToast(`${newTheme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode activated`);
  },

  // ═══════════════ SCROLL REVEAL ANIMATIONS ═══════════════
  observeScrollReveals() {
    const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    elements.forEach(el => observer.observe(el));
  },

  // ═══════════════ COUNT-UP ANIMATION ═══════════════
  setupCountUp() {
    const statElements = document.querySelectorAll('.count-up');
    if (!statElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statElements.forEach(el => observer.observe(el));
  },

  animateCountUp(element) {
    const text = element.textContent.trim();
    // Try to extract a number
    const match = text.match(/(\d+\.?\d*)/);
    if (!match) return;

    const target = parseFloat(match[1]);
    const isFloat = text.includes('.');
    const prefix = text.substring(0, text.indexOf(match[1]));
    const suffix = text.substring(text.indexOf(match[1]) + match[1].length);

    const duration = 1200;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isFloat) {
        element.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        element.textContent = prefix + Math.round(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = text; // Restore exact original
      }
    };

    element.textContent = prefix + '0' + suffix;
    requestAnimationFrame(animate);
  },

  // ═══════════════ FLOATING ACTION BAR ═══════════════
  setupFloatingActionBar() {
    const fab = document.getElementById('floating-action-bar');
    if (!fab) return;

    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY > 300) {
            fab.classList.add('visible');
          } else {
            fab.classList.remove('visible');
          }
          lastScrollY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    });
  },

  // ═══════════════ TOAST NOTIFICATIONS ═══════════════
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="sparkles" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = '0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
