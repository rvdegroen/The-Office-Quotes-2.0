// IMPORTS
import express from "express";
import fetch from "node-fetch";
import shuffle from "shuffle-array";

// VARIABLES
export const router = express.Router();

// homepage
router.get("/", (req, res) => {
	res.render("pages/index");
});

// game
router.get("/game", async (req, res) => {
	try {
		// fetch random quote
		const quoteResponse = await fetch("https://www.officeapi.dev/api/quotes/random");
		const quoteData = await quoteResponse.json();
		const quote = quoteData.data;

		// fetch all characters
		const charactersResponse = await fetch("https://www.officeapi.dev/api/characters");
		const charactersData = await charactersResponse.json();
		const characters = charactersData.data;

		// take the speaker of the quote out of all the characters
		const speaker = `${quote.character.firstname} ${quote.character.lastname}`;
		const remainingCharacters = characters
			// takes object and turns into string
			.map((character) => `${character.firstname} ${character.lastname}`)
			// remaining characters do not include the one who spoke the quote
			.filter((character) => character !== speaker);
		// 3 wrong choices: remaining characters, shuffle it and take the first 3 remaining/random characters
		const wrongChoices = shuffle(remainingCharacters).slice(0, 3);
		// make a new array with the speaker and 3 wrong choices and shuffle it
		const choices = shuffle([speaker, ...wrongChoices]);
		// give data output for in game.ejs file
		res.render("pages/game", { quote, speaker, choices });
	} catch (err) {
		// res.render("pages/game/error")
		res.send(`error: ${err.message}`);
	}
});

// characters
router.get(`/characters`, async (req, res) => {
	try {
		// fetch all characters
		const charactersResponse = await fetch("https://www.officeapi.dev/api/characters");
		const charactersData = await charactersResponse.json();
		let characters = charactersData.data;

		// express filter from query parameter .filter is from the name="filter"
		const filter = req.query.filter;
		console.log("Filter:", filter);

		// if character gets filtered, then for every character, look at firstname in lowercase and if the name starts with filteredname, look in lowercase
		if (filter) {
			characters = characters.filter((character) =>
				character.firstname.toLowerCase().startsWith(filter.toLowerCase())
			);
		}

		// sortDirection is name="sortDirection"
		const sortDirection = req.query.sortDirection;
		console.log(sortDirection);

		if (sortDirection) {
			characters = characters.sort((a, b) =>
				sortDirection === "asc"
					? //   localecompare looks at the comparison with strings, result will be -1, 0, 1
					  // array has a and b [1,2,3] a=1 b=2 => how do you want to compare this?
					  //   asc = 1
					  a.firstname.localeCompare(b.firstname)
					: //   desc = -1
					  b.firstname.localeCompare(a.firstname)
			);
		}

		// console.log(characters);

		res.render("pages/characters", {
			characters,
		});
	} catch (err) {
		// res.render("pages/game/error")
		res.send(`error: ${err.message}`);
	}
});
