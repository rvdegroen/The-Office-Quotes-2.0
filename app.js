// IMPORTS
import express from "express";
import {router as frontendRouter} from "./routes/frontend.js";
// import {router as apiRouter} from "./routes/api.js";

// VARIABLES
const app = express();
const port = 3000;

// MIDDLEWARE
// for static files
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

// MIDDLEWARE ROUTES
//homepage
app.use("/", frontendRouter);

// api
// app.use("/api", apiRouter);

app.listen(port);
