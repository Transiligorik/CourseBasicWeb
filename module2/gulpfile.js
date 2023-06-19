const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("./sass/*/.+(sass|scss)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "bonjour-",
            suffix: "-hola",
          }))
        .pipe(autoprefixer({
            cascade: false
        }))
		.pipe(gulp.dest('dist'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("module2/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch(".//sass/*/.+(sass|scss)", gulp.parallel("styles"));
    gulp.watch(".//*.hmtl", on('change', browserSync.reload));
})

gulp.task('default', gulp.parallel('server', 'styles'));