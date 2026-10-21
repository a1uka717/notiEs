const CACHE_NAME = 'goodnotes-v1';
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  './config.js'
];

// Установка сервис-воркера и кэширование файлов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Перехват запросов и выдача файлов из кэша без интернета
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});