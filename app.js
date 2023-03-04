const express = require("express"); // server software
const bodyParser = require("body-parser"); // parser middleware
const session = require("express-session"); // session middleware
const passport = require("passport"); // authentication
const connectEnsureLogin = require("connect-ensure-login"); // authorization
const LocalStrategy = require("passport-local");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.info("connected to MongoDB");
  })
  .catch(() => {
    console.error("error connecting to MongoDB");
  });

const User = require("./models/user.js"); // User Model

const app = express();

// Configure Sessions Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// logging in
const loginRouter = require("./routes/login.js");
app.use("/login", loginRouter);

// register
const registerRouter = require("./routes/register.js");
app.use("/register", registerRouter);

// getting, making events 
const eventsRouter = require("./routes/events.js");
app.use("/events", eventsRouter);

app.use("/", (req, res, next) => {
    res.send("failed.");
})

app.listen(process.env.LOCAL_PORT, function () {
  console.log("listening.");
});
