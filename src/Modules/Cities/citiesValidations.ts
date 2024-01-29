import { Request, Response, NextFunction } from "express";

const Joi = require("@hapi/joi");
const insertCityData = (req: Request, res: Response, next: NextFunction):Response | void => {
  const schema = Joi.object({
    id: Joi.number().max(9888).required(),
    name: Joi.string().min(3).max(15).required(),
    state: Joi.any(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });
  next();
};
const deleteCityData = (req: Request, res: Response, next: NextFunction):Response | void => {
  const schema = Joi.object({
    id: Joi.number().max(10000).required(),
  });
  const { error } = schema.validate(req.params);
  if (error) return res.status(400).send({ msg: error.details[0].message });
  next();
};
const updateCityData = (req: Request, res: Response, next: NextFunction):Response | void => {
  const schema = Joi.object({
    id: Joi.number().max(10000).required(),
    name: Joi.string().min(3).max(15).required(),
    state: Joi.any().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });
  console.log("yeah its used");
  next();
};

module.exports = {
  insertCityData: insertCityData,
  deleteCityData: deleteCityData,
  updateCityData: updateCityData,
};
