const city = require("./cityModel");
import { Request, Response } from "express";

const getAllCities = async (req: Request, res: Response): Promise<void> => {
  try {
    let rows: citiData[] = await city.getCities();
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

const insertCity = async (req: Request, res: Response) => {
  try {
    const { id, name, state } = req.body as citiData;

    await city.addCities(id, name, state);
    res.json({ msg: "SUCCESSFULLY INSERTED" });
  } catch (error) {
    console.log(error);
  }
};

const deleteCity = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const result = await city.deleteCity(id);
    console.log(result);
    if (result === undefined) {
      throw new Error("ID CANT BE DELETED");
    } else if (result.rowCount === 0) {
      res.status(404).send("ID DOESN'T EXIST");
    }
    res.json({ message: "SUCCESSFULLY DELETED" });
  } catch (err) {
    throw err;
  }
};

const updateCityById = async (req: Request, res: Response) => {
  try {
    const { id, name, state } = req.body;

    const result = await city.updateCity(id, name, state);
    console.log(result);
    res.send("UPDATED SUCCESSFULLY");
  } catch (err) {
    throw err;
  }
};
module.exports = {
  getAllCities: getAllCities,
  insertCity: insertCity,
  deleteCity: deleteCity,
  updateCityById: updateCityById,
};
