# The Office Quotes 2.0

# Installation

# Development

If you wanted to make changes there are a few things to keep in mind: 

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

# License

The source code is distributed under the GPL-3.0 license. See LICENSE.md for more information.
