var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    "./",
    "./duDialog-master/",
    "./sass/",
    "./scripts/",
    "./styles/",
    "./Design.js",
    "./index.html",
    "./notebook-20722-128x128.ico"
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
