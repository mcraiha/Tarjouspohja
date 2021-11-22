// Service worker

// Välimuistin nimi, versionumeroa kasvatetaan päivityksien yhteydessä
const PRECACHE = 'v8';

// Lista URL:eista, jotka otetaan aina alussa välimuistiin
const PRECACHE_URLS = [
  'index.html',
  './', // Alias index.html
  'tietoja.html',
  'mvp.css',
  'index.js',
  'favicon.ico'
];

// Lataa kaikki tarvittavat osat muistiin, kun asennus tapahtuu
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// Poistaa vanhat välimuistit tarvittaessa
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Palauttaa välimuistista löytyvät, jos niitä on
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Löytyy välimuistista
        if (response) {
          return response;
        }

        // Haetaan internetistä
        return fetch(event.request);
      }
    )
  );
});