/**
 * GQ Store — Script Client Public
 * Interactions Mobile First, Filtres, Tiroirs, Galerie, Panier & WhatsApp
 */

// Helper de formatage monétaire FCFA côté client
function formatFCFA(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '0 FCFA';
  const num = Math.round(Number(amount));
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F') + ' FCFA';
}

// Module Gestion du Panier (localStorage)
const GQCart = {
  STORAGE_KEY: 'gq_cart',

  getItems() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Erreur lecture panier :', e);
      return [];
    }
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: { items } }));
    } catch (e) {
      console.error('Erreur sauvegarde panier :', e);
    }
  },

  addItem(product, qty = 1) {
    const items = this.getItems();
    const quantityToAdd = Math.max(1, parseInt(qty, 10) || 1);
    const existingIndex = items.findIndex((i) => i.id === product.id);

    if (existingIndex > -1) {
      const currentQty = items[existingIndex].quantity;
      const maxStock = product.stock || items[existingIndex].stock || 999;
      items[existingIndex].quantity = Math.min(currentQty + quantityToAdd, maxStock);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        reference: product.reference || '',
        price: parseInt(product.price, 10) || 0,
        photo: product.photo || '',
        stock: product.stock !== undefined ? parseInt(product.stock, 10) : 99,
        quantity: quantityToAdd
      });
    }

    this.saveItems(items);
    this.showToast(`« ${product.name} » ajouté au panier !`, '/panier', 'Voir le panier');
  },

  updateQuantity(productId, qty) {
    let items = this.getItems();
    const newQty = parseInt(qty, 10);

    if (newQty <= 0) {
      items = items.filter((i) => i.id !== productId);
    } else {
      const item = items.find((i) => i.id === productId);
      if (item) {
        const maxStock = item.stock || 999;
        item.quantity = Math.min(newQty, maxStock);
      }
    }

    this.saveItems(items);
  },

  removeItem(productId) {
    let items = this.getItems();
    items = items.filter((i) => i.id !== productId);
    this.saveItems(items);
  },

  clearCart() {
    this.saveItems([]);
  },

  getCount() {
    const items = this.getItems();
    return items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  },

  getTotal() {
    const items = this.getItems();
    return items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  },

  showToast(message, linkUrl, linkText) {
    let toast = document.getElementById('cartToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cartToast';
      toast.className = 'cart-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <span>${message}</span>
      ${linkUrl ? `<a href="${linkUrl}" class="cart-toast-link">${linkText || 'Consulter'} &rarr;</a>` : ''}
    `;

    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
};

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialiser les icônes Lucide
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // 2. Mettre à jour le badge du panier dans le header
  const updateCartBadges = () => {
    const count = GQCart.getCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach((badge) => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.add('has-items');
      } else {
        badge.classList.remove('has-items');
      }
      badge.style.display = 'inline-flex';
    });
  };

  updateCartBadges();
  window.addEventListener('cart:updated', updateCartBadges);

  // 3. Menu Navigation Mobile
  const mobileNavBtn = document.getElementById('mobileNavBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const closeMobileNav = document.getElementById('closeMobileNav');

  if (mobileNavBtn && mobileNavDrawer) {
    const toggleMobileNav = (open) => {
      if (open) {
        mobileNavDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileNavDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    mobileNavBtn.addEventListener('click', () => toggleMobileNav(true));
    if (closeMobileNav) {
      closeMobileNav.addEventListener('click', () => toggleMobileNav(false));
    }
    mobileNavDrawer.addEventListener('click', (e) => {
      if (e.target === mobileNavDrawer) {
        toggleMobileNav(false);
      }
    });
  }

  // 4. Tiroir de Filtres Mobile (Catalogue)
  const openFiltersBtn = document.getElementById('openFiltersBtn');
  const filterDrawer = document.getElementById('filterDrawer');
  const closeFiltersBtn = document.getElementById('closeFiltersBtn');

  if (openFiltersBtn && filterDrawer) {
    const toggleFilterDrawer = (open) => {
      if (open) {
        filterDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        filterDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    openFiltersBtn.addEventListener('click', () => toggleFilterDrawer(true));
    if (closeFiltersBtn) {
      closeFiltersBtn.addEventListener('click', () => toggleFilterDrawer(false));
    }
    filterDrawer.addEventListener('click', (e) => {
      if (e.target === filterDrawer) {
        toggleFilterDrawer(false);
      }
    });
  }

  // 5. Tri Catalogue (Auto-submit)
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort', sortSelect.value);
      url.searchParams.set('page', '1');
      window.location.href = url.toString();
    });
  }

  // 6. Galerie Interactive Fiche Produit
  const mainImage = document.getElementById('galleryMainImage');
  const thumbButtons = document.querySelectorAll('.gallery-thumb-btn');

  if (mainImage && thumbButtons.length > 0) {
    thumbButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const fullUrl = btn.getAttribute('data-full-img');
        if (fullUrl) {
          mainImage.src = fullUrl;
          thumbButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });
  }

  // 7. Boutons « Ajouter au panier » sur les cartes et fiches
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-action="add-to-cart"]');
    if (!addBtn) return;

    e.preventDefault();

    // Vérifier si produit en rupture
    const stock = parseInt(addBtn.getAttribute('data-product-stock'), 10);
    if (stock <= 0) {
      GQCart.showToast('Ce produit est en rupture de stock.');
      return;
    }

    // Récupérer la quantité (sélecteur fiche produit si présent, sinon 1)
    let qty = 1;
    const qtyInput = document.getElementById('productDetailQty');
    if (qtyInput) {
      qty = parseInt(qtyInput.value, 10) || 1;
    }

    const product = {
      id: addBtn.getAttribute('data-product-id'),
      name: addBtn.getAttribute('data-product-name'),
      slug: addBtn.getAttribute('data-product-slug'),
      reference: addBtn.getAttribute('data-product-ref') || '',
      price: parseInt(addBtn.getAttribute('data-product-price'), 10) || 0,
      photo: addBtn.getAttribute('data-product-photo') || '',
      stock: stock
    };

    GQCart.addItem(product, qty);
  });

  // 8. Bouton direct « Commander sur WhatsApp » depuis la fiche produit
  const directWhatsAppBtn = document.getElementById('btnDirectWhatsApp');
  if (directWhatsAppBtn) {
    directWhatsAppBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const whatsappNumber = directWhatsAppBtn.getAttribute('data-whatsapp-number') || '22998471366';
      const name = directWhatsAppBtn.getAttribute('data-product-name') || '';
      const ref = directWhatsAppBtn.getAttribute('data-product-ref') || '';
      const price = parseInt(directWhatsAppBtn.getAttribute('data-product-price'), 10) || 0;
      
      let qty = 1;
      const qtyInput = document.getElementById('productDetailQty');
      if (qtyInput) {
        qty = parseInt(qtyInput.value, 10) || 1;
      }

      const total = price * qty;
      const productUrl = window.location.href;

      let msg = `Bonjour GQ Store, je souhaite commander ce produit vu sur votre catalogue :\n\n`;
      msg += `• Produit : ${name}\n`;
      if (ref) msg += `• Référence : ${ref}\n`;
      msg += `• Quantité : ${qty}\n`;
      msg += `• Prix unitaire : ${formatFCFA(price)}\n`;
      msg += `• Total estimé : ${formatFCFA(total)}\n`;
      msg += `• Fiche : ${productUrl}\n\n`;
      msg += `Pouvez-vous me confirmer la disponibilité et les modalités de livraison ? Merci !`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 9. Gestion de la Page Panier (/panier)
  const cartPageContainer = document.getElementById('cartPageContainer');
  if (cartPageContainer) {
    const renderCartPage = () => {
      const items = GQCart.getItems();
      const whatsappNumber = cartPageContainer.getAttribute('data-whatsapp-number') || '22998471366';

      if (items.length === 0) {
        cartPageContainer.innerHTML = `
          <div class="empty-cart-card">
            <div class="empty-cart-icon">
              <i data-lucide="shopping-bag" style="width: 32px; height: 32px;"></i>
            </div>
            <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">Votre panier est vide</h2>
            <p style="font-size: 14px; color: var(--text-secondary); max-width: 440px; margin: 0 auto 24px; line-height: 1.6;">
              Découvrez notre matériel informatique certifié, ordinateurs portables professionnels et accessoires de qualité.
            </p>
            <a href="/catalogue" class="btn btn-primary">
              <i data-lucide="grid"></i>
              <span>Explorer le catalogue</span>
            </a>
          </div>
        `;
        if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
        return;
      }

      const totalIndicatif = GQCart.getTotal();
      const totalCount = GQCart.getCount();

      let itemsHtml = '';
      items.forEach((item) => {
        const lineTotal = (item.price || 0) * (item.quantity || 1);
        itemsHtml += `
          <div class="cart-item-card" data-item-id="${item.id}">
            <div class="cart-item-img-box">
              ${item.photo ? `<img src="${item.photo}" alt="${item.name}">` : `<i data-lucide="image" style="width: 28px; height: 28px; color: var(--text-muted);"></i>`}
            </div>
            <div class="cart-item-details">
              <a href="/produits/${item.slug}" class="cart-item-title">${item.name}</a>
              ${item.reference ? `<div class="cart-item-ref">Réf : ${item.reference}</div>` : ''}
              <div class="cart-item-unit-price">${formatFCFA(item.price)}</div>
            </div>
            <div class="cart-qty-wrapper">
              <button type="button" class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Diminuer">-</button>
              <input type="number" class="qty-input" value="${item.quantity}" min="1" max="${item.stock || 99}" data-id="${item.id}" readonly>
              <button type="button" class="qty-btn btn-qty-plus" data-id="${item.id}" ${item.quantity >= (item.stock || 99) ? 'disabled' : ''} aria-label="Augmenter">+</button>
            </div>
            <div class="cart-item-actions">
              <div class="cart-item-total">${formatFCFA(lineTotal)}</div>
              <button type="button" class="btn-remove-item" data-id="${item.id}" title="Supprimer cet article" aria-label="Supprimer">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
              </button>
            </div>
          </div>
        `;
      });

      cartPageContainer.innerHTML = `
        <div class="cart-layout">
          <!-- Liste des Articles -->
          <div class="cart-items-list">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <h2 style="font-size: 18px; font-weight: 700;">Articles sélectionnés (${totalCount})</h2>
              <button type="button" id="btnClearCart" style="background: none; border: none; font-size: 13px; color: var(--text-muted); cursor: pointer; text-decoration: underline;">
                Vider le panier
              </button>
            </div>
            ${itemsHtml}
          </div>

          <!-- Résumé de Commande -->
          <aside class="cart-summary-card">
            <h3 class="cart-summary-title">Récapitulatif de commande</h3>
            
            <div class="summary-row">
              <span>Nombre d'articles</span>
              <strong>${totalCount}</strong>
            </div>

            <div class="summary-row">
              <span>Règlement</span>
              <span style="color: var(--text-primary); font-weight: 600;">Sur WhatsApp</span>
            </div>

            <div class="summary-total-row">
              <span class="summary-total-label">Total indicatif</span>
              <span class="summary-total-value">${formatFCFA(totalIndicatif)}</span>
            </div>

            <button type="button" id="btnWhatsAppOrder" class="btn btn-whatsapp btn-block" style="font-size: 15px; padding: 14px 20px;">
              <svg class="whatsapp-button-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Commander sur WhatsApp</span>
            </button>

            <div class="cart-summary-note">
              Le paiement et la livraison s'organisent directement avec un conseiller GQ Store dans la conversation WhatsApp.
            </div>
          </aside>
        </div>
      `;

      if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();

      // Événements modification quantité
      cartPageContainer.querySelectorAll('.btn-qty-minus').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const item = items.find((i) => i.id === id);
          if (item) {
            GQCart.updateQuantity(id, item.quantity - 1);
          }
        });
      });

      cartPageContainer.querySelectorAll('.btn-qty-plus').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const item = items.find((i) => i.id === id);
          if (item) {
            GQCart.updateQuantity(id, item.quantity + 1);
          }
        });
      });

      // Événement suppression
      cartPageContainer.querySelectorAll('.btn-remove-item').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          GQCart.removeItem(id);
        });
      });

      // Événement vider le panier
      const clearBtn = document.getElementById('btnClearCart');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (confirm('Souhaitez-vous vraiment vider l’intégralité de votre panier ?')) {
            GQCart.clearCart();
          }
        });
      }

      // Événement Commander sur WhatsApp
      const whatsappOrderBtn = document.getElementById('btnWhatsAppOrder');
      if (whatsappOrderBtn) {
        whatsappOrderBtn.addEventListener('click', () => {
          let message = `Bonjour GQ Store, je souhaite commander les articles suivants depuis votre catalogue en ligne :\n\n`;
          items.forEach((item, index) => {
            const lineTotal = (item.price || 0) * (item.quantity || 1);
            message += `${index + 1}. ${item.name}`;
            if (item.reference) message += ` (Réf : ${item.reference})`;
            message += `\n   Quantité : ${item.quantity} x ${formatFCFA(item.price)} = ${formatFCFA(lineTotal)}\n\n`;
          });
          message += `Total indicatif : ${formatFCFA(totalIndicatif)}\n\n`;
          message += `Pouvez-vous me confirmer la disponibilité et les modalités de livraison à Cotonou/Calavi ? Merci !`;

          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        });
      }
    };

    renderCartPage();
    window.addEventListener('cart:updated', renderCartPage);
  }
});
