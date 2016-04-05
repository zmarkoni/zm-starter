##Project name
zm-starter

## Install Packages

After cloning the project to your computer run the following command in your terminal to install all required node packages.

    sudo npm install
    gulp


## Features

- npm           -> managing packages
- Gulp          -> automation
- Browserify    -> load modules
- BrowserSync.  -> reload browser on HTML, CSS or JS change
- Bootstrap     -> Framework
- Sass          -> CSS preprocessors
- Google fonts  -> Roboto
- Html sections are in templates which content is injected via JS in index.html
- Optimization of HTML, CSS, JS, IMAGES which is copied to dist folder for production
## How to use

Precompiled JS and SCSS files are in the -> src <- folder and compile to public.  All other files including HTML, image etc. are in public.  

dist folder is used for production

## Using JavaScript

Browserify    -> load modules
app.js        -> Application entry point where we load all modules like Header, Navigation, templates
sandbox       -> contain global functions
