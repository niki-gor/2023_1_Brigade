const CACHE_NAME = 'technogram-cache';
const urlsToCache = ['/']; //? Добавить ли ../dist
const cacheWhitelist = []; //? Что у нас можно не обновлять

self.addEventListener('install', (event) => {
    //? если файл ts, то ругается что waitUntil нет в Event
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }

            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then((response) => {
                if (
                    !response ||
                    (response.status !== 200 &&
                        response.status !== 201 &&
                        response.status !== 204) ||
                    response.type !== 'basic'
                ) {
                    return response;
                }

                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
