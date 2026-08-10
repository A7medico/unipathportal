/* ==========================================================================
   UNIPATH — DEADLINE COUNTDOWN & SMART NOTIFICATION SYSTEM
   Live countdown timers with urgency levels and notification panel
   ========================================================================== */

window.UniDeadlines = {
  notifications: [],

  init() {
    this.calculateDeadlines();
    this.updateBadge();
    this.bindEvents();
    // Refresh every minute
    setInterval(() => this.calculateDeadlines(), 60000);
  },

  bindEvents() {
    const bell = document.getElementById('notif-bell');
    const dropdown = document.getElementById('notif-dropdown');
    if (bell) {
      bell.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
    }
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      if (dropdown) dropdown.classList.remove('active');
    });
    if (dropdown) {
      dropdown.addEventListener('click', (e) => e.stopPropagation());
    }
  },

  calculateDeadlines() {
    const apps = window.UniDocuments.getApplications();
    const now = new Date();
    this.notifications = [];

    apps.forEach(app => {
      const inst = window.UniData.institutions.find(i => i.id === app.institutionId);
      if (!inst) return;

      const deadlines = [];
      if (inst.sem1Deadline && inst.sem1Deadline !== 'Rolling admissions') {
        deadlines.push({ label: 'Semester 1', date: new Date(inst.sem1Deadline) });
      }
      if (inst.sem2Deadline && inst.sem2Deadline !== 'Rolling admissions') {
        deadlines.push({ label: 'Semester 2', date: new Date(inst.sem2Deadline) });
      }

      deadlines.forEach(dl => {
        const diffMs = dl.date - now;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return; // Past deadlines

        let urgency = 'info';
        if (diffDays <= 14) urgency = 'critical';
        else if (diffDays <= 30) urgency = 'warning';

        // Check document completeness
        const requiredDocs = app.documents.filter(d => d.required);
        const uploadedRequired = requiredDocs.filter(d => d.uploaded).length;
        const docsComplete = uploadedRequired === requiredDocs.length;

        this.notifications.push({
          institution: inst.shortName,
          institutionId: inst.id,
          country: inst.country,
          intakeLabel: dl.label,
          deadline: dl.date,
          daysLeft: diffDays,
          urgency,
          docsComplete,
          docsUploaded: uploadedRequired,
          docsTotal: requiredDocs.length
        });
      });
    });

    // Sort by urgency (critical first, then by days left)
    this.notifications.sort((a, b) => {
      const urgencyOrder = { critical: 0, warning: 1, info: 2 };
      if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      }
      return a.daysLeft - b.daysLeft;
    });

    this.renderDropdown();
    this.updateBadge();
  },

  updateBadge() {
    const badge = document.getElementById('notif-badge');
    if (!badge) return;
    const urgentCount = this.notifications.filter(n => n.urgency === 'critical' || n.urgency === 'warning').length;
    badge.textContent = urgentCount;
    badge.setAttribute('data-count', urgentCount);
  },

  renderDropdown() {
    const container = document.getElementById('notif-list');
    if (!container) return;

    if (this.notifications.length === 0) {
      container.innerHTML = `
        <div style="padding: 2rem 1.25rem; text-align: center; color: var(--text-muted);">
          <i data-lucide="bell-off" style="width: 32px; height: 32px; margin-bottom: 0.5rem;"></i>
          <div style="font-size: 0.9rem; font-weight: 600;">No upcoming deadlines</div>
          <div style="font-size: 0.8rem;">Add institutions to track their deadlines</div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = this.notifications.map(n => {
      const flag = n.country === 'Australia' ? '🇦🇺' : '🇳🇿';
      const dateStr = n.deadline.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });
      const daysText = n.daysLeft === 0 ? 'TODAY' : (n.daysLeft === 1 ? '1 day left' : `${n.daysLeft} days left`);
      const docStatus = n.docsComplete
        ? '<span style="color: var(--accent-emerald); font-weight: 600;">✓ Docs Ready</span>'
        : `<span style="color: var(--accent-amber);">${n.docsUploaded}/${n.docsTotal} docs</span>`;

      return `
        <div class="notif-item" onclick="App.switchTab('applications')">
          <div class="notif-urgency-dot ${n.urgency}"></div>
          <div class="notif-item-text">
            <div class="notif-item-title">${flag} ${n.institution} — ${n.intakeLabel}</div>
            <div class="notif-item-sub">
              ${dateStr} · <strong>${daysText}</strong> · ${docStatus}
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  formatCountdown(days) {
    if (days <= 0) return 'Past Due';
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.floor(days / 7)} weeks`;
    return `${Math.floor(days / 30)} months`;
  }
};
