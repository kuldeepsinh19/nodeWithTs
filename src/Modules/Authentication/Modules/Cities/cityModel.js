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
const getCities = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query(`SELECT * FROM city `);
        return result.rows;
    }
    catch (err) {
        throw err;
    }
});
const addCities = (id, name, state) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let insertQuery = `INSERT INTO city (id, name, state)
        VALUES ($1 , $2 , $3 )`;
        const values = [id, name, state];
        const result = yield client.query(insertQuery, values);
        return result.rows;
    }
    catch (err) {
        throw err;
    }
});
const deleteCity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deleteQuery = `DELETE FROM city  WHERE id = ${id}`;
        const result = yield client.query(deleteQuery);
        return result;
    }
    catch (error) {
        throw error;
    }
});
const updateCity = (id, name, state) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateQuery = `UPDATE city SET name = $2 , state = $3
        WHERE id = $1`;
        let values = [id, name, state];
        const result = yield client.query(updateQuery, values);
        return result;
    }
    catch (err) {
        throw err;
    }
});
module.exports = {
    getCities: getCities,
    addCities: addCities,
    deleteCity: deleteCity,
    updateCity: updateCity,
};
