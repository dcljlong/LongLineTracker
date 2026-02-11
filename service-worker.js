self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('llt-v1').then(cache =>
      cache.addAll([
        'index.html',
        'style.css',
        'main.js',
        'manifest.json'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
