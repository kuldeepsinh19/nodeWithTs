const user = require("./loginModel");
import { Request, Response } from "express";

interface SessionData {
  username?: string;
  role?: string;
  password?: string | number;
}

const loginUser = async (req: Request, res: Response) => {
  try {
    // console.log("request received" )
    const { username, password } = req.body;
    const sessionData = req.session as SessionData;
  console.log(sessionData , "SESSION DATA")
    if (username && password) {
      const results = await user.getUserDetails(username, password);

      if (results.length > 0) {
        const userRole = results[0].role;
        sessionData.username = username;
        sessionData.role = userRole;
        console.log(results.length);

        res.send({ msg: "LOGIN SUCCESSFUL" });
      } else {
        res.status(401).send("incorrect username or password");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
