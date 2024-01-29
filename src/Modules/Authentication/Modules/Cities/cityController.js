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
const city = require("./cityModel");
const getAllCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rows = yield city.getCities();
        res.json(rows);
    }
    catch (error) {
        console.log(error);
    }
});
const insertCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, state } = req.body;
        yield city.addCities(id, name, state);
        res.json({ msg: "SUCCESSFULLY INSERTED" });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const result = yield city.deleteCity(id);
        console.log(result);
        if (result === undefined) {
            throw new Error("ID CANT BE DELETED");
        }
        else if (result.rowCount === 0) {
            res.status(404).send("ID DOESN'T EXIST");
        }
        res.json({ message: "SUCCESSFULLY DELETED" });
    }
    catch (err) {
        throw err;
    }
});
const updateCityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, state } = req.body;
        const result = yield city.updateCity(id, name, state);
        console.log(result);
        res.send("UPDATED SUCCESSFULLY");
    }
    catch (err) {
        throw err;
    }
});
module.exports = {
    getAllCities: getAllCities,
    insertCity: insertCity,
    deleteCity: deleteCity,
    updateCityById: updateCityById,
};
