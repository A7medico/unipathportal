/* ==========================================================================
   UNIPATH AUSTRALIA - APP CONTROLLER & TECHNICAL ENGINES
   ========================================================================== */

window.App = {
  currentTab: 'explorer',
  chartInstance: null,

  init() {
    this.bindTabNavigation();
    window.UniExplorer.init();
    window.UniMatcher.init();
    window.UniTracker.init();
    window.UniScholarships.init();
    window.UniEssays.init();
    
    // Technical Engines
    if (window.UniConversion) window.UniConversion.init();
    if (window.UniFinancials) window.UniFinancials.init();
    if (window.UniVisa) window.UniVisa.init();

    this.updateDashboardStats();
    this.initChart();
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

    if (tabId === 'tracker') {
      window.UniTracker.render();
    } else if (tabId === 'dashboard') {
      this.updateDashboardStats();
      this.renderChart();
    }

    if (window.lucide) window.lucide.createIcons();
  },

  updateDashboardStats() {
    const totalApps = window.UniTracker.trackedApps.length;
    const submittedApps = window.UniTracker.trackedApps.filter(a => a.stage === 'submitted' || a.stage === 'decision').length;
    const totalTasks = window.UniTracker.trackedApps.reduce((acc, a) => acc + a.tasks.length, 0);
    const completedTasks = window.UniTracker.trackedApps.reduce((acc, a) => acc + a.tasks.filter(t => t.done).length, 0);

    const statTotalEl = document.getElementById('stat-total-apps');
    const statSubEl = document.getElementById('stat-submitted-apps');
    const statTaskEl = document.getElementById('stat-task-progress');

    if (statTotalEl) statTotalEl.textContent = totalApps;
    if (statSubEl) statSubEl.textContent = submittedApps;
    if (statTaskEl) {
      const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      statTaskEl.textContent = `${pct}%`;
    }
  },

  initChart() {
    const canvas = document.getElementById('dashboard-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Wishlist', 'Preparing', 'Submitted', 'Interview', 'Decision'],
        datasets: [{
          data: [1, 1, 1, 0, 0],
          backgroundColor: [
            '#00f2fe',
            '#4facfe',
            '#ffb703',
            '#7c3aed',
            '#10b981'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: { family: 'Plus Jakarta Sans', size: 12 }
            }
          }
        }
      }
    });
  },

  renderChart() {
    if (!this.chartInstance) {
      this.initChart();
      return;
    }

    const counts = window.UniTracker.stages.map(s => {
      return window.UniTracker.trackedApps.filter(a => a.stage === s.id).length;
    });

    this.chartInstance.data.datasets[0].data = counts;
    this.chartInstance.update();
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
