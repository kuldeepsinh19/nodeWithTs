const client = require("../../db/db");
import { QueryResult } from "pg";

const topCustomers = async () => {
  try {
    let topCust = `SELECT  c.id CUST_ID , COUNT(b.id) as 
    BOOKING_ID, c.name CUST_NAME from booking b
    INNER JOIN  customer c ON c.id = b.customer_id
    GROUP BY (c.id)
    ORDER  BY BOOKING_ID DESC`;
    const result = await client.query(topCust);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const totalBookingByCinemaName = async (cinemaName: string) => {
  try {
    let totalBookings = `SELECT  count(b.booking_id) TOTAL_BOOKINGS , 
    cm.name CINEMA FROM
    cinema cm
    INNER JOIN cinema_hall ch ON cm.id = ch.cinema_id
    INNER JOIN show sh ON sh.cinema_hall_id = ch.id
    INNER JOIN show_section ss  ON sh.id = ss.show_id
    INNER JOIN show_seating_plan ssp ON ss.id = ssp.show_section_id
    INNER JOIN booking b  ON ssp.booking_id = b.id
    GROUP BY (cm.name)
    HAVING (cm.name = $1)
    `;
    const result: QueryResult = await client.query(totalBookings, [cinemaName]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const uniqueCustomer = async () => {
  try {
    let uniqueCus = `
    SELECT DISTINCT name   
    FROM customer c
    INNER JOIN booking b
    ON c.id = b.customer_id
        `;
    const result: QueryResult = await client.query(uniqueCus);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const cusListForBookedTicketsByMovie = async (movieName: string) => {
  try {
    let customerListByMovie = `
    SELECT c.name CUSTOMER_NAME,cm.name THEATRE_NAME   FROM cinema cm 
    INNER JOIN cinema_hall ch ON cm.id = ch.cinema_id
    INNER JOIN show sh ON ch.id = sh.cinema_hall_id
    INNER JOIN movie  m  ON m.id = sh.movie_id
    INNER JOIN show_section ss ON sh.id = ss.show_id
    INNER JOIN show_seating_plan ssp  ON ssp.show_section_id = ss.id
    INNER JOIN  booking b ON ssp.booking_id = b.id
    INNER JOIN customer c ON c.id = b.customer_id
    WHERE m.name = $1
        `;
    console.log(movieName);
    const result: QueryResult = await client.query(customerListByMovie, [
      movieName,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const customerNamesByCinema = async (cinemaName: string) => {
  try {
    let customerListByCinema = `
    SELECT c.name CUSTOMER_NAME, m.name MOVIE_NAME   FROM cinema cm 
    INNER JOIN cinema_hall ch  ON cm.id = ch.cinema_id
    INNER JOIN show sh  ON ch.id = sh.cinema_hall_id
    INNER JOIN movie  m   ON m.id = sh.movie_id
    INNER JOIN show_section ss  ON sh.id = ss.show_id
    INNER JOIN show_seating_plan ssp   ON ssp.show_section_id = ss.id
    INNER JOIN  booking b  ON ssp.booking_id = b.id
    INNER JOIN customer c  ON c.id = b.customer_id
    WHERE cm.name = $1
        `;
    const result: QueryResult = await client.query(customerListByCinema, [
      cinemaName,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  topCustomers: topCustomers,
  totalBookingByCinemaName: totalBookingByCinemaName,
  uniqueCustomer: uniqueCustomer,
  cusListForBookedTicketsByMovie: cusListForBookedTicketsByMovie,
  customerNamesByCinema: customerNamesByCinema,
};
