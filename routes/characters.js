// IMPORTS
import express from "express";

// VARIABLES
const router = express.Router();

// characters
router.get("/", (req, res) => {
	res.render("pages/characters");
});

module.exports = router;
