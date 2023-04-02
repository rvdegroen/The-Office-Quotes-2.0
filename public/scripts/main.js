console.log("hi I'm main bitch");

// function when the user makes a correct or wrong choice on /game page
// global scope is the window object and this is only for browsers, otherwise it won't recognize the function in my game.ejs
window.correctChoice = function () {
	alert("That was correct!");
	// refresh the page
	location.reload();
};

window.wrongChoice = function (speaker) {
	alert(`That was wrong! The correct answer was ${speaker}!`);
	// refresh the page
	location.reload();
};

// debounce for characters page when typing in the input
window.debounce = function (func, timeout = 500) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};
