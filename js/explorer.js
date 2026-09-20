/* ==========================================================================
   UNIPATH — INSTITUTION EXPLORER & DETAIL MODAL
   Supports Australia + New Zealand universities and language schools
   ========================================================================== */

window.UniExplorer = {
  currentFilters: {
    search: '',
    country: 'all',
    type: 'all',
    eliteOnly: false,
    maxTuition: 'all',
    sortBy: 'rank'
  },

  init() {
    this.bindEvents();
    this.render();
  },

  filterByCity(city) {
    const searchInput = document.getElementById('explorer-search');
    if (searchInput) {
      searchInput.value = city;
      this.currentFilters.search = city.toLowerCase();
    }
    // Reset other filters to show all results for this city
    this.currentFilters.country = 'all';
    this.currentFilters.type = 'all';
    this.currentFilters.eliteOnly = false;
    this.currentFilters.maxTuition = 'all';

    const countrySelect = document.getElementById('filter-country');
    const typeSelect = document.getElementById('filter-type');
    const eliteToggle = document.getElementById('filter-elite');
    const tuitionSelect = document.getElementById('filter-tuition');
    if (countrySelect) countrySelect.value = 'all';
    if (typeSelect) typeSelect.value = 'all';
    if (eliteToggle) eliteToggle.checked = false;
    if (tuitionSelect) tuitionSelect.value = 'all';

    this.render();
    // Scroll to results
    const grid = document.getElementById('university-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    App.showToast(`Showing institutions in ${city}`);
  },

  bindEvents() {
    const searchInput = document.getElementById('explorer-search');
    const countrySelect = document.getElementById('filter-country');
    const typeSelect = document.getElementById('filter-type');
    const eliteToggle = document.getElementById('filter-elite');
    const tuitionSelect = document.getElementById('filter-tuition');
    const sortSelect = document.getElementById('filter-sort');

    if (searchInput) searchInput.addEventListener('input', (e) => {
      this.currentFilters.search = e.target.value.toLowerCase().trim();
      this.render();
    });

    if (countrySelect) countrySelect.addEventListener('change', (e) => {
      this.currentFilters.country = e.target.value;
      this.render();
    });

    if (typeSelect) typeSelect.addEventListener('change', (e) => {
      this.currentFilters.type = e.target.value;
      this.render();
    });

    if (eliteToggle) eliteToggle.addEventListener('change', (e) => {
      this.currentFilters.eliteOnly = e.target.checked;
      this.render();
    });

    if (tuitionSelect) tuitionSelect.addEventListener('change', (e) => {
      this.currentFilters.maxTuition = e.target.value;
      this.render();
    });

    if (sortSelect) sortSelect.addEventListener('change', (e) => {
      this.currentFilters.sortBy = e.target.value;
      this.render();
    });
  },

  getFilteredData() {
    let list = [...window.UniData.institutions];

    // Search filter
    if (this.currentFilters.search) {
      const q = this.currentFilters.search;
      list = list.filter(inst =>
        inst.name.toLowerCase().includes(q) ||
        inst.shortName.toLowerCase().includes(q) ||
        inst.city.toLowerCase().includes(q) ||
        (inst.state && inst.state.toLowerCase().includes(q)) ||
        inst.country.toLowerCase().includes(q) ||
        inst.programs.some(p => p.toLowerCase().includes(q))
      );
    }

    // Country filter
    if (this.currentFilters.country !== 'all') {
      list = list.filter(inst => inst.country.toLowerCase() === this.currentFilters.country.toLowerCase());
    }

    // Type filter
    if (this.currentFilters.type !== 'all') {
      list = list.filter(inst => inst.type === this.currentFilters.type);
    }

    // Elite Only filter
    if (this.currentFilters.eliteOnly) {
      list = list.filter(inst => inst.isElite);
    }

    // Tuition ceiling
    if (this.currentFilters.maxTuition !== 'all') {
      const max = parseInt(this.currentFilters.maxTuition, 10);
      list = list.filter(inst => inst.tuitionLocal <= max);
    }

    // Sorting
    list.sort((a, b) => {
      if (this.currentFilters.sortBy === 'rank') {
        // Null ranks (language schools) go to end
        if (a.worldRank === null && b.worldRank === null) return 0;
        if (a.worldRank === null) return 1;
        if (b.worldRank === null) return -1;
        return a.worldRank - b.worldRank;
      }
      if (this.currentFilters.sortBy === 'tuition-low') return a.tuitionLocal - b.tuitionLocal;
      if (this.currentFilters.sortBy === 'tuition-high') return b.tuitionLocal - a.tuitionLocal;
      if (this.currentFilters.sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  },

  render() {
    const grid = document.getElementById('university-grid');
    const countBadge = document.getElementById('uni-results-count');
    if (!grid) return;

    const data = this.getFilteredData();
    const uniCount = data.filter(d => d.type === 'university').length;
    const langCount = data.filter(d => d.type === 'language').length;

    if (countBadge) {
      countBadge.textContent = `${data.length} Institutions (${uniCount} Universities, ${langCount} Language Schools)`;
    }

    if (data.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;" class="glass-card">
          <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">No institutions match your search</h3>
          <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto;">Try adjusting your filters or searching for a different term.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    grid.innerHTML = data.map(inst => {
      const flag = inst.country === 'Australia' ? '🇦🇺' : '🇳🇿';
      const currencySymbol = inst.tuitionCurrency;
      const isLanguage = inst.type === 'language';
      const typeIcon = isLanguage ? 'book-open' : 'graduation-cap';

      // Check if already in applications
      const isTracked = window.UniDocuments.getApplications().some(a => a.institutionId === inst.id);

      const isCompared = window.UniCompare ? window.UniCompare.isSelected(inst.id) : false;
      const isFav = window.UniFavorites ? window.UniFavorites.isFavorite(inst.id) : false;

      // Format tuition cleanly
      const tuitionFormatted = typeof inst.tuitionLocal === 'number'
        ? (inst.tuitionLocal >= 1000 ? (inst.tuitionLocal / 1000).toFixed(1) + 'k' : inst.tuitionLocal)
        : inst.tuitionLocal;

      return `
        <div class="glass-card uni-card">
          <div class="uni-card-header">
            <img src="${inst.image}" alt="${inst.name}" class="uni-card-img" />
            <div class="uni-card-overlay"></div>
            <div class="compare-checkbox ${isCompared ? 'active' : ''}" data-inst-id="${inst.id}" onclick="event.stopPropagation(); UniCompare.toggle('${inst.id}'); UniExplorer.render();" title="Add to comparison">
              ${isCompared ? '<i data-lucide="check" style="width: 14px; height: 14px;"></i>' : ''}
            </div>
            <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); UniFavorites.toggle('${inst.id}'); UniExplorer.render();" title="${isFav ? 'Remove from saved' : 'Save institution'}">
              <i data-lucide="heart" style="width: 16px; height: 16px; ${isFav ? 'fill: currentColor;' : ''}"></i>
            </button>
            ${inst.worldRank ? `<div class="uni-rank-badge">#${inst.worldRank}</div>` : `<div class="uni-rank-badge"><i data-lucide="${typeIcon}" style="width: 11px; height: 11px;"></i> ${isLanguage ? 'Language' : 'University'}</div>`}
            ${inst.isElite && inst.eliteGroup ? `<div class="go8-badge"><i data-lucide="award" style="width: 11px; height: 11px;"></i> ${inst.eliteGroup}</div>` : ''}
          </div>

          <div class="uni-title-row">
            <div class="uni-name">${inst.shortName}</div>
          </div>

          <div class="uni-location">
            <span style="font-size: 1em;">${flag}</span>
            <span>${inst.city}, ${inst.country}</span>
          </div>

          <div style="padding: 0 1.25rem 0.75rem; display: flex; gap: 0.75rem; align-items: baseline; flex-wrap: wrap;">
            <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1rem; color: var(--accent-primary);">${currencySymbol} $${tuitionFormatted}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">${isLanguage ? '/ week' : '/ year'}</span>
            ${!isLanguage && inst.minIelts ? `<span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; margin-left: auto;">IELTS ${inst.minIelts}+</span>` : ''}
            ${isLanguage ? `<span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; margin-left: auto;">${inst.programs.length} programs</span>` : ''}
          </div>

          <div class="uni-tags">
            <span class="tag tag-cyan">${inst.providerCode}</span>
            ${inst.tags.slice(0, 1).map(t => `<span class="tag tag-purple">${t}</span>`).join('')}
          </div>

          <div class="uni-footer">
            <button class="btn btn-secondary btn-sm" onclick="UniExplorer.showModal('${inst.id}')" style="flex: 1;">
              Details
            </button>
            <button class="btn ${isTracked ? 'btn-secondary' : 'btn-primary'} btn-sm" 
                    onclick="UniExplorer.applyViaUnipath('${inst.id}')"
                    ${isTracked ? 'disabled style="opacity: 0.5;"' : ''}>
              <i data-lucide="${isTracked ? 'check' : 'plus'}" style="width: 13px; height: 13px;"></i>
              ${isTracked ? 'Added' : 'Apply'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  applyViaUnipath(institutionId) {
    const added = window.UniDocuments.addApplication(institutionId);
    if (added) {
      this.render(); // Refresh to show "Added" state
    }
  },

  showModal(instId) {
    const inst = window.UniData.institutions.find(i => i.id === instId);
    if (!inst) return;

    const overlay = document.getElementById('uni-modal-overlay');
    const container = document.getElementById('uni-modal-content');
    if (!overlay || !container) return;

    const flag = inst.country === 'Australia' ? '🇦🇺' : '🇳🇿';
    const isLanguage = inst.type === 'language';
    const isTracked = window.UniDocuments.getApplications().some(a => a.institutionId === inst.id);

    container.innerHTML = `
      <button class="modal-close" onclick="UniExplorer.closeModal()">
        <i data-lucide="x" style="width: 18px; height: 18px;"></i>
      </button>

      <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
        <img src="${inst.image}" alt="${inst.name}" style="width: 100px; height: 100px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--border-active);" />
        <div>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
            ${inst.isElite && inst.eliteGroup ? `<span class="tag tag-purple"><i data-lucide="award" style="width: 12px; height: 12px;"></i> ${inst.eliteGroup}</span>` : ''}
            <span class="tag tag-cyan">${inst.providerCode}</span>
            ${inst.worldRank ? `<span class="tag tag-gold">Global Rank #${inst.worldRank}</span>` : ''}
            <span class="tag" style="background: #e0f2fe; color: #0284c7;">${flag} ${inst.country}</span>
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 900; line-height: 1.2; margin-bottom: 0.4rem; color: var(--text-primary);">${inst.name}</h2>
          <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">
            <i data-lucide="map-pin" style="width: 16px; height: 16px; color: var(--accent-cyan);"></i> ${inst.city}${inst.state ? `, ${inst.state}` : ''}, ${inst.country}
          </div>
        </div>
      </div>

      <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">${inst.description}</p>

      <!-- Stats Row -->
      <div class="uni-stats-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 1.5rem; padding: 1rem;">
        ${!isLanguage ? `
          <div class="uni-mini-stat">
            <span class="mini-val" style="color: var(--accent-cyan);">${inst.atarEquivalent || 'N/A'}+</span>
            <span class="mini-lbl">Min ATAR</span>
          </div>
        ` : `
          <div class="uni-mini-stat">
            <span class="mini-val" style="color: var(--accent-cyan);">${inst.minIelts || 'Any'}</span>
            <span class="mini-lbl">Min IELTS</span>
          </div>
        `}
        <div class="uni-mini-stat">
          <span class="mini-val">${inst.tuitionCurrency} $${typeof inst.tuitionLocal === 'number' && inst.tuitionLocal >= 1000 ? inst.tuitionLocal.toLocaleString() : inst.tuitionLocal}</span>
          <span class="mini-lbl">${isLanguage ? 'Per Week' : 'Annual Tuition'}</span>
        </div>
        <div class="uni-mini-stat">
          <span class="mini-val">${inst.minIelts || 'Any'}</span>
          <span class="mini-lbl">IELTS Req.</span>
        </div>
        <div class="uni-mini-stat">
          <span class="mini-val">${inst.acceptanceRate}%</span>
          <span class="mini-lbl">Accept Rate</span>
        </div>
      </div>

      <!-- Intakes & Portal -->
      <div style="background: rgba(255, 183, 3, 0.08); border: 1px solid rgba(255, 183, 3, 0.3); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
        <i data-lucide="calendar" style="width: 28px; height: 28px; color: var(--accent-amber); flex-shrink: 0;"></i>
        <div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--accent-amber);">Intakes & Application Details</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">
            ${inst.intakes.map(i => `• <strong>${i}</strong>`).join('<br/>')}
            ${inst.applicationPortal ? `<br/>• <strong>Portal</strong>: ${inst.applicationPortal.portalName} (${inst.applicationPortal.fee})` : ''}
          </div>
        </div>
      </div>

      <!-- Programs -->
      <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="layers" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i> Available Programs
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.5rem;">
        ${inst.programs.map(p => `<span class="tag tag-purple">${p}</span>`).join('')}
      </div>

      ${!isLanguage && inst.academicRequirements ? `
        <!-- Academic Requirements -->
        <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="graduation-cap" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i> Academic Entry Requirements
        </h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; margin-bottom: 1.5rem; background: var(--bg-card); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div><strong>ATAR:</strong> ${inst.academicRequirements.atar}</div>
          <div><strong>IB Diploma:</strong> ${inst.academicRequirements.ib}</div>
          <div><strong>A-Levels:</strong> ${inst.academicRequirements.aLevels}</div>
          <div><strong>SAT / ACT:</strong> ${inst.academicRequirements.sat}</div>
          <div><strong>CBSE:</strong> ${inst.academicRequirements.cbse}</div>
        </div>
      ` : ''}

      ${inst.englishRequirements ? `
        <!-- English Requirements -->
        <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="languages" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i> English Language Requirements
        </h4>
        <div style="background: var(--bg-card); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem; font-size: 0.9rem; line-height: 1.6;">
          <div>• <strong>IELTS:</strong> ${inst.englishRequirements.ielts}</div>
          <div>• <strong>PTE:</strong> ${inst.englishRequirements.pte}</div>
          <div>• <strong>TOEFL:</strong> ${inst.englishRequirements.toefl}</div>
          <div>• <strong>Cambridge:</strong> ${inst.englishRequirements.cambridge}</div>
          ${inst.englishRequirements.notes ? `<div style="margin-top: 0.5rem; color: var(--accent-amber); font-size: 0.85rem;">* ${inst.englishRequirements.notes}</div>` : ''}
        </div>
      ` : ''}

      <!-- Required Documents -->
      <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="file-check" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i> Required Documents
      </h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.75rem; background: var(--bg-card); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        ${inst.requiredDocuments.map(doc => `
          <li style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem; color: var(--text-secondary);">
            <i data-lucide="${doc.required ? 'check-circle-2' : 'circle'}" style="width: 16px; height: 16px; color: ${doc.required ? 'var(--accent-cyan)' : 'var(--text-muted)'}; flex-shrink: 0; margin-top: 2px;"></i>
            <span>${doc.label} ${!doc.required ? '<em style="color: var(--text-muted);">(Optional)</em>' : ''}</span>
          </li>
        `).join('')}
      </ul>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-secondary" onclick="UniExplorer.closeModal()">Close</button>
        <button class="btn btn-primary" onclick="UniExplorer.applyFromModal('${inst.id}')" ${isTracked ? 'disabled style="opacity: 0.6;"' : ''}>
          <i data-lucide="${isTracked ? 'check-circle-2' : 'folder-plus'}" style="width: 16px; height: 16px;"></i>
          ${isTracked ? 'Already in Applications' : 'Apply via UniPath'}
        </button>
      </div>
    `;

    overlay.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  },

  applyFromModal(institutionId) {
    const added = window.UniDocuments.addApplication(institutionId);
    if (added) {
      this.closeModal();
      this.render();
      App.switchTab('applications');
    }
  },

  closeModal() {
    const overlay = document.getElementById('uni-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }
};
