const CACHE_NAME = "goglobalmart-v1";

const urlsToCache = [

  "/",
  "/index.html",

];


/// INSTALL
self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then((cache) => {

        return cache.addAll(urlsToCache);

      })

  );

});


/// FETCH
self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request)

      .then((response) => {

        /// RETURN CACHE FIRST
        if (response) {

          return response;
        }

        /// FETCH FROM INTERNET
        return fetch(event.request)

          .then((networkResponse) => {

            return caches.open(CACHE_NAME)

              .then((cache) => {

                cache.put(
                  event.request,
                  networkResponse.clone(),
                );

                return networkResponse;
              });

          });

      })

      .catch(() => {

        /// OFFLINE FALLBACK
        return caches.match("/index.html");

      })

  );

});