var gulp     = require('gulp'),
    uglify       = require('gulp-uglify'),
    jshint       = require('gulp-jshint'),
    rename       = require('gulp-rename'),
    minifyCSS    = require('gulp-minify-css'),
    concat       = require('gulp-concat'),
    notify       = require("gulp-notify"),
    ts           = require("gulp-typescript"),
    eventStream  = require("event-stream"),
    plumber      = require("gulp-plumber") ;


//VENDORS
gulp.task('jsVendors', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',

    ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('release-client/js/'))
        .pipe(rename('vendors.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('release-client/js'))
        .pipe(notify('JavaScript Vendors ready !'));
});


gulp.task('cssVendors', function () {
    return gulp.src([
        'bower_components/foundation/css/foundation.css',

    ])
        .pipe(plumber())
        .pipe(gulp.dest('release-client/css/'))
        .pipe(rename('vendors.css'))
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('release-client/css'))
        .pipe(notify('Css Vendors ready !'));
});

gulp.task('typescript-client', function() {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(plumber())
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: false,
            target: 'ES6',
            module: 'commonjs'
        }));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest('release-client/definitions')),
        tsResult.js.pipe(gulp.dest('release-client/js'))
            .pipe(notify('tsClient finished'))
    );
});

gulp.task('typescript-server', function() {
    var tsResult = gulp.src([
            'server.ts'
    ])
        .pipe(plumber())
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: false,
            target: 'ES6',
            module: 'commonjs'
        }));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest('definitions')),
        tsResult.js.pipe(gulp.dest('.'))
            .pipe(notify('tsServer finished'))
    );
});

gulp.task('vendors', ['jsVendors', 'cssVendors']);
gulp.task('typescript', ['typescript-client', 'typescript-server']);
gulp.task('dev', ['typescript'], function() {
    gulp.watch("src/**/*.ts", ['typescript-client']);
    gulp.watch("server.ts", ['typescript-server']);
});

