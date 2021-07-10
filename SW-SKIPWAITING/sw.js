self.addEventListener('install', function (event) {
    console.log('[SW] Installing SW....', event);
    //add after change sw.js
    //and must remove after 2 or 3 days
    self.skipWaiting();
});