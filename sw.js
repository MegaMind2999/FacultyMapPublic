// Generated at build time — do not edit.
const CACHE = "faculty-map-fdcc1b8b2d68";
const INDEX = "/FacultyMapPublic/index.html";
const PRECACHE = [
  "/FacultyMapPublic/",
  "/FacultyMapPublic/app-icon.svg",
  "/FacultyMapPublic/assets/cairo-arabic-wght-normal-CJWMIGCx.woff2",
  "/FacultyMapPublic/assets/cairo-latin-ext-wght-normal-at8nfxId.woff2",
  "/FacultyMapPublic/assets/cairo-latin-wght-normal-PfPtmrPZ.woff2",
  "/FacultyMapPublic/assets/index-ChKIp_DL.css",
  "/FacultyMapPublic/assets/index-VvIDrAny.js",
  "/FacultyMapPublic/favicon.svg",
  "/FacultyMapPublic/floors/floor1.json",
  "/FacultyMapPublic/floors/floor1.svg",
  "/FacultyMapPublic/floors/floor2.json",
  "/FacultyMapPublic/floors/floor2.svg",
  "/FacultyMapPublic/floors/floor3.json",
  "/FacultyMapPublic/floors/floor3.svg",
  "/FacultyMapPublic/floors/floor4.json",
  "/FacultyMapPublic/floors/floor4.svg",
  "/FacultyMapPublic/floors/floor5.json",
  "/FacultyMapPublic/floors/floor5.svg",
  "/FacultyMapPublic/floors/floor6.json",
  "/FacultyMapPublic/floors/floor6.svg",
  "/FacultyMapPublic/icons.svg",
  "/FacultyMapPublic/index.html",
  "/FacultyMapPublic/manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((k) => k.startsWith("faculty-map-") && k !== CACHE)
          .map((k) => caches.delete(k)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  // Pages: network first so updates show up, cached shell when offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          if (res.ok) caches.open(CACHE).then((c) => c.put(INDEX, copy));
          return res;
        })
        .catch(() => caches.match(INDEX)),
    );
    return;
  }

  // Assets: cache first (they are versioned with this worker)
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }),
    ),
  );
});
