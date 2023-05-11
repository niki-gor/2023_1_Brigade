const CACHE_NAME = 'technogram-cache';
const urlsToCache = ['/']; //? Добавить ли ../dist
const cacheWhitelist = []; //? Что у нас можно не обновлять

const imageRegRex = /.webp|.svg|.jpg|.jpeg|.gif|.png/;

self.addEventListener('install', (event) => {
    // self.skipWaiting(); //? хз нахера
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch((err) => {
                console.error('Failed install sw:', err);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            console.log('Activated cache');
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // event.waitUntil(self.clients.claim()); //? хз нахера
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') {
        return;
    }

    if (
        imageRegRex.test(event.request) &&
        !event.request.path.includes('avatar')
    ) {
        event.respondWith(cacheFirst(event));
    } else {
        event.respondWith(networkFirst(event));
    }
});

async function networkFirst(event) {
    const { request } = event;
    const cache = await caches.open(CACHE_NAME);
    try {
        const response = await fetch(request);

        if (navigator.onLine) {
            await cache.put(request, response.clone());
        }
        return response;
    } catch {
        try {
            const cachedResponse = await cache.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
        } catch {
            const response = await event.preloadResponse;
            if (response) {
                return response;
            } else {
                return new Response(null, {
                    status: 404,
                    statusText: 'Not Found',
                });
            }
        }
    }
}

async function cacheFirst(event) {
    const { request } = event;
    const cache = await caches.open(CACHE_NAME);
    try {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const response = await event.preloadResponse;
        if (response) {
            return response;
        }
    } catch {
        try {
            const response = await fetch(request);

            if (navigator.onLine) {
                await cache.put(request, response.clone());
            }
            return response;
        } catch {
            return new Response(null, {
                status: 404,
                statusText: 'Not Found',
            });
        }
    }
}
