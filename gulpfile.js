// for Scss
var gulp = require('gulp'),             // load gulp module
    gulpSass = require('gulp-sass');    // load gulp-sass module

gulp.task('styles',function(){
    gulp.src('client-service/sass/**/*.scss')       // Get the scss source files
        .pipe(gulpSass())                           // Compile scss
        .pipe(gulp.dest('client-service/css'));     // destination of css 
})
