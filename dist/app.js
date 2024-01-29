"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
console.log("STARTED FROM HERE");
const cityRouter = require("./Modules/Cities/cityRoutes");
const login = require("./Modules/Authentication/authenticationRoutes");
const logOut = require("./Modules/Authentication/authenticationRoutes");
const moviesRouter = require("./Modules/Movies/movieRoutes");
const cinemaRouter = require("./Modules/Cinema/cinemaRoutes");
const reportsRouter = require("./Modules/Reports/reportsRoutes");
const app = (0, express_1.default)();
console.log("STARTED FROM to here");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
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
console.log("came to session ap .use");
app.use((0, express_session_1.default)({
    store: redisStore,
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    },
}));
console.log("COme to login route");
app.use("/", login);
app.use("/", logOut);
app.use("/movies", moviesRouter);
app.use("/cities", cityRouter);
app.use("/cinema", cinemaRouter);
app.use("/reports", reportsRouter);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.send(err);
});
app.listen(3300, () => {
    console.log(`Server is running on port ${3300}`);
});
module.exports = app;
