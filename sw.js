var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
    "/",
    "duDialog-master/",
    "sass/",
    "scripts/",
    "styles/",
    "Design.js",
    "index.html",
    "notebook-20722-128x128.ico",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "apple-touch-icon.png",
    "Design.js",
    "favicon.icon",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "notebook-20722-128x128.icon",
    "site.webmanifest",
    "sw.js"
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
