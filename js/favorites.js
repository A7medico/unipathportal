/* ==========================================================================
   UNIPATH — FAVORITES / BOOKMARKS MODULE
   Save/unsave institutions, persist to localStorage, render favorites view
   ========================================================================== */

window.UniFavorites = {
  STORAGE_KEY: 'unipath_favorites',

  init() {
    // Render the favorites view if it's active
  },

  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  },

  isFavorite(institutionId) {
    return this.getFavorites().includes(institutionId);
  },

  toggle(institutionId) {
    const favs = this.getFavorites();
    const idx = favs.indexOf(institutionId);

    if (idx > -1) {
      favs.splice(idx, 1);
      App.showToast('Removed from saved');
    } else {
      favs.push(institutionId);
      App.showToast('Added to saved ❤️');
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favs));
    return idx === -1; // true if added, false if removed
  },

  render() {
    const container = document.getElementById('favorites-container');
    if (!container) return;

    const favIds = this.getFavorites();

    if (favIds.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 4rem 2rem;">
          <i data-lucide="heart" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">No saved institutions yet</h3>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto; font-size: 0.9rem; margin-bottom: 1.25rem;">
            Click the heart icon on any institution card to bookmark it for quick access.
          </p>
          <button class="btn btn-primary" onclick="App.switchTab('explorer')">
            <i data-lucide="compass" style="width: 16px; height: 16px;"></i> Browse Institutions
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const institutions = favIds
      .map(id => window.UniData.institutions.find(i => i.id === id))
      .filter(Boolean);

    if (institutions.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 3rem 2rem;">
          <p style="color: var(--text-secondary);">No matching institutions found for your saved items.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <span style="font-weight: 700; color: var(--text-secondary); font-size: 0.9rem;">${institutions.length} saved institution${institutions.length !== 1 ? 's' : ''}</span>
        <button class="btn btn-secondary btn-sm" onclick="UniFavorites.clearAll()">
          <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i> Clear All
        </button>
      </div>
      <div class="card-grid">
        ${institutions.map(inst => {
          const flag = inst.country === 'Australia' ? '🇦🇺' : '🇳🇿';
          const isLanguage = inst.type === 'language';
          const isTracked = window.UniDocuments.getApplications().some(a => a.institutionId === inst.id);
          const tuitionFormatted = typeof inst.tuitionLocal === 'number'
            ? (inst.tuitionLocal >= 1000 ? (inst.tuitionLocal / 1000).toFixed(1) + 'k' : inst.tuitionLocal)
            : inst.tuitionLocal;

          return `
            <div class="glass-card uni-card">
              <div class="uni-card-header">
                <img src="${inst.image}" alt="${inst.name}" class="uni-card-img" />
                <div class="uni-card-overlay"></div>
                <button class="favorite-btn active" onclick="event.stopPropagation(); UniFavorites.toggle('${inst.id}'); UniFavorites.render();" title="Remove from saved">
                  <i data-lucide="heart" style="width: 16px; height: 16px; fill: currentColor;"></i>
                </button>
                ${inst.worldRank ? `<div class="uni-rank-badge" style="right: 12px;">#${inst.worldRank}</div>` : ''}
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
                <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1rem; color: var(--accent-primary);">${inst.tuitionCurrency} $${tuitionFormatted}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">${isLanguage ? '/ week' : '/ year'}</span>
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
        }).join('')}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  clearAll() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.render();
    App.showToast('All saved institutions cleared');
    if (window.UniExplorer) window.UniExplorer.render();
  }
};
