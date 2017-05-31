// for Scss
var gulp = require('gulp'),             // load gulp module
    gulpSass = require('gulp-sass');    // load gulp-sass module

/* command:
- gulp <target>: the <target> is the task we want to use, which define in `gulp.task('<target_name>',function(){...})`
*/

// add "Watch" service
gulp.task('watch',function(){
    gulp.watch('scss/**/*.scss',['styles'],function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks ...');
    }); // Assign "styles" work as target
});

// Work process "styles"
gulp.task('styles',function(){
    gulp.src('client-service/sass/**/*.scss')       // Get the scss source files
        .pipe(gulpSass())                           // Compile scss
        .pipe(gulp.dest('client-service/css'));     // destination of css
})
