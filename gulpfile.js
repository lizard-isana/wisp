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
      "./src/lib/js/wisp.js",
      "./src/lib/js/vendor/markdown-it.js",
      "./src/lib/js/vendor/markdown-it-footnote.js",
      "./src/lib/js/vendor/markdown-it-task-lists.js",
      "./src/lib/js/plugins/wisp_toc.js",
      "./src/lib/js/plugins/wisp_navbar.js",
      "./src/lib/js/plugins/wisp_highlight.js",
      "./src/lib/js/plugins/wisp_mathjax.js",
      "./src/lib/js/plugins/wisp_chart.js",
      "./src/lib/js/plugins/wisp_flowchart.js",
      "./src/lib/js/plugins/wisp_sequence_diagram.js",
    ])
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./src/lib/js/"));
};

const build_js = function () {
  return gulp
    .src(["./src/lib/js/wisp.js"])
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
    .pipe(gulp.dest("./src/lib/js/"));
};

const copy_files = function (done) {
  gulp
    .src([
      "src/**"
    ],
      { base: 'src' }
    )
    .pipe(gulp.dest("build"));

  gulp
    .src([
      "src/lib/**",
      "src/*.html"
    ],
      { base: 'src' }
    )
    .pipe(gulp.dest("docs"));
  done()
  return
};

exports.build = gulp.series(concat_js, build_js, copy_files);
