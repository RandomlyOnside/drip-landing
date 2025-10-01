const CACHE_NAME = 'localdrip-v3';
const urlsToCache = [
  '/portal/consumer-demo/',
  '/portal/consumer-demo/index.html',
  '/manifest.json',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/ld-color-drip.svg'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        // Cache each URL individually to handle failures gracefully
        return Promise.allSettled(
          urlsToCache.map(url => 
            fetch(url, {
              cache: 'no-cache'
            }).then(response => {
              if (response.ok) {
                return cache.put(url, response);
              }
              console.warn(`Failed to cache ${url}: ${response.status}`);
            }).catch(error => {
              console.warn(`Failed to fetch ${url}:`, error);
            })
          )
        );
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        // Force the waiting service worker to become the active service worker
        self.skipWaiting();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Return a fallback page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/portal/consumer-demo/');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});