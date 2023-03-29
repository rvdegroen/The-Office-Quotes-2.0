// IMPORTS
import express from "express";
import fetch from "node-fetch";

// VARIABLES
export const router = express.Router();

// homepage
router.get("/", (req, res) => {
	res.render("pages/index");
});

// game
router.get("/game", async (req, res) => {
	// fetch random quote
	  const response = await fetch("https://www.officeapi.dev/api/quotes/random");
	  const data = await response.json();
	//   res.json(data.data);
	console.log(data);
	// render page
	res.render("pages/game", { quote : data.data });
});

// characters
router.get("/characters", (req, res) => {
	res.render("pages/characters");
});

