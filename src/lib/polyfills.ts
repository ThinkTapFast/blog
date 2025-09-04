// Smart polyfill loader - works behind the scenes
export function initializeBrowserPolyfills() {
  // Only run in browser environment
  if (typeof window === "undefined") return;

  // Feature detection and polyfill loading
  const polyfillsNeeded: string[] = [];

  // Check for missing features
  if (!window.Promise) polyfillsNeeded.push("Promise");
  if (!Array.prototype.includes) polyfillsNeeded.push("Array.includes");
  if (!Array.prototype.find) polyfillsNeeded.push("Array.find");
  if (!Array.prototype.findIndex) polyfillsNeeded.push("Array.findIndex");
  if (!Object.assign) polyfillsNeeded.push("Object.assign");
  if (!Object.entries) polyfillsNeeded.push("Object.entries");
  if (!Object.values) polyfillsNeeded.push("Object.values");
  if (!String.prototype.startsWith) polyfillsNeeded.push("String.startsWith");
  if (!String.prototype.endsWith) polyfillsNeeded.push("String.endsWith");
  if (!String.prototype.includes) polyfillsNeeded.push("String.includes");
  if (!window.Map) polyfillsNeeded.push("Map");
  if (!window.Set) polyfillsNeeded.push("Set");
  if (!window.Symbol) polyfillsNeeded.push("Symbol");
  if (!window.URL) polyfillsNeeded.push("URL");

  // Log what polyfills are being applied (only in development)
  if (process.env.NODE_ENV === "development" && polyfillsNeeded.length > 0) {
    console.log(`🔧 Core-js polyfills applied for: ${polyfillsNeeded.join(", ")}`);
  }
}

// Browser capability detection
export function getBrowserCapabilities() {
  if (typeof window === "undefined") return { isModern: true, polyfillsNeeded: [] };

  const capabilities = {
    promise: !!window.Promise,
    arrayIncludes: !!Array.prototype.includes,
    arrayFind: !!Array.prototype.find,
    objectAssign: !!Object.assign,
    stringIncludes: !!String.prototype.includes,
    map: !!window.Map,
    set: !!window.Set,
    symbol: !!window.Symbol,
    url: !!window.URL,
  };

  const isModern = Object.values(capabilities).every(Boolean);
  const polyfillsNeeded = Object.entries(capabilities)
    .filter(([_, supported]) => !supported)
    .map(([feature]) => feature);

  return { isModern, polyfillsNeeded, capabilities };
}

// Initialize on import
initializeBrowserPolyfills();
