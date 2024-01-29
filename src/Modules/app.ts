import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
console.log("STARTED FROM HERE")

const cityRouter = require("./Modules/Cities/cityRoutes");
const login = require("./Modules/Authentication/authenticationRoutes");
const logOut = require("./Modules/Authentication/authenticationRoutes");
const moviesRouter = require("./Modules/Movies/movieRoutes");
const cinemaRouter = require("./Modules/Cinema/cinemaRoutes");
const reportsRouter = require("./Modules/Reports/reportsRoutes");

const app = express();
console.log("STARTED FROM to here")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

const redis = require("redis");
const RedisStore = require("connect-redis").default;

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

redisClient.connect();

redisClient.on('connect', () => {
  console.log('Connected to Redis successfully');
});

let redisStore = new RedisStore({
  client: redisClient,
});

console.log("came to session ap .use")
app.use(
  session({
    store: redisStore,
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
  );

        console.log("COme to login route")
        app.use("/", login);
        app.use("/", logOut);
        app.use("/movies", moviesRouter);
        app.use("/cities", cityRouter);
        app.use("/cinema", cinemaRouter);
        app.use("/reports", reportsRouter);

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.send(err);
});


app.listen(3300, () => {
  console.log(`Server is running on port ${3300}`);
});

export = app;
