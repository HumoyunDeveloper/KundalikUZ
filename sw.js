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


self.addEventListener("activate", function(event) {
  console.log("[Servicework] Activate");
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== urlsToCache) {
          console.log("[ServiceWorker] Removing old cache shell", key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch");
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

});
