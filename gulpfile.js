// gulpfile.js for gulp 4.0.2
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const rename = require("gulp-rename");

const concat_js = function() {
  return gulp
    .src([
      "./src/assets/js/wisp_core.js",
      "./src/assets/js/wisp_toc.js",
      "./src/assets/js/wisp_navbar.js",
      "./src/assets/js/wisp_highlight.js",
      "./src/assets/js/wisp_mathjax.js",
      "./src/assets/js/wisp_chart.js",
      "./src/assets/js/wisp_flowchart.js",
      "./src/assets/js/wisp_sequence_diagram.js",
      "./src/assets/js/vendor/marked.min.js"
    ])
    .pipe(concat("wisp.js"))
    .pipe(gulp.dest("./src/assets/js/"));
};

const build_js = function() {
  return gulp
    .src(["./src/assets/js/wisp.js"])
    .pipe(concat("wisp.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(gulp.dest("./src/assets/js/"));
};

const copy_js = function() {
  return gulp
    .src(["./src/assets/js/wisp.js", "./src/assets/js/wisp.min.js"])
    .pipe(gulp.dest("./build/assets/js/"))
    .pipe(gulp.dest("./docs/assets/js/"));
};

const copy_css = function() {
  return gulp
    .src(["./src/assets/css/default.css"])
    .pipe(gulp.dest("./build/assets/css/"))
    .pipe(gulp.dest("./docs/assets/css/"));
};

const copy_files = function() {
  return gulp.src(["src/*.html", "src/*.md"]).pipe(gulp.dest("build/"));
};

exports.build = gulp.series(concat_js, build_js, copy_js, copy_css, copy_files);
