let gulp = require('gulp'),
    server = require('gulp-server-livereload'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglifyes'),
    imagemin = require('gulp-imagemin'),
    clean = require('rimraf');


gulp.task("start", function(){
    gulp.src("./app")
        .pipe(server({
            open: true,
            livereload: true
        }))
})

gulp.task("styles", function(){
    gulp.src("./app/sass/**/*.sass")
        .pipe( sass().on('error', sass.logError) )
        .pipe( prefix({
            versions: ['last 20 versions']
        }) )
        .pipe( gulp.dest('./app/css') )
})

gulp.task("images", function(){
    gulp.src("./app/img/**/*")
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest("./build/img"))
})

gulp.task("clean", function(cb){
    clean('./build', cb);
})

gulp.task("build", ["clean", "images"], function(){
    gulp.src("./app/index.html")
        .pipe(useref())
        .pipe( gulpIf('*.css', csso()) )
        .pipe( gulpIf('*.js', uglify()) )
        .pipe(gulp.dest('./build'))
})

gulp.task("watch", function(){
    gulp.watch("./app/sass/**/*.sass", ["styles"]);
})

gulp.task("default", ["start", "watch"]);