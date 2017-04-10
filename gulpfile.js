const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const ts = require('gulp-typescript').createProject('tsconfig.json');
const browserify = require('browserify');

gulp.task('build', () => 
    gulp.src("src/**/*")
    .pipe(sourcemaps.init())
    .pipe(ts())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'))
);

gulp.task('browserify', ['build'], () =>
    browserify({ entries: 'lib/tools/explorer/index.js', sourcemaps: true })
    .bundle()
    .pipe(source('explorer.js'))
    .pipe(gulp.dest('public'))
);

gulp.task('default', ['build', 'browserify']);