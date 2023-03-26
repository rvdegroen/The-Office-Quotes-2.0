// IMPORTS
import express from "express";

// VARIABLES
export const router = express.Router();

// homepage
router.get("/", (reg, res) => {
	res.render("pages/index");
});

// game
router.get("/game", (req, res) => {
	res.render("pages/game");
});

// characters
router.get("/characters", (req, res) => {
	res.render("pages/characters");
});

