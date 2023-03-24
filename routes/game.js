// IMPORTS
import express from "express";

// VARIABLES
const router = express.Router();

// game
router.get("/", (req, res) => {
	res.render("pages/game");
});

module.exports = router;
