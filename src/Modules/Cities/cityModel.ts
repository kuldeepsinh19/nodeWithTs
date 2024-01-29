import { QueryResult } from "pg";
const client = require("../../db/db")

const getCities = async () => {
  try {
    const result = await client.query(`SELECT * FROM city `);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const addCities = async (id: number, name: string, state: string) => {
  try {
    let insertQuery = `INSERT INTO city (id, name, state)
        VALUES ($1 , $2 , $3 )`;
    const values = [id, name, state];
    const result: QueryResult = await client.query(insertQuery, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const deleteCity = async (id: number) => {
  try {
    let deleteQuery = `DELETE FROM city  WHERE id = ${id}`;
    const result: QueryResult = await client.query(deleteQuery);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateCity = async (id: number, name: string, state: string) => {
  try {
    let updateQuery = `UPDATE city SET name = $2 , state = $3
        WHERE id = $1`;
    let values = [id, name, state];
    const result: QueryResult = await client.query(updateQuery, values);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getCities: getCities,
  addCities: addCities,
  deleteCity: deleteCity,
  updateCity: updateCity,
};
