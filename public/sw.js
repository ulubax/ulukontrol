// UluKontrol PWA Service Worker (Faz 2)
const CACHE_NAME = 'ulukontrol-cache-v7';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './js/bundle.js',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Service Worker Kurulumu ve Varlıkların Önbelleğe Alınması
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[UluKontrol SW] Önbellek dosyaları hazırlanıyor...');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[UluKontrol SW] Bazı dosyalar önbelleğe eklenemedi:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Eski Önbelleklerin Temizlenmesi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[UluKontrol SW] Eski önbellek temizleniyor:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Ağ İsteği Yakalama (Network-First for Code, Stale-While-Revalidate for Assets)
self.addEventListener('fetch', (event) => {
  // Sadece HTTP/HTTPS GET isteklerini işle
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  const url = event.request.url;

  // JS ve CSS dosyaları için NETWORK-FIRST (Kullanıcı asla eski/hatalı kodda takılı kalmaz)
  if (url.includes('bundle.js') || url.includes('.css') || url.includes('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Diğer statik varlıklar (resimler, fontlar vb.) için Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
