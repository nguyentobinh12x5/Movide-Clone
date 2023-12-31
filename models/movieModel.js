const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);
const Movies = {
  all: function () {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },
};
module.exports = Movies;
//parse: chuyển đổi một chuỗi JSON thành một đối tượng JavaScript (object)
