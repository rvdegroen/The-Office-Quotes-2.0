const CACHE = 'cache';

// add content to the cache when the service worker is installed
self.addEventListener('install', (event) => {
	// .waituntil methoded ensures sw stays active on bg and doesn't becomes idle until the cache has been filled with all the assigned files
	event.waitUntil(
		// caches.open method creates new cache called "CACHE"
		caches.open(CACHE).then((cache) => {
			// file paths to cache
			cache.addAll([
				'/',
				'/manifest.json',
				'/fonts/work-sans-v18-latin-regular.woff',
				'/fonts/work-sans-v18-latin-regular.woff2',
				'/style/style.css',
				'/style/variables.css',
			]);
		})
	);
});

// update cache when online & only respond to cache when offline
self.addEventListener('fetch', (event) => {
	if (navigator.onLine) {
		// If online, try to respond to the fetch request with content from the cache
		event.respondWith(fetchFromCache(event.request));

		// Then, update the cache with the latest content from the server and return the original response from updateCache
		event.waitUntil(updateCache(event.request));
	} else {
		// If offline, only try to respond with content from the cache
		event.respondWith(fetchFromCache(event.request));
	}
});

// fetches the requested content from the cache
function fetchFromCache(request) {
	return caches.match(request).then((matching) => {
		if (matching) {
			return matching;
		}

		return fetch(request);
	});
}

// updates the cache from the server with the latest content
function updateCache(request) {
	return caches.open(CACHE).then((cache) => {
		return fetch(request).then((response) => {
			// put the response into the cache
			return cache.put(request, response.clone()).then(() => {
				// return the original response
				return response;
			});
		});
	});
}
