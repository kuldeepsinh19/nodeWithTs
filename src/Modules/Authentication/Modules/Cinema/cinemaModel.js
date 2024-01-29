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
const client = require("../../db/db");
const getCinema = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query(`SELECT id , name  FROM cinema `);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
const addCinema = (id, code, name, city_id, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let insertQuery = `INSERT INTO cinema (id , code, name , city_id , address) 
      VALUES($1 , $2 , $3 , $4 , $5)`;
        let values = [id, code, name, city_id, address];
        let result = yield client.query(insertQuery, values);
        // console.log(result)
        return result;
    }
    catch (error) {
        throw error;
    }
});
const deleteCinema = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const id = [id]
        const deleteQuery = `DELETE FROM cinema WHERE id = ${id}`;
        const result = yield client.query(deleteQuery);
        return result;
    }
    catch (error) {
        throw error;
    }
});
const updateCinema = (id, code, name, city_id, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateQuery = `UPDATE cinema SET code = $2, name = $3, city_id = $4, 
      address = $5
       WHERE id = $1`;
        const values = [id, code, name, city_id, address];
        const result = yield client.query(updateQuery, values);
        return result;
    }
    catch (error) {
        throw error;
    }
});
const cinemasByCity = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinemaByCityQuery = `SELECT c.name CITY, m.name MOVIE_NAME, 
        cm.name THEATRE_NAME  FROM
        city  c
        INNER JOIN cinema cm  ON c.id = cm.city_id
        INNER JOIN cinema_hall ch  ON cm.id = ch.cinema_id
        INNER JOIN  show sh  ON ch.id = sh.cinema_hall_id
        INNER JOIN movie m  ON m.id = sh.movie_id
        WHERE c.name = $1  `;
        const value = [name];
        const result = yield client.query(cinemaByCityQuery, value);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
const moviesByCinemaName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieNameByCinema = `SELECT c.name CITY, m.name MOVIE_NAME, cm.name THEATRE_NAME  FROM
        city  c 
        INNER JOIN cinema cm ON c.id = cm.city_id 
        INNER JOIN cinema_hall ch ON cm.id = ch.cinema_id
        INNER JOIN  show sh ON ch.id = sh.cinema_hall_id
        INNER JOIN movie m ON m.id = sh.movie_id
        WHERE cm.name = $1 `;
        const result = yield client.query(movieNameByCinema, [name]);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
module.exports = {
    getCinema: getCinema,
    addCinema: addCinema,
    deleteCinema: deleteCinema,
    updateCinema: updateCinema,
    cinemasByCity: cinemasByCity,
    moviesByCinemaName: moviesByCinemaName,
};
