var gulp          = require('gulp');
var browserify    = require('browserify');
var watchify      = require('watchify');
var browserSync   = require('browser-sync');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var gutil         = require('gulp-util');
var babelify      = require('babelify');
var sourcemaps    = require('gulp-sourcemaps');
var assign        = require('lodash.assign');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var cache         = require('gulp-cache');  //clear local cash

//optimization
var critical      = require('critical'); // find critical CSS for above the fold content
var htmlmin       = require('gulp-htmlmin');
var cssmin        = require('gulp-cssmin');
var jsmin         = require('gulp-jsmin');
// ////////////////////////////////////////////////
// Javascript Browserify, Watchify, Babel, React
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
// ////////////////////////////////////////////////
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

// add custom browserify options here
var customOpts = {
  entries: ['./src/js/app.js'],
  debug: true // show/hide source maps
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); //call browserify which put all scripts in one file (bundle.js)

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
//b.on('error', handleErrors); Testiraj ovo


function bundle() {
  return b.bundle()
    // log errors if they happen - OVO NE RADI
    .on('error', gutil.log.bind(gutil, gutil.colors.red(
       '\n\n*********************************** \n' +
      'BROWSERIFY ERROR:' +
      '\n*********************************** \n\n'
      )))
    //.on('error', handleErrors) Testiraj ovo
    .pipe(source('main.js'))
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('../maps')) // writes .map file
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({stream:true}));
}

// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////////////////

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./public/"
        }
    });
});


// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////

gulp.task('html', function() {
  return gulp.src('public/**/*.html')
    .pipe(browserSync.reload({stream:true}));
});

// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('styles', function() {
  gulp.src('src/scss/style.scss') //all styles are included in style.scss
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      // .on('error', errorlog)
      .pipe(autoprefixer({
              browsers: ['last 3 versions'],
              cascade: false
          }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('images', function() {
  gulp.src('src/img/**/*.{jpg,jpeg,png,gif,svg}') //all styles are included in style.scss
    .pipe(gulp.dest('public/img'))
    .pipe(browserSync.reload({stream:true}));
});


// ////////////////////////////////////////////////
// Watch Tasks
// ////////////////////////////////////////////////

gulp.task('watch', function() {
  gulp.watch('public/**/*.html', ['html']);
  gulp.watch('src/scss/**/*.scss', ['styles']);
});

// ////////////////////////////////////////////////
// Critical CSS
// ////////////////////////////////////////////////
gulp.task('critical', function () {
    critical.generate({
        inline: true,
        base: 'public/',
        src: 'index.html',
        dest: 'public/index-critical.html',
        minify: true,
        width: 320,
        height: 480
    });
});

// ////////////////////////////////////////////////
// Clear Cashing
// ////////////////////////////////////////////////
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

gulp.task('default', ['clear', 'js', 'styles', 'images' , 'browserSync', 'watch']);


// ////////////////////////////////////////////////
// Minify HTML
// ////////////////////////////////////////////////
gulp.task('minifyHTML', function() {
  return gulp.src('public/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('dist'))
});

// ////////////////////////////////////////////////
// Minify CSS
// ////////////////////////////////////////////////
gulp.task('minifyCSS', function() {
  return gulp.src('public/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist'))
});

// ////////////////////////////////////////////////
// Minify JS
// ////////////////////////////////////////////////
gulp.task('minifyJS', function() {
  return gulp.src('public/js/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest('dist'))
});


gulp.task('build', ['clear', 'minifyHTML', 'minifyCSS' , 'minifyJS']);
