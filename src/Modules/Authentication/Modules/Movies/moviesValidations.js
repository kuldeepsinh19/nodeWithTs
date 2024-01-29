"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
const insertMovieData = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().max(9888).required(),
        name: Joi.string().min(3).max(15).required(),
        duration: Joi.any(),
        description: Joi.string().min(15).max(100),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send({ msg: error.details[0].message });
    next();
};
const deleteMovie = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().max(10000).required(),
    });
    const { error } = schema.validate(req.params);
    if (error)
        return res.status(400).send({ msg: error.details[0].message });
    next();
};
const updateMovieData = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().max(10000).required(),
        name: Joi.string().min(3).max(15).required(),
        duration: Joi.any(),
        description: Joi.string().min(15).max(100),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send({ msg: error.details[0].message });
    console.log("yeah its used");
    next();
};
module.exports = {
    insertMovieData: insertMovieData,
    deleteMovie: deleteMovie,
    updateMovieData: updateMovieData,
};
