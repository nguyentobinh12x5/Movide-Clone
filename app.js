const express = require("express");
const cors = require("cors");
const app = express();
const moviesRoutes = require("./routes/movie");
const errorController = require("./controllers/error");
const authenticateUser = require("./middleware/is-auth");
//Allow all the request
app.use(cors());
// Sử dụng body-parser để đọc dữ liệu từ request body
app.use(express.json());
app.use((req, res, next) => {
  req.body.token = "8qlOkxz4wq";
  next();
});
app.get("/", authenticateUser, (req, res) => {
  return res.status(234).send("Welcome to Mern stack tutorial!");
});
app.use("/movies", moviesRoutes);
app.use(errorController.get404);
app.listen(5000, () => {
  console.log("App is listening on port: 5000");
});
