/* ==========================================================================
   UNIPATH — APP CONTROLLER
   Manages tab navigation, initializes all modules, dashboard stats
   ========================================================================== */

window.App = {
  currentTab: 'explorer',

  async init() {
    // Initialize document storage (IndexedDB)
    await window.UniDocuments.init();

    // Bind navigation
    this.bindTabNavigation();

    // Initialize modules
    window.UniExplorer.init();
    window.UniApplications.init();
    window.UniScholarships.init();

    // Optional modules
    if (window.UniMatcher) window.UniMatcher.init();
    if (window.UniConversion) window.UniConversion.init();
    if (window.UniFinancials) window.UniFinancials.init();
    if (window.UniVisa) window.UniVisa.init();
    if (window.UniEssays) window.UniEssays.init();

    this.updateDashboardStats();

    // Student profile form handler
    this.bindStudentProfile();
  },

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
    }

    if (window.lucide) window.lucide.createIcons();
  },

  updateDashboardStats() {
    const stats = window.UniApplications.getCompletionStats();

    const statTotalEl = document.getElementById('stat-total-apps');
    const statCompleteEl = document.getElementById('stat-complete-apps');
    const statDocsEl = document.getElementById('stat-docs-uploaded');

    if (statTotalEl) statTotalEl.textContent = stats.total;
    if (statCompleteEl) statCompleteEl.textContent = stats.complete;
    if (statDocsEl) statDocsEl.textContent = `${stats.uploadedDocs}/${stats.totalDocs}`;
  },

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
