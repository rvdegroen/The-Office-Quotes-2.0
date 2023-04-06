// src: https://stackoverflow.com/questions/55925496/pwa-best-practice-web-or-local-fonts/66132921#66132921

// is triggered when the service worker is first installed.
self.addEventListener("install", function (e) {
	// (waitUntil) method ensures that the service worker will stay active on the background and doesn't become idle until the cache has been "filled" with the assigned files.
	e.waitUntil(
		//( caches.open) method creates a new cache called "my-website-name".
		caches.open("my-website-name").then(function (cache) {
			// (cache.adAll) method adds a list of files to the cache.
			return cache.addAll([
				"/manifest.json",
				"/fonts/work-sans-v18-latin-regular.eot",
				"/fonts/work-sans-v18-latin-regular.svg",
				"/fonts/work-sans-v18-latin-regular.ttf",
				"/fonts/work-sans-v18-latin-regular.woff",
				"/fonts/work-sans-v18-latin-regular.woff2",
				"/scripts/main.js",
				"/images/offline.png",
				"/",
				"/index.html",
				"/style/style.css",
				"/style/variables.css",
			]);
		})
	);
});
// event listener is triggered whenever the web app attempts to fetch a resource.
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
