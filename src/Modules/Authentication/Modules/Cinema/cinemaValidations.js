"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
const insertCinemaData = (req, res, next) => {
    console.log("WORKED");
    const schema = Joi.object({
        id: Joi.number().max(9888).required(),
        code: Joi.any().required(),
        name: Joi.string().min(3).max(15).required(),
        city_id: Joi.number().required(),
        address: Joi.any(),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send({ msg: error.details[0].message });
    next();
};
const deleteCinemaData = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().max(10000).required(),
    });
    const { error } = schema.validate(req.params);
    if (error)
        return res.status(400).send({ msg: error.details[0].message });
    next();
};
const updateCinemaData = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().max(9888).required(),
        code: Joi.any(),
        name: Joi.string().min(3).max(15).required(),
        city_id: Joi.number().required(),
        address: Joi.any(),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send({ msg: error.details[0].message });
    console.log("yeah its used");
    next();
};
module.exports = {
    insertCinemaData: insertCinemaData,
    deleteCinemaData: deleteCinemaData,
    updateCinemaData: updateCinemaData,
};
