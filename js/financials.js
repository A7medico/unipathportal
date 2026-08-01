/* ==========================================================================
   UNIPATH AUSTRALIA - SUBCLASS 500 FINANCIAL & VISA PROOF ENGINE
   ========================================================================== */

window.UniFinancials = {
  DHA_STANDARD_LIVING: 29710, // Department of Home Affairs 12-month living benchmark
  DHA_SPOUSE_LIVING: 10394,
  DHA_CHILD_LIVING: 4449,
  DHA_CHILD_SCHOOLING: 13502,
  TRAVEL_ALLOWANCE: 2000,

  init() {
    this.bindEvents();
    this.calculate();
  },

  bindEvents() {
    const inputs = ['fin-tuition', 'fin-spouse', 'fin-children', 'fin-oshc-type'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.calculate());
      if (el) el.addEventListener('change', () => this.calculate());
    });
  },

  calculate() {
    const tuition = parseFloat(document.getElementById('fin-tuition')?.value) || 45000;
    const includeSpouse = document.getElementById('fin-spouse')?.checked || false;
    const numChildren = parseInt(document.getElementById('fin-children')?.value, 10) || 0;
    const oshcType = document.getElementById('fin-oshc-type')?.value || 'single';

    let livingCost = this.DHA_STANDARD_LIVING;
    if (includeSpouse) livingCost += this.DHA_SPOUSE_LIVING;
    if (numChildren > 0) {
      livingCost += numChildren * this.DHA_CHILD_LIVING;
      livingCost += numChildren * this.DHA_CHILD_SCHOOLING;
    }

    let oshcCost = 650;
    if (oshcType === 'couple') oshcCost = 2800;
    if (oshcType === 'family') oshcCost = 4200;

    const totalRequiredAud = tuition + livingCost + this.TRAVEL_ALLOWANCE + oshcCost;
    const totalRequiredUsd = Math.round(totalRequiredAud * 0.65);

    // Update UI elements
    const totalAudEl = document.getElementById('out-fin-total-aud');
    const totalUsdEl = document.getElementById('out-fin-total-usd');
    const livingEl = document.getElementById('out-fin-living');
    const tuitionEl = document.getElementById('out-fin-tuition');
    const oshcEl = document.getElementById('out-fin-oshc');

    if (totalAudEl) totalAudEl.textContent = `AUD $${totalRequiredAud.toLocaleString()}`;
    if (totalUsdEl) totalUsdEl.textContent = `~ USD $${totalRequiredUsd.toLocaleString()}`;
    if (livingEl) livingEl.textContent = `AUD $${livingCost.toLocaleString()}`;
    if (tuitionEl) tuitionEl.textContent = `AUD $${tuition.toLocaleString()}`;
    if (oshcEl) oshcEl.textContent = `AUD $${oshcCost.toLocaleString()}`;
  }
};
