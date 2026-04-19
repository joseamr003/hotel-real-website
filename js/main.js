/* =============================================================
   HOTEL REAL — Main JavaScript
   ============================================================= */

'use strict';

// ===== 1. NAVIGATION: scroll state =====
(function () {
  const navWrapper = document.querySelector('.nav-wrapper');
  if (!navWrapper) return;

  function updateNavState() {
    if (window.scrollY > 60) {
      navWrapper.classList.add('scrolled');
    } else {
      navWrapper.classList.remove('scrolled');
    }
  }

  // Throttle scroll handler for performance
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateNavState();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateNavState();
})();


// ===== 2. MOBILE MENU TOGGLE =====
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-links');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when any nav link is clicked
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


// ===== 3. SCROLL REVEAL (IntersectionObserver) =====
(function () {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: make all visible immediately
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(function (el) { observer.observe(el); });
})();


// ===== 4. WHATSAPP FORM SUBMISSION =====
(function () {
  const form = document.getElementById('reserva-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nombre    = (form.querySelector('#nombre')    || {}).value || '';
    var correo    = (form.querySelector('#correo')    || {}).value || '';
    var habitacion= (form.querySelector('#habitacion')|| {}).value || '';
    var checkin   = (form.querySelector('#checkin')   || {}).value || '';
    var checkout  = (form.querySelector('#checkout')  || {}).value || '';
    var mensaje   = (form.querySelector('#mensaje')   || {}).value || '';

    // Basic validation
    if (nombre.trim() === '') {
      form.querySelector('#nombre').focus();
      return;
    }
    if (correo.trim() === '') {
      form.querySelector('#correo').focus();
      return;
    }

    var text =
      'Hola, me gustar\u00EDa enviar una consulta.\n\n' +
      '\uD83D\uDC64 Nombre: '                  + nombre     + '\n' +
      '\uD83D\uDCE7 Correo: '                   + correo     + '\n' +
      '\uD83D\uDECF\uFE0F Tipo de Habitaci\u00F3n: ' + habitacion + '\n' +
      '\uD83D\uDCC5 D\u00EDa de Llegada: '      + checkin    + '\n' +
      '\uD83D\uDCC6 D\u00EDa de Salida: '       + checkout   + '\n' +
      '\uD83D\uDCAC Consulta Adicional: '        + mensaje;

    var url = 'https://wa.me/56944929920?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();


// ===== 5. SMOOTH ACTIVE NAV HIGHLIGHT =====
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  function getActiveSection() {
    const scrollPos = window.scrollY + 120;
    let active = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        active = section.id;
      }
    });
    return active;
  }

  function updateActiveLink() {
    const active = getActiveSection();
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace('#', '');
      if (href === active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


// ===== 6. ROOM MODAL =====
(function () {
  var ROOMS = {
    'doble-twin': {
      eyebrow: 'Habitaci\u00F3n 01',
      title: 'Doble Twin',
      desc: 'Dise\u00F1ada para compa\u00F1eros de viaje. Ofrece el equilibrio perfecto entre descanso individual y comodidad compartida, en un ambiente sumamente tranquilo, ideal para recargar energ\u00EDas tras un d\u00EDa recorriendo Linares.',
      beds: '2 Camas Twin (1.5 plazas c/u)',
      capacity: 'M\u00E1x. 2 personas',
      selectValue: 'Doble Twin',
      bgClass: 'rp-twin',
      imgMain: 'images/habitaciones/doble-twin/principal.jpg',
      imgThumbs: [
        'images/habitaciones/doble-twin/miniatura-1.jpg',
        'images/habitaciones/doble-twin/miniatura-2.jpg',
        'images/habitaciones/doble-twin/miniatura-3.jpg',
        'images/habitaciones/doble-twin/miniatura-4.jpg',
        'images/habitaciones/doble-twin/miniatura-5.jpg'
      ]
    },
    'matrimonial-estandar': {
      eyebrow: 'Habitaci\u00F3n 02',
      title: 'Matrimonial Est\u00E1ndar',
      desc: 'Nuestro cl\u00E1sico refugio para parejas. Un espacio \u00EDntimo, c\u00E1lido y lleno de detalles, pensado para ofrecer un descanso reparador con la tradicional hospitalidad que nos caracteriza desde siempre.',
      beds: '1 Cama Matrimonial (2 plazas)',
      capacity: 'M\u00E1x. 2 personas',
      selectValue: 'Matrimonial Est\u00E1ndar',
      bgClass: 'rp-matrimonial',
      imgMain: 'images/habitaciones/matrimonial-estandar/principal.jpg',
      imgThumbs: [
        'images/habitaciones/matrimonial-estandar/miniatura-1.jpg',
        'images/habitaciones/matrimonial-estandar/miniatura-2.jpg',
        'images/habitaciones/matrimonial-estandar/miniatura-3.jpg',
        'images/habitaciones/matrimonial-estandar/miniatura-4.jpg',
        'images/habitaciones/matrimonial-estandar/miniatura-5.jpg',
        'images/habitaciones/matrimonial-estandar/miniatura-6.jpg'
      ]
    },
    'matrimonial-adicional': {
      eyebrow: 'Habitaci\u00F3n 03',
      title: 'Matrimonial + Adicional',
      desc: 'El espacio perfecto para familias peque\u00F1as. Amplitud, versatilidad y el m\u00E1ximo confort reunidos en una habitaci\u00F3n luminosa donde grandes y chicos podr\u00E1n sentirse verdaderamente como en casa.',
      beds: '1 Cama Matrimonial (2 pl) + 1 Cama Adicional (1.5 pl)',
      capacity: 'M\u00E1x. 3 personas',
      selectValue: 'Matrimonial + Adicional',
      bgClass: 'rp-adicional',
      imgMain: 'images/habitaciones/matrimonial-adicional/principal.jpg',
      imgThumbs: [
        'images/habitaciones/matrimonial-adicional/miniatura-1.jpg',
        'images/habitaciones/matrimonial-adicional/miniatura-2.jpg',
        'images/habitaciones/matrimonial-adicional/miniatura-3.jpg',
        'images/habitaciones/matrimonial-adicional/miniatura-4.jpg',
        'images/habitaciones/matrimonial-adicional/miniatura-5.jpg',
        'images/habitaciones/matrimonial-adicional/miniatura-6.jpg'
      ]
    },
    'triple': {
      eyebrow: 'Habitaci\u00F3n 04',
      title: 'Triple',
      desc: 'M\u00E1xima amplitud para grupos. Tres camas independientes en un espacio generoso para que cada hu\u00E9sped disfrute de su propia comodidad sin renunciar a la calidez del Hotel Real.',
      beds: '3 Camas Simples (1.5 plazas c/u)',
      capacity: 'M\u00E1x. 3 personas',
      selectValue: 'Triple',
      bgClass: 'rp-triple',
      imgMain: 'images/habitaciones/triple/principal.jpg',
      imgThumbs: [
        'images/habitaciones/triple/miniatura-1.jpg',
        'images/habitaciones/triple/miniatura-2.jpg',
        'images/habitaciones/triple/miniatura-3.jpg',
        'images/habitaciones/triple/miniatura-4.jpg',
        'images/habitaciones/triple/miniatura-5.jpg'
      ]
    }
  };

  var overlay          = document.getElementById('room-modal');
  if (!overlay) return;

  var btnClose         = overlay.querySelector('.room-modal-close');
  var modalEyebrow     = document.getElementById('modal-eyebrow');
  var modalTitle       = document.getElementById('modal-room-title');
  var modalDesc        = document.getElementById('modal-desc');
  var modalBeds        = document.getElementById('modal-beds');
  var modalCapacity    = document.getElementById('modal-capacity');
  var modalImgMain     = document.getElementById('modal-img-main');
  var thumbsContainer  = document.getElementById('modal-thumbs-container');
  var btnReserve       = document.getElementById('btn-modal-reserve');
  var currentRoom      = null;
  var currentThumbIdx  = 0;

  var allBgClasses = Object.keys(ROOMS).map(function (k) { return ROOMS[k].bgClass; });

  function applyBg(el, bgClass) {
    allBgClasses.forEach(function (cls) { el.classList.remove(cls); });
    el.classList.add(bgClass);
  }

  // Set or clear the <img> inside a container element
  function setImg(el, src, alt) {
    var img = el.querySelector('img');
    if (src) {
      if (!img) {
        img = document.createElement('img');
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
        el.appendChild(img);
      }
      img.src = src;
      img.alt = alt || '';
    } else if (img) {
      img.remove();
    }
  }

  // Switch the main image (called when user clicks a thumbnail)
  function showThumb(index) {
    var thumbBtns = thumbsContainer.querySelectorAll('.modal-thumb');
    thumbBtns.forEach(function (btn, i) {
      btn.classList.toggle('is-active', i === index);
    });
    currentThumbIdx = index;
    if (currentRoom) {
      var src = currentRoom.imgThumbs[index] || null;
      applyBg(modalImgMain, currentRoom.bgClass);
      setImg(modalImgMain, src, currentRoom.title + ' - vista ' + (index + 1));
    }
  }

  // Build thumbnail strip dynamically from room.imgThumbs array
  function buildThumbs(room) {
    thumbsContainer.innerHTML = '';
    (room.imgThumbs || []).forEach(function (src, i) {
      var btn = document.createElement('button');
      btn.className = 'modal-thumb' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('aria-label', 'Ver imagen ' + (i + 1));
      btn.setAttribute('data-index', i);

      var inner = document.createElement('div');
      inner.className = 'modal-thumb-img ' + room.bgClass;

      var img = document.createElement('img');
      img.src = src;
      img.alt = room.title + ' - vista ' + (i + 1);
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';

      inner.appendChild(img);
      btn.appendChild(inner);

      btn.addEventListener('click', function () { showThumb(i); });
      thumbsContainer.appendChild(btn);
    });
  }

  function openModal(roomKey) {
    var room = ROOMS[roomKey];
    if (!room) return;
    currentRoom     = room;
    currentThumbIdx = 0;

    modalEyebrow.textContent  = room.eyebrow;
    modalTitle.textContent    = room.title;
    modalDesc.textContent     = room.desc;
    modalBeds.textContent     = room.beds;
    modalCapacity.textContent = room.capacity;

    // Main image — principal photo
    applyBg(modalImgMain, room.bgClass);
    setImg(modalImgMain, room.imgMain || null, room.title);

    // Build dynamic thumbnail strip
    buildThumbs(room);

    // Reset scroll position of modal container
    overlay.querySelector('.room-modal-container').scrollTop = 0;

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    currentRoom = null;
  }

  // Open on "Ver Detalles" clicks
  document.querySelectorAll('.rco-cta[data-room]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-room'));
    });
  });

  // Close: X button
  btnClose.addEventListener('click', closeModal);

  // Close: click on backdrop
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // Close: ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });

  // Reserve: pre-fill select + scroll to form
  btnReserve.addEventListener('click', function () {
    if (!currentRoom) return;
    var selectValue = currentRoom.selectValue;
    closeModal();
    setTimeout(function () {
      var select = document.getElementById('habitacion');
      if (select) select.value = selectValue;
      var form = document.getElementById('reserva-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        var firstInput = form.querySelector('input');
        if (firstInput) setTimeout(function () { firstInput.focus(); }, 600);
      }
    }, 200);
  });
})();


// ===== 7. DATE INPUT MIN DATE =====
(function () {
  const checkin  = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  if (!checkin || !checkout) return;

  const today = new Date().toISOString().split('T')[0];
  checkin.setAttribute('min', today);
  checkout.setAttribute('min', today);

  checkin.addEventListener('change', function () {
    if (checkin.value) {
      checkout.setAttribute('min', checkin.value);
      if (checkout.value && checkout.value <= checkin.value) {
        checkout.value = '';
      }
    }
  });
})();

// ===== 8. PANORAMAS — tap to reveal on mobile + modal =====
(function () {
  var cards   = document.querySelectorAll('.pano-card');
  var overlay = document.getElementById('pano-modal');
  if (!cards.length || !overlay) return;

  var btnClose     = overlay.querySelector('.pano-modal-close');
  var modalImg     = document.getElementById('pano-modal-img');
  var modalDist    = document.getElementById('pano-modal-distance');
  var modalTitle   = document.getElementById('pano-modal-title');
  var modalTagline = document.getElementById('pano-modal-tagline');
  var modalText    = document.getElementById('pano-modal-text');
  var modalCta     = document.getElementById('pano-modal-cta');

  var PANOS = {
    'achibueno': {
      img:      'images/panoramas/achibueno/foto-rio-achibueno.jpg',
      alt:      'Cajón del Río Achibueno, Santuario de la Naturaleza con pozones esmeralda en Linares, Maule',
      distance: '30 km desde Hotel Real',
      title:    'Cajón del Río Achibueno',
      tagline:  'El orgullo natural de Linares',
      text: '<p>Declarado Santuario de la Naturaleza. Famoso por sus cristalinos pozones color esmeralda y frondosos bosques nativos, es el epicentro absoluto del ecoturismo local. Un destino perfecto para disfrutar del kayak, la pesca con mosca, cabalgatas o un picnic relajante en el pintoresco sector de Pejerrey.</p>' +
            '<h3>Qué puedes hacer</h3>' +
            '<ul><li>Kayak</li><li>Pesca con mosca</li><li>Trekking</li><li>Baños de río</li></ul>' +
            '<h3>Información práctica</h3>' +
            '<p>Camino parcialmente pavimentado (hasta el sector Pejerrey). Recomendado para excursiones de medio día o día completo. Hay zonas de camping y picnic a orillas del río. Llevar protector solar, traje de baño y calzado cómodo para el agua.</p>'
    },
    'colbun': {
      img:      'images/panoramas/lago-colbun/foto-lago-colbun.jpg',
      alt:      'Lago Colbún, embalse de aguas cristalinas con deportes náuticos en la región del Maule, Chile',
      distance: '30 km desde Hotel Real',
      title:    'Lago Colbún',
      tagline:  'El oasis turquesa del Maule',
      text: '<p>A solo minutos del hotel, este majestuoso embalse de aguas cristalinas es el destino perfecto para desconectar. Ideal para una tarde de deportes náuticos, paseos en kayak, pesca o simplemente disfrutar de un atardecer inolvidable desde sus orillas. Durante el verano, sus agradables aguas invitan a relajarse en familia.</p>' +
            '<h3>Qué puedes hacer</h3>' +
            '<ul><li>Deportes náuticos</li><li>Natación</li><li>Pesca</li><li>Fotografía</li></ul>' +
            '<h3>Información práctica</h3>' +
            '<p>Acceso libre a playas públicas. Ideal para ir por la tarde a ver el atardecer o pasar un día completo de verano. Hay zonas habilitadas para estacionar y arriendo de kayaks en temporada alta.</p>'
    },
    'ancoa': {
      img:      'images/panoramas/embalse-ancoa/foto-pozones-ancoa.jpg',
      alt:      'Embalse Ancoa rodeado de montañas, destino de desconexión a minutos de Linares, Maule',
      distance: '45 km desde Hotel Real',
      title:    'Embalse Ancoa',
      tagline:  'Naturaleza pura y vistas panorámicas inigualables',
      text: '<p>A menos de media hora del hotel, te espera este imponente embalse rodeado de montañas y el relajante sonido del Río Ancoa. Su ruta escénica es perfecta para un paseo de tarde, disfrutar de un mate o un picnic con vistas panorámicas, y sumergirse en la naturaleza sin tener que planear un viaje largo.</p>' +
            '<h3>Qué puedes hacer</h3>' +
            '<ul><li>Paseo de tarde</li><li>Miradores</li><li>Picnic</li><li>Ruta escénica</li></ul>' +
            '<h3>Información práctica</h3>' +
            '<p>Ruta pavimentada casi en su totalidad, de muy fácil y rápido acceso para cualquier tipo de vehículo. Por su cercanía con Linares, es una escapada perfecta que puedes realizar cómodamente durante la mañana o para ir a contemplar el atardecer. Acceso liberado y sin pago de entrada.</p>'
    },
    'bellotos': {
      img:      'images/panoramas/los-bellotos/foto-los-bellotos.png',
      alt:      'Bosque nativo Reserva Nacional Los Bellotos, santuario del Belloto del Sur en la región del Maule',
      distance: '60 km desde Hotel Real',
      title:    'Reserva Nacional Los Bellotos',
      tagline:  'La puerta a la "Patagonia Central"',
      text: '<p>Un refugio de biodiversidad y santuario del majestuoso Belloto del Sur. Este tesoro escondido ofrece senderos inmersivos bajo denso bosque nativo y pozones de aguas prístinas. Ideal para quienes buscan desconexión total y rutas de trekking de nivel intermedio, alejadas de las multitudes.</p>' +
            '<h3>Qué puedes hacer</h3>' +
            '<ul><li>Trekking avanzado</li><li>Flora endémica</li><li>Fotografía de naturaleza</li></ul>' +
            '<h3>Información práctica</h3>' +
            '<p>Una verdadera inmersión en la naturaleza. Al ser un área ecológica protegida, te aseguras de disfrutar un entorno silencioso, limpio y lleno de vida silvestre. Prepara tu cámara, ropa cómoda, buen calzado de trekking y tu botella de agua para vivir una jornada de desconexión total.</p>'
    },
    'siete-tazas': {
      img:      'images/panoramas/parque-siete-tasas/foto-parque-7tasas.jpg',
      alt:      'Parque Nacional Radal Siete Tazas, pozones de agua turquesa tallados en roca volcánica, Maule, Chile',
      distance: '130 km desde Hotel Real',
      title:    'Parque Nacional Radal Siete Tazas',
      tagline:  'La maravilla de roca y agua cristalina',
      text: '<p>Uno de los parques nacionales más icónicos de Chile. Famoso por sus siete pozones sucesivos de agua turquesa tallados perfectamente en la roca volcánica. Ofrece senderos sombreados aptos para toda la familia y maravillas como el espectacular Salto de La Leona.</p>' +
            '<h3>Qué puedes hacer</h3>' +
            '<ul><li>Trekking familiar</li><li>Fotografía</li><li>Naturaleza</li><li>Cascadas</li></ul>' +
            '<h3>Información práctica</h3>' +
            '<p>Excursión ideal para el día completo. Importante: Se requiere adquirir la entrada digital de forma anticipada a través de la plataforma PasesParques de CONAF. Te sugerimos llevar calzado cómodo para senderismo, hidratación y tu cámara lista para capturar sus impresionantes miradores.</p>'
    },
    'rari': {
      img:      'images/panoramas/rari/foto-artesania-rari.jpg',
      alt:      'Artesanía colorida en crin de caballo del pueblo artesanal de Rari, Linares, Chile',
      distance: '20 km desde Hotel Real',
      title:    'Pueblo Artesanal de Rari',
      tagline:  'Capital mundial de la artesanía en crin',
      text: '<p>A solo minutos del hotel se encuentra este pintoresco pueblo rural, famoso internacionalmente por mantener viva una técnica única de cestería en miniatura tejida a mano. Pasear por su colorida calle principal es un viaje en el tiempo, donde las mismas artesanas abren las puertas de sus casas para mostrar y vender sus delicadas obras de arte.</p>' +
            '<h3>Qué puedes hacer</h3>' +
            '<ul><li>Artesanía local</li><li>Cultura y patrimonio</li><li>Paseo familiar</li><li>Compra de souvenirs</li></ul>' +
            '<h3>Información práctica</h3>' +
            '<p>Ruta pavimentada y de muy rápido acceso. Durante el trayecto, te sugerimos hacer una pausa para conocer el entorno de las tradicionales Termas de Panimávida. Además, es recomendable llevar dinero en efectivo para adquirir estas exclusivas piezas de arte directamente a los artesanos locales.</p>'
    }
  };

  // ── Modal logic ──────────────────────────────────────────
  function openPanoModal(key) {
    var data = PANOS[key];
    if (!data) return;
    modalImg.src          = data.img;
    modalImg.alt          = data.alt;
    modalDist.textContent = data.distance;
    modalTitle.textContent = data.title;
    modalTagline.textContent = data.tagline;
    modalText.innerHTML   = data.text;
    overlay.querySelector('.pano-modal-container').scrollTop = 0;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closePanoModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Open on button click
  document.querySelectorAll('.pano-cta[data-pano]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // don't trigger card tap-toggle
      openPanoModal(btn.getAttribute('data-pano'));
    });
  });

  // Close: X button
  btnClose.addEventListener('click', closePanoModal);

  // Close: click on backdrop
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePanoModal();
  });

  // Close: ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closePanoModal();
  });

  // Close modal CTA: close modal and scroll to form
  modalCta.addEventListener('click', function () {
    closePanoModal();
  });

  // ── Mobile tap-to-reveal ──────────────────────────────────
  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.pano-cta')) return; // modal handles this
      if (window.matchMedia('(hover: none)').matches) {
        var isActive = card.classList.contains('is-active');
        cards.forEach(function (c) { c.classList.remove('is-active'); });
        if (!isActive) card.classList.add('is-active');
        e.preventDefault();
      }
    });
  });
})();

// ===== 9. HERO STARS ANIMATION =====
(function () {
  var realStars = document.querySelector('.badge-stars');
  if (!realStars) return;

  // Hide badge stars at start — will fade in at Phase 2
  realStars.style.opacity = '0';

  var FADE_IN  = 400;  // ms — each star fade-in duration
  var HOLD     = 800;  // ms — each star stays visible
  var FADE_OUT = 500;  // ms — each star fade-out duration
  var STAGGER  = 300;  // ms — delay between each star

  function runAnimation() {
    var h1 = document.querySelector('.hero-content .display-lg');
    if (!h1) return;

    // Use Range API to find the exact position of "hotel" in the title
    var hotelRect = null;
    var walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var idx = node.textContent.toLowerCase().indexOf('hotel');
      if (idx !== -1) {
        var range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx + 5);
        hotelRect = range.getBoundingClientRect();
        break;
      }
    }
    if (!hotelRect) hotelRect = h1.getBoundingClientRect();

    // Position 3 stars centered above "hotel"
    // Stars use position:absolute inside .section-hero (position:relative),
    // so they scroll naturally with the page and stay anchored to the title.
    var heroEl   = document.querySelector('.section-hero');
    var heroRect = heroEl.getBoundingClientRect();

    var slotW    = Math.round(1.6 * 16 * 1.35); // ~35px per star slot at 1.6rem
    var totalW   = 3 * slotW;
    var centerX  = hotelRect.left + hotelRect.width / 2;
    // Coords relative to hero's top-left corner (accounting for current scroll)
    var topY     = (hotelRect.top  - heroRect.top)  - 42;
    var baseLeft = (centerX        - heroRect.left) - totalW / 2;

    // Create 3 individual star elements, appended inside the hero section
    var starEls = [0, 1, 2].map(function (i) {
      var el = document.createElement('span');
      el.className = 'star-hero';
      el.textContent = '★';
      el.style.top  = topY + 'px';
      el.style.left = (baseLeft + i * slotW) + 'px';
      heroEl.appendChild(el);
      return el;
    });

    // Phase 1: staggered fade-in → hold → fade-out for each star
    starEls.forEach(function (el, i) {
      var offset = i * STAGGER;

      // Fade in
      setTimeout(function () {
        el.style.opacity = '1';
      }, offset);

      // Fade out
      setTimeout(function () {
        el.style.transition = 'opacity ' + (FADE_OUT / 1000) + 's ease';
        el.style.opacity = '0';
      }, offset + FADE_IN + HOLD);
    });

    // Phase 2: after last star finishes fading out → fade in badge stars
    var phase2 = (starEls.length - 1) * STAGGER + FADE_IN + HOLD + FADE_OUT + 80;

    setTimeout(function () {
      starEls.forEach(function (el) { el.remove(); });
      realStars.style.transition = 'opacity 0.7s ease';
      realStars.style.opacity = '1';
    }, phase2);
  }

  if (document.readyState === 'complete') {
    setTimeout(runAnimation, 300);
  } else {
    window.addEventListener('load', function () {
      setTimeout(runAnimation, 300);
    });
  }
})();


// ===== 10. SECTION TITLE ANIMATIONS =====
(function () {
  var titles = document.querySelectorAll(
    '.headline-lg, .restaurant-title, .about-title, .panoramas-title, .contact-title'
  );
  if (!titles.length) return;

  titles.forEach(function (el) {
    el.classList.add('section-heading');
    if (!el.closest('.fade-in')) {
      el.classList.add('section-heading--standalone');
    }
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all immediately
    titles.forEach(function (el) { el.classList.add('is-visible', 'anim-done'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('is-visible');
      // After the 700ms animation, unlock hover by switching to transition-based state
      el.addEventListener('animationend', function () {
        el.classList.add('anim-done');
      }, { once: true });
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  titles.forEach(function (el) { observer.observe(el); });
})();
