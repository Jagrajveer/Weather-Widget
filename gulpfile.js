const { src, dest, series } = require("gulp");

const moveHTML = () => {
  return src("src/*.html").pipe(dest("dist"));
};

exports.default = series(moveHTML);
exports.html = moveHTML;
