// src: https://web.dev/service-workers-registration/
console.log('This is so stupid.');

// fetch("https://officeapi.dev/api/quotes");

// registration tells the browser where the service worker is
navigator.serviceWorker.register('service-worker.js', { scope: './' });
// initialize the service worker
navigator.serviceWorker.ready.then(console.log('Service Worker is running.'));

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', function () {
// 		navigator.serviceWorker.register('/service-worker.js');
// 	});
// }

// if (!navigator.onLine) {
// 	const img = document.createElement("img");
// 	img.src = "/images/offline.png"; // should be cached in service worker
// 	document.body.appendChild(img);
// }
