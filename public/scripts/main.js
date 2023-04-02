// src: https://web.dev/service-workers-registration/

if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker.register("/service-worker.js");
	});
}
