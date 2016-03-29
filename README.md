# zm-superCell
GULP automated workflow based on Joel Longie supperCell

# SuperCell 0.0.2

## Install Packages

After cloning the project to your computer run the following command in your terminal to install all required node packages.

    sudo npm install
    gulp

The first time you run gulp the build may take a little longer as it compiles and builds out the "public/css" and "public/js" folders and files.

## Features

- Browserify: JSX transforms, ES6 modules.
- Uglify: minification.
- BrowserSync.
- Sass / flexbox ready (IE10+), layout for everygreen browsers.

## How to use

Precompiled JS and SCSS files are in the src folder and compile to public.  All other files including HTML, image etc. are in public.  BrowserSync runs from public and serves as the "Dist" folder for client-side apps.
