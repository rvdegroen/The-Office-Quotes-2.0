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
				'/characters',
				'/manifest.json',
				'/fonts/work-sans-v18-latin-regular.woff',
				'/fonts/work-sans-v18-latin-regular.woff2',
				'/style/style.css',
				'/style/variables.css',
				'/images/offline.png',
				'/images/favicon.ico',
				'/images/icon-192x192.png',
				'/scripts/main.js',
				'/scripts/game.js',
				'/scripts/characters.js',
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

function onError(error) {
	// console.error('Error fetching the resource:', error);
	// src: https://gist.github.com/felquis/7e149e1db16aa57b1354
	// return own html page
	return new Response(
		`<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta
				name="description"
				content="The Office (US) quotes quiz for stressed students or just to relax."
			/>
			<!-- css -->
			<link rel="stylesheet" href="/style/style.css" />
			<link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
			<link rel="manifest" crossorigin="use-credentials" href="manifest.json" />
			<title>The Office Quiz 2.0</title>
			<!-- js -->
			<script src="./scripts/main.js" defer></script>
	
			<script src="./scripts/game.js" type="module" defer></script>
		</head>
		<body>
			<header>
				<nav>
					<a href="/">Home</a>
					<a href="/game">Game</a>
					<a href="/characters">Characters</a>
				</nav>
			</header>
	
			<main id="offline">
				<h1>You are offline!</h1>
				<button><a href="/game">Try again</a></button>
				<img src="/images/offline.png" alt="you are offline" />
			</main>
		</body>
	</html>
	`,
		{
			status: 503,
			statusText: 'Service Unavailable',
			headers: new Headers({
				'Content-Type': 'text/html',
			}),
		}
	);
}

// fetches the requested content from the cache
function fetchFromCache(request) {
	return (
		caches
			// matching is the response to a particular request from cache e.g. "/game"
			// request is the URL
			.match(request)
			.then((matching) => {
				// if it DOES exist in the responsed, return it otherwise it doesn't exist
				if (matching) {
					return matching;
				}
				// if it doesn't exist in the cache, then fetch it
				return fetch(request);
			})
			// when you're offline, it does the catch function, because it cannot fetch when you're offline (error)
			.catch(onError)
	);
}

// updates the cache from the server with the latest content
function updateCache(request) {
	return caches.open(CACHE).then((cache) => {
		return (
			fetch(request)
				.then((response) => {
					// put the response into the cache
					return cache.put(request, response.clone()).then(() => {
						// return the original response
						return response;
					});
				})
				// when you're offline, it does the catch function, because it cannot fetch when you're offline (error)
				.catch(onError)
		);
	});
}
