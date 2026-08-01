/* ==========================================================================
   UNIPATH - APPLICATION KANBAN TRACKER & CHECKLIST PIPELINE
   ========================================================================== */

window.UniTracker = {
  STORAGE_KEY: 'unipath_tracked_applications',

  // Kanban Columns
  stages: [
    { id: 'wishlist', title: 'Wishlist / Considering', icon: 'bookmark' },
    { id: 'preparing', title: 'Preparing Documents', icon: 'file-edit' },
    { id: 'submitted', title: 'Application Submitted', icon: 'send' },
    { id: 'interview', title: 'Interview / Under Review', icon: 'users' },
    { id: 'decision', title: 'Decision Received', icon: 'award' }
  ],

  trackedApps: [],

  init() {
    this.loadState();
    this.render();
  },

  loadState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        this.trackedApps = JSON.parse(saved);
      } catch (e) {
        this.trackedApps = this.getDefaultSampleState();
      }
    } else {
      this.trackedApps = this.getDefaultSampleState();
      this.saveState();
    }
  },

  getDefaultSampleState() {
    return [
      {
        uniId: 'mit',
        stage: 'preparing',
        addedAt: '2026-08-01',
        deadline: '2027-01-01',
        tasks: [
          { text: 'Common App Essay', done: true },
          { text: 'SAT Official Score Report Sent', done: true },
          { text: 'Letter of Recommendation #1 (Math)', done: false },
          { text: 'Letter of Recommendation #2 (English)', done: false },
          { text: 'Financial Profile Submitted', done: false }
        ]
      },
      {
        uniId: 'stanford',
        stage: 'wishlist',
        addedAt: '2026-08-01',
        deadline: '2027-01-05',
        tasks: [
          { text: 'Stanford Short Prompts draft', done: false },
          { text: 'Transcript Request', done: false }
        ]
      },
      {
        uniId: 'eth',
        stage: 'submitted',
        addedAt: '2026-07-20',
        deadline: '2026-12-15',
        tasks: [
          { text: 'Application Form', done: true },
          { text: 'Proof of English', done: true },
          { text: 'CV / Resume', done: true }
        ]
      }
    ];
  },

  saveState() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.trackedApps));
    if (window.App) window.App.updateDashboardStats();
  },

  addUniversity(uniId) {
    if (this.trackedApps.some(app => app.uniId === uniId)) {
      window.App.showToast("This university is already in your application tracker!");
      return;
    }

    const uni = window.UniData.universities.find(u => u.id === uniId);
    if (!uni) return;

    this.trackedApps.push({
      uniId: uni.id,
      stage: 'wishlist',
      addedAt: new Date().toISOString().split('T')[0],
      deadline: uni.fallDeadline || '2027-01-15',
      tasks: uni.requirements.map(r => ({ text: r, done: false }))
    });

    this.saveState();
    this.render();
    window.App.showToast(`Added ${uni.shortName} to your Wishlist stage!`);
  },

  moveStage(uniId, newStage) {
    const app = this.trackedApps.find(a => a.uniId === uniId);
    if (app) {
      app.stage = newStage;
      this.saveState();
      this.render();
      window.App.showToast(`Updated application stage to: ${newStage.toUpperCase()}`);
    }
  },

  toggleTask(uniId, taskIndex) {
    const app = this.trackedApps.find(a => a.uniId === uniId);
    if (app && app.tasks[taskIndex] !== undefined) {
      app.tasks[taskIndex].done = !app.tasks[taskIndex].done;
      this.saveState();
      this.render();
    }
  },

  removeApplication(uniId) {
    this.trackedApps = this.trackedApps.filter(a => a.uniId !== uniId);
    this.saveState();
    this.render();
    window.App.showToast("Application removed from tracker.");
  },

  render() {
    const board = document.getElementById('kanban-board');
    if (!board) return;

    board.innerHTML = this.stages.map(stage => {
      const appsInStage = this.trackedApps.filter(a => a.stage === stage.id);
      return `
        <div class="kanban-column" id="col-${stage.id}">
          <div class="column-header">
            <span class="column-title">
              <i data-lucide="${stage.icon}" style="width: 16px; height: 16px; color: var(--accent-primary);"></i>
              ${stage.title}
            </span>
            <span class="column-count">${appsInStage.length}</span>
          </div>

          <div class="kanban-cards-container">
            ${appsInStage.map(app => this.renderKanbanCard(app)).join('')}
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  renderKanbanCard(app) {
    const uni = window.UniData.universities.find(u => u.id === app.uniId);
    if (!uni) return '';

    const completedTasks = app.tasks.filter(t => t.done).length;
    const totalTasks = app.tasks.length;
    const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Calculate remaining days to deadline
    let daysLeft = 'N/A';
    let isUrgent = false;
    if (app.deadline) {
      const deadlineDate = new Date(app.deadline);
      const now = new Date();
      const diffTime = deadlineDate - now;
      daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (daysLeft > 0 && daysLeft <= 30) isUrgent = true;
    }

    return `
      <div class="kanban-item">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
          <div class="kanban-item-title">${uni.shortName}</div>
          <button class="btn btn-secondary btn-sm" onclick="UniTracker.removeApplication('${uni.id}')" title="Remove" style="padding: 0.2rem 0.4rem;">
            <i data-lucide="x" style="width: 12px; height: 12px;"></i>
          </button>
        </div>

        <div class="kanban-item-subtitle">${uni.city}, ${uni.country}</div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.775rem;">
          <span class="deadline-badge ${isUrgent ? 'deadline-urgent' : ''}">
            <i data-lucide="clock" style="width: 12px; height: 12px;"></i>
            ${daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
          </span>
          <span style="color: var(--text-secondary); font-weight: 600;">${progressPct}% Done</span>
        </div>

        <div class="kanban-progress-bar">
          <div class="kanban-progress-fill" style="width: ${progressPct}%;"></div>
        </div>

        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.725rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Move Stage</label>
          <select class="form-control" style="padding: 0.3rem 0.5rem; font-size: 0.8rem; margin-top: 0.25rem;" onchange="UniTracker.moveStage('${uni.id}', this.value)">
            ${this.stages.map(s => `
              <option value="${s.id}" ${s.id === app.stage ? 'selected' : ''}>${s.title}</option>
            `).join('')}
          </select>
        </div>

        <div class="kanban-checklist">
          ${app.tasks.slice(0, 4).map((task, idx) => `
            <label class="checklist-item ${task.done ? 'done' : ''}">
              <input type="checkbox" ${task.done ? 'checked' : ''} onchange="UniTracker.toggleTask('${uni.id}', ${idx})" />
              <span>${task.text}</span>
            </label>
          `).join('')}
          ${app.tasks.length > 4 ? `<div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 0.25rem;">+ ${app.tasks.length - 4} more requirements</div>` : ''}
        </div>
      </div>
    `;
  }
};
