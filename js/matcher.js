/* ==========================================================================
   UNIPATH - AUSTRALIA & NZ ATAR & ADMISSION ELIGIBILITY CALCULATOR
   Fixed: Uses correct data properties (tuitionLocal, isElite, etc.)
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

    // Include all universities (AU + NZ), not just AU
    const allUnis = window.UniData.institutions.filter(i => i.type === 'university');
    const categorized = {
      safety: [],
      target: [],
      reach: []
    };

    allUnis.forEach(uni => {
      // Budget check - convert NZD to AUD for comparison (approx 0.92 rate)
      const tuitionAud = uni.tuitionCurrency === 'NZD' ? Math.round(uni.tuitionLocal * 0.92) : uni.tuitionLocal;
      if (tuitionAud > maxBudgetAud) return;

      // Skip if no ATAR equivalent (language schools already filtered)
      if (!uni.atarEquivalent) return;

      // ATAR & English qualification check
      let atarDiff = atar - uni.atarEquivalent;
      let ieltsDiff = ielts - uni.minIelts;

      let score = 50;
      if (atarDiff >= 5) score += 25;
      else if (atarDiff >= 0) score += 10;
      else if (atarDiff < -5) score -= 30;

      if (ieltsDiff >= 0.5 || pte >= (uni.minPte || 50) + 5) score += 15;
      else if (ieltsDiff < 0) score -= 25;

      // Elite university competitive adjustment
      if (uni.isElite) score -= 10;

      if (score >= 65) {
        categorized.safety.push({ ...uni, matchScore: Math.min(score + 10, 99), tuitionAud });
      } else if (score >= 45) {
        categorized.target.push({ ...uni, matchScore: score, tuitionAud });
      } else {
        categorized.reach.push({ ...uni, matchScore: Math.max(score, 20), tuitionAud });
      }
    });

    resultsContainer.innerHTML = `
      <div style="margin-bottom: 2rem; background: var(--bg-card); border: 1px solid var(--border-active); border-radius: var(--radius-md); padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 0.25rem; font-family: var(--font-heading);">AU & NZ Admission Match Results</h3>
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
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-amber); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-heading);">
            <i data-lucide="sparkles" style="width: 20px; height: 20px;"></i> Competitive Stretch Universities
          </h4>
          <div class="card-grid">
            ${categorized.reach.length ? categorized.reach.map(u => this.renderMatchCard(u, 'reach')).join('') : '<p style="color: var(--text-muted); font-size: 0.9rem;">No reach schools categorized.</p>'}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    window.App.showToast("Admission compatibility calculated!");
  },

  renderMatchCard(uni, category) {
    const badgeClass = category === 'safety' ? 'tag-emerald' : (category === 'target' ? 'tag-cyan' : 'tag-gold');
    const flag = uni.country === 'Australia' ? '🇦🇺' : '🇳🇿';
    const isTracked = window.UniDocuments.getApplications().some(a => a.institutionId === uni.id);

    return `
      <div class="glass-card uni-card">
        <div class="uni-title-row">
          <span class="uni-name">${flag} ${uni.shortName}</span>
          <span class="tag ${badgeClass}">${category.toUpperCase()} • ${uni.matchScore}%</span>
        </div>
        <div class="uni-location" style="margin-bottom: 0.75rem;">
          <i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--accent-cyan);"></i> ${uni.city}
          ${uni.isElite && uni.eliteGroup ? `<span class="tag tag-purple" style="margin-left: auto;">${uni.eliteGroup}</span>` : ''}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; padding: 0 1.35rem;">
          Min ATAR: <strong>${uni.atarEquivalent}+</strong> | Tuition: <strong>${uni.tuitionCurrency} $${(uni.tuitionLocal/1000).toFixed(1)}k/yr</strong> | IELTS: <strong>${uni.minIelts}</strong>
        </div>
        <div class="uni-footer">
          <button class="btn ${isTracked ? 'btn-secondary' : 'btn-primary'} btn-sm" 
                  onclick="UniExplorer.applyViaUnipath('${uni.id}')"
                  ${isTracked ? 'disabled style="opacity: 0.6;"' : ''}
                  style="width: 100%;">
            <i data-lucide="${isTracked ? 'check' : 'plus'}" style="width: 14px; height: 14px;"></i>
            ${isTracked ? 'Already Added' : 'Apply via UniPath'}
          </button>
        </div>
      </div>
    `;
  }
};
