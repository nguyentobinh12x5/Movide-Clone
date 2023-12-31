const express = require("express");
const moviesController = require("../controllers/movie");

const router = express.Router();

router.get("/trending", moviesController.getMovieTrending);
router.get("/original", moviesController.getMovieOriginals);
router.get("/top-rate", moviesController.getMovieTopRate);
router.get("/discover/:genreName", moviesController.getMovieDiscover);
// cũng dùng post để lấy được video
router.get("/video/:filmId", moviesController.getMovieVideo);
router.get("/search", moviesController.postMovieSearch);
module.exports = router;
