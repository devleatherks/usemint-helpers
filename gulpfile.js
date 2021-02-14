const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');

const tsconfig = require(__dirname  + '/tsconfig.json');

gulp.task('build:clear', function() {
    return del('dist/**', {force: true});
});

gulp.task('build:ts', function(a) {
    return gulp.src([
        './src/**/*.ts',
    ]).pipe(ts(tsconfig.compilerOptions))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series(['build:clear', 'build:ts']));
