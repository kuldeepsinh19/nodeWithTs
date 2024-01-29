const reports = require("./reportsModel");
import { Request, Response } from "express";

const topCustomerList = async (req: Request, res: Response):Promise<void> => {
  try {
    const rows = await reports.topCustomers();
    res.send(rows);
  } catch (error) {
    throw error;
  }
};
const bookingListByCinemaName = async (req: Request, res: Response):Promise<void> => {
  try {
    const { cinemaName } = req.body;
    if (!cinemaName || typeof cinemaName !== "string") {
      res.status(404).send("CINEMA NAME IS BLANK OR NOT IN PROPER FORMAT");
      return;
    }

    const rows = await reports.totalBookingByCinemaName(cinemaName);
    res.send(rows);
    if (rows.rowCount === 0) {
      res.send("0 result found");
    }
  } catch (error) {
    throw error;
  }
};

const uniqueCustomerList = async (req: Request, res: Response):Promise<void> => {
  try {
    const row = await reports.uniqueCustomer();
    res.send(row);
  } catch (error) {
    throw error;
  }
};
const viewersListByMovieName = async (req: Request, res: Response):Promise<void> => {
  try {
    const { movieName } = req.body;

    if (!movieName) {
      res.status(404).send("MOVIE NAME IS MISSING");
      return;
    }

    const result = await reports.cusListForBookedTicketsByMovie(movieName);
    if (result.rowCount === 0) {
      res.status(404).send("0 RESULT FOUND");
    }
    res.send(result.rows);
  } catch (err) {
    throw err;
  }
};

const viewersListByCinemaName = async (req: Request, res: Response):Promise<void> => {
  try {
    const { cinemaName } = req.body;
    if (!cinemaName) {
      res.status(404).send("CINEMA NAME IS MISSING");
      return;
    }
    const result = await reports.customerNamesByCinema(cinemaName);

    if (result.rowCount === 0) {
      res.status(404).send("0 RESULT FOUND");
    }
    res.send(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  topCustomerList: topCustomerList,
  bookingListByCinemaName: bookingListByCinemaName,
  uniqueCustomerList: uniqueCustomerList,
  viewersListByMovieName: viewersListByMovieName,
  viewersListByCinemaName: viewersListByCinemaName,
};
