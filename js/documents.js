/* ==========================================================================
   UNIPATH — DOCUMENT UPLOAD, INDEXEDDB STORAGE & ZIP EXPORT ENGINE
   Handles file storage in IndexedDB, drag-drop uploads, and ZIP packaging
   ========================================================================== */

window.UniDocuments = {
  DB_NAME: 'unipath_documents',
  DB_VERSION: 1,
  STORE_NAME: 'files',
  APPS_KEY: 'unipath_applications',
  STUDENT_KEY: 'unipath_student_profile',
  MAX_FILE_SIZE: 15 * 1024 * 1024, // 15MB per file
  db: null,

  // ── Initialize IndexedDB ──
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'key' });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve();
      };

      request.onerror = (e) => {
        console.error('IndexedDB error:', e);
        reject(e);
      };
    });
  },

  // ── Student Profile Management ──
  getStudentProfile() {
    try {
      return JSON.parse(localStorage.getItem(this.STUDENT_KEY)) || {
        name: '', email: '', phone: '', nationality: '', notes: ''
      };
    } catch { return { name: '', email: '', phone: '', nationality: '', notes: '' }; }
  },

  saveStudentProfile(profile) {
    localStorage.setItem(this.STUDENT_KEY, JSON.stringify(profile));
  },

  // ── Application List Management (localStorage) ──
  getApplications() {
    try {
      return JSON.parse(localStorage.getItem(this.APPS_KEY)) || [];
    } catch { return []; }
  },

  saveApplications(apps) {
    localStorage.setItem(this.APPS_KEY, JSON.stringify(apps));
  },

  addApplication(institutionId) {
    const apps = this.getApplications();
    if (apps.some(a => a.institutionId === institutionId)) {
      App.showToast('This institution is already in your applications!');
      return false;
    }

    const inst = window.UniData.institutions.find(i => i.id === institutionId);
    if (!inst) return false;

    apps.push({
      institutionId: inst.id,
      addedAt: new Date().toISOString(),
      documents: inst.requiredDocuments.map(doc => ({
        docId: doc.id,
        label: doc.label,
        required: doc.required,
        uploaded: false,
        fileName: null,
        fileSize: null,
        uploadedAt: null
      }))
    });

    this.saveApplications(apps);
    App.showToast(`Added ${inst.shortName} to your applications!`);
    return true;
  },

  removeApplication(institutionId) {
    let apps = this.getApplications();
    // Also remove stored files from IndexedDB
    const app = apps.find(a => a.institutionId === institutionId);
    if (app) {
      app.documents.forEach(doc => {
        if (doc.uploaded) {
          this.deleteFile(`${institutionId}_${doc.docId}`);
        }
      });
    }
    apps = apps.filter(a => a.institutionId !== institutionId);
    this.saveApplications(apps);
    App.showToast('Application removed.');
  },

  // ── IndexedDB File Operations ──
  async storeFile(key, fileData) {
    return new Promise((resolve, reject) => {
      if (!this.db) { reject('DB not initialized'); return; }
      const tx = this.db.transaction(this.STORE_NAME, 'readwrite');
      const store = tx.objectStore(this.STORE_NAME);
      store.put({ key, ...fileData });
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e);
    });
  },

  async getFile(key) {
    return new Promise((resolve, reject) => {
      if (!this.db) { reject('DB not initialized'); return; }
      const tx = this.db.transaction(this.STORE_NAME, 'readonly');
      const store = tx.objectStore(this.STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = (e) => reject(e);
    });
  },

  async deleteFile(key) {
    return new Promise((resolve, reject) => {
      if (!this.db) { reject('DB not initialized'); return; }
      const tx = this.db.transaction(this.STORE_NAME, 'readwrite');
      const store = tx.objectStore(this.STORE_NAME);
      store.delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e);
    });
  },

  async getAllFiles() {
    return new Promise((resolve, reject) => {
      if (!this.db) { reject('DB not initialized'); return; }
      const tx = this.db.transaction(this.STORE_NAME, 'readonly');
      const store = tx.objectStore(this.STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = (e) => reject(e);
    });
  },

  // ── File Upload Handler ──
  async handleFileUpload(institutionId, docId, file) {
    // Validate file size
    if (file.size > this.MAX_FILE_SIZE) {
      App.showToast(`File too large! Maximum ${this.MAX_FILE_SIZE / (1024*1024)}MB allowed.`);
      return false;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      App.showToast('Only PDF, JPG, PNG, and WebP files are accepted.');
      return false;
    }

    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileKey = `${institutionId}_${docId}`;

    await this.storeFile(fileKey, {
      data: arrayBuffer,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString()
    });

    // Update application metadata
    const apps = this.getApplications();
    const app = apps.find(a => a.institutionId === institutionId);
    if (app) {
      const doc = app.documents.find(d => d.docId === docId);
      if (doc) {
        doc.uploaded = true;
        doc.fileName = file.name;
        doc.fileSize = file.size;
        doc.uploadedAt = new Date().toISOString();
      }
      this.saveApplications(apps);
    }

    App.showToast(`Uploaded: ${file.name}`);
    return true;
  },

  async removeUploadedFile(institutionId, docId) {
    const fileKey = `${institutionId}_${docId}`;
    await this.deleteFile(fileKey);

    const apps = this.getApplications();
    const app = apps.find(a => a.institutionId === institutionId);
    if (app) {
      const doc = app.documents.find(d => d.docId === docId);
      if (doc) {
        doc.uploaded = false;
        doc.fileName = null;
        doc.fileSize = null;
        doc.uploadedAt = null;
      }
      this.saveApplications(apps);
    }

    App.showToast('File removed.');
  },

  // ── Drag & Drop Setup ──
  setupDropZone(element, institutionId, docId) {
    element.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      element.classList.add('dropzone-active');
    });

    element.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      element.classList.remove('dropzone-active');
    });

    element.addEventListener('drop', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      element.classList.remove('dropzone-active');

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const success = await this.handleFileUpload(institutionId, docId, files[0]);
        if (success && window.UniApplications) {
          window.UniApplications.render();
        }
      }
    });
  },

  // ── File Size Formatter ──
  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  },

  // ── ZIP Export (uses JSZip loaded from CDN) ──
  async exportSingleApplication(institutionId) {
    if (typeof JSZip === 'undefined') {
      App.showToast('Loading ZIP library...');
      await this.loadJSZip();
    }

    const inst = window.UniData.institutions.find(i => i.id === institutionId);
    const apps = this.getApplications();
    const app = apps.find(a => a.institutionId === institutionId);
    if (!inst || !app) return;

    const zip = new JSZip();
    const folderName = `${inst.shortName}_Application`;
    const folder = zip.folder(folderName);

    // Add student profile
    const profile = this.getStudentProfile();
    const summary = {
      student: profile,
      institution: {
        name: inst.name,
        country: inst.country,
        city: inst.city,
        providerCode: inst.providerCode,
        program: inst.programs.join(', ')
      },
      documents: app.documents.map(d => ({
        requirement: d.label,
        required: d.required,
        status: d.uploaded ? 'UPLOADED' : 'MISSING',
        fileName: d.fileName
      })),
      exportedAt: new Date().toISOString()
    };

    folder.file('application_summary.json', JSON.stringify(summary, null, 2));
    folder.file('application_summary.txt', this.generateTextSummary(summary, inst));

    // Add uploaded files
    for (const doc of app.documents) {
      if (doc.uploaded) {
        const fileKey = `${institutionId}_${doc.docId}`;
        const fileData = await this.getFile(fileKey);
        if (fileData && fileData.data) {
          folder.file(doc.fileName, fileData.data);
        }
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    this.downloadBlob(blob, `${folderName}.zip`);
    App.showToast(`Exported ${inst.shortName} application package!`);
  },

  async exportAllApplications() {
    if (typeof JSZip === 'undefined') {
      App.showToast('Loading ZIP library...');
      await this.loadJSZip();
    }

    const apps = this.getApplications();
    if (apps.length === 0) {
      App.showToast('No applications to export.');
      return;
    }

    const zip = new JSZip();
    const profile = this.getStudentProfile();

    zip.file('student_profile.json', JSON.stringify(profile, null, 2));

    for (const app of apps) {
      const inst = window.UniData.institutions.find(i => i.id === app.institutionId);
      if (!inst) continue;

      const folderName = `${inst.shortName}_${inst.country}`;
      const folder = zip.folder(folderName);

      const summary = {
        institution: inst.name,
        country: inst.country,
        documents: app.documents.map(d => ({
          requirement: d.label,
          status: d.uploaded ? 'UPLOADED' : 'MISSING',
          fileName: d.fileName
        }))
      };

      folder.file('summary.json', JSON.stringify(summary, null, 2));
      folder.file('summary.txt', this.generateTextSummary({ student: profile, institution: { name: inst.name, country: inst.country, city: inst.city, providerCode: inst.providerCode, program: inst.programs.join(', ') }, documents: summary.documents }, inst));

      for (const doc of app.documents) {
        if (doc.uploaded) {
          const fileKey = `${app.institutionId}_${doc.docId}`;
          const fileData = await this.getFile(fileKey);
          if (fileData && fileData.data) {
            folder.file(doc.fileName, fileData.data);
          }
        }
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const studentName = profile.name || 'Student';
    this.downloadBlob(blob, `UniPath_${studentName.replace(/\s+/g, '_')}_AllApplications.zip`);
    App.showToast('Exported all application packages!');
  },

  generateTextSummary(summary, inst) {
    let text = `═══════════════════════════════════════\n`;
    text += `  UNIPATH APPLICATION PACKAGE\n`;
    text += `═══════════════════════════════════════\n\n`;

    if (summary.student) {
      text += `STUDENT INFORMATION\n`;
      text += `───────────────────\n`;
      text += `Name: ${summary.student.name || 'N/A'}\n`;
      text += `Email: ${summary.student.email || 'N/A'}\n`;
      text += `Phone: ${summary.student.phone || 'N/A'}\n`;
      text += `Nationality: ${summary.student.nationality || 'N/A'}\n\n`;
    }

    text += `INSTITUTION\n`;
    text += `───────────\n`;
    text += `${inst.name}\n`;
    text += `${inst.city}, ${inst.country}\n`;
    text += `Provider: ${inst.providerCode}\n`;
    text += `Programs: ${inst.programs.join(', ')}\n\n`;

    text += `DOCUMENTS\n`;
    text += `─────────\n`;
    summary.documents.forEach((d, i) => {
      const icon = d.status === 'UPLOADED' ? '✅' : '❌';
      text += `${i + 1}. ${icon} ${d.requirement}\n`;
      if (d.fileName) text += `   File: ${d.fileName}\n`;
    });

    text += `\n───────────────────\n`;
    text += `Exported: ${new Date().toLocaleString()}\n`;
    text += `Generated by UniPath Portal\n`;
    return text;
  },

  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  loadJSZip() {
    return new Promise((resolve, reject) => {
      if (typeof JSZip !== 'undefined') { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject('Failed to load JSZip');
      document.head.appendChild(script);
    });
  }
};
