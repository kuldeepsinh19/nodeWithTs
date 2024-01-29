"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const isAuthenticated = (req, res, next) => {
    const sessionData = req.session;
    if (!req.session) {
        res.status(404).send(console_1.error);
    }
    if (sessionData.username) {
        next();
    }
    else {
        res.status(403).json({ error: "Unauthorized" });
    }
};
const userRole = (req, res, next) => {
    const sessionData = req.session;
    if (sessionData.role == "normal") {
        res.status(401).json({ error: "Only admin can access" });
    }
    else {
        next();
    }
};
const logOutUser = (req, res, next) => {
    try {
        if (req.session) {
            console.log(req.session, "SESSIONDETAIL");
            req.session.destroy((err) => {
                if (err) {
                    res.status(400).send("Unable to log out");
                }
                else {
                    res.send("Logout successful");
                }
            });
        }
        next();
    }
    catch (error) {
        throw error;
    }
};
module.exports = {
    userRole: userRole,
    isAuthenticated: isAuthenticated,
    logOutUser: logOutUser,
};
