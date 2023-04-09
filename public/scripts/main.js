// src: https://web.dev/service-workers-registration/
console.log("This is so stupid.");

if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker.register("/service-worker.js");
	});
}

fetch("https://officeapi.dev/api/quotes", { mode: "no-cors" });

// if (!navigator.onLine) {
// 	const img = document.createElement("img");
// 	img.src = "/images/offline.png"; // should be cached in service worker
// 	document.body.appendChild(img);
// }
