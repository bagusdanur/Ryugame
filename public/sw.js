// Service Worker for RyuGame PWA
const CACHE_NAME = 'ryugame-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/icon.svg',
  '/manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event with Stale-While-Revalidate pattern
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Avoid caching chrome-extension:// or other non-http schemes
  if (!event.request.url.startsWith(self.location.origin)) return;

  // IMPORTANT: Ignore Next.js internal requests, API routes, and Hot Module Replacement (HMR) 
  // to prevent infinite refresh loops in development!
  if (
    event.request.url.includes('/_next/') ||
    event.request.url.includes('/api/') ||
    event.request.url.includes('webpack-hmr')
  ) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          // Cache successful responses for our static assets
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // If network fails, cachedResponse will be returned
        });

        return cachedResponse || fetchedResponse;
      });
    })
  );
});
