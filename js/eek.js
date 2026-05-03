/* ─── EEK · eek.js ───────────────────────────────────────────────
   APIs: ISS · Cielo Kennedy · Astronautas
   Bot de Medidas: generador aleatorio
   ─────────────────────────────────────────────────────────────── */

const EEK = {
  lat: 4.6097,
  lon: -74.1817,

  /* ── Utilidades ── */
  pick: arr => arr[Math.floor(Math.random() * arr.length)],

  toRad: d => d * Math.PI / 180,

  distKm(lat1, lon1, lat2, lon2) {
    const R = 6371,
      dLat = this.toRad(lat2 - lat1),
      dLon = this.toRad(lon2 - lon1),
      a = Math.sin(dLat/2)**2 +
          Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
          Math.sin(dLon/2)**2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
  },

  fmtBog(iso) {
    try {
      return new Date(iso).toLocaleTimeString('es-CO', {
        hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota'
      });
    } catch { return '—'; }
  },

  set(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  },

  /* ── ISS en tiempo real ── */
  async loadISS() {
    try {
      const r = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      const d = await r.json();
      this.set('iss-lat',  parseFloat(d.latitude).toFixed(4) + '°');
      this.set('iss-lon',  parseFloat(d.longitude).toFixed(4) + '°');
      this.set('iss-alt',  Math.round(d.altitude) + ' km');
      this.set('iss-vel',  Math.round(d.velocity).toLocaleString() + ' km/h');
      this.set('iss-vis',  d.visibility === 'daylight' ? 'Zona iluminada' : 'Zona oscura');
      const dist = this.distKm(this.lat, this.lon, d.latitude, d.longitude);
      this.set('iss-dist', dist.toLocaleString() + ' km');
    } catch (e) {
      this.set('iss-lat', 'Sin señal');
    }
  },

  /* ── Cielo sobre Kennedy ── */
  async loadSky() {
    try {
      const r = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.lon}&formatted=0`
      );
      const d = await r.json();
      if (d.status === 'OK') {
        this.set('sky-rise',    this.fmtBog(d.results.sunrise));
        this.set('sky-set',     this.fmtBog(d.results.sunset));
        this.set('sky-twilight', this.fmtBog(d.results.astronomical_twilight_end));
        const now  = new Date(),
              rise = new Date(d.results.sunrise),
              set  = new Date(d.results.sunset);
        const estado = (now >= rise && now <= set)
          ? 'Día · cielo visible sobre Kennedy'
          : 'Noche · oscuridad activa sobre Kennedy';
        this.set('sky-now', estado);
      }
    } catch (e) {
      this.set('sky-now', '—');
    }
  },

  /* ── Astronautas en órbita ── */
  async loadAstros() {
    const urls = [
      'https://api.open-notify.org/astros.json',
      'https://corsproxy.io/?https://api.open-notify.org/astros.json',
    ];
    for (const url of urls) {
      try {
        const r = await fetch(url);
        const d = await r.json();
        this.set('astro-count', d.number);
        const nombres = d.people.map(p => p.name).join(' · ');
        this.set('astro-names', nombres);
        return;
      } catch (e) { continue; }
    }
    this.set('astro-count', '?');
    this.set('astro-names', 'sin conexión');
  },

  /* ── Reloj Kennedy ── */
  startClock() {
    const tick = () => {
      const n = new Date();
      const t = n.toLocaleTimeString('es-CO', { timeZone: 'America/Bogota' });
      this.set('clock-kennedy', t + ' · Kennedy');
    };
    tick();
    setInterval(tick, 1000);
  },

  /* ── Inicializar APIs ── */
  initAPIs() {
    this.loadISS();
    setInterval(() => this.loadISS(), 5000);
    this.loadSky();
    this.loadAstros();
    this.startClock();
  },

  /* ── Bot de Medidas ─────────────────────────────────────────── */
  botData: {
    nums: [1,2,3,4,5,6,7,8,9,10,12,15,17,20,25,30,37,50,100],
    u1: [
      'año','años','mes','meses','día','días','hora','horas',
      'minuto','minutos','segundo','segundos','semana','semanas',
      'tristeza','tristezas','píxel','píxeles',
      'humano','humanos','gonorrea','gonorreas',
      'luna','lunes','silencio','silencios',
      'eclipse','eclipses','idea','ideas',
      'sueño','sueños','canción','canciones',
      'kilómetro','kilómetros','grado','grados',
      'palabra','palabras','suspiro','suspiros',
    ],
    verbos: [
      'pesa','pesan',
      'dura','duran',
      'duele','duelen',
      'mide','miden',
      'equivale a','equivalen a',
      'se procesa a una velocidad de',
      'ocurre cada',
      'cuesta','cuestan',
      'contiene','contienen',
      'vibra a','vibran a',
      'tarda','tardan',
      'cabe en','caben en',
    ],
    u2: [
      'gramos','kilogramos','toneladas',
      'días','horas','minutos','segundos','años','meses','semanas',
      'kilómetros','metros','centímetros','hectáreas',
      'gonorreas','tristezas','lunas','eclipses',
      'Unidades de masa atómica','decibeles','grados Kelvin',
      'píxeles','bits','bytes',
      'canciones','silencios','sueños','ideas',
      'veces','pasos','latidos','suspiros',
    ],
    // Tweets reales del bot (se completan cuando llegue el archivo)
    reales: [],
  },

  botGenerar() {
    const { nums, u1, verbos, u2, reales } = this.botData;
    // Si hay tweets reales, mezclar 50/50
    if (reales.length > 0 && Math.random() > 0.5) {
      return this.pick(reales);
    }
    const n1 = this.pick(nums),
          a  = this.pick(u1),
          v  = this.pick(verbos),
          n2 = this.pick(nums),
          b  = this.pick(u2);
    return `${n1} ${a} ${v} ${n2} ${b}`;
  },

  initBot(txtId, btnGenId, btnAutoId) {
    let autoInterval = null;

    const gen = () => {
      const el = document.getElementById(txtId);
      if (!el) return;
      el.textContent = this.botGenerar();
      el.className = 'bot-text fade';
      setTimeout(() => el.className = 'bot-text', 250);
    };

    const btnGen  = document.getElementById(btnGenId);
    const btnAuto = document.getElementById(btnAutoId);

    if (btnGen)  btnGen.addEventListener('click', gen);
    if (btnAuto) btnAuto.addEventListener('click', () => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        btnAuto.textContent = 'Auto: OFF';
        btnAuto.className = 'btn';
      } else {
        autoInterval = setInterval(gen, 3000);
        btnAuto.textContent = 'Auto: ON';
        btnAuto.className = 'btn btn-auto-on';
      }
    });

    gen();
  },

  /* ── Cargar tweets reales desde JSON ── */
  async cargarTweetsReales(url) {
    try {
      const r = await fetch(url);
      const d = await r.json();
      this.botData.reales = d;
    } catch (e) {
      console.log('Tweets reales no cargados, usando generador.');
    }
  },
};
