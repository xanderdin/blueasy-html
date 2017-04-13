'use strict';


const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const merge = require('merge-stream');
const w3cjs = require('gulp-w3cjs');
const concat = require('gulp-concat');
const rename = require('gulp-regex-rename');
const uglify = require('gulp-uglify');
const bootlint = require('gulp-bootlint');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('font-awesome', ()=>{
    return merge(
        gulp.src(['node_modules/font-awesome/fonts/*'])
            .pipe(gulp.dest('dst/vendor/font-awesome/fonts')),
        gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
            .pipe(gulp.dest('dst/vendor/font-awesome/css'))
    );
});

gulp.task('clean:font-awesome', ()=>{
    return del(['dst/vendor/font-awesome']);
});


gulp.task('bootstrap', ()=>{
    return merge(
        gulp.src(['node_modules/bootstrap-sass/assets/fonts/bootstrap/*'])
            .pipe(gulp.dest('dst/vendor/bootstrap/fonts')),
        gulp.src(['node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'])
            .pipe(gulp.dest('dst/vendor/bootstrap/js')),
        gulp.src(['node_modules/bootstrap-sass/assets/stylesheets/**/*.scss'])
            .pipe(gulp.dest('src/sass/vendor/bootstrap'))
    );
});

gulp.task('clean:bootstrap', ()=>{
    return del(['dst/vendor/bootstrap', 'src/sass/vendor/bootstrap']);
});


gulp.task('jquery', ()=>{
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dst/vendor/jquery'));
});

gulp.task('clean:jquery', ()=>{
    return del(['dst/vendor/jquery']);
});


gulp.task('sass', ['bootstrap'], ()=>{
    var sassOpts = {
        precision: 8,
        outputStyle: 'expanded',
    };
    var autoprefixerOpts = [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
    ];
    var cleancssOpts = {
        compatibility: 'ie8',
    };
    return merge(
        gulp.src(['src/sass/bootstrap.scss'])
            .pipe(sass(sassOpts).on('error', sass.logError))
            .pipe(autoprefixer(autoprefixerOpts))
            .pipe(cleancss({compatibility: 'ie8'}))
            .pipe(rename(/\.css/, '.min.css'))
            .pipe(gulp.dest('dst/vendor/bootstrap/css')),
        gulp.src(['src/sass/main.scss'])
            .pipe(sass(sassOpts).on('error', sass.logError))
            .pipe(autoprefixer(autoprefixerOpts))
            .pipe(cleancss(cleancssOpts))
            .pipe(rename(/\.css/, '.min.css'))
            .pipe(gulp.dest('dst/css'))
    );
});

gulp.task('clean:sass', ['clean:bootstrap'], ()=>{
    return del(['dst/css']);
});


gulp.task('js', ['jquery'], ()=>{
    return gulp.src(['src/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename(/\.js/, '.min.js'))
        .pipe(gulp.dest('dst/js'));
});

gulp.task('clean:js', ['clean:jquery'], ()=>{
    return del(['dst/js']);
});


gulp.task('html', ()=>{
    return gulp.src(['src/html/**/*.html'])
        .pipe(bootlint())
        .pipe(w3cjs())
        .pipe(w3cjs.reporter())
        .pipe(gulp.dest('dst'));
});

gulp.task('clean:html', ()=>{
    return del(['dst/**/*.html']);
});


gulp.task('img', ()=>{
    return gulp.src(['src/img/**/*'])
        .pipe(gulp.dest('dst/img'));
});

gulp.task('clean:img', ()=>{
    return del(['dst/img']);
});


gulp.task('fonts', ['font-awesome'], ()=>{
    return gulp.src(['src/fonts/**/*'])
        .pipe(gulp.dest('dst/fonts'));
});

gulp.task('clean:fonts', ['clean:font-awesome'], ()=>{
    return del(['dst/fonts']);
});


gulp.task('watch', ['sass', 'js', 'html', 'img', 'fonts'], ()=>{
    gulp.watch(['src/sass/**/*.scss'], ['sass']);
    gulp.watch(['src/js/**/*.js'], ['js']);
    gulp.watch(['src/html/**/*.html'], ['html']);
    gulp.watch(['src/img/**/*'], ['img']);
    gulp.watch(['src/fonts/**/*'], ['fonts']);
});


gulp.task('make', [
    'sass',
    'js',
    'html',
    'img',
    'fonts',
]);

gulp.task('clean', [
    'clean:sass',
    'clean:js',
    'clean:html',
    'clean:img',
    'clean:fonts',
]);


gulp.task('default', ['watch']);
