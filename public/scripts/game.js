console.log("hi this works");

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
