// initial config
require("dotenv").config(); // import all key/value pairs from .env in process.env : really usefull when going online :)
require("./config/mongo"); // database connection setup
require("./config/passport");
// dependencies injection
const express = require("express");
const session = require("express-session"); //sessions make data persist between http calls
const passport = require("passport"); // auth library (needs sessions)
const cors = require("cors");
const _DEVMODE = true;

// ------------------------------------------
// SERVER CONFIG
// ------------------------------------------
const app = express();

// // Allow server to parse body from POST Request
// app.use(express.urlencoded({ extended: true }));

/**
 *  HEY YOU ! Happy to see that you read comments.
 *  the lines below are useful (maybe in your project too :)
 */

// Allow server to parse JSON from AJAX Request and apply the data to req.body
app.use(express.json());

// Allow server to extract/parse cookies from http requests headers (check req.cookies)
// app.use(cookieParser());

/*
Create a session middleware with the given options.
Note:  Session data is not saved in the cookie itself, just the session ID.
Session data is stored server-side.
*/
app.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);

// this rule allows the client app to exchange via http via the server (AJAX ... Axios)
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200
};

// cors middle on
app.use(cors(corsOptions));

// passport init : these rules MUST set be after session setup (lines above)
app.use(passport.initialize());
app.use(passport.session());

//------------------------------------------
// Check Loggedin Users
// ------------------------------------------
if (_DEVMODE === true) {
  app.use(async function devMode(req, res, next) {
    const userModel = require("./models/User");
    try {
      const user = await userModel.findOne();
      req.user = user;
      console.log(req.user);
      next();
    } catch (err) {
      next(err);
    }
    /*
    req.user = {
      _id: "5e54d6d970e4da479fa1497d",
      username: "admin",
      email: "admin@artistify.io",
      avatar: "https://res.cloudinary.com/gdaconcept/image/upload/v1575298339/user-pictures/jadlcjjnspfhknucjfkd.png",
      role: "admin",
      favorites: {
        artists: ["5e54d4367dfebd462e333413", "5e54d42a7dfebd462e333412", "5e54d41f7dfebd462e333411"],
        albums: ["5ded24e254c2839b2badf011"],
        styles: [],
        labels: []
      }
    }; */
  });
}

//------------------------------------------
// BASE BACKEND ROUTE
// ------------------------------------------

app.get("/", (req, res) => {
  res.send("backend server is running");
});

//------------------------------------------
// SPLITED ROUTING
// ------------------------------------------

const albumsRouter = require("./routes/albums.js");
const artistsRouter = require("./routes/artists.js");
const authRouter = require("./routes/auth.js");
const commentsRouter = require("./routes/comments.js");
const contactRouter = require("./routes/contact.js");
const labelRouter = require("./routes/labels.js");
const ratesRouter = require("./routes/rates.js");
const stylesRouter = require("./routes/styles.js");
const searchRouter = require("./routes/search.js");
const usersRouter = require("./routes/users.js");

app.use(albumsRouter);
app.use(artistsRouter);
app.use(authRouter);
app.use(commentsRouter);
app.use(contactRouter);
app.use(labelRouter);
app.use(ratesRouter);
app.use(searchRouter);
app.use(stylesRouter);
app.use(usersRouter);

module.exports = app;
