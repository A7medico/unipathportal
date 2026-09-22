/* ==========================================================================
   UNIPATH — AURA APP CONTROLLER
   Manages sidebar navigation, tab switching, initializes all modules,
   dashboard stats, dark mode, scroll reveals, count-up animations,
   keyboard shortcuts, command palette, and sidebar toggle
   ========================================================================== */

window.App = {
  currentTab: 'explorer',
  commandPaletteOpen: false,
  shortcutsPanelOpen: false,
  sidebarCollapsed: false,

  // Tab to breadcrumb mapping
  tabLabels: {
    explorer: { icon: 'compass', label: 'Institutions' },
    applications: { icon: 'folder-open', label: 'Applications' },
    timeline: { icon: 'git-branch', label: 'Timeline' },
    matcher: { icon: 'calculator', label: 'Eligibility' },
    scholarships: { icon: 'award', label: 'Scholarships' },
    tools: { icon: 'wrench', label: 'Tools' },
    essays: { icon: 'file-text', label: 'GS Statement' },
    favorites: { icon: 'heart', label: 'Saved' }
  },

  async init() {
    // Initialize document storage (IndexedDB)
    await window.UniDocuments.init();

    // Apply saved theme
    this.loadTheme();
    this.loadColorTheme();
    this.bindThemePaletteEvents();
    this.bindModalOverlayEvents();

    // Bind navigation — sidebar
    this.bindSidebarNavigation();
    this.bindSidebarToggle();

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
    if (window.UniFavorites) window.UniFavorites.init();

    this.updateDashboardStats();

    // Student profile form handler
    this.bindStudentProfile();

    // Setup scroll reveals
    this.observeScrollReveals();

    // Count-up animation for hero stats
    this.setupCountUp();

    // Keyboard shortcuts
    this.bindKeyboardShortcuts();

    // Command palette
    this.bindCommandPalette();

    // Apply default dark theme if no saved preference
    if (!localStorage.getItem('unipath_theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  },

  // ═══════════════ SIDEBAR NAVIGATION ═══════════════
  bindSidebarNavigation() {
    const items = document.querySelectorAll('.sidebar-nav-item[data-tab]');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.getAttribute('data-tab');
        this.switchTab(tabId);

        // Close mobile sidebar
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('mobile-open');
        const overlay = document.getElementById('sidebar-overlay');
        if (overlay) overlay.classList.remove('active');
      });
    });
  },

  bindSidebarToggle() {
    // Collapse button (desktop)
    const collapseBtn = document.getElementById('sidebar-collapse-btn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        document.body.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
      });
    }

    // Mobile menu button
    const menuBtn = document.getElementById('topbar-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        if (overlay) overlay.classList.toggle('active', sidebar.classList.contains('mobile-open'));
      });
    }

    // Close sidebar on overlay click
    if (overlay) {
      overlay.addEventListener('click', () => {
        if (sidebar) sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      });
    }
  },

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update sidebar active state
    document.querySelectorAll('.sidebar-nav-item[data-tab]').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    // Also support old nav-tab class for backward compat
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });

    // Switch view
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === `view-${tabId}`);
    });

    // Update breadcrumb
    this.updateBreadcrumb(tabId);

    // Refresh data when entering specific tabs
    if (tabId === 'applications') {
      window.UniApplications.render();
      this.updateDashboardStats();
    } else if (tabId === 'explorer') {
      window.UniExplorer.render();
    } else if (tabId === 'timeline') {
      if (window.UniTimeline) window.UniTimeline.render();
    } else if (tabId === 'favorites') {
      if (window.UniFavorites) window.UniFavorites.render();
    } else if (tabId === 'tools') {
      if (window.UniCostLiving) {
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

  updateBreadcrumb(tabId) {
    const info = this.tabLabels[tabId];
    if (!info) return;

    const iconEl = document.querySelector('.topbar-breadcrumb-icon');
    const textEl = document.querySelector('.topbar-breadcrumb-text');

    if (iconEl) {
      iconEl.innerHTML = `<i data-lucide="${info.icon}" style="width: 16px; height: 16px;"></i>`;
    }
    if (textEl) {
      textEl.textContent = info.label;
    }

    if (window.lucide) window.lucide.createIcons();
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

  // ═══════════════ DARK MODE & COLOR THEMES ═══════════════
  loadTheme() {
    const savedTheme = localStorage.getItem('unipath_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('unipath_theme', newTheme);
    this.showToast(`${newTheme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode activated`);
    if (window.lucide) lucide.createIcons();
  },

  loadColorTheme() {
    const savedColor = localStorage.getItem('unipath_color_theme') || 'oceanic';
    this.setColorTheme(savedColor, false);
  },

  setColorTheme(themeId, notify = true) {
    const validThemes = ['oceanic', 'emerald', 'sunset', 'amethyst', 'cyber', 'amber'];
    const selected = validThemes.includes(themeId) ? themeId : 'oceanic';
    document.documentElement.setAttribute('data-color-theme', selected);
    localStorage.setItem('unipath_color_theme', selected);

    // Update active class on dropdown buttons
    const buttons = document.querySelectorAll('.theme-option-btn');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-theme-id') === selected) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const themeNames = {
      oceanic: 'Oceanic Clarity (Indigo & Sky)',
      emerald: 'Emerald Horizon (Rainforest & Mint)',
      sunset: 'Sunset Coral (Outback & Amber)',
      amethyst: 'Royal Amethyst (Violet & Orchid)',
      cyber: 'Nordic Slate (Cobalt & Arctic Cyan)',
      amber: 'Golden Wattle (Honey Gold & Sage)'
    };

    if (notify) {
      this.showToast(`🎨 Theme switched to ${themeNames[selected] || selected}`);
      const dd = document.getElementById('theme-palette-dropdown');
      if (dd) dd.classList.remove('active');
    }
  },

  toggleThemePalette(e) {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    const dd = document.getElementById('theme-palette-dropdown');
    if (!dd) return;
    const isActive = dd.classList.toggle('active');
    if (isActive) {
      const notifDd = document.getElementById('notif-dropdown');
      if (notifDd) notifDd.classList.remove('active');
      if (window.lucide) lucide.createIcons();
    }
  },

  bindThemePaletteEvents() {
    const btn = document.getElementById('theme-palette-btn');
    const dropdown = document.getElementById('theme-palette-dropdown');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleThemePalette(e);
      });
    }
    document.addEventListener('click', (e) => {
      if (dropdown && dropdown.classList.contains('active')) {
        if (!dropdown.contains(e.target) && (!btn || !btn.contains(e.target))) {
          dropdown.classList.remove('active');
        }
      }
    });
    if (dropdown) {
      dropdown.addEventListener('click', (e) => e.stopPropagation());
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dropdown && dropdown.classList.contains('active')) {
          dropdown.classList.remove('active');
        }
        this.closeModal();
      }
    });
  },

  bindModalOverlayEvents() {
    const overlay = document.getElementById('uni-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModal();
        }
      });
    }
  },

  openThemeModal() {
    const overlay = document.getElementById('uni-modal-overlay');
    const container = document.getElementById('uni-modal-content');
    if (!overlay || !container) return;

    // Close palette dropdown if open
    const dd = document.getElementById('theme-palette-dropdown');
    if (dd) dd.classList.remove('active');

    const currentTheme = document.documentElement.getAttribute('data-color-theme') || 'oceanic';
    const currentMode = document.documentElement.getAttribute('data-theme') || 'dark';

    const themes = [
      { id: 'oceanic', name: 'Oceanic Clarity', desc: 'Indigo & Sky Cyan', primary: '#4f46e5', secondary: '#0ea5e9', vibe: 'Classic AU & NZ Admissions' },
      { id: 'emerald', name: 'Emerald Horizon', desc: 'Rainforest Jade & Mint', primary: '#059669', secondary: '#0d9488', vibe: 'Lush Rainforests & Nature' },
      { id: 'sunset', name: 'Sunset Coral', desc: 'Outback Coral & Amber', primary: '#e11d48', secondary: '#ea580c', vibe: 'Warm Outback Sunset' },
      { id: 'amethyst', name: 'Royal Amethyst', desc: 'Academic Violet & Orchid', primary: '#7c3aed', secondary: '#c026d3', vibe: 'Prestigious University Regalia' },
      { id: 'cyber', name: 'Nordic Slate', desc: 'Cobalt & Arctic Cyan', primary: '#2563eb', secondary: '#06b6d4', vibe: 'Clean Modern Precision' },
      { id: 'amber', name: 'Golden Wattle', desc: 'Honey Gold & Sage', primary: '#d97706', secondary: '#059669', vibe: 'Australian Floral Emblem' }
    ];

    container.innerHTML = `
      <div class="theme-modal-wrapper">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem;">
              <div class="sidebar-brand-icon" style="width: 32px; height: 32px; min-width: 32px; font-size: 0.95rem;">
                <i data-lucide="palette" style="width: 18px; height: 18px;"></i>
              </div>
              <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">Theme Studio</h2>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Test and switch between 6 beautifully tuned color themes in real time.</p>
          </div>
          <button class="modal-close" onclick="App.closeModal()" aria-label="Close modal">
            <i data-lucide="x" style="width: 18px; height: 18px;"></i>
          </button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1.15rem; background: var(--bg-subtle); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <i data-lucide="${currentMode === 'dark' ? 'moon' : 'sun'}" style="width: 18px; height: 18px; color: var(--accent-primary);"></i>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">Active Mode: <strong>${currentMode === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</strong></span>
          </div>
          <button class="btn btn-glass btn-sm" onclick="App.toggleTheme(); App.openThemeModal();">
            Toggle Light / Dark
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.85rem; margin-bottom: 1.5rem;">
          ${themes.map(t => {
            const isActive = t.id === currentTheme;
            return `
              <div class="theme-card-picker" onclick="App.setColorTheme('${t.id}'); App.openThemeModal();" style="
                border: 2px solid ${isActive ? 'var(--accent-primary)' : 'var(--glass-border)'};
                background: ${isActive ? 'var(--accent-primary-soft)' : 'var(--glass-bg)'};
                border-radius: var(--radius-sm);
                padding: 1rem;
                cursor: pointer;
                transition: all var(--transition-fast);
                display: flex;
                flex-direction: column;
                gap: 0.65rem;
                position: relative;
              ">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 0.65rem;">
                    <div style="
                      width: 30px;
                      height: 30px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, ${t.primary}, ${t.secondary});
                      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                      border: 2px solid var(--bg-card-solid);
                      flex-shrink: 0;
                    "></div>
                    <div>
                      <div style="font-weight: 800; font-size: 0.92rem; color: var(--text-primary);">${t.name}</div>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">${t.desc}</div>
                    </div>
                  </div>
                  ${isActive ? `<span style="font-size: 0.7rem; font-weight: 800; color: var(--accent-primary); background: var(--bg-card-solid); padding: 0.15rem 0.5rem; border-radius: 999px; border: 1px solid var(--accent-primary-border);">Active</span>` : ''}
                </div>
                <div style="font-size: 0.74rem; color: var(--text-secondary); background: var(--bg-subtle); padding: 0.35rem 0.6rem; border-radius: 6px;">
                  ${t.vibe}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" onclick="App.closeModal()">
            Done Testing
          </button>
        </div>
      </div>
    `;

    overlay.classList.add('active');
    if (window.lucide) lucide.createIcons();
  },

  closeModal() {
    const overlay = document.getElementById('uni-modal-overlay');
    if (overlay) overlay.classList.remove('active');
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
        element.textContent = text;
      }
    };

    element.textContent = prefix + '0' + suffix;
    requestAnimationFrame(animate);
  },

  // ═══════════════ KEYBOARD SHORTCUTS ═══════════════
  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const tag = e.target.tagName.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;

      // Ctrl+K — Command Palette (always works)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleCommandPalette();
        return;
      }

      // Escape
      if (e.key === 'Escape') {
        if (this.commandPaletteOpen) {
          this.closeCommandPalette();
          return;
        }
        if (this.shortcutsPanelOpen) {
          this.closeShortcutsPanel();
          return;
        }
        // Close mobile sidebar
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          sidebar.classList.remove('mobile-open');
          const overlay = document.getElementById('sidebar-overlay');
          if (overlay) overlay.classList.remove('active');
          return;
        }
        return;
      }

      if (isTyping) return;

      const tabMap = {
        '1': 'explorer',
        '2': 'applications',
        '3': 'timeline',
        '4': 'matcher',
        '5': 'scholarships',
        '6': 'tools',
        '7': 'essays',
        '8': 'favorites'
      };

      if (tabMap[e.key]) {
        e.preventDefault();
        this.switchTab(tabMap[e.key]);
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        this.toggleShortcutsPanel();
        return;
      }

      if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        this.toggleTheme();
        return;
      }
    });
  },

  // ═══════════════ COMMAND PALETTE ═══════════════
  bindCommandPalette() {
    const overlay = document.getElementById('command-palette-overlay');
    const input = document.getElementById('command-palette-input');
    const results = document.getElementById('command-palette-results');

    if (!overlay || !input || !results) return;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeCommandPalette();
    });

    input.addEventListener('input', () => {
      this.renderCommandPaletteResults(input.value.trim().toLowerCase());
    });

    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('.command-palette-item');
      const activeItem = results.querySelector('.command-palette-item.active');
      let activeIndex = Array.from(items).indexOf(activeItem);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeItem) activeItem.classList.remove('active');
        activeIndex = (activeIndex + 1) % items.length;
        items[activeIndex]?.classList.add('active');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeItem) activeItem.classList.remove('active');
        activeIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
        items[activeIndex]?.classList.add('active');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const active = results.querySelector('.command-palette-item.active') || items[0];
        if (active) active.click();
      }
    });
  },

  openCommandPalette() {
    const overlay = document.getElementById('command-palette-overlay');
    const input = document.getElementById('command-palette-input');
    if (!overlay || !input) return;

    this.commandPaletteOpen = true;
    overlay.classList.add('active');
    input.value = '';
    input.focus();
    this.renderCommandPaletteResults('');
  },

  closeCommandPalette() {
    const overlay = document.getElementById('command-palette-overlay');
    if (!overlay) return;

    this.commandPaletteOpen = false;
    overlay.classList.remove('active');
  },

  toggleCommandPalette() {
    if (this.commandPaletteOpen) {
      this.closeCommandPalette();
    } else {
      this.openCommandPalette();
    }
  },

  renderCommandPaletteResults(query) {
    const results = document.getElementById('command-palette-results');
    if (!results) return;

    const items = [];

    const tabs = [
      { icon: 'compass', label: 'Go to Institutions', action: () => this.switchTab('explorer') },
      { icon: 'folder-open', label: 'Go to Applications', action: () => this.switchTab('applications') },
      { icon: 'git-branch', label: 'Go to Timeline', action: () => this.switchTab('timeline') },
      { icon: 'calculator', label: 'Go to Eligibility', action: () => this.switchTab('matcher') },
      { icon: 'award', label: 'Go to Scholarships', action: () => this.switchTab('scholarships') },
      { icon: 'wrench', label: 'Go to Tools', action: () => this.switchTab('tools') },
      { icon: 'file-text', label: 'Go to GS Statement', action: () => this.switchTab('essays') },
      { icon: 'heart', label: 'Go to Saved', action: () => this.switchTab('favorites') },
      { icon: 'sun', label: 'Toggle Dark Mode', action: () => this.toggleTheme() },
      { icon: 'palette', label: 'Theme: Oceanic Clarity (Indigo & Sky)', action: () => this.setColorTheme('oceanic') },
      { icon: 'palette', label: 'Theme: Emerald Horizon (Rainforest & Mint)', action: () => this.setColorTheme('emerald') },
      { icon: 'palette', label: 'Theme: Sunset Coral (Outback & Amber)', action: () => this.setColorTheme('sunset') },
      { icon: 'palette', label: 'Theme: Royal Amethyst (Violet & Orchid)', action: () => this.setColorTheme('amethyst') },
      { icon: 'palette', label: 'Theme: Nordic Slate (Cobalt & Arctic Cyan)', action: () => this.setColorTheme('cyber') },
      { icon: 'palette', label: 'Theme: Golden Wattle (Honey Gold & Sage)', action: () => this.setColorTheme('amber') },
      { icon: 'download', label: 'Export All Applications', action: () => { window.UniDocuments.exportAllApplications(); } },
    ];

    const institutions = window.UniData.institutions || [];

    tabs.forEach(tab => {
      if (!query || tab.label.toLowerCase().includes(query)) {
        items.push(tab);
      }
    });

    institutions.forEach(inst => {
      if (!query || inst.name.toLowerCase().includes(query) || inst.shortName.toLowerCase().includes(query) || inst.city.toLowerCase().includes(query)) {
        items.push({
          icon: inst.type === 'language' ? 'book-open' : 'graduation-cap',
          label: `${inst.shortName} — ${inst.city}, ${inst.country}`,
          action: () => { this.switchTab('explorer'); UniExplorer.showModal(inst.id); }
        });
      }
    });

    const displayed = items.slice(0, 12);

    if (displayed.length === 0) {
      results.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">No results found</div>`;
      return;
    }

    results.innerHTML = displayed.map((item, i) => `
      <div class="command-palette-item ${i === 0 ? 'active' : ''}" data-index="${i}">
        <i data-lucide="${item.icon}" style="width: 18px; height: 18px;"></i>
        <span>${item.label}</span>
      </div>
    `).join('');

    results.querySelectorAll('.command-palette-item').forEach((el, idx) => {
      el.addEventListener('click', () => {
        this.closeCommandPalette();
        displayed[idx].action();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  },

  // ═══════════════ SHORTCUTS PANEL ═══════════════
  toggleShortcutsPanel() {
    if (this.shortcutsPanelOpen) {
      this.closeShortcutsPanel();
    } else {
      this.openShortcutsPanel();
    }
  },

  openShortcutsPanel() {
    const panel = document.getElementById('shortcuts-panel');
    if (!panel) return;
    this.shortcutsPanelOpen = true;
    panel.classList.add('active');
  },

  closeShortcutsPanel() {
    const panel = document.getElementById('shortcuts-panel');
    if (!panel) return;
    this.shortcutsPanelOpen = false;
    panel.classList.remove('active');
  },

  // ═══════════════ TOAST NOTIFICATIONS ═══════════════
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="sparkles" style="width: 18px; height: 18px; color: var(--accent-primary);"></i>
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
  },

  // ═══════════════ FLOATING ACTION BAR (Legacy — hidden) ═══════════════
  setupFloatingActionBar() {
    // Floating action bar removed in Aura redesign (sidebar replaces it)
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
