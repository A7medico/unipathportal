/* ==========================================================================
   UNIPATH — UNIVERSITY COMPARISON TOOL
   Select up to 3 institutions for side-by-side comparison
   ========================================================================== */

window.UniCompare = {
  selected: [],
  MAX_COMPARE: 3,

  init() {
    this.loadSaved();
    this.updateFab();
  },

  loadSaved() {
    try {
      this.selected = JSON.parse(sessionStorage.getItem('unipath_compare') || '[]');
    } catch { this.selected = []; }
  },

  save() {
    sessionStorage.setItem('unipath_compare', JSON.stringify(this.selected));
  },

  toggle(instId) {
    const idx = this.selected.indexOf(instId);
    if (idx > -1) {
      this.selected.splice(idx, 1);
    } else {
      if (this.selected.length >= this.MAX_COMPARE) {
        App.showToast(`You can compare up to ${this.MAX_COMPARE} institutions at once.`);
        return;
      }
      this.selected.push(instId);
    }
    this.save();
    this.updateFab();
    this.updateCheckboxes();
  },

  isSelected(instId) {
    return this.selected.includes(instId);
  },

  updateFab() {
    const fab = document.getElementById('compare-fab');
    if (!fab) return;

    if (this.selected.length >= 2) {
      fab.classList.add('visible');
      fab.querySelector('.compare-count').textContent = this.selected.length;
    } else {
      fab.classList.remove('visible');
    }
  },

  updateCheckboxes() {
    document.querySelectorAll('.compare-checkbox').forEach(cb => {
      const instId = cb.dataset.instId;
      if (this.isSelected(instId)) {
        cb.classList.add('active');
        cb.innerHTML = '<i data-lucide="check" style="width: 14px; height: 14px;"></i>';
      } else {
        cb.classList.remove('active');
        cb.innerHTML = '';
      }
    });
    if (window.lucide) window.lucide.createIcons();
  },

  openComparison() {
    if (this.selected.length < 2) {
      App.showToast('Select at least 2 institutions to compare.');
      return;
    }

    const institutions = this.selected.map(id =>
      window.UniData.institutions.find(i => i.id === id)
    ).filter(Boolean);

    const overlay = document.getElementById('uni-modal-overlay');
    const container = document.getElementById('uni-modal-content');
    if (!overlay || !container) return;

    const rows = [
      { label: 'Country', get: i => `${i.country === 'Australia' ? '🇦🇺' : '🇳🇿'} ${i.country}` },
      { label: 'City', get: i => i.city },
      { label: 'Type', get: i => i.type === 'university' ? '🏛 University' : '📖 Language School' },
      { label: 'World Rank', get: i => i.worldRank ? `#${i.worldRank}` : 'N/A' },
      { label: 'Elite Group', get: i => i.eliteGroup || '—' },
      { label: 'Acceptance Rate', get: i => `${i.acceptanceRate}%` },
      { label: 'Annual Tuition', get: i => `${i.tuitionCurrency} $${typeof i.tuitionLocal === 'number' && i.tuitionLocal >= 1000 ? i.tuitionLocal.toLocaleString() : i.tuitionLocal}` },
      { label: 'Min ATAR', get: i => i.atarEquivalent ? `${i.atarEquivalent}+` : 'N/A' },
      { label: 'Min GPA', get: i => i.minGpa ? `${i.minGpa}+` : 'N/A' },
      { label: 'IELTS Required', get: i => i.minIelts ? `${i.minIelts}+` : 'Any' },
      { label: 'PTE Required', get: i => i.minPte ? `${i.minPte}+` : 'N/A' },
      { label: 'Intakes', get: i => i.intakes.join(', ') },
      { label: 'Sem 1 Deadline', get: i => i.sem1Deadline || '—' },
      { label: 'Sem 2 Deadline', get: i => i.sem2Deadline || '—' },
      { label: 'Application Fee', get: i => i.applicationPortal ? i.applicationPortal.fee : '—' },
      { label: 'Deposit Required', get: i => i.applicationPortal ? i.applicationPortal.deposit : '—' },
      { label: 'Programs', get: i => i.programs.slice(0, 4).map(p => `<span class="tag tag-purple" style="margin: 2px;">${p}</span>`).join('') },
      { label: 'Provider Code', get: i => i.providerCode },
    ];

    container.innerHTML = `
      <button class="modal-close" onclick="UniExplorer.closeModal()">
        <i data-lucide="x" style="width: 18px; height: 18px;"></i>
      </button>

      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.35rem;">
          <i data-lucide="columns" style="width: 24px; height: 24px; color: var(--accent-indigo); vertical-align: middle;"></i>
          Institution Comparison
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">Side-by-side comparison of ${institutions.length} selected institutions.</p>
      </div>

      <div class="compare-modal-content">
        <table class="compare-table">
          <thead>
            <tr>
              <th style="min-width: 140px;">Attribute</th>
              ${institutions.map(i => `<th class="compare-header-cell">${i.shortName}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                <td style="font-weight: 700; color: var(--text-secondary); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.02em;">${row.label}</td>
                ${institutions.map(i => `<td>${row.get(i)}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
        <button class="btn btn-secondary" onclick="UniCompare.clearAll(); UniExplorer.closeModal();">Clear Selection</button>
        <button class="btn btn-primary" onclick="UniExplorer.closeModal()">Close</button>
      </div>
    `;

    // Make modal wider for comparison
    const modalCard = overlay.querySelector('.modal-card');
    if (modalCard) modalCard.classList.add('modal-wide');

    overlay.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  },

  clearAll() {
    this.selected = [];
    this.save();
    this.updateFab();
    this.updateCheckboxes();
    App.showToast('Comparison cleared.');

    // Remove wide class
    const modalCard = document.querySelector('.modal-card');
    if (modalCard) modalCard.classList.remove('modal-wide');
  }
};
