const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);
// Middleware xác thực người dùng
const authenticateUser = (req, res, next) => {
  // Sử dụng luôn token này
  const token = req.body.token;

  // Kiểm tra xem token có tồn tại trong danh sách không
  const userTokenData = JSON.parse(fs.readFileSync(p, "utf-8"));
  const authenticatedUser = userTokenData.find((user) => user.token === token);

  if (authenticatedUser) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = authenticateUser;
