import { error } from "console";
import { Request, Response, NextFunction } from "express";

interface SessionData {
  username?: string;
  role?: string;
  password?: string | number;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const sessionData = req.session as SessionData;
if(!req.session){
  res.status(404).send(error)
}
  if (sessionData.username) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

const userRole = (req: Request, res: Response, next: NextFunction) => {
  const sessionData = req.session as SessionData;

  if (sessionData.role == "normal") {
    res.status(401).json({ error: "Only admin can access" });
  } else {
    next();
  }
};

const logOutUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session) {
      console.log(req.session, "SESSIONDETAIL");
      req.session.destroy((err) => {
        if (err) {
          res.status(400).send("Unable to log out");
        } else {
          res.send("Logout successful");
        }
      });
    }
    next();
  } catch (error) {
    throw error;
  }
};
module.exports = {
  userRole: userRole,
  isAuthenticated: isAuthenticated,
  logOutUser: logOutUser,
};
