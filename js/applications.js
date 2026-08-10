/* ==========================================================================
   UNIPATH — MY APPLICATIONS VIEW WITH DOCUMENT UPLOAD CARDS
   Replaces old Kanban tracker with document-centric application cards
   ========================================================================== */

window.UniApplications = {
  init() {
    // Nothing extra needed — render is called by App when tab is shown
  },

  render() {
    const container = document.getElementById('applications-container');
    if (!container) return;

    const apps = window.UniDocuments.getApplications();

    if (apps.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 4rem 2rem; grid-column: 1 / -1;">
          <i data-lucide="folder-open" style="width: 52px; height: 52px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem;">No Applications Yet</h3>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
            Browse institutions and click <strong>"Apply via UniPath"</strong> to start collecting documents for your applications.
          </p>
          <button class="btn btn-primary" onclick="App.switchTab('explorer')">
            <i data-lucide="compass" style="width: 16px; height: 16px;"></i> Browse Institutions
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = apps.map(app => {
      const inst = window.UniData.institutions.find(i => i.id === app.institutionId);
      if (!inst) return '';

      const totalDocs = app.documents.length;
      const uploadedDocs = app.documents.filter(d => d.uploaded).length;
      const requiredDocs = app.documents.filter(d => d.required).length;
      const requiredUploaded = app.documents.filter(d => d.required && d.uploaded).length;
      const progressPct = totalDocs > 0 ? Math.round((uploadedDocs / totalDocs) * 100) : 0;
      const requiredPct = requiredDocs > 0 ? Math.round((requiredUploaded / requiredDocs) * 100) : 0;

      const statusColor = requiredPct === 100 ? 'var(--accent-emerald)' : (requiredPct >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)');
      const statusText = requiredPct === 100 ? 'Ready to Submit' : (requiredPct >= 50 ? 'In Progress' : 'Documents Needed');

      const flag = inst.country === 'Australia' ? '🇦🇺' : '🇳🇿';
      const typeIcon = inst.type === 'language' ? 'book-open' : 'graduation-cap';

      return `
        <div class="app-card glass-card">
          <div class="app-card-header">
            <div class="app-card-info">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                <span class="tag tag-cyan">${flag} ${inst.country}</span>
                ${inst.isElite && inst.eliteGroup ? `<span class="tag tag-purple"><i data-lucide="award" style="width: 11px; height: 11px;"></i> ${inst.eliteGroup}</span>` : ''}
                <span class="tag" style="background: ${statusColor}15; color: ${statusColor}; border: 1px solid ${statusColor}30;">${statusText}</span>
              </div>
              <h3 class="app-card-title">
                <i data-lucide="${typeIcon}" style="width: 20px; height: 20px; color: var(--accent-indigo);"></i>
                ${inst.name}
              </h3>
              <div class="app-card-meta">
                <span><i data-lucide="map-pin" style="width: 13px; height: 13px;"></i> ${inst.city}</span>
                <span><i data-lucide="tag" style="width: 13px; height: 13px;"></i> ${inst.providerCode}</span>
                ${inst.worldRank ? `<span><i data-lucide="trophy" style="width: 13px; height: 13px;"></i> World #${inst.worldRank}</span>` : ''}
              </div>
            </div>
            <div class="app-card-actions">
              <button class="btn btn-primary btn-sm" onclick="UniDocuments.exportSingleApplication('${inst.id}')" title="Export as ZIP">
                <i data-lucide="download" style="width: 14px; height: 14px;"></i> Export
              </button>
              <button class="btn btn-secondary btn-sm" onclick="UniApplications.confirmRemove('${inst.id}')" title="Remove application" style="padding: 0.4rem 0.5rem;">
                <i data-lucide="trash-2" style="width: 14px; height: 14px; color: var(--accent-rose);"></i>
              </button>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="app-progress-section">
            <div class="app-progress-labels">
              <span>${uploadedDocs} of ${totalDocs} documents uploaded</span>
              <span style="font-weight: 700; color: ${statusColor};">${progressPct}%</span>
            </div>
            <div class="app-progress-track">
              <div class="app-progress-fill" style="width: ${progressPct}%; background: ${statusColor};"></div>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem;">
              Required: ${requiredUploaded}/${requiredDocs} complete
            </div>
          </div>

          <!-- Document Upload Slots -->
          <div class="app-documents-grid">
            ${app.documents.map(doc => this.renderDocumentSlot(inst.id, doc)).join('')}
          </div>

          <!-- Notes & Checklist -->
          <div class="app-notes-section">
            <button class="app-notes-toggle" onclick="UniApplications.toggleNotes('${inst.id}')">
              <i data-lucide="notebook-pen" style="width: 15px; height: 15px;"></i>
              Notes & Checklist
              <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
            </button>
            <div class="app-notes-content" id="notes-${inst.id}">
              <textarea class="app-notes-textarea" 
                        id="note-text-${inst.id}" 
                        placeholder="Add personal notes about this application..."
                        onchange="UniApplications.saveNote('${inst.id}', this.value)">${this.getNote(inst.id)}</textarea>
              
              <ul class="app-checklist" id="checklist-${inst.id}">
                ${this.renderChecklist(inst.id)}
              </ul>
              <div class="app-checklist-add">
                <input type="text" id="checklist-input-${inst.id}" placeholder="Add checklist item..." 
                       onkeydown="if(event.key==='Enter'){UniApplications.addChecklistItem('${inst.id}');}" />
                <button onclick="UniApplications.addChecklistItem('${inst.id}')">Add</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    // Setup drag-and-drop zones
    requestAnimationFrame(() => {
      document.querySelectorAll('.doc-dropzone').forEach(zone => {
        const instId = zone.dataset.institution;
        const docId = zone.dataset.document;
        window.UniDocuments.setupDropZone(zone, instId, docId);
      });
    });
  },

  renderDocumentSlot(institutionId, doc) {
    if (doc.uploaded) {
      // Uploaded state
      const isPdf = doc.fileName && doc.fileName.toLowerCase().endsWith('.pdf');
      const fileIcon = isPdf ? 'file-text' : 'image';
      const fileSize = window.UniDocuments.formatFileSize(doc.fileSize || 0);

      return `
        <div class="doc-slot doc-slot-uploaded">
          <div class="doc-slot-header">
            <div class="doc-status-icon uploaded">
              <i data-lucide="check-circle-2" style="width: 16px; height: 16px;"></i>
            </div>
            <div class="doc-slot-label">${doc.label}</div>
            ${doc.required ? '<span class="doc-required-badge">Required</span>' : ''}
          </div>
          <div class="doc-file-info">
            <i data-lucide="${fileIcon}" style="width: 16px; height: 16px; color: var(--accent-indigo);"></i>
            <div class="doc-file-details">
              <span class="doc-file-name">${doc.fileName}</span>
              <span class="doc-file-size">${fileSize}</span>
            </div>
            <button class="doc-remove-btn" onclick="UniApplications.removeFile('${institutionId}', '${doc.docId}')" title="Remove file">
              <i data-lucide="x" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>
      `;
    } else {
      // Empty upload state
      return `
        <div class="doc-slot doc-slot-empty doc-dropzone" data-institution="${institutionId}" data-document="${doc.docId}">
          <div class="doc-slot-header">
            <div class="doc-status-icon pending">
              <i data-lucide="${doc.required ? 'alert-circle' : 'circle'}" style="width: 16px; height: 16px;"></i>
            </div>
            <div class="doc-slot-label">${doc.label}</div>
            ${doc.required ? '<span class="doc-required-badge">Required</span>' : '<span class="doc-optional-badge">Optional</span>'}
          </div>
          <div class="doc-upload-zone" onclick="UniApplications.triggerFileInput('${institutionId}', '${doc.docId}')">
            <i data-lucide="upload-cloud" style="width: 24px; height: 24px; color: var(--text-muted);"></i>
            <span>Drag & drop or <strong>click to browse</strong></span>
            <span class="doc-upload-hint">PDF, JPG, PNG — Max 15MB</span>
          </div>
          <input type="file" class="doc-file-input" id="file-${institutionId}-${doc.docId}" 
                 accept=".pdf,.jpg,.jpeg,.png,.webp"
                 onchange="UniApplications.onFileSelected('${institutionId}', '${doc.docId}', this)" 
                 style="display: none;" />
        </div>
      `;
    }
  },

  triggerFileInput(institutionId, docId) {
    const input = document.getElementById(`file-${institutionId}-${docId}`);
    if (input) input.click();
  },

  async onFileSelected(institutionId, docId, input) {
    if (input.files.length > 0) {
      const success = await window.UniDocuments.handleFileUpload(institutionId, docId, input.files[0]);
      if (success) this.render();
    }
  },

  async removeFile(institutionId, docId) {
    await window.UniDocuments.removeUploadedFile(institutionId, docId);
    this.render();
  },

  confirmRemove(institutionId) {
    const inst = window.UniData.institutions.find(i => i.id === institutionId);
    if (confirm(`Remove ${inst ? inst.shortName : 'this institution'} from your applications? All uploaded documents will be deleted.`)) {
      window.UniDocuments.removeApplication(institutionId);
      this.render();
    }
  },

  // ═══════════════ NOTES & CHECKLISTS ═══════════════
  NOTES_KEY: 'unipath_app_notes',
  CHECKLIST_KEY: 'unipath_app_checklists',

  toggleNotes(instId) {
    const content = document.getElementById(`notes-${instId}`);
    if (content) {
      content.classList.toggle('expanded');
    }
  },

  getNote(instId) {
    try {
      const notes = JSON.parse(localStorage.getItem(this.NOTES_KEY)) || {};
      return notes[instId] || '';
    } catch { return ''; }
  },

  saveNote(instId, text) {
    try {
      const notes = JSON.parse(localStorage.getItem(this.NOTES_KEY)) || {};
      notes[instId] = text;
      localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
    } catch {}
  },

  getChecklist(instId) {
    try {
      const checklists = JSON.parse(localStorage.getItem(this.CHECKLIST_KEY)) || {};
      return checklists[instId] || [];
    } catch { return []; }
  },

  saveChecklist(instId, items) {
    try {
      const checklists = JSON.parse(localStorage.getItem(this.CHECKLIST_KEY)) || {};
      checklists[instId] = items;
      localStorage.setItem(this.CHECKLIST_KEY, JSON.stringify(checklists));
    } catch {}
  },

  renderChecklist(instId) {
    const items = this.getChecklist(instId);
    return items.map((item, idx) => `
      <li class="app-checklist-item ${item.checked ? 'checked' : ''}">
        <input type="checkbox" ${item.checked ? 'checked' : ''} 
               onchange="UniApplications.toggleChecklistItem('${instId}', ${idx})" />
        <label>${item.text}</label>
        <button style="background: none; border: none; color: var(--text-muted); cursor: pointer; margin-left: auto; padding: 2px;"
                onclick="UniApplications.removeChecklistItem('${instId}', ${idx})">
          <i data-lucide="x" style="width: 12px; height: 12px;"></i>
        </button>
      </li>
    `).join('');
  },

  addChecklistItem(instId) {
    const input = document.getElementById(`checklist-input-${instId}`);
    if (!input || !input.value.trim()) return;

    const items = this.getChecklist(instId);
    items.push({ text: input.value.trim(), checked: false });
    this.saveChecklist(instId, items);
    input.value = '';

    // Re-render just the checklist
    const list = document.getElementById(`checklist-${instId}`);
    if (list) {
      list.innerHTML = this.renderChecklist(instId);
      if (window.lucide) window.lucide.createIcons();
    }
  },

  toggleChecklistItem(instId, idx) {
    const items = this.getChecklist(instId);
    if (items[idx]) {
      items[idx].checked = !items[idx].checked;
      this.saveChecklist(instId, items);

      const list = document.getElementById(`checklist-${instId}`);
      if (list) {
        list.innerHTML = this.renderChecklist(instId);
        if (window.lucide) window.lucide.createIcons();
      }
    }
  },

  removeChecklistItem(instId, idx) {
    const items = this.getChecklist(instId);
    items.splice(idx, 1);
    this.saveChecklist(instId, items);

    const list = document.getElementById(`checklist-${instId}`);
    if (list) {
      list.innerHTML = this.renderChecklist(instId);
      if (window.lucide) window.lucide.createIcons();
    }
  },

  getCompletionStats() {
    const apps = window.UniDocuments.getApplications();
    const total = apps.length;
    const complete = apps.filter(app => {
      const requiredDocs = app.documents.filter(d => d.required);
      return requiredDocs.every(d => d.uploaded);
    }).length;
    const totalDocs = apps.reduce((sum, a) => sum + a.documents.length, 0);
    const uploadedDocs = apps.reduce((sum, a) => sum + a.documents.filter(d => d.uploaded).length, 0);

    return { total, complete, totalDocs, uploadedDocs };
  }
};
