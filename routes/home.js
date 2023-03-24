// IMPORTS
import express from "express";

// VARIABLES
const router = express.Router();

// homepage
router.get("/", (reg, res) => {
	res.render("pages/index");
});

module.exports = router;
