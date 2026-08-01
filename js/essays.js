/* ==========================================================================
   UNIPATH - ESSAY & SOP HUB
   ========================================================================== */

window.UniEssays = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const textarea = document.getElementById('essay-textarea');
    const targetWordsInput = document.getElementById('essay-target-words');

    if (textarea) {
      textarea.addEventListener('input', () => this.updateWordCount());
    }

    if (targetWordsInput) {
      targetWordsInput.addEventListener('input', () => this.updateWordCount());
    }
  },

  updateWordCount() {
    const textarea = document.getElementById('essay-textarea');
    const wordCountEl = document.getElementById('essay-word-count');
    const charCountEl = document.getElementById('essay-char-count');
    const targetInput = document.getElementById('essay-target-words');
    const progressFill = document.getElementById('essay-progress-fill');

    if (!textarea || !wordCountEl || !charCountEl) return;

    const text = textarea.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = text.length;

    wordCountEl.textContent = words;
    charCountEl.textContent = chars;

    const target = parseInt(targetInput ? targetInput.value : 650, 10) || 650;
    const pct = Math.min(Math.round((words / target) * 100), 100);

    if (progressFill) {
      progressFill.style.width = `${pct}%`;
      if (pct >= 90 && pct <= 100) {
        progressFill.style.background = 'var(--accent-emerald)';
      } else if (pct > 100) {
        progressFill.style.background = 'var(--accent-rose)';
      } else {
        progressFill.style.background = 'var(--accent-gradient)';
      }
    }
  },

  saveDraft() {
    const text = document.getElementById('essay-textarea').value;
    const uniName = document.getElementById('essay-uni-select').value;
    localStorage.setItem(`unipath_essay_${uniName}`, text);
    window.App.showToast(`Saved draft for ${uniName}!`);
  },

  loadDraft() {
    const uniName = document.getElementById('essay-uni-select').value;
    const saved = localStorage.getItem(`unipath_essay_${uniName}`);
    if (saved !== null) {
      document.getElementById('essay-textarea').value = saved;
      this.updateWordCount();
      window.App.showToast(`Loaded saved draft for ${uniName}`);
    } else {
      document.getElementById('essay-textarea').value = '';
      this.updateWordCount();
    }
  }
};
