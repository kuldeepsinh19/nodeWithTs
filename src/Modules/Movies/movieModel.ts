import { QueryResult } from "pg";
const client = require("../../db/db")

const getMovies = async () => {
  try {
    const result = await client.query(`SELECT * FROM movie `);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const addMovie = async (
  id: number,
  name: string,
  duration: string,
  description: string
) => {
  try {
    let insertQuery = `INSERT INTO movie (id , name , duration , description)
         VALUES($1 , $2 , $3 , $4 )`;
    let values = [id, name, duration, description];
    const result: QueryResult = await client.query(insertQuery, values);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteMovie = async (id: number) => {
  try {
    let value = [id];
    let deleteQuery = `DELETE FROM movie  WHERE id = $1`;
    const result: QueryResult = await client.query(deleteQuery, value);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateMovie = async (
  id: number,
  name: string,
  duration: string,
  description: string
) => {
  try {
    const updateQuery = `UPDATE movie SET  name = $2, duration = $3,
         description = $4 WHERE id =$1`;
    const values = [id, name, duration, description];
    const result = await client.query(updateQuery, values);
    return result;
  } catch (err) {
    throw err;
  }
};

const cinemaName = async (movieName: string) => {
  try {
    const movieByName = `SELECT cm.name THEATRE_NAME , sh.date DATE, m.id MOVIE_ID, 
  ch.name SCREEN, c.name CITY, sh.time TIMING FROM
movie m
INNER JOIN show sh ON  m.id = sh.movie_id
INNER JOIN cinema_hall ch ON sh.cinema_hall_id  = ch.id
INNER JOIN  cinema cm ON ch.cinema_id  = cm.id 
INNER JOIN city c ON c.id = cm.city_id
WHERE m.name = $1`;

    const value = [movieName];
    let result: QueryResult = await client.query(movieByName, value);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const seatingPlan = async (
  date: Date,
  cinemaName: string,
  movieName: string,
  city: string
) => {
  try {
    const seatingPlanQuery = `
           SELECT m.name  MOVIE , s.number SEAT_NO , ch.name SCREEN ,  cine.name THEATRE_NAME ,
         chs.name TYPE , sh.date DATE , ssp.status FROM 
        city c
        JOIN cinema cine ON c.id = cine.city_id
        JOIN cinema_hall ch ON cine.id = ch.cinema_id
        JOIN cinema_hall_section  chs  ON ch.id = chs.cinema_hall_id
        JOIN seat s ON chs.id = s.cinema_hall_section_id
        JOIN show_seating_plan ssp ON s.id = ssp.seat_id
        JOIN show_section ss ON ss.id = ssp.show_section_id
        JOIN show sh  ON sh.id = ss.show_id
        JOIN movie m ON m.id = sh.movie_id
        WHERE sh.date = $1 AND cine.name = $2 AND m.name = $3 AND c.name = $4
        `;
    const values = [date, cinemaName, movieName, city];
    const result: QueryResult = await client.query(seatingPlanQuery, values);

    return result.rows;
  } catch (err) {
    throw err;
  }
};

const topTenActors = async () => {
  try {
    const topActorsQuery = `
SELECT COUNT(m.name) AS movie_count, a.name AS actor
FROM movie m
INNER JOIN movie_cast mc ON m.id = mc.movie_id
INNER JOIN actor a ON mc.actor_id = a.id
GROUP BY a.name
ORDER BY movie_count DESC
LIMIT 10
`;
    const result: QueryResult = await client.query(topActorsQuery);
    console.log(result);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const movieByYear = async (year: number) => {
  try {
    const moviesByYearQuery = `
   SELECT m.name ,  EXTRACT(YEAR FROM release_date) AS YEAR
   FROM movie m
   WHERE  EXTRACT(YEAR FROM release_date) = $1;
`;
    const value = [year];
    console.log(year);
    const result: QueryResult = await client.query(moviesByYearQuery, value);
    console.log(result);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getMovies: getMovies,
  addMovie: addMovie,
  deleteMovie: deleteMovie,
  updateMovie: updateMovie,
  cinemaName: cinemaName,
  seatingPlan: seatingPlan,
  topTenActors: topTenActors,
  movieByYear: movieByYear,
};
