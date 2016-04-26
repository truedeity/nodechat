

/// <reference path="./declarations/node.d.ts" />
/// <reference path="./declarations/gulp-typescript.d.ts" />


var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');



//tsc --removeComments --module commonjs --target ES5 --outDir build src/server.ts

var tsProject = ts.createProject({
    declaration: false,
    noExternalResolve: false,
    target: "ES5",
    module: "commonjs"
});

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/*.ts')
                    .pipe(ts(tsProject));

    return merge([  
        tsResult.dts.pipe(gulp.dest('build')),
        tsResult.js.pipe(gulp.dest('build'))
    ]);
});
gulp.task('default', ['scripts'], function() {
    gulp.watch('src/*.ts', ['scripts']);
});