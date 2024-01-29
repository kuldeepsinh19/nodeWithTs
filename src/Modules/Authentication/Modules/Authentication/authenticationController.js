"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user = require("./loginModel");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("request received" )
        const { username, password } = req.body;
        const sessionData = req.session;
        console.log(sessionData, "SESSION DATA");
        if (username && password) {
            const results = yield user.getUserDetails(username, password);
            if (results.length > 0) {
                const userRole = results[0].role;
                sessionData.username = username;
                sessionData.role = userRole;
                console.log(results.length);
                res.send({ msg: "LOGIN SUCCESSFUL" });
            }
            else {
                res.status(401).send("incorrect username or password");
            }
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = {
    loginUser: loginUser,
};
// ===================================> REQ.QUERY CHECK
// const user = require("./loginModel");
// import { Request, Response } from "express";
// interface SessionData {
//   username?: string;
//   role?: string;
//   password?: string | number;
// }
// const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.query as { username?: string; password?: string };
//     const sessionData = req.session as SessionData;
//     console.log(sessionData, "SESSION DATA");
//     if (username && password) {
//       const results = await user.getUserDetails(username, password);
//       if (results.length > 0) {
//         const userRole = results[0].role;
//         sessionData.username = username;
//         sessionData.role = userRole;
//         // req.session.myID = 19;
//         console.log(results.length);
//         res.send({ msg: "LOGIN SUCCESSFUL" });
//       } else {
//         res.status(401).send("incorrect username or password");
//       }
//     } else {
//       res.status(400).send("Username and password are required in the query parameters");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// module.exports = {
//   loginUser: loginUser,
// };
