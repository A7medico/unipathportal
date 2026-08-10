/* ==========================================================================
   UNIPATH — APPLICATION TIMELINE TRACKER
   Visual milestone roadmap for each application
   ========================================================================== */

window.UniTimeline = {
  MILESTONES: [
    { id: 'applied', label: 'Applied', icon: 'send' },
    { id: 'documents', label: 'Documents', icon: 'file-check' },
    { id: 'submitted', label: 'Submitted', icon: 'check-circle' },
    { id: 'offer', label: 'Offer', icon: 'mail' },
    { id: 'visa', label: 'Visa', icon: 'shield-check' },
    { id: 'enrolled', label: 'Enrolled', icon: 'graduation-cap' }
  ],

  TIMELINE_KEY: 'unipath_timeline_status',

  init() {
    // Nothing extra — render is called when tab is shown
  },

  getStatuses() {
    try {
      return JSON.parse(localStorage.getItem(this.TIMELINE_KEY)) || {};
    } catch { return {}; }
  },

  saveStatuses(data) {
    localStorage.setItem(this.TIMELINE_KEY, JSON.stringify(data));
  },

  setMilestoneStatus(instId, milestoneId, status) {
    const statuses = this.getStatuses();
    if (!statuses[instId]) statuses[instId] = {};
    statuses[instId][milestoneId] = status;
    this.saveStatuses(statuses);
    this.render();
  },

  getAppMilestoneStatus(instId) {
    const statuses = this.getStatuses();
    const appStatus = statuses[instId] || {};

    // Auto-detect first two milestones from app data
    const apps = window.UniDocuments.getApplications();
    const app = apps.find(a => a.institutionId === instId);

    if (app) {
      // Auto-mark "Applied" as complete if in applications
      if (!appStatus.applied) appStatus.applied = 'completed';

      // Auto-mark "Documents" based on upload status
      const requiredDocs = app.documents.filter(d => d.required);
      const uploaded = requiredDocs.filter(d => d.uploaded).length;
      if (uploaded === requiredDocs.length && requiredDocs.length > 0) {
        if (!appStatus.documents || appStatus.documents === 'pending') {
          appStatus.documents = 'completed';
        }
      } else if (uploaded > 0) {
        if (!appStatus.documents || appStatus.documents === 'pending') {
          appStatus.documents = 'current';
        }
      }
    }

    return appStatus;
  },

  getCurrentMilestoneIndex(appStatus) {
    let lastCompleted = -1;
    for (let i = 0; i < this.MILESTONES.length; i++) {
      const ms = this.MILESTONES[i];
      if (appStatus[ms.id] === 'completed') {
        lastCompleted = i;
      }
    }
    return lastCompleted;
  },

  render() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    const apps = window.UniDocuments.getApplications();

    if (apps.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 4rem 2rem;">
          <i data-lucide="git-branch" style="width: 52px; height: 52px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem;">No Application Timelines</h3>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
            Start by adding institutions to your applications, then track your progress here.
          </p>
          <button class="btn btn-primary" onclick="App.switchTab('explorer')">
            <i data-lucide="compass" style="width: 16px; height: 16px;"></i> Browse Institutions
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = `<div class="timeline-container">
      ${apps.map(app => {
        const inst = window.UniData.institutions.find(i => i.id === app.institutionId);
        if (!inst) return '';

        const flag = inst.country === 'Australia' ? '🇦🇺' : '🇳🇿';
        const appStatus = this.getAppMilestoneStatus(inst.id);
        const currentIdx = this.getCurrentMilestoneIndex(appStatus);

        return `
          <div class="timeline-app-card">
            <div class="timeline-app-header">
              <div class="timeline-app-name">
                <span style="font-size: 1.2em;">${flag}</span>
                ${inst.name}
              </div>
              <span class="tag tag-cyan">${inst.providerCode}</span>
            </div>

            <div class="timeline-track">
              ${this.MILESTONES.map((ms, idx) => {
                let status = appStatus[ms.id] || 'pending';
                if (idx === currentIdx + 1 && status === 'pending') status = 'current';

                const nodeHtml = `
                  <div class="timeline-node">
                    <div class="timeline-node-icon ${status}" 
                         onclick="UniTimeline.cycleMilestone('${inst.id}', '${ms.id}')"
                         title="Click to toggle status"
                         style="cursor: pointer;">
                      <i data-lucide="${status === 'completed' ? 'check' : ms.icon}" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div class="timeline-node-label">${ms.label}</div>
                  </div>
                `;

                const connectorHtml = idx < this.MILESTONES.length - 1
                  ? `<div class="timeline-connector ${idx <= currentIdx ? 'completed' : ''} ${idx === currentIdx ? 'active' : ''}"></div>`
                  : '';

                return nodeHtml + connectorHtml;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>`;

    if (window.lucide) window.lucide.createIcons();
  },

  cycleMilestone(instId, milestoneId) {
    const statuses = this.getStatuses();
    if (!statuses[instId]) statuses[instId] = {};

    const current = statuses[instId][milestoneId] || 'pending';
    // Cycle: pending → completed → pending
    if (current === 'completed') {
      statuses[instId][milestoneId] = 'pending';
    } else {
      statuses[instId][milestoneId] = 'completed';
    }

    this.saveStatuses(statuses);
    this.render();
  }
};
