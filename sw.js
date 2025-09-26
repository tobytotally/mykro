// Simple service worker to handle the sw.js requests
// This prevents the "Failed to fetch" errors

self.addEventListener('install', (event) => {
  console.log('Mykro service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Mykro service worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let the browser handle all fetch requests normally
  return;
});
