// gulpfile.js for gulp 4.0.2
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const saveLicense = require('uglify-save-license');
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const rename = require("gulp-rename");

const concat_js = function () {
  return gulp
    .src([
      "./src/assets/js/wisp.js",
      "./src/assets/js/vendor/markdown-it.js",
      "./src/assets/js/vendor/markdown-it-footnote.js",
      "./src/assets/js/vendor/markdown-it-task-lists.js",
      "./src/assets/js/plugins/wisp_toc.js",
      "./src/assets/js/plugins/wisp_navbar.js",
      "./src/assets/js/plugins/wisp_highlight.js",
      "./src/assets/js/plugins/wisp_mathjax.js",
      "./src/assets/js/plugins/wisp_chart.js",
      "./src/assets/js/plugins/wisp_flowchart.js",
      "./src/assets/js/plugins/wisp_sequence_diagram.js",
    ])
    .pipe(concat("all-in-one.js"))
    .pipe(gulp.dest("./src/assets/js/"));
};

const build_js = function () {
  return gulp
    .src(["./src/assets/js/wisp.js"])
    .pipe(concat("wisp.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(gulp.dest("./src/assets/js/"));
};

const copy_files = function () {
  return gulp
    .src([
      "src/**"
    ],
      { base: 'src' }
    )
    .pipe(gulp.dest("build"));
};

exports.build = gulp.series(concat_js, build_js, copy_files);
