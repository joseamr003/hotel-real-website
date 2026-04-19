# Hotel Real — Instrucciones para Claude Code

## Proyecto
Sitio web del Hotel Real, Freire 437, Linares, Chile.

## Reglas de diseño
- Sigue SIEMPRE el archivo DESIGN.md para colores, tipografía y espaciado
- No uses colores ni fuentes que no estén definidas en DESIGN.md
- El diseño debe ser responsivo (mobile + desktop)

## Contenido
- Usa el archivo contenido_web.md para todo el texto del sitio
- No uses Lorem Ipsum bajo ninguna circunstancia

## Stack
- HTML, CSS y JavaScript puro (sin frameworks)

---

## Estado del proyecto (actualizado 2026-04-03)

### Archivos principales
- `index.html` — HTML completo de una sola página
- `css/styles.css` — Sistema de diseño CSS completo
- `js/main.js` — JS sin frameworks

### Secciones completadas ✅

**1. Hero**
- Imagen de fondo: `images/fachada-noche.jpg` (placeholder activo con gradiente)
- Overlay rgba(0,0,0,0.6) + texto centrado
- Nav transparente con backdrop-blur en estado inicial, blanca al scroll
- Badge "3 Estrellas" con glassmorphism

**2. Habitaciones & Suites**
- Layout editorial alternado (foto 62% + card flotante superpuesto)
- Impares (1, 3): foto izquierda, card blanco (#ffffff) a la derecha
- Pares (2, 4): foto derecha, card bordo (#800020) a la izquierda
- Cada card: eyebrow "HABITACIÓN 0X", título Noto Serif, 2 badges con SVG (icono persona + icono cama), descripción, CTA "Ver Detalles →" dorado
- Placeholders de foto con gradientes radiales por habitación
- Para insertar fotos reales: comentarios HTML indican dónde añadir `<img>`

**3. Servicios Incluidos**
- Bento grid asimétrico 3 columnas desktop / 2 tablet / 1 mobile
- 6 tarjetas: WiFi (1col), Desayuno (2col foto), Climatización (2col), Smart TV (1col), Baño Privado (1col), Restaurante (2col foto)
- Iconos SVG Lucide-style 32px en secondary-container (#f5e9bb)
- Tarjetas foto: overlay rgba(0,0,0,0.55) con placeholder gradient
- bg rgba(0,0,0,0.2), border rgba(255,255,255,0.1), border-radius 1rem

**4. Nuestra Gastronomía**
- Grid 2 columnas, gap-16, items-center, fondo #800020
- Columna izquierda: eyebrow + título "Nuestra Gastronomía" en secondary-container (#f5e9bb), párrafo, botón "Ver Carta Completa" → `/NUEVA CARTA FINAL HR.pdf` (target=_blank)
- Botón: borde dorado transparente, rellena en hover
- Columna derecha: 2 fotos superpuestas (rp-main 80% + rp-secondary 60% absolute bottom-right)
- Placeholders: rp-plato (tonos cálidos) y rp-salon (tonos fríos morados)

**5. Nuestra Historia**
- Grid 2 columnas, gap-16, items-center, fondo surface-container-low (#f3f3f4)
- Columna izquierda: imagen aspect 4/5 + badge absoluto "Est. 1985" en #800020
- Columna derecha: eyebrow dorado, título serif, 2 párrafos, blockquote con border-left 4px dorado
- Placeholder de imagen: gradiente bordo oscuro

**6. Contacto & Reservas** ✅ (última sección completada)
- Grid 2 columnas, fondo #800020
- Columna izquierda: título serif "Ubicación e Información" + 4 ítems con SVG (MapPin, Phone, MessageSquare, Mail)
- Columna derecha: formulario con inputs de fondo oscuro y borde dorado sutil
  - Campos: Nombre, Correo, Check-in (date), Check-out (date), Consulta Adicional
  - Botón verde WhatsApp (#25d366) que construye URL con encodeURIComponent() y abre con window.open()
  - URL: https://wa.me/56944929920?text=...
- Email en formulario: contacto@hotelreal.cl

**7. Footer**
- Barra mínima bg #0a0507 (negro)
- "© 2026 Hotel Real. Todos los derechos reservados." + link Instagram @hotelreallinareschile con icono SVG

### Pendiente / Próximos pasos ⏳

1. **Fotos reales**: Reemplazar todos los placeholders (gradientes CSS). Ver comentarios HTML:
   - Hero: `images/fachada-noche.jpg`
   - Habitaciones: `images/doble-twin.jpg`, `images/matrimonial.jpg`, `images/matrimonial-adicional.jpg`, `images/triple.jpg`
   - Servicios: `images/desayuno.jpg`, `images/restaurante.jpg`
   - Gastronomía: `images/plato.jpg`, `images/salon.jpg`
   - Historia: `/images/historia-1985.jpg`

2. **PDF carta**: Subir `/NUEVA CARTA FINAL HR.pdf` a la raíz del servidor

3. **Email del formulario**: Está como contacto@hotelreal.cl — confirmar si es correcto (el original era reservas@hotelreal.cl)

4. **Mapa**: Posible tarjeta de Google Maps en la sección de contacto

5. **SEO**: meta og:image, og:title, twitter:card, favicon

6. **Orden de secciones en la página**:
   Hero → Habitaciones → Servicios → Gastronomía → Nuestra Historia → Contacto → Footer

### Convenciones CSS importantes
- Variables en `:root`: `--primary` #570013, `--primary-container` #800020, `--secondary` #735c00, `--secondary-container` #f5e9bb
- Fuentes: `--font-serif` Noto Serif, `--font-sans` Manrope
- **NUNCA** border-radius en botones, inputs, chips (solo fotos y bento cards llevan `1rem`)
- **NUNCA** 1px lines para separar secciones
- Sombra flotante: `0px 24px 48px rgba(26,28,28,0.06)`
- Responsive: 1024px (tablet), 768px (mobile), 480px (mobile small)
