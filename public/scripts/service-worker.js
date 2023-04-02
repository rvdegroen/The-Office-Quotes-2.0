// src: https://stackoverflow.com/questions/55925496/pwa-best-practice-web-or-local-fonts/66132921#66132921

self.addEventListener("install", function (e) {
	e.waitUntil(
		caches.open("my-website-name").then(function (cache) {
			return cache.addAll(["../manifest.json"]);
		})
	);
});
self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
