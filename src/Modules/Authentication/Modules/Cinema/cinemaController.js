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
const cinema = require("./cinemaModel");
const getALlCinemas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield cinema.getCinema();
        res.send(rows);
    }
    catch (error) {
        throw error;
    }
});
const insertCinema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, code, name, city_id, address } = req.body;
        yield cinema.addCinema(id, code, name, city_id, address);
        return res.json({ msg: "inserted successfully" });
    }
    catch (error) {
        throw error;
    }
});
const deleteCinemaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield cinema.deleteCinema(id);
        if (result.rowCount === 0) {
            return res.send("ID DOESN'T EXISTS");
        }
        return res.json({ msg: "deleted successfully" });
    }
    catch (error) {
        throw error;
    }
});
const updateCinemaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, code, name, city_id, address } = req.body;
        yield cinema.updateCinema(id, code, name, city_id, address);
        return res.json({ msg: "Updated successfully" });
    }
    catch (error) {
        throw error;
    }
});
const cinemaListByCityName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body;
        if (!name || typeof name !== "string") {
            res.status(404).send("NAME IS BLANK OR NOT IN PROPER FORMAT");
            return;
        }
        const rows = yield cinema.cinemasByCity(name);
        res.send(rows);
    }
    catch (error) {
        throw error;
    }
});
const movieListByCinemaName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body;
        if (!name || typeof name !== "string") {
            res.status(404).send("NAME IS BLANK OR NOT IN PROPER FORMAT");
        }
        const rows = yield cinema.moviesByCinemaName(name);
        res.send(rows);
    }
    catch (error) {
        throw error;
    }
});
module.exports = {
    getALlCinemas: getALlCinemas,
    insertCinema: insertCinema,
    deleteCinemaById: deleteCinemaById,
    updateCinemaById: updateCinemaById,
    cinemaListByCityName: cinemaListByCityName,
    movieListByCinemaName: movieListByCinemaName,
};
