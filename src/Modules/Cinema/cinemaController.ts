const cinema = require("./cinemaModel");
import { Request, Response } from "express";

const getALlCinemas = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: getCinemaModel[] = await cinema.getCinema();
    res.send(rows);
  } catch (error) {
    throw error;
  }
};


const insertCinema = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, code, name, city_id, address } = req.body as cinemaData;

    await cinema.addCinema(id, code, name, city_id, address);
    return res.json({ msg: "inserted successfully" });
  } catch (error) {
    throw error;
  }
};


const deleteCinemaById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)

    const result = await cinema.deleteCinema(id);
    if (result.rowCount === 0) {
      return res.send("ID DOESN'T EXISTS");
  
    }
    return res.json({ msg: "deleted successfully" });
  } catch (error) {
    throw error;
  }
};

const updateCinemaById = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id, code, name, city_id, address } = req.body as cinemaData;

    await cinema.updateCinema(id, code, name, city_id, address);
   return res.json({ msg: "Updated successfully" });
  } catch (error) {
    throw error;
  }
};
const cinemaListByCityName = async (req: Request, res: Response):Promise<void> => {
  try {
    const name: string = req.body;
    if (!name || typeof name !== "string") {
      res.status(404).send("NAME IS BLANK OR NOT IN PROPER FORMAT");
      return;
    }
    const rows = await cinema.cinemasByCity(name);
    res.send(rows);
  } catch (error) {
    throw error;
  }
};

const movieListByCinemaName = async (req: Request, res: Response):Promise<void>=> {
  try {
    const name: string = req.body;
    if (!name || typeof name !== "string") {
      res.status(404).send("NAME IS BLANK OR NOT IN PROPER FORMAT");
    }
    const rows = await cinema.moviesByCinemaName(name);
    res.send(rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getALlCinemas: getALlCinemas,
  insertCinema: insertCinema,
  deleteCinemaById: deleteCinemaById,
  updateCinemaById: updateCinemaById,
  cinemaListByCityName: cinemaListByCityName,
  movieListByCinemaName: movieListByCinemaName,
};
