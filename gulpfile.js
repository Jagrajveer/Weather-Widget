const { src, dest, series } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

const moveHTML = () => {
  return src("src/*.html").pipe(dest("dist"));
};

const minifyCSS = () => {
  return src("src/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css"));
};

exports.default = series(moveHTML, minifyCSS, minifyJS);
exports.html = moveHTML;
exports.css = minifyCSS;
