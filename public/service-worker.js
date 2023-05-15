let staticFilesVersion = "staticFiles-v1";
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
self.addEventListener("activate", (event) => {});

// fetch
self.addEventListener("fetch", (event) => {});
