/* ==========================================================================
   UNIPATH AUSTRALIA - SUBCLASS 485 POST-STUDY WORK VISA & WORK RIGHTS CALCULATOR
   ========================================================================== */

window.UniVisa = {
  init() {
    this.bindEvents();
    this.calculatePswv();
  },

  bindEvents() {
    const degreeSelect = document.getElementById('visa-degree');
    const regionSelect = document.getElementById('visa-location');

    if (degreeSelect) degreeSelect.addEventListener('change', () => this.calculatePswv());
    if (regionSelect) regionSelect.addEventListener('change', () => this.calculatePswv());
  },

  calculatePswv() {
    const degree = document.getElementById('visa-degree')?.value || 'bachelor';
    const location = document.getElementById('visa-location')?.value || 'metro';

    let baseYears = 2;
    if (degree === 'master') baseYears = 3;
    if (degree === 'phd') baseYears = 4;

    let bonusYears = 0;
    if (location === 'regional-cat2') bonusYears = 1; // Adelaide, Perth, Gold Coast, Sunshine Coast, Canberra
    if (location === 'regional-cat3') bonusYears = 2; // Regional centres (Newcastle, Wollongong, Geelong, Townsville)

    const totalDuration = baseYears + bonusYears;

    const outYears = document.getElementById('out-pswv-years');
    const outDesc = document.getElementById('out-pswv-desc');

    if (outYears) outYears.textContent = `${totalDuration} Years Full Work Rights`;
    if (outDesc) {
      outDesc.textContent = `Base Duration: ${baseYears} Years (${degree.toUpperCase()}) + ${bonusYears} Year(s) Regional Australia Bonus (${location.toUpperCase()}). Allows full-time employment anywhere in Australia under Subclass 485 Temporary Graduate Visa.`;
    }
  }
};
