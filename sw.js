// UluKontrol PWA Service Worker (Faz 1)
const CACHE_NAME = 'ulukontrol-cache-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './js/app.js',
  './js/store.js',
  './js/data/initialState.js',
  './js/data/vehiclesData.js',
  './js/components/Icons.js',
  './js/components/PlateBadge.js',
  './js/components/Header.js',
  './js/components/GarageCard.js',
  './js/components/CockpitWidgets.js',
  './js/components/MaintenanceScreen.js',
  './js/components/MarketScreen.js',
  './js/components/ProfileScreen.js',
  './js/components/AuthScreen.js',
  './js/components/BottomNav.js',
  './js/components/MobileFrame.js',
  './js/components/QuickKmModal.js',
  './js/components/VehicleWizardModal.js',
  './js/components/PwaInstallBanner.js',
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

// Ağ İsteği Yakalama (Stale-While-Revalidate Stratejisi)
self.addEventListener('fetch', (event) => {
  // Sadece HTTP/HTTPS GET isteklerini önbellekle
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

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
        .catch(() => {
          // Ağ hatası veya çevrimdışı durumunda önbellekteki veriyi kullan
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
