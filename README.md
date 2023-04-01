# License

The source code is distributed under the GPL-3.0 license. See LICENSE.md for more information.

# The Office Quotes 2.0

## Progressive Web App

This application is a progressive web app, which means it can be used offline, you can install it on any device you want and you can enable push notifications (for example, but I don't have this in my application)

# Installation & running the app

There are two ways to use my app: by cloning this github and then using it on `localhost:3000` or by installing it via the browser (you can go to my deployed app in that case: https://the-office-quotes-2-0.vercel.app/).

## Installing the app on your local machine and run it on localhost:3000

1. First you have to clone this repository with `git clone [CLONE LINK OF THIS REPOSITORY]` in the terminal, within the folder that you want this application to be located in.
2. When opening the application in the code, you will have to type in your code editor's terminal `npm install` or `npm i` to install all its dependencies that is needed to run this application.
3. Finally, you can start running the app with: `npm run dev` in the terminal. The app will run on `localhost:3000` in your browser.

## Installing the app as PWA

1. Go to my deployed app on https://the-office-quotes-2-0.vercel.app/
2. Then you look in the adress bar and try to find an icon that has a screen with an arrow down. This means that the app is a PWA and you can install it on your local machine (www.youtube.com has this icon too).
3. Just follow the steps and start up your application.

# Code explanation

In this section I'll tell you all about my code.

## Express

For my server, I'm using Express. I installed Express in my project with `npm i express`. Since I used commonJS before, I wanted to try using modules. To be able to do this, I had to write `"type": "module",` in `line 6` of my `package.json` file.

### Using express

My Express server is in my `app.js` file, like so:

```

// Here I am importing express. I'm also importing my routes for my application in this file.

import express from "express";
import {router as frontendRouter} from "./routes/frontend.js";
import {router as apiRouter} from "./routes/api.js";

// These are the just variables that are used to initialize express. I got this from the express documentation from their website.

const app = express();
const port = 3000;

// This is all middleware:

// Here I'm telling where to find my public folder. I need this for my styles, my scripts (client-side) and for my manifest.json.
app.use(express.static("public"));

// Here I'm telling my express server that I'm using EJS as my view engine and that my dynamic pages (EJS files) can be found in my "views folder". By doing this, I don't have to put "public" in the path of the files within this folder.
app.set("views", "./views");
app.set("view engine", "ejs");

// This is middleware I'm using for my routers.
app.use("/", frontendRouter);

// if you go to localhost:3000/api, you can see data that has been fetched. I wanted to use this to fetch my data instead, but it just got me a bit overwhelmed and I did not end up using this.
// api
app.use("/api", apiRouter);


```

## Routing

In my `routes/frontend.js` you can see all my front-end routes. I'll just explain this shortly:

As you can see I'm importaing on top of the page the following:

```
// to use express
import express from "express";
// to be able to use fetch in node - server side
import fetch from "node-fetch";
// to be able to shuffle an array
import shuffle from "shuffle-array";

```

- I define my routes with `router.get("/PATH", async (req, res) => {})`. An example of this is my game or quiz route: `router.get("/game", async (req, res) => {}`.

- When you go to `localhost:3000/game`, you will go to the page for my game.

- For my my `/game` and my `/characters` route I fetch data and give this data as output to my EJS, by putting this as a `param`, when I render my `EJS` files within the route like so: `res.render("pages/game", { OUTPUT FOR EJS FILES });`.

## Templating engines & EJS

By using template engines, you avoid making repetitive HTML files or code. If you write your code in a templating engine, it will render your written code through a templating engine into something the browser can use, think of an HTML file.

### EJS

EJS is the templating that I'm using for my project, because I made a previous project with a templating engine. I find it easy to use and understandable. The syntax is easy to learn, because you can also just use HTML syntax within your EJS files. I also really need to save time for this project, since I only have such a short amount of time (~2 weeks), so I don't want to spend that time, learning something entirely new.

## Styling with Sass

For styling I'm using Sass. Be sure to work in the `style/style.scss` file and NOT in the `style/style.css` file, as this is just for compiling.

### Compiling

To compile your scss, just simply type `sass --watch public/style/style.scss:public/style/style.css` in the terminal and it will automatically compile your scss.

You can also download the "Live Sass Compiler" as extension, you don't have to use the CLI. Just make sure you have this enabled. You can check this by looking at the bottom of your screen in your code editor where it will say "Watch Sass", this means the extension is disabled OR "Watching", this means the extension is enabled.

### Compressing

To compress your Sass files, you can use the following line in your terminal:

`sass --watch --style=compressed public/style/style.scss:public/style/style.css`

### Running Sass compiler simultaneously with your application

If you wanted to compile you scss and run the application at the same time, just open 2nd terminal and run your application in it.

## Service worker

Service workers
