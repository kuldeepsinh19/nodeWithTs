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
const reports = require("./reportsModel");
const topCustomerList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield reports.topCustomers();
        res.send(rows);
    }
    catch (error) {
        throw error;
    }
});
const bookingListByCinemaName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cinemaName } = req.body;
        if (!cinemaName || typeof cinemaName !== "string") {
            res.status(404).send("CINEMA NAME IS BLANK OR NOT IN PROPER FORMAT");
            return;
        }
        const rows = yield reports.totalBookingByCinemaName(cinemaName);
        res.send(rows);
        if (rows.rowCount === 0) {
            res.send("0 result found");
        }
    }
    catch (error) {
        throw error;
    }
});
const uniqueCustomerList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const row = yield reports.uniqueCustomer();
        res.send(row);
    }
    catch (error) {
        throw error;
    }
});
const viewersListByMovieName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieName } = req.body;
        if (!movieName) {
            res.status(404).send("MOVIE NAME IS MISSING");
            return;
        }
        const result = yield reports.cusListForBookedTicketsByMovie(movieName);
        if (result.rowCount === 0) {
            res.status(404).send("0 RESULT FOUND");
        }
        res.send(result.rows);
    }
    catch (err) {
        throw err;
    }
});
const viewersListByCinemaName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cinemaName } = req.body;
        if (!cinemaName) {
            res.status(404).send("CINEMA NAME IS MISSING");
            return;
        }
        const result = yield reports.customerNamesByCinema(cinemaName);
        if (result.rowCount === 0) {
            res.status(404).send("0 RESULT FOUND");
        }
        res.send(result.rows);
    }
    catch (error) {
        throw error;
    }
});
module.exports = {
    topCustomerList: topCustomerList,
    bookingListByCinemaName: bookingListByCinemaName,
    uniqueCustomerList: uniqueCustomerList,
    viewersListByMovieName: viewersListByMovieName,
    viewersListByCinemaName: viewersListByCinemaName,
};
