// IMPORTS
import express from "express";
import fetch from "node-fetch";

// VARIABLES
export const router = express.Router();

// fetched on localhost:3000/api/game
router.get("/game", async (req, res) => {
	try {
		// fetch random quote
	  const response = await fetch("https://www.officeapi.dev/api/quotes/random");
	  const data = await response.json();
	  res.json(data.data);
	  console.log(data);

	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error fetching data');
	}
  });

  
