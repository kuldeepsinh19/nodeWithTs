"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie = require("./movieModel");
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rows = yield movie.getMovies();
        res.json(rows);
    }
    catch (error) {
        console.log(error);
    }
});
const insertMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, duration, description } = req.body;
        yield movie.addMovie(id, name, duration, description);
        res.json({ msg: "SUCCESSFULLY INSERTED" });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield movie.deleteMovie(id);
        console.log(result);
        if (result.rowCount === 0) {
            res.status(404).send("ID DOESN'T EXIST");
        }
        res.json({ message: "SUCCESSFULLY DELETED" });
    }
    catch (err) {
        throw err;
    }
});
const updateMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, duration, description } = req.body;
        yield movie.updateMovie(id, name, duration, description);
        res.send("UPDATED SUCCESSFULLY");
    }
    catch (err) {
        throw err;
    }
});
const cinemaListByMovieName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieName } = req.body;
        if (!movieName || movieName.trim() === "") {
            res.status(400).send("PLEASE PROVIDE MOVIE NAME");
        }
        const result = yield movie.cinemaName(movieName);
        res.send(result);
    }
    catch (err) {
        throw err;
    }
});
const cinemaSeatingPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, cinemaName, movieName, city } = req.body;
        if (!date || !cinemaName || !movieName || !city) {
            res.status(400).send("PLEASE PROVIDE ALL INFORMATION ");
        }
        const result = yield movie.seatingPlan(date, cinemaName, movieName, city);
        if (result.rows == 0) {
            res.status(404).send("NO MATCHED RESULT FOUND");
            return;
        }
        res.send(result);
    }
    catch (err) {
        throw err;
    }
});
const topActors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield movie.topTenActors();
        res.send(rows);
    }
    catch (err) {
        throw err;
    }
});
const getMovieByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.params.year;
        const result = yield movie.movieByYear(year);
        res.send(result);
    }
    catch (error) {
        throw error;
    }
});
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
