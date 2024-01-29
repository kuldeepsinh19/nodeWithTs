const client = require("../../db/db");
import { QueryResult } from "pg";

const getCinema = async (): Promise<getCinemaModel[]> => {
  try {
    const result: QueryResult = await client.query(
      `SELECT id , name  FROM cinema `
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const addCinema = async (
  id: number,
  code: string | number,
  name: string,
  city_id: number,
  address: string
):Promise<QueryResult> => {
  try {
    let insertQuery = `INSERT INTO cinema (id , code, name , city_id , address) 
      VALUES($1 , $2 , $3 , $4 , $5)`;
    let values = [id, code, name, city_id, address];

    let result: QueryResult = await client.query(insertQuery, values);
    // console.log(result)

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteCinema = async (id: number):Promise<QueryResult> => {
  try {
    // const id = [id]
    const deleteQuery = `DELETE FROM cinema WHERE id = ${id}`;
    const result: QueryResult = await client.query(deleteQuery);
    return result;
  } catch (error) {
    throw error;
  }
};
const updateCinema = async (
  id: number,
  code: string | number,
  name: string,
  city_id: number,
  address: string
):Promise<QueryResult> => {
  try {
    const updateQuery:string = `UPDATE cinema SET code = $2, name = $3, city_id = $4, 
      address = $5
       WHERE id = $1`;
    const values = [id, code, name, city_id, address];

    const result: QueryResult = await client.query(updateQuery, values);
    return result;
  } catch (error) {
    throw error;
  }
};
interface cinemaAndMovieByTheirName {
  CITY: string;
  MOVIE_NAME: string;
  THEATRE_NAME: string;
}

const cinemasByCity = async (
  name: string
): Promise<cinemaAndMovieByTheirName[]> => {
  try {
    const cinemaByCityQuery:string = `SELECT c.name CITY, m.name MOVIE_NAME, 
        cm.name THEATRE_NAME  FROM
        city  c
        INNER JOIN cinema cm  ON c.id = cm.city_id
        INNER JOIN cinema_hall ch  ON cm.id = ch.cinema_id
        INNER JOIN  show sh  ON ch.id = sh.cinema_hall_id
        INNER JOIN movie m  ON m.id = sh.movie_id
        WHERE c.name = $1  `;
    const value = [name];
    const result: QueryResult = await client.query(cinemaByCityQuery, value);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const moviesByCinemaName = async (
  name: string
): Promise<cinemaAndMovieByTheirName[]> => {
  try {
    const movieNameByCinema:string = `SELECT c.name CITY, m.name MOVIE_NAME, cm.name THEATRE_NAME  FROM
        city  c 
        INNER JOIN cinema cm ON c.id = cm.city_id 
        INNER JOIN cinema_hall ch ON cm.id = ch.cinema_id
        INNER JOIN  show sh ON ch.id = sh.cinema_hall_id
        INNER JOIN movie m ON m.id = sh.movie_id
        WHERE cm.name = $1 `;

    const result:QueryResult = await client.query(movieNameByCinema, [name]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getCinema: getCinema,
  addCinema: addCinema,
  deleteCinema: deleteCinema,
  updateCinema: updateCinema,
  cinemasByCity: cinemasByCity,
  moviesByCinemaName: moviesByCinemaName,
};
