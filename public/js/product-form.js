document.addEventListener('DOMContentLoaded', () => {
  // 1. Gestion dynamique des Caractéristiques (Specifications)
  const addSpecBtn = document.getElementById('addSpecBtn');
  const specsContainer = document.getElementById('specsContainer');

  if (addSpecBtn && specsContainer) {
    addSpecBtn.addEventListener('click', () => {
      const row = document.createElement('div');
      row.className = 'spec-row';
      row.innerHTML = `
        <input 
          type="text" 
          name="specLabels" 
          class="form-control" 
          placeholder="Libellé (ex: Processeur)" 
          list="specLabelsList" 
          required
        >
        <input 
          type="text" 
          name="specValues" 
          class="form-control" 
          placeholder="Valeur (ex: Intel Core i7)" 
          required
        >
        <button type="button" class="btn btn-danger btn-sm btn-icon remove-spec-btn" title="Supprimer">
          <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
        </button>
      `;

      specsContainer.appendChild(row);
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });

    // Délégation d'événements pour la suppression de ligne
    specsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.remove-spec-btn');
      if (btn) {
        const row = btn.closest('.spec-row');
        if (row) {
          row.remove();
        }
      }
    });
  }

  // 2. Prévisualisation des photos sélectionnées
  const photosInput = document.getElementById('photosInput');
  const photosPreviewContainer = document.getElementById('photosPreviewContainer');

  if (photosInput && photosPreviewContainer) {
    photosInput.addEventListener('change', (e) => {
      photosPreviewContainer.innerHTML = '';
      const files = Array.from(e.target.files);

      if (files.length === 0) return;

      files.forEach((file, index) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const item = document.createElement('div');
          item.className = 'photo-item';
          item.innerHTML = `
            <div class="photo-thumbnail-box">
              <img src="${event.target.result}" alt="Aperçu ${file.name}">
            </div>
            <div class="photo-controls">
              <span style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${file.name}
              </span>
            </div>
          `;
          photosPreviewContainer.appendChild(item);
        };
        reader.readAsDataURL(file);
      });
    });
  }
});
