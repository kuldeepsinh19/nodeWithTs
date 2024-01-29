import { QueryResult } from "pg";
const client = require("../../db/db")
interface SessionData {
  username?: string;
  role?: string;
  password?: string | number;
}
interface User {
  id: number;
  name: string;
  role: string;
  password: string | number;
}

const getUserDetails = async (
  username: string,
  password: string | number
): Promise<SessionData[]> => {
  try {
    console.log("IT REACHED THROUGH MODEL")
    const queryText = "SELECT * FROM users WHERE name = $1 AND password = $2";
    const result: QueryResult<User> = await client.query(queryText, [
      username,
      password,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserDetails: getUserDetails,
};
