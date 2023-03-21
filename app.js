// IMPORTS
import express from "express";

// VARIABLES
const app = express();
const port = 3000;

// MIDDLEWARE
// for static files
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

// MIDDLEWARE ROUTES
// homepage
app.get("/", (req, res) => {
	res.render("pages/index");
});

// game
app.get("/game", (req, res) => {
	res.render("pages/game");
});

// characters
app.get("/characters", (req, res) => {
	res.render("pages/characters");
});

app.listen(port);
