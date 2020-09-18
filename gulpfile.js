const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

function tsAdmin(tsChangeFile) {
    return gulp.src(tsChangeFile).pipe(sourcemaps.init())
        .pipe(ts({
            sourceMap: true,
            strictNullChecks: true,
            module: "amd",
            jsx: "react",
            target: "es2015",
            allowJs: true,
            baseUrl: ".",
            outFile: 'usemint-helpers.js',
            declaration: true,
            allowSyntheticDefaultImports: true,
            experimentalDecorators: true,
            moduleResolution: "node",
            "typeRoots": [
                "./node_modules/@types"
            ],
            "types": [
                "node"
            ],
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
}

gulp.task('admin:ts', function(a) {
    return tsAdmin(['./**/*.ts', '!node_modules/**/*']);
});

gulp.task('default', gulp.series(['admin:ts']));
