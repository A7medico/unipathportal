/* ==========================================================================
   UNIPATH — SCHOLARSHIPS FINDER (AU + NZ)
   ========================================================================== */

window.UniScholarships = {
  init() {
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    const input = document.getElementById('scholarship-search');
    const countryFilter = document.getElementById('scholarship-country');

    if (input) input.addEventListener('input', () => this.render());
    if (countryFilter) countryFilter.addEventListener('change', () => this.render());
  },

  render() {
    const container = document.getElementById('scholarships-grid');
    if (!container) return;

    const searchInput = document.getElementById('scholarship-search');
    const countryFilter = document.getElementById('scholarship-country');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const country = countryFilter ? countryFilter.value : 'all';

    let list = window.UniData.scholarships;

    if (country !== 'all') {
      list = list.filter(s => s.country.toLowerCase() === country.toLowerCase());
    }

    if (query) {
      list = list.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.institution.toLowerCase().includes(query) ||
        s.country.toLowerCase().includes(query) ||
        s.type.toLowerCase().includes(query)
      );
    }

    container.innerHTML = list.map(sch => {
      const flag = sch.country === 'Australia' ? '🇦🇺' : '🇳🇿';
      return `
        <div class="glass-card" style="display: flex; flex-direction: column; height: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <span class="tag tag-gold">${sch.type}</span>
            <span class="tag tag-cyan">${flag} ${sch.country}</span>
          </div>

          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">${sch.name}</h3>
          <div style="font-size: 0.88rem; color: var(--accent-indigo); font-weight: 600; margin-bottom: 1rem;">
            <i data-lucide="building-2" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> ${sch.institution}
          </div>

          <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.25rem; flex: 1; line-height: 1.5;">${sch.description}</p>

          <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem; margin-bottom: 1.25rem;">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem;">Coverage</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--accent-emerald);">${sch.coverage}</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
            <div style="font-size: 0.8rem; color: var(--text-secondary);">
              Deadline: <strong style="color: var(--accent-amber);">${sch.deadline}</strong>
            </div>
            <button class="btn btn-primary btn-sm" onclick="App.showToast('Scholarship guidelines noted!')">
              <i data-lucide="bookmark" style="width: 14px; height: 14px;"></i> Save
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }
};
