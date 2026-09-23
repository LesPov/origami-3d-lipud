// src/scripts/modalLogic.ts
import type { Producto } from "../types/producto";

document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.getElementById("product-modal-backdrop");
  const content = document.getElementById("product-modal-content");
  const rightColumn = document.getElementById("modal-right-column");
  const closeBtn = document.getElementById("modal-close");
  
  // Elementos de datos visuales
  const elCategory = document.getElementById("modal-category");
  const elTitle = document.getElementById("modal-title");
  const elDesc = document.getElementById("modal-desc");
  const elPieces = document.getElementById("modal-pieces");
  const elTime = document.getElementById("modal-time");
  const elDifficulty = document.getElementById("modal-difficulty");
  const elDisplayPrice = document.getElementById("modal-display-price");
  
  // Galería e Imagen Principal
  const elMainImg = document.getElementById("modal-main-img") as HTMLImageElement;
  const elImgGlow = document.getElementById("modal-img-glow");
  const elThumbnailsContainer = document.getElementById("modal-thumbnails-container");
  const elGalleryCounter = document.getElementById("modal-gallery-counter");
  const elCounterCurrent = document.getElementById("modal-counter-current");
  const elCounterTotal = document.getElementById("modal-counter-total");
  const elNavArrows = document.getElementById("modal-nav-arrows");
  const btnPrevImg = document.getElementById("modal-prev-img");
  const btnNextImg = document.getElementById("modal-next-img");
  
  // Colores
  const elColorsSection = document.getElementById("modal-colors-section");
  const elColorsBar = document.getElementById("modal-colors-bar");
  const elColorsGrid = document.getElementById("modal-colors-grid");
  const elTotalColors = document.getElementById("modal-total-colors");
  
  // Variantes y Carrito
  const radios = document.querySelectorAll('input[name="modal-variant"]') as NodeListOf<HTMLInputElement>;
  const elRadioBase = document.getElementById("modal-radio-base") as HTMLInputElement;
  const elPriceBaseLabel = document.getElementById("modal-price-base-label");
  const elPriceDiyLabel = document.getElementById("modal-price-diy-label");
  const btnAddCart = document.getElementById("modal-add-cart");

  let currentProduct: Producto | null = null;
  let currentImageIndex = 0;
  let isOpen = false;

  const gsap = (window as any).gsap;

  // Apertura mediante CustomEvent
  document.addEventListener("modal:open", (e: Event) => {
    const customEvent = e as CustomEvent;
    if (!customEvent.detail) return;
    
    currentProduct = customEvent.detail as Producto;
    currentImageIndex = 0;
    renderProductData(currentProduct);
    openModal();
  });

  function setActiveImage(index: number) {
    if (!currentProduct || !currentProduct.imagenes || currentProduct.imagenes.length === 0) return;
    
    const total = currentProduct.imagenes.length;
    currentImageIndex = (index + total) % total;
    const newSrc = currentProduct.imagenes[currentImageIndex];

    if (elMainImg) {
      elMainImg.style.opacity = "0.3";
      setTimeout(() => {
        elMainImg.src = newSrc;
        elMainImg.alt = `${currentProduct?.nombre} - Vista ${currentImageIndex + 1}`;
        elMainImg.style.opacity = "1";
      }, 100);
    }

    if (elCounterCurrent) {
      elCounterCurrent.textContent = (currentImageIndex + 1).toString();
    }

    if (elThumbnailsContainer) {
      const thumbs = Array.from(elThumbnailsContainer.children);
      thumbs.forEach((thumb, idx) => {
        if (idx === currentImageIndex) {
          thumb.classList.remove("border-transparent", "opacity-50");
          thumb.classList.add("border-emerald-500", "opacity-100");
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          thumb.classList.add("border-transparent", "opacity-50");
          thumb.classList.remove("border-emerald-500", "opacity-100");
        }
      });
    }
  }

  function renderProductData(product: Producto) {
    if (!product) return;

    if (elTitle) elTitle.textContent = product.nombre;
    if (elCategory) elCategory.textContent = product.categoria;
    if (elDesc) elDesc.textContent = product.descripcion || "Sin descripción disponible.";
    if (elPieces) elPieces.textContent = product.figuras3D ? `${product.figuras3D}` : "N/A";
    if (elTime) elTime.textContent = product.tiempo || "N/A";
    if (elDifficulty) elDifficulty.textContent = product.dificultad || "N/A";

    if (elRadioBase) {
      elRadioBase.checked = true;
      elRadioBase.value = "Terminada";
    }
    if (elPriceBaseLabel) elPriceBaseLabel.textContent = `$${(product.precioBase || 0).toLocaleString('es-CO')}`;
    if (elPriceDiyLabel) elPriceDiyLabel.textContent = `$${(product.precioDIY || 0).toLocaleString('es-CO')}`;
    updateDisplayPrice(product.precioBase || 0);

    const images = Array.isArray(product.imagenes) && product.imagenes.length > 0 
      ? product.imagenes 
      : ['https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80'];
    
    const imagesCount = images.length;
    
    if (elMainImg) {
      elMainImg.src = images[0];
      elMainImg.alt = `${product.nombre} - Vista principal`;
    }

    if (imagesCount > 1) {
      if (elGalleryCounter && elCounterTotal && elCounterCurrent) {
        elGalleryCounter.classList.remove("hidden");
        elCounterCurrent.textContent = "1";
        elCounterTotal.textContent = imagesCount.toString();
      }
      
      if (elNavArrows) {
        elNavArrows.classList.remove("hidden");
        elNavArrows.classList.add("flex");
      }

      if (elThumbnailsContainer) {
        elThumbnailsContainer.innerHTML = '';
        elThumbnailsContainer.classList.remove("hidden");
        elThumbnailsContainer.classList.add("flex");

        images.forEach((imgUrl, index) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${index === 0 ? "border-emerald-500 opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`;
          btn.setAttribute("aria-label", `Ver vista ${index + 1} de ${product.nombre}`);
          btn.innerHTML = `<img src="${imgUrl}" class="w-full h-full object-cover pointer-events-none" alt="Miniatura ${index + 1}" loading="lazy" />`;
          
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            setActiveImage(index);
          });
          elThumbnailsContainer.appendChild(btn);
        });
      }
    } else {
      if (elGalleryCounter) elGalleryCounter.classList.add("hidden");
      if (elNavArrows) {
        elNavArrows.classList.add("hidden");
        elNavArrows.classList.remove("flex");
      }
      if (elThumbnailsContainer) {
        elThumbnailsContainer.innerHTML = '';
        elThumbnailsContainer.classList.add("hidden");
        elThumbnailsContainer.classList.remove("flex");
      }
    }

    if (elColorsSection && elColorsBar && elColorsGrid && elTotalColors) {
      elColorsBar.innerHTML = '';
      elColorsGrid.innerHTML = '';
      
      if (product.colores && product.colores.length > 0) {
        elColorsSection.style.display = 'flex';
        
        const primaryHex = product.colores[0]?.hex || '#10b981';
        if (elImgGlow) elImgGlow.style.backgroundColor = primaryHex;

        const totalPieces = product.figuras3D > 0 ? product.figuras3D : product.colores.reduce((acc, c) => acc + c.cantidad, 0);
        elTotalColors.textContent = `${product.colores.length} colores`;

        product.colores.forEach(color => {
          const percent = totalPieces > 0 ? (color.cantidad / totalPieces) * 100 : 0;
          const segment = document.createElement("div");
          segment.style.width = `${percent}%`;
          segment.style.backgroundColor = color.hex;
          segment.className = "h-full transition-all duration-300 hover:opacity-80";
          segment.title = `${color.nombre} (${percent.toFixed(1)}%)`;
          elColorsBar.appendChild(segment);

          const pill = document.createElement("div");
          pill.className = "flex items-center gap-1.5 bg-zinc-900 border border-white/10 px-2.5 py-1 rounded-full shadow-xs";
          pill.innerHTML = `
            <span class="w-3 h-3 rounded-full border border-white/20 shadow-inner flex-shrink-0" style="background-color: ${color.hex};"></span>
            <span class="text-[11px] text-zinc-300 font-medium">${color.nombre}</span>
            <span class="text-[10px] text-zinc-500 ml-0.5 font-mono">${color.cantidad}</span>
          `;
          elColorsGrid.appendChild(pill);
        });
      } else {
        elColorsSection.style.display = 'none';
        if (elImgGlow) elImgGlow.style.backgroundColor = '#10b981';
      }
    }
  }

  btnPrevImg?.addEventListener("click", (e) => {
    e.stopPropagation();
    setActiveImage(currentImageIndex - 1);
  });

  btnNextImg?.addEventListener("click", (e) => {
    e.stopPropagation();
    setActiveImage(currentImageIndex + 1);
  });

  function updateDisplayPrice(price: number) {
    if (!elDisplayPrice) return;
    elDisplayPrice.style.opacity = "0";
    setTimeout(() => {
      elDisplayPrice.textContent = `$${price.toLocaleString('es-CO')}`;
      elDisplayPrice.style.opacity = "1";
    }, 120);
  }

  radios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (!currentProduct) return;
      const target = e.target as HTMLInputElement;
      const price = target.value === "DIY" ? currentProduct.precioDIY : currentProduct.precioBase;
      updateDisplayPrice(price);
    });
  });

  btnAddCart?.addEventListener("click", () => {
    if (!currentProduct) return;
    
    const activeRadio = Array.from(radios).find(r => r.checked) as HTMLInputElement;
    const variant = activeRadio ? activeRadio.value : "Terminada";
    const price = variant === "DIY" ? currentProduct.precioDIY : currentProduct.precioBase;

    document.dispatchEvent(new CustomEvent("cart:add", {
      detail: {
        id: currentProduct.id,
        name: currentProduct.nombre,
        variant: variant,
        price: price,
        img: currentProduct.imagenes?.[0] || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'
      }
    }));

    const originalText = btnAddCart.innerHTML;
    btnAddCart.innerHTML = `<span class="relative z-10 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-700"><polyline points="20 6 9 17 4 12"></polyline></svg> ¡Añadido!</span>`;
    btnAddCart.classList.add("bg-emerald-400", "text-black");
    btnAddCart.classList.remove("bg-white");
    
    setTimeout(() => {
      btnAddCart.innerHTML = originalText;
      btnAddCart.classList.remove("bg-emerald-400", "text-black");
      btnAddCart.classList.add("bg-white");
      closeModal();
    }, 850);
  });

  function openModal() {
    if (!backdrop || !content || isOpen) return;
    isOpen = true;
    document.body.style.overflow = "hidden";
    
    if (rightColumn) {
      rightColumn.scrollTop = 0;
    }
    
    backdrop.classList.remove("hidden");
    backdrop.classList.add("flex");
    
    if (gsap) {
      gsap.to(backdrop, { opacity: 1, duration: 0.25, ease: "power2.out" });
      
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        gsap.fromTo(content, 
          { y: "100%", opacity: 1 }, 
          { y: "0%", duration: 0.4, ease: "power3.out" }
        );
      } else {
        gsap.fromTo(content,
          { scale: 0.96, opacity: 0, y: 0 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.1)" }
        );
      }
    } else {
      backdrop.style.opacity = "1";
      content.style.opacity = "1";
      content.style.transform = "scale(1)";
    }
  }

  function closeModal() {
    if (!backdrop || !content || !isOpen) return;
    isOpen = false;
    
    if (gsap) {
      const isMobile = window.innerWidth < 640;
      
      if (isMobile) {
        gsap.to(content, { y: "100%", duration: 0.35, ease: "power3.in" });
      } else {
        gsap.to(content, { opacity: 0, scale: 0.96, duration: 0.25, ease: "power2.in" });
      }
      gsap.to(backdrop, { opacity: 0, duration: 0.25, delay: 0.08, onComplete: resetDOM });
    } else {
      backdrop.style.opacity = "0";
      content.style.opacity = "0";
      setTimeout(resetDOM, 250);
    }
  }

  function resetDOM() {
    backdrop?.classList.add("hidden");
    backdrop?.classList.remove("flex");
    document.body.style.overflow = "";
    currentProduct = null;
    currentImageIndex = 0;
    
    if (content) {
      if (window.innerWidth < 640) {
        gsap?.set(content, { y: "100%" });
      } else {
        gsap?.set(content, { scale: 0.96, y: "0%" });
      }
    }
  }

  closeBtn?.addEventListener("click", closeModal);
  
  backdrop?.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen) return;
    
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      if (currentProduct && currentProduct.imagenes && currentProduct.imagenes.length > 1) {
        setActiveImage(currentImageIndex - 1);
      }
    } else if (e.key === "ArrowRight") {
      if (currentProduct && currentProduct.imagenes && currentProduct.imagenes.length > 1) {
        setActiveImage(currentImageIndex + 1);
      }
    }
  });
});