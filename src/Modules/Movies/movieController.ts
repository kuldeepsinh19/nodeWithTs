const movie = require("./movieModel");
import { Request, Response } from "express";

const getAllMovies = async (req: Request, res: Response) => {
  try {
    let rows = await movie.getMovies();
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

const insertMovie = async (req: Request, res: Response) => {
  try {
    const { id, name, duration, description } = req.body;
    await movie.addMovie(id, name, duration, description);
    res.json({ msg: "SUCCESSFULLY INSERTED" });
  } catch (error) {
    console.log(error);
  }
};

const deleteMovieById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await movie.deleteMovie(id);
    console.log(result);

    if (result.rowCount === 0) {
      res.status(404).send("ID DOESN'T EXIST");
    }
    res.json({ message: "SUCCESSFULLY DELETED" });
  } catch (err) {
    throw err;
  }
};

const updateMovieById = async (req: Request, res: Response) => {
  try {
    const { id, name, duration, description } = req.body;

    await movie.updateMovie(id, name, duration, description);
    res.send("UPDATED SUCCESSFULLY");
  } catch (err) {
    throw err;
  }
};
const cinemaListByMovieName = async (req: Request, res: Response) => {
  try {
    const { movieName } = req.body;
    if (!movieName || movieName.trim() === "") {
      res.status(400).send("PLEASE PROVIDE MOVIE NAME");
    }
    const result = await movie.cinemaName(movieName);
    res.send(result);
  } catch (err) {
    throw err;
  }
};

const cinemaSeatingPlan = async (req: Request, res: Response) => {
  try {
    const { date, cinemaName, movieName, city } = req.body;
    if (!date || !cinemaName || !movieName || !city) {
      res.status(400).send("PLEASE PROVIDE ALL INFORMATION ");
    }
    const result = await movie.seatingPlan(date, cinemaName, movieName, city);
    if (result.rows == 0) {
      res.status(404).send("NO MATCHED RESULT FOUND");
      return;
    }
    res.send(result);
  } catch (err) {
    throw err;
  }
};

const topActors = async (req: Request, res: Response) => {
  try {
    const rows = await movie.topTenActors();
    res.send(rows);
  } catch (err) {
    throw err;
  }
};

const getMovieByYear = async (req: Request, res: Response) => {
  try {
    const year = req.params.year;
    const result = await movie.movieByYear(year);
    res.send(result);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllMovies: getAllMovies,
  insertMovie: insertMovie,
  deleteMovieById: deleteMovieById,
  updateMovieById: updateMovieById,
  cinemaListByMovieName: cinemaListByMovieName,
  cinemaSeatingPlan: cinemaSeatingPlan,
  topActors: topActors,
  getMovieByYear: getMovieByYear,
};
