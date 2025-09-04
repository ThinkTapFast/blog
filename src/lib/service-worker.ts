// Service Worker registration for enhanced polyfill management
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🔧 Service Worker registered for enhanced polyfill management');
        }

        // Check browser capabilities via service worker
        const capabilities = await checkBrowserCapabilities();
        if (process.env.NODE_ENV === 'development') {
          console.log('📊 Browser capabilities:', capabilities);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Service Worker registration failed:', error);
        }
      }
    });
  }
}

// Browser capability check via service worker
async function checkBrowserCapabilities() {
  if (!navigator.serviceWorker.controller) return null;

  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data.type === 'CAPABILITIES_RESPONSE') {
        resolve(event.data.capabilities);
      }
    };

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CAPABILITIES' },
        [messageChannel.port2]
      );
    }
  });
}
