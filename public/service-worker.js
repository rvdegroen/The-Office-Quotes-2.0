// src: https://stackoverflow.com/questions/55925496/pwa-best-practice-web-or-local-fonts/66132921#66132921

// is triggered when the service worker is first installed.
self.addEventListener("install", function (e) {
	// (waitUntil) method ensures that the service worker will stay active on the background and doesn't become idle until the cache has been "filled" with the assigned files.
	e.waitUntil(
		// (caches.open) method creates a new cache called "the-office".
		caches
			.open("the-office")
			.then(function (cache) {
				// (cache.adAll) method adds a list of files to the cache.
				return cache.addAll([
					"/manifest.json",
					"/fonts/work-sans-v18-latin-regular.woff",
					"/fonts/work-sans-v18-latin-regular.woff2",
					"/style/style.css",
					"/style/variables.css",
				]);
			})
			.catch(function (error) {
				// Log any errors that occur while caching files to the console.
				console.error("Failed to cache files:", error);
			})
	);
});

// if the resources from line 13 are not found in the cache, then these will be fetched as following:
self.addEventListener("fetch", function (event) {
	// The `respondWith` method is used to intercept the request and provide a response.
	event.respondWith(
		// The `caches.match` method checks if the requested resource is in the cache.
		caches.match(event.request).then(function (response) {
			// If the resource is in the cache, it is returned, otherwise, the resource is fetched using the `fetch` method.
			return response || fetch(event.request);
		})
	);
});
