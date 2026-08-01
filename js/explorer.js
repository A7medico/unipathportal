/* ==========================================================================
   UNIPATH - AUSTRALIA SPECIALIZED EXPLORER & MODAL RENDERER
   ========================================================================== */

window.UniExplorer = {
  currentFilters: {
    search: '',
    state: 'all',
    go8Only: false,
    maxTuitionAud: 'all',
    sortBy: 'rank'
  },

  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    const searchInput = document.getElementById('explorer-search');
    const stateSelect = document.getElementById('filter-state');
    const go8Toggle = document.getElementById('filter-go8');
    const tuitionSelect = document.getElementById('filter-tuition');
    const sortSelect = document.getElementById('filter-sort');

    if (searchInput) searchInput.addEventListener('input', (e) => {
      this.currentFilters.search = e.target.value.toLowerCase().trim();
      this.render();
    });

    if (stateSelect) stateSelect.addEventListener('change', (e) => {
      this.currentFilters.state = e.target.value;
      this.render();
    });

    if (go8Toggle) go8Toggle.addEventListener('change', (e) => {
      this.currentFilters.go8Only = e.target.checked;
      this.render();
    });

    if (tuitionSelect) tuitionSelect.addEventListener('change', (e) => {
      this.currentFilters.maxTuitionAud = e.target.value;
      this.render();
    });

    if (sortSelect) sortSelect.addEventListener('change', (e) => {
      this.currentFilters.sortBy = e.target.value;
      this.render();
    });
  },

  getFilteredData() {
    let list = [...window.UniData.universities];

    // Search filter
    if (this.currentFilters.search) {
      const q = this.currentFilters.search;
      list = list.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.city.toLowerCase().includes(q) ||
        u.state.toLowerCase().includes(q) ||
        u.cricos.toLowerCase().includes(q) ||
        u.programs.some(p => p.toLowerCase().includes(q))
      );
    }

    // State filter
    if (this.currentFilters.state !== 'all') {
      list = list.filter(u => u.state.toLowerCase() === this.currentFilters.state.toLowerCase());
    }

    // Go8 Only filter
    if (this.currentFilters.go8Only) {
      list = list.filter(u => u.isGo8);
    }

    // Tuition ceiling
    if (this.currentFilters.maxTuitionAud !== 'all') {
      const max = parseInt(this.currentFilters.maxTuitionAud, 10);
      list = list.filter(u => u.tuitionAud <= max);
    }

    // Sorting
    list.sort((a, b) => {
      if (this.currentFilters.sortBy === 'rank') return a.worldRank - b.worldRank;
      if (this.currentFilters.sortBy === 'tuition-low') return a.tuitionAud - b.tuitionAud;
      if (this.currentFilters.sortBy === 'tuition-high') return b.tuitionAud - a.tuitionAud;
      if (this.currentFilters.sortBy === 'atar') return b.atarEquivalent - a.atarEquivalent;
      return 0;
    });

    return list;
  },

  render() {
    const grid = document.getElementById('university-grid');
    const countBadge = document.getElementById('uni-results-count');
    if (!grid) return;

    const data = this.getFilteredData();
    if (countBadge) countBadge.textContent = `${data.length} Australian Universities Featured`;

    if (data.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;" class="glass-card">
          <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">No Australian universities match your search criteria</h3>
          <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto;">Try unchecking Go8 filter or resetting state filters.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    grid.innerHTML = data.map(uni => `
      <div class="glass-card uni-card">
        <div class="uni-card-header">
          <img src="${uni.image}" alt="${uni.name}" class="uni-card-img" />
          <div class="uni-card-overlay"></div>
          ${uni.isGo8 ? `<div class="go8-badge"><i data-lucide="award" style="width: 12px; height: 12px;"></i> Group of Eight</div>` : ''}
          <div class="uni-rank-badge">World #${uni.worldRank}</div>
        </div>

        <div class="uni-title-row">
          <div class="uni-name">${uni.shortName}</div>
        </div>

        <div class="uni-location">
          <i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--accent-cyan);"></i>
          <span>${uni.city} • Australia</span>
        </div>

        <div class="uni-stats-grid">
          <div class="uni-mini-stat">
            <span class="mini-val">${uni.atarEquivalent}+</span>
            <span class="mini-lbl">Min ATAR</span>
          </div>
          <div class="uni-mini-stat">
            <span class="mini-val">AUD $${(uni.tuitionAud / 1000).toFixed(1)}k</span>
            <span class="mini-lbl">Tuition/Yr</span>
          </div>
          <div class="uni-mini-stat">
            <span class="mini-val">${uni.minIelts}</span>
            <span class="mini-lbl">IELTS</span>
          </div>
          <div class="uni-mini-stat">
            <span class="mini-val">${uni.minPte}+</span>
            <span class="mini-lbl">PTE</span>
          </div>
        </div>

        <div class="uni-tags">
          <span class="tag tag-cyan">CRICOS: ${uni.cricos}</span>
          <span class="tag tag-gold">Sem 1 & Sem 2 Intake</span>
          ${uni.tags.slice(0, 2).map(t => `<span class="tag tag-purple">${t}</span>`).join('')}
        </div>

        <div class="uni-footer">
          <button class="btn btn-secondary btn-sm" onclick="UniExplorer.showModal('${uni.id}')" style="flex: 1;">
            <i data-lucide="info" style="width: 14px; height: 14px;"></i> Details & Entry
          </button>
          <button class="btn btn-primary btn-sm" onclick="UniTracker.addUniversity('${uni.id}')">
            <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Track
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  showModal(uniId) {
    const uni = window.UniData.universities.find(u => u.id === uniId);
    if (!uni) return;

    const overlay = document.getElementById('uni-modal-overlay');
    const container = document.getElementById('uni-modal-content');
    if (!overlay || !container) return;

    container.innerHTML = `
      <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
        <img src="${uni.image}" alt="${uni.name}" style="width: 120px; height: 120px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--border-active);" />
        <div>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem;">
            ${uni.isGo8 ? '<span class="tag tag-purple" style="font-weight: 800;"><i data-lucide="award" style="width: 12px; height: 12px;"></i> Group of Eight (Go8)</span>' : ''}
            <span class="tag tag-cyan">CRICOS Code: ${uni.cricos}</span>
            <span class="tag tag-gold">Global Rank #${uni.worldRank}</span>
          </div>
          <h2 style="font-size: 1.75rem; font-weight: 900; line-height: 1.2; margin-bottom: 0.4rem; color: var(--text-primary);">${uni.name}</h2>
          <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">
            <i data-lucide="map-pin" style="width: 16px; height: 16px; color: var(--accent-cyan);"></i> ${uni.city}, ${uni.state}, Australia
          </div>
        </div>
      </div>

      <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">${uni.description}</p>

      <div class="uni-stats-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 1.5rem; padding: 1rem;">
        <div class="uni-mini-stat">
          <span class="mini-val" style="color: var(--accent-cyan);">${uni.atarEquivalent}+</span>
          <span class="mini-lbl">Min ATAR Equivalent</span>
        </div>
        <div class="uni-mini-stat">
          <span class="mini-val">AUD $${uni.tuitionAud.toLocaleString()}</span>
          <span class="mini-lbl">Annual Tuition</span>
        </div>
        <div class="uni-mini-stat">
          <span class="mini-val">IELTS ${uni.minIelts}</span>
          <span class="mini-lbl">English Requirement</span>
        </div>
        <div class="uni-mini-stat">
          <span class="mini-val">PTE ${uni.minPte}+</span>
          <span class="mini-lbl">PTE Academic</span>
        </div>
      </div>

      <div style="background: rgba(255, 183, 3, 0.08); border: 1px solid rgba(255, 183, 3, 0.3); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
        <i data-lucide="calendar" style="width: 28px; height: 28px; color: var(--accent-gold); flex-shrink: 0;"></i>
        <div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--accent-gold);">Australian Academic Intakes & Portal Info</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">
            • <strong>Semester 1 (Feb/March Start)</strong>: Deadline <strong>${uni.sem1Deadline}</strong><br/>
            • <strong>Semester 2 (July Start)</strong>: Deadline <strong>${uni.sem2Deadline}</strong><br/>
            ${uni.applicationPortal ? `• <strong>Application Portal</strong>: ${uni.applicationPortal.portalName} (${uni.applicationPortal.fee})` : ''}
          </div>
        </div>
      </div>

      <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="graduation-cap" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i> 1. Academic Entry Qualifications & Minimum Thresholds
      </h4>
      ${uni.academicRequirements ? `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.5rem; background: var(--bg-card); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <div><strong>ATAR / Selection Rank:</strong> ${uni.academicRequirements.atar}</div>
        <div><strong>IB Diploma:</strong> ${uni.academicRequirements.ib}</div>
        <div><strong>GCE A-Levels:</strong> ${uni.academicRequirements.aLevels}</div>
        <div><strong>SAT / ACT & APs:</strong> ${uni.academicRequirements.sat}</div>
        <div><strong>Indian CBSE / ISC:</strong> ${uni.academicRequirements.cbse}</div>
        <div><strong>Chinese Gaokao:</strong> ${uni.academicRequirements.gaokao}</div>
      </div>
      ` : ''}

      <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="languages" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i> 2. English Language Proficiency Requirements
      </h4>
      ${uni.englishRequirements ? `
      <div style="background: var(--bg-card); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem; font-size: 0.9rem; line-height: 1.6;">
        <div>• <strong>IELTS Academic:</strong> ${uni.englishRequirements.ielts}</div>
        <div>• <strong>PTE Academic:</strong> ${uni.englishRequirements.pte}</div>
        <div>• <strong>TOEFL iBT:</strong> ${uni.englishRequirements.toefl}</div>
        <div>• <strong>Cambridge C1/C2:</strong> ${uni.englishRequirements.cambridge}</div>
        ${uni.englishRequirements.notes ? `<div style="margin-top: 0.5rem; color: var(--accent-gold); font-size: 0.85rem; font-style: italic;">* ${uni.englishRequirements.notes}</div>` : ''}
      </div>
      ` : ''}

      <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="book-open" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i> 3. Subject Prerequisites & Special Requirements
      </h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.5rem; background: var(--bg-card); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        ${(uni.coursePrerequisites || []).map(p => `
          <li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
            <i data-lucide="check" style="width: 16px; height: 16px; color: var(--accent-emerald); flex-shrink: 0; margin-top: 2px;"></i>
            <span>${p}</span>
          </li>
        `).join('')}
      </ul>

      <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="file-check" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i> 4. Mandatory Document Checklist & Subclass 500 Visa Requirements
      </h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.75rem; background: var(--bg-card); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        ${(uni.requiredDocuments || uni.requirements).map(req => `
          <li style="display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: var(--text-secondary);">
            <i data-lucide="check-circle-2" style="width: 18px; height: 18px; color: var(--accent-cyan); flex-shrink: 0; margin-top: 2px;"></i>
            <span>${req}</span>
          </li>
        `).join('')}
      </ul>

      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-secondary" onclick="UniExplorer.closeModal()">Close</button>
        <button class="btn btn-primary" onclick="UniTracker.addUniversity('${uni.id}'); UniExplorer.closeModal();">
          <i data-lucide="plus-circle" style="width: 16px; height: 16px;"></i> Add to Application Tracker
        </button>
      </div>
    `;

    overlay.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  },

  closeModal() {
    const overlay = document.getElementById('uni-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }
};
