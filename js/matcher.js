/* ==========================================================================
   UNIPATH - AUSTRALIA ATAR & ADMISSION ELIGIBILITY CALCULATOR
   ========================================================================== */

window.UniMatcher = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const form = document.getElementById('matcher-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.calculateMatches();
      });
    }
  },

  calculateMatches() {
    const atar = parseFloat(document.getElementById('match-atar').value) || 80;
    const gpa = parseFloat(document.getElementById('match-gpa').value) || 3.5;
    const ielts = parseFloat(document.getElementById('match-ielts').value) || 6.5;
    const pte = parseInt(document.getElementById('match-pte').value, 10) || 58;
    const maxBudgetAud = parseInt(document.getElementById('match-budget-aud').value, 10) || 50000;

    const resultsContainer = document.getElementById('matcher-results');
    if (!resultsContainer) return;

    const allUnis = window.UniData.universities;
    const categorized = {
      safety: [],
      target: [],
      reach: []
    };

    allUnis.forEach(uni => {
      // Budget check in AUD
      if (uni.tuitionAud > maxBudgetAud) return;

      // ATAR & English qualification check
      let atarDiff = atar - uni.atarEquivalent;
      let ieltsDiff = ielts - uni.minIelts;

      let score = 50;
      if (atarDiff >= 5) score += 25;
      else if (atarDiff >= 0) score += 10;
      else if (atarDiff < -5) score -= 30;

      if (ieltsDiff >= 0.5 || pte >= uni.minPte + 5) score += 15;
      else if (ieltsDiff < 0) score -= 25;

      if (uni.isGo8) score -= 10; // Go8 competitive adjustment

      if (score >= 65) {
        categorized.safety.push({ ...uni, matchScore: Math.min(score + 10, 99) });
      } else if (score >= 45) {
        categorized.target.push({ ...uni, matchScore: score });
      } else {
        categorized.reach.push({ ...uni, matchScore: Math.max(score, 20) });
      }
    });

    resultsContainer.innerHTML = `
      <div style="margin-bottom: 2rem; background: var(--bg-card); border: 1px solid var(--border-active); border-radius: var(--radius-md); padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(16px);">
        <div>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 0.25rem; font-family: var(--font-heading);">Australian Admission Match Results</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">Evaluated for ATAR: <strong style="color: var(--accent-cyan);">${atar}</strong> • IELTS: <strong>${ielts}</strong> / PTE: <strong>${pte}</strong> • Max Budget: <strong>AUD $${maxBudgetAud.toLocaleString()}/yr</strong></p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <span class="tag tag-emerald" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Safety (${categorized.safety.length})</span>
          <span class="tag tag-cyan" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Target (${categorized.target.length})</span>
          <span class="tag tag-gold" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Reach (${categorized.reach.length})</span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Safety Schools -->
        <div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-emerald); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-heading);">
            <i data-lucide="shield-check" style="width: 20px; height: 20px;"></i> High Odds Match (Safety Tier)
          </h4>
          <div class="card-grid">
            ${categorized.safety.length ? categorized.safety.map(u => this.renderMatchCard(u, 'safety')).join('') : '<p style="color: var(--text-muted); font-size: 0.9rem;">No safety schools found under current ATAR/budget settings.</p>'}
          </div>
        </div>

        <!-- Target Schools -->
        <div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-cyan); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-heading);">
            <i data-lucide="target" style="width: 20px; height: 20px;"></i> Ideal Target Universities
          </h4>
          <div class="card-grid">
            ${categorized.target.length ? categorized.target.map(u => this.renderMatchCard(u, 'target')).join('') : '<p style="color: var(--text-muted); font-size: 0.9rem;">No target schools found under current parameters.</p>'}
          </div>
        </div>

        <!-- Reach Schools -->
        <div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-heading);">
            <i data-lucide="sparkles" style="width: 20px; height: 20px;"></i> Competitive Stretch Universities (Go8 Tiers)
          </h4>
          <div class="card-grid">
            ${categorized.reach.length ? categorized.reach.map(u => this.renderMatchCard(u, 'reach')).join('') : '<p style="color: var(--text-muted); font-size: 0.9rem;">No reach schools categorized.</p>'}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    window.App.showToast("Australian ATAR compatibility calculated!");
  },

  renderMatchCard(uni, category) {
    const badgeClass = category === 'safety' ? 'tag-emerald' : (category === 'target' ? 'tag-cyan' : 'tag-gold');
    return `
      <div class="glass-card uni-card">
        <div class="uni-title-row">
          <span class="uni-name">${uni.shortName}</span>
          <span class="tag ${badgeClass}">${category.toUpperCase()} • ${uni.matchScore}%</span>
        </div>
        <div class="uni-location" style="margin-bottom: 0.75rem;">
          <i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--accent-cyan);"></i> ${uni.city}
          ${uni.isGo8 ? '<span class="tag tag-purple" style="margin-left: auto;">Go8</span>' : ''}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Min ATAR: <strong>${uni.atarEquivalent}+</strong> | Tuition: <strong>AUD $${(uni.tuitionAud/1000).toFixed(1)}k/yr</strong> | IELTS: <strong>${uni.minIelts}</strong>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="UniTracker.addUniversity('${uni.id}')" style="margin-top: auto; width: 100%;">
          <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Add to Australian Tracker
        </button>
      </div>
    `;
  }
};
