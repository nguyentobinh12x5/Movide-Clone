const Movies = require("../models/movieModel");
const Genres = require("../models/genreModel");
const VideoList = require("../models/videoModel");
const Fuse = require("fuse.js");
exports.getMovieOriginals = (req, res, next) => {
  const movies = Movies.all();
  //URL để lấy trang thứ hai sẽ là: '/api/data?page=2'.
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageMovies = movies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(movies.length / pageSize);
  return res.status(200).json({
    results: pageMovies,
    page: page,
    total_pages: totalPages,
  });
};
exports.getMovieTrending = (req, res, next) => {
  const movies = Movies.all();
  //URL để lấy trang thứ hai sẽ là: '/api/data?page=2'.
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageMovies = movies
    .sort((a, b) => b.popularity - a.popularity)
    .slice(startIndex, endIndex);
  const totalPages = Math.ceil(movies.length / pageSize);
  return res.status(200).json({
    results: pageMovies,
    page: page,
    total_pages: totalPages,
  });
};
exports.getMovieTopRate = (req, res) => {
  const movies = Movies.all();
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageMovies = movies
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(startIndex, endIndex);
  const totalPages = Math.ceil(movies.length / pageSize);
  return res.status(200).json({
    results: pageMovies,
    page: page,
    total_pages: totalPages,
  });
};
exports.getMovieDiscover = (req, res) => {
  const movies = Movies.all();
  const genres = Genres.all();
  const genreName = req.params.genreName;
  const [genre] = genres.filter((g) => g.name === genreName);
  if (!genreName) {
    return res.status(400).json({ message: "Not found genre param" });
  }
  const page = 1;
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageMovies = movies
    .filter((movie) => movie.genre_ids.includes(genre.id))
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(movies.length / pageSize);
  return res.status(200).json({
    results: pageMovies,
    page: page,
    total_pages: totalPages,
    genre_name: genreName,
  });
};
exports.getMovieVideo = (req, res) => {
  const videos = VideoList.all();
  const filmId = req.params.filmId;
  if (!filmId) {
    return res.status(404).json({ message: "Not found film_id parram" });
  }
  const movieVideos = videos.find(
    (video) => video.id.toString() === filmId.toString()
  );
  if (!movieVideos) {
    return res.status(404).json({ message: "Movie not found" });
  }
  const video = movieVideos.videos.filter(
    (movie) => movie.official === true && movie.site === "YouTube"
  );
  const sortedVideos = video.sort((a, b) => {
    if (a.type === "Trailer" && b.type !== "Trailer") {
      return -1;
    } else if (a.type !== "Trailer" && b.type === "Trailer") {
      return 1;
    }
    return new Date(b.published_at) - new Date(a.published_at);
  });
  // Lấy video đầu tiên trong mảng đã sắp xếp
  const finalVideo = sortedVideos[0];
  res.status(200).json(finalVideo);
};
exports.postMovieSearch = (req, res) => {
  const movies = Movies.all();
  const query = req.query.q;

  const fuse = new Fuse(movies, {
    keys: ["original_title", "overview", "original_language", "release_date"],
    includeScore: true,
    threshold: 0.3,
  });

  const results = fuse.search(query);
  const filteredMovies = results.map((result) => result.item);

  res.status(200).json(filteredMovies);
};
