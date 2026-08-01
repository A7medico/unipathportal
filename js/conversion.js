/* ==========================================================================
   UNIPATH AUSTRALIA - TECHNICAL ATAR & GRADE CONVERSION ENGINE
   ========================================================================== */

window.UniConversion = {
  // IB Diploma (out of 45) to Estimated ATAR
  ibTable: [
    { ib: 45, atar: 99.95 },
    { ib: 44, atar: 99.70 },
    { ib: 43, atar: 99.40 },
    { ib: 42, atar: 99.10 },
    { ib: 41, atar: 98.40 },
    { ib: 40, atar: 97.70 },
    { ib: 38, atar: 95.80 },
    { ib: 36, atar: 93.00 },
    { ib: 34, atar: 89.25 },
    { ib: 32, atar: 85.00 },
    { ib: 30, atar: 80.00 },
    { ib: 28, me: 74.00, atar: 74.00 },
    { ib: 26, atar: 68.00 },
    { ib: 24, atar: 62.00 }
  ],

  // Convert US GPA (4.0 scale) to Estimated ATAR
  gpaToAtar(gpa) {
    if (gpa >= 3.95) return 99.0;
    if (gpa >= 3.8) return 95.0;
    if (gpa >= 3.6) return 88.0;
    if (gpa >= 3.4) return 82.0;
    if (gpa >= 3.2) return 75.0;
    if (gpa >= 3.0) return 68.0;
    return Math.max(Math.round(gpa * 20), 50);
  },

  // Convert IB Points to Estimated ATAR
  ibToAtar(ibPoints) {
    const match = this.ibTable.find(item => ibPoints >= item.ib);
    return match ? match.atar : 60.0;
  },

  // Convert UK A-Levels (Best 3 A2 subjects: A*=6, A=5, B=4, C=3, D=2, E=1)
  aLevelsToAtar(scoreSum) {
    if (scoreSum >= 18) return 99.5; // A*A*A*
    if (scoreSum >= 16) return 97.0; // A*AA
    if (scoreSum >= 15) return 93.0; // AAA
    if (scoreSum >= 13) return 86.0; // AAB
    if (scoreSum >= 12) return 80.0; // ABB
    if (scoreSum >= 10) return 72.0; // BBB
    return 65.0;
  },

  // Indian CBSE/ISC Percentage to ATAR
  cbseToAtar(percentage) {
    if (percentage >= 95) return 98.5;
    if (percentage >= 90) return 93.0;
    if (percentage >= 85) return 86.0;
    if (percentage >= 80) return 78.0;
    if (percentage >= 75) return 70.0;
    return 62.0;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const ibInput = document.getElementById('calc-ib');
    const gpaInput = document.getElementById('calc-gpa');
    const cbseInput = document.getElementById('calc-cbse');

    if (ibInput) {
      ibInput.addEventListener('input', (e) => {
        const ib = parseFloat(e.target.value) || 0;
        const res = this.ibToAtar(ib);
        const out = document.getElementById('out-ib-atar');
        if (out) out.textContent = res.toFixed(2);
      });
    }

    if (gpaInput) {
      gpaInput.addEventListener('input', (e) => {
        const gpa = parseFloat(e.target.value) || 0;
        const res = this.gpaToAtar(gpa);
        const out = document.getElementById('out-gpa-atar');
        if (out) out.textContent = res.toFixed(2);
      });
    }

    if (cbseInput) {
      cbseInput.addEventListener('input', (e) => {
        const cbse = parseFloat(e.target.value) || 0;
        const res = this.cbseToAtar(cbse);
        const out = document.getElementById('out-cbse-atar');
        if (out) out.textContent = res.toFixed(2);
      });
    }
  }
};
