import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("static"));

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.listen(3000);
