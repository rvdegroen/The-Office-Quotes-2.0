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
					"/offline/offline.html",
					"/images/offline.png",
				]);
			})
			.catch(function (error) {
				// Log any errors that occur while caching files to the console.
				console.error("Failed to cache files:", error);
			})
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function (response) {
				// If the resource is in the cache, it is returned, otherwise, the resource is fetched using the `fetch` method.
				return (
					response ||
					fetch(event.request).then(function (fetchResponse) {
						// The fetched response is cloned to be stored in the cache and returned as the response.
						const responseToCache = fetchResponse.clone();
						caches.open("the-office").then(function (cache) {
							cache.put(event.request, responseToCache);
						});
						return fetchResponse;
					})
				);
			})
			.catch(function (error) {
				console.error("Error fetching the resource:", error);
				// src: https://gist.github.com/felquis/7e149e1db16aa57b1354
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
							<button><a href="/">Try again</a></button>
							<img src="../images/offline.png" alt="you are offline" />
						</main>
					</body>
				</html>
				`,
					{
						status: 503,
						statusText: "Service Unavailable",
						headers: new Headers({
							"Content-Type": "text/html",
						}),
					}
				);
			})
	);
});
