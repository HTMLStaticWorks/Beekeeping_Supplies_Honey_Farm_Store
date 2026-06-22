document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Shop Interactions
     ========================================================================== */
  
  // Mobile Filter Drawer Toggle
  const filterBtn = document.querySelector('.filter-toggle-btn');
  const filterDrawer = document.querySelector('.shop-sidebar');
  const filterClose = document.querySelector('.filter-close-btn');

  if (filterBtn && filterDrawer) {
    filterBtn.addEventListener('click', () => {
      filterDrawer.classList.add('open');
    });

    if (filterClose) {
      filterClose.addEventListener('click', () => {
        filterDrawer.classList.remove('open');
      });
    }
  }

  // Range Slider values update (Placeholder)
  const priceRange = document.querySelector('#price-range');
  const priceValue = document.querySelector('#price-value');
  
  if (priceRange && priceValue) {
    priceRange.addEventListener('input', (e) => {
      priceValue.textContent = `$${e.target.value}`;
    });
  }

  // Sort dropdown change listener
  const sortSelect = document.querySelector('#sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      // Logic to sort products would go here
      console.log('Sorting by:', e.target.value);
      // We could add a brief loading state to products
      const grid = document.querySelector('.shop-grid');
      if (grid) {
        grid.style.opacity = '0.5';
        setTimeout(() => {
          grid.style.opacity = '1';
        }, 400);
      }
    });
  }

  // Product Quantity Selector (Product Single Page)
  const qtyInput = document.querySelector('.qty-input');
  const qtyMinus = document.querySelector('.qty-btn.minus');
  const qtyPlus = document.querySelector('.qty-btn.plus');

  if (qtyInput) {
    if (qtyMinus) {
      qtyMinus.addEventListener('click', () => {
        let current = parseInt(qtyInput.value) || 1;
        if (current > 1) {
          qtyInput.value = current - 1;
        }
      });
    }
    
    if (qtyPlus) {
      qtyPlus.addEventListener('click', () => {
        let current = parseInt(qtyInput.value) || 1;
        if (current < 99) {
          qtyInput.value = current + 1;
        }
      });
    }

    // Validate integer, min 1, max 99
    qtyInput.addEventListener('change', (e) => {
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 99) val = 99;
      e.target.value = val;
    });
  }

  // Wishlist Toggle
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const icon = btn.querySelector('i');
      if (icon) {
        if (icon.classList.contains('ph-heart')) {
          icon.classList.remove('ph-heart');
          icon.classList.add('ph-heart-fill');
          icon.style.color = 'var(--color-primary)';
        } else {
          icon.classList.remove('ph-heart-fill');
          icon.classList.add('ph-heart');
          icon.style.color = '';
        }
      }
    });
  });
});
