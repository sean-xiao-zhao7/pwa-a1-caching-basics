let staticFilesVersion = "staticFiles-v2";
let dynamicRequestsVersion = "dynamicRequests-v1";

// service worker install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(staticFilesVersion).then((cache) => {
            cache.addAll([
                "/",
                "/index.html",
                "/favicon.ico",
                "/src/js/main.js",
                "/src/js/material.min.js",
                "/src/css/app.css",
                "/src/css/dynamic.css",
                "/src/css/main.css",
                "https://fonts.googleapis.com/css?family=Roboto:400,700",
                "https://fonts.googleapis.com/icon?family=Material+Icons",
                "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
            ]);
        })
    );
});

// activate
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (
                        key != staticFilesVersion &&
                        key !== dynamicRequestsVersion
                    ) {
                        caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            if (res) {
                return res;
            } else {
                return fetch(event.request)
                    .then((res2) => {
                        return caches
                            .open(dynamicRequestsVersion)
                            .then((cache) => {
                                cache.put(event.request.url, res2.clone());
                                return res2;
                            });
                    })
                    .catch((err) => {});
            }
        })
    );
});
