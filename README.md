# EEK · Estación Espacial Kennedy
## Sitio web institucional · GitHub Pages

---

### Estructura de archivos

```
eek-site/
├── index.html              ← Landing principal
├── manifiesto.html         ← Manifiesto (crear)
├── prensa.html             ← Prensa / cobertura (crear)
├── contacto.html           ← Contacto (crear)
├── css/
│   └── eek.css             ← Estilos compartidos
├── js/
│   ├── eek.js              ← APIs + Bot de medidas
│   └── tweets.json         ← Tweets reales del @BotMedidas (agregar)
├── img/
│   └── obras/
│       ├── eek-001.jpg     ← Imagen portada obra 1
│       ├── eek-001-main.jpg
│       ├── eek-001-b.jpg
│       ├── eek-001-c.jpg
│       ├── eek-001-d.jpg
│       └── ... (mismo patrón para cada obra)
└── obras/
    ├── index.html          ← Grilla de todas las obras
    ├── eek-001.html        ← Eclipse penumbral lunar ✓
    ├── eek-002.html        ← Cinco veces la misma piedra (crear)
    ├── eek-003.html        ← Fanzine (crear)
    ├── eek-004.html        ← Simulación Rocas Lunares (crear)
    ├── eek-005.html        ← Eclipse + Diego Serrano (crear)
    ├── eek-006.html        ← Los años que no vimos las estrellas (crear)
    └── eek-007.html        ← En la tierra, silencio (crear)
```

---

### Deploy en GitHub Pages

1. Crear repositorio en GitHub (puede ser privado o público)
2. Subir todos los archivos de `eek-site/` a la raíz del repo
3. Ir a Settings → Pages → Source: Deploy from branch → main → / (root)
4. Conectar dominio propio en Settings → Pages → Custom domain

### Conectar dominio propio

Agregar archivo `CNAME` en la raíz del repo con el dominio:
```
estacionespacialkennedy.com
```
(o el dominio que tengas comprado)

En tu proveedor de dominio, configurar DNS:
- Tipo A: 185.199.108.153
- Tipo A: 185.199.109.153
- Tipo A: 185.199.110.153
- Tipo A: 185.199.111.153

---

### Agregar imágenes de obras

Nombrar las imágenes así y ponerlas en `img/obras/`:
- `eek-001.jpg`        → imagen de portada (usada en la grilla)
- `eek-001-main.jpg`   → imagen principal en la página de la obra
- `eek-001-b.jpg`      → thumbnail 2
- `eek-001-c.jpg`      → thumbnail 3
- `eek-001-d.jpg`      → thumbnail 4

Tamaños recomendados:
- Portada grilla: 800×600px
- Main: 1200×675px (16:9)
- Thumbnails: 600×450px (4:3)

---

### Agregar tweets reales del @BotMedidas

Cuando llegue el archivo de datos de Twitter/X:

1. Abrir el ZIP descargado
2. Buscar `data/tweets.js`
3. Los tweets están en formato JS, extraer los textos
4. Crear `js/tweets.json` con este formato:
```json
[
  "1 año se procesa a una velocidad de 17 Unidades de masa atómica",
  "5 meses duelen 10 gonorreas",
  "1 tristeza pesa 7 días",
  "6 humano pesan 4 gramos",
  "37 píxeles duran 30 hectáreas"
]
```
5. En `index.html`, descomentar esta línea:
```js
// EEK.cargarTweetsReales('js/tweets.json');
```

---

### APIs utilizadas (sin key, sin costo)

| API | Qué retorna | URL |
|-----|-------------|-----|
| wheretheiss.at | Posición ISS en tiempo real | `api.wheretheiss.at/v1/satellites/25544` |
| sunrise-sunset.org | Amanecer/atardecer Kennedy | `api.sunrise-sunset.org/json?lat=4.6097&lng=-74.1817` |
| open-notify.org | Astronautas en el espacio | `api.open-notify.org/astros.json` |

Todas tienen CORS abierto y funcionan desde el navegador directamente.
No requieren API key ni backend.

---

### Páginas por crear

Las siguientes páginas usan la misma estructura (copiar estructura de `eek-001.html`):
- `obras/eek-002.html` — Cinco veces la misma piedra
- `obras/eek-003.html` — Fanzine (estructura diferente: PDF viewer + preview páginas)
- `obras/eek-004.html` — Simulación Rocas Lunares
- `obras/eek-005.html` — Eclipse lunar + Diego Serrano
- `obras/eek-006.html` — Los años que no vimos las estrellas
- `obras/eek-007.html` — En la tierra, silencio
- `manifiesto.html`
- `prensa.html`
- `contacto.html`

---

Ana Guzmán · Estación Espacial Kennedy · EEK · 2020–
4°37'44"N · 74°8'49"W · Kennedy, Bogotá, Colombia
