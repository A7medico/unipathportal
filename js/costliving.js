/* ==========================================================================
   UNIPATH — COST OF LIVING COMPARISON DASHBOARD
   Interactive city-by-city comparison with animated bar charts
   ========================================================================== */

window.UniCostLiving = {
  // Monthly costs in local currency (AUD for AU, NZD for NZ)
  cities: [
    { id: 'sydney', name: 'Sydney', country: 'Australia', flag: '🇦🇺', currency: 'AUD',
      rent: 1400, food: 550, transport: 200, entertain: 250 },
    { id: 'melbourne', name: 'Melbourne', country: 'Australia', flag: '🇦🇺', currency: 'AUD',
      rent: 1200, food: 500, transport: 180, entertain: 220 },
    { id: 'brisbane', name: 'Brisbane', country: 'Australia', flag: '🇦🇺', currency: 'AUD',
      rent: 1050, food: 480, transport: 170, entertain: 200 },
    { id: 'perth', name: 'Perth', country: 'Australia', flag: '🇦🇺', currency: 'AUD',
      rent: 1100, food: 490, transport: 160, entertain: 190 },
    { id: 'adelaide', name: 'Adelaide', country: 'Australia', flag: '🇦🇺', currency: 'AUD',
      rent: 950, food: 450, transport: 150, entertain: 180 },
    { id: 'canberra', name: 'Canberra', country: 'Australia', flag: '🇦🇺', currency: 'AUD',
      rent: 1150, food: 500, transport: 140, entertain: 190 },
    { id: 'auckland', name: 'Auckland', country: 'New Zealand', flag: '🇳🇿', currency: 'NZD',
      rent: 1300, food: 520, transport: 190, entertain: 210 },
    { id: 'wellington', name: 'Wellington', country: 'New Zealand', flag: '🇳🇿', currency: 'NZD',
      rent: 1150, food: 500, transport: 170, entertain: 195 },
    { id: 'christchurch', name: 'Christchurch', country: 'New Zealand', flag: '🇳🇿', currency: 'NZD',
      rent: 950, food: 460, transport: 140, entertain: 170 },
    { id: 'dunedin', name: 'Dunedin', country: 'New Zealand', flag: '🇳🇿', currency: 'NZD',
      rent: 800, food: 420, transport: 120, entertain: 150 }
  ],

  init() {
    this.render();
  },

  getTotal(city) {
    return city.rent + city.food + city.transport + city.entertain;
  },

  getMaxCost() {
    return Math.max(...this.cities.map(c => this.getTotal(c)));
  },

  render() {
    const container = document.getElementById('col-container');
    if (!container) return;

    const maxTotal = this.getMaxCost();
    const maxRent = Math.max(...this.cities.map(c => c.rent));
    const maxFood = Math.max(...this.cities.map(c => c.food));
    const maxTransport = Math.max(...this.cities.map(c => c.transport));
    const maxEntertain = Math.max(...this.cities.map(c => c.entertain));

    container.innerHTML = `
      <div class="col-compare-grid">
        ${this.cities.map((city, idx) => {
          const total = this.getTotal(city);
          return `
            <div class="col-city-card scroll-reveal scroll-reveal-delay-${idx % 4}" data-city-id="${city.id}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                  <div class="col-city-name">${city.flag} ${city.name}</div>
                  <div class="col-city-country">${city.country} · ${city.currency}</div>
                </div>
                <span class="tag ${city.country === 'Australia' ? 'tag-cyan' : 'tag-emerald'}">${city.currency}</span>
              </div>

              <div class="col-bar-row">
                <span class="col-bar-label">🏠 Rent</span>
                <div class="col-bar-track">
                  <div class="col-bar-fill rent" data-width="${(city.rent / maxRent * 100).toFixed(0)}%"></div>
                </div>
                <span class="col-bar-value">$${city.rent.toLocaleString()}</span>
              </div>

              <div class="col-bar-row">
                <span class="col-bar-label">🍽 Food</span>
                <div class="col-bar-track">
                  <div class="col-bar-fill food" data-width="${(city.food / maxFood * 100).toFixed(0)}%"></div>
                </div>
                <span class="col-bar-value">$${city.food.toLocaleString()}</span>
              </div>

              <div class="col-bar-row">
                <span class="col-bar-label">🚌 Transport</span>
                <div class="col-bar-track">
                  <div class="col-bar-fill transport" data-width="${(city.transport / maxTransport * 100).toFixed(0)}%"></div>
                </div>
                <span class="col-bar-value">$${city.transport.toLocaleString()}</span>
              </div>

              <div class="col-bar-row">
                <span class="col-bar-label">🎭 Fun</span>
                <div class="col-bar-track">
                  <div class="col-bar-fill entertain" data-width="${(city.entertain / maxEntertain * 100).toFixed(0)}%"></div>
                </div>
                <span class="col-bar-value">$${city.entertain.toLocaleString()}</span>
              </div>

              <div class="col-total">
                <span class="col-total-label">Monthly Total</span>
                <span class="col-total-value">${city.currency} $${total.toLocaleString()}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Animate bars after a short delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll('.col-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }, 200);
    });

    // Trigger scroll reveals
    if (window.App && window.App.observeScrollReveals) {
      window.App.observeScrollReveals();
    }
  }
};
