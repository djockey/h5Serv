var gulp = require("gulp");
var less = require("gulp-less");
var minCss = require("gulp-minify-css");
var cssVersion = process.env.NODE_ENV == "production" ? +new Date() : "local";
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var gutil = require("gulp-util");
var babel = require("gulp-babel");
gulp.task("css-less", function () {
	gulp.src("./client/css/*.less", {base: "./client/css"})
		.pipe(less())
		.pipe(minCss())
		.pipe(gulp.dest("./build/" + cssVersion));
});
gulp.task("css-movePic", function () {
	gulp.src("./client/css/image/**/*")
		.pipe(gulp.dest("./build/" + cssVersion + "/images/h5-3.0/"));
});
gulp.task("build-js", function () {
	var jsConfig = Object.create(webpackConfig);
	webpack(jsConfig, function (err, stats) {
		if (err) {
			return console.log(err);
		}
		gutil.log("build-js", stats.toString({
			colors: true
		}));
	});
});
gulp.task("build-server", function () {
    gulp.src("./app.js").pipe(babel({
            "presets": [
                "es2015-node5",
                "stage-3"
            ],
            "plugins": [
                "add-module-exports"
            ]
        }
    )).pipe(gulp.dest("./build"));
    gulp.src("./server/**/*.js", {base: "./"}).pipe(babel({
            "presets": [
                "es2015-node5",
                "stage-3"
            ],
            "plugins": [
                "add-module-exports"
            ]
        }
    )).pipe(gulp.dest("./build"));
});
