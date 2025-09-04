// Service Worker for enhanced polyfill management
const POLYFILL_CACHE = 'polyfill-cache-v1';

// Install event - cache critical polyfills
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(POLYFILL_CACHE).then((cache) => {
      // Pre-cache critical polyfills for offline support
      return cache.addAll([
        '/_next/static/chunks/polyfills.js',
        // Add other critical resources
      ]);
    })
  );
});

// Fetch event - serve polyfills efficiently
self.addEventListener('fetch', (event) => {
  // Handle polyfill requests
  if (event.request.url.includes('polyfills.js')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Browser capability detection in service worker
function detectBrowserCapabilities() {
  const capabilities = {
    promise: typeof Promise !== 'undefined',
    map: typeof Map !== 'undefined',
    set: typeof Set !== 'undefined',
    symbol: typeof Symbol !== 'undefined',
  };
  
  return capabilities;
}

// Message handling for browser capability checks
self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_CAPABILITIES') {
    const capabilities = detectBrowserCapabilities();
    event.ports[0].postMessage({
      type: 'CAPABILITIES_RESPONSE',
      capabilities
    });
  }
});
